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
  Download
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
}

export default function UnitDataPage() {
  const { filters } = useApp();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    "M1": true, "M2": true, "M3": true, "M4": true, "M5": true, "M6": true, "M7": true
  });
  const [kpiRows, setKpiRows] = useState<KpiRow[]>([]);

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
    const defaultData: KpiRow[] = [
      // M1. TÀI CHÍNH / KINH DOANH
      { code: "M1", title: "M1. TÀI CHÍNH / KINH DOANH", unit: "VNĐ", targetWeek: 350000000, actualWeek: 310000000, targetMonth: 1400000000, actualMonth: 1550000000, targetQuarter: 4200000000, actualQuarter: 4500000000, targetYear: 16800000000, actualYear: 17500000000, isParent: true },
      { code: "VM1-I01.01", title: "Tỷ suất lợi nhuận ROI", unit: "%", targetWeek: 100, actualWeek: 85, targetMonth: 95, actualMonth: 100, targetQuarter: 100, actualQuarter: 105, targetYear: 100, actualYear: 110, isParent: false, parentCode: "M1" },
      { code: "VM1-I02.01", title: "Tổng doanh thu", unit: "VNĐ", targetWeek: 273600000, actualWeek: 246240000, targetMonth: 1094400000, actualMonth: 1253664000, targetQuarter: 3283200000, actualQuarter: 3600000000, targetYear: 13132800000, actualYear: 14200000000, isParent: false, parentCode: "M1" },
      { code: "VM1-I05.03", title: "Chi phí mua công cụ AI mới", unit: "VNĐ", targetWeek: 16680000, actualWeek: 14428200, targetMonth: 13740000, actualMonth: 15388800, targetQuarter: 45000000, actualQuarter: 48000000, targetYear: 180000000, actualYear: 190000000, isParent: false, parentCode: "M1" },
      { code: "VM1-I05.04", title: "Chi phí CTV (Cộng tác viên)", unit: "VNĐ", targetWeek: 36720000, actualWeek: 27540000, targetMonth: 36576000, actualMonth: 45537120, targetQuarter: 110000000, actualQuarter: 125000000, targetYear: 440000000, actualYear: 480000000, isParent: false, parentCode: "M1" },

      // M2. SẢN PHẨM / SẢN XUẤT
      { code: "M2", title: "M2. SẢN PHẨM / SẢN XUẤT", unit: "Video", targetWeek: 30, actualWeek: 36, targetMonth: 120, actualMonth: 177, targetQuarter: 360, actualQuarter: 450, targetYear: 1440, actualYear: 1600, isParent: true },
      { code: "VM2-I01.01", title: "Số lượng video hoàn thành sản xuất", unit: "Video", targetWeek: 30, actualWeek: 36, targetMonth: 120, actualMonth: 177, targetQuarter: 360, actualQuarter: 450, targetYear: 1440, actualYear: 1600, isParent: false, parentCode: "M2" },
      { code: "↳ Ban WO", title: "Wolfoo (WO)", unit: "Video", targetWeek: 3, actualWeek: 3, targetMonth: 12, actualMonth: 15, targetQuarter: 36, actualQuarter: 45, targetYear: 144, actualYear: 160, isParent: false, parentCode: "M2" },
      { code: "VM2-I01.03", title: "Số lượng ý tưởng mới", unit: "Ý tưởng", targetWeek: 15, actualWeek: 18, targetMonth: 60, actualMonth: 72, targetQuarter: 180, actualQuarter: 210, targetYear: 720, actualYear: 800, isParent: false, parentCode: "M2" },

      // M3. KHÁCH HÀNG / DỊCH VỤ
      { code: "M3", title: "M3. KHÁCH HÀNG / DỊCH VỤ", unit: "Triệu views", targetWeek: 30, actualWeek: 28, targetMonth: 120, actualMonth: 110, targetQuarter: 360, actualQuarter: 340, targetYear: 1440, actualYear: 1380, isParent: true },
      { code: "TM3-I01.02", title: "Tổng traffic đơn vị (Views)", unit: "Triệu", targetWeek: 30, actualWeek: 28, targetMonth: 120, actualMonth: 110, targetQuarter: 360, actualQuarter: 340, targetYear: 1440, actualYear: 1380, isParent: false, parentCode: "M3" },
      { code: "TM3-I01.03", title: "Số lượng video upload", unit: "Video", targetWeek: 40, actualWeek: 42, targetMonth: 160, actualMonth: 175, targetQuarter: 480, actualQuarter: 520, targetYear: 1920, actualYear: 2000, isParent: false, parentCode: "M3" },

      // M4. THƯƠNG HIỆU / KÊNH KINH DOANH
      { code: "M4", title: "M4. THƯƠNG HIỆU / KÊNH KINH DOANH", unit: "Kênh", targetWeek: 2, actualWeek: 2, targetMonth: 8, actualMonth: 9, targetQuarter: 24, actualQuarter: 28, targetYear: 96, actualYear: 105, isParent: true },
      { code: "TM4-I02.01", title: "Số kênh đạt ngưỡng 10k $/tháng", unit: "Kênh", targetWeek: 1, actualWeek: 1, targetMonth: 4, actualMonth: 5, targetQuarter: 12, actualQuarter: 15, targetYear: 48, actualYear: 55, isParent: false, parentCode: "M4" },

      // M5. QUẢN TRỊ VẬN HÀNH
      { code: "M5", title: "M5. QUẢN TRỊ VẬN HÀNH", unit: "Điểm", targetWeek: 10, actualWeek: 9.2, targetMonth: 10, actualMonth: 9.5, targetQuarter: 10, actualQuarter: 9.6, targetYear: 10, actualYear: 9.7, isParent: true },
      { code: "VM5-I02.01", title: "Thời gian sản xuất TB 1 video", unit: "Ngày", targetWeek: 5, actualWeek: 5.5, targetMonth: 5, actualMonth: 5.2, targetQuarter: 5, actualQuarter: 4.9, targetYear: 5, actualYear: 4.8, isParent: false, parentCode: "M5" },

      // M6. NHÂN SỰ TỔ CHỨC
      { code: "M6", title: "M6. NHÂN SỰ TỔ CHỨC", unit: "%", targetWeek: 100, actualWeek: 95, targetMonth: 100, actualMonth: 96, targetQuarter: 100, actualQuarter: 97, targetYear: 100, actualYear: 98, isParent: true },
      { code: "TM6-I01.02", title: "Tỷ lệ nhân sự tham gia đào tạo", unit: "%", targetWeek: 90, actualWeek: 85, targetMonth: 90, actualMonth: 92, targetQuarter: 90, actualQuarter: 94, targetYear: 90, actualYear: 95, isParent: false, parentCode: "M6" },

      // M7. VĂN HÓA DOANH NGHIỆP
      { code: "M7", title: "M7. VĂN HÓA DOANH NGHIỆP", unit: "%", targetWeek: 100, actualWeek: 99.85, targetMonth: 100, actualMonth: 99.9, targetQuarter: 100, actualQuarter: 99.92, targetYear: 100, actualYear: 99.95, isParent: true },
      { code: "VM7-I03.01", title: "Tỷ lệ nhân sự không vi phạm kỷ luật", unit: "%", targetWeek: 98, actualWeek: 99.85, targetMonth: 98, actualMonth: 99.9, targetQuarter: 98, actualQuarter: 99.92, targetYear: 98, actualYear: 99.95, isParent: false, parentCode: "M7" },
    ];

    setKpiRows(defaultData);
  }, [filters]);

  const toggleRow = (code: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  // Xác định tiêu đề cột Theo Kỳ & Lũy Kế
  const isWeekly = filters.periodType === "weekly";
  const isMonthly = filters.periodType === "monthly";
  const isQuarterly = filters.periodType === "quarterly";

  const primaryTitle = isWeekly ? "Tuần" : isMonthly ? "Tháng" : isQuarterly ? "Quý" : "Năm";
  const cumulativeTitle = isWeekly ? "Tháng" : isMonthly ? "Quý" : isQuarterly ? "Năm" : "5 Năm";

  // 1. Tính toán Doanh thu trong kỳ (Card 1) tương ứng dòng VM1-I02.01 (Tổng doanh thu)
  const revRow = kpiRows.find(r => r.code === "VM1-I02.01");
  const targetRev = isWeekly ? (revRow?.targetWeek || 1) : isMonthly ? (revRow?.targetMonth || 1) : isQuarterly ? (revRow?.targetQuarter || 1) : (revRow?.targetYear || 1);
  const actualRev = isWeekly ? (revRow?.actualWeek || 0) : isMonthly ? (revRow?.actualMonth || 0) : isQuarterly ? (revRow?.actualQuarter || 0) : (revRow?.actualYear || 0);
  const revCompletion = targetRev > 0 ? Math.round((actualRev / targetRev) * 100) : 0;

  // 2. Tính toán Traffic trong kỳ (Card 2) tương ứng dòng TM3-I01.02 (Tổng traffic đơn vị Views)
  const trafficRow = kpiRows.find(r => r.code === "TM3-I01.02");
  const targetTraffic = isWeekly ? (trafficRow?.targetWeek || 1) : isMonthly ? (trafficRow?.targetMonth || 1) : isQuarterly ? (trafficRow?.targetQuarter || 1) : (trafficRow?.targetYear || 1);
  const actualTraffic = isWeekly ? (trafficRow?.actualWeek || 0) : isMonthly ? (trafficRow?.actualMonth || 0) : isQuarterly ? (trafficRow?.actualQuarter || 0) : (trafficRow?.actualYear || 0);
  const trafficCompletion = targetTraffic > 0 ? Math.round((actualTraffic / targetTraffic) * 100) : 0;

  // 3. Lọc chỉ tiêu báo động (< 80%) theo kỳ được chọn
  const warningList = kpiRows
    .filter(r => !r.isParent)
    .map(r => {
      const target = isWeekly ? r.targetWeek : isMonthly ? r.targetMonth : isQuarterly ? r.targetQuarter : r.targetYear;
      const actual = isWeekly ? r.actualWeek : isMonthly ? r.actualMonth : isQuarterly ? r.actualQuarter : r.actualYear;
      const pct = target > 0 ? Math.round((actual / target) * 100) : 100;
      return { ...r, target, actual, pct };
    })
    .filter(r => r.pct < 80)
    .sort((a, b) => a.pct - b.pct);

  const formatVal = (val: number, unit: string) => {
    if (unit === "%") return `${val}%`;
    return val.toLocaleString();
  };

  const getPctColor = (pct: number) => {
    if (pct < 80) return "text-rose-500 font-extrabold";
    if (pct < 100) return "text-amber-400 font-extrabold";
    return "text-emerald-400 font-extrabold";
  };

  return (
    <div className="flex flex-col gap-5 text-white">
      {/* 1. FREEZE FILTERS PANEL */}
      <FiltersHeader />

      {/* 2. MICRO CARDS TỔNG QUAN ĐƠN VỊ (KHỚP DỮ LIỆU ĐỘNG THEO KỲ) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Doanh thu trong kỳ */}
        <div className="glass-panel p-4 flex flex-col justify-between min-h-[110px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
              DOANH THU TRONG KỲ ({primaryTitle.toUpperCase()})
            </span>
            <DollarSign size={16} className="text-amber-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black ${revCompletion < 100 ? "text-amber-400" : "text-emerald-400"}`}>
                {revCompletion}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full mt-2 overflow-hidden border border-white/5">
              <div 
                className={`h-full rounded-full ${revCompletion < 100 ? "bg-amber-500" : "bg-emerald-500"}`} 
                style={{ width: `${Math.min(100, revCompletion)}%` }} 
              />
            </div>
            <span className="text-[10px] text-[var(--text-muted)] font-semibold block mt-1">
              Thực tế: {(actualRev / 1000000).toFixed(1)}M / KH: {(targetRev / 1000000).toFixed(1)}M VNĐ
            </span>
          </div>
        </div>

        {/* Card 2: Traffic trong kỳ */}
        <div className="glass-panel p-4 flex flex-col justify-between min-h-[110px]">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
              TRAFFIC TRONG KỲ ({primaryTitle.toUpperCase()})
            </span>
            <TrendingUp size={16} className="text-purple-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-3xl font-black ${trafficCompletion < 100 ? "text-purple-400" : "text-emerald-400"}`}>
                {trafficCompletion}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-950 rounded-full mt-2 overflow-hidden border border-white/5">
              <div 
                className={`h-full rounded-full ${trafficCompletion < 100 ? "bg-purple-500" : "bg-emerald-500"}`} 
                style={{ width: `${Math.min(100, trafficCompletion)}%` }} 
              />
            </div>
            <span className="text-[10px] text-[var(--text-muted)] font-semibold block mt-1">
              Thực tế: {actualTraffic}M / KH: {targetTraffic}M Views
            </span>
          </div>
        </div>

        {/* Card 3: Chỉ tiêu báo động (< 80%) */}
        <div className={`glass-panel p-4 flex flex-col justify-between min-h-[110px] border-l-4 ${warningList.length > 0 ? "border-l-rose-500" : "border-l-emerald-500"}`}>
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider flex items-center gap-1">
              <AlertOctagon size={14} /> CHỈ TIÊU BÁO ĐỘNG (&lt; 80%)
            </span>
          </div>
          <div className="space-y-1 text-[11px] font-semibold text-rose-300">
            {warningList.length > 0 ? (
              warningList.map(w => (
                <p key={w.code}>• {w.title}: <strong className="text-rose-400">{w.pct}%</strong></p>
              ))
            ) : (
              <span className="text-emerald-400 font-extrabold text-xs block py-1">
                ✓ Tất cả chỉ tiêu đạt trên 80%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 3. BẢNG DỮ LỆU BỘ 7 MỤC TIÊU (HIỂN THỊ KỲ NÀY & LŨY KẾ THEO YÊU CẦU - KHỚP 100% ẢNH MỚI) */}
      <div className="glass-panel p-5 overflow-hidden">
        
        {/* HEADER BẢNG THÔNG TIN CÓ NÚT XUẤT FILE EXCEL */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-white/10 pb-3">
          <h3 className="text-base font-black text-sky-400 tracking-wide uppercase">
            Bộ Chỉ Tiêu: {currentUnitName} ({getPeriodLabel()})
          </h3>
          <button
            onClick={() => alert("Hệ thống đang xuất file Excel dữ liệu bộ 7 chỉ tiêu...")}
            className="bg-indigo-800 hover:bg-indigo-700 text-white text-xs font-black px-4 py-2 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
          >
            <Download size={14} /> Xuất File Excel
          </button>
        </div>

        {/* BẢNG THÔNG TIN DỮ LIỆU */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-300 font-bold bg-slate-900/60 uppercase text-[10px] tracking-wider">
                <th className="p-3 w-28 text-center">Mã chỉ tiêu</th>
                <th className="p-3">Mục tiêu / Chỉ tiêu cấp bộ phận</th>
                <th className="p-3 w-20 text-center">ĐVT</th>
                
                {/* CỤM CỘT THEO KỲ CHÍNH (XANH LAM) */}
                <th className="p-3 w-28 text-center bg-sky-950/40 text-sky-300 border-l border-white/10">KH {primaryTitle}</th>
                <th className="p-3 w-28 text-center bg-sky-950/40 text-sky-300">Thực tế {primaryTitle}</th>
                <th className="p-3 w-24 text-center bg-sky-950/40 text-sky-300 border-r border-white/10">% HT {primaryTitle}</th>

                {/* CỤM CỘT LŨY KẾ KỲ TIẾP THEO (TÍM) */}
                {filters.periodType !== "yearly" && (
                  <>
                    <th className="p-3 w-28 text-center bg-purple-950/40 text-purple-300">KH {cumulativeTitle}</th>
                    <th className="p-3 w-28 text-center bg-purple-950/40 text-purple-300">Thực tế {cumulativeTitle}</th>
                    <th className="p-3 w-24 text-center bg-purple-950/40 text-purple-300">% HT {cumulativeTitle}</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {kpiRows.map(row => {
                const isParent = row.isParent;
                const isExpanded = expandedRows[row.code];

                // Nếu là con của parent bị collapse thì ẩn đi
                if (row.parentCode && !expandedRows[row.parentCode]) {
                  return null;
                }

                // Lấy số liệu theo kỳ được chọn
                const targetPrim = isWeekly ? row.targetWeek : isMonthly ? row.targetMonth : isQuarterly ? row.targetQuarter : row.targetYear;
                const actualPrim = isWeekly ? row.actualWeek : isMonthly ? row.actualMonth : isQuarterly ? row.actualQuarter : row.actualYear;
                const pctPrim = targetPrim > 0 ? Math.round((actualPrim / targetPrim) * 100) : 100;

                // Lấy số liệu Lũy Kế
                const targetCum = isWeekly ? row.targetMonth : isMonthly ? row.targetQuarter : row.targetYear;
                const actualCum = isWeekly ? row.actualMonth : isMonthly ? row.actualQuarter : row.actualYear;
                const pctCum = targetCum > 0 ? Math.round((actualCum / targetCum) * 100) : 100;

                return (
                  <tr 
                    key={row.code} 
                    className={`border-b border-white/5 transition-all ${
                      isParent 
                        ? "bg-slate-900/60 font-black text-white hover:bg-slate-900/80" 
                        : "text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {/* Mã chỉ tiêu */}
                    <td className="p-3 text-center">
                      <code className="bg-slate-800/80 text-sky-400 px-2 py-0.5 rounded text-[11px] font-mono border border-sky-500/20">
                        {row.code}
                      </code>
                    </td>

                    {/* Tiêu đề mục tiêu */}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {isParent && (
                          <button 
                            onClick={() => toggleRow(row.code)}
                            className="text-sky-400 focus:outline-none"
                          >
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                        )}
                        {!isParent && <span className="text-purple-400 pl-4">↳</span>}
                        <span className={isParent ? "font-black tracking-wide text-sky-300" : "font-semibold text-slate-200"}>
                          {row.title}
                        </span>
                      </div>
                    </td>

                    {/* ĐVT */}
                    <td className="p-3 text-center font-bold text-slate-400">{row.unit}</td>

                    {/* SỐ LIỆU KỲ CHÍNH (KH, THỰC TẾ, % HT) */}
                    <td className="p-3 text-center font-semibold text-slate-300 bg-sky-950/20 border-l border-white/5">
                      {formatVal(targetPrim, row.unit)}
                    </td>
                    <td className="p-3 text-center font-extrabold text-white bg-sky-950/20">
                      {formatVal(actualPrim, row.unit)}
                    </td>
                    <td className={`p-3 text-center bg-sky-950/20 border-r border-white/5 ${getPctColor(pctPrim)}`}>
                      {pctPrim}%
                    </td>

                    {/* SỐ LIỆU LŨY KẾ KỲ TIẾP THEO (KH, THỰC TẾ LŨY KẾ, % HT LŨY KẾ) */}
                    {filters.periodType !== "yearly" && (
                      <>
                        <td className="p-3 text-center font-semibold text-slate-400 bg-purple-950/20">
                          {formatVal(targetCum, row.unit)}
                        </td>
                        <td className="p-3 text-center font-extrabold text-slate-200 bg-purple-950/20">
                          {formatVal(actualCum, row.unit)}
                        </td>
                        <td className={`p-3 text-center bg-purple-950/20 ${getPctColor(pctCum)}`}>
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
