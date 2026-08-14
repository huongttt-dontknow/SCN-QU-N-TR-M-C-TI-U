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
  Layers,
  AlertOctagon
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
  group?: string;
  pic?: string;
}

const calculateCompletionPct = (target: number, actual: number, code?: string, title?: string): number => {
  const tCode = (code || "").toUpperCase();
  const tTitle = (title || "").toUpperCase();

  const isDisciplineNoViolation = 
    tCode.includes("M7-I03.01") || 
    tTitle.includes("KHÔNG VI PHẠM KỶ LUẬT");

  const isErrorOrPolicy = 
    !isDisciplineNoViolation && (
      tCode.includes("TM7") || 
      tCode.includes("VM7") ||
      tTitle.includes("LỖI") || 
      tTitle.includes("VI PHẠM") || 
      tTitle.includes("CHÍNH SÁCH") || 
      tTitle.includes("PHẠT") || 
      tTitle.includes("KỶ LUẬT") || 
      tTitle.includes("KHIẾU NẠI") ||
      tTitle.includes("STRIKE") || 
      tTitle.includes("CLAIM")
    );

  if (isDisciplineNoViolation) {
    if (actual >= 100 || actual > target) {
      return 100;
    }
    return target > 0 ? Math.round((actual / target) * 100) : 100;
  }

  if (target === 0) {
    if (actual === 0) {
      return isErrorOrPolicy ? 100 : 0;
    } else {
      return isErrorOrPolicy ? 0 : 100;
    }
  }

  if (isErrorOrPolicy) {
    return actual <= target ? 100 : 0;
  }

  const rawPct = Math.round((actual / target) * 100);
  const isM1 = tCode.includes("M1");
  if (isM1) {
    return rawPct;
  } else {
    return Math.min(130, rawPct);
  }
};

