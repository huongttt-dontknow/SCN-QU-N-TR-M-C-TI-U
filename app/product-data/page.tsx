"use client";

import React, { useState, useEffect } from "react";
import FiltersHeader from "@/components/FiltersHeader";
import { 
  Briefcase, 
  Users, 
  FolderGit2, 
  TrendingUp, 
  TrendingDown, 
  Layers 
} from "lucide-react";

interface ProductProfile {
  name: string;
  unit: string;
  pic: string;
  code: string;
  fte: number;
  type: string; // Sản xuất mới / Phái sinh / Khai thác
  revenueActual: number;
  revenueTarget: number;
  revenueGrowth: number;
  sảnLượngActual: number;
  sảnLượngTarget: number;
  sảnLượngGrowth: number;
  trafficActual: number;
  trafficTarget: number;
  trafficGrowth: number;
}

export default function ProductDataPage() {
  const [selectedProduct, setSelectedProduct] = useState("Wolfoo 2D Stories");
  const [profile, setProfile] = useState<ProductProfile | null>(null);

  // Danh sách 31 sản phẩm được phân nhóm theo 9 đơn vị
  const productGroups = [
    {
      unit: "Wolfoo",
      products: ["Wolfoo 2D Stories", "Wolfoo 2D LEO", "Wolfoo 2D Kid Song", "Kinh doanh khai thác", "Kinh doanh ngôn ngữ"]
    },
    {
      unit: "Lego",
      products: ["Lego Automation", "Lego AI (100%)", "Khai thác Lego"]
    },
    {
      unit: "Animated Story",
      products: ["MDA", "English Stories"]
    },
    {
      unit: "Dự án 01 (DA01)",
      products: ["Teen Story Spotify", "Tiny Jack Kids Songs", "DA QuizZ", "3D Kid Song Bearee"]
    },
    {
      unit: "Music",
      products: ["Lofi Dân Ca", "Country Cover", "Kid Songs", "Cumbias Songs", "Relaxing Music"]
    },
    {
      unit: "Nội dung tổng hợp",
      products: ["Sticker", "Toca", "Khai thác chung", "Spotify"]
    },
    {
      unit: "Creative Hub",
      products: ["Quiz - SCCH", "Information", "Manga Podcast"]
    },
    {
      unit: "Game",
      products: ["CNGP (Game)"]
    },
    {
      unit: "Studio",
      products: ["Kids song_01", "Kids song_02", "Trạng Quỳnh"]
    }
  ];

  // Giả lập lấy thông tin sản phẩm
  useEffect(() => {
    // Generate some random mockup data based on selected product name
    const prf: ProductProfile = {
      name: selectedProduct,
      unit: "Wolfoo",
      pic: "Lê Đăng Khoa",
      code: "EMP" + (100 + selectedProduct.charCodeAt(0)),
      fte: 13.0,
      type: selectedProduct.includes("Songs") || selectedProduct.includes("Cover") ? "Phái sinh / Khai thác" : "Sản xuất mới",
      revenueActual: 450,
      revenueTarget: 500,
      revenueGrowth: 12.5,
      sảnLượngActual: 16,
      sảnLượngTarget: 15,
      sảnLượngGrowth: -3.0,
      trafficActual: 104,
      trafficTarget: 100,
      trafficGrowth: 25.0
    };

    setProfile(prf);
  }, [selectedProduct]);

  return (
    <div className="flex flex-col gap-4">
      {/* FREEZE FILTERS */}
      <FiltersHeader />

      {/* PRODUCT SELECTOR DROPDOWN */}
      <div className="glass-panel p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Layers size={18} className="text-[var(--accent-cyan)]" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Chọn sản phẩm đo lường
          </h2>
        </div>
        <select
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="bg-slate-900 border border-[var(--glass-border)] text-white text-xs font-semibold rounded px-3 py-2 focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer w-64"
        >
          {productGroups.map(group => (
            <optgroup key={group.unit} label={`Đơn vị: ${group.unit}`}>
              {group.products.map(prod => (
                <option key={prod} value={prod}>{prod}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {profile && (
        <div className="flex flex-col lg:flex-row gap-4">
          {/* PRODUCT PROFILE CARD (25% Width) */}
          <div className="glass-panel p-5 lg:w-1/4 flex flex-col justify-between shrink-0 min-h-[220px]">
            <div>
              <span className="text-[9px] text-[var(--accent-cyan)] font-extrabold tracking-widest uppercase block mb-1">
                Thông tin sản phẩm
              </span>
              <h3 className="text-base font-extrabold text-white mb-4">
                {profile.name}
              </h3>
            </div>
            
            <div className="space-y-3 text-xs flex-1">
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-[var(--text-muted)] flex items-center gap-1.5"><Briefcase size={12} /> PIC</span>
                <span className="font-bold text-white">{profile.pic}</span>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-white/5">
                <span className="text-[var(--text-muted)] flex items-center gap-1.5"><Users size={12} /> Quy mô (FTE)</span>
                <span className="font-bold text-white">{profile.fte} nhân sự</span>
              </div>
              <div className="flex justify-between items-center py-1.5">
                <span className="text-[var(--text-muted)] flex items-center gap-1.5"><FolderGit2 size={12} /> Phân loại</span>
                <span className="font-bold text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/5 px-2 py-0.5 rounded border border-[var(--accent-cyan)]/10">
                  {profile.type}
                </span>
              </div>
            </div>
          </div>

          {/* CROSS COMPARE MULTI-METRIC WIDGETS (75% Width) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Widget A: Doanh thu */}
            <div className="glass-panel p-5 flex flex-col justify-between h-[220px]">
              <div>
                <span className="text-[9px] text-[var(--accent-cyan)] font-extrabold tracking-widest uppercase">
                  Doanh thu (M1)
                </span>
                <h4 className="text-xs text-[var(--text-muted)] mt-1">Hoàn thành kế hoạch</h4>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">
                    {Math.round((profile.revenueActual / profile.revenueTarget) * 100)}%
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {profile.revenueActual}M / {profile.revenueTarget}M VNĐ
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[var(--accent-cyan)]"
                    style={{ width: `${Math.round((profile.revenueActual / profile.revenueTarget) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 border-t border-white/5 pt-2">
                <TrendingUp size={12} className="text-emerald-400" />
                <span className="text-emerald-400 font-bold">+{profile.revenueGrowth}%</span>
                <span>so với kỳ trước</span>
              </div>
            </div>

            {/* Widget B: Sản lượng */}
            <div className="glass-panel p-5 flex flex-col justify-between h-[220px]">
              <div>
                <span className="text-[9px] text-[var(--accent-purple)] font-extrabold tracking-widest uppercase">
                  Sản lượng (M2)
                </span>
                <h4 className="text-xs text-[var(--text-muted)] mt-1">Video hoàn thành</h4>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">
                    {Math.round((profile.sảnLượngActual / profile.sảnLượngTarget) * 100)}%
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {profile.sảnLượngActual} / {profile.sảnLượngTarget} Video
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[var(--accent-purple)]"
                    style={{ width: `${Math.round((profile.sảnLượngActual / profile.sảnLượngTarget) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 border-t border-white/5 pt-2">
                <TrendingDown size={12} className="text-rose-500" />
                <span className="text-rose-500 font-bold">{profile.sảnLượngGrowth}%</span>
                <span>so với kỳ trước</span>
              </div>
            </div>

            {/* Widget C: Traffic */}
            <div className="glass-panel p-5 flex flex-col justify-between h-[220px]">
              <div>
                <span className="text-[9px] text-[var(--accent-pink)] font-extrabold tracking-widest uppercase">
                  Lượt xem (M4)
                </span>
                <h4 className="text-xs text-[var(--text-muted)] mt-1">Traffic đạt được</h4>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-white">
                    {Math.round((profile.trafficActual / profile.trafficTarget) * 100)}%
                  </span>
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {profile.trafficActual}M / {profile.trafficTarget}M Views
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-[var(--accent-pink)]"
                    style={{ width: `${Math.round((profile.trafficActual / profile.trafficTarget) * 100)}%` }}
                  />
                </div>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 border-t border-white/5 pt-2">
                <TrendingUp size={12} className="text-emerald-400" />
                <span className="text-emerald-400 font-bold">+{profile.trafficGrowth}%</span>
                <span>so với kỳ trước</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FLAT GRID KPI LIST */}
      <div className="glass-panel p-5">
        <h3 className="text-sm font-bold text-white tracking-wider mb-4 uppercase">
          📋 BẢNG CHỈ TIÊU PHẲNG SẢN PHẨM (FLAT GRID)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[var(--text-muted)] font-bold bg-slate-900/50">
                <th className="p-3 w-16 text-center">Mã</th>
                <th className="p-3">Tên Chỉ tiêu</th>
                <th className="p-3 w-28 text-center">Kế hoạch</th>
                <th className="p-3 w-28 text-center">Thực tế</th>
                <th className="p-3 w-20 text-center">ĐVT</th>
                <th className="p-3 w-20 text-center">Hoàn thành</th>
              </tr>
            </thead>
            <tbody>
              {[
                { code: "VM1-I01.01", title: "Tỷ suất lợi nhuận ROI (%)", target: 15, actual: 12.5, unit: "%" },
                { code: "VM2-I01.01", title: "Số lượng video hoàn thành sản xuất (Video)", target: 16, actual: 18, unit: "Video" },
                { code: "TM3-I01.02", title: "Tổng traffic đơn vị (Views)", target: 100, actual: 104, unit: "Triệu" },
                { code: "TM3-I01.03", title: "Số lượng video upload (nội dung)", target: 45, actual: 48, unit: "Video" },
                { code: "VM5-I02.01", title: "Thời gian sản xuất TB 1 video (Ngày)", target: 5, actual: 6.2, unit: "Ngày" },
              ].map(row => {
                const pct = Math.round((row.actual / row.target) * 100);
                return (
                  <tr key={row.code} className="border-b border-white/5 text-[var(--text-muted)] hover:bg-white/5">
                    <td className="p-3 text-center">
                      <code className="bg-white/5 px-1.5 py-0.5 rounded text-[10px]">{row.code}</code>
                    </td>
                    <td className="p-3 text-white font-medium">{row.title}</td>
                    <td className="p-3 text-center">{row.target}</td>
                    <td className="p-3 text-center font-bold text-white">{row.actual}</td>
                    <td className="p-3 text-center">{row.unit}</td>
                    <td className={`p-3 text-center font-bold ${pct >= 100 ? "text-emerald-400" : pct >= 75 ? "text-yellow-400" : "text-rose-500"}`}>
                      {pct}%
                    </td>
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
