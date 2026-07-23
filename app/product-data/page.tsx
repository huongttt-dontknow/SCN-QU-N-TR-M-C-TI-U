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
  const { filters } = useApp();
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
      <div className="glass-panel p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Layers size={20} className="text-[var(--accent-cyan)]" />
          <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
            Chọn sản phẩm đo lường
          </h2>
        </div>
        <select
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
          className="bg-slate-900 border border-[var(--glass-border)] text-white text-sm font-bold rounded-lg px-3.5 py-2 focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer w-72"
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
          <div className="glass-panel p-5 lg:w-1/4 flex flex-col justify-between shrink-0 min-h-[230px]">
            <div>
              <span className="text-xs text-[var(--accent-cyan)] font-black tracking-widest uppercase block mb-1">
                Thông tin sản phẩm
              </span>
              <h3 className="text-lg font-black text-white mb-4">
                {currentProduct.name}
              </h3>
            </div>
            
            <div className="space-y-3 text-xs flex-1">
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[var(--text-muted)] font-extrabold flex items-center gap-1.5"><Briefcase size={14} /> PIC</span>
                <span className="font-extrabold text-white">{currentProduct.pic || "Chưa gán"}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/5">
                <span className="text-[var(--text-muted)] font-extrabold flex items-center gap-1.5"><Users size={14} /> Quy mô (FTE)</span>
                <span className="font-extrabold text-white">{currentProduct.fte} nhân sự</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-[var(--text-muted)] font-extrabold flex items-center gap-1.5"><FolderGit2 size={14} /> Phân loại</span>
                <span className="font-black text-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 px-2.5 py-1 rounded-lg border border-[var(--accent-cyan)]/20 text-xs">
                  {currentProduct.type || "Chưa phân loại"}
                </span>
              </div>
            </div>
          </div>

          {/* CROSS COMPARE MULTI-METRIC WIDGETS (75% Width) */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Widget A: Doanh thu */}
            <div className="glass-panel p-5 flex flex-col justify-between h-[230px] border-t-4 border-t-emerald-600">
              <div>
                <span className="text-xs text-emerald-600 font-black tracking-widest uppercase">
                  Doanh thu (M1)
                </span>
                <h4 className="text-xs text-[var(--text-muted)] font-bold mt-1">Hoàn thành kế hoạch</h4>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">
                    {revenueMetrics.target > 0 ? Math.round((revenueMetrics.actual / revenueMetrics.target) * 100) : 100}%
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-bold">
                    {revenueMetrics.actual.toLocaleString()} / {revenueMetrics.target.toLocaleString()} {revenueMetrics.unit || "VNĐ"}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full mt-2 overflow-hidden border border-white/5">
                  <div 
                    className="h-full rounded-full bg-emerald-600"
                    style={{ width: `${revenueMetrics.target > 0 ? Math.min(100, Math.round((revenueMetrics.actual / revenueMetrics.target) * 100)) : 100}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-[var(--text-muted)] flex items-center gap-1 border-t border-white/5 pt-2 font-bold">
                <TrendingUp size={14} className="text-emerald-500" />
                <span>Tiến độ tổng hợp theo sản phẩm</span>
              </div>
            </div>

            {/* Widget B: Sản lượng */}
            <div className="glass-panel p-5 flex flex-col justify-between h-[230px] border-t-4 border-t-lime-500">
              <div>
                <span className="text-xs text-lime-600 font-black tracking-widest uppercase">
                  Sản lượng (M2)
                </span>
                <h4 className="text-xs text-[var(--text-muted)] font-bold mt-1">Nội dung sản xuất</h4>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">
                    {productionMetrics.target > 0 ? Math.round((productionMetrics.actual / productionMetrics.target) * 100) : 100}%
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-bold">
                    {productionMetrics.actual.toLocaleString()} / {productionMetrics.target.toLocaleString()} {productionMetrics.unit || "ND"}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full mt-2 overflow-hidden border border-white/5">
                  <div 
                    className="h-full rounded-full bg-lime-500"
                    style={{ width: `${productionMetrics.target > 0 ? Math.min(100, Math.round((productionMetrics.actual / productionMetrics.target) * 100)) : 100}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-[var(--text-muted)] flex items-center gap-1 border-t border-white/5 pt-2 font-bold">
                <TrendingUp size={14} className="text-lime-500" />
                <span>Số lượng hoàn thành theo chu kỳ</span>
              </div>
            </div>

            {/* Widget C: Traffic */}
            <div className="glass-panel p-5 flex flex-col justify-between h-[230px] border-t-4 border-t-emerald-500">
              <div>
                <span className="text-xs text-emerald-600 font-black tracking-widest uppercase">
                  Lượt xem (M3)
                </span>
                <h4 className="text-xs text-[var(--text-muted)] font-bold mt-1">Traffic đạt được</h4>
              </div>
              <div className="my-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-white">
                    {trafficMetrics.target > 0 ? Math.round((trafficMetrics.actual / trafficMetrics.target) * 100) : 100}%
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-bold">
                    {trafficMetrics.actual.toLocaleString()} / {trafficMetrics.target.toLocaleString()} {trafficMetrics.unit || "Views"}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full mt-2 overflow-hidden border border-white/5">
                  <div 
                    className="h-full rounded-full bg-emerald-500"
                    style={{ width: `${trafficMetrics.target > 0 ? Math.min(100, Math.round((trafficMetrics.actual / trafficMetrics.target) * 100)) : 100}%` }}
                  />
                </div>
              </div>
              <div className="text-xs text-[var(--text-muted)] flex items-center gap-1 border-t border-white/5 pt-2 font-bold">
                <TrendingUp size={14} className="text-emerald-500" />
                <span>Số lượt tiếp cận thực tế</span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* FLAT GRID KPI LIST */}
      <div className="glass-panel p-5">
        <h3 className="text-sm font-black text-white tracking-wider mb-4 uppercase flex items-center gap-2">
          📋 BẢNG CHỈ TIÊU PHẲNG SẢN PHẨM (FLAT GRID)
        </h3>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="text-slate-400 font-bold p-3 text-center">Đang tải dữ liệu sản phẩm...</div>
          ) : kpiRows.length === 0 ? (
            <div className="text-slate-400 font-bold p-3 text-center">Không có dữ liệu chỉ tiêu trong kỳ này.</div>
          ) : (
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-300 font-black bg-slate-900/60 uppercase text-xs tracking-wider">
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
                      <tr key={row.code} className="border-b border-white/5 hover:bg-white/5 text-sm text-slate-200">
                        <td className="p-3 text-center">
                          <code className="bg-slate-800 text-sky-400 px-2.5 py-0.5 rounded font-mono text-xs font-extrabold border border-sky-500/20">
                            {row.displayCode}
                          </code>
                        </td>
                        <td className="p-3 text-white font-extrabold">{row.title}</td>
                        <td className="p-3 text-center font-bold text-slate-300">
                          {row.unit === "%" ? `${target}%` : target.toLocaleString()}
                        </td>
                        <td className="p-3 text-center font-black text-white">
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
