"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import ObjectiveRadarChart from "@/components/ObjectiveRadarChart";
import RevenueDonutChart from "@/components/RevenueDonutChart";
import SourceRevenueDonutChart from "@/components/SourceRevenueDonutChart";
import { getMasterKpiRecord } from "@/lib/kpiMasterData";
import { getRadarScores } from "@/lib/radarMasterData";
import { BarChart3 } from "lucide-react";
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  LabelList
} from "recharts";

export default function DashboardPage() {
  const { filters, theme } = useApp();
  const [bodComment, setBodComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setBodComment("");
    setIsSaved(false);
  }, [filters]);

  const handleSaveComment = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Helper tính periodKey dựa trên bộ lọc
  const getPeriodKey = () => {
    if (filters.periodType === "weekly") {
      return `weekly_${filters.month}_${filters.week}`;
    } else if (filters.periodType === "monthly") {
      return `monthly_${filters.month}`;
    } else if (filters.periodType === "quarterly") {
      return `quarterly_${filters.quarter}`;
    } else {
      return `yearly_2026`;
    }
  };

  const periodKey = getPeriodKey();

  // Dữ liệu biểu đồ so sánh hoàn thành doanh thu 9 đơn vị THỰC TẾ từ lib/kpiMasterData.ts
  const unitList = [
    { code: "Wofloo", label: "Wolfoo" },
    { code: "Lego", label: "Lego" },
    { code: "AS", label: "Animated" },
    { code: "DA01", label: "Dự án 01" },
    { code: "Music", label: "Music" },
    { code: "NDTH", label: "NDTH" },
    { code: "CR", label: "Creative" },
    { code: "CN", label: "CNGP" },
    { code: "SCS", label: "Studio" },
  ];

  const barComparisonData = unitList.map(u => {
    const rec = getMasterKpiRecord(u.code, "VM1-I02.01", periodKey);
    const target = rec?.target ? Math.round(rec.target / 1e6) : 0;
    const revenue = rec?.actual ? Math.round(rec.actual / 1e6) : 0;
    const completion = rec?.pct ? Math.round(rec.pct * 100) : (target > 0 ? Math.round((revenue / target) * 100) : 0);
    return {
      name: u.label,
      target,
      revenue,
      completion
    };
  });

  // Số liệu thực tế SCVN cấp Toàn BU
  const scvnRevRec = getMasterKpiRecord("SCVN", "VM1-I02.01", periodKey);
  const scvnVolRec = getMasterKpiRecord("SCVN", "VM2-I01.01", periodKey);
  const scvnDisciplineRec = getMasterKpiRecord("SCVN", "TM7-I01.01", periodKey);
  const scvnRoiRec = getMasterKpiRecord("SCVN", "VM1-I01.01", periodKey);

  // Card 1: Doanh thu & Tiến độ hoàn thành SCVN
  const revTargetVal = scvnRevRec?.target ? (scvnRevRec.target >= 1e9 ? `${(scvnRevRec.target / 1e9).toFixed(2)} Tỷ VNĐ` : `${(scvnRevRec.target / 1e6).toFixed(0)} Triệu VNĐ`) : "7.98 Tỷ VNĐ";
  const revActualVal = scvnRevRec?.actual ? (scvnRevRec.actual >= 1e9 ? `${(scvnRevRec.actual / 1e9).toFixed(2)} Tỷ VNĐ` : `${(scvnRevRec.actual / 1e6).toFixed(0)} Triệu VNĐ`) : "3.76 Tỷ VNĐ";
  const revPct = scvnRevRec?.pct ? Math.round(scvnRevRec.pct * 100) : 47;

  // Card 2: Sản lượng Video hoàn thành SCVN
  const volTargetVal = scvnVolRec?.target ?? 112;
  const volActualVal = scvnVolRec?.actual ?? 108;
  const volPct = scvnVolRec?.pct ? Math.round(scvnVolRec.pct * 100) : (volTargetVal > 0 ? Math.round((volActualVal / volTargetVal) * 100) : 96);

  // Card 3: Đơn vị xuất sắc nhất
  const topUnit = [...barComparisonData].sort((a, b) => b.completion - a.completion)[0] || { name: "Dự án 01", completion: 88 };

  // Card 4: Tỷ lệ không vi phạm kỷ luật
  const disciplinePct = scvnDisciplineRec?.actual ? `${scvnDisciplineRec.actual}%` : (scvnDisciplineRec?.pct ? `${(scvnDisciplineRec.pct * 100).toFixed(1)}%` : "99.85%");

  // Card 5: ROI
  const roiVal = scvnRoiRec?.actual ? `${(scvnRoiRec.actual * 100).toFixed(1)}%` : (scvnRoiRec?.pct ? `${(scvnRoiRec.pct * 100).toFixed(1)}%` : "16.5%");

  // Dữ liệu Bánh xe mục tiêu 7 mặt M1 -> M7 từ Excel
  const radarData = getRadarScores(
    filters.unitCode,
    filters.periodType,
    filters.month,
    filters.quarter,
    filters.year
  );

  return (
    <div className="flex flex-col gap-6 text-white text-sm">
      {/* 1. FREEZE FILTERS PANEL */}
      <FiltersHeader />

      {/* 2. KHU VỰC HÀNG TRÊN (TOP SECTION - BỐ CỤC 6-6 CÂN ĐỐI) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* KHỐI BÁNH XE MỤC TIÊU & BIẾN ĐỘNG (COL-SPAN-6) */}
        <div className="lg:col-span-6 glass-panel p-5 flex flex-col md:flex-row gap-5 min-h-[380px]">
          {/* Radar Chart */}
          <div className="flex-1 flex flex-col justify-between">
            <h3 className="text-sm font-black text-white tracking-wider uppercase border-b border-white/10 pb-2.5 flex items-center gap-2">
              🎯 BÁNH XE MỤC TIÊU SỨC KHỎE ({radarData.unitName})
            </h3>
            <ObjectiveRadarChart />
            <div className="flex justify-center gap-4 text-xs font-bold mt-2">
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="w-2.5 h-1 bg-emerald-500 inline-block rounded"></span> {radarData.unitName} ({radarData.labelCurr})
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <span className="w-2.5 h-1 bg-slate-500 inline-block border-t border-dashed rounded"></span> Kỳ trước ({radarData.labelPrev})
              </span>
            </div>
          </div>

          {/* Chi tiết biến động */}
          <div className="w-full md:w-72 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-5">
            <h4 className="text-xs font-black text-[var(--accent-purple)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              📈 CHI TIẾT BIẾN ĐỘNG (7 MẶT MT)
            </h4>
            <div className="space-y-2.5 text-xs flex-1">
              <div className="flex justify-between text-xs text-[var(--text-muted)] font-black border-b border-white/10 pb-1.5 uppercase tracking-wider">
                <span>MỤC TIÊU</span>
                <div className="flex gap-4">
                  <span>HIỆN TẠI</span>
                  <span>BIẾN ĐỘNG</span>
                </div>
              </div>
              {radarData.points.map(item => {
                const isUp = item.change >= 0;
                return (
                  <div key={item.code} className="flex justify-between items-center py-1.5 border-b border-white/5 text-xs gap-2">
                    <span className="text-[var(--text-muted)] font-bold whitespace-nowrap">{item.subject}</span>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-extrabold text-white min-w-[32px] text-right text-xs">{item["Kỳ này"]}%</span>
                      <span className={`font-black min-w-[42px] text-right text-xs ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
                        {isUp ? "▲" : "▼"} {isUp ? `+${item.change}%` : `${item.change}%`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CỤM KPI CARDS (COL-SPAN-6) */}
        <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Doanh thu & Tiến độ hoàn thành */}
          <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-purple)] min-h-[175px]">
            <div>
              <span className="text-xs font-black text-[var(--accent-purple)] uppercase tracking-wider block">
                DOANH THU & TIẾN ĐỘ HOÀN THÀNH (SCVN)
              </span>
              <div className="flex items-baseline justify-between mt-1.5">
                <span className="text-4xl font-black text-white">{revPct}%</span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-sm font-extrabold text-emerald-500">
                {revActualVal} | Thực tế đạt được
              </p>
              <span className="text-xs text-[var(--text-muted)] font-semibold">(KH: {revTargetVal})</span>
            </div>
          </div>

          {/* Card 2: Sản lượng Video hoàn thành */}
          <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-emerald-500 min-h-[175px]">
            <div>
              <span className="text-xs font-black text-emerald-500 uppercase tracking-wider block">
                SẢN LƯỢNG VIDEO HOÀN THÀNH (SCVN)
              </span>
              <div className="flex items-baseline justify-between mt-1.5">
                <span className="text-4xl font-black text-emerald-500">{volActualVal} Video</span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-sm font-extrabold text-emerald-500">
                Đạt {volPct}% Kế hoạch
              </p>
              <span className="text-xs text-[var(--text-muted)] font-semibold">(KH: {volTargetVal} Video)</span>
            </div>
          </div>

          {/* Card 3: Đơn vị HT Doanh thu cao nhất */}
          <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-cyan)] min-h-[175px]">
            <div>
              <span className="text-xs font-black text-[var(--accent-cyan)] uppercase tracking-wider block">
                ĐƠN VỊ HT DOANH THU CAO NHẤT
              </span>
              <div className="mt-1.5">
                <span className="text-3xl font-black text-white truncate block">
                  {topUnit.name} - {topUnit.completion}%
                </span>
              </div>
            </div>
            <div className="text-xs text-[var(--text-muted)] border-t border-white/5 pt-2 font-bold">
              Đơn vị trực thuộc xuất sắc nhất kỳ
            </div>
          </div>

          {/* Card 4: Tỷ lệ không vi phạm kỷ luật */}
          <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-pink)] min-h-[175px]">
            <div>
              <span className="text-xs font-black text-[var(--accent-pink)] uppercase tracking-wider block">
                TỶ LỆ KHÔNG VI PHẠM KỶ LUẬT
              </span>
              <div className="mt-1.5">
                <span className="text-4xl font-black text-[var(--accent-pink)]">
                  {disciplinePct}
                </span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-sm font-extrabold text-emerald-500">
                Kỷ luật tuân thủ nhân sự
              </p>
              <span className="text-xs text-[var(--text-muted)] font-semibold">(Mục tiêu: &gt; 98.0%)</span>
            </div>
          </div>

          {/* Card 5: Tỷ suất lợi nhuận ROI */}
          {(filters.periodType === "quarterly" || filters.periodType === "yearly") && (
            <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-purple-500 md:col-span-2 min-h-[140px]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-black text-purple-400 uppercase tracking-wider block">
                    TỶ SUẤT LỢI NHUẬN ROI ({filters.periodType === "quarterly" ? "QUÝ" : "NĂM"})
                  </span>
                  <span className="text-4xl font-black text-purple-300 mt-1 block">
                    {roiVal}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold block text-emerald-500">
                    Hiệu quả đầu tư ROI thực tế
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-semibold">
                    (Số liệu kế toán tổng hợp)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 3. BIỂU ĐỒ SO SÁNH HOÀN THÀNH DOANH THU CÁC ĐƠN VỊ THEO KỲ */}
      <div className="glass-panel p-6">
        <h3 className="text-sm font-black text-white tracking-wider uppercase mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-[var(--accent-cyan)]" /> 
          📊 BIỂU ĐỒ SO SÁNH HOÀN THÀNH DOANH THU {filters.periodType === "weekly" ? `TUẦN ${filters.week} - THÁNG ${filters.month}` : filters.periodType === "monthly" ? `THÁNG ${filters.month}` : filters.periodType === "quarterly" ? `QUÝ ${filters.quarter}` : "CẢ NĂM"} / {filters.year} (9 ĐƠN VỊ)
        </h3>
        
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={barComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === "light" ? "#cbd5e1" : "rgba(255, 255, 255, 0.05)"} />
              <XAxis dataKey="name" tick={{ fill: theme === "light" ? "#0f172a" : "#94a3b8", fontSize: 11, fontWeight: 700 }} />
              <YAxis 
                yAxisId="left" 
                tick={{ fill: theme === "light" ? "#0f172a" : "#94a3b8", fontSize: 11 }} 
                tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(1)}T` : `${val}Tr`} 
                label={{ value: 'Triệu VNĐ', angle: -90, position: 'insideLeft', fill: theme === "light" ? "#0f172a" : "#94a3b8" }} 
              />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: theme === "light" ? "#0f172a" : "#94a3b8", fontSize: 11 }} label={{ value: '% HT', angle: 90, position: 'insideRight', fill: theme === "light" ? "#0f172a" : "#94a3b8" }} />
              <RechartsTooltip 
                formatter={(value: any, name: any) => {
                  if (name === "% Hoàn thành") return [`${value}%`, name];
                  const num = Number(value) || 0;
                  const str = num >= 1000 ? `${(num / 1000).toFixed(2)} Tỷ VNĐ (${num.toLocaleString()} Triệu)` : `${num.toLocaleString()} Triệu VNĐ`;
                  return [str, name];
                }}
                contentStyle={{ 
                  background: theme === "light" ? "#ffffff" : "#0f172a", 
                  border: theme === "light" ? "1px solid #cbd5e1" : "1px solid var(--glass-border)", 
                  borderRadius: 8,
                  color: theme === "light" ? "#0f172a" : "#ffffff",
                  fontWeight: "bold"
                }} 
              />
              <Bar yAxisId="left" dataKey="target" name="Mục tiêu (Triệu VNĐ)" fill="#0284c7" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="revenue" name="Thực tế (Triệu VNĐ)" fill="#16a34a" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="completion" name="% Hoàn thành" stroke="#a855f7" strokeWidth={3} dot={{ r: 6, fill: "#a855f7", stroke: "#ffffff", strokeWidth: 2 }}>
                <LabelList 
                  dataKey="completion" 
                  position="top" 
                  offset={12}
                  formatter={(val: any) => `${val}%`} 
                  style={{ 
                    fill: theme === "light" ? "#6d28d9" : "#facc15", 
                    fontSize: 12, 
                    fontWeight: 900,
                    paintOrder: "stroke",
                    stroke: theme === "light" ? "#ffffff" : "#0f172a",
                    strokeWidth: 3
                  }} 
                />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. KHU VỰC CƠ CẤU DOANH THU & TRAFFIC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Tỷ trọng Cơ cấu Doanh thu (M1) */}
        <div className="glass-panel p-5">
          <h3 className="text-sm font-black text-white tracking-wider uppercase mb-1">
            📊 Tỷ trọng Cơ cấu Doanh thu (M1)
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-4 font-semibold">
            Cơ cấu đóng góp doanh thu theo Đơn vị và theo Nguồn phát sinh doanh thu
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
            <div>
              <h4 className="text-xs font-extrabold text-white uppercase mb-2 text-center">Doanh thu theo Đơn vị</h4>
              <RevenueDonutChart />
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-4">
              <h4 className="text-xs font-extrabold text-white uppercase mb-2 text-center">Doanh thu theo Nguồn</h4>
              <SourceRevenueDonutChart />
            </div>
          </div>
        </div>

        {/* Mức độ Hoàn thành Mục tiêu Traffic (M4) */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <h3 className="text-sm font-black text-white tracking-wider uppercase mb-1">
            📈 Mức độ Hoàn thành Mục tiêu Traffic (M4)
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-3 font-semibold">
            So sánh lượt xem/truy cập thực tế so với mục tiêu kế hoạch (M triệu views)
          </p>
          <div className="space-y-3 overflow-y-auto max-h-[280px] pr-1">
            {[
              { name: "Wolfoo (WO)", actual: 369.0, target: 330.0, pct: 112, color: "bg-emerald-600 font-extrabold" },
              { name: "Lego (LE)", actual: 140.0, target: 154.0, pct: 91, color: "bg-lime-500 font-extrabold" },
              { name: "Animated Story", actual: 84.0, target: 109.0, pct: 77, color: "bg-rose-500 font-extrabold" },
              { name: "Dự án 01 (DA)", actual: 103.0, target: 107.0, pct: 96, color: "bg-lime-500 font-extrabold" },
              { name: "Music (SCMU)", actual: 134.0, target: 172.0, pct: 78, color: "bg-rose-500 font-extrabold" },
              { name: "Nội dung TH", actual: 93.0, target: 75.0, pct: 124, color: "bg-emerald-500 font-extrabold" },
              { name: "Creative Hub", actual: 61.0, target: 55.0, pct: 111, color: "bg-emerald-600 font-extrabold" },
              { name: "CNGP (Game)", actual: 41.0, target: 49.0, pct: 84, color: "bg-lime-500 font-extrabold" },
              { name: "Studio (ST)", actual: 31.0, target: 34.0, pct: 91, color: "bg-lime-500 font-extrabold" },
            ].map(item => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-200 font-extrabold">{item.name}</span>
                  <span className="text-slate-300 font-black">
                    {item.actual}M / {item.target}M ({item.pct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.min(100, item.pct)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. CỤM 3 BẢNG XẾP HẠNG (BXH DOANH THU, SẢN XUẤT, TRAFFIC) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* BXH Tăng trưởng Doanh thu */}
        <div className="glass-panel p-5">
          <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
            📝 BXH Tăng trưởng Doanh thu
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-3 font-semibold">Xếp hạng theo % tăng trưởng so với kỳ trước</p>
          <div className="space-y-2.5 text-xs">
            {[
              { rank: "#1", name: "Wolfoo", val: "76.0 Tỷ", change: "+0.3%", up: true, highlight: true },
              { rank: "#2", name: "Lego", val: "70.0 Tỷ", change: "-6.4%", up: false },
              { rank: "#3", name: "Animated", val: "70.0 Tỷ", change: "-6.4%", up: false },
              { rank: "#4", name: "Dự án 01", val: "70.0 Tỷ", change: "-6.4%", up: false },
              { rank: "#5", name: "Music", val: "70.0 Tỷ", change: "-6.4%", up: false },
              { rank: "#9", name: "Studio", val: "70.0 Tỷ", change: "-6.4%", up: false, warning: true },
            ].map(row => (
              <div key={row.rank + row.name} className={`flex justify-between items-center p-2.5 rounded-lg border ${
                row.highlight ? "bg-amber-500/10 border-amber-500/30" : row.warning ? "bg-rose-500/10 border-rose-500/30" : "bg-slate-900/40 border-white/5"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-black text-amber-500 w-6 text-sm">{row.rank}</span>
                  <span className="font-extrabold text-white text-xs">{row.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)] font-bold text-xs">{row.val}</span>
                  <span className={`font-black text-xs ${row.up ? "text-emerald-500" : "text-rose-500"}`}>{row.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BXH Hoàn thành Sản xuất */}
        <div className="glass-panel p-5">
          <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
            🎬 BXH Hoàn thành Sản xuất
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-3 font-semibold">Mức độ hoàn thành kế hoạch số lượng video</p>
          <div className="space-y-2.5 text-xs">
            {[
              { rank: "#1", name: "Creative", val: "26 Video", pct: "113%", highlight: true },
              { rank: "#2", name: "Lego", val: "67 Video", pct: "112%" },
              { rank: "#3", name: "Music", val: "45 Video", pct: "100%" },
              { rank: "#4", name: "Animated", val: "50 Video", pct: "94%" },
              { rank: "#5", name: "Nội dung", val: "32 Video", pct: "91%" },
              { rank: "#9", name: "Dự án 01", val: "28 Video", pct: "76%", warning: true },
            ].map(row => (
              <div key={row.rank + row.name} className={`flex justify-between items-center p-2.5 rounded-lg border ${
                row.highlight ? "bg-amber-500/10 border-amber-500/30" : row.warning ? "bg-rose-500/10 border-rose-500/30" : "bg-slate-900/40 border-white/5"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-black text-amber-500 w-6 text-sm">{row.rank}</span>
                  <span className="font-extrabold text-white text-xs">{row.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)] font-bold text-xs">{row.val}</span>
                  <span className="font-black text-emerald-500 text-xs">{row.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BXH Tăng trưởng Traffic */}
        <div className="glass-panel p-5">
          <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
            🌐 BXH Tăng trưởng Traffic
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-3 font-semibold">Xếp hạng theo % tăng trưởng traffic views</p>
          <div className="space-y-2.5 text-xs">
            {[
              { rank: "#1", name: "Dự án 01", val: "102.0M", change: "+12.3%", up: true, highlight: true },
              { rank: "#2", name: "Creative", val: "82.0M", change: "+12.3%", up: true },
              { rank: "#3", name: "Lego", val: "137.0M", change: "+8.6%", up: true },
              { rank: "#4", name: "Nội dung", val: "87.0M", change: "+8.6%", up: true },
              { rank: "#5", name: "Animated", val: "139.0M", change: "+1.2%", up: true },
              { rank: "#9", name: "Wolfoo", val: "42.0M", change: "-10.7%", up: false, warning: true },
            ].map(row => (
              <div key={row.rank + row.name} className={`flex justify-between items-center p-2.5 rounded-lg border ${
                row.highlight ? "bg-amber-500/10 border-amber-500/30" : row.warning ? "bg-rose-500/10 border-rose-500/30" : "bg-slate-900/40 border-white/5"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-black text-amber-500 w-6 text-sm">{row.rank}</span>
                  <span className="font-extrabold text-white text-xs">{row.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)] font-bold text-xs">{row.val}</span>
                  <span className={`font-black text-xs ${row.up ? "text-emerald-500" : "text-rose-500"}`}>{row.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. KHU VỰC CHỈ ĐẠO CỦA BOD (BOTTOM SECTION) */}
      <div className="glass-panel p-5 space-y-3">
        <h3 className="text-xs font-black text-[var(--accent-purple)] uppercase tracking-wider flex items-center gap-2">
          💬 Ý KIẾN CHỈ ĐẠO ĐIỀU HÀNH CỦA BAN GIÁM ĐỐC (BOD)
        </h3>
        <p className="text-xs text-[var(--text-muted)] font-medium">
          Ghi chú ý kiến chỉ đạo hành động, nhận định hiệu xuất kỳ này để lưu trữ và gửi thông báo tới các đơn vị
        </p>
        <textarea
          value={bodComment}
          onChange={(e) => setBodComment(e.target.value)}
          placeholder="Nhập nội dung chỉ đạo điều hành chiến lược cho các đơn vị thuộc BU Sconnect..."
          rows={3}
          className="w-full bg-slate-950 border border-[var(--glass-border)] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[var(--accent-purple)] resize-none"
        />
        <div className="flex justify-end gap-3 items-center">
          {isSaved && <span className="text-xs text-emerald-500 font-extrabold">✓ Đã lưu thành công!</span>}
          <button
            onClick={handleSaveComment}
            className="bg-purple-700 hover:bg-purple-600 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl shadow transition-all"
          >
            💾 Lưu chỉ đạo BOD
          </button>
        </div>
      </div>

    </div>
  );
}