export default function ProductDataPage() {
  const { filters, theme, currentLoggedUser, setFilters } = useApp();
  const [selectedProductId, setSelectedProductId] = useState<string>("WO-1899-001");
  const [kpiRows, setKpiRows] = useState<KpiRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hideCodes, setHideCodes] = useState(false);

  // States for overall aggregate mode
  const isAggregateMode = filters.unitCode === "SCVN" || filters.unitCode === "TCT";
  const [allProductsKpis, setAllProductsKpis] = useState<any[]>([]);
  const [prevProductsKpis, setPrevProductsKpis] = useState<any[]>([]);
  const [isAllLoading, setIsAllLoading] = useState(false);

  const getPreviousPeriodKey = (key: string, type: string): string => {
    if (type === "weekly") {
      const parts = key.split("_");
      if (parts.length === 3) {
        const m = parseInt(parts[1]);
        const w = parseInt(parts[2]);
        if (w > 1) return `weekly_${m}_${w - 1}`;
        const prevM = m > 1 ? m - 1 : 12;
        return `weekly_${prevM}_4`;
      }
    } else if (type === "monthly") {
      const parts = key.split("_");
      if (parts.length === 2) {
        const m = parseInt(parts[1]);
        const prevM = m > 1 ? m - 1 : 12;
        return `monthly_${prevM}`;
      }
    } else if (type === "quarterly") {
      const parts = key.split("_");
      if (parts.length === 2) {
        const q = parseInt(parts[1]);
        const prevQ = q > 1 ? q - 1 : 4;
        return `quarterly_${prevQ}`;
      }
    } else if (type === "yearly") {
      const parts = key.split("_");
      if (parts.length === 2) {
        const y = parseInt(parts[1]);
        return `yearly_${y - 1}`;
      }
    }
    return key;
  };

  const mapProductUnitToUnitCode = (unit: string): string => {
    const mapping: Record<string, string> = {
      "Creative Hub": "CR",
      "Animated Story": "AS",
      "CNGP": "CN",
    };
    return mapping[unit] || unit;
  };

  const handleProductClick = (productId: string, productUnit: string) => {
    const unitCode = mapProductUnitToUnitCode(productUnit);
    setFilters(prev => ({ ...prev, unitCode }));
    setSelectedProductId(productId);
  };

  // Phân quyền Báo cáo Sản phẩm: Trưởng đơn vị / Người dùng chỉ được xem sản phẩm thuộc đơn vị của họ.
  const isRestrictedUser = currentLoggedUser?.role === "Trưởng đơn vị" || currentLoggedUser?.role === "Người dùng";
  
  const mapUnitCodeToProductUnit = (code: string): string => {
    const mapping: Record<string, string> = {
      "CR": "Creative Hub",
      "AS": "Animated Story",
      "CN": "CNGP",
    };
    return mapping[code] || code;
  };

  const allowedUnit = isRestrictedUser && currentLoggedUser?.unitCode 
    ? mapUnitCodeToProductUnit(currentLoggedUser.unitCode) 
    : null;

  const filteredProductsList = allowedUnit
    ? PRODUCTS_CATALOG.filter(p => p.unit === allowedUnit)
    : PRODUCTS_CATALOG;

  // Cảnh báo từ chối truy cập nếu bộ lọc đơn vị không khớp với đơn vị của người dùng bị hạn chế
  const isAccessDenied = isRestrictedUser && filters.unitCode !== currentLoggedUser?.unitCode;

  // Đồng bộ selectedProductId khi danh sách sản phẩm thay đổi hoặc khi khởi động
  useEffect(() => {
    if (filteredProductsList.length > 0) {
      const isAllowed = filteredProductsList.some(p => p.id === selectedProductId);
      if (!isAllowed) {
        setSelectedProductId(filteredProductsList[0].id);
      }
    }
  }, [filteredProductsList, selectedProductId]);

  // Fetch KPI data for the selected product and period filters
  useEffect(() => {
    if (isAggregateMode) return;
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
  }, [selectedProductId, filters.periodType, filters.month, filters.week, filters.quarter, filters.year, isAggregateMode]);

  // Fetch KPI data for ALL products in aggregate mode
  useEffect(() => {
    if (!isAggregateMode) return;
    setIsAllLoading(true);

    const pType = filters.periodType || "weekly";
    const m = filters.month || "7";
    const w = filters.week || "1";
    const q = filters.quarter || "Q3";
    const y = filters.year || "2026";

    let currentPeriodKey = "";
    if (pType === "weekly") currentPeriodKey = `weekly_${m}_${w}`;
    else if (pType === "monthly") currentPeriodKey = `monthly_${m}`;
    else if (pType === "quarterly") currentPeriodKey = `quarterly_${q.toLowerCase().replace("q", "")}`;
    else currentPeriodKey = `yearly_${y}`;

    const prevPeriodKey = getPreviousPeriodKey(currentPeriodKey, pType);

    const fetchCurrent = fetch(`/api/kpi?unitCode=${filters.unitCode}&productCode=all&periodKey=${currentPeriodKey}&periodType=${pType}&aggregate=false`)
      .then(res => res.json());

    const fetchPrev = fetch(`/api/kpi?unitCode=${filters.unitCode}&productCode=all&periodKey=${prevPeriodKey}&periodType=${pType}&aggregate=false&indicatorCode=VM1-I02.01`)
      .then(res => res.json());

    Promise.all([fetchCurrent, fetchPrev])
      .then(([currentData, prevData]) => {
        if (Array.isArray(currentData)) {
          setAllProductsKpis(currentData);
        }
        if (Array.isArray(prevData)) {
          setPrevProductsKpis(prevData);
        }
        setIsAllLoading(false);
      })
      .catch(err => {
        console.error("Lỗi khi tải dữ liệu tổng hợp:", err);
        setIsAllLoading(false);
      });
  }, [isAggregateMode, filters.unitCode, filters.periodType, filters.month, filters.week, filters.quarter, filters.year]);

  // Find currently selected product profile
  const currentProduct = filteredProductsList.find(p => p.id === selectedProductId) || null;

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
    const row = kpiRows.find(r => 
      displayCodes.includes(r.displayCode) || 
      titles.some(t => r.title.toLowerCase().includes(t.toLowerCase()))
    );

    if (row) {
      const target = getTargetValue(row);
      const actual = getActualValue(row);
      return { target, actual, unit: row.unit || "" };
    }

    const groupRow = kpiRows.find(r => r.displayCode === groupCode || r.code === groupCode);
    if (groupRow) {
      const target = getTargetValue(groupRow);
      const actual = getActualValue(groupRow);
      return { target, actual, unit: groupRow.unit || "" };
    }

    return { target: 100, actual: 0, unit: "" };
  };

  const revenueMetrics = getWidgetMetrics("M1", ["TM1-I02.01", "VM1-I02.01"], ["Tổng doanh thu", "Doanh thu kênh"]);
  const productionMetrics = getWidgetMetrics("M2", ["TM2-I01.01", "VM2-I01.01"], ["Số lượng video hoàn thành", "video hoàn thành sản xuất"]);
  const trafficMetrics = getWidgetMetrics("M3", ["TM3-I01.02", "VM3-I01.02"], ["Tổng traffic", "Số lượt view Youtube", "view youtube"]);

  // Group products dynamically by unit
  const groupedProducts: Record<string, Product[]> = {};
  filteredProductsList.forEach(p => {
    const u = p.unit || "Khác";
    if (!groupedProducts[u]) groupedProducts[u] = [];
    groupedProducts[u].push(p);
  });

  // Calculate metrics for aggregate mode
  const getAggregateMetrics = () => {
    const m1Records = allProductsKpis.filter(r => r.indicatorCode.endsWith("-VM1-I02.01"));
    let m1Target = 0;
    let m1Actual = 0;
    m1Records.forEach(r => {
      m1Target += r.targetValue || 0;
      m1Actual += r.actualValue || 0;
    });

    const m2Records = allProductsKpis.filter(r => r.indicatorCode.endsWith("-VM2-I01.01"));
    let m2Target = 0;
    let m2Actual = 0;
    m2Records.forEach(r => {
      m2Target += r.targetValue || 0;
      m2Actual += r.actualValue || 0;
    });

    const m3Records = allProductsKpis.filter(r => r.indicatorCode.endsWith("-TM3-I01.02"));
    let m3Target = 0;
    let m3Actual = 0;
    m3Records.forEach(r => {
      m3Target += r.targetValue || 0;
      m3Actual += r.actualValue || 0;
    });

    return {
      m1Target, m1Actual, m1Pct: calculateCompletionPct(m1Target, m1Actual),
      m2Target, m2Actual, m2Pct: calculateCompletionPct(m2Target, m2Actual),
      m3Target, m3Actual, m3Pct: calculateCompletionPct(m3Target, m3Actual)
    };
  };

  const aggMetrics = getAggregateMetrics();

  // Aggregate leaderboards
  const productRevenueCompletion = filteredProductsList.map(p => {
    const rec = allProductsKpis.find(r => r.indicatorCode === `${p.id}-VM1-I02.01`);
    const target = rec ? (rec.targetValue || 0) : 0;
    const actual = rec ? (rec.actualValue || 0) : 0;
    const pct = calculateCompletionPct(target, actual);
    return {
      ...p,
      target,
      actual,
      pct
    };
  });

  // Top 5 highest completion (>= 50%)
  const highestCompletionAll = productRevenueCompletion.filter(p => p.pct >= 50);
  const highestCompletion = [...highestCompletionAll]
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 5);

  // Top 5 lowest completion (Warning) (< 50%) - filter target > 0 to prioritize active items
  const warningProducts = productRevenueCompletion.filter(p => p.target > 0 && p.pct < 50);
  const lowestCompletion = [...warningProducts]
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 5);

  // Top 3-5 growth
  const productRevenueGrowth = filteredProductsList.map(p => {
    const currRec = allProductsKpis.find(r => r.indicatorCode === `${p.id}-VM1-I02.01`);
    const prevRec = prevProductsKpis.find(r => r.indicatorCode === `${p.id}-VM1-I02.01`);
    const currActual = currRec ? (currRec.actualValue || 0) : 0;
    const prevActual = prevRec ? (prevRec.actualValue || 0) : 0;
    const growthValue = currActual - prevActual;
    const growthPct = prevActual > 0 ? Math.round((growthValue / prevActual) * 100) : 0;
    return {
      ...p,
      currActual,
      prevActual,
      growthValue,
      growthPct
    };
  }).filter(p => p.growthValue > 0);

  const growthLeaderboard = [...productRevenueGrowth]
    .sort((a, b) => b.growthValue - a.growthValue)
    .slice(0, 5);

  if (isAccessDenied) {
    return (
      <div className="flex flex-col gap-6 text-slate-800 dark:text-white text-sm">
        <FiltersHeader />
        
        <div className="flex flex-col items-center justify-center min-h-[400px] glass-panel p-8 text-center max-w-xl mx-auto my-12 animate-fade-in font-sans">
          <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-full flex items-center justify-center mb-6 text-rose-400">
            <AlertOctagon size={32} className="animate-pulse" />
          </div>
          <h3 className="text-lg font-black text-white uppercase tracking-wider mb-2">
            Truy Cập Bị Từ Chối
          </h3>
          <p className="text-sm text-slate-300 mb-6 leading-relaxed font-semibold">
            Tài khoản của bạn chỉ được cấp quyền xem dữ liệu của đơn vị <strong>{currentLoggedUser?.unitCode}</strong>. Bạn không có quyền truy cập dữ liệu của đơn vị <strong>{filters.unitCode}</strong>.
          </p>
          <button
            onClick={() => {
              if (currentLoggedUser?.unitCode) {
                setFilters(prev => ({ ...prev, unitCode: currentLoggedUser.unitCode }));
              }
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-500 hover:to-blue-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all"
          >
            Quay lại Đơn vị của tôi ({currentLoggedUser?.unitCode})
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* FREEZE FILTERS */}
      <FiltersHeader />

      {/* PRODUCT SELECTOR / SUMMARY HEADER */}
      {isAggregateMode ? (
        <div className={`${
          theme === "light" 
            ? "bg-white border border-slate-200 shadow-sm" 
            : "bg-[#151226]/90 border border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
        } p-4 rounded-xl flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <Layers size={20} className={theme === "light" ? "text-sky-600" : "text-cyan-400"} />
            <h2 className={`text-sm font-extrabold uppercase tracking-wider ${theme === "light" ? "text-slate-800" : "text-white"}`}>
              Báo cáo tổng hợp tất cả sản phẩm
            </h2>
          </div>
          <span className={`text-xs font-black px-3.5 py-1.5 rounded-lg border uppercase tracking-wider ${
            theme === "light"
              ? "bg-slate-50 text-slate-600 border-slate-200"
              : "bg-purple-950/20 text-indigo-300 border-indigo-500/20"
          }`}>
            Đơn vị tổng: {filters.unitCode === "SCVN" ? "BU Sconnect Việt Nam" : "Tổng Công Ty"}
          </span>
        </div>
      ) : (
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
      )}

      {/* RENDER METRIC CARDS */}
      {isAggregateMode ? (
        // AGGREGATE DASHBOARD WIDGETS
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {/* Card 1: Product Summary Profile */}
          <div className={`${
            theme === "light" 
              ? "bg-white border border-slate-200 shadow-sm text-slate-800" 
              : "bg-[#151226]/90 border border-purple-500/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          } p-5 flex flex-col justify-between h-[230px] rounded-2xl`}>
            <div>
              <span className={`text-xs font-black tracking-widest uppercase block mb-1 ${
                theme === "light" ? "text-sky-600" : "text-cyan-400"
              }`}>
                Thông tin sản phẩm
              </span>
              <h3 className={`text-lg font-black mb-4 ${theme === "light" ? "text-slate-800" : "text-white"}`}>
                {filteredProductsList.length} Sản phẩm
              </h3>
            </div>
            
            <div className="space-y-3 text-xs flex-1">
              <div className={`flex justify-between items-center py-2 border-b ${
                theme === "light" ? "border-slate-100" : "border-white/5"
              }`}>
                <span className={`font-extrabold flex items-center gap-1.5 ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}><Briefcase size={14} /> Sản xuất mới</span>
                <span className={`font-extrabold ${theme === "light" ? "text-slate-800" : "text-white"}`}>
                  {filteredProductsList.filter(p => p.type === "Sản xuất mới").length} sản phẩm
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className={`font-extrabold flex items-center gap-1.5 ${theme === "light" ? "text-slate-500" : "text-slate-400"}`}><FolderGit2 size={14} /> Phái sinh / Khai thác</span>
                <span className={`font-extrabold ${theme === "light" ? "text-slate-800" : "text-white"}`}>
                  {filteredProductsList.filter(p => p.type === "Phái sinh/ Khai thác").length} sản phẩm
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Doanh thu M1 */}
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
              <div className="flex flex-col gap-1">
                <span className={`text-3xl font-black ${theme === "light" ? "text-slate-800" : "text-white text-shadow-sm"}`}>
                  {aggMetrics.m1Pct}%
                </span>
                <span className={`text-[10px] font-extrabold truncate ${theme === "light" ? "text-slate-500" : "text-blue-100/90"}`}>
                  {aggMetrics.m1Actual.toLocaleString()} / {aggMetrics.m1Target.toLocaleString()} VNĐ
                </span>
              </div>
              <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
                <div 
                  className={`h-full rounded-full ${theme === "light" ? "bg-emerald-500" : "bg-white"}`}
                  style={{ width: `${Math.min(100, aggMetrics.m1Pct)}%` }}
                />
              </div>
            </div>
            <div className={`text-[10px] flex items-center gap-1 border-t pt-2 font-bold ${
              theme === "light" ? "border-slate-100 text-slate-500" : "border-white/10 text-blue-100/90"
            }`}>
              <TrendingUp size={12} className={theme === "light" ? "text-emerald-500" : "text-white"} />
              <span>Doanh thu gộp {filteredProductsList.length} sản phẩm</span>
            </div>
          </div>

          {/* Card 3: Sản lượng M2 */}
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
              <div className="flex flex-col gap-1">
                <span className={`text-3xl font-black ${theme === "light" ? "text-slate-800" : "text-white text-shadow-sm"}`}>
                  {aggMetrics.m2Pct}%
                </span>
                <span className={`text-[10px] font-extrabold truncate ${theme === "light" ? "text-slate-500" : "text-purple-100/90"}`}>
                  {aggMetrics.m2Actual.toLocaleString()} / {aggMetrics.m2Target.toLocaleString()} Video
                </span>
              </div>
              <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
                <div 
                  className={`h-full rounded-full ${theme === "light" ? "bg-lime-500" : "bg-white"}`}
                  style={{ width: `${Math.min(100, aggMetrics.m2Pct)}%` }}
                />
              </div>
            </div>
            <div className={`text-[10px] flex items-center gap-1 border-t pt-2 font-bold ${
              theme === "light" ? "border-slate-100 text-slate-500" : "border-white/10 text-purple-100/90"
            }`}>
              <TrendingUp size={12} className={theme === "light" ? "text-lime-500" : "text-white"} />
              <span>Sản lượng gộp {filteredProductsList.length} sản phẩm</span>
            </div>
          </div>

          {/* Card 4: Lượt xem M3 */}
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
              <div className="flex flex-col gap-1">
                <span className={`text-3xl font-black ${theme === "light" ? "text-slate-800" : "text-white text-shadow-sm"}`}>
                  {aggMetrics.m3Pct}%
                </span>
                <span className={`text-[10px] font-extrabold truncate ${theme === "light" ? "text-slate-500" : "text-teal-100/90"}`}>
                  {aggMetrics.m3Actual.toLocaleString()} / {aggMetrics.m3Target.toLocaleString()} Views
                </span>
              </div>
              <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
                <div 
                  className={`h-full rounded-full ${theme === "light" ? "bg-emerald-500" : "bg-white"}`}
                  style={{ width: `${Math.min(100, aggMetrics.m3Pct)}%` }}
                />
              </div>
            </div>
            <div className={`text-[10px] flex items-center gap-1 border-t pt-2 font-bold ${
              theme === "light" ? "border-slate-100 text-slate-500" : "border-white/10 text-teal-100/90"
            }`}>
              <TrendingUp size={12} className={theme === "light" ? "text-emerald-500" : "text-white"} />
              <span>Lượt xem gộp {filteredProductsList.length} sản phẩm</span>
            </div>
          </div>
        </div>
      ) : (
        // SINGLE PRODUCT WIDGETS
        currentProduct && (
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
                      {calculateCompletionPct(revenueMetrics.target, revenueMetrics.actual, "M1", "Doanh thu")}%
                    </span>
                    <span className={`text-xs font-bold ${theme === "light" ? "text-slate-500" : "text-blue-100/90"}`}>
                      {revenueMetrics.actual.toLocaleString()} / {revenueMetrics.target.toLocaleString()} {revenueMetrics.unit || "VNĐ"}
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
                    <div 
                      className={`h-full rounded-full ${theme === "light" ? "bg-emerald-500" : "bg-white"}`}
                      style={{ width: `${Math.min(100, calculateCompletionPct(revenueMetrics.target, revenueMetrics.actual, "M1", "Doanh thu"))}%` }}
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
                      {calculateCompletionPct(productionMetrics.target, productionMetrics.actual, "M2", "Sản lượng")}%
                    </span>
                    <span className={`text-xs font-bold ${theme === "light" ? "text-slate-500" : "text-purple-100/90"}`}>
                      {productionMetrics.actual.toLocaleString()} / {productionMetrics.target.toLocaleString()} {productionMetrics.unit || "ND"}
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
                    <div 
                      className={`h-full rounded-full ${theme === "light" ? "bg-lime-500" : "bg-white"}`}
                      style={{ width: `${Math.min(100, calculateCompletionPct(productionMetrics.target, productionMetrics.actual, "M2", "Sản lượng"))}%` }}
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
                      {calculateCompletionPct(trafficMetrics.target, trafficMetrics.actual, "M3", "Lượt xem")}%
                    </span>
                    <span className={`text-xs font-bold ${theme === "light" ? "text-slate-500" : "text-teal-100/90"}`}>
                      {trafficMetrics.actual.toLocaleString()} / {trafficMetrics.target.toLocaleString()} {trafficMetrics.unit || "Views"}
                    </span>
                  </div>
                  <div className={`w-full h-2 rounded-full mt-2 overflow-hidden border ${theme === "light" ? "bg-slate-100 border-slate-200" : "bg-white/20 border-white/10"}`}>
                    <div 
                      className={`h-full rounded-full ${theme === "light" ? "bg-emerald-500" : "bg-white"}`}
                      style={{ width: `${Math.min(100, calculateCompletionPct(trafficMetrics.target, trafficMetrics.actual, "M3", "Lượt xem"))}%` }}
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
        )
      )}

      {/* RENDER CONTENT SECTION (LEADERBOARDS FOR AGGREGATE OR FLAT GRID FOR SINGLE PRODUCT) */}
      {isAggregateMode ? (
        // LEADERBOARDS SECTION
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Column A: Top 5 Highest Completion */}
          <div className={`${
            theme === "light" 
              ? "bg-white border border-slate-200 shadow-sm text-slate-800" 
              : "bg-[#151226]/90 border border-purple-500/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          } p-5 rounded-2xl flex flex-col min-h-[300px]`}>
            <h3 className={`text-xs font-black tracking-widest uppercase mb-4 flex items-center gap-1.5 ${
              theme === "light" ? "text-emerald-600" : "text-emerald-400"
            }`}>
              <TrendingUp size={16} /> Top 5 hoàn thành doanh thu
            </h3>
            <div className="space-y-3 flex-1 flex flex-col justify-start">
              {isAllLoading ? (
                <div className="text-xs text-slate-400 text-center py-8 font-bold animate-pulse">Đang tải bảng dữ liệu...</div>
              ) : highestCompletionAll.length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-12 font-extrabold leading-relaxed">
                  Không có đơn vị hoàn thành mục tiêu từ 50% trở lên
                </div>
              ) : (
                highestCompletion.map((p, idx) => (
                  <div key={p.id} className={`flex justify-between items-center py-2 border-b last:border-0 text-xs ${
                    theme === "light" ? "border-slate-100" : "border-white/5"
                  }`}>
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-extrabold text-slate-400 w-4">{idx + 1}.</span>
                      <button
                        onClick={() => handleProductClick(p.id, p.unit)}
                        className="font-black hover:underline text-left text-sky-500 hover:text-sky-400 truncate max-w-[150px]"
                        title={`Xem chi tiết ${p.name}`}
                      >
                        {p.name}
                      </button>
                    </div>
                    <span className={`font-black px-2.5 py-0.5 rounded-lg text-[10px] uppercase ${
                      theme === "light" 
                        ? "text-emerald-700 bg-emerald-50 border border-emerald-200" 
                        : "text-emerald-300 bg-emerald-500/10 border border-emerald-500/20"
                    }`}>
                      {p.pct}%
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column B: Top 5 Warning (Lowest Completion) */}
          <div className={`${
            theme === "light" 
              ? "bg-white border border-slate-200 shadow-sm text-slate-800" 
              : "bg-[#151226]/90 border border-purple-500/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          } p-5 rounded-2xl flex flex-col min-h-[300px]`}>
            <h3 className={`text-xs font-black tracking-widest uppercase mb-4 flex items-center gap-1.5 ${
              theme === "light" ? "text-rose-600" : "text-rose-400"
            }`}>
              <AlertOctagon size={16} /> Top 5 Cảnh báo doanh thu thấp
            </h3>
            <div className="space-y-3 flex-1 flex flex-col justify-start">
              {isAllLoading ? (
                <div className="text-xs text-slate-400 text-center py-8 font-bold animate-pulse">Đang tải bảng dữ liệu...</div>
              ) : warningProducts.length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-12 font-extrabold leading-relaxed">
                  Không có sản phẩm nào hoàn thành dưới 50%
                </div>
              ) : (
                lowestCompletion.map((p, idx) => (
                  <div key={p.id} className={`flex justify-between items-center py-2 border-b last:border-0 text-xs ${
                    theme === "light" ? "border-slate-100" : "border-white/5"
                  }`}>
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-extrabold text-slate-400 w-4">{idx + 1}.</span>
                      <button
                        onClick={() => handleProductClick(p.id, p.unit)}
                        className="font-black hover:underline text-left text-sky-500 hover:text-sky-400 truncate max-w-[150px]"
                        title={`Xem chi tiết ${p.name}`}
                      >
                        {p.name}
                      </button>
                    </div>
                    <span className={`font-black px-2.5 py-0.5 rounded-lg text-[10px] uppercase ${
                      theme === "light" 
                        ? "text-rose-700 bg-rose-50 border border-rose-200" 
                        : "text-rose-300 bg-rose-500/10 border border-rose-500/20"
                    }`}>
                      {p.pct}%
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Column C: Top 3-5 Growth */}
          <div className={`${
            theme === "light" 
              ? "bg-white border border-slate-200 shadow-sm text-slate-800" 
              : "bg-[#151226]/90 border border-purple-500/10 text-white shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          } p-5 rounded-2xl flex flex-col min-h-[300px]`}>
            <h3 className={`text-xs font-black tracking-widest uppercase mb-4 flex items-center gap-1.5 ${
              theme === "light" ? "text-emerald-600" : "text-emerald-400"
            }`}>
              <TrendingUp size={16} /> Top tăng trưởng kỳ trước
            </h3>
            <div className="space-y-3 flex-1 flex flex-col justify-start">
              {isAllLoading ? (
                <div className="text-xs text-slate-400 text-center py-8 font-bold animate-pulse">Đang tải bảng dữ liệu...</div>
              ) : growthLeaderboard.length === 0 ? (
                <div className="text-xs text-slate-400 text-center py-12 font-extrabold leading-relaxed">
                  Không có sản phẩm nào có tăng trưởng so với kỳ trước
                </div>
              ) : (
                growthLeaderboard.map((p, idx) => (
                  <div key={p.id} className={`flex justify-between items-center py-2 border-b last:border-0 text-xs ${
                    theme === "light" ? "border-slate-100" : "border-white/5"
                  }`}>
                    <div className="flex items-center gap-2 truncate">
                      <span className="font-extrabold text-slate-400 w-4">{idx + 1}.</span>
                      <button
                        onClick={() => handleProductClick(p.id, p.unit)}
                        className="font-black hover:underline text-left text-sky-500 hover:text-sky-400 truncate max-w-[150px]"
                        title={`Xem chi tiết ${p.name}`}
                      >
                        {p.name}
                      </button>
                    </div>
                    <span className={`font-black px-2.5 py-0.5 rounded-lg text-[10px] uppercase ${
                      theme === "light" 
                        ? "text-emerald-700 bg-emerald-50 border border-emerald-200" 
                        : "text-emerald-300 bg-emerald-500/10 border border-emerald-500/20"
                    }`}>
                      +{p.growthPct}%
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      ) : (
        // FLAT GRID KPI LIST
        <div className={`${
          theme === "light" 
            ? "bg-white border border-slate-200 shadow-sm" 
            : "bg-[#151226]/90 border border-purple-500/10 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
        } p-6 rounded-2xl overflow-hidden`}>
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className={`text-sm font-black tracking-wider uppercase flex items-center gap-2 ${
              theme === "light" ? "text-slate-800" : "text-indigo-400"
            }`}>
              📋 BẢNG CHỈ TIÊU PHẲNG SẢN PHẨM (FLAT GRID)
            </h3>
            <button
              onClick={() => setHideCodes(!hideCodes)}
              className={`text-xs font-black px-3.5 py-1.5 rounded-lg border transition-all shadow-sm active:scale-[0.98] ${
                theme === "light"
                  ? "bg-white hover:bg-slate-50 text-slate-700 border-slate-200"
                  : "bg-purple-950/20 hover:bg-purple-900/30 text-indigo-300 border-indigo-500/20"
              }`}
            >
              {hideCodes ? "👁️ Hiện mã chỉ tiêu" : "🙈 Ẩn mã chỉ tiêu"}
            </button>
          </div>
          
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
                    {!hideCodes && <th className="p-3 w-32 text-center">Mã chỉ tiêu</th>}
                    <th className="p-3">Tên Chỉ tiêu</th>
                    <th className="p-3 w-32 text-center">Kế hoạch</th>
                    <th className="p-3 w-32 text-center">Thực tế</th>
                    <th className="p-3 w-24 text-center">ĐVT</th>
                    <th className="p-3 w-28 text-center">Hoàn thành</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const isPureHeaderRow = (row: KpiRow) => {
                      const code = (row.displayCode || row.code || "").trim();
                      return ["M1", "M2", "M3", "M4", "M5", "M6", "M7"].includes(code) || /^.+-(M[1-7])$/i.test(code);
                    };

                    const validKpiRows = kpiRows.filter(row => !row.isParent && !isPureHeaderRow(row));

                    const M_SECTIONS = [
                      { key: "M1", name: "M1. TÀI CHÍNH / KINH DOANH", icon: "💰", borderLight: "bg-blue-50/80 border-l-4 border-l-blue-600 text-blue-900", borderDark: "bg-blue-950/40 border-l-4 border-l-blue-500 text-blue-300", badgeLight: "bg-blue-100 text-blue-800 border-blue-300", badgeDark: "bg-blue-900/60 text-blue-200 border-blue-500/30" },
                      { key: "M2", name: "M2. SẢN PHẨM / SẢN XUẤT", icon: "🎬", borderLight: "bg-lime-50/80 border-l-4 border-l-lime-600 text-lime-900", borderDark: "bg-lime-950/40 border-l-4 border-l-lime-500 text-lime-300", badgeLight: "bg-lime-100 text-lime-800 border-lime-300", badgeDark: "bg-lime-900/60 text-lime-200 border-lime-500/30" },
                      { key: "M3", name: "M3. KHÁCH HÀNG / DỊCH VỤ", icon: "📊", borderLight: "bg-cyan-50/80 border-l-4 border-l-cyan-600 text-cyan-900", borderDark: "bg-cyan-950/40 border-l-4 border-l-cyan-500 text-cyan-300", badgeLight: "bg-cyan-100 text-cyan-800 border-cyan-300", badgeDark: "bg-cyan-900/60 text-cyan-200 border-cyan-500/30" },
                      { key: "M4", name: "M4. THƯƠNG HIỆU / KÊNH KINH DOANH", icon: "🚀", borderLight: "bg-purple-50/80 border-l-4 border-l-purple-600 text-purple-900", borderDark: "bg-purple-950/40 border-l-4 border-l-purple-500 text-purple-300", badgeLight: "bg-purple-100 text-purple-800 border-purple-300", badgeDark: "bg-purple-900/60 text-purple-200 border-purple-500/30" },
                      { key: "M5", name: "M5. QUẢN TRỊ VẬN HÀNH", icon: "⚙️", borderLight: "bg-amber-50/80 border-l-4 border-l-amber-600 text-amber-900", borderDark: "bg-amber-950/40 border-l-4 border-l-amber-500 text-amber-300", badgeLight: "bg-amber-100 text-amber-800 border-amber-300", badgeDark: "bg-amber-900/60 text-amber-200 border-amber-500/30" },
                      { key: "M6", name: "M6. NHÂN SỰ TỔ CHỨC", icon: "👥", borderLight: "bg-indigo-50/80 border-l-4 border-l-indigo-600 text-indigo-900", borderDark: "bg-indigo-950/40 border-l-4 border-l-indigo-500 text-indigo-300", badgeLight: "bg-indigo-100 text-indigo-800 border-indigo-300", badgeDark: "bg-indigo-900/60 text-indigo-200 border-indigo-500/30" },
                      { key: "M7", name: "M7. VĂN HÓA DOANH NGHIỆP", icon: "⚖️", borderLight: "bg-rose-50/80 border-l-4 border-l-rose-600 text-rose-900", borderDark: "bg-rose-950/40 border-l-4 border-l-rose-500 text-rose-300", badgeLight: "bg-rose-100 text-rose-800 border-rose-300", badgeDark: "bg-rose-900/60 text-rose-200 border-rose-500/30" },
                    ];

                    const getRowGroupKey = (row: KpiRow): string => {
                      const code = (row.displayCode || row.code || "").toUpperCase();
                      const groupStr = (row.group || "").toUpperCase();
                      const pCode = (row.parentCode || "").toUpperCase();

                      if (code.includes("M1") || groupStr.includes("M1") || pCode.includes("M1")) return "M1";
                      if (code.includes("M2") || groupStr.includes("M2") || pCode.includes("M2")) return "M2";
                      if (code.includes("M3") || groupStr.includes("M3") || pCode.includes("M3")) return "M3";
                      if (code.includes("M4") || groupStr.includes("M4") || pCode.includes("M4")) return "M4";
                      if (code.includes("M5") || groupStr.includes("M5") || pCode.includes("M5")) return "M5";
                      if (code.includes("M6") || groupStr.includes("M6") || pCode.includes("M6")) return "M6";
                      if (code.includes("M7") || groupStr.includes("M7") || pCode.includes("M7")) return "M7";
                      return "M1";
                    };

                    return M_SECTIONS.map(sec => {
                      const rowsForSec = validKpiRows.filter(r => getRowGroupKey(r) === sec.key);
                      if (rowsForSec.length === 0) return null;

                      return (
                        <React.Fragment key={`group-${sec.key}`}>
                          {/* DÒNG TIÊU ĐỀ PHÂN VÙNG MỤC TIÊU M1 - M7 */}
                          <tr className={`border-b border-t ${theme === "light" ? sec.borderLight : sec.borderDark}`}>
                            <td colSpan={hideCodes ? 5 : 6} className="px-4 py-2.5 font-black text-xs tracking-wider">
                              <div className="flex justify-between items-center">
                                <span className="flex items-center gap-2 text-xs font-black uppercase">
                                  <span className="text-sm">{sec.icon}</span> {sec.name}
                                </span>
                                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${theme === "light" ? sec.badgeLight : sec.badgeDark}`}>
                                  {rowsForSec.length} chỉ tiêu
                                </span>
                              </div>
                            </td>
                          </tr>

                          {/* DANH SÁCH CÁC CHỈ TIÊU TRỰC THUỘC MỤC TIÊU */}
                          {rowsForSec.map(row => {
                            const target = getTargetValue(row);
                            const actual = getActualValue(row);
                            const pct = calculateCompletionPct(target, actual, row.displayCode || row.code, row.title);
                            const isMGoal = row.code === "M1" || row.code === "M2" || row.code === "M3" || row.code === "M4" || row.code === "M5" || row.code === "M6" || row.code === "M7" || row.code.endsWith("-M1") || row.code.endsWith("-M2") || row.code.endsWith("-M3") || row.code.endsWith("-M4") || row.code.endsWith("-M5") || row.code.endsWith("-M6") || row.code.endsWith("-M7");

                            return (
                              <tr key={row.code} className={`border-b ${
                                theme === "light" 
                                  ? "border-slate-100 hover:bg-slate-50/70 text-slate-700" 
                                  : "border-white/5 hover:bg-[#1a1635]/50 text-slate-200"
                              } text-sm transition-all`}>
                                {!hideCodes && (
                                  <td className="p-3 text-center">
                                    <code className={`px-2.5 py-0.5 rounded font-mono text-xs font-extrabold border ${
                                      isMGoal
                                        ? (theme === "light" ? "bg-sky-50 text-sky-600 border-sky-300" : "bg-sky-950/20 text-sky-400 border-sky-500/20")
                                        : (theme === "light" ? "bg-slate-100 text-sky-600 border-slate-300" : "bg-slate-800 text-sky-400 border-sky-500/20")
                                    }`}>
                                      {row.displayCode}
                                    </code>
                                  </td>
                                )}
                                <td className={`p-3 font-semibold ${
                                  isMGoal
                                    ? (theme === "light" ? "text-sky-600" : "text-sky-400")
                                    : (theme === "light" ? "text-slate-800" : "text-white")
                                }`}>{row.title}</td>
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
                        </React.Fragment>
                      );
                    });
                  })()}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
