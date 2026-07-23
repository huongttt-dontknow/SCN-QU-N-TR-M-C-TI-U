"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import { 
  Save, 
  Sparkles, 
  AlertTriangle, 
  X, 
  Plus, 
  Send,
  Film,
  Building2,
  Award,
  Crown
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

interface KpiItem {
  id?: string;
  code: string;
  title: string;
  unit: string;
  formula: string;
  target: number;
  actual: number;
  status: string;
  pic: string;
  group: string;
  frequency?: string;
}

interface ActionItem {
  id: number;
  title: string;
  indicator: string;
  impact: string;
  status: string;
}

interface ProductLine {
  id: string;
  name: string;
  code: string;
  unitCode: string;
}

interface ProductKpiItem {
  id?: string;
  code: string;
  title: string;
  unit: string;
  formula: string;
  target: number;
  actual: number;
  group: string;
  frequency?: string;
}

export default function InputFormPage() {
  const { filters, currentLoggedUser, setCurrentLoggedUser, theme } = useApp();

  // Tab State: "unit" vs "product"
  const [activeTab, setActiveTab] = useState<"unit" | "product">("unit");

  // Dòng sản phẩm đang chọn trong Tab 2
  const [selectedProdId, setSelectedProdId] = useState<string>("");

  // Giả lập vai trò xem (Trưởng đơn vị vs Giám đốc BU)
  const [simulatedRole, setSimulatedRole] = useState<"TĐV" | "GĐBU">("TĐV");

  // Dynamic products list fetched from database API
  const [productsList, setProductsList] = useState<ProductLine[]>(PRODUCTS_CATALOG.map(p => ({ id: p.id, name: p.name, code: p.id, unitCode: p.unit })));
  const [kpis, setKpis] = useState<KpiItem[]>([]);
  const [productKpis, setProductKpis] = useState<ProductKpiItem[]>([]);
  const [productsRankings, setProductsRankings] = useState<{ id: string, name: string, score: number }[]>([]);

  const [productNote, setProductNote] = useState("");
  const [showCodeColumn, setShowCodeColumn] = useState(false);
  const [editingCell, setEditingCell] = useState<{ kpiCode: string, field: "target" | "actual", value: string } | null>(null);

  const [reportNotes, setReportNotes] = useState("");
  const [reportStatus, setReportStatus] = useState("Đang nhập");
  const [explanations, setExplanations] = useState<Record<string, string>>({
    "VM2-I01.01": "Giải trình lý do cụ thể do nhân sự thiết kế chính xin nghỉ 3 ngày giữa tuần ảnh hưởng tốc độ kết xuất."
  });
  
  const [actions, setActions] = useState<ActionItem[]>([
    { id: 1, title: "Chuẩn hóa thư viện asset dùng chung để đẩy nhanh tốc độ diễn hoạt", indicator: "VM2-I01.01", impact: "Tăng sản lượng thêm 2 tập/tuần", status: "Chờ quyết định" }
  ]);

  const [productActions, setProductActions] = useState<ActionItem[]>([
    { id: 101, title: "Áp dụng công cụ AI sinh phông nền tự động cho Wolfoo 2D", indicator: "SP-M2-01", impact: "Tăng 20% tốc độ sản xuất", status: "Chờ quyết định" }
  ]);

  const [directorComment, setDirectorComment] = useState("");
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isProdAiGenerating, setIsProdAiGenerating] = useState(false);
  const isReadOnly = currentLoggedUser?.role === "Người dùng";

  // Helper mapping for filters.unitCode to Excel product unit field
  const unitCodeToNameMap: Record<string, string> = {
    "SCVN": "SCVN",
    "Wofloo": "Wofloo",
    "Lego": "Lego",
    "AS": "Animated Story",
    "DA01": "DA01",
    "Music": "Music",
    "NDTH": "NDTH",
    "CR": "Creative Hub",
    "CN": "CNGP",
    "SCS": "SCS"
  };

  // Helper tính periodKey dựa trên bộ lọc
  const getPeriodKey = () => {
    const pType = filters.periodType || "weekly";
    const m = filters.month || "7";
    const w = filters.week || "1";
    const q = filters.quarter || "Q3";
    const y = filters.year || "2026";
    if (pType === "weekly") {
      return `weekly_${m}_${w}`;
    } else if (pType === "monthly") {
      return `monthly_${m}`;
    } else if (pType === "quarterly") {
      return `quarterly_${q.toLowerCase().replace("q", "")}`;
    } else {
      return `yearly_${y}`;
    }
  };

  // 1. Products list is statically initialized from PRODUCTS_CATALOG

  const currentUnitName = unitCodeToNameMap[filters.unitCode] || filters.unitCode;
  const rawUnitProducts = (filters.unitCode === "SCVN" || filters.unitCode === "TCT")
    ? productsList
    : productsList.filter(p => p.unitCode === currentUnitName);

  // Thêm tùy chọn "Tất cả sản phẩm" lên đầu danh mục sản phẩm của đơn vị
  const currentUnitProducts = [
    { id: "all", name: "✨ Tất cả sản phẩm", code: "all", unitCode: filters.unitCode },
    ...rawUnitProducts
  ];

  const activeProductId = selectedProdId || "all";
  const currentProduct = currentUnitProducts.find(p => p.id === activeProductId) || currentUnitProducts[0] || null;

  // Tự động chọn "Tất cả sản phẩm" làm mặc định khi đổi đơn vị bộ lọc chính
  useEffect(() => {
    setSelectedProdId("all");
  }, [filters.unitCode]);

  const [prevKpis, setPrevKpis] = useState<Record<string, number>>({});

  const getPrevPeriodKey = () => {
    const pType = filters.periodType || "weekly";
    const m = parseInt(filters.month || "7");
    const w = parseInt(filters.week || "1");
    const q = filters.quarter || "Q3";
    const y = parseInt(filters.year || "2026");

    if (pType === "weekly") {
      if (w > 1) {
        return `weekly_${m}_${w - 1}`;
      } else {
        const prevM = m > 1 ? m - 1 : 12;
        const prevW = [1, 3, 5, 7, 8, 10, 12].includes(prevM) ? 5 : 4;
        return `weekly_${prevM}_${prevW}`;
      }
    } else if (pType === "monthly") {
      const prevM = m > 1 ? m - 1 : 12;
      return `monthly_${prevM}`;
    } else if (pType === "quarterly") {
      const qNum = parseInt(q.replace("Q", ""));
      const prevQ = qNum > 1 ? qNum - 1 : 4;
      return `quarterly_${prevQ}`;
    } else {
      const prevY = y - 1;
      return `yearly_${prevY}`;
    }
  };

  const checkKpiNeedsExplanation = (k: KpiItem) => {
    if (k.target <= 0) return false;
    
    const currentActual = k.actual;
    const target = k.target;
    const completionRate = currentActual / target;

    // Rule 1: completion rate is under 70%
    if (completionRate < 0.7) return true;

    // Rule 2: completion rate is under 100% AND drop compared to previous period actual is > 5%
    if (completionRate < 1.0) {
      const prevActual = prevKpis[k.code] || 0;
      if (prevActual > 0) {
        const drop = (prevActual - currentActual) / prevActual;
        if (drop > 0.05) return true;
      }
    }

    return false;
  };

  // Fetch previous period KPI data
  useEffect(() => {
    let isMounted = true;
    const prevKey = getPrevPeriodKey();
    const pType = filters.periodType || "weekly";
    
    fetch(`/api/kpi?unitCode=${filters.unitCode}&periodKey=${prevKey}&periodType=${pType}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && Array.isArray(data)) {
          const dict: Record<string, number> = {};
          data.forEach((d: any) => {
            dict[d.indicatorCode] = d.actualValue || 0;
          });
          setPrevKpis(dict);
        }
      })
      .catch(err => console.error("Lỗi tải dữ liệu KPI kỳ trước:", err));

    return () => {
      isMounted = false;
    };
  }, [filters.unitCode, filters.periodType, filters.month, filters.week, filters.quarter, filters.year]);

  // 2. Fetch unit-level KPI data
  useEffect(() => {
    let isMounted = true;
    const pKey = getPeriodKey();
    const pType = filters.periodType || "weekly";
    
    fetch(`/api/kpi?unitCode=${filters.unitCode}&periodKey=${pKey}&periodType=${pType}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            code: d.indicatorCode,
            title: d.title || d.indicatorCode,
            unit: d.unit || "",
            formula: d.formula || "",
            target: d.targetValue,
            actual: d.actualValue,
            status: d.status || "Chờ duyệt",
            pic: d.pic || "",
            group: d.group || "Chỉ số bổ sung",
            frequency: d.frequency || ""
          }));
          setKpis(mapped);
          
          const loadedExplanations: Record<string, string> = {};
          data.forEach((d: any) => {
            if (d.explanation) {
              loadedExplanations[d.indicatorCode] = d.explanation;
            }
          });
          setExplanations(loadedExplanations);
          
          const firstWithStatus = data.find((d: any) => d.status);
          if (firstWithStatus) {
            setReportStatus(firstWithStatus.status);
          }
        }
      })
      .catch(err => console.error("Lỗi tải dữ liệu nhập liệu KPI:", err));

    return () => {
      isMounted = false;
    };
  }, [filters.unitCode, filters.periodType, filters.month, filters.week, filters.quarter, filters.year]);

  // 3. Fetch product-level KPI data
  useEffect(() => {
    if (!activeProductId) return;
    let isMounted = true;
    const pKey = getPeriodKey();
    const pType = filters.periodType || "weekly";
    
    fetch(`/api/kpi?productCode=${activeProductId}&periodKey=${pKey}&periodType=${pType}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && Array.isArray(data)) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            code: d.indicatorCode,
            title: d.title || d.indicatorCode,
            unit: d.unit || "",
            formula: d.formula || "",
            target: d.targetValue,
            actual: d.actualValue,
            group: d.group || "Chỉ số bổ sung",
            frequency: d.frequency || ""
          }));
          setProductKpis(mapped);
        }
      })
      .catch(err => console.error("Lỗi tải dữ liệu chỉ tiêu sản phẩm:", err));

    return () => {
      isMounted = false;
    };
  }, [activeProductId, filters.periodType, filters.month, filters.week, filters.quarter, filters.year]);

  // 4. Fetch dynamic rankings for current unit products
  useEffect(() => {
    if (currentUnitProducts.length === 0) return;
    const pType = filters.periodType || "weekly";
    
    Promise.all(currentUnitProducts.map(async (p) => {
      try {
        const res = await fetch(`/api/kpi?productCode=${p.id}&periodKey=${getPeriodKey()}&periodType=${pType}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          const mapped = data.map((d: any) => ({
            code: d.indicatorCode,
            title: d.title,
            target: d.targetValue,
            actual: d.actualValue
          }));
          const score = isWeekly ? calcWeeklyPHS(mapped).phsWeekly : calcOfficialPHS(mapped).phs;
          return { id: p.id, name: p.name, score };
        }
      } catch (err) {
        console.error(err);
      }
      return { id: p.id, name: p.name, score: 0 };
    })).then(results => {
      setProductsRankings(results.sort((a, b) => b.score - a.score));
    });
  }, [currentUnitProducts, filters.periodType, filters.month, filters.week, filters.quarter, filters.year]);

  // Function to save unit-level KPIs to database
  const saveKpisToDatabase = async (kpiList: KpiItem[], statusOverride?: string) => {
    const pKey = getPeriodKey();
    const pType = filters.periodType || "weekly";
    const kpiUpdates = kpiList.map(k => ({
      id: k.id,
      targetValue: k.target,
      actualValue: k.actual,
      explanation: explanations[k.code] || "",
      status: statusOverride || k.status || "Đang thực hiện"
    })).filter(k => k.id);

    try {
      const res = await fetch("/api/kpi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitCode: filters.unitCode,
          periodKey: pKey,
          periodType: pType,
          kpiUpdates
        })
      });
      if (res.ok) {
        return true;
      }
    } catch (err) {
      console.error("Lỗi khi lưu KPI vào DB:", err);
    }
    return false;
  };

  // Function to save product-level KPIs to database
  const saveProductKpisToDatabase = async (prodKpiList: ProductKpiItem[]) => {
    const pKey = getPeriodKey();
    const pType = filters.periodType || "weekly";
    const kpiUpdates = prodKpiList.map(k => ({
      id: k.id,
      targetValue: k.target,
      actualValue: k.actual,
      explanation: "",
      status: "Đang nhập"
    })).filter(k => k.id);

    try {
      const res = await fetch("/api/kpi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitCode: filters.unitCode,
          productCode: activeProductId,
          periodKey: pKey,
          periodType: pType,
          kpiUpdates
        })
      });
      if (res.ok) {
        return true;
      }
    } catch (err) {
      console.error("Lỗi khi lưu KPI sản phẩm vào DB:", err);
    }
    return false;
  };

  const handleInputChange = (code: string, val: string) => {
    setKpis(prev => prev.map(k => k.code === code ? { ...k, actual: parseFloat(val) || 0 } : k));
  };

  const handleTargetChange = (code: string, val: string) => {
    setKpis(prev => prev.map(k => k.code === code ? { ...k, target: parseFloat(val) || 0 } : k));
  };

  const handleProdInputChange = (code: string, val: number) => {
    setProductKpis(prev => prev.map(k => k.code === code ? { ...k, actual: val } : k));
  };

  const handleProdTargetChange = (code: string, val: number) => {
    setProductKpis(prev => prev.map(k => k.code === code ? { ...k, target: val } : k));
  };

  const formatValue = (val: number, unit: string) => {
    if (val === undefined || val === null || isNaN(val)) return "0";
    if (Number.isInteger(val)) {
      return val.toLocaleString("en-US");
    }
    return val.toString();
  };

  const getStatusStyle = (status: string) => {
    const s = status ? status.trim() : "";
    if (s === "Đã duyệt" || s === "Hoàn thành" || s === "Đạt") {
      return "bg-emerald-100 text-emerald-800 border border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/30";
    }
    if (s === "Chờ duyệt" || s === "Đang đánh giá") {
      return "bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/30";
    }
    if (s === "Yêu cầu hiệu chỉnh" || s === "Không đạt" || s === "Chậm tiến độ") {
      return "bg-rose-100 text-rose-800 border border-rose-300 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-800/30";
    }
    return "bg-slate-100 text-slate-800 border border-slate-300 dark:bg-slate-900/60 dark:text-slate-300 dark:border-white/10";
  };

  const isImportantIndicator = (title: string) => {
    const t = title.toLowerCase();
    const importantKeywords = [
      "tổng doanh thu",
      "số lượt view youtube",
      "1 triệu views",
      "hoàn thành sản xuất",
      "phái sinh & khai thác",
      "tổng số kênh kinh doanh",
      "số kênh bkt",
      "không vi phạm kỷ luật"
    ];
    return importantKeywords.some(keyword => t.includes(keyword));
  };

  const handleSaveRow = async (code: string) => {
    if (isReadOnly) return;
    const item = kpis.find(k => k.code === code);
    if (!item) return;
    const success = await saveKpisToDatabase([item]);
    if (success) {
      alert(`✓ Đã lưu thành công dữ liệu chỉ tiêu: ${item.title}`);
    } else {
      alert(`❌ Có lỗi xảy ra khi lưu chỉ tiêu: ${item.title}`);
    }
  };

  const handleSaveProdRow = async (code: string) => {
    if (isReadOnly) return;
    const item = productKpis.find(k => k.code === code);
    if (!item) return;
    const success = await saveProductKpisToDatabase([item]);
    if (success) {
      alert(`✓ Đã lưu thành công dữ liệu sản phẩm cho chỉ tiêu: ${item.title}`);
    } else {
      alert(`❌ Có lỗi xảy ra khi lưu chỉ tiêu sản phẩm: ${item.title}`);
    }
  };

  const handleSaveNotes = () => {
    alert("✓ Đã lưu thành công ý kiến ghi chú của Trưởng đơn vị!");
  };

  const handleSaveExplanations = () => {
    alert("✓ Đã lưu giải trình bắt buộc thành công!");
  };

  const handleAcceptAction = (id: number) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: "Đã chấp nhận" } : a));
  };

  const handleSkipAction = (id: number) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: "Bỏ qua" } : a));
  };

  const handleAiSuggestActions = async () => {
    if (isReadOnly || isAiGenerating) return;
    setIsAiGenerating(true);
    try {
      const pKey = getPeriodKey();
      const pType = filters.periodType || "weekly";
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          unitCode: filters.unitCode,
          periodKey: pKey,
          periodType: pType,
          kpis: kpis.map(k => ({
            indicatorCode: k.code,
            title: k.title,
            targetValue: k.target,
            actualValue: k.actual,
            pic: k.pic
          }))
        })
      });
      const data = await res.json();
      if (data && Array.isArray(data.suggestedActions)) {
        const newActions = data.suggestedActions.map((act: any, idx: number) => ({
          id: Date.now() + idx,
          title: act.title,
          indicator: act.targetIndicator || "Chỉ số liên quan",
          impact: act.impact,
          status: "Chờ quyết định"
        }));
        setActions(prev => [...prev, ...newActions]);
      } else {
        alert("⚠️ Không nhận được gợi ý hành động hợp lệ từ AI.");
      }
    } catch (err: any) {
      console.error(err);
      alert("❌ Lỗi khi kết nối với AI Agent: " + err.message);
    } finally {
      setIsAiGenerating(false);
    }
  };

  const handleProdAiSuggestActions = async () => {
    if (isReadOnly || isProdAiGenerating) return;
    setIsProdAiGenerating(true);
    try {
      const pKey = getPeriodKey();
      const pType = filters.periodType || "weekly";
      const res = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          unitCode: currentProduct?.name || activeProductId,
          periodKey: pKey,
          periodType: pType,
          kpis: productKpis.map(k => ({
            indicatorCode: k.code,
            title: k.title,
            targetValue: k.target,
            actualValue: k.actual,
            pic: ""
          }))
        })
      });
      const data = await res.json();
      if (data && Array.isArray(data.suggestedActions)) {
        const newActions = data.suggestedActions.map((act: any, idx: number) => ({
          id: Date.now() + idx,
          title: act.title,
          indicator: act.targetIndicator || "Chỉ số liên quan",
          impact: act.impact,
          status: "Chờ quyết định"
        }));
        setProductActions(prev => [...prev, ...newActions]);
      } else {
        alert("⚠️ Không nhận được gợi ý hành động hợp lệ từ AI.");
      }
    } catch (err: any) {
      console.error(err);
      alert("❌ Lỗi khi kết nối với AI Agent: " + err.message);
    } finally {
      setIsProdAiGenerating(false);
    }
  };

  const handleAddCustomAction = () => {
    if (isReadOnly) return;
    const title = prompt("Nhập tiêu đề hành động khắc phục đề xuất:") || "";
    if (!title) return;
    setActions(prev => [
      ...prev,
      { id: Date.now(), title, indicator: "VM2-I01.01", impact: "Cải thiện tiến độ", status: "Chờ quyết định" }
    ]);
  };

  const handleAddCustomProdAction = () => {
    if (isReadOnly) return;
    const title = prompt("Nhập tên hành động cải tiến cho dòng sản phẩm:") || "";
    if (!title) return;
    setProductActions(prev => [
      ...prev,
      { id: Date.now(), title, indicator: "Hiếu quả PSH", impact: "Tăng điểm PSH sản phẩm", status: "Chờ quyết định" }
    ]);
  };

  const handleSendReport = async () => {
    if (isReadOnly) return;
    const success = await saveKpisToDatabase(kpis, "Chờ duyệt");
    if (success) {
      setReportStatus("Chờ duyệt");
      alert("🚀 Đã gửi báo cáo cho Giám đốc BU SCVN thành công!");
    } else {
      alert("❌ Có lỗi xảy ra khi gửi báo cáo.");
    }
  };

  const handleApproveReport = async () => {
    if (isReadOnly) return;
    const success = await saveKpisToDatabase(kpis, "Đã duyệt");
    if (success) {
      setReportStatus("Đã duyệt");
      alert("✓ Giám đốc BU đã phê duyệt báo cáo toàn kỳ!");
    } else {
      alert("❌ Có lỗi xảy ra khi duyệt báo cáo.");
    }
  };

  const handleRejectReport = async () => {
    if (isReadOnly) return;
    const success = await saveKpisToDatabase(kpis, "Yêu cầu hiệu chỉnh");
    if (success) {
      setReportStatus("Yêu cầu hiệu chỉnh");
      alert("✖ Đã gửi yêu cầu hiệu chỉnh báo cáo về Trưởng đơn vị!");
    } else {
      alert("❌ Có lỗi xảy ra.");
    }
  };

  const handleSaveDraft = async () => {
    if (isReadOnly) return;
    const success = await saveKpisToDatabase(kpis, "Đang nhập");
    if (success) {
      setReportStatus("Đang nhập");
      alert("💾 Đã lưu thành công bản nháp báo cáo!");
    } else {
      alert("❌ Có lỗi xảy ra khi lưu bản nháp.");
    }
  };

  const shouldShowByFrequency = (freq: string | undefined, title: string, code: string) => {
    const periodType = filters.periodType || "weekly";
    const f = (freq || "").toLowerCase().trim();
    const t = title.toLowerCase();
    const c = code.toLowerCase();

    // Detect quarterly indicators by frequency field or keywords in title/code
    const isQuarterly = f === "quý" || f === "quarterly" || t.includes("roi") || t.includes("ros") || t.includes("tỷ suất lợi nhuận");
    
    // Detect monthly indicators by frequency field or keywords in title/code
    const isMonthly = f === "tháng" || f === "monthly" || t.includes("chi phí mua công cụ") || t.includes("chi phí ctv") || t.includes("độ phủ thương hiệu") || t.includes("kỷ luật") || t.includes("nhân sự fulltime") || t.includes("đào tạo") || t.includes("ngân sách");

    if (periodType === "weekly") {
      // Weekly reports: hide both monthly and quarterly indicators
      if (isQuarterly || isMonthly) return false;
    } else if (periodType === "monthly") {
      // Monthly reports: hide quarterly indicators, show monthly & weekly indicators
      if (isQuarterly) return false;
    }
    
    return true;
  };

  const visibleKpis = kpis.filter(k => shouldShowByFrequency(k.frequency, k.title, k.code));
  const groups = Array.from(new Set(visibleKpis.map(k => k.group).filter(Boolean)));

  const visibleProductKpis = productKpis.filter(pk => shouldShowByFrequency(pk.frequency, pk.title, pk.code));
  const prodGroups = Array.from(new Set(visibleProductKpis.map(pk => pk.group).filter(Boolean)));

  // Thuật toán PSH cho Tab 2
  const isWeekly = filters.periodType === "weekly";

  const getMainMetrics = (items: { code: string, title: string, target: number, actual: number }[], groupCode: string, displayCodes: string[], titles: string[]) => {
    const found = items.find(i => {
      const displayCode = selectedProdId ? i.code.replace(selectedProdId + "-", "") : i.code;
      return displayCodes.includes(displayCode) || titles.some(t => i.title.toLowerCase().includes(t.toLowerCase()));
    });
    return found;
  };

  const calcWeeklyPHS = (items: { code: string, title: string, target: number, actual: number }[]) => {
    const rev = getMainMetrics(items, "M1", ["TM1-I02.01", "VM1-I02.01"], ["Tổng doanh thu", "Doanh thu kênh"]);
    const vol = getMainMetrics(items, "M2", ["TM2-I01.01", "VM2-I01.01"], ["Số lượng video hoàn thành", "video hoàn thành sản xuất"]);
    const view = getMainMetrics(items, "M3", ["TM3-I01.02", "VM3-I01.02"], ["Tổng traffic", "Số lượt view Youtube", "view youtube"]);

    const rRev = rev && rev.target > 0 ? Math.min(1.2, rev.actual / rev.target) * 100 : 100;
    const rVol = vol && vol.target > 0 ? Math.min(1.2, vol.actual / vol.target) * 100 : 100;
    const rView = view && view.target > 0 ? Math.min(1.2, view.actual / view.target) * 100 : 100;

    const phsWeekly = Math.round(0.5 * rRev + 0.3 * rVol + 0.2 * rView);
    const projectedMonthlyPHS = Math.min(115, Math.round(phsWeekly * 1.02));

    let riskTag = "🟢 RỦI RO THẤP (On track)";
    let riskColor = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (phsWeekly < 70 || rRev < 60 || rVol < 60) {
      riskTag = "🔴 RỦI RO RẤT CAO (Critical)";
      riskColor = "bg-rose-500/20 text-rose-400 border-rose-500/30";
    } else if (phsWeekly < 90) {
      riskTag = "🟡 RỦI RO TRUNG BÌNH (At risk)";
      riskColor = "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }

    return { phsWeekly, projectedMonthlyPHS, riskTag, riskColor, rRev: Math.round(rRev), rVol: Math.round(rVol), rView: Math.round(rView) };
  };

  const calcOfficialPHS = (items: { code: string, title: string, target: number, actual: number }[]) => {
    const rev = getMainMetrics(items, "M1", ["TM1-I02.01", "VM1-I02.01"], ["Tổng doanh thu", "Doanh thu kênh"]);
    const vol = getMainMetrics(items, "M2", ["TM2-I01.01", "VM2-I01.01"], ["Số lượng video hoàn thành", "video hoàn thành sản xuất"]);
    const view = getMainMetrics(items, "M3", ["TM3-I01.02", "VM3-I01.02"], ["Tổng traffic", "Số lượt view Youtube", "view youtube"]);

    const rRev = rev && rev.target > 0 ? Math.min(1.2, rev.actual / rev.target) * 100 : 100;
    const rVol = vol && vol.target > 0 ? Math.min(1.2, vol.actual / vol.target) * 100 : 100;
    const rView = view && view.target > 0 ? Math.min(1.2, view.actual / view.target) * 100 : 100;

    const phs = Math.round(0.4 * rRev + 0.3 * rVol + 0.2 * rView + 0.1 * 100);

    let status = "🟢 XANH LÁ (Khỏe mạnh)";
    let badgeColor = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";
    if (phs < 70) {
      status = "🔴 ĐỎ (Nguy kịch / Critical)";
      badgeColor = "bg-rose-500/20 text-rose-400 border-rose-500/30";
    } else if (phs < 90) {
      status = "🟡 VÀNG (Cảnh báo / At risk)";
      badgeColor = "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }

    return { phs, fhi: Math.round(rRev), ohi: Math.round(rVol), qci: Math.round(rView), rhi: 95, chi: 99, status, isVeto: false, badgeColor };
  };

  const weeklyPHSInfo = calcWeeklyPHS(productKpis);
  const officialPHSInfo = calcOfficialPHS(productKpis);
  const unitProductRankings = productsRankings;

  return (
    <div className="flex flex-col gap-4 pb-16 text-white">
      {/* FREEZE FILTERS WITH INTEGRATED COMPACT TAB SWITCHER */}
      <FiltersHeader>
        <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1 rounded-xl border border-slate-300 dark:border-white/10 w-full md:w-fit shadow-sm self-end mb-[2px]">
          <button
            onClick={() => setActiveTab("unit")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-black transition-all ${
              activeTab === "unit"
                ? "bg-gradient-to-r from-emerald-600 to-lime-600 text-white shadow-sm"
                : "bg-white dark:bg-transparent text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-transparent font-bold"
            }`}
          >
            <Building2 size={13} /> 🏢 BÁO CÁO THEO ĐƠN VỊ ({filters.unitCode})
          </button>
          <button
            onClick={() => setActiveTab("product")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-black transition-all ${
              activeTab === "product"
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm"
                : "bg-white dark:bg-transparent text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-transparent font-bold"
            }`}
          >
            <Film size={13} /> 🎬 BÁO CÁO THEO SẢN PHẨM
          </button>
        </div>
      </FiltersHeader>

      {/* ==================== TAB 1: BÁO CÁO KẾT QUẢ THEO ĐƠN VỊ (KHỐI 1 - 5 NGUYÊN MẪU) ==================== */}
      {activeTab === "unit" && (
        <>
          {/* KHỐI 1: BẢNG NHẬP LIỆU CHỈ SỐ KPI THỰC TẾ (HÀNG TUẦN) - BỘ PHẬN: SCVN */}
          <div className="glass-panel p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-black text-[#10b981] tracking-wider uppercase flex items-center gap-2">
                <Building2 size={16} /> 🟢 KHU VỰC 1: BẢNG NHẬP LIỆU CHỈ SỐ KPI THỰC TẾ (HÀNG TUẦN) - BỘ PHẬN: {filters.unitCode.toUpperCase()}
              </h3>
              <button
                onClick={() => setShowCodeColumn(!showCodeColumn)}
                className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
              >
                {showCodeColumn ? "🙈 Ẩn Mã chỉ tiêu" : "👁️ Hiện Mã chỉ tiêu"}
              </button>
            </div>

            <div className="max-h-[600px] overflow-y-auto overflow-x-auto relative">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950 shadow">
                  <tr className="border-b border-white/10 text-slate-300 font-black bg-slate-900 uppercase text-xs">
                    {showCodeColumn && <th className="p-3 w-24 text-center">Mã chỉ tiêu</th>}
                    <th className="p-3 max-w-[250px] w-[250px]">Mục tiêu / Chỉ tiêu cần báo cáo</th>
                    <th className="p-3 w-16 text-center">ĐVT</th>
                    <th className="p-3 w-48">Cách tính</th>
                    <th className="p-3 w-32 text-center bg-sky-950/30 text-sky-300">KH Định Kỳ</th>
                    <th className="p-3 w-36 text-center bg-purple-950/30 text-purple-300">Kết quả Thực tế</th>
                    <th className="p-3 w-24 text-center">% Hoàn thành</th>
                    <th className="p-3 w-[200px] text-center">Ghi chú kết quả</th>
                    <th className="p-3 w-[120px] text-center">Trạng thái duyệt</th>
                    <th className="p-3 w-24 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map(groupName => {
                    const items = visibleKpis.filter(k => k.group === groupName);
                    return (
                      <React.Fragment key={groupName}>
                        <tr className="bg-slate-900/50 text-[#10b981] font-black border-b border-white/5 uppercase text-xs">
                          <td colSpan={showCodeColumn ? 10 : 9} className="p-2.5 tracking-wider">
                            {groupName}
                          </td>
                        </tr>
                        {items.map(kpi => {
                          const pct = kpi.target > 0 ? Math.round((kpi.actual / kpi.target) * 100) : 0;
                          return (
                            <tr key={kpi.code} className="border-b border-white/5 hover:bg-white/5 text-sm text-slate-200">
                              {showCodeColumn && (
                                <td className="p-3 w-24 text-center">
                                  <code className="bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono text-xs font-bold border border-sky-500/20">{kpi.code}</code>
                                </td>
                              )}
                              <td className={`p-3 font-bold max-w-[250px] w-[250px] break-words ${isImportantIndicator(kpi.title) ? "text-[#10b981] dark:text-[#34d399]" : "text-white"}`}>{kpi.title}</td>
                              <td className="p-3 text-center text-slate-400 font-bold text-xs">{kpi.unit}</td>
                              <td className="p-3 italic text-slate-400 text-xs truncate max-w-[150px]" title={kpi.formula}>
                                {kpi.formula}
                              </td>
                              <td className="p-3 text-center">
                                <input
                                  type="text"
                                  value={editingCell?.kpiCode === kpi.code && editingCell?.field === "target" ? editingCell.value : formatValue(kpi.target, kpi.unit)}
                                  disabled={isReadOnly || reportStatus === "Chờ duyệt"}
                                  onFocus={() => setEditingCell({ kpiCode: kpi.code, field: "target", value: kpi.target.toString() })}
                                  onChange={(e) => setEditingCell({ kpiCode: kpi.code, field: "target", value: e.target.value })}
                                  onBlur={() => {
                                    if (editingCell) {
                                      const val = parseFloat(editingCell.value) || 0;
                                      handleTargetChange(kpi.code, val.toString());
                                      setEditingCell(null);
                                    }
                                  }}
                                  className="w-28 bg-slate-950 border border-[var(--glass-border)] text-white text-center font-bold text-xs rounded-lg p-1.5 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                                />
                              </td>
                              <td className="p-3 text-center">
                                <input
                                  type="text"
                                  value={editingCell?.kpiCode === kpi.code && editingCell?.field === "actual" ? editingCell.value : formatValue(kpi.actual, kpi.unit)}
                                  disabled={isReadOnly || reportStatus === "Chờ duyệt"}
                                  onFocus={() => setEditingCell({ kpiCode: kpi.code, field: "actual", value: kpi.actual.toString() })}
                                  onChange={(e) => setEditingCell({ kpiCode: kpi.code, field: "actual", value: e.target.value })}
                                  onBlur={() => {
                                    if (editingCell) {
                                      const val = parseFloat(editingCell.value) || 0;
                                      handleInputChange(kpi.code, val.toString());
                                      setEditingCell(null);
                                    }
                                  }}
                                  className="w-28 bg-slate-950 border border-[var(--glass-border)] text-white text-center font-bold text-xs rounded-lg p-1.5 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                                />
                              </td>
                              <td className="p-3 text-center font-black text-sm">
                                <span className={pct < 80 ? "text-rose-400" : pct < 100 ? "text-amber-400" : "text-emerald-400"}>
                                  {isNaN(pct) || !isFinite(pct) ? "0%" : `${pct}%`}
                                </span>
                              </td>
                              <td className="p-3 text-center w-[200px]">
                                <input
                                  type="text"
                                  value={explanations[kpi.code] || ""}
                                  placeholder="Ghi chú ngắn kết quả..."
                                  disabled={isReadOnly || reportStatus === "Chờ duyệt"}
                                  onChange={(e) => setExplanations(prev => ({ ...prev, [kpi.code]: e.target.value }))}
                                  className="w-full bg-slate-950 border border-[var(--glass-border)] text-white text-xs rounded-lg p-1.5 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                                />
                              </td>
                              <td className="p-3 text-center w-[120px]">
                                <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${getStatusStyle(kpi.status)}`}>
                                  {kpi.status}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleSaveRow(kpi.code)}
                                  disabled={isReadOnly || reportStatus === "Chờ duyệt"}
                                  className="bg-[#10b981] hover:bg-[#34d399] text-slate-950 text-[10px] font-black px-2.5 py-1.5 rounded-lg transition-all shadow-md uppercase"
                                >
                                  Lưu dòng
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* KHỐI 2: KHU VỰC GIẢI TRÌNH BẮT BUỘC KHI CHỈ SỐ GIẢM SÚT (HOÀN THÀNH < 70% HOẶC GIẢM KỲ TRƯỚC > 5%) */}
          <div className="glass-panel p-5 space-y-4">
            <div className={theme === "light" ? "bg-[#FEF2F2] border border-[#FEE2E2] p-3 rounded-xl" : ""}>
              <h3 className={`text-sm font-black tracking-wider uppercase flex items-center gap-2 ${
                theme === "light" ? "text-[#B91C1C]" : "text-rose-500"
              }`}>
                <AlertTriangle size={16} className={theme === "light" ? "text-[#B91C1C]" : "text-rose-500"} /> 🔴 KHU VỰC 2: GIẢI TRÌNH BẮT BUỘC KHI CHỈ SỐ GIẢM SÚT (HOÀN THÀNH &lt; 70% HOẶC GIẢM KỲ TRƯỚC &gt; 5%)
              </h3>
            </div>
            <div className="space-y-3">
              {kpis
                .filter(k => checkKpiNeedsExplanation(k))
                .map(k => {
                  const currentActual = k.actual;
                  const target = k.target;
                  const completionRate = currentActual / target;
                  const prevActual = prevKpis[k.code] || 0;
                  const drop = prevActual > 0 ? (prevActual - currentActual) / prevActual : 0;
                  
                  let reasonText = "";
                  if (completionRate < 0.7) {
                    reasonText = `Hoàn thành ${Math.round(completionRate * 100)}% (< 70% kế hoạch)`;
                  } else {
                    reasonText = `Đạt ${Math.round(completionRate * 100)}% (Giảm ${Math.round(drop * 100)}% so với kỳ trước)`;
                  }

                  return (
                    <div key={k.code} className={`p-4 rounded-xl space-y-2 transition-all ${
                      theme === "light" 
                        ? "bg-white border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.04)]" 
                        : "bg-slate-900/60 p-4 rounded-xl border border-rose-500/20"
                    }`}>
                      <div className="flex justify-between items-center">
                        <span className={`font-semibold text-sm ${theme === "light" ? "text-[#1A382B]" : "text-white"}`}>
                          {k.title}
                        </span>
                        <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md transition-all ${
                          theme === "light" 
                            ? "bg-[#FEE2E2] text-[#DC2626]" 
                            : "bg-rose-950 text-rose-300 border border-rose-500/30"
                        }`}>
                          {reasonText}
                        </span>
                      </div>
                      <textarea
                        value={explanations[k.code] || ""}
                        disabled={isReadOnly}
                        onChange={(e) => setExplanations(prev => ({ ...prev, [k.code]: e.target.value }))}
                        placeholder="Nhập chi tiết nguyên nhân khách quan/chủ quan và đề xuất hướng khắc phục cụ thể..."
                        rows={2}
                        className={`w-full rounded-xl p-2.5 text-xs resize-none transition-all focus:outline-none ${
                          theme === "light" 
                            ? "bg-white border border-[#E2E8F0] text-slate-800 placeholder-[#94A3B8] focus:border-[#00A651] focus:ring-2 focus:ring-[#00A651]/10" 
                            : "bg-slate-950 border border-white/10 text-white focus:border-rose-400"
                        }`}
                      />
                    </div>
                  );
                })}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveExplanations}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow transition-all ${
                    theme === "light" 
                      ? "bg-[#00A651] hover:bg-[#008A45] text-white" 
                      : "bg-rose-700 hover:bg-rose-600 text-white"
                  }`}
                >
                  <Save size={14} /> Lưu Giải Trình
                </button>
              </div>
            </div>
          </div>

          {/* KHỐI 4: GỢI Ý HÀNH ĐỘNG KỲ TIẾP THEO (AI-GENERATED ACTIONS) */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-black text-indigo-400 tracking-wider uppercase flex items-center gap-2">
                  ⚡ KHỐI 4: GỢI Ý HÀNH ĐỘNG KỲ TIẾP THEO (AI-GENERATED ACTIONS)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Đề xuất tự động từ AI Agent dựa trên bối cảnh dữ liệu. Hãy chọn các giải pháp phù hợp để chốt kế hoạch kỳ sau.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAiSuggestActions}
                  disabled={isAiGenerating}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white !text-white force-text-white text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ color: "#ffffff" }}
                >
                  {isAiGenerating ? "⌛ Đang đề xuất..." : "✨ AI Agent Đề xuất Action"}
                </button>
                <button
                  onClick={handleAddCustomAction}
                  disabled={isReadOnly}
                  className="bg-purple-800 hover:bg-purple-700 text-white !text-white force-text-white text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow transition-all"
                  style={{ color: "#ffffff" }}
                >
                  <Plus size={14} /> Thêm hành động chủ động
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-300 font-bold bg-slate-900/60">
                    <th className="p-3">Tên hành động khắc phục đề xuất</th>
                    <th className="p-3 w-36 text-center">Chỉ tiêu tác động</th>
                    <th className="p-3 w-48 text-center">Kỳ vọng giải quyết</th>
                    <th className="p-3 w-32 text-center">Trạng thái duyệt</th>
                    <th className="p-3 w-36 text-center">Tương tác</th>
                  </tr>
                </thead>
                <tbody>
                  {actions.map(act => (
                    <tr key={act.id} className="border-b border-white/5 hover:bg-white/5 text-xs text-slate-200">
                      <td className="p-3 font-semibold text-white">{act.title}</td>
                      <td className="p-3 text-center">
                        <code className="bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono text-[11px]">
                          {act.indicator}
                        </code>
                      </td>
                      <td className="p-3 text-center text-slate-300">{act.impact}</td>
                      <td className="p-3 text-center">
                        <span 
                          className="text-[10px] bg-amber-950 text-amber-300 force-text-amber font-bold px-2 py-1 rounded border border-amber-500/20"
                          style={{ color: "#fcd34d" }}
                        >
                          {act.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleAcceptAction(act.id)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white !text-white force-text-white text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 shadow"
                            style={{ color: "#ffffff" }}
                          >
                            ✓ Chọn
                          </button>
                          <button
                            onClick={() => handleSkipAction(act.id)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 !text-slate-300 force-text-slate text-[10px] font-black px-2.5 py-1.5 rounded-lg border border-white/10"
                            style={{ color: "#cbd5e1" }}
                          >
                            ✖ Bỏ qua
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* KHỐI 5: KHU VỰC TƯƠNG TÁC & PHÊ DUYỆT CỦA GIÁM ĐỐC BU SCVN */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex flex-wrap justify-between items-center gap-3 border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-amber-400 tracking-wider uppercase flex items-center gap-2">
                <Crown size={16} /> 👑 KHỐI 5: KHU VỰC TƯƠNG TÁC & PHÊ DUYỆT CỦA GIÁM ĐỐC BU SCVN
              </h3>

              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Trạng thái báo cáo:</span>
                  <span className="bg-amber-500/20 text-amber-400 font-black px-2.5 py-1 rounded border border-amber-500/30">
                    {reportStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-400">Vai trò giả lập:</span>
                  <select
                     value={simulatedRole}
                     onChange={(e) => setSimulatedRole(e.target.value as "TĐV" | "GĐBU")}
                     className="bg-slate-950 border border-white/20 text-white font-bold rounded-lg px-3 py-1 focus:outline-none focus:border-amber-400"
                  >
                    <option value="TĐV">Trưởng đơn vị (TĐV)</option>
                    <option value="GĐBU">Giám đốc BU (GĐBU)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Ô Ý KIẾN CHỈ ĐẠO CỦA GIÁM ĐỐC BU */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 block">
                Ý kiến chỉ đạo của Giám đốc BU (Dành riêng cho GĐBU):
              </label>
              <textarea
                value={directorComment}
                onChange={(e) => setDirectorComment(e.target.value)}
                disabled={simulatedRole !== "GĐBU"}
                placeholder="Nhập ý kiến chỉ đạo, nhận xét hoặc lý do yêu cầu hiệu chỉnh..."
                rows={3}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400 resize-none disabled:opacity-60"
              />
            </div>

            {/* NÚT THAO TÁC THEO VAI TRÒ */}
            <div className="flex justify-start items-center gap-3 pt-2">
              {simulatedRole === "TĐV" ? (
                <>
                  <button
                    onClick={handleSaveDraft}
                    className="bg-slate-800 hover:bg-slate-700 text-white !text-white force-text-white text-xs font-extrabold px-5 py-2.5 rounded-xl border border-white/10 shadow transition-all"
                    style={{ color: "#ffffff" }}
                  >
                    💾 Lưu nháp (Draft)
                  </button>
                  <button
                    onClick={handleSendReport}
                    disabled={reportStatus === "Chờ duyệt"}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white !text-white force-text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all disabled:opacity-50"
                    style={{ color: "#ffffff" }}
                  >
                    🚀 Gửi báo cáo cho Giám đốc BU
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleApproveReport}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
                  >
                    ✓ Phê duyệt (Approved)
                  </button>
                  <button
                    onClick={handleRejectReport}
                    className="bg-rose-600 hover:bg-rose-500 text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(244,63,94,0.4)] transition-all"
                  >
                    ✖ Yêu cầu hiệu chỉnh (Reject)
                  </button>
                </>
              )}
            </div>
          </div>
        </>
      )}

      {/* ==================== TAB 2: BÁO CÁO KẾT QUẢ THEO SẢN PHẨM ==================== */}
      {activeTab === "product" && (
        <div className="flex flex-col gap-6">

          {/* THANH CHỌN DÒNG SẢN PHẨM (LỌC THEO ĐƠN VỊ HIỆN TẠI) */}
          <div className="glass-panel p-4 flex flex-wrap items-center justify-between gap-4 border-l-4 border-l-purple-500">
            <div className="flex items-center gap-3">
              <Film size={20} className="text-purple-400" />
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  CHỌN DÒNG SẢN PHẨM THUỘC ĐƠN VỊ {filters.unitCode.toUpperCase()}
                </h3>
                <p className="text-[11px] text-slate-400">
                  Nhập báo cáo số liệu và tự động chấm điểm sức khỏe PHS riêng cho từng dòng sản phẩm
                </p>
              </div>
            </div>

            <select
              value={activeProductId}
              onChange={(e) => setSelectedProdId(e.target.value)}
              className="bg-slate-950 border border-purple-500/40 text-white font-bold text-xs rounded-xl px-4 py-2.5 focus:outline-none focus:border-purple-400 shadow-inner"
            >
              {currentUnitProducts.map(p => (
                <option key={p.id} value={p.id}>
                  🎬 {p.name} ({p.code})
                </option>
              ))}
            </select>
          </div>

          {/* KHỐI 1: BẢNG NHẬP LIỆU KPI CHỈ SỐ SẢN PHẨM (BỘ 7 MỤC TIÊU) */}
          <div className="glass-panel p-5">
            <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-sky-400 tracking-wider uppercase flex items-center gap-2">
                📋 KHỐI 1: BẢNG NHẬP LIỆU BỘ 7 MỤC TIÊU - SẢN PHẨM: {currentProduct?.name.toUpperCase()}
              </h3>
              <span className="text-xs font-mono bg-purple-950 text-purple-300 px-3 py-1 rounded-lg border border-purple-500/30">
                Mã SP: {currentProduct?.code}
              </span>
            </div>

            <div className="max-h-[600px] overflow-y-auto overflow-x-auto relative">
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950 shadow">
                  <tr className="border-b border-white/10 text-slate-300 font-black bg-slate-900 uppercase text-xs">
                    {showCodeColumn && <th className="p-3 w-28 text-center">Mã chỉ tiêu</th>}
                    <th className="p-3">Mục tiêu / Chỉ tiêu dòng sản phẩm</th>
                    <th className="p-3 w-16 text-center">ĐVT</th>
                    <th className="p-3 w-56">Cách tính</th>
                    <th className="p-3 w-32 text-center bg-sky-950/30 text-sky-300">KH Định Kỳ</th>
                    <th className="p-3 w-36 text-center bg-purple-950/30 text-purple-300">Kết quả Thực tế</th>
                    <th className="p-3 w-24 text-center">% Hoàn thành</th>
                    <th className="p-3 w-24 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {prodGroups.map(groupName => {
                    const items = visibleProductKpis.filter(k => k.group === groupName);
                    return (
                      <React.Fragment key={groupName}>
                        <tr className="bg-slate-900/50 text-sky-400 font-black border-b border-white/5 uppercase text-xs">
                          <td colSpan={showCodeColumn ? 8 : 7} className="p-2.5 tracking-wider">
                            {groupName}
                          </td>
                        </tr>
                        {items.map(pk => {
                          const pct = pk.target > 0 ? Math.round((pk.actual / pk.target) * 100) : 100;
                          const displayCode = selectedProdId ? pk.code.replace(selectedProdId + "-", "") : pk.code;
                          return (
                            <tr key={pk.code} className="border-b border-white/5 hover:bg-white/5 text-sm text-slate-200">
                              {showCodeColumn && (
                                <td className="p-3 text-center">
                                  <code className="bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono text-xs font-bold border border-sky-500/20">
                                    {displayCode}
                                  </code>
                                </td>
                              )}
                              <td className={`p-3 font-bold ${isImportantIndicator(pk.title) ? "text-[#10b981] dark:text-[#34d399]" : "text-white"}`}>{pk.title}</td>
                              <td className="p-3 text-center text-slate-400 font-bold text-xs">{pk.unit}</td>
                              <td className="p-3 italic text-slate-400 text-xs truncate max-w-[200px]" title={pk.formula}>
                                {pk.formula}
                              </td>
                              <td className="p-3 text-center">
                                <input
                                  type="text"
                                  value={editingCell?.kpiCode === pk.code && editingCell?.field === "target" ? editingCell.value : formatValue(pk.target, pk.unit)}
                                  disabled={isReadOnly || activeProductId === "all" || reportStatus === "Chờ duyệt"}
                                  onFocus={() => setEditingCell({ kpiCode: pk.code, field: "target", value: pk.target.toString() })}
                                  onChange={(e) => setEditingCell({ kpiCode: pk.code, field: "target", value: e.target.value })}
                                  onBlur={() => {
                                    if (editingCell) {
                                      const val = parseFloat(editingCell.value) || 0;
                                      handleProdTargetChange(pk.code, val);
                                      setEditingCell(null);
                                    }
                                  }}
                                  className="w-28 bg-slate-950 border border-purple-500/40 text-white text-center font-bold text-xs rounded-lg p-1.5 focus:outline-none focus:border-purple-400 disabled:opacity-60"
                                />
                              </td>
                              <td className="p-3 text-center">
                                <input
                                  type="text"
                                  value={editingCell?.kpiCode === pk.code && editingCell?.field === "actual" ? editingCell.value : formatValue(pk.actual, pk.unit)}
                                  disabled={isReadOnly || activeProductId === "all" || reportStatus === "Chờ duyệt"}
                                  onFocus={() => setEditingCell({ kpiCode: pk.code, field: "actual", value: pk.actual.toString() })}
                                  onChange={(e) => setEditingCell({ kpiCode: pk.code, field: "actual", value: e.target.value })}
                                  onBlur={() => {
                                    if (editingCell) {
                                      const val = parseFloat(editingCell.value) || 0;
                                      handleProdInputChange(pk.code, val);
                                      setEditingCell(null);
                                    }
                                  }}
                                  className="w-28 bg-slate-950 border border-purple-500/40 text-white text-center font-bold text-xs rounded-lg p-1.5 focus:outline-none focus:border-purple-400 disabled:opacity-60"
                                />
                              </td>
                              <td className="p-3 text-center font-black text-sm">
                                <span className={pct < 80 ? "text-rose-400" : pct < 100 ? "text-amber-400" : "text-emerald-400"}>
                                  {isNaN(pct) || !isFinite(pct) ? "0%" : `${pct}%`}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleSaveProdRow(pk.code)}
                                  disabled={isReadOnly || activeProductId === "all" || reportStatus === "Chờ duyệt"}
                                  className="bg-purple-700 hover:bg-purple-600 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg transition-all shadow-md uppercase"
                                >
                                  Lưu dòng
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* KHỐI 2 & 3: BẢNG ĐÁNH GIÁ CHẤM ĐIỂM SỨC KHỎE SẢN PHẨM (ĐIỂM PSH - CHUẨN SCONNECT) */}
          <div className="glass-panel p-6 space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 border-b border-white/10 pb-4">
              <h3 className="text-base font-black text-purple-400 tracking-wide uppercase flex items-center gap-2">
                <Award size={18} /> KHỐI 2 & 3: BẢNG ĐÁNH GIÁ & CHẤM ĐIỂM SỨC KHỎE PSH (PRODUCT HEALTH SCORE)
              </h3>
              <span className="text-xs text-slate-400 italic">
                Chuẩn Quy chế Sconnect • {isWeekly ? "Báo cáo Vận hành Tuần" : "Báo cáo 7M Chính thức"}
              </span>
            </div>

            {/* HIỂN THỊ THẺ ĐIỂM PSH SẢN PHẨM HẠNG TUẦN HOẶC CHÍNH THỨC */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              
              {/* Card 1: Tổng Điểm PSH & Trạng thái */}
              <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-purple-500 bg-slate-900/80">
                <div>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-1">
                    {isWeekly ? "ĐIỂM PSH VẬN HÀNH TUẦN NÀY" : "ĐIỂM PSH 7M CHÍNH THỨC"}
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-white">
                      {isWeekly ? weeklyPHSInfo.phsWeekly : officialPHSInfo.phs}
                    </span>
                    <span className="text-sm text-slate-400 font-bold">/ 100 điểm</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10">
                  <span className={`inline-block px-3 py-1.5 rounded-lg text-xs font-black border ${isWeekly ? weeklyPHSInfo.riskColor : officialPHSInfo.badgeColor}`}>
                    {isWeekly ? weeklyPHSInfo.riskTag : officialPHSInfo.status}
                  </span>
                </div>
              </div>

              {/* Card 2: AI Dự Phóng Cuối Tháng */}
              {isWeekly ? (
                <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-indigo-500 bg-indigo-950/30 light-indigo-card">
                  <div>
                    <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider flex items-center gap-1.5 mb-1 psh-card-title">
                      <Sparkles size={14} /> 🔮 AI DỰ PHÓNG PSH CUỐI THÁNG (RUN-RATE)
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-black text-indigo-600 psh-big-score">
                        {weeklyPHSInfo.projectedMonthlyPHS}đ
                      </span>
                      <span className="text-xs text-indigo-500 font-bold psh-subtext">Dự báo ngày 30/31</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px] pt-3 text-slate-700 psh-list-border border-t border-indigo-500/20">
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-bold psh-list-item">• Nhịp chạy Doanh thu tuần:</span>
                      <strong className="text-indigo-900 font-black psh-list-val">{weeklyPHSInfo.rRev}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-bold psh-list-item">• Nhịp chạy Sản lượng video:</span>
                      <strong className="text-indigo-900 font-black psh-list-val">{weeklyPHSInfo.rVol}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 font-bold psh-list-item">• Nhịp chạy Traffic Views:</span>
                      <strong className="text-indigo-900 font-black psh-list-val">{weeklyPHSInfo.rView}%</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-sky-500 bg-sky-950/20">
                  <span className="text-[10px] font-black text-sky-300 uppercase tracking-wider block mb-2">
                    PHÂN RÃ 5 CHỈ SỐ THÀNH PHẦN (7M)
                  </span>
                  <div className="space-y-1.5 text-xs text-slate-200">
                    <div className="flex justify-between"><span>💰 Tài chính (FHI - 40%):</span><strong className="text-sky-300">{officialPHSInfo.fhi}đ</strong></div>
                    <div className="flex justify-between"><span>🎬 Vận hành (OHI - 30%):</span><strong className="text-purple-300">{officialPHSInfo.ohi}đ</strong></div>
                    <div className="flex justify-between"><span>📊 Chất lượng (QCI - 20%):</span><strong className="text-emerald-300">{officialPHSInfo.qci}đ</strong></div>
                    <div className="flex justify-between"><span>👥 Nguồn lực (RHI - 5%):</span><strong className="text-amber-300">{officialPHSInfo.rhi}đ</strong></div>
                    <div className="flex justify-between"><span>⚖️ Tuân thủ (CHI - 5%):</span><strong className="text-rose-300">{officialPHSInfo.chi}đ</strong></div>
                  </div>
                </div>
              )}

              {/* Card 3: Bảng So sánh Thứ hạng PSH Sản phẩm Nội bộ Đơn vị */}
              <div className="glass-panel p-4 flex flex-col justify-between bg-slate-900/80">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider block mb-2">
                  🏆 XẾP HẠNG PSH SẢN PHẨM NỘI BỘ ({filters.unitCode})
                </span>
                
                {filters.unitCode === "SCVN" || filters.unitCode === "TCT" ? (
                  <div className="space-y-4 text-xs">
                    {/* TOP 5 CAO ĐIỂM NHẤT */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold text-emerald-500 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        🟢 TOP 5 CAO ĐIỂM NHẤT
                      </div>
                      {unitProductRankings.slice(0, 5).map((p, idx) => (
                        <div
                          key={p.id}
                          className={`p-2 rounded-lg flex justify-between items-center border transition-all ${
                            p.id === activeProductId 
                              ? "bg-purple-100 dark:bg-purple-950/50 border-purple-500/50 font-bold text-purple-900 dark:text-purple-200" 
                              : "bg-emerald-50/70 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-900/20 text-emerald-800 dark:text-emerald-300"
                          }`}
                        >
                          <span className="truncate max-w-[170px] font-medium">
                            #{idx + 1} {p.name}
                          </span>
                          <span className="text-[10px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-extrabold px-2 py-0.5 rounded border border-emerald-400/20">
                            {p.score} điểm
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* TOP 5 THẤP ĐIỂM NHẤT */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1">
                        🔴 TOP 5 THẤP ĐIỂM NHẤT
                      </div>
                      {unitProductRankings.slice(-5).map((p, idx) => {
                        const rankNum = unitProductRankings.length - 5 + idx + 1;
                        return (
                          <div
                            key={p.id}
                            className={`p-2 rounded-lg flex justify-between items-center border transition-all ${
                              p.id === activeProductId 
                                ? "bg-purple-100 dark:bg-purple-950/50 border-purple-500/50 font-bold text-purple-900 dark:text-purple-200" 
                                : "bg-rose-50/70 dark:bg-rose-950/20 border-rose-200/50 dark:border-rose-900/20 text-rose-800 dark:text-rose-300"
                            }`}
                          >
                            <span className="truncate max-w-[170px] font-medium">
                              #{rankNum} {p.name}
                            </span>
                            <span className="text-[10px] bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 font-extrabold px-2 py-0.5 rounded border border-rose-400/20">
                              {p.score} điểm
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-xs max-h-[350px] overflow-y-auto pr-1">
                    {unitProductRankings.map((p, idx) => (
                      <div
                        key={p.id}
                        className={`p-2 rounded-lg flex justify-between items-center border transition-all ${
                          p.id === activeProductId 
                            ? "bg-purple-100 dark:bg-purple-950/50 border-purple-500/50 font-bold text-purple-900 dark:text-purple-200" 
                            : "bg-slate-100 dark:bg-slate-900/60 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300"
                        }`}
                      >
                        <span className="truncate max-w-[170px] font-medium">
                          #{idx + 1} {p.name}
                        </span>
                        <span className="text-[10px] bg-slate-200 dark:bg-slate-950 text-slate-700 dark:text-slate-400 font-extrabold px-2 py-0.5 rounded border border-slate-300 dark:border-white/10">
                          {p.score} điểm
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Ô Ghi chú Nhận định Ngắn 1 dòng */}
            <div className="pt-2">
              <label className="text-xs font-bold text-slate-300 block mb-1">
                📝 Ghi chú nhận định ngắn của Trưởng đơn vị về sản phẩm {currentProduct?.name}:
              </label>
              <input
                type="text"
                value={productNote}
                disabled={activeProductId === "all" || isReadOnly}
                onChange={(e) => setProductNote(e.target.value)}
                placeholder={activeProductId === "all" ? "Vui lòng chọn từng sản phẩm cụ thể để điền nhận định." : "Nhập nhận định nhanh (Ví dụ: Sản phẩm giữ vững tốc độ sản xuất, doanh thu tăng trưởng đúng lộ trình)..."}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-400 disabled:opacity-50"
              />
            </div>
          </div>

          {/* KHỐI 4 & 5: ACTIONS VÀ DUYỆT BÁO CÁO SẢN PHẨM */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-indigo-400 tracking-wider uppercase flex items-center gap-2">
                ⚡ KHỐI 4: ĐỀ XUẤT HÀNH ĐỘNG CẢI TIẾN PSH SẢN PHẨM
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleProdAiSuggestActions}
                  disabled={isProdAiGenerating || activeProductId === "all"}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white !text-white force-text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ color: "#ffffff" }}
                >
                  {isProdAiGenerating ? "⌛ Đang đề xuất..." : "✨ AI Agent Đề xuất Action"}
                </button>
                <button
                  onClick={handleAddCustomProdAction}
                  disabled={isReadOnly || activeProductId === "all"}
                  className="bg-purple-800 hover:bg-purple-700 text-white !text-white force-text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ color: "#ffffff" }}
                >
                  <Plus size={14} /> Thêm Action Sản Phẩm
                </button>
              </div>
            </div>

            <div className="space-y-2">
              {productActions.map(act => (
                <div key={act.id} className="bg-slate-900/60 p-3 rounded-xl border border-white/5 flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-white">{act.title}</h4>
                    <p className="text-[11px] text-slate-400">Kỳ vọng: {act.impact}</p>
                  </div>
                  <span 
                    className="text-[10px] bg-purple-950 text-purple-300 force-text-purple font-bold px-2.5 py-1 rounded border border-purple-500/30"
                    style={{ color: "#d8b4fe" }}
                  >
                    {act.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs text-slate-400 italic">
                {activeProductId === "all" ? "Vui lòng chọn từng sản phẩm cụ thể để gửi báo cáo Điểm PSH trình Giám đốc BU" : `Sau khi kiểm tra Điểm PSH sản phẩm, bấm Gửi báo cáo sản phẩm để trình Giám đốc BU`}
              </span>
              <button
                disabled={activeProductId === "all"}
                onClick={() => alert(`🚀 Đã gửi thành công Báo cáo Điểm PSH cho sản phẩm: ${currentProduct?.name}`)}
                className={`text-white !text-white force-text-white text-xs font-black px-6 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] disabled:opacity-40 disabled:cursor-not-allowed ${
                  activeProductId === "all"
                    ? "bg-slate-800 border border-slate-700 text-slate-500 shadow-none"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
                }`}
                style={{ color: "#ffffff" }}
              >
                🚀 Gửi Báo Cáo Sản Phẩm Phê Duyệt
              </button>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
