"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import { 
  DollarSign, 
  TrendingUp, 
  AlertOctagon, 
  ChevronRight, 
  ChevronDown,
  Download,
  Eye,
  EyeOff
} from "lucide-react";

interface KpiRow {
  code: string;
  title: string;
  unit: string;
  targetWeek: number;
  actualWeek: number;
  targetMonth: number;
  actualMonth: number;
  targetQuarter: number;
  actualQuarter: number;
  targetYear: number;
  actualYear: number;
  isParent: boolean;
  parentCode?: string;
  pic?: string;
  frequency?: string;
}

export default function UnitDataPage() {
  const { filters, theme, currentLoggedUser, setFilters } = useApp();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    "M1": true, "M2": true, "M3": true, "M4": true, "M5": true, "M6": true, "M7": true
  });
  const [kpiRows, setKpiRows] = useState<KpiRow[]>([]);
  const [showCodeColumn, setShowCodeColumn] = useState(true);

  // Tên đơn vị hiển thị
  const unitNameMap: Record<string, string> = {
    "SCVN": "Toàn Công Ty SCVN",
    "Wofloo": "BP Wolfoo (WO)",
    "Lego": "DA Lego (LEGO)",
    "AS": "BP Animated Story (AS)",
    "DA01": "Dự án 01 (DA01)",
    "Music": "BP Music (SCMU)",
    "NDTH": "BP Nội dung tổng hợp",
    "CR": "BP Creative Hub (CR)",
    "CN": "CNGP (CN)",
    "SCS": "BP Studio (SCS)",
  };

  const currentUnitName = unitNameMap[filters.unitCode] || "Toàn Công Ty SCVN";

  // Định dạng nhãn kỳ báo cáo
  const getPeriodLabel = () => {
    if (filters.periodType === "weekly") {
      return `Tuần ${filters.week || 1} (Tháng ${filters.month || 7}/${filters.year || 2026})`;
    }
    if (filters.periodType === "monthly") {
      return `Tháng ${filters.month || 7}/${filters.year || 2026}`;
    }
    if (filters.periodType === "quarterly") {
      return `${filters.quarter || "Q3"}/${filters.year || 2026}`;
    }
    return `Năm ${filters.year || 2026}`;
  };

  useEffect(() => {
    let isMounted = true;
    const pType = filters.periodType || "weekly";
    const m = filters.month || "7";
    const w = filters.week || "1";
    const q = filters.quarter || "Q3";
    const y = filters.year || "2026";
    
    fetch(`/api/kpi/unit-data?unitCode=${filters.unitCode}&periodType=${pType}&month=${m}&week=${w}&quarter=${q}&year=${y}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && Array.isArray(data)) {
          setKpiRows(data);
        }
      })
      .catch(err => console.error("Lỗi tải dữ liệu KPI:", err));

    return () => {
      isMounted = false;
    };
  }, [filters.unitCode, filters.periodType, filters.month, filters.week, filters.quarter, filters.year]);

  const toggleRow = (code: string) => {
    setExpandedRows(prev => ({ ...prev, [code]: !prev[code] }));
  };

  const shouldShowByFrequency = (freq: string | undefined, title: string | undefined, code: string | undefined) => {
    const periodType = filters.periodType || "weekly";
    const f = (freq || "").toLowerCase().trim();
    const t = (title || "").toLowerCase();
    const c = (code || "").toLowerCase();

    // Detect quarterly indicators by frequency field or keywords in title/code
    const isQuarterly = f === "quý" || f === "quarterly" || t.includes("roi") || t.includes("ros") || t.includes("tỷ suất lợi nhuận");
    
    // Detect monthly indicators by frequency field or keywords in title/code
    const isMonthly = f === "tháng" || f === "monthly" || t.includes("chi phí mua công cụ") || t.includes("chi phí ctv") || t.includes("độ phủ thương hiệu") || t.includes("kỷ luật") || t.includes("nhân sự fulltime") || t.includes("đào tạo") || t.includes("ngân sách");

    if (periodType === "weekly") {
      if (isQuarterly || isMonthly) return false;
    } else if (periodType === "monthly") {
      if (isQuarterly) return false;
    }
    
    return true;
  };

  const hasVisibleDescendants = (parentCode: string, allRows: KpiRow[]): boolean => {
    const directChildren = allRows.filter(r => r.parentCode === parentCode);
    for (const child of directChildren) {
      if (!child.isParent && shouldShowByFrequency(child.frequency, child.title, child.code)) {
        return true;
      }
      if (child.isParent && hasVisibleDescendants(child.code, allRows)) {
        return true;
      }
    }
    return false;
  };

  const getOrderedRows = (rows: KpiRow[]) => {
    const rootParents = rows.filter(r => r.isParent && !r.parentCode);
    const result: KpiRow[] = [];

    const addChildren = (parentCode: string) => {
      const children = rows.filter(r => r.parentCode === parentCode);
      children.sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true, sensitivity: 'base' }));

      for (const child of children) {
        result.push(child);
        if (child.isParent) {
          addChildren(child.code);
        }
      }
    };

    rootParents.sort((a, b) => a.code.localeCompare(b.code, undefined, { numeric: true, sensitivity: 'base' }));

    for (const parent of rootParents) {
      result.push(parent);
      addChildren(parent.code);
    }

    for (const row of rows) {
      if (!result.find(r => r.code === row.code)) {
        result.push(row);
      }
    }

    return result;
  };

  const isAncestorCollapsed = (row: KpiRow, rows: KpiRow[]) => {
    let current = row;
    while (current.parentCode) {
      if (!expandedRows[current.parentCode]) {
        return true;
      }
      const parent = rows.find(r => r.code === current.parentCode);
      if (!parent) break;
      current = parent;
    }
    return false;
  };

  const getRowDepth = (row: KpiRow, rows: KpiRow[]) => {
    let depth = 0;
    let current = row;
    while (current.parentCode) {
      depth++;
      const parent = rows.find(r => r.code === current.parentCode);
      if (!parent) break;
      current = parent;
    }
    return depth;
  };

  const getTargetValue = (row: KpiRow) => {
    if (filters.periodType === "weekly") return row.targetWeek;
    if (filters.periodType === "monthly") return row.targetMonth;
    if (filters.periodType === "quarterly") return row.targetQuarter;
    return row.targetYear;
  };

  const getActualValue = (row: KpiRow) => {
    if (filters.periodType === "weekly") return row.actualWeek;
    if (filters.periodType === "monthly") return row.actualMonth;
    if (filters.periodType === "quarterly") return row.actualQuarter;
    return row.actualYear;
  };

  const getCumulativeTarget = (row: KpiRow) => {
    if (filters.periodType === "weekly") return row.targetMonth;
    if (filters.periodType === "monthly") return row.targetQuarter;
    return row.targetYear;
  };

  const getCumulativeActual = (row: KpiRow) => {
    if (filters.periodType === "weekly") return row.actualMonth;
    if (filters.periodType === "monthly") return row.actualQuarter;
    return row.actualYear;
  };

  const calculateCompletionPct = (target: number, actual: number, code?: string, title?: string): number => {
    const tCode = (code || "").toUpperCase();
    const tTitle = (title || "").toUpperCase();

    const isErrorOrPolicy = 
      tCode.includes("TM7") || 
      tCode.includes("VM7") ||
      tTitle.includes("LỖI") || 
      tTitle.includes("VI PHẠM") || 
      tTitle.includes("CHÍNH SÁCH") || 
      tTitle.includes("PHẠT") || 
      tTitle.includes("KỶ LUẬT") || 
      tTitle.includes("KHIẾU NẠI") ||
      tTitle.includes("STRIKE") || 
      tTitle.includes("CLAIM");

    if (target === 0) {
      if (actual === 0) {
        return isErrorOrPolicy ? 100 : 0;
      } else {
        return isErrorOrPolicy ? 0 : 100;
      }
    }

    if (isErrorOrPolicy) {
      return actual <= target ? 100 : 0;
    }

    return Math.round((actual / target) * 100);
  };

  // Tìm chỉ tiêu doanh thu thực tế (Tổng doanh thu hoặc doanh thu kênh)
  const revRow = kpiRows.find(r => r.code === "VM1-I02.01" || (r.code.startsWith("VM1-") && r.code.includes("I02.01"))) || kpiRows.find(r => 
    r.code.includes("M1-I02.01") || 
    r.title.toLowerCase().includes("tổng doanh thu") || 
    r.title.toLowerCase() === "doanh thu" ||
    r.title.toLowerCase().includes("doanh thu kênh")
  );
  const actualRev = revRow ? getActualValue(revRow) : 0;
  const targetRev = revRow ? getTargetValue(revRow) : 0;
  const revCompletion = calculateCompletionPct(targetRev, actualRev, revRow?.code, revRow?.title);

  // Tìm chỉ tiêu traffic thực tế (Tổng traffic hoặc view)
  const trafficRow = kpiRows.find(r => 
    r.code.includes("M3-I01.02") || 
    r.code.includes("M3-I01.03") || 
    r.code.includes("M3-I01.01") || 
    r.title.toLowerCase().includes("traffic") || 
    r.title.toLowerCase().includes("lượt view") || 
    r.title.toLowerCase().includes("view youtube")
  );
  const actualTraffic = trafficRow ? getActualValue(trafficRow) : 0;
  const targetTraffic = trafficRow ? getTargetValue(trafficRow) : 0;
  const trafficCompletion = calculateCompletionPct(targetTraffic, actualTraffic, trafficRow?.code, trafficRow?.title);

  const visibleRows = kpiRows.filter(row => {
    if (row.isParent) {
      return hasVisibleDescendants(row.code, kpiRows);
    }
    return shouldShowByFrequency(row.frequency, row.title, row.code);
  });

  const orderedRows = getOrderedRows(visibleRows);

  const warningList = visibleRows
    .filter(r => !r.isParent)
    .filter(r => {
      if (filters.unitCode === "SCVN" || filters.unitCode === "TCT") {
        if (!r.code) return false;
        // Chỉ cảnh báo theo các chỉ tiêu lớn (bắt đầu bằng V hoặc T, không phải mã con chứa hậu tố như -WF, -AS...)
        const isMainIndicator = r.code.startsWith("V") || r.code.startsWith("T");
        const hasNoSubUnitSuffix = r.code.split("-").length <= 2;
        return isMainIndicator && hasNoSubUnitSuffix;
      }
      return true;
    })
    .map(r => {
      const act = getActualValue(r);
      const tgt = getTargetValue(r);
      const pct = calculateCompletionPct(tgt, act, r.code, r.title);
      return { ...r, act, tgt, pct };
    })
    .filter(r => {
      // 1. Chỉ cảnh báo khi tỷ lệ hoàn thành < 80%
      if (r.pct >= 80) return false;

      const tTitle = (r.title || "").toLowerCase();
      const tCode = (r.code || "").toUpperCase();

      // Kiểm tra chỉ tiêu lỗi hoặc vi phạm kỷ luật
      const isErrorOrPolicy = 
        tCode.includes("TM7") || 
        tCode.includes("VM7") ||
        tTitle.includes("lỗi") || 
        tTitle.includes("vi phạm") || 
        tTitle.includes("chính sách") || 
        tTitle.includes("phạt") || 
        tTitle.includes("kỷ luật") || 
        tTitle.includes("khiếu nại") ||
        tTitle.includes("strike") || 
        tTitle.includes("claim");

      // 2. Loại trừ các chỉ tiêu không có kế hoạch (target = 0) và không phát sinh lỗi thực tế
      if (r.tgt === 0 && (!isErrorOrPolicy || r.act === 0)) {
        return false;
      }

      // Phân loại nhóm chỉ tiêu cốt lõi
      const isRevenue = tCode.includes("M1") || tTitle.includes("doanh thu") || tTitle.includes("kinh doanh") || tTitle.includes("thu");
      const isTraffic = tCode.includes("M3") || tTitle.includes("traffic") || tTitle.includes("view") || tTitle.includes("subscribers") || tTitle.includes("lượt xem") || tTitle.includes("lượt view");
      const isProduct = tCode.includes("M2") || tTitle.includes("sản lượng") || tTitle.includes("video") || tTitle.includes("nội dung sản xuất") || tTitle.includes("phát hành") || tTitle.includes("tập") || tTitle.includes("sản phẩm");
      const isPerformance = tCode.includes("M4") || tCode.includes("M5") || tCode.includes("M6") || tTitle.includes("hiệu suất") || tTitle.includes("năng suất") || tTitle.includes("tốc độ") || tTitle.includes("hiệu quả") || tTitle.includes("năng lực");
      const isDiscipline = isErrorOrPolicy;

      // 3. Nếu lọc theo tuần: Chỉ cảnh báo Doanh thu, Traffic, Sản phẩm / Video sản xuất
      if (filters.periodType === "weekly") {
        return isRevenue || isTraffic || isProduct;
      }

      // 4. Nếu lọc theo tháng/quý/năm: Hỗ trợ cảnh báo đầy đủ Doanh thu, Traffic, Sản phẩm, Hiệu suất, Kỷ luật
      return isRevenue || isTraffic || isProduct || isPerformance || isDiscipline;
    })
    // 5. Sắp xếp thứ tự hoàn thành thấp nhất lên đầu và lấy tối đa 5 chỉ tiêu báo động
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 5);

  const primaryTitle = filters.periodType === "weekly" ? "Tuần" : filters.periodType === "monthly" ? "Tháng" : filters.periodType === "quarterly" ? "Quý" : "Năm";
  const cumulativeTitle = filters.periodType === "weekly" ? "Tháng" : "Quý";

  const getPctColor = (pct: number) => {
    if (pct < 80) return "text-rose-500 font-black";
    if (pct < 100) return "text-amber-400 font-black";
    return "text-emerald-500 font-black";
  };

  const handleExportExcel = () => {
    let html = `
      <meta charset="utf-8">
      <table border="1">
        <tr style="background-color: #1e3a8a; color: #ffffff; font-weight: bold; height: 35px;">
          ${showCodeColumn ? '<th style="width: 120px;">Mã chỉ tiêu</th>' : ''}
          <th style="width: 350px;">Mục tiêu / Chỉ tiêu cấp bộ phận</th>
          <th style="width: 80px;">ĐVT</th>
          <th style="width: 150px;">KH ${primaryTitle}</th>
          <th style="width: 150px;">Thực tế ${primaryTitle}</th>
          <th style="width: 100px;">% HT ${primaryTitle}</th>
          ${filters.periodType !== "yearly" ? `
            <th style="width: 150px;">KH ${cumulativeTitle}</th>
            <th style="width: 150px;">Thực tế ${cumulativeTitle}</th>
            <th style="width: 100px;">% HT ${cumulativeTitle}</th>
          ` : ""}
        </tr>
    `;

    orderedRows.forEach(row => {
      const targetPri = getTargetValue(row);
      const actualPri = getActualValue(row);
      const pctPri = calculateCompletionPct(targetPri, actualPri, row.code, row.title);

      const targetCum = getCumulativeTarget(row);
      const actualCum = getCumulativeActual(row);
      const pctCum = calculateCompletionPct(targetCum, actualCum, row.code, row.title);

      const indent = getRowDepth(row, orderedRows);
      const titleText = "&nbsp;".repeat(indent * 4) + row.title;

      html += `
        <tr style="height: 30px; ${row.isParent ? "font-weight: bold; background-color: #f1f5f9; color: #0f172a;" : "color: #334155;"}">
          ${showCodeColumn ? `<td style="text-align: center; font-family: monospace;">${row.code}</td>` : ''}
          <td style="${row.isParent ? "text-transform: uppercase;" : ""}">${titleText}</td>
          <td style="text-align: center;">${row.unit}</td>
          <td style="text-align: right;">${row.unit === "%" ? targetPri + "%" : targetPri.toLocaleString()}</td>
          <td style="text-align: right;">${row.unit === "%" ? actualPri + "%" : actualPri.toLocaleString()}</td>
          <td style="text-align: right; font-weight: bold; color: ${pctPri < 80 ? "#ef4444" : pctPri < 100 ? "#f59e0b" : "#10b981"};">${pctPri}%</td>
          ${filters.periodType !== "yearly" ? `
            <td style="text-align: right;">${row.unit === "%" ? targetCum + "%" : targetCum.toLocaleString()}</td>
            <td style="text-align: right;">${row.unit === "%" ? actualCum + "%" : actualCum.toLocaleString()}</td>
            <td style="text-align: right; font-weight: bold; color: ${pctCum < 80 ? "#ef4444" : pctCum < 100 ? "#f59e0b" : "#10b981"};">${pctCum}%</td>
          ` : ""}
        </tr>
      `;
    });

    html += "</table>";

    const blob = new Blob(["\ufeff", html], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `KPI_Bao_Cao_${filters.unitCode}_${getPeriodLabel().replace(/\s+/g, "_")}.xls`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Phân quyền Báo cáo Đơn vị: Trưởng đơn vị / Người dùng chỉ được xem đơn vị của mình
  const isRestrictedUser = currentLoggedUser?.role === "Trưởng đơn vị" || currentLoggedUser?.role === "Người dùng";
  const isAccessDenied = isRestrictedUser && filters.unitCode !== currentLoggedUser?.unitCode;

  if (isAccessDenied) {
    return (
      <div className="flex flex-col gap-6 text-slate-800 dark:text-white text-sm">
        {/* 1. FREEZE FILTERS PANEL */}
        <FiltersHeader />
        
        <div className="flex flex-col items-center justify-center min-h-[400px] glass-panel p-8 text-center max-w-xl mx-auto my-12 animate-fade-in font-sans">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mb-6 text-rose-400">
            <AlertOctagon size={32} className="animate-pulse" />
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">
            Truy Cập Bị Từ Chối
          </h3>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed font-semibold">
            Tài khoản của bạn chỉ được cấp quyền xem dữ liệu của đơn vị <strong>{currentLoggedUser?.unitCode}</strong>. Bạn không có quyền truy cập dữ liệu của đơn vị <strong>{filters.unitCode}</strong>.
          </p>
          <button
            onClick={() => {
              if (currentLoggedUser?.unitCode) {
                setFilters(prev => ({ ...prev, unitCode: currentLoggedUser.unitCode }));
              }
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
          >
            Quay lại Đơn vị của tôi ({currentLoggedUser?.unitCode})
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 text-slate-800 dark:text-white text-sm">
      {/* 1. FREEZE FILTERS PANEL */}
      <FiltersHeader />

      {/* 2. MICRO CARDS TỔNG QUAN ĐƠN VỊ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Doanh thu trong kỳ */}
        <div className={`${
          theme === "light" 
            ? "bg-white border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.05)] text-slate-800" 
            : "bg-gradient-to-r from-[#2c4cf5] to-[#3a8bf6] text-white shadow-[0_10px_25px_rgba(44,76,245,0.4)] border-none"
        } p-5 rounded-2xl flex flex-col justify-between min-h-[140px] transition-all duration-300 hover:scale-[1.02]`}>
          <div className="flex justify-between items-start">
            <span className={`text-xs font-black uppercase tracking-wider ${theme === "light" ? "text-slate-500" : "text-blue-100/90"}`}>
              DOANH THU TRONG KỲ ({primaryTitle.toUpperCase()})
            </span>
            <DollarSign size={18} className={theme === "light" ? "text-emerald-500" : "text-white"} />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold ${theme === "light" ? "text-emerald-600" : "text-white text-shadow-sm"}`}>
                {revCompletion}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
              <div 
                className={`h-full rounded-full ${theme === "light" ? "bg-emerald-500" : "bg-white"}`} 
                style={{ width: `${Math.min(100, revCompletion)}%` }} 
              />
            </div>
            <span className={`text-xs font-extrabold block mt-1.5 ${theme === "light" ? "text-slate-500" : "text-blue-100/95"}`}>
              Thực tế: {(actualRev / 1000000).toFixed(1)}M / KH: {(targetRev / 1000000).toFixed(1)}M VNĐ
            </span>
          </div>
        </div>

        {/* Card 2: Traffic trong kỳ */}
        <div className={`${
          theme === "light" 
            ? "bg-white border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.05)] text-slate-800" 
            : "bg-gradient-to-r from-[#179fa9] to-[#25ccd8] text-white shadow-[0_10px_25px_rgba(23,159,169,0.4)] border-none"
        } p-5 rounded-2xl flex flex-col justify-between min-h-[140px] transition-all duration-300 hover:scale-[1.02]`}>
          <div className="flex justify-between items-start">
            <span className={`text-xs font-black uppercase tracking-wider ${theme === "light" ? "text-slate-500" : "text-teal-100/90"}`}>
              TRAFFIC TRONG KỲ ({primaryTitle.toUpperCase()})
            </span>
            <TrendingUp size={18} className={theme === "light" ? "text-purple-500" : "text-white"} />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-extrabold ${theme === "light" ? "text-purple-600" : "text-white text-shadow-sm"}`}>
                {trafficCompletion}%
              </span>
            </div>
            <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
              <div 
                className={`h-full rounded-full ${theme === "light" ? "bg-purple-500" : "bg-white"}`} 
                style={{ width: `${Math.min(100, trafficCompletion)}%` }} 
              />
            </div>
            <span className={`text-xs font-extrabold block mt-1.5 ${theme === "light" ? "text-slate-500" : "text-teal-100/95"}`}>
              Thực tế: {actualTraffic >= 100000 ? (actualTraffic / 1000000).toFixed(1) : actualTraffic}M / KH: {targetTraffic >= 100000 ? (targetTraffic / 1000000).toFixed(1) : targetTraffic}M Views
            </span>
          </div>
        </div>

        {/* Card 3: Chỉ tiêu báo động (< 80%) */}
        <div className={`${
          theme === "light" 
            ? `bg-white border border-slate-200 shadow-[0_4px_20px_rgba(15,23,42,0.05)] text-slate-800 border-l-4 ${warningList.length > 0 ? "border-l-rose-500" : "border-l-emerald-500"}` 
            : warningList.length > 0
              ? "bg-gradient-to-r from-[#d9167c] to-[#f33c9c] text-white shadow-[0_10px_25px_rgba(217,22,124,0.4)] border-none"
              : "bg-gradient-to-r from-[#00b074] to-[#00ca84] text-white shadow-[0_10px_25px_rgba(0,176,116,0.4)] border-none"
        } p-5 rounded-2xl flex flex-col justify-between min-h-[140px] transition-all duration-300 hover:scale-[1.02]`}>
          <div className="flex justify-between items-start">
            <span className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 ${theme === "light" ? "text-rose-500" : "text-white"}`}>
              <AlertOctagon size={16} /> CHỈ TIÊU BÁO ĐỘNG (&lt; 80%)
            </span>
          </div>
          <div className={`space-y-1.5 text-xs font-extrabold ${theme === "light" ? "text-rose-700" : "text-white"}`}>
            {warningList.length > 0 ? (
              warningList.map(w => (
                <p key={w.code}>• {w.title}: <strong className={`${theme === "light" ? "text-rose-600" : "text-white underline"} text-sm font-black`}>{w.pct}%</strong></p>
              ))
            ) : (
              <span className={`font-black text-sm block py-1 ${theme === "light" ? "text-emerald-600" : "text-white"}`}>
                ✓ Tất cả chỉ tiêu đạt trên 80%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. BẢNG DỮ LỆU BỘ 7 MỤC TIÊU */}
      {/* 3. BẢNG DỮ LỆU BỘ 7 MỤC TIÊU */}
      <div className={`${
        theme === "light" 
          ? "bg-white border border-slate-200 shadow-sm" 
          : "bg-[#151226]/90 border border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
      } p-6 rounded-2xl overflow-hidden`}>
        
        {/* HEADER BẢNG THÔNG TIN CÓ NÚT XUẤT FILE EXCEL */}
        <div className={`flex flex-wrap justify-between items-center gap-4 mb-4 border-b pb-3 ${
          theme === "light" ? "border-slate-200" : "border-white/10"
        }`}>
          <h3 className={`text-base font-black tracking-wide uppercase ${
            theme === "light" ? "text-slate-800" : "text-indigo-400"
          }`}>
            Bộ Chỉ Tiêu: {currentUnitName} ({getPeriodLabel()})
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCodeColumn(!showCodeColumn)}
              className={`text-xs font-black px-4 py-2 rounded-lg flex items-center gap-2 border transition-all shadow-sm ${
                theme === "light" 
                  ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300" 
                  : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10"
              }`}
            >
              {showCodeColumn ? <EyeOff size={15} /> : <Eye size={15} />}
              {showCodeColumn ? "Ẩn mã chỉ tiêu" : "Hiện mã chỉ tiêu"}
            </button>
            <button
              onClick={handleExportExcel}
              className={`text-xs font-black px-4 py-2 rounded-lg flex items-center gap-2 shadow-lg transition-all ${
                theme === "light" 
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20" 
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
              }`}
            >
              <Download size={15} /> Xuất File Excel
            </button>
          </div>
        </div>

        {/* BẢNG THÔNG TIN DỮ LIỆU */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className={`border-b font-black uppercase text-xs tracking-wider ${
                theme === "light" 
                  ? "border-slate-200 text-slate-600 bg-slate-50" 
                  : "border-white/10 text-slate-300 bg-[#1c1836]/60"
              }`}>
                {showCodeColumn && <th className="p-3 w-28 text-center">Mã chỉ tiêu</th>}
                <th className="p-3">Mục tiêu / Chỉ tiêu cấp bộ phận</th>
                <th className="p-3 w-20 text-center">ĐVT</th>
                
                {/* CỤM CỘT THEO KỲ CHÍNH (XANH LAM) */}
                <th className={`p-3 w-32 text-center border-l ${
                  theme === "light" 
                    ? "bg-sky-50 text-sky-800 border-slate-200" 
                    : "bg-sky-500/10 text-sky-300 border-white/10"
                }`}>KH {primaryTitle}</th>
                <th className={`p-3 w-32 text-center ${
                  theme === "light" ? "bg-sky-50 text-sky-800" : "bg-sky-500/10 text-sky-300"
                }`}>Thực tế {primaryTitle}</th>
                <th className={`p-3 w-28 text-center border-r ${
                  theme === "light" 
                    ? "bg-sky-50 text-sky-800 border-slate-200" 
                    : "bg-sky-500/10 text-sky-300 border-white/10"
                }`}>% HT {primaryTitle}</th>

                {/* CỤM CỘT LŨY KẾ KỲ TIẾP THEO (TÍM) */}
                {filters.periodType !== "yearly" && (
                  <>
                    <th className={`p-3 w-32 text-center ${
                      theme === "light" ? "bg-purple-50 text-purple-800" : "bg-purple-500/10 text-purple-300"
                    }`}>KH {cumulativeTitle}</th>
                    <th className={`p-3 w-32 text-center ${
                      theme === "light" ? "bg-purple-50 text-purple-800" : "bg-purple-500/10 text-purple-300"
                    }`}>Thực tế {cumulativeTitle}</th>
                    <th className={`p-3 w-28 text-center border-r ${
                      theme === "light" ? "bg-purple-50 text-purple-800 border-slate-200" : "bg-purple-500/10 text-purple-300 border-white/10"
                    }`}>% HT {cumulativeTitle}</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {orderedRows.map(row => {
                const targetPri = getTargetValue(row);
                const actualPri = getActualValue(row);
                const pctPri = calculateCompletionPct(targetPri, actualPri, row.code, row.title);

                const targetCum = getCumulativeTarget(row);
                const actualCum = getCumulativeActual(row);
                const pctCum = calculateCompletionPct(targetCum, actualCum, row.code, row.title);

                if (row.isParent) {
                  const isExpanded = expandedRows[row.code];
                  const depth = getRowDepth(row, orderedRows);
                  return (
                    <tr 
                      key={row.code} 
                      onClick={() => toggleRow(row.code)}
                      className={`${
                        theme === "light" 
                          ? "bg-slate-50/90 hover:bg-slate-100 text-[#0284c7] border-b border-slate-200" 
                          : "bg-[#1f1a3e]/80 hover:bg-[#25204a] text-cyan-300 border-b border-white/5"
                      } font-black cursor-pointer select-none transition-all text-sm`}
                    >
                      {showCodeColumn && (
                        <td className="p-3 text-center">
                          <span 
                            className="inline-flex items-center justify-center gap-1 font-mono"
                            style={{ paddingLeft: `${depth * 1.0}rem` }}
                          >
                            {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            {row.code}
                          </span>
                        </td>
                      )}
                      <td 
                        className={`p-3 uppercase tracking-wider font-black ${
                          theme === "light" ? "text-slate-900" : "text-white"
                        }`} 
                        style={{ paddingLeft: `${showCodeColumn ? (depth * 1.0 + 0.5) : (depth * 1.0 + 1.0)}rem` }}
                      >
                        <div className="flex items-center gap-1.5">
                          {!showCodeColumn && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                          {row.title}
                        </div>
                      </td>
                      <td className="p-3 text-center text-slate-500 dark:text-slate-400 font-extrabold text-xs"></td>
                      
                      {/* Cột kỳ chính */}
                      <td className={`p-3 text-center font-black border-l ${
                        theme === "light" ? "border-slate-200 text-slate-700 bg-slate-50/50" : "border-white/5 text-slate-200 bg-[#25204a]/30"
                      }`}>
                        {row.unit === "%" ? `${targetPri}%` : targetPri.toLocaleString()}
                      </td>
                      <td className={`p-3 text-center font-black ${
                        theme === "light" ? "text-slate-900 bg-slate-50/50" : "text-white bg-[#25204a]/30"
                      }`}>
                        {row.unit === "%" ? `${actualPri}%` : actualPri.toLocaleString()}
                      </td>
                      <td className={`p-3 text-center font-black border-r ${
                        theme === "light" ? "border-slate-200 bg-slate-50/50" : "border-white/5 bg-[#25204a]/30"
                      } ${getPctColor(pctPri)}`}>
                        {pctPri}%
                      </td>

                      {/* Cột lũy kế */}
                      {filters.periodType !== "yearly" && (
                        <>
                          <td className={`p-3 text-center font-black ${
                            theme === "light" ? "text-slate-600 bg-purple-50/20" : "text-slate-300 bg-[#2c224a]/20"
                          }`}>
                            {row.unit === "%" ? `${targetCum}%` : targetCum.toLocaleString()}
                          </td>
                          <td className={`p-3 text-center font-black ${
                            theme === "light" ? "text-purple-700 bg-purple-50/20" : "text-purple-200 bg-[#2c224a]/20"
                          }`}>
                            {row.unit === "%" ? `${actualCum}%` : actualCum.toLocaleString()}
                          </td>
                          <td className={`p-3 text-center font-black ${
                            theme === "light" ? "bg-purple-50/20" : "bg-[#2c224a]/20"
                          } ${getPctColor(pctCum)}`}>
                            {pctCum}%
                          </td>
                        </>
                      )}
                    </tr>
                  );
                }

                // Dòng con - Ẩn nếu tổ tiên bị collapsed
                if (row.parentCode && isAncestorCollapsed(row, orderedRows)) {
                  return null;
                }

                const depth = getRowDepth(row, orderedRows);
                return (
                  <tr key={row.code} className={`border-b ${
                    theme === "light" 
                      ? "border-slate-100 hover:bg-slate-50/50 text-slate-700" 
                      : "border-white/5 hover:bg-[#1a1635]/50 text-slate-200"
                  } text-sm transition-all`}>
                    {showCodeColumn && (
                      <td className="p-3 text-center">
                        <code className={`px-2 py-0.5 rounded font-mono text-xs border font-bold ${
                          theme === "light" 
                            ? "bg-slate-100 text-sky-600 border-slate-300" 
                            : "bg-slate-800 text-sky-400 border-sky-500/20"
                        }`}>
                          {row.code}
                        </code>
                      </td>
                    )}
                    <td className={`p-3 font-semibold ${
                      theme === "light" ? "text-slate-800" : "text-white"
                    }`} style={{ paddingLeft: `${depth * 1.5}rem` }}>
                      {row.title}
                    </td>
                    <td className="p-3 text-center text-slate-500 dark:text-slate-400 font-extrabold text-xs">{row.unit}</td>

                    {/* Dữ liệu Kỳ chính */}
                    <td className={`p-3 text-center font-bold border-l ${
                      theme === "light" 
                        ? "text-slate-600 border-slate-100 bg-sky-50/20" 
                        : "text-slate-300 border-white/5 bg-sky-500/[0.03]"
                    }`}>
                      {row.unit === "%" ? `${targetPri}%` : targetPri.toLocaleString()}
                    </td>
                    <td className={`p-3 text-center font-extrabold ${
                      theme === "light" ? "text-slate-800 bg-sky-50/20" : "text-white bg-sky-500/[0.03]"
                    }`}>
                      {row.unit === "%" ? `${actualPri}%` : actualPri.toLocaleString()}
                    </td>
                    <td className={`p-3 text-center font-black border-r ${
                      theme === "light" 
                        ? "border-slate-100 bg-sky-50/20" 
                        : "border-white/5 bg-sky-500/[0.03]"
                    } ${getPctColor(pctPri)}`}>
                      {pctPri}%
                    </td>

                    {/* Dữ liệu Lũy kế */}
                    {filters.periodType !== "yearly" && (
                      <>
                        <td className={`p-3 text-center font-bold ${
                          theme === "light" ? "text-slate-500 bg-purple-50/10" : "text-slate-400 bg-purple-500/[0.03]"
                        }`}>
                          {row.unit === "%" ? `${targetCum}%` : targetCum.toLocaleString()}
                        </td>
                        <td className={`p-3 text-center font-extrabold ${
                          theme === "light" ? "text-purple-700 bg-purple-50/10" : "text-purple-300 bg-purple-500/[0.03]"
                        }`}>
                          {row.unit === "%" ? `${actualCum}%` : actualCum.toLocaleString()}
                        </td>
                        <td className={`p-3 text-center font-black ${
                          theme === "light" ? "bg-purple-50/10" : "bg-purple-500/[0.03]"
                        } ${getPctColor(pctCum)}`}>
                          {pctCum}%
                        </td>
                      </>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
