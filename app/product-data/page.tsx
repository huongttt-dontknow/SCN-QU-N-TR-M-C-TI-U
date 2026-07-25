"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import { 
  Briefcase, 
  Users, 
  FolderGit2, 
  TrendingUp, 
  TrendingDown, 
  Layers 
} from "lucide-react";

const PRODUCTS_CATALOG = [
  {
    "id": "ND-1899-001",
    "name": "STICKER",
    "type": "Sản xuất mới",
    "unit": "NDTH",
    "pic": "Lò Quế Hằng",
    "fte": 2.25,
    "status": "Hoạt động"
  },
  {
    "id": "ND-1899-002",
    "name": "TOCA",
    "type": "Sản xuất mới",
    "unit": "NDTH",
    "pic": "Lò Quế Hằng",
    "fte": 3.0,
    "status": "Hoạt động"
  },
  {
    "id": "ND-1899-003",
    "name": "3DKIDS SONG",
    "type": "Phái sinh/ Khai thác",
    "unit": "NDTH",
    "pic": "Lò Quế Hằng",
    "fte": 2.5,
    "status": "Hoạt động"
  },
  {
    "id": "ND-1899-004",
    "name": "Khai thác chung",
    "type": "Phái sinh/ Khai thác",
    "unit": "NDTH",
    "pic": "Lò Quế Hằng",
    "fte": 1.5,
    "status": "Hoạt động"
  },
  {
    "id": "ND-1899-005",
    "name": "Spotify",
    "type": "Phái sinh/ Khai thác",
    "unit": "NDTH",
    "pic": "Lò Quế Hằng",
    "fte": 1.0,
    "status": "Hoạt động"
  },
  {
    "id": "CR-2026-001",
    "name": "Quiz - SCCH",
    "type": "Sản xuất mới",
    "unit": "Creative Hub",
    "pic": "Trần Như Quỳnh",
    "fte": 1.8,
    "status": "Hoạt động"
  },
  {
    "id": "CR-2026-002",
    "name": "Khai thác Lego",
    "type": "Phái sinh/ Khai thác",
    "unit": "Creative Hub",
    "pic": "Trần Như Quỳnh",
    "fte": 0.2,
    "status": "Đang setup"
  },
  {
    "id": "LE-1899-001",
    "name": "Lego Automation",
    "type": "Sản xuất mới",
    "unit": "Lego",
    "pic": "Lê Quỳnh Nga",
    "fte": 7.0,
    "status": "Hoạt động"
  },
  {
    "id": "LE-1899-002",
    "name": "Lego AI",
    "type": "Sản xuất mới",
    "unit": "Lego",
    "pic": "Lê Quỳnh Nga",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "AN-1899-001",
    "name": "MDA",
    "type": "Sản xuất mới",
    "unit": "Animated Story",
    "pic": "Thịnh Trịnh Quốc",
    "fte": 12.0,
    "status": "Hoạt động"
  },
  {
    "id": "AN-2026-002",
    "name": "English Stories",
    "type": "Sản xuất mới",
    "unit": "Animated Story",
    "pic": "Thịnh Trịnh Quốc",
    "fte": 3.0,
    "status": "Đang setup"
  },
  {
    "id": "MU-1899-001",
    "name": "Lofi Dân Ca",
    "type": "Phái sinh/ Khai thác",
    "unit": "Music",
    "pic": "Vũ Trung Đức",
    "fte": 1.0,
    "status": "Đang setup"
  },
  {
    "id": "MU-2026-002",
    "name": "Country Cover",
    "type": "Phái sinh/ Khai thác",
    "unit": "Music",
    "pic": "Vũ Trung Đức",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "MU-1899-003",
    "name": "Kid Songs",
    "type": "Phái sinh/ Khai thác",
    "unit": "Music",
    "pic": "Vũ Trung Đức",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "MU-1899-004",
    "name": "Cumbias Songs",
    "type": "Phái sinh/ Khai thác",
    "unit": "Music",
    "pic": "Vũ Trung Đức",
    "fte": 1.0,
    "status": "Hoạt động"
  },
  {
    "id": "MU-1899-005",
    "name": "Relaxing Music",
    "type": "Phái sinh/ Khai thác",
    "unit": "Music",
    "pic": "Vũ Trung Đức",
    "fte": 2.0,
    "status": "Đang setup"
  },
  {
    "id": "MU-1899-006",
    "name": "NHẠC NGOẠI CÓ LỜI",
    "type": "Sản xuất mới",
    "unit": "Music",
    "pic": "Vũ Trung Đức",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "MU-1899-007",
    "name": "NHẠC VIỆT",
    "type": "Sản xuất mới",
    "unit": "Music",
    "pic": "Vũ Trung Đức",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "MU-1899-008",
    "name": "HALLOWEEN & CHRISTMAS SONGS",
    "type": "Sản xuất mới",
    "unit": "Music",
    "pic": "Vũ Trung Đức",
    "fte": 1.0,
    "status": "Đang setup"
  },
  {
    "id": "CN-2026-001",
    "name": "Game",
    "type": "Sản xuất mới",
    "unit": "CNGP",
    "pic": "Vũ Thị Thu Hiền",
    "fte": 4.5,
    "status": "Hoạt động"
  },
  {
    "id": "CN-2026-002",
    "name": "DA QTK",
    "type": "Phái sinh/ Khai thác",
    "unit": "CNGP",
    "pic": "Đào Thanh Công",
    "fte": 4.5,
    "status": "Hoạt động"
  },
  {
    "id": "WO-1899-001",
    "name": "Wolfoo 2D Stories",
    "type": "Sản xuất mới",
    "unit": "Wofloo",
    "pic": "Lê Đăng Khoa",
    "fte": 20.0,
    "status": "Hoạt động"
  },
  {
    "id": "WO-2026-002",
    "name": "Wolfoo 2D LEO",
    "type": "Phái sinh/ Khai thác",
    "unit": "Wofloo",
    "pic": "Lê Đăng Khoa",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "WO-2026-003",
    "name": "Wolfoo 2D Kid Song",
    "type": "Phái sinh/ Khai thác",
    "unit": "Wofloo",
    "pic": "Lê Đăng Khoa",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "SC-1899-001",
    "name": "Kids song_01",
    "type": "Phái sinh/ Khai thác",
    "unit": "SCS",
    "pic": "Đạt Đặng Tất",
    "fte": 5.4,
    "status": "Hoạt động"
  },
  {
    "id": "SC-1899-002",
    "name": "Kids song_02",
    "type": "Phái sinh/ Khai thác",
    "unit": "SCS",
    "pic": "Nguyễn Thị Bích",
    "fte": 5.4,
    "status": "Hoạt động"
  },
  {
    "id": "SC-1899-003",
    "name": "Trạng Quỳnh",
    "type": "Phái sinh/ Khai thác",
    "unit": "SCS",
    "pic": "Đạt Đặng Tất",
    "fte": 2.25,
    "status": "Hoạt động"
  },
  {
    "id": "DA-2026-001",
    "name": "Teen Story Spotify",
    "type": "Sản xuất mới",
    "unit": "DA01",
    "pic": "Trần Thị Hồng",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "DA-2026-002",
    "name": "Tiny Jack Kids Songs",
    "type": "Sản xuất mới",
    "unit": "DA01",
    "pic": "Dương Tuấn Linh",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "DA-2026-003",
    "name": "DA QuizZ",
    "type": "Sản xuất mới",
    "unit": "DA01",
    "pic": "Nguyễn Thị Phương Thảo",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "DA-2026-004",
    "name": "3D Kid Song (Boobabies)",
    "type": "Phái sinh/ Khai thác",
    "unit": "DA01",
    "pic": "Trần Trung Thành",
    "fte": 2.0,
    "status": "Hoạt động"
  },
  {
    "id": "DA-2026-005",
    "name": "DA Teen Đức",
    "type": "Phái sinh/ Khai thác",
    "unit": "DA01",
    "pic": "Trần Thị Hồng",
    "fte": 2.0,
    "status": "Hoạt động"
  }
];

