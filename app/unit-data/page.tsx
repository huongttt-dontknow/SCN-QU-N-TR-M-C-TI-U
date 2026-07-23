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

  const revRow = kpiRows.find(r => r.code === "VM1-I02.01");
  const actualRev = revRow ? getActualValue(revRow) : 0;
  const targetRev = revRow ? getTargetValue(revRow) : 1;
  const revCompletion = Math.round((actualRev / targetRev) * 100);

  const trafficRow = kpiRows.find(r => r.code === "TM3-I01.02");
  const actualTraffic = trafficRow ? getActualValue(trafficRow) : 0;
  const targetTraffic = trafficRow ? getTargetValue(trafficRow) : 1;
  const trafficCompletion = Math.round((actualTraffic / targetTraffic) * 100);

  const warningList = kpiRows
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

  return (
    <div className="flex flex-col gap-6 text-white text-sm">
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
        <div className="flex flex-wrap justify-between items-center gap-4 mb-4 border-b border-white/10 pb-3">
          <h3 className="text-base font-black text-sky-400 tracking-wide uppercase">
            Bộ Chỉ Tiêu: {currentUnitName} ({getPeriodLabel()})
          </h3>
          <button
            onClick={() => alert("Hệ thống đang xuất file Excel dữ liệu bộ 7 chỉ tiêu...")}
            className="bg-indigo-800 hover:bg-indigo-700 text-white text-xs font-black px-4 py-2 rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
          >
            <Download size={15} /> Xuất File Excel
          </button>
        </div>

        {/* BẢNG THÔNG TIN DỮ LIỆU */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-300 font-black bg-slate-900/60 uppercase text-xs tracking-wider">
                <th className="p-3 w-28 text-center">Mã chỉ tiêu</th>
                <th className="p-3">Mục tiêu / Chỉ tiêu cấp bộ phận</th>
                <th className="p-3 w-20 text-center">ĐVT</th>
                
                {/* CỤM CỘT THEO KỲ CHÍNH (XANH LAM) */}
                <th className="p-3 w-32 text-center bg-sky-950/40 text-sky-300 border-l border-white/10">KH {primaryTitle}</th>
                <th className="p-3 w-32 text-center bg-sky-950/40 text-sky-300">Thực tế {primaryTitle}</th>
                <th className="p-3 w-28 text-center bg-sky-950/40 text-sky-300 border-r border-white/10">% HT {primaryTitle}</th>

                {/* CỤM CỘT LŨY KẾ KỲ TIẾP THEO (TÍM) */}
                {filters.periodType !== "yearly" && (
                  <>
                    <th className="p-3 w-32 text-center bg-purple-950/40 text-purple-300">KH {cumulativeTitle}</th>
                    <th className="p-3 w-32 text-center bg-purple-950/40 text-purple-300">Thực tế {cumulativeTitle}</th>
                    <th className="p-3 w-28 text-center bg-purple-950/40 text-purple-300">% HT {cumulativeTitle}</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody>
              {kpiRows.map(row => {
                const targetPri = getTargetValue(row);
                const actualPri = getActualValue(row);
                const pctPri = targetPri > 0 ? Math.round((actualPri / targetPri) * 100) : 100;

                const targetCum = getCumulativeTarget(row);
                const actualCum = getCumulativeActual(row);
                const pctCum = targetCum > 0 ? Math.round((actualCum / targetCum) * 100) : 100;

                if (row.isParent) {
                  const isExpanded = expandedRows[row.code];
                  return (
                    <tr 
                      key={row.code} 
                      onClick={() => toggleRow(row.code)}
                      className="bg-slate-900/80 hover:bg-slate-800 text-[var(--accent-cyan)] font-black border-b border-white/10 cursor-pointer select-none transition-all text-sm"
                    >
                      <td className="p-3 text-center">
                        <span className="inline-flex items-center justify-center gap-1 font-mono">
                          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                          {row.code}
                        </span>
                      </td>
                      <td colSpan={2} className="p-3 uppercase tracking-wider font-black text-white">
                        {row.title}
                      </td>
                      
                      {/* Cột kỳ chính */}
                      <td className="p-3 text-center font-black border-l border-white/10 text-slate-200">
                        {row.unit === "%" ? `${targetPri}%` : targetPri.toLocaleString()}
                      </td>
                      <td className="p-3 text-center font-black text-white">
                        {row.unit === "%" ? `${actualPri}%` : actualPri.toLocaleString()}
                      </td>
                      <td className={`p-3 text-center font-black border-r border-white/10 ${getPctColor(pctPri)}`}>
                        {pctPri}%
                      </td>

                      {/* Cột lũy kế */}
                      {filters.periodType !== "yearly" && (
                        <>
                          <td className="p-3 text-center font-black text-slate-300">
                            {row.unit === "%" ? `${targetCum}%` : targetCum.toLocaleString()}
                          </td>
                          <td className="p-3 text-center font-black text-purple-200">
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

                // Dòng con
                if (row.parentCode && !expandedRows[row.parentCode]) {
                  return null;
                }

                return (
                  <tr key={row.code} className="border-b border-white/5 hover:bg-white/5 text-sm text-slate-200">
                    <td className="p-3 text-center">
                      <code className="bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono text-xs border border-sky-500/20 font-bold">
                        {row.code}
                      </code>
                    </td>
                    <td className="p-3 font-semibold text-white pl-6">
                      {row.title}
                    </td>
                    <td className="p-3 text-center text-slate-400 font-extrabold text-xs">{row.unit}</td>

                    {/* Dữ liệu Kỳ chính */}
                    <td className="p-3 text-center font-bold text-slate-300 border-l border-white/5 bg-sky-950/10">
                      {row.unit === "%" ? `${targetPri}%` : targetPri.toLocaleString()}
                    </td>
                    <td className="p-3 text-center font-extrabold text-white bg-sky-950/10">
                      {row.unit === "%" ? `${actualPri}%` : actualPri.toLocaleString()}
                    </td>
                    <td className={`p-3 text-center font-black border-r border-white/5 bg-sky-950/10 ${getPctColor(pctPri)}`}>
                      {pctPri}%
                    </td>

                    {/* Dữ liệu Lũy kế */}
                    {filters.periodType !== "yearly" && (
                      <>
                        <td className="p-3 text-center font-bold text-slate-400 bg-purple-950/10">
                          {row.unit === "%" ? `${targetCum}%` : targetCum.toLocaleString()}
                        </td>
                        <td className="p-3 text-center font-extrabold text-purple-300 bg-purple-950/10">
                          {row.unit === "%" ? `${actualCum}%` : actualCum.toLocaleString()}
                        </td>
                        <td className={`p-3 text-center font-black bg-purple-950/10 ${getPctColor(pctCum)}`}>
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
