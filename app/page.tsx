"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import ObjectiveRadarChart from "@/components/ObjectiveRadarChart";
import RevenueDonutChart from "@/components/RevenueDonutChart";
import SourceRevenueDonutChart from "@/components/SourceRevenueDonutChart";
import { 
  Trophy, 
  AlertTriangle, 
  Award,
  BookOpen
} from "lucide-react";

export default function DashboardPage() {
  const { filters } = useApp();
  const [bodComment, setBodComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  // Cập nhật nhận xét mẫu khi thay đổi kỳ lọc
  useEffect(() => {
    setBodComment("");
    setIsSaved(false);
  }, [filters]);

  const handleSaveComment = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const isWeekly = filters.periodType === "weekly";

  return (
    <div className="flex flex-col gap-4">
      {/* FREEZE FILTERS PANEL */}
      <FiltersHeader />

      {/* balanced 50/50 split row */}
      <div className={`grid gap-4 ${isWeekly ? "grid-cols-4" : "grid-cols-1 lg:grid-cols-2"}`}>
        
        {/* LEFT COLUMN: Radar Chart & variance table (Hidden in Weekly) */}
        {!isWeekly && (
          <div className="glass-panel p-6 flex flex-col md:flex-row gap-6 min-h-[350px]">
            <div className="flex-1 flex flex-col justify-between">
              <h3 className="text-sm font-bold text-white tracking-wide border-b border-white/5 pb-2">
                🎯 BÁNH XE MỤC TIÊU (RADAR ANALYSIS)
              </h3>
              <ObjectiveRadarChart />
            </div>
            <div className="w-full md:w-48 shrink-0 flex flex-col justify-between">
              <h4 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3">
                Chi tiết biến động
              </h4>
              <div className="space-y-3 text-xs flex-1">
                {[
                  { name: "Tài chính", change: "+10%", up: true },
                  { name: "Sản phẩm/SX", change: "+10%", up: true },
                  { name: "Khách hàng", change: "-15%", up: false },
                  { name: "Thương hiệu", change: "+18%", up: true },
                  { name: "QT Vận hành", change: "+7%", up: true },
                  { name: "Nhân sự", change: "-2%", up: false },
                  { name: "Văn hóa", change: "-2%", up: false },
                ].map(item => (
                  <div key={item.name} className="flex justify-between items-center py-1 border-b border-white/5">
                    <span className="text-[var(--text-muted)]">{item.name}</span>
                    <span className={`font-bold ${item.up ? "text-emerald-400" : "text-rose-500"}`}>
                      {item.up ? "▲" : "▼"} {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN / FULL WIDTH: KPI CARDS */}
        <div className={`grid gap-4 ${isWeekly ? "col-span-4 grid-cols-4" : "grid-cols-2"}`}>
          {/* Card 1: Doanh thu */}
          <div className="glass-panel p-5 flex flex-col justify-between min-h-[167px]">
            <div>
              <span className="text-[9px] text-[var(--accent-cyan)] font-extrabold tracking-widest uppercase">
                M1. Tài chính
              </span>
              <h3 className="text-xs font-medium text-[var(--text-muted)] mt-1">
                Doanh thu hoàn thành
              </h3>
            </div>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-3xl font-extrabold text-white">92.5%</span>
              <span className="text-xs font-bold text-emerald-400">▲ +4.5%</span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] border-t border-white/5 pt-2">
              Kỳ trước: 88.0% | Thực tế: 4.52 tỷ
            </div>
          </div>

          {/* Card 2: Sản lượng */}
          <div className="glass-panel p-5 flex flex-col justify-between min-h-[167px]">
            <div>
              <span className="text-[9px] text-[var(--accent-purple)] font-extrabold tracking-widest uppercase">
                M2. Sản phẩm
              </span>
              <h3 className="text-xs font-medium text-[var(--text-muted)] mt-1">
                Sản lượng Video (M2)
              </h3>
            </div>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-3xl font-extrabold text-white">18 Video</span>
              <span className="text-xs font-bold text-rose-500">▼ -2 Video</span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] border-t border-white/5 pt-2">
              Kỳ trước: 20 Video | Đạt: 90% KH
            </div>
          </div>

          {/* Card 3: Đơn vị xuất sắc */}
          <div className="glass-panel p-5 flex flex-col justify-between min-h-[167px]">
            <div>
              <span className="text-[9px] text-[var(--accent-pink)] font-extrabold tracking-widest uppercase">
                Vinh danh
              </span>
              <h3 className="text-xs font-medium text-[var(--text-muted)] mt-1">
                Đơn vị dẫn đầu
              </h3>
            </div>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-2xl font-black text-[var(--accent-cyan)] truncate block max-w-full">
                Wolfoo (WO)
              </span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] border-t border-white/5 pt-2">
              Tốc độ tăng trưởng DT: 125%
            </div>
          </div>

          {/* Card 4: Kỷ luật (Month) / Tích lũy DT (Week) */}
          <div className="glass-panel p-5 flex flex-col justify-between min-h-[167px]">
            <div>
              <span className="text-[9px] text-[var(--accent-emerald)] font-extrabold tracking-widest uppercase">
                {isWeekly ? "Lũy kế tháng" : "M7. Kỷ luật"}
              </span>
              <h3 className="text-xs font-medium text-[var(--text-muted)] mt-1">
                {isWeekly ? "Tiến độ tích lũy DT" : "Tỷ lệ không vi phạm"}
              </h3>
            </div>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-3xl font-extrabold text-white">
                {isWeekly ? "48.2%" : "98.5%"}
              </span>
              <span className="text-xs font-bold text-emerald-400">
                {isWeekly ? "▲ +12%" : "▲ +0.5%"}
              </span>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] border-t border-white/5 pt-2">
              {isWeekly ? "Mục tiêu tháng: 12 tỷ" : "Mục tiêu: 100% tuân thủ"}
            </div>
          </div>
        </div>

      </div>

      {/* ADDITIONAL ANALYSIS & CHARTS ROW */}
      <div className={`grid gap-4 ${isWeekly ? "grid-cols-1 md:grid-cols-3" : "grid-cols-1 md:grid-cols-4"}`}>
        {/* Donut Chart: Cơ cấu doanh thu */}
        <div className={`glass-panel p-5 flex flex-col justify-between ${isWeekly ? "col-span-1" : "md:col-span-2"}`}>
          {isWeekly ? (
            <>
              <h3 className="text-xs font-bold text-white tracking-wider mb-4 uppercase">
                📊 CƠ CẤU DOANH THU ĐƠN VỊ
              </h3>
              <RevenueDonutChart />
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-white tracking-wider mb-4 uppercase">
                  📊 CƠ CẤU DOANH THU ĐƠN VỊ
                </h3>
                <RevenueDonutChart />
              </div>
              <div className="border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-6">
                <h3 className="text-xs font-bold text-white tracking-wider mb-4 uppercase">
                  💰 CƠ CẤU DOANH THU THEO NGUỒN
                </h3>
                <SourceRevenueDonutChart />
              </div>
            </div>
          )}
        </div>

        {/* Traffic Progress */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-white tracking-wider mb-4 uppercase">
            📈 TIẾN ĐỘ TRAFFIC ĐƠN VỊ (M4)
          </h3>
          <div className="space-y-4 py-2">
            {[
              { name: "Wolfoo", actual: 140, target: 100, color: "bg-[var(--accent-cyan)]" },
              { name: "Animated Story", actual: 95, target: 100, color: "bg-[var(--accent-purple)]" },
              { name: "Music", actual: 88, target: 100, color: "bg-[var(--accent-pink)]" },
              { name: "Lego", actual: 65, target: 80, color: "bg-[var(--accent-emerald)]" },
            ].map(item => {
              const pct = Math.round((item.actual / item.target) * 100);
              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-medium">
                    <span className="text-white">{item.name}</span>
                    <span className="text-[var(--text-muted)]">
                      {item.actual}M / {item.target}M ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rankings */}
        <div className="glass-panel p-5">
          <h3 className="text-xs font-bold text-white tracking-wider mb-4 uppercase">
            🏆 BẢNG XẾP HẠNG ĐƠN VỊ KỲ NÀY
          </h3>
          <div className="space-y-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Trophy size={14} className="text-yellow-400" />
                <span className="font-bold text-emerald-400">1. Wolfoo (WO)</span>
              </div>
              <span className="text-[var(--text-muted)] font-semibold">Tăng trưởng: 125%</span>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Award size={14} className="text-slate-300" />
                <span className="font-bold text-emerald-400">2. Lego (LE)</span>
              </div>
              <span className="text-[var(--text-muted)] font-semibold">Tăng trưởng: 112%</span>
            </div>
            <div className="bg-rose-500/10 border border-rose-500/20 p-2.5 rounded flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle size={14} className="text-rose-500" />
                <span className="font-bold text-rose-500">Thấp nhất. DA01</span>
              </div>
              <span className="text-[var(--text-muted)] font-semibold">Tăng trưởng: 82%</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOD DIRECTIVE COMMENT BOX */}
      <div className="glass-panel p-5 flex flex-col gap-3">
        <h3 className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-2">
          <BookOpen size={16} className="text-[var(--accent-cyan)]" />
          Ý kiến chỉ đạo của Ban Giám đốc (BOD)
        </h3>
        <textarea
          value={bodComment}
          onChange={(e) => setBodComment(e.target.value)}
          placeholder="Nhập ý kiến chỉ đạo, nhận xét tiến trình thực hiện của các đơn vị..."
          rows={3}
          className="w-full bg-slate-900 border border-[var(--glass-border)] rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[var(--accent-cyan)] transition-all resize-none"
        />
        <div className="flex justify-between items-center mt-1">
          <span className="text-[10px] text-[var(--text-muted)] font-medium">
            Lưu ý: Chỉ đạo này sẽ được lưu trữ vĩnh viễn và hiển thị tới Trưởng các đơn vị.
          </span>
          <button
            onClick={handleSaveComment}
            className="bg-[var(--accent-cyan)] text-slate-950 text-xs font-extrabold px-4 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all"
          >
            {isSaved ? "✓ ĐÃ LƯU CHỈ ĐẠO" : "GỬI CHỈ ĐẠO BOD"}
          </button>
        </div>
      </div>
    </div>
  );
}
