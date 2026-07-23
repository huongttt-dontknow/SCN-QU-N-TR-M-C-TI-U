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
  const { filters } = useApp();
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

  const shouldShowByFrequency = (freq: string | undefined, title: string, code: string) => {
    const periodType = filters.periodType || "weekly";
    const f = (freq || "").toLowerCase().trim();
    const t = title.toLowerCase();
    const c = code.toLowerCase();

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

  // Tìm chỉ tiêu doanh thu thực tế (Tổng doanh thu hoặc doanh thu kênh)
  const revRow = kpiRows.find(r => 
    !r.isParent && 
    (r.code.includes("M1-I02.01") || 
     r.title.toLowerCase().includes("tổng doanh thu") || 
     r.title.toLowerCase() === "doanh thu" ||
     r.title.toLowerCase().includes("doanh thu kênh")
    )
  );
  const actualRev = revRow ? getActualValue(revRow) : 0;
  const targetRev = revRow ? getTargetValue(revRow) : 0;
  const revCompletion = targetRev > 0 ? Math.round((actualRev / targetRev) * 100) : 0;

  // Tìm chỉ tiêu traffic thực tế (Tổng traffic hoặc view)
  const trafficRow = kpiRows.find(r => 
    !r.isParent && 
    (r.code.includes("M3-I01.02") || 
     r.code.includes("M3-I01.03") || 
     r.title.toLowerCase().includes("traffic") || 
     r.title.toLowerCase().includes("lượt view") || 
     r.title.toLowerCase().includes("view youtube")
    )
  );
  const actualTraffic = trafficRow ? getActualValue(trafficRow) : 0;
  const targetTraffic = trafficRow ? getTargetValue(trafficRow) : 0;
  const trafficCompletion = targetTraffic > 0 ? Math.round((actualTraffic / targetTraffic) * 100) : 0;

  const visibleRows = kpiRows.filter(row => {
    if (row.isParent) {
      return hasVisibleDescendants(row.code, kpiRows);
    }
    return shouldShowByFrequency(row.frequency, row.title, row.code);
  });

  const orderedRows = getOrderedRows(visibleRows);

  const warningList = visibleRows
    .filter(r => !r.isParent)
    .map(r => {
      const act = getActualValue(r);
      const tgt = getTargetValue(r);
      const pct = tgt > 0 ? Math.round((act / tgt) * 100) : 100;
      return { ...r, pct };
    })
    .filter(r => r.pct < 80);

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
      const pctPri = targetPri > 0 ? Math.round((actualPri / targetPri) * 100) : 100;

      const targetCum = getCumulativeTarget(row);
      const actualCum = getCumulativeActual(row);
      const pctCum = targetCum > 0 ? Math.round((actualCum / targetCum) * 100) : 100;

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

  return (
    <div className="flex flex-col gap-6 text-slate-800 dark:text-white text-sm">
      {/* 1. FREEZE FILTERS PANEL */}
      <FiltersHeader />

      {/* 2. MICRO CARDS TỔNG QUAN ĐƠN VỊ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Doanh thu trong kỳ */}
        <div className="glass-panel p-5 flex flex-col justify-between min-h-[120px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-[var(--text-muted)] uppercase tracking-wider">
              DOANH THU TRONG KỲ ({primaryTitle.toUpperCase()})
            </span>
            <DollarSign size={18} className="text-emerald-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-black ${revCompletion < 100 ? "text-amber-400" : "text-emerald-400"}`}>
                {revCompletion}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full mt-2 overflow-hidden border border-white/5">
              <div 
                className={`h-full rounded-full ${revCompletion < 100 ? "bg-amber-500" : "bg-emerald-500"}`} 
                style={{ width: `${Math.min(100, revCompletion)}%` }} 
              />
            </div>
            <span className="text-xs text-[var(--text-muted)] font-extrabold block mt-1.5">
              Thực tế: {(actualRev / 1000000).toFixed(1)}M / KH: {(targetRev / 1000000).toFixed(1)}M VNĐ
            </span>
          </div>
        </div>

        {/* Card 2: Traffic trong kỳ */}
        <div className="glass-panel p-5 flex flex-col justify-between min-h-[120px]">
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-[var(--text-muted)] uppercase tracking-wider">
              TRAFFIC TRONG KỲ ({primaryTitle.toUpperCase()})
            </span>
            <TrendingUp size={18} className="text-purple-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-4xl font-black ${trafficCompletion < 100 ? "text-purple-400" : "text-emerald-400"}`}>
                {trafficCompletion}%
              </span>
            </div>
            <div className="w-full h-2 bg-slate-950 rounded-full mt-2 overflow-hidden border border-white/5">
              <div 
                className={`h-full rounded-full ${trafficCompletion < 100 ? "bg-purple-500" : "bg-emerald-500"}`} 
                style={{ width: `${Math.min(100, trafficCompletion)}%` }} 
              />
            </div>
            <span className="text-xs text-[var(--text-muted)] font-extrabold block mt-1.5">
              Thực tế: {actualTraffic}M / KH: {targetTraffic}M Views
            </span>
          </div>
        </div>

        {/* Card 3: Chỉ tiêu báo động (< 80%) */}
        <div className={`glass-panel p-5 flex flex-col justify-between min-h-[120px] border-l-4 ${warningList.length > 0 ? "border-l-rose-500" : "border-l-emerald-500"}`}>
          <div className="flex justify-between items-start">
            <span className="text-xs font-black text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <AlertOctagon size={16} /> CHỈ TIÊU BÁO ĐỘNG (&lt; 80%)
            </span>
          </div>
          <div className="space-y-1.5 text-xs font-extrabold text-rose-300">
            {warningList.length > 0 ? (
              warningList.map(w => (
                <p key={w.code}>• {w.title}: <strong className="text-rose-400 text-sm">{w.pct}%</strong></p>
              ))
            ) : (
              <span className="text-emerald-400 font-black text-sm block py-1">
                ✓ Tất cả chỉ tiêu đạt trên 80%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. BẢNG DỮ LỆU BỘ 7 MỤC TIÊU */}
      <div className="glass-panel p-5 overflow-hidden">
        
        {/* HEADER BẢNG THÔNG TIN CÓ NÚT XUẤT FILE EXCEL */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-slate-200 dark:border-white/10 pb-3">
          <h3 className="text-base font-black text-sky-500 dark:text-sky-400 tracking-wide uppercase">
            Bộ Chỉ Tiêu: {currentUnitName} ({getPeriodLabel()})
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCodeColumn(!showCodeColumn)}
              className="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-black px-4 py-2 rounded-lg flex items-center gap-2 border border-slate-300 dark:border-white/10 transition-all shadow-sm"
            >
              {showCodeColumn ? <EyeOff size={15} /> : <Eye size={15} />}
              {showCodeColumn ? "Ẩn mã chỉ tiêu" : "Hiện mã chỉ tiêu"}
            </button>
            <button
              onClick={handleExportExcel}
              className="bg-indigo-600 hover:bg-indigo-700 !text-white text-xs font-black px-4 py-2 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
            >
              <Download size={15} /> Xuất File Excel
            </button>
          </div>
        </div>

        {/* BẢNG THÔNG TIN DỮ LIỆU */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 font-black bg-slate-100 dark:bg-slate-900/60 uppercase text-xs tracking-wider">
                {showCodeColumn && <th className="p-3 w-28 text-center">Mã chỉ tiêu</th>}
                <th className="p-3">Mục tiêu / Chỉ tiêu cấp bộ phận</th>
                <th className="p-3 w-20 text-center">ĐVT</th>
                
                {/* CỤM CỘT THEO KỲ CHÍNH (XANH LAM) */}
                <th className="p-3 w-32 text-center bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-l border-slate-200 dark:border-white/10">KH {primaryTitle}</th>
                <th className="p-3 w-32 text-center bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300">Thực tế {primaryTitle}</th>
                <th className="p-3 w-28 text-center bg-sky-100 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border-r border-slate-200 dark:border-white/10">% HT {primaryTitle}</th>

                {/* CỤM CỘT LŨY KẾ KỲ TIẾP THEO (TÍM) */}
                {filters.periodType !== "yearly" && (
                  <>
                    <th className="p-3 w-32 text-center bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">KH {cumulativeTitle}</th>
                    <th className="p-3 w-32 text-center bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">Thực tế {cumulativeTitle}</th>
                    <th className="p-3 w-28 text-center bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300">% HT {cumulativeTitle}</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {orderedRows.map(row => {
                const targetPri = getTargetValue(row);
                const actualPri = getActualValue(row);
                const pctPri = targetPri > 0 ? Math.round((actualPri / targetPri) * 100) : 100;

                const targetCum = getCumulativeTarget(row);
                const actualCum = getCumulativeActual(row);
                const pctCum = targetCum > 0 ? Math.round((actualCum / targetCum) * 100) : 100;

                if (row.isParent) {
                  const isExpanded = expandedRows[row.code];
                  const depth = getRowDepth(row, orderedRows);
                  return (
                    <tr 
                      key={row.code} 
                      onClick={() => toggleRow(row.code)}
                      className="bg-slate-100/80 dark:bg-slate-900/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-[var(--accent-cyan)] font-black border-b border-slate-200 dark:border-white/10 cursor-pointer select-none transition-all text-sm"
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
                        colSpan={showCodeColumn ? 2 : 3} 
                        className="p-3 uppercase tracking-wider font-black text-slate-900 dark:text-white flex items-center gap-1.5" 
                        style={{ paddingLeft: `${showCodeColumn ? (depth * 1.0 + 0.5) : (depth * 1.0 + 1.0)}rem` }}
                      >
                        {!showCodeColumn && (isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                        {row.title}
                      </td>
                      
                      {/* Cột kỳ chính */}
                      <td className="p-3 text-center font-black border-l border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200">
                        {row.unit === "%" ? `${targetPri}%` : targetPri.toLocaleString()}
                      </td>
                      <td className="p-3 text-center font-black text-slate-900 dark:text-white">
                        {row.unit === "%" ? `${actualPri}%` : actualPri.toLocaleString()}
                      </td>
                      <td className={`p-3 text-center font-black border-r border-slate-200 dark:border-white/10 ${getPctColor(pctPri)}`}>
                        {pctPri}%
                      </td>

                      {/* Cột lũy kế */}
                      {filters.periodType !== "yearly" && (
                        <>
                          <td className="p-3 text-center font-black text-slate-600 dark:text-slate-300">
                            {row.unit === "%" ? `${targetCum}%` : targetCum.toLocaleString()}
                          </td>
                          <td className="p-3 text-center font-black text-purple-700 dark:text-purple-200">
                            {row.unit === "%" ? `${actualCum}%` : actualCum.toLocaleString()}
                          </td>
                          <td className={`p-3 text-center font-black ${getPctColor(pctCum)}`}>
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
                  <tr key={row.code} className="border-b border-slate-100 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 text-sm text-slate-700 dark:text-slate-200">
                    {showCodeColumn && (
                      <td className="p-3 text-center">
                        <code className="bg-slate-100 dark:bg-slate-800 text-sky-600 dark:text-sky-400 px-2 py-0.5 rounded font-mono text-xs border border-sky-300 dark:border-sky-500/20 font-bold">
                          {row.code}
                        </code>
                      </td>
                    )}
                    <td className="p-3 font-semibold text-slate-800 dark:text-white" style={{ paddingLeft: `${depth * 1.5}rem` }}>
                      {row.title}
                    </td>
                    <td className="p-3 text-center text-slate-500 dark:text-slate-400 font-extrabold text-xs">{row.unit}</td>

                    {/* Dữ liệu Kỳ chính */}
                    <td className="p-3 text-center font-bold text-slate-600 dark:text-slate-300 border-l border-slate-100 dark:border-white/5 bg-sky-50/50 dark:bg-sky-950/10">
                      {row.unit === "%" ? `${targetPri}%` : targetPri.toLocaleString()}
                    </td>
                    <td className="p-3 text-center font-extrabold text-slate-800 dark:text-white bg-sky-50/50 dark:bg-sky-950/10">
                      {row.unit === "%" ? `${actualPri}%` : actualPri.toLocaleString()}
                    </td>
                    <td className={`p-3 text-center font-black border-r border-slate-100 dark:border-white/5 bg-sky-50/50 dark:bg-sky-950/10 ${getPctColor(pctPri)}`}>
                      {pctPri}%
                    </td>

                    {/* Dữ liệu Lũy kế */}
                    {filters.periodType !== "yearly" && (
                      <>
                        <td className="p-3 text-center font-bold text-slate-500 dark:text-slate-400 bg-purple-50/50 dark:bg-purple-950/10">
                          {row.unit === "%" ? `${targetCum}%` : targetCum.toLocaleString()}
                        </td>
                        <td className="p-3 text-center font-extrabold text-purple-700 dark:text-purple-300 bg-purple-50/50 dark:bg-purple-950/10">
                          {row.unit === "%" ? `${actualCum}%` : actualCum.toLocaleString()}
                        </td>
                        <td className={`p-3 text-center font-black bg-purple-50/50 dark:bg-purple-950/10 ${getPctColor(pctCum)}`}>
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
