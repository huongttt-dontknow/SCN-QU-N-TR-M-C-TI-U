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
  const { filters } = useApp();
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

  // Dữ liệu biểu đồ so sánh hoàn thành doanh thu 9 đơn vị (Khớp ảnh 1)
  const revenueComparisonData = [
    { name: "Wolfoo", revenue: 76.0, completion: 95 },
    { name: "Lego", revenue: 70.0, completion: 88 },
    { name: "Animated", revenue: 70.0, completion: 88 },
    { name: "Dự án 01", revenue: 70.0, completion: 88 },
    { name: "Music", revenue: 70.0, completion: 88 },
    { name: "Nội dung", revenue: 70.0, completion: 88 },
    { name: "Creative", revenue: 70.0, completion: 88 },
    { name: "CNGP", revenue: 70.0, completion: 88 },
    { name: "Studio", revenue: 70.0, completion: 88 },
  ];

  return (
    <div className="flex flex-col gap-5 text-white">
      {/* 1. FREEZE FILTERS PANEL */}
      <FiltersHeader />

      {/* 2. KHU VỰC HÀNG TRÊN (TOP SECTION - KHỚP 100% ẢNH 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* KHỐI BÁNH XE MỤC TIÊU & BIẾN ĐỘNG (COL-SPAN-5) */}
        <div className="lg:col-span-5 glass-panel p-5 flex flex-col md:flex-row gap-4 min-h-[360px]">
          {/* Radar Chart */}
          <div className="flex-1 flex flex-col justify-between">
            <h3 className="text-xs font-black text-white tracking-wider uppercase border-b border-white/10 pb-2 flex items-center gap-1.5">
              🎯 BÁNH XE MỤC TIÊU (SỨC KHỎE DOANH NGHIỆP)
            </h3>
            <ObjectiveRadarChart />
            <div className="flex justify-center gap-4 text-[10px] font-bold mt-1">
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2 h-0.5 bg-emerald-400 inline-block"></span> Kỳ này (Q3/2026)
              </span>
              <span className="flex items-center gap-1 text-[var(--text-muted)]">
                <span className="w-2 h-0.5 bg-slate-500 inline-block border-t border-dashed"></span> Kỳ trước (Q2/2026)
              </span>
            </div>
          </div>

          {/* Chi tiết biến động */}
          <div className="w-full md:w-44 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-4">
            <h4 className="text-[10px] font-extrabold text-[var(--accent-purple)] uppercase tracking-wider mb-2 flex items-center gap-1">
              📈 CHI TIẾT BIẾN ĐỘNG
            </h4>
            <div className="space-y-2 text-[11px] flex-1">
              <div className="flex justify-between text-[9px] text-[var(--text-muted)] font-black border-b border-white/10 pb-1 uppercase">
                <span>MỤC TIÊU</span>
                <span>HIỆN TẠI</span>
                <span>BIẾN ĐỘNG</span>
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
                <div key={item.name} className="flex justify-between items-center py-0.5 border-b border-white/5 text-[10px]">
                  <span className="text-[var(--text-muted)] truncate font-semibold max-w-[80px]">{item.name}</span>
                  <span className="font-bold text-white">{item.current}</span>
                  <span className={`font-extrabold ${item.up ? "text-emerald-400" : "text-rose-500"}`}>
                    {item.up ? "▲" : "▼"} {item.change}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CỤM 5 THẺ KPI CHÍNH (COL-SPAN-7 - KHỚP 100% ẢNH 1) */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Doanh thu & Tiến độ hoàn thành */}
          <div className="glass-panel p-4 flex flex-col justify-between border-l-4 border-l-[var(--accent-purple)] min-h-[170px]">
            <div>
              <span className="text-[9px] font-extrabold text-[var(--accent-purple)] uppercase tracking-wider block">
                DOANH THU & TIẾN ĐỘ HOÀN THÀNH
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-3xl font-black text-white">100%</span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-xs font-bold text-emerald-400">
                100.0 Tỷ VNĐ | ▲ +4.0% so với quý trước
              </p>
              <span className="text-[10px] text-[var(--text-muted)]">(KH: 100.0 Tỷ VNĐ)</span>
            </div>
          </div>

          {/* Card 2: Sản lượng Video hoàn thành */}
          <div className="glass-panel p-4 flex flex-col justify-between border-l-4 border-l-emerald-500 min-h-[170px]">
            <div>
              <span className="text-[9px] font-extrabold text-emerald-400 uppercase tracking-wider block">
                SẢN LƯỢNG VIDEO HOÀN THÀNH
              </span>
              <div className="flex items-baseline justify-between mt-1">
                <span className="text-3xl font-black text-emerald-400">363 Video</span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-xs font-bold text-emerald-400">
                110% | ▲ +12.0% so với quý trước
              </p>
              <span className="text-[10px] text-[var(--text-muted)]">(KH: 330 Video)</span>
            </div>
          </div>

          {/* Card 3: Đơn vị HT Doanh thu cao nhất */}
          <div className="glass-panel p-4 flex flex-col justify-between border-l-4 border-l-[var(--accent-cyan)] min-h-[170px]">
            <div>
              <span className="text-[9px] font-extrabold text-[var(--accent-cyan)] uppercase tracking-wider block">
                ĐƠN VỊ HT DOANH THU CAO NHẤT
              </span>
              <div className="mt-1">
                <span className="text-2xl font-black text-white truncate block">
                  Wolfoo - 95%
                </span>
              </div>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] border-t border-white/5 pt-2 font-medium">
              Đơn vị trực thuộc xuất sắc nhất kỳ
            </div>
          </div>

          {/* Card 4: Tỷ lệ không vi phạm kỷ luật (GIỮ NGUYÊN) */}
          <div className="glass-panel p-4 flex flex-col justify-between border-l-4 border-l-[var(--accent-pink)] min-h-[170px]">
            <div>
              <span className="text-[9px] font-extrabold text-[var(--accent-pink)] uppercase tracking-wider block">
                TỶ LỆ KHÔNG VI PHẠM KỶ LUẬT
              </span>
              <div className="mt-1">
                <span className="text-3xl font-black text-[var(--accent-pink)]">
                  99.85%
                </span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-xs font-bold text-emerald-400">
                ▲ +0.05% so với quý trước
              </p>
              <span className="text-[10px] text-[var(--text-muted)]">(KH: &gt; 98.0%)</span>
            </div>
          </div>

          {/* Card 5: Tỷ suất lợi nhuận ROI (HIỂN THỊ KHI CHỌN QUÝ VÀ NĂM) */}
          {(filters.periodType === "quarterly" || filters.periodType === "yearly") && (
            <div className="glass-panel p-4 flex flex-col justify-between border-l-4 border-l-purple-500 md:col-span-2 min-h-[130px]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[9px] font-extrabold text-purple-400 uppercase tracking-wider block">
                    TỶ SUẤT LỢI NHUẬN ROI ({filters.periodType === "quarterly" ? "QUÝ" : "NĂM"})
                  </span>
                  <span className="text-3xl font-black text-purple-300 mt-1 block">
                    {filters.periodType === "quarterly" ? "70.0%" : "135.0%"}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-bold block ${filters.periodType === "quarterly" ? "text-rose-500" : "text-emerald-400"}`}>
                    {filters.periodType === "quarterly" ? "88% | ▼ -12.0% so với kỳ trước" : "▲ +12.5% so với năm trước"}
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {filters.periodType === "quarterly" ? "(KH: 80.0%)" : "(KH: 120.0%)"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 3. BIỂU ĐỒ SO SÁNH HOÀN THÀNH DOANH THU QUÝ (9 ĐƠN VỊ - KHỚP ẢNH 1) */}
      <div className="glass-panel p-5">
        <h3 className="text-xs font-black text-white tracking-wider uppercase mb-4 flex items-center gap-2">
          <BarChart3 size={16} className="text-[var(--accent-cyan)]" />
          📊 BIỂU ĐỒ SO SÁNH HOÀN THÀNH DOANH THU QUÝ (9 ĐƠN VỊ)
        </h3>
        <div className="w-full h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={revenueComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `${val}T`} />
              <YAxis yAxisId="right" orientation="right" stroke="#8b5cf6" fontSize={11} tickFormatter={(val) => `${val}%`} />
              <RechartsTooltip contentStyle={{ background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }} />
              <Bar yAxisId="left" dataKey="revenue" fill="#0369a1" radius={[4, 4, 0, 0]} barSize={24} name="Doanh thu (Tỷ)" />
              <Line yAxisId="right" type="monotone" dataKey="completion" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 5, fill: "#8b5cf6" }} name="% Hoàn thành" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. KHU VỰC CƠ CẤU DOANH THU & TRAFFIC (KHỚP ẢNH 2) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Tỷ trọng Cơ cấu Doanh thu (M1) */}
        <div className="glass-panel p-5">
          <h3 className="text-xs font-black text-white tracking-wider uppercase mb-1">
            📊 Tỷ trọng Cơ cấu Doanh thu (M1)
          </h3>
          <p className="text-[10px] text-[var(--text-muted)] mb-4">
            Cơ cấu đóng góp doanh thu theo Đơn vị và theo Nguồn phát sinh doanh thu
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
            <div>
              <h4 className="text-[10px] font-bold text-white uppercase mb-2 text-center">Doanh thu theo Đơn vị</h4>
              <RevenueDonutChart />
            </div>
            <div className="border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-4">
              <h4 className="text-[10px] font-bold text-white uppercase mb-2 text-center">Doanh thu theo Nguồn</h4>
              <SourceRevenueDonutChart />
            </div>
          </div>
        </div>

        {/* Mức độ Hoàn thành Mục tiêu Traffic (M4) */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <h3 className="text-xs font-black text-white tracking-wider uppercase mb-1">
            📈 Mức độ Hoàn thành Mục tiêu Traffic (M4)
          </h3>
          <p className="text-[10px] text-[var(--text-muted)] mb-3">
            So sánh lượt xem/truy cập thực tế so với mục tiêu kế hoạch (M triệu views)
          </p>
          <div className="space-y-2.5 overflow-y-auto max-h-[260px] pr-1">
            {[
              { name: "Wolfoo (WO)", actual: 369.0, target: 330.0, pct: 112, color: "bg-rose-500" },
              { name: "Lego (LE)", actual: 140.0, target: 154.0, pct: 91, color: "bg-rose-500" },
              { name: "Animated Story", actual: 84.0, target: 109.0, pct: 77, color: "bg-rose-500" },
              { name: "Dự án 01 (DA)", actual: 103.0, target: 107.0, pct: 96, color: "bg-rose-500" },
              { name: "Music (SCMU)", actual: 134.0, target: 172.0, pct: 78, color: "bg-rose-500" },
              { name: "Nội dung TH", actual: 93.0, target: 75.0, pct: 124, color: "bg-purple-500" },
              { name: "Creative Hub", actual: 61.0, target: 55.0, pct: 111, color: "bg-rose-500" },
              { name: "CNGP (Game)", actual: 41.0, target: 49.0, pct: 84, color: "bg-purple-500" },
              { name: "Studio (ST)", actual: 31.0, target: 34.0, pct: 91, color: "bg-purple-500" },
            ].map(item => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-[11px] font-medium">
                  <span className="text-slate-200 font-semibold">{item.name}</span>
                  <span className="text-slate-300 font-bold">
                    {item.actual}M / {item.target}M ({item.pct}%)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.min(100, item.pct)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. CỤM 3 BANG XEP HANG (BXH DOANH THU, SẢN XUẤT, TRAFFIC - KHỚP ẢNH 2) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* BXH Tăng trưởng Doanh thu */}
        <div className="glass-panel p-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
            📝 BXH Tăng trưởng Doanh thu
          </h3>
          <p className="text-[10px] text-[var(--text-muted)] mb-3">Xếp hạng theo % tăng trưởng so với kỳ trước</p>
          <div className="space-y-2 text-[11px]">
            {[
              { rank: "#1", name: "Wolfoo", val: "76.0 Tỷ", change: "+0.3%", up: true, highlight: true },
              { rank: "#2", name: "Lego", val: "70.0 Tỷ", change: "-6.4%", up: false },
              { rank: "#3", name: "Animated", val: "70.0 Tỷ", change: "-6.4%", up: false },
              { rank: "#4", name: "Dự án 01", val: "70.0 Tỷ", change: "-6.4%", up: false },
              { rank: "#5", name: "Music", val: "70.0 Tỷ", change: "-6.4%", up: false },
              { rank: "#9", name: "Studio", val: "70.0 Tỷ", change: "-6.4%", up: false, warning: true },
            ].map(row => (
              <div key={row.rank + row.name} className={`flex justify-between items-center p-2 rounded border ${
                row.highlight ? "bg-amber-500/10 border-amber-500/30" : row.warning ? "bg-rose-500/10 border-rose-500/30" : "bg-slate-900/40 border-white/5"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-amber-400 w-6">{row.rank}</span>
                  <span className="font-bold text-white">{row.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)]">{row.val}</span>
                  <span className={`font-bold ${row.up ? "text-emerald-400" : "text-rose-500"}`}>{row.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BXH Hoàn thành Sản xuất */}
        <div className="glass-panel p-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
            🎬 BXH Hoàn thành Sản xuất
          </h3>
          <p className="text-[10px] text-[var(--text-muted)] mb-3">Mức độ hoàn thành kế hoạch số lượng video</p>
          <div className="space-y-2 text-[11px]">
            {[
              { rank: "#1", name: "Creative", val: "26 Video", pct: "113%", highlight: true },
              { rank: "#2", name: "Lego", val: "67 Video", pct: "112%" },
              { rank: "#3", name: "Music", val: "45 Video", pct: "100%" },
              { rank: "#4", name: "Animated", val: "50 Video", pct: "94%" },
              { rank: "#5", name: "Nội dung", val: "32 Video", pct: "91%" },
              { rank: "#9", name: "Dự án 01", val: "28 Video", pct: "76%", warning: true },
            ].map(row => (
              <div key={row.rank + row.name} className={`flex justify-between items-center p-2 rounded border ${
                row.highlight ? "bg-amber-500/10 border-amber-500/30" : row.warning ? "bg-rose-500/10 border-rose-500/30" : "bg-slate-900/40 border-white/5"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-amber-400 w-6">{row.rank}</span>
                  <span className="font-bold text-white">{row.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)]">{row.val}</span>
                  <span className="font-extrabold text-emerald-400">{row.pct}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BXH Tăng trưởng Traffic */}
        <div className="glass-panel p-4">
          <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
            🌐 BXH Tăng trưởng Traffic
          </h3>
          <p className="text-[10px] text-[var(--text-muted)] mb-3">Xếp hạng theo % tăng trưởng traffic so với kỳ trước</p>
          <div className="space-y-2 text-[11px]">
            {[
              { rank: "#1", name: "Dự án 01", val: "102.0M", change: "+12.3%", up: true, highlight: true },
              { rank: "#2", name: "Creative", val: "82.0M", change: "+12.3%", up: true },
              { rank: "#3", name: "Lego", val: "137.0M", change: "+8.6%", up: true },
              { rank: "#4", name: "Nội dung", val: "87.0M", change: "+8.6%", up: true },
              { rank: "#5", name: "Animated", val: "139.0M", change: "+1.2%", up: true },
              { rank: "#9", name: "Wolfoo", val: "42.0M", change: "-10.7%", up: false, warning: true },
            ].map(row => (
              <div key={row.rank + row.name} className={`flex justify-between items-center p-2 rounded border ${
                row.highlight ? "bg-amber-500/10 border-amber-500/30" : row.warning ? "bg-rose-500/10 border-rose-500/30" : "bg-slate-900/40 border-white/5"
              }`}>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-amber-400 w-6">{row.rank}</span>
                  <span className="font-bold text-white">{row.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[var(--text-muted)]">{row.val}</span>
                  <span className={`font-bold ${row.up ? "text-emerald-400" : "text-rose-500"}`}>{row.change}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6. ĐÁNH GIÁ HIỆU QUẢ CÁC SẢN PHẨM & TOP 3/CẢNH BÁO (KHỚP 100% ẢNH 3) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Trái: Hiệu quả các Dòng Sản phẩm (Điểm PSH) */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black text-white tracking-wider uppercase mb-1">
              Hiệu quả các Dòng Sản phẩm (Điểm PSH)
            </h3>
            <p className="text-[10px] text-[var(--text-muted)] mb-4">
              Điểm hiệu quả sản phẩm trung bình theo nhóm sản phẩm (Thang điểm 100)
            </p>
          </div>
          <div className="space-y-3">
            {[
              { name: "Dòng phim Wolfoo (WO)", score: 88, color: "bg-purple-500" },
              { name: "Dòng phim Animated Story (AS)", score: 80, color: "bg-blue-900" },
              { name: "Sản phẩm Music (SCMU)", score: 78, color: "bg-emerald-500" },
              { name: "Sản phẩm Lego Series", score: 67, color: "bg-amber-500" },
              { name: "Creative Hub Products", score: 61, color: "bg-pink-500" },
              { name: "Game & Technology (CNGP)", score: 35, color: "bg-rose-600" },
            ].map(item => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-200">{item.name}</span>
                  <span className="font-extrabold text-white">{item.score}đ</span>
                </div>
                <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Phải: Bảng Tỷ lệ Hiệu quả: Top 3 & Cảnh báo (Điểm PSH) */}
        <div className="glass-panel p-5 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-xs font-black text-[var(--accent-purple)] tracking-wider uppercase mb-1">
              Bảng Tỷ lệ Hiệu quả: Top 3 & Cảnh báo (Điểm PSH)
            </h3>
            <p className="text-[10px] text-[var(--text-muted)]">
              Sản phẩm hiệu quả cao nhất và sản phẩm hiệu quả thấp nhất cần lưu ý
            </p>
          </div>

          {/* TOP 3 SẢN PHẨM HIỆU QUẢ CAO NHẤT */}
          <div className="space-y-2">
            <span className="text-[10px] font-black text-emerald-400 uppercase tracking-wider flex items-center gap-1">
              🏆 TOP 3 SẢN PHẨM HIỆU QUẢ CAO NHẤT
            </span>
            {[
              { rank: "#1", code: "Wolfoo 2D Stories (WO-2020-001)", desc: "Doanh thu & Sản lượng vượt 112% kế hoạch", score: 95 },
              { rank: "#2", code: "Sản phẩm Animated Story - MDA", desc: "Năng suất vượt trội và ứng dụng AI xuất sắc", score: 92 },
              { rank: "#3", code: "Lego Automation (LE-2026-001)", desc: "Quy trình tự động hóa hoàn thiện đạt chuẩn", score: 90 },
            ].map(item => (
              <div key={item.rank} className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-black text-emerald-400">{item.rank}</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-white">{item.code}</h4>
                    <p className="text-[10px] text-[var(--text-muted)]">{item.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded">
                  {item.score} điểm
                </span>
              </div>
            ))}
          </div>

          {/* CẢNH BÁO: 3 SẢN PHẨM HIỆU QUẢ THẤP NHẤT */}
          <div className="space-y-2 pt-2 border-t border-white/5">
            <span className="text-[10px] font-black text-rose-500 uppercase tracking-wider flex items-center gap-1">
              ⚠️ CẢNH BÁO: 3 SẢN PHẨM HIỆU QUẢ THẤP NHẤT
            </span>
            {[
              { code: "Game Web/App (CN-2026-001)", desc: "Tiến độ sản xuất chậm, doanh thu chưa đạt kỳ vọng", score: 35 },
              { code: "Creative Hub – Manga Podcast", desc: "Lượt xem tích lũy (Traffic) sụt giảm 15% so với cùng kỳ", score: 42 },
              { code: "Lego AI 100% (LE-2026-002)", desc: "Sự cố kênh phân phối cũ chưa hồi phục", score: 45 },
            ].map(item => (
              <div key={item.code} className="bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs">⚠️</span>
                  <div>
                    <h4 className="font-extrabold text-xs text-white">{item.code}</h4>
                    <p className="text-[10px] text-rose-300/80">{item.desc}</p>
                  </div>
                </div>
                <span className="text-xs font-black text-rose-400 bg-rose-500/20 px-2 py-1 rounded">
                  {item.score} điểm
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 7. NHẬN XÉT & ĐÁNH GIÁ KẾT QUẢ TỪ BAN GIÁM ĐỐC (BOD - KHỚP 100% ẢNH 3) */}
      <div className="glass-panel p-5 flex flex-col gap-3">
        <h3 className="text-xs font-black text-white tracking-wider uppercase">
          Nhận xét & Đánh giá kết quả từ Ban Giám đốc (BOD)
        </h3>
        <p className="text-[10px] text-[var(--text-muted)]">
          Ghi chú ý kiến chỉ đạo hành động, nhận định hiệu suất kỳ này để lưu trữ và gửi thông báo tới các đơn vị
        </p>
        <textarea
          value={bodComment}
          onChange={(e) => setBodComment(e.target.value)}
          placeholder="Nhập ý kiến đánh giá hoặc chỉ đạo hành động của Ban Giám đốc tại đây..."
          rows={3}
          className="w-full bg-slate-950 border border-[var(--glass-border)] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] transition-all resize-none"
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-[10px] text-[var(--text-muted)] italic">
            {isSaved ? "✓ Đã lưu nhận xét chỉ đạo thành công cho kỳ này" : "Chưa có nhận xét cho kỳ này"}
          </span>
          <button
            onClick={handleSaveComment}
            className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-600 hover:to-indigo-600 text-white text-xs font-black px-5 py-2 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all"
          >
            {isSaved ? "✓ Đã lưu nhận xét" : "Lưu nhận xét"}
          </button>
        </div>
      </div>

    </div>
  );
}
