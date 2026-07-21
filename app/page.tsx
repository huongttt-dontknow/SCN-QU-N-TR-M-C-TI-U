"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import ObjectiveRadarChart from "@/components/ObjectiveRadarChart";
import RevenueDonutChart from "@/components/RevenueDonutChart";
import SourceRevenueDonutChart from "@/components/SourceRevenueDonutChart";
import { BarChart3 } from "lucide-react";
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  CartesianGrid 
} from "recharts";

export default function DashboardPage() {
  const { filters, theme } = useApp();
  const [bodComment, setBodComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const isWeekly = filters.periodType === "weekly";

  useEffect(() => {
    setBodComment("");
    setIsSaved(false);
  }, [filters]);

  const handleSaveComment = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  // Dữ liệu biểu đồ so sánh hoàn thành doanh thu 9 đơn vị tự động tính theo kỳ lọc (Tuần / Tháng / Quý / Năm)
  const getRevenueComparisonData = () => {
    const isWeekly = filters.periodType === "weekly";
    const isMonthly = filters.periodType === "monthly";
    const isQuarterly = filters.periodType === "quarterly";

    const factor = isWeekly ? 0.08 : isMonthly ? 0.33 : isQuarterly ? 1.0 : 4.0;

    return [
      { name: "Wolfoo", target: Number((80.0 * factor).toFixed(1)), revenue: Number((76.0 * factor).toFixed(1)), completion: 95 },
      { name: "Lego", target: Number((79.5 * factor).toFixed(1)), revenue: Number((70.0 * factor).toFixed(1)), completion: 88 },
      { name: "Animated", target: Number((79.5 * factor).toFixed(1)), revenue: Number((70.0 * factor).toFixed(1)), completion: 88 },
      { name: "Dự án 01", target: Number((79.5 * factor).toFixed(1)), revenue: Number((70.0 * factor).toFixed(1)), completion: 88 },
      { name: "Music", target: Number((79.5 * factor).toFixed(1)), revenue: Number((70.0 * factor).toFixed(1)), completion: 88 },
      { name: "Nội dung", target: Number((79.5 * factor).toFixed(1)), revenue: Number((70.0 * factor).toFixed(1)), completion: 88 },
      { name: "Creative", target: Number((79.5 * factor).toFixed(1)), revenue: Number((70.0 * factor).toFixed(1)), completion: 88 },
      { name: "CNGP", target: Number((79.5 * factor).toFixed(1)), revenue: Number((70.0 * factor).toFixed(1)), completion: 88 },
      { name: "Studio", target: Number((79.5 * factor).toFixed(1)), revenue: Number((70.0 * factor).toFixed(1)), completion: 88 },
    ];
  };

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
              🎯 BÁNH XE MỤC TIÊU (SỨC KHỎE DOANH NGHIỆP)
            </h3>
            <ObjectiveRadarChart />
            <div className="flex justify-center gap-4 text-xs font-bold mt-2">
              <span className="flex items-center gap-1.5 text-emerald-500">
                <span className="w-2.5 h-1 bg-emerald-500 inline-block rounded"></span> Kỳ này (Q3/2026)
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <span className="w-2.5 h-1 bg-slate-500 inline-block border-t border-dashed rounded"></span> Kỳ trước (Q2/2026)
              </span>
            </div>
          </div>

          {/* Chi tiết biến động */}
          <div className="w-full md:w-72 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-5">
            <h4 className="text-xs font-black text-[var(--accent-purple)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              📈 CHI TIẾT BIẾN ĐỘNG
            </h4>
            <div className="space-y-2.5 text-xs flex-1">
              <div className="flex justify-between text-xs text-[var(--text-muted)] font-black border-b border-white/10 pb-1.5 uppercase tracking-wider">
                <span>MỤC TIÊU</span>
                <div className="flex gap-4">
                  <span>HIỆN TẠI</span>
                  <span>BIẾN ĐỘNG</span>
                </div>
              </div>
              {[
                { name: "Tài chính", current: "82%", change: "+7%", up: true },
                { name: "Sản phẩm/ SX", current: "88%", change: "+6%", up: true },
                { name: "Khách hàng", current: "85%", change: "+6%", up: true },
                { name: "Thương hiệu – kênh KD", current: "78%", change: "+6%", up: true },
                { name: "QT Vận hành", current: "92%", change: "+3%", up: true },
                { name: "Nhân sự", current: "87%", change: "+3%", up: true },
                { name: "Văn hóa", current: "96%", change: "+4%", up: true },
              ].map(item => (
                <div key={item.name} className="flex justify-between items-center py-1.5 border-b border-white/5 text-xs gap-2">
                  <span className="text-[var(--text-muted)] font-bold whitespace-nowrap">{item.name}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-extrabold text-white min-w-[32px] text-right text-xs">{item.current}</span>
                    <span className={`font-black min-w-[42px] text-right text-xs ${item.up ? "text-emerald-500" : "text-rose-500"}`}>
                      {item.up ? "▲" : "▼"} {item.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CỤM KPI CARDS (COL-SPAN-6) */}
        <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Doanh thu & Tiến độ hoàn thành */}
          <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-purple)] min-h-[175px]">
            <div>
              <span className="text-xs font-black text-[var(--accent-purple)] uppercase tracking-wider block">
                DOANH THU & TIẾN ĐỘ HOÀN THÀNH
              </span>
              <div className="flex items-baseline justify-between mt-1.5">
                <span className="text-4xl font-black text-white">100%</span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-sm font-extrabold text-emerald-500">
                100.0 Tỷ VNĐ | ▲ +4.0% so với quý trước
              </p>
              <span className="text-xs text-[var(--text-muted)] font-semibold">(KH: 100.0 Tỷ VNĐ)</span>
            </div>
          </div>

          {/* Card 2: Sản lượng Video hoàn thành */}
          <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-emerald-500 min-h-[175px]">
            <div>
              <span className="text-xs font-black text-emerald-500 uppercase tracking-wider block">
                SẢN LƯỢNG VIDEO HOÀN THÀNH
              </span>
              <div className="flex items-baseline justify-between mt-1.5">
                <span className="text-4xl font-black text-emerald-500">363 Video</span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-sm font-extrabold text-emerald-500">
                110% | ▲ +12.0% so với quý trước
              </p>
              <span className="text-xs text-[var(--text-muted)] font-semibold">(KH: 330 Video)</span>
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
                  Wolfoo - 95%
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
                  99.85%
                </span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-sm font-extrabold text-emerald-500">
                ▲ +0.05% so với quý trước
              </p>
              <span className="text-xs text-[var(--text-muted)] font-semibold">(KH: &gt; 98.0%)</span>
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
                    {filters.periodType === "quarterly" ? "70.0%" : "135.0%"}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-sm font-extrabold block ${filters.periodType === "quarterly" ? "text-rose-500" : "text-emerald-500"}`}>
                    {filters.periodType === "quarterly" ? "88% | ▼ -12.0% so với kỳ trước" : "▲ +12.5% so với năm trước"}
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-semibold">
                    {filters.periodType === "quarterly" ? "(KH: 80.0%)" : "(KH: 120.0%)"}
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
          📊 BIỂU ĐỒ SO SÁNH HOÀN THÀNH DOANH THU {filters.periodType === "weekly" ? "TUẦN" : filters.periodType === "monthly" ? "THÁNG" : filters.periodType === "quarterly" ? "QUÝ" : "NĂM"} (9 ĐƠN VỊ)
        </h3>
        <div className="w-full h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={getRevenueComparisonData()}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === "light" ? "#e2e8f0" : "rgba(255,255,255,0.05)"} />
              <XAxis dataKey="name" stroke={theme === "light" ? "#0f172a" : "#94a3b8"} fontSize={12} tickLine={false} />
              <YAxis yAxisId="left" stroke={theme === "light" ? "#0f172a" : "#94a3b8"} fontSize={12} tickFormatter={(val) => `${val}T`} />
              <YAxis yAxisId="right" orientation="right" stroke={theme === "light" ? "#7e22ce" : "#8b5cf6"} fontSize={12} tickFormatter={(val) => `${val}%`} />
              <RechartsTooltip contentStyle={{ background: theme === "light" ? "#ffffff" : "#0f172a", border: theme === "light" ? "1px solid #cbd5e1" : "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 13, color: theme === "light" ? "#0f172a" : "#ffffff", boxShadow: "0 4px 15px rgba(0,0,0,0.1)" }} />
              <Bar yAxisId="left" dataKey="target" fill={theme === "light" ? "#0284c7" : "#0284c7"} radius={[4, 4, 0, 0]} barSize={18} name="Mục tiêu (Tỷ)" />
              <Bar yAxisId="left" dataKey="revenue" fill={theme === "light" ? "#16a34a" : "#00f2fe"} radius={[4, 4, 0, 0]} barSize={18} name="Kết quả thực tế (Tỷ)" />
              <Line yAxisId="right" type="monotone" dataKey="completion" stroke={theme === "light" ? "#7e22ce" : "#8b5cf6"} strokeWidth={3} dot={{ r: 6, fill: theme === "light" ? "#7e22ce" : "#a855f7", stroke: "#ffffff", strokeWidth: 2 }} name="% Hoàn thành" />
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