interface Product {
  id: string;
  name: string;
  type: string;
  unit: string;
  pic: string;
  fte: number;
  status: string;
}

interface KpiRow {
  code: string;
  displayCode: string;
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

export default function ProductDataPage() {
  const { filters, theme } = useApp();
  const [productsList, setProductsList] = useState<Product[]>(PRODUCTS_CATALOG);
  const [selectedProductId, setSelectedProductId] = useState<string>("WO-1899-001");
  const [kpiRows, setKpiRows] = useState<KpiRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Products catalog is statically loaded from PRODUCTS_CATALOG

  // Fetch KPI data for the selected product and period filters
  useEffect(() => {
    if (!selectedProductId) return;
    setIsLoading(true);

    const pType = filters.periodType || "weekly";
    const m = filters.month || "7";
    const w = filters.week || "1";
    const q = filters.quarter || "Q3";
    const y = filters.year || "2026";

    fetch(`/api/kpi/unit-data?productCode=${selectedProductId}&periodType=${pType}&month=${m}&week=${w}&quarter=${q}&year=${y}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setKpiRows(data);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", err);
        setIsLoading(false);
      });
  }, [selectedProductId, filters.periodType, filters.month, filters.week, filters.quarter, filters.year]);

  // Find currently selected product profile
  const currentProduct = productsList.find(p => p.id === selectedProductId) || null;

  // Helper values to extract metrics dynamically
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

  // Find metrics for widgets
  const getWidgetMetrics = (groupCode: string, displayCodes: string[], titles: string[]) => {
    // 1. Try exact matches on displayCodes or titles
    const row = kpiRows.find(r => 
      displayCodes.includes(r.displayCode) || 
      titles.some(t => r.title.toLowerCase().includes(t.toLowerCase()))
    );

    if (row) {
      const target = getTargetValue(row);
      const actual = getActualValue(row);
      return { target, actual, unit: row.unit || "" };
    }

    // 2. Fallback to group summary row (e.g. M1, M2, M3)
    const groupRow = kpiRows.find(r => r.displayCode === groupCode || r.code === groupCode);
    if (groupRow) {
      const target = getTargetValue(groupRow);
      const actual = getActualValue(groupRow);
      return { target, actual, unit: groupRow.unit || "" };
    }

    return { target: 100, actual: 0, unit: "" }; // final fallback
  };

  const revenueMetrics = getWidgetMetrics("M1", ["TM1-I02.01", "VM1-I02.01"], ["Tổng doanh thu", "Doanh thu kênh"]);
  const productionMetrics = getWidgetMetrics("M2", ["TM2-I01.01", "VM2-I01.01"], ["Số lượng video hoàn thành", "video hoàn thành sản xuất"]);
  const trafficMetrics = getWidgetMetrics("M3", ["TM3-I01.02", "VM3-I01.02"], ["Tổng traffic", "Số lượt view Youtube", "view youtube"]);

  // Group products dynamically by unit
  const groupedProducts: Record<string, Product[]> = {};
  productsList.forEach(p => {
    const u = p.unit || "Khác";
    if (!groupedProducts[u]) groupedProducts[u] = [];
    groupedProducts[u].push(p);
  });

  return (
    <div className="flex flex-col gap-4">
      {/* FREEZE FILTERS */}
      <FiltersHeader />

      {/* PRODUCT SELECTOR DROPDOWN */}
      <div className={`${
        theme === "light" 
          ? "bg-white border border-slate-200 shadow-sm" 
          : "bg-[#151226]/90 border border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
      } p-4 rounded-xl flex items-center justify-between`}>
        <div className="flex items-center gap-3">
          <Layers size={20} className={theme === "light" ? "text-sky-600" : "text-cyan-400"} />
          <h2 className={`text-sm font-extrabold uppercase tracking-wider ${theme === "light" ? "text-slate-800" : "text-white"}`}>
            Chọn sản phẩm đo lường
          </h2>
        </div>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className={`text-sm font-bold rounded-lg px-3.5 py-2 focus:outline-none cursor-pointer w-72 border transition-all ${
            theme === "light"
              ? "bg-white border-slate-300 text-slate-800 focus:border-sky-500"
              : "bg-[#1f1a3e]/80 border-purple-500/20 text-white focus:border-cyan-400"
          }`}
        >
          {Object.entries(groupedProducts).map(([unit, products]) => (
            <optgroup key={unit} label={`Đơn vị: ${unit}`}>
              {products.map(prod => (
                <option key={prod.id} value={prod.id}>{prod.name}</option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {currentProduct && (
        <div className="flex flex-col lg:flex-row gap-5">
          {/* PRODUCT PROFILE CARD (25% Width) */}
          <div className={`${
            theme === "light" 
              ? "bg-white border border-slate-200 shadow-sm text-slate-800" 
              : "bg-[#151226]/90 border border-purple-500/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          } p-5 lg:w-1/4 flex flex-col justify-between shrink-0 min-h-[230px] rounded-2xl`}>
            <div>
              <span className={`text-xs font-black tracking-widest uppercase block mb-1 ${
                theme === "light" ? "text-sky-600" : "text-cyan-400"
              }`}>
                Thông tin sản phẩm
              </span>
              <h3 className={`text-lg font-black mb-4 ${theme === "light" ? "text-slate-800" : "text-white"}`}>
                {currentProduct.name}
              </h3>
            </div>
            
            <div className="space-y-3 text-xs flex-1">
              <div className={`flex justify-between items-center py-2 border-b ${
                theme === "light" ? "border-slate-100" : "border-white/5"
              }`}>
                <span className={`font-extrabold flex items-center gap-1.5 ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}><Briefcase size={14} /> PIC</span>
                <span className={`font-extrabold ${theme === "light" ? "text-slate-800" : "text-white"}`}>{currentProduct.pic || "Chưa gán"}</span>
              </div>
              <div className={`flex justify-between items-center py-2 border-b ${
                theme === "light" ? "border-slate-100" : "border-white/5"
              }`}>
                <span className={`font-extrabold flex items-center gap-1.5 ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}><Users size={14} /> Quy mô (FTE)</span>
                <span className={`font-extrabold ${theme === "light" ? "text-slate-800" : "text-white"}`}>{currentProduct.fte} nhân sự</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className={`font-extrabold flex items-center gap-1.5 ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}><FolderGit2 size={14} /> Phân loại</span>
                <span className={`font-black px-2.5 py-1 rounded-lg text-xs border ${
                  theme === "light"
                    ? "text-sky-700 bg-sky-50 border-sky-200"
                    : "text-cyan-300 bg-cyan-400/10 border-cyan-400/20"
                }`}>
                  {currentProduct.type || "Chưa phân loại"}
                </span>
              </div>
            </div>
          </div>

          {/* CROSS COMPARE MULTI-METRIC WIDGETS (75% Width) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Widget A: Doanh thu */}
            <div className={`${
              theme === "light" 
                ? "bg-white border border-slate-200 shadow-sm text-slate-800 border-t-4 border-t-emerald-600" 
                : "bg-gradient-to-r from-[#2c4cf5] to-[#3a8bf6] text-white shadow-[0_10px_25px_rgba(44,76,245,0.4)] border-none"
            } p-5 rounded-2xl flex flex-col justify-between h-[230px] transition-all duration-300 hover:scale-[1.02]`}>
              <div>
                <span className={`text-xs font-black tracking-widest uppercase ${
                  theme === "light" ? "text-emerald-600" : "text-blue-100/90"
                }`}>
                  Doanh thu (M1)
                </span>
                <h4 className={`text-xs font-bold mt-1 ${theme === "light" ? "text-slate-500" : "text-blue-100/80"}`}>Hoàn thành kế hoạch</h4>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-black ${theme === "light" ? "text-slate-800" : "text-white text-shadow-sm"}`}>
                    {revenueMetrics.target > 0 ? Math.round((revenueMetrics.actual / revenueMetrics.target) * 100) : 100}%
                  </span>
                  <span className={`text-xs font-bold ${theme === "light" ? "text-slate-500" : "text-blue-100/90"}`}>
                    {revenueMetrics.actual.toLocaleString()} / {revenueMetrics.target.toLocaleString()} {revenueMetrics.unit || "VNĐ"}
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
                  <div 
                    className={`h-full rounded-full ${theme === "light" ? "bg-emerald-500" : "bg-white"}`}
                    style={{ width: `${revenueMetrics.target > 0 ? Math.min(100, Math.round((revenueMetrics.actual / revenueMetrics.target) * 100)) : 100}%` }}
                  />
                </div>
              </div>
              <div className={`text-xs flex items-center gap-1 border-t pt-2 font-bold ${
                theme === "light" ? "border-slate-100 text-slate-500" : "border-white/10 text-blue-100/90"
              }`}>
                <TrendingUp size={14} className={theme === "light" ? "text-emerald-500" : "text-white"} />
                <span>Tiến độ tổng hợp theo sản phẩm</span>
              </div>
            </div>

            {/* Widget B: Sản lượng */}
            <div className={`${
              theme === "light" 
                ? "bg-white border border-slate-200 shadow-sm text-slate-800 border-t-4 border-t-lime-500" 
                : "bg-gradient-to-r from-[#8119e8] to-[#b327e5] text-white shadow-[0_10px_25px_rgba(129,25,232,0.4)] border-none"
            } p-5 rounded-2xl flex flex-col justify-between h-[230px] transition-all duration-300 hover:scale-[1.02]`}>
              <div>
                <span className={`text-xs font-black tracking-widest uppercase ${
                  theme === "light" ? "text-lime-600" : "text-purple-100/90"
                }`}>
                  Sản lượng (M2)
                </span>
                <h4 className={`text-xs font-bold mt-1 ${theme === "light" ? "text-slate-500" : "text-purple-100/80"}`}>Nội dung sản xuất</h4>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-black ${theme === "light" ? "text-slate-800" : "text-white text-shadow-sm"}`}>
                    {productionMetrics.target > 0 ? Math.round((productionMetrics.actual / productionMetrics.target) * 100) : 100}%
                  </span>
                  <span className={`text-xs font-bold ${theme === "light" ? "text-slate-500" : "text-purple-100/90"}`}>
                    {productionMetrics.actual.toLocaleString()} / {productionMetrics.target.toLocaleString()} {productionMetrics.unit || "ND"}
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
                  <div 
                    className={`h-full rounded-full ${theme === "light" ? "bg-lime-500" : "bg-white"}`}
                    style={{ width: `${productionMetrics.target > 0 ? Math.min(100, Math.round((productionMetrics.actual / productionMetrics.target) * 100)) : 100}%` }}
                  />
                </div>
              </div>
              <div className={`text-xs flex items-center gap-1 border-t pt-2 font-bold ${
                theme === "light" ? "border-slate-100 text-slate-500" : "border-white/10 text-purple-100/90"
              }`}>
                <TrendingUp size={14} className={theme === "light" ? "text-lime-500" : "text-white"} />
                <span>Số lượng hoàn thành theo chu kỳ</span>
              </div>
            </div>

            {/* Widget C: Traffic */}
            <div className={`${
              theme === "light" 
                ? "bg-white border border-slate-200 shadow-sm text-slate-800 border-t-4 border-t-emerald-500" 
                : "bg-gradient-to-r from-[#179fa9] to-[#25ccd8] text-white shadow-[0_10px_25px_rgba(23,159,169,0.4)] border-none"
            } p-5 rounded-2xl flex flex-col justify-between h-[230px] transition-all duration-300 hover:scale-[1.02]`}>
              <div>
                <span className={`text-xs font-black tracking-widest uppercase ${
                  theme === "light" ? "text-emerald-600" : "text-teal-100/90"
                }`}>
                  Lượt xem (M3)
                </span>
                <h4 className={`text-xs font-bold mt-1 ${theme === "light" ? "text-slate-500" : "text-teal-100/80"}`}>Traffic đạt được</h4>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className={`text-3xl font-black ${theme === "light" ? "text-slate-800" : "text-white text-shadow-sm"}`}>
                    {trafficMetrics.target > 0 ? Math.round((trafficMetrics.actual / trafficMetrics.target) * 100) : 100}%
                  </span>
                  <span className={`text-xs font-bold ${theme === "light" ? "text-slate-500" : "text-teal-100/90"}`}>
                    {trafficMetrics.actual.toLocaleString()} / {trafficMetrics.target.toLocaleString()} {trafficMetrics.unit || "Views"}
                  </span>
                </div>
                <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
                  <div 
                    className={`h-full rounded-full ${theme === "light" ? "bg-emerald-500" : "bg-white"}`}
                    style={{ width: `${trafficMetrics.target > 0 ? Math.min(100, Math.round((trafficMetrics.actual / trafficMetrics.target) * 100)) : 100}%` }}
                  />
                </div>
              </div>
              <div className={`text-xs flex items-center gap-1 border-t pt-2 font-bold ${
                theme === "light" ? "border-slate-100 text-slate-500" : "border-white/10 text-teal-100/90"
              }`}>
                <TrendingUp size={14} className={theme === "light" ? "text-emerald-500" : "text-white"} />
                <span>Số lượt tiếp cận thực tế</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FLAT GRID KPI LIST */}
      <div className={`${
        theme === "light" 
          ? "bg-white border border-slate-200 shadow-sm" 
          : "bg-[#151226]/90 border border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
      } p-6 rounded-2xl overflow-hidden`}>
        <h3 className={`text-sm font-black tracking-wider mb-4 uppercase flex items-center gap-2 ${
          theme === "light" ? "text-slate-800" : "text-indigo-400"
        }`}>
          📋 BẢNG CHỈ TIÊU PHẲNG SẢN PHẨM (FLAT GRID)
        </h3>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className={`font-bold p-3 text-center ${theme === "light" ? "text-slate-400" : "text-slate-500"}`}>Đang tải dữ liệu sản phẩm...</div>
          ) : kpiRows.length === 0 ? (
            <div className={`font-bold p-3 text-center ${theme === "light" ? "text-slate-400" : "text-slate-500"}`}>Không có dữ liệu chỉ tiêu trong kỳ này.</div>
          ) : (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className={`border-b font-black uppercase text-xs tracking-wider ${
                  theme === "light" 
                    ? "border-slate-200 text-slate-600 bg-slate-50" 
                    : "border-white/10 text-slate-300 bg-[#1c1836]/60"
                }`}>
                  <th className="p-3 w-32 text-center">Mã chỉ tiêu</th>
                  <th className="p-3">Tên Chỉ tiêu</th>
                  <th className="p-3 w-32 text-center">Kế hoạch</th>
                  <th className="p-3 w-32 text-center">Thực tế</th>
                  <th className="p-3 w-24 text-center">ĐVT</th>
                  <th className="p-3 w-28 text-center">Hoàn thành</th>
                </tr>
              </thead>
              <tbody>
                {kpiRows
                  .filter(row => !row.isParent)
                  .map(row => {
                    const target = getTargetValue(row);
                    const actual = getActualValue(row);
                    const pct = target > 0 ? Math.round((actual / target) * 100) : 100;
                    return (
                      <tr key={row.code} className={`border-b ${
                        theme === "light" 
                          ? "border-slate-100 hover:bg-slate-50/50 text-slate-700" 
                          : "border-white/5 hover:bg-[#1a1635]/50 text-slate-200"
                      } text-sm transition-all`}>
                        <td className="p-3 text-center">
                          <code className={`px-2.5 py-0.5 rounded font-mono text-xs font-extrabold border ${
                            theme === "light" 
                              ? "bg-slate-100 text-sky-600 border-slate-300" 
                              : "bg-slate-800 text-sky-400 border-sky-500/20"
                          }`}>
                            {row.displayCode}
                          </code>
                        </td>
                        <td className={`p-3 font-semibold ${theme === "light" ? "text-slate-800" : "text-white"}`}>{row.title}</td>
                        <td className={`p-3 text-center font-bold ${theme === "light" ? "text-slate-600" : "text-slate-300"}`}>
                          {row.unit === "%" ? `${target}%` : target.toLocaleString()}
                        </td>
                        <td className={`p-3 text-center font-black ${theme === "light" ? "text-slate-900" : "text-white"}`}>
                          {row.unit === "%" ? `${actual}%` : actual.toLocaleString()}
                        </td>
                        <td className="p-3 text-center font-bold text-slate-400 text-xs">{row.unit}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2.5 py-1 rounded-lg font-black text-xs inline-block ${
                            pct >= 100 
                              ? "text-emerald-500 bg-emerald-500/10 border border-emerald-500/20" 
                              : pct >= 80 
                              ? "text-amber-500 bg-amber-500/10 border border-amber-500/20" 
                              : "text-rose-500 bg-rose-500/10 border border-rose-500/20"
                          }`}>
                            {pct}%
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
