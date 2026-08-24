"use client";

import React, { useState, useEffect, useRef } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import { getFriendlyIndicatorTitle } from "@/lib/kpiMasterData";
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
  Crown,
  Target,
  Loader2,
  Eye,
  EyeOff,
  Lock
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
  id: string;
  code: string;
  title: string;
  unit: string;
  formula: string;
  target: number;
  actual: number;
  weight?: number;
  status: string;
  pic: string;
  group: string;
  frequency?: string;
  parentCode?: string;
  explanation?: string;
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
  id: string;
  code: string;
  title: string;
  unit: string;
  formula: string;
  target: number;
  actual: number;
  group: string;
  frequency?: string;
  parentCode?: string;
  explanation?: string;
}

const MANDATORY_PRODUCT_KPIS: Record<string, string[]> = {
  "M2": [
    "Số lượng video hoàn thành sản xuất",
    "Số lượng video upload",
    "SL video đạt ngưỡng 1 triệu views (youtube)",
    "SL video đạt ngưỡng 1 triệu views"
  ],
  "M3": [
    "Tổng traffic (nội dung long)",
    "Tỉ lệ chuyển đổi (CTR)- 24h",
    "Tỉ lệ chuyển đổi (CTR)",
    "Tỉ lệ giữ chân khách hàng (APV)- 24h",
    "Tỉ lệ giữ chân khách hàng (APV)"
  ],
  "M4": [
    "Số kênh đạt ngưỡng 10k $/ tháng",
    "Số kênh đạt ngưỡng 10k $",
    "Số vi phạm chính sách",
    "Tổng số kênh kinh doanh",
    "Số kênh BKT"
  ]
};

const getObjectiveGroupCode = (groupName: string): string => {
  if (!groupName) return "";
  const match = groupName.match(/M([1-7])/i);
  if (match) return `M${match[1]}`;
  if (groupName.includes("M1")) return "M1";
  if (groupName.includes("M2")) return "M2";
  if (groupName.includes("M3")) return "M3";
  if (groupName.includes("M4")) return "M4";
  if (groupName.includes("M5")) return "M5";
  if (groupName.includes("M6")) return "M6";
  if (groupName.includes("M7")) return "M7";
  return "";
};

const getNormalizedGroupTitle = (groupName: string): string => {
  const code = getObjectiveGroupCode(groupName);
  switch (code) {
    case "M1": return "M1. TÀI CHÍNH";
    case "M2": return "M2. SẢN PHẨM";
    case "M3": return "M3. KHÁCH HÀNG";
    case "M4": return "M4. THƯƠNG HIỆU & KÊNH";
    case "M5": return "M5. QUẢN TRỊ VẬN HÀNH";
    case "M6": return "M6. NHÂN SỰ";
    case "M7": return "M7. VĂN HÓA";
    default: return groupName;
  }
};

const isMandatoryIndicator = (groupCode: string, title: string): boolean => {
  const list = MANDATORY_PRODUCT_KPIS[groupCode];
  if (!list) return false;
  const lowerTitle = title.trim().toLowerCase();
  return list.some(m => lowerTitle.includes(m.toLowerCase()) || m.toLowerCase().includes(lowerTitle));
};

const isMandatoryUnitIndicator = (unitCode: string, groupCode: string, title: string): boolean => {
  const t = (title || "").trim().toLowerCase();
  const u = (unitCode || "").trim().toUpperCase();

  if (groupCode === "M2") {
    if (t.includes("video hoàn thành sản xuất")) return true;
    if (t.includes("số lượng video upload")) return true;
    if (t.includes("1 triệu views")) return true;
    if ((u.includes("MUSIC") || u.includes("SCMU")) && t.includes("sản lượng bp music")) return true;
    if (u.includes("SCS") && t.includes("sản lượng bp studio")) return true;
    if ((u.includes("CR") || u.includes("CREATIVE")) && t.includes("sản lượng bp creative hub")) return true;
    if (u.includes("NDTH") && t.includes("video hoàn thành biên tập")) return true;
  }

  if (groupCode === "M3") {
    if (t.includes("tổng traffic") || t.includes("traffic (nội dung long)") || t.includes("traffic")) return true;
    if ((u.includes("MUSIC") || u.includes("SCMU")) && t.includes("traffic bp music")) return true;
    if (u.includes("SCS") && t.includes("traffic bp studio")) return true;
    if (u.includes("DA01") && t.includes("view youtube da01")) return true;
    if ((u.includes("CR") || u.includes("CREATIVE")) && t.includes("view youtube scch")) return true;
  }

  return false;
};

const isImportantIndicator = (title: string): boolean => {
  if (!title) return false;
  const t = title.trim().toLowerCase();
  return (
    t.includes("tổng doanh thu") ||
    t.includes("doanh thu kênh") ||
    t.includes("video hoàn thành sản xuất") ||
    t.includes("số lượng video hoàn thành") ||
    t.includes("tổng traffic (nội dung long)") ||
    t.includes("tổng traffic")
  );
};

const isTitleOnlyRow = (title: string): boolean => {
  const t = title.trim();
  return (
    t === "Tăng trưởng doanh thu" ||
    t === "Đảm bảo số lượng nội dung số sản xuất" ||
    t === "Gia tăng số lượng khách hàng nền tảng"
  );
};

export default function InputFormPage() {
  const { filters, currentLoggedUser, setCurrentLoggedUser, theme } = useApp();

  // Toast Notification state
  const [toast, setToast] = useState<{ message: string, type: "success" | "error" } | null>(null);
  const toastTimerRef = useRef<any>(null);
  const showToast = (message: string, type: "success" | "error" = "success") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, type });
    // Tự động tắt sau 3 giây
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 3000);
  };

  // Tab State: "unit" vs "product" vs "radar"
  const [activeTab, setActiveTab] = useState<"unit" | "product" | "radar">("unit");

  // Dòng sản phẩm đang chọn trong Tab 2
  const [selectedProdId, setSelectedProdId] = useState<string>("");

  // Giả lập vai trò xem (Trưởng đơn vị vs Giám đốc BU)
  const [simulatedRole, setSimulatedRole] = useState<"TĐV" | "GĐBU">("TĐV");

  // Dynamic products list fetched from database API
  const [productsList, setProductsList] = useState<ProductLine[]>(PRODUCTS_CATALOG.map(p => ({ id: p.id, name: p.name, code: p.id, unitCode: p.unit })));
  const [kpis, setKpis] = useState<KpiItem[]>([]);
  const [productKpis, setProductKpis] = useState<ProductKpiItem[]>([]);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(true);

  // Synchronize state with refs to resolve React state race conditions during handleSaveRow
  const kpisRef = useRef<KpiItem[]>([]);
  const productKpisRef = useRef<ProductKpiItem[]>([]);
  const [productsRankings, setProductsRankings] = useState<{ id: string, name: string, score: number }[]>([]);

  const [productNote, setProductNote] = useState("");
  const [showCodeColumn, setShowCodeColumn] = useState(false);
  const [editingCell, setEditingCell] = useState<{ kpiId: string, field: "target" | "actual" | "weight", value: string } | null>(null);
  const [expandedParents, setExpandedParents] = useState<Record<string, boolean>>({});

  const [reportNotes, setReportNotes] = useState("");
  const [reportStatus, setReportStatus] = useState("Đang nhập");
  const [explanations, setExplanations] = useState<Record<string, string>>({});
  
  const [actions, setActions] = useState<ActionItem[]>([
    { id: 1, title: "Chuẩn hóa thư viện asset dùng chung để đẩy nhanh tốc độ diễn hoạt", indicator: "VM2-I01.01", impact: "Tăng sản lượng thêm 2 tập/tuần", status: "Chờ quyết định" }
  ]);

  const [productActions, setProductActions] = useState<ActionItem[]>([
    { id: 101, title: "Áp dụng công cụ AI sinh phông nền tự động cho Wolfoo 2D", indicator: "SP-M2-01", impact: "Tăng 20% tốc độ sản xuất", status: "Chờ quyết định" }
  ]);

  // Custom and Hidden Product KPIs state per selected product
  const [customProductKpis, setCustomProductKpis] = useState<Record<string, ProductKpiItem[]>>({});
  const [hiddenProductKpis, setHiddenProductKpis] = useState<Record<string, string[]>>({});
  const [showHiddenGroupRows, setShowHiddenGroupRows] = useState<Record<string, boolean>>({});

  // Custom and Hidden Unit KPIs state per unit
  const [customUnitKpis, setCustomUnitKpis] = useState<Record<string, KpiItem[]>>({});
  const [hiddenUnitKpis, setHiddenUnitKpis] = useState<Record<string, string[]>>({});
  const [showHiddenUnitGroupRows, setShowHiddenUnitGroupRows] = useState<Record<string, boolean>>({});

  const handleToggleHideUnitKpi = (code: string, isMandatory: boolean) => {
    if (isMandatory) {
      showToast("🔒 Chỉ tiêu then chốt cố định của đơn vị, không thể ẩn!", "error");
      return;
    }
    const uKey = filters.unitCode || "SCVN";
    setHiddenUnitKpis(prev => {
      const currentList = prev[uKey] || [];
      const isHidden = currentList.includes(code);
      const updated = isHidden ? currentList.filter(c => c !== code) : [...currentList, code];
      return { ...prev, [uKey]: updated };
    });
  };

  const handleCreateCustomUnitKpi = async (groupCode: "M2" | "M3") => {
    if (!newKpiTitle.trim()) {
      showToast("⚠️ Vui lòng nhập tên chỉ tiêu", "error");
      return;
    }

    const uKey = filters.unitCode || "SCVN";
    const generatedCode = generateCustomIndicatorCode(groupCode, uKey, newKpiParentCode);
    let groupName = "M2. SẢN PHẨM / SẢN XUẤT";
    if (groupCode === "M3") groupName = "M3. KHÁCH HÀNG / DỊCH VỤ";

    const newKpiItem: KpiItem = {
      id: `${uKey}-${generatedCode}-${Date.now()}`,
      code: generatedCode,
      title: newKpiTitle.trim(),
      unit: newKpiUnit.trim() || "Đơn vị",
      formula: newKpiFormula.trim() || "Theo dõi thực tế",
      target: 0,
      actual: 0,
      weight: 0,
      status: "Đang thực hiện",
      pic: currentLoggedUser?.fullname || "Trưởng đơn vị",
      group: groupName,
      frequency: "weekly",
      parentCode: newKpiParentCode !== "NONE" ? newKpiParentCode : undefined
    };

    setKpis(prev => [...prev, newKpiItem]);
    kpisRef.current = [...kpisRef.current, newKpiItem];

    setCustomUnitKpis(prev => ({
      ...prev,
      [uKey]: [...(prev[uKey] || []), newKpiItem]
    }));

    setNewKpiTitle("");
    setNewKpiFormula("");
    setNewKpiParentCode("NONE");
    setShowAddModalGroup(null);
    showToast(`✨ Đã tạo thành công chỉ tiêu đơn vị [${generatedCode}] - ${newKpiItem.title}!`);

    await saveKpisToDatabase([newKpiItem]);
  };

  const handleDeleteCustomUnitKpi = (kpiId: string, code: string) => {
    const uKey = filters.unitCode || "SCVN";
    setKpis(prev => prev.filter(k => k.id !== kpiId && k.code !== code));
    kpisRef.current = kpisRef.current.filter(k => k.id !== kpiId && k.code !== code);
    setCustomUnitKpis(prev => ({
      ...prev,
      [uKey]: (prev[uKey] || []).filter(k => k.id !== kpiId && k.code !== code)
    }));
    showToast(`🗑️ Đã xóa chỉ tiêu đơn vị [${code}]`);
  };

  // Modal for Adding Custom Product KPI
  const [showAddModalGroup, setShowAddModalGroup] = useState<"M2" | "M3" | "M4" | null>(null);
  const [newKpiTitle, setNewKpiTitle] = useState("");
  const [newKpiUnit, setNewKpiUnit] = useState("Video");
  const [newKpiFormula, setNewKpiFormula] = useState("");
  const [newKpiParentCode, setNewKpiParentCode] = useState<string>("NONE");

  const generateCustomIndicatorCode = (groupCode: string, productId: string, parentCode?: string) => {
    let prodAlias = (productId || "PROD").toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (prodAlias.length > 5) prodAlias = prodAlias.substring(0, 5);
    if (!prodAlias) prodAlias = "PROD";

    const prodKey = productId || "all";
    const existingCustom = (customProductKpis[prodKey] || []).filter(k => k.group.includes(groupCode));
    const seq = (existingCustom.length + 1).toString().padStart(2, "0");

    if (parentCode && parentCode !== "NONE") {
      let cleanParent = parentCode;
      if (selectedProdId && cleanParent.startsWith(selectedProdId + "-")) {
        cleanParent = cleanParent.substring(selectedProdId.length + 1);
      }
      return `${cleanParent}-C${seq}`;
    }

    const groupPrefix = `V${groupCode}`;
    return `${groupPrefix}-${prodAlias}-C${seq}`;
  };

  const handleToggleHideProductKpi = (code: string, isMandatory: boolean) => {
    if (isMandatory) {
      showToast("🔒 Chỉ tiêu then chốt cố định, không thể ẩn!", "error");
      return;
    }
    const prodKey = selectedProdId || "all";
    setHiddenProductKpis(prev => {
      const currentList = prev[prodKey] || [];
      const isHidden = currentList.includes(code);
      const updated = isHidden ? currentList.filter(c => c !== code) : [...currentList, code];
      return { ...prev, [prodKey]: updated };
    });
  };

  const handleCreateCustomProductKpi = (groupCode: "M2" | "M3" | "M4") => {
    if (!newKpiTitle.trim()) {
      showToast("⚠️ Vui lòng nhập tên chỉ tiêu", "error");
      return;
    }

    const prodKey = selectedProdId || "all";
    const generatedCode = generateCustomIndicatorCode(groupCode, prodKey, newKpiParentCode);
    let groupName = "M2. SẢN PHẨM";
    if (groupCode === "M3") groupName = "M3. KHÁCH HÀNG";
    if (groupCode === "M4") groupName = "M4. THƯƠNG HIỆU & KÊNH";

    const newKpiItem: ProductKpiItem = {
      id: `${prodKey}-${generatedCode}-${Date.now()}`,
      code: generatedCode,
      title: newKpiTitle.trim(),
      unit: newKpiUnit.trim() || "Đơn vị",
      formula: newKpiFormula.trim() || "Theo dõi thực tế",
      target: 0,
      actual: 0,
      group: groupName,
      frequency: "weekly",
      parentCode: newKpiParentCode !== "NONE" ? newKpiParentCode : undefined
    };

    setProductKpis(prev => [...prev, newKpiItem]);
    productKpisRef.current = [...productKpisRef.current, newKpiItem];

    setCustomProductKpis(prev => ({
      ...prev,
      [prodKey]: [...(prev[prodKey] || []), newKpiItem]
    }));

    setNewKpiTitle("");
    setNewKpiFormula("");
    setNewKpiParentCode("NONE");
    setShowAddModalGroup(null);
    showToast(`✨ Đã tạo thành công chỉ tiêu [${generatedCode}] - ${newKpiItem.title}!`);

    // Đồng bộ ngay lập tức sang CSDL và file JSON dự phòng
    saveProductKpisToDatabase([newKpiItem]);
  };

  const handleDeleteCustomProductKpi = (kpiId: string, code: string) => {
    const prodKey = selectedProdId || "all";
    setProductKpis(prev => prev.filter(k => k.id !== kpiId && k.code !== code));
    productKpisRef.current = productKpisRef.current.filter(k => k.id !== kpiId && k.code !== code);

    setCustomProductKpis(prev => ({
      ...prev,
      [prodKey]: (prev[prodKey] || []).filter(k => k.id !== kpiId && k.code !== code)
    }));
    showToast("🗑️ Đã gỡ bỏ chỉ tiêu tùy chỉnh!");
  };

  const [directorComment, setDirectorComment] = useState("");
  const [quickReportText, setQuickReportText] = useState("");
  const [isGeneratingQuickReport, setIsGeneratingQuickReport] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isProdAiGenerating, setIsProdAiGenerating] = useState(false);
  const isReadOnly = currentLoggedUser?.role === "Người dùng";
  const isAdminOrLeader = currentLoggedUser?.role === "Admin" || currentLoggedUser?.role === "GĐBU" || currentLoggedUser?.role === "Trưởng đơn vị";
  const isInputDisabled = !isAdminOrLeader && (isReadOnly || reportStatus === "Chờ duyệt");

  const handleGenerateQuickReport = () => {
    setIsGeneratingQuickReport(true);
    const revItem = kpis.find(k => k.code === "VM1-I02.01" || k.code.startsWith("MM1-I02.01") || k.code.startsWith("SM1-I02.01") || k.code.startsWith("DM1-I02.01") || k.code.startsWith("NM1-I02.01") || k.code.startsWith("CM1-I02.01"));
    const volItem = kpis.find(k => k.code === "VM2-I01.01" || k.code.startsWith("MM2-I01.01") || k.code.startsWith("SM2-I01.01") || k.code.startsWith("DM2-I01.01") || k.code.startsWith("NM2-I01.01") || k.code.startsWith("CM2-I01.01"));
    const trafficItem = kpis.find(k => k.code === "VM3-I01.02" || k.code.startsWith("MM3-I01.01") || k.code.startsWith("SM3-I01.04") || k.code.startsWith("DM3-I01.03") || k.code.startsWith("NM3-I01.05") || k.code.startsWith("CM3-I01.01"));

    const revPct = revItem && revItem.target > 0 ? Math.round((revItem.actual / revItem.target) * 100) : 0;
    const volPct = volItem && volItem.target > 0 ? Math.round((volItem.actual / volItem.target) * 100) : 0;
    const trafficPct = trafficItem && trafficItem.target > 0 ? Math.round((trafficItem.actual / trafficItem.target) * 100) : 0;

    const lowItems = kpis.filter(k => k.target > 0 && (k.actual / k.target) < 0.5 && !isRootCategoryCode(k.code) && !isHeaderOnlyRow(k.code));

    setTimeout(() => {
      let report = `📌 BÁO CÁO NHANH KẾT QUẢ KỲ BÁO CÁO - ĐƠN VỊ ${filters.unitCode.toUpperCase()}\n`;
      report += `• Doanh thu: đạt ${revPct}% kế hoạch.\n`;
      report += `• Sản lượng sản xuất: đạt ${volPct}% kế hoạch.\n`;
      report += `• Traffic/Views: đạt ${trafficPct}% kế hoạch.\n`;
      if (lowItems.length > 0) {
        report += `⚠️ Cảnh báo: Có ${lowItems.length} chỉ tiêu đạt dưới 50% kế hoạch (${lowItems.slice(0, 2).map(i => i.title).join(", ")}). Đơn vị đang tập trung xử lý khắc phục.`;
      } else {
        report += `🟢 Nhận định chung: Tất cả các chỉ tiêu chính đều duy trì tiến độ hoàn thành tốt.`;
      }
      setQuickReportText(report);
      setIsGeneratingQuickReport(false);
      showToast("✨ AI Agent đã tự động tổng hợp xong Báo cáo nhanh cho Giám đốc BU!");
    }, 400);
  };

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
  const [radarPoints, setRadarPoints] = useState<any[]>([]);
  const [radarLoading, setRadarLoading] = useState<boolean>(false);

  // Fetch radar scores
  useEffect(() => {
    if (!["SCVN", "TCT", "SCME"].includes(filters.unitCode)) return;
    
    setRadarLoading(true);
    const pType = filters.periodType || "weekly";
    const m = filters.month || "7";
    const q = (filters.quarter || "Q3").replace("Q", "");
    const y = filters.year || "2026";
    
    fetch(`/api/kpi/radar-scores?unitCode=${filters.unitCode}&periodType=${pType}&month=${m}&quarter=${q}&year=${y}`)
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data.points)) {
          setRadarPoints(data.points);
        } else {
          setRadarPoints([]);
        }
      })
      .catch(err => console.error("Lỗi tải điểm radar:", err))
      .finally(() => setRadarLoading(false));
  }, [filters.unitCode, filters.periodType, filters.month, filters.quarter, filters.year, activeTab]);

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

  const isChildUnitIndicator = (k: KpiItem) => {
    if (!k || !k.code) return false;
    const code = k.code.trim();
    if (/-(WF|AS|Lego|NDTH|DA01|SCS|SCMU|CNGP|CR)$/i.test(code)) return true;
    if (k.parentCode && !isRootCategoryCode(k.parentCode) && !isHeaderOnlyRow(k.parentCode)) {
      return true;
    }
    return false;
  };

  const checkKpiNeedsExplanation = (k: KpiItem) => {
    if (!k || !k.code) return false;
    if (k.target <= 0) return false;

    // Rule A: Exclude root categories (M1-M7) and section headers
    if (isRootCategoryCode(k.code) || isHeaderOnlyRow(k.code)) return false;

    // Rule B: For SCVN, exclude child unit indicators (only require explanation for parent indicators!)
    if (filters.unitCode === "SCVN" && isChildUnitIndicator(k)) return false;

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

  // 1 & 2. Fetch unit-level & previous period KPI data in parallel
  useEffect(() => {
    let isMounted = true;
    setIsTableLoading(true);

    const pKey = getPeriodKey();
    const prevKey = getPrevPeriodKey();
    const pType = filters.periodType || "weekly";

    const currUrl = `/api/kpi?unitCode=${filters.unitCode}&periodKey=${pKey}&periodType=${pType}`;
    const prevUrl = `/api/kpi?unitCode=${filters.unitCode}&periodKey=${prevKey}&periodType=${pType}`;

    Promise.all([
      fetch(currUrl).then(res => res.json()).catch(() => []),
      fetch(prevUrl).then(res => res.json()).catch(() => [])
    ]).then(([currData, prevData]) => {
      if (!isMounted) return;

      if (Array.isArray(prevData)) {
        const dict: Record<string, number> = {};
        prevData.forEach((d: any) => {
          dict[d.indicatorCode] = d.actualValue || 0;
        });
        setPrevKpis(dict);
      }

      if (Array.isArray(currData) && currData.length > 0) {
        const EXCLUDED_KPI_CODES = new Set([
          "MM1-I02.01.01-CNGP", "VM1-I02.02-DA01", "VM1-I02.02-PD",
          ...(filters.unitCode === "SCVN" ? [
            "CM1-I02.01", "DM1-I02.01",
            "CM7-I03.01", "DM7-I03.01", "MM7-I03.01", "NM7-I03.01", "SM7-I03.01",
            "CM7-I03.02", "DM7-I03.02", "MM7-I03.02", "NM7-I03.02", "SM7-I03.02",
            "DM4-I02.01", "DM4-I02.02", "DM4-I02.04", "NM4-I02.04", "SM4-I02.06", "SM4-I02.06-SCMU",
            "VM4-I02.05-CR"
          ] : [])
        ]);
        const mapped = currData
          .filter((d: any) => {
            if (EXCLUDED_KPI_CODES.has(d.indicatorCode) || EXCLUDED_KPI_CODES.has(d.code)) return false;
            if (filters.unitCode === "SCVN") {
              const grp = (d.group || "").toLowerCase();
              if (grp.includes("bổ sung")) return false;
            }
            return true;
          })
          .map((d: any) => {
            let parentCode = d.parentCode || "";
            const code = (d.indicatorCode || "").trim();
            if (code === "CM1-I02.03-CR") {
              parentCode = "VM1-I02.04";
            } else if (!parentCode) {
              if (/^(VM1|CM1|DM1|MM1|NM1|SM1)-I02\.01(-[A-Z0-9]+)?$/i.test(code) && code !== "VM1-I02.01" && code !== "TM1-I02") {
                parentCode = "VM1-I02.01";
              } else if (/^(VM2|CM2|DM2|MM2|NM2|SM2)-I01\.01(-[A-Z0-9]+)?$/i.test(code) && code !== "VM2-I01.01" && code !== "TM2-I01") {
                parentCode = "VM2-I01.01";
              } else if (/^(VM3|CM3|DM3|MM3|NM3|SM3)-I01\.(01|02|03|04|05)(-[A-Z0-9]+)?$/i.test(code) && code !== "VM3-I01.02" && code !== "TM3-I01") {
                parentCode = "VM3-I01.02";
              } else if (/^(VM7|CM7|DM7|MM7|NM7|SM7)-I01\.01-/i.test(code)) {
                parentCode = "VM7-I01.01";
              } else if (/^(VM7|CM7|DM7|MM7|NM7|SM7)-I03\.02-/i.test(code)) {
                parentCode = "VM7-I03.02";
              }
            }
            return {
              id: d.id || `${d.indicatorCode}_${filters.unitCode}`,
              code: d.indicatorCode,
              title: d.title || d.indicatorCode,
              unit: d.unit || "",
              formula: d.formula || "",
              target: d.targetValue,
              actual: d.actualValue,
              weight: d.weight || 0,
              status: d.status || "Chờ duyệt",
              pic: d.pic || "",
              group: d.group || "Chỉ số bổ sung",
              frequency: d.frequency || "",
              parentCode: parentCode
            };
          });
        setKpis(mapped);
        kpisRef.current = mapped;

        const loadedExplanations: Record<string, string> = {};
        currData.forEach((d: any) => {
          if (d.explanation) {
            loadedExplanations[d.id] = d.explanation;
          }
        });
        setExplanations(loadedExplanations);

        const firstWithStatus = currData.find((d: any) => d.status);
        if (firstWithStatus) {
          setReportStatus(firstWithStatus.status);
        }
      }
      setIsTableLoading(false);
    }).catch(err => {
      console.error("Lỗi tải dữ liệu nhập liệu KPI:", err);
      if (isMounted) setIsTableLoading(false);
    });

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
    
    fetch(`/api/kpi?productCode=${activeProductId}&unitCode=${filters.unitCode}&periodKey=${pKey}&periodType=${pType}`)
      .then(res => res.json())
      .then(data => {
        if (isMounted && Array.isArray(data)) {
          const EXCLUDED_KPI_CODES = new Set(["MM1-I02.01.01-CNGP", "VM1-I02.02-DA01", "VM1-I02.02-PD"]);
          const mapped = data
            .filter((d: any) => !EXCLUDED_KPI_CODES.has(d.indicatorCode) && !EXCLUDED_KPI_CODES.has(d.code))
            .map((d: any) => ({
            id: d.id || `${d.indicatorCode}_${activeProductId}`,
            code: d.indicatorCode,
            title: d.title || d.indicatorCode,
            unit: d.unit || "",
            formula: d.formula || "",
            target: d.targetValue,
            actual: d.actualValue,
            group: d.group || "Chỉ số bổ sung",
            frequency: d.frequency || "",
            parentCode: d.parentCode || ""
          }));
          setProductKpis(mapped);
          productKpisRef.current = mapped;
        }
      })
      .catch(err => console.error("Lỗi tải dữ liệu chỉ tiêu sản phẩm:", err));

    return () => {
      isMounted = false;
    };
  }, [activeProductId, filters.unitCode, filters.periodType, filters.month, filters.week, filters.quarter, filters.year]);

  // 4. Fetch dynamic rankings for current unit products (optimized to single API call with delay)
  useEffect(() => {
    if (currentUnitProducts.length === 0) return;
    const pType = filters.periodType || "weekly";
    const pKey = getPeriodKey();
    let isMounted = true;

    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/kpi?productCode=all&unitCode=${filters.unitCode}&periodKey=${pKey}&periodType=${pType}&aggregate=false`);
        const data = await res.json();
        
        if (isMounted && Array.isArray(data)) {
          // Group records by productCode in-memory
          const productGroups: Record<string, any[]> = {};
          data.forEach((d: any) => {
            if (d.productCode) {
              productGroups[d.productCode] = productGroups[d.productCode] || [];
              productGroups[d.productCode].push({
                code: d.indicatorCode,
                title: d.title,
                target: d.targetValue || 0,
                actual: d.actualValue || 0
              });
            }
          });

          // Calculate score for each product
          const results = currentUnitProducts.map(p => {
            const mapped = productGroups[p.id] || [];
            const score = isWeekly ? calcWeeklyPHS(mapped).phsWeekly : calcOfficialPHS(mapped).phs;
            return { id: p.id, name: p.name, score };
          });

          setProductsRankings(results.sort((a, b) => b.score - a.score));
        }
      } catch (err) {
        console.error("Lỗi khi tải bảng xếp hạng PSH sản phẩm:", err);
      }
    }, 400); // Trì hoãn 400ms để ưu tiên tải bảng nhập liệu chính

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [currentUnitProducts, filters.unitCode, filters.periodType, filters.month, filters.week, filters.quarter, filters.year]);

  // Function to save unit-level KPIs to database
  const saveKpisToDatabase = async (kpiList: KpiItem[], statusOverride?: string) => {
    const pKey = getPeriodKey();
    const pType = filters.periodType || "weekly";
    const kpiUpdates = kpiList.map(k => ({
      id: k.id,
      indicatorCode: k.code,
      targetValue: k.target,
      actualValue: k.actual,
      weight: k.weight,
      explanation: explanations[k.id] || "",
      status: statusOverride || k.status || "Đang thực hiện",
      title: k.title,
      unit: k.unit,
      formula: k.formula,
      group: k.group,
      parentCode: k.parentCode
    })).filter(k => k.id);

    try {
      const res = await fetch("/api/kpi", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-operator-email": currentLoggedUser?.email || ""
        },
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
      indicatorCode: k.code,
      targetValue: k.target,
      actualValue: k.actual,
      explanation: "",
      status: "Đang nhập",
      title: k.title,
      unit: k.unit,
      formula: k.formula,
      group: k.group,
      parentCode: k.parentCode
    })).filter(k => k.id);

    try {
      const res = await fetch("/api/kpi", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "x-operator-email": currentLoggedUser?.email || ""
        },
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

  const recalculateParentRollups = (currentKpis: any[], changedChildCode: string): any[] => {
    let list = [...currentKpis];
    const changed = list.find(k => k.code === changedChildCode);
    if (!changed || !changed.parentCode) return list;

    let currentParentCode: string | null = changed.parentCode;
    const visited = new Set<string>();

    while (currentParentCode && !visited.has(currentParentCode)) {
      visited.add(currentParentCode);
      const parentIndex = list.findIndex(k => k.code === currentParentCode);
      if (parentIndex === -1) break;

      const parent = list[parentIndex];
      const children = list.filter(k => k.parentCode === parent.code);
      if (children.length > 0) {
        const isAverage = parent.rollup === "AVERAGE" || 
          parent.code.startsWith("VM5-I02") || 
          parent.code === "VM3-I01.04" || 
          parent.code === "VM3-I01.05" || 
          parent.code === "TM4-I02.03" ||
          parent.code === "VM1-I01.01" ||
          parent.code === "VM1-I01.02" ||
          parent.code === "VM1-I05.01" ||
          parent.code === "VM1-I05.02" ||
          parent.code === "VM7-I03.01" ||
          parent.code === "VM7-I01.01" ||
          parent.code === "VM7-I02.01";
        
        const sumTarget = children.reduce((acc, c) => acc + (c.target || 0), 0);
        const sumActual = children.reduce((acc, c) => acc + (c.actual || 0), 0);
        
        const validTargetChildren = children.filter(c => (c.target || 0) > 0);
        const validActualChildren = children.filter(c => (c.actual || 0) > 0);

        const newTarget = isAverage 
          ? (validTargetChildren.length > 0 ? sumTarget / validTargetChildren.length : (sumTarget / children.length)) 
          : sumTarget;
        const newActual = isAverage 
          ? (validActualChildren.length > 0 ? sumActual / validActualChildren.length : (sumActual / children.length)) 
          : sumActual;

        list[parentIndex] = {
          ...parent,
          target: Math.round(newTarget * 100) / 100,
          actual: Math.round(newActual * 100) / 100
        };

        currentParentCode = parent.parentCode;
      } else {
        break;
      }
    }

    return list;
  };

  const handleInputChange = (id: string, val: string) => {
    const numVal = parseFloat(val) || 0;
    setKpis(prev => {
      const targetItem = prev.find(k => k.id === id);
      const updated = prev.map(k => k.id === id ? { ...k, actual: numVal } : k);
      const recalculated = targetItem ? recalculateParentRollups(updated, targetItem.code) : updated;
      kpisRef.current = recalculated;
      return recalculated;
    });
  };

  const handleTargetChange = (id: string, val: string) => {
    const numVal = parseFloat(val) || 0;
    setKpis(prev => {
      const targetItem = prev.find(k => k.id === id);
      const updated = prev.map(k => k.id === id ? { ...k, target: numVal } : k);
      const recalculated = targetItem ? recalculateParentRollups(updated, targetItem.code) : updated;
      kpisRef.current = recalculated;
      return recalculated;
    });
  };

  const handleWeightChange = (id: string, val: string) => {
    const numVal = parseFloat(val) || 0;
    setKpis(prev => prev.map(k => k.id === id ? { ...k, weight: numVal } : k));
    kpisRef.current = kpisRef.current.map(k => k.id === id ? { ...k, weight: numVal } : k);
  };

  const handleRadarPointChange = (code: string, field: "value" | "explanation", newVal: string) => {
    setRadarPoints(prev => prev.map(p => {
      if (p.code === code) {
        return {
          ...p,
          [field === "value" ? "Kỳ này" : "explanation"]: field === "value" ? (parseFloat(newVal) || 0) : newVal
        };
      }
      return p;
    }));
  };

  const handleSaveRadarPoints = async () => {
    const pKey = getPeriodKey();
    const pType = filters.periodType || "weekly";
    
    const scores = radarPoints.map(p => ({
      code: p.code,
      value: p["Kỳ này"],
      calculatedVal: p.calculatedVal,
      explanation: p.explanation || ""
    }));
    
    try {
      const res = await fetch("/api/kpi/radar-scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-operator-email": currentLoggedUser?.email || ""
        },
        body: JSON.stringify({
          unitCode: filters.unitCode,
          periodKey: pKey,
          periodType: pType,
          scores
        })
      });
      if (res.ok) {
        showToast("✓ Đã lưu thành công điểm 7 mục tiêu!");
        const m = filters.month || "7";
        const q = (filters.quarter || "Q3").replace("Q", "");
        const y = filters.year || "2026";
        fetch(`/api/kpi/radar-scores?unitCode=${filters.unitCode}&periodType=${pType}&month=${m}&quarter=${q}&year=${y}`)
          .then(r => r.json())
          .then(data => {
            if (data && Array.isArray(data.points)) {
              setRadarPoints(data.points);
            }
          });
      } else {
        showToast("❌ Lưu thất bại, vui lòng thử lại!");
      }
    } catch (err) {
      console.error("Lỗi khi lưu điểm radar:", err);
      showToast("❌ Đã xảy ra lỗi kết nối!");
    }
  };

  const handleProdInputChange = (id: string, val: number | string) => {
    const numVal = typeof val === "number" ? val : (parseFloat(val) || 0);
    setProductKpis(prev => prev.map(k => k.id === id ? { ...k, actual: numVal } : k));
    productKpisRef.current = productKpisRef.current.map(k => k.id === id ? { ...k, actual: numVal } : k);
  };

  const handleProdTargetChange = (id: string, val: number | string) => {
    const numVal = typeof val === "number" ? val : (parseFloat(val) || 0);
    setProductKpis(prev => prev.map(k => k.id === id ? { ...k, target: numVal } : k));
    productKpisRef.current = productKpisRef.current.map(k => k.id === id ? { ...k, target: numVal } : k);
  };

  const formatValue = (val: number, unit: string) => {
    if (val === undefined || val === null || isNaN(val)) return "0";
    if (Number.isInteger(val)) {
      return val.toLocaleString("en-US");
    }
    return val.toString();
  };

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

  const handleSaveRow = async (id: string) => {
    if (isReadOnly) return;
    const item = kpisRef.current.find(k => k.id === id) || kpis.find(k => k.id === id);
    if (!item) {
      showToast(`⚠️ Không tìm thấy chỉ tiêu để lưu: ID ${id}`, "error");
      return;
    }
    showToast(`💾 Đang lưu chỉ tiêu: ${item.title}...`, "success");
    const success = await saveKpisToDatabase([item]);
    if (success) {
      showToast(`✓ Đã lưu thành công dữ liệu chỉ tiêu: ${item.title}`);
    } else {
      showToast(`❌ Có lỗi xảy ra khi lưu chỉ tiêu: ${item.title}`, "error");
    }
  };

  const handleSaveAllRows = async () => {
    if (isReadOnly) return;
    const items = kpisRef.current.length > 0 ? kpisRef.current : kpis;
    const visibleItems = items.filter(k => shouldShowByFrequency(k.frequency, k.title, k.code));
    if (visibleItems.length === 0) return;
    showToast("💾 Đang tiến hành lưu toàn bộ chỉ tiêu đơn vị...", "success");
    const success = await saveKpisToDatabase(visibleItems);
    if (success) {
      showToast("✓ Đã lưu thành công toàn bộ chỉ tiêu của đơn vị!");
    } else {
      showToast("❌ Có lỗi xảy ra khi lưu toàn bộ chỉ tiêu!", "error");
    }
  };

  const handleSaveProdRow = async (id: string) => {
    if (isReadOnly) return;
    const item = productKpisRef.current.find(k => k.id === id) || productKpis.find(k => k.id === id);
    if (!item) {
      showToast(`⚠️ Không tìm thấy chỉ tiêu sản phẩm để lưu: ID ${id}`, "error");
      return;
    }
    showToast(`💾 Đang lưu chỉ tiêu sản phẩm: ${item.title}...`, "success");
    const success = await saveProductKpisToDatabase([item]);
    if (success) {
      showToast(`✓ Đã lưu thành công dữ liệu sản phẩm cho chỉ tiêu: ${item.title}`);
    } else {
      showToast(`❌ Có lỗi xảy ra khi lưu chỉ tiêu sản phẩm: ${item.title}`, "error");
    }
  };

  const handleSaveAllProductRows = async () => {
    if (isReadOnly || activeProductId === "all") return;
    const items = productKpisRef.current.length > 0 ? productKpisRef.current : productKpis;
    const visibleItems = items.filter(k => shouldShowByFrequency(k.frequency, k.title, k.code));
    if (visibleItems.length === 0) return;
    showToast("💾 Đang tiến hành lưu toàn bộ chỉ tiêu sản phẩm...", "success");
    const success = await saveProductKpisToDatabase(visibleItems);
    if (success) {
      showToast("✓ Đã lưu thành công toàn bộ chỉ tiêu của sản phẩm!");
    } else {
      showToast("❌ Có lỗi xảy ra khi lưu toàn bộ chỉ tiêu sản phẩm!", "error");
    }
  };

  const handleSaveNotes = () => {
    showToast("✓ Đã lưu thành công ý kiến ghi chú của Trưởng đơn vị!");
  };

  const handleSaveExplanations = () => {
    showToast("✓ Đã lưu giải trình bắt buộc thành công!");
  };

  const handleAcceptAction = (id: number) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, status: "Đã chấp nhận" } : a));
  };

  const handleSkipAction = (id: number) => {
    setActions(prev => prev.filter(a => a.id !== id));
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
          "Content-Type": "application/json",
          "x-operator-email": currentLoggedUser?.email || ""
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
            explanation: k.explanation || "",
            pic: k.pic
          }))
        })
      });
      const data = await res.json();
      if (data && Array.isArray(data.suggestedActions)) {
        const rawActions = data.suggestedActions.slice(0, 5);
        const newActions = rawActions.map((act: any, idx: number) => ({
          id: Date.now() + idx,
          title: act.title,
          indicator: act.targetIndicator || "Chỉ số liên quan",
          impact: act.impact,
          status: "Chờ quyết định"
        }));
        setActions(newActions);
        showToast(`✨ AI Agent đã hoàn tất gợi ý ${newActions.length} hành động trọng tâm!`);
      } else {
        showToast("⚠️ Không nhận được gợi ý hành động hợp lệ từ AI.", "error");
      }
    } catch (err: any) {
      console.error(err);
      showToast("❌ Lỗi khi kết nối với AI Agent: " + err.message, "error");
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
          "Content-Type": "application/json",
          "x-operator-email": currentLoggedUser?.email || ""
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
            explanation: k.explanation || "",
            pic: ""
          }))
        })
      });
      const data = await res.json();
      if (data && Array.isArray(data.suggestedActions)) {
        const rawActions = data.suggestedActions.slice(0, 5);
        const newActions = rawActions.map((act: any, idx: number) => ({
          id: Date.now() + idx,
          title: act.title,
          indicator: act.targetIndicator || "Chỉ số liên quan",
          impact: act.impact,
          status: "Chờ quyết định"
        }));
        setProductActions(newActions);
        showToast(`✨ AI Agent đã gợi ý ${newActions.length} hành động sản phẩm!`);
      } else {
        showToast("⚠️ Không nhận được gợi ý hành động hợp lệ từ AI.", "error");
      }
    } catch (err: any) {
      console.error(err);
      showToast("❌ Lỗi khi kết nối với AI Agent: " + err.message, "error");
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
      showToast("🚀 Đã gửi báo cáo cho Giám đốc BU SCVN thành công!");
    } else {
      showToast("❌ Có lỗi xảy ra khi gửi báo cáo.", "error");
    }
  };

  const handleApproveReport = async () => {
    if (isReadOnly) return;
    const success = await saveKpisToDatabase(kpis, "Đã duyệt");
    if (success) {
      setReportStatus("Đã duyệt");
      showToast("✓ Giám đốc BU đã phê duyệt báo cáo toàn kỳ!");
    } else {
      showToast("❌ Có lỗi xảy ra khi duyệt báo cáo.", "error");
    }
  };

  const handleRejectReport = async () => {
    if (isReadOnly) return;
    const success = await saveKpisToDatabase(kpis, "Yêu cầu hiệu chỉnh");
    if (success) {
      setReportStatus("Yêu cầu hiệu chỉnh");
      showToast("✖ Đã gửi yêu cầu hiệu chỉnh báo cáo về Trưởng đơn vị!");
    } else {
      showToast("❌ Có lỗi xảy ra.", "error");
    }
  };

  const handleSaveDraft = async () => {
    if (isReadOnly) return;
    const success = await saveKpisToDatabase(kpis, "Đang nhập");
    if (success) {
      setReportStatus("Đang nhập");
      showToast("💾 Đã lưu thành công bản nháp báo cáo!");
    } else {
      showToast("❌ Có lỗi xảy ra khi lưu bản nháp.", "error");
    }
  };

  function shouldShowByFrequency(freq: string | undefined, title: string, code: string) {
    const periodType = filters.periodType || "weekly";
    const f = (freq || "").toLowerCase().trim();

    // SPECIAL RULE FOR M4 MANDATORY INDICATORS:
    // "Số kênh đạt ngưỡng 10k $/ tháng", "Số vi phạm chính sách", "Tổng số kênh kinh doanh", "Số kênh BKT"
    // Must ONLY show when periodType is 'monthly', 'quarterly', or 'yearly'. Must HIDE when 'weekly'!
    const isM4Mandatory = [
      "Số kênh đạt ngưỡng 10k $/ tháng",
      "Số kênh đạt ngưỡng 10k $",
      "Số vi phạm chính sách",
      "Tổng số kênh kinh doanh",
      "Số kênh BKT"
    ].some(m4Title => title.trim().toLowerCase().includes(m4Title.toLowerCase()));

    if (isM4Mandatory) {
      if (periodType === "weekly") return false;
      return true;
    }

    if (f === "") return true;

    if (periodType === "weekly") {
      return f === "weekly" || f === "tuần";
    } else if (periodType === "monthly") {
      return f === "weekly" || f === "tuần" || f === "monthly" || f === "tháng";
    } else if (periodType === "quarterly") {
      return f === "weekly" || f === "tuần" || f === "monthly" || f === "tháng" || f === "quarterly" || f === "quý";
    } else if (periodType === "yearly") {
      return true;
    }
    return true;
  }

  const normalizeCodeForMatch = (code: string | undefined) => {
    if (!code) return "";
    let clean = code.trim();
    if (selectedProdId && clean.startsWith(selectedProdId + "-")) {
      clean = clean.substring(selectedProdId.length + 1);
    }
    return clean;
  };

  const isParentChildMatch = (parentCodeCandidate: string, childParentCode: string | undefined) => {
    if (!childParentCode || !parentCodeCandidate) return false;
    const normParent = normalizeCodeForMatch(parentCodeCandidate);
    const normChildParent = normalizeCodeForMatch(childParentCode);
    if (normParent === normChildParent) return true;
    
    // So sánh phần thân mã bỏ qua tiền tố loại T/V/D/S/M/N/C
    const pBase = normParent.replace(/^[TVSDMN]/i, "");
    const cBase = normChildParent.replace(/^[TVSDMN]/i, "");
    return pBase !== "" && pBase === cBase;
  };

  const isRowVisible = (kpi: any) => {
    let curr = kpi;
    const visited = new Set<string>();
    while (curr.parentCode) {
      if (visited.has(curr.parentCode) || curr.parentCode === curr.code) break;
      visited.add(curr.parentCode);
      const parent = kpis.find(k => isParentChildMatch(k.code, curr.parentCode));
      if (!parent) break;
      const isParentExpanded = expandedParents[parent.code] !== false && expandedParents[normalizeCodeForMatch(parent.code)] !== false;
      if (!isParentExpanded) return false;
      curr = parent;
    }
    return true;
  };

  const getDepth = (kpi: any) => {
    let depth = 0;
    let curr = kpi;
    const visited = new Set<string>();
    while (curr.parentCode) {
      if (visited.has(curr.parentCode) || curr.parentCode === curr.code) break;
      visited.add(curr.parentCode);
      const parent = kpis.find(k => isParentChildMatch(k.code, curr.parentCode));
      if (!parent) break;
      depth++;
      curr = parent;
    }
    return depth;
  };

  const isProdRowVisible = (pk: any) => {
    let curr = pk;
    const visited = new Set<string>();
    while (curr.parentCode) {
      if (visited.has(curr.parentCode) || curr.parentCode === curr.code) break;
      visited.add(curr.parentCode);
      const parent = productKpis.find(k => isParentChildMatch(k.code, curr.parentCode));
      if (!parent) break;
      const isParentExpanded = expandedParents[parent.code] !== false && expandedParents[normalizeCodeForMatch(parent.code)] !== false;
      if (!isParentExpanded) return false;
      curr = parent;
    }
    return true;
  };

  const getProdDepth = (pk: any) => {
    let depth = 0;
    let curr = pk;
    const visited = new Set<string>();
    while (curr.parentCode) {
      if (visited.has(curr.parentCode) || curr.parentCode === curr.code) break;
      visited.add(curr.parentCode);
      const parent = productKpis.find(k => isParentChildMatch(k.code, curr.parentCode));
      if (!parent) break;
      depth++;
      curr = parent;
    }
    return depth;
  };

  const sortKpisTree = (flatKpis: any[]) => {
    const findParent = (pk: any) => {
      if (!pk.parentCode) return null;
      return flatKpis.find(parent => isParentChildMatch(parent.code, pk.parentCode));
    };

    const childrenMap = new Map<string, any[]>();
    const rootItems: any[] = [];

    flatKpis.forEach(pk => {
      const parent = findParent(pk);
      if (parent) {
        const list = childrenMap.get(parent.code) || [];
        list.push(pk);
        childrenMap.set(parent.code, list);
      } else {
        rootItems.push(pk);
      }
    });

    rootItems.sort(sortKpis);
    childrenMap.forEach(list => list.sort(sortKpis));

    const result: any[] = [];
    const visited = new Set<string>();

    const appendWithChildren = (pk: any) => {
      if (visited.has(pk.code)) return;
      visited.add(pk.code);
      result.push(pk);

      const children = childrenMap.get(pk.code) || [];
      children.forEach(child => appendWithChildren(child));
    };

    rootItems.forEach(root => appendWithChildren(root));

    flatKpis.forEach(pk => {
      if (!visited.has(pk.code)) {
        result.push(pk);
      }
    });

    return result;
  };

  const sortProductKpisTree = sortKpisTree;

  const isRootCategoryCode = (code: string) => {
    if (!code) return false;
    const clean = code.trim().toUpperCase();
    return ["M1", "M2", "M3", "M4", "M5", "M6", "M7"].includes(clean) || /^([A-Z0-9]+-)?M[1-7]$/.test(clean);
  };

  const isHeaderOnlyRow = (code: string) => {
    const headers = [
      "TM1-I01", "TM1-I02", "TM1-I03", "TM1-I05",
      "TM2-I01", "TM2-I02",
      "TM3-I01",
      "TM4-I01", "TM4-I02",
      "TM6-I01",
      "TM7-I01", "TM7-I02", "TM7-I03"
    ];
    return headers.includes(code);
  };

  const scvnOrderRaw = ["TM1-I01","VM1-I01.01","VM1-I01.02","TM1-I02","VM1-I02.01","VM1-I02.01-WF","VM1-I02.01-AS","VM1-I02.01-NDTH","VM1-I02.01-Lego","DM1-I02.01-DA01","SM1-I02.01-SCS","MM1-I02.01-SCMU","NM1-I02.01-CNGP","SM1-I02.01","MM1-I02.01","NM1-I02.01","CM1-I02.01-CR","VM1-I02.01-DA","VM1-I02.01-IP","VM1-I02.02","VM1-I02.02-WF","VM1-I02.02-AS","VM1-I02.02-NDTH","VM1-I02.02-Lego","DM1-I02.02-DA01","SM1-I02.01.01","MM1-I02.01.01","CM1-I02.01-CNGP","CM1-I02.02-CR","VM1-I02.03","VM1-I02.03-WF","VM1-I02.03-AS","VM1-I02.03-NDTH","VM1-I02.03-Lego","SM1-I02.01.03","MM1-I02.01.02","VM1-I02.04","VM1-I02.04-WF","VM1-I02.04-AS","VM1-I02.04-NDTH","VM1-I02.04-Lego","SM1-I02.01.04","MM1-I02.01.03","CM1-I02.03-CR","TM1-I03","VM1-I03.01","TM1-I05","VM1-I05.01","VM1-I05.02","VM1-I05.03","VM1-I05.04","TM2-I01","VM2-I01.01","VM2-I01.01-WF","VM2-I01.01-AS","VM2-I01.01-Lego","VM2-I01.02-NDTH","VM2-I02.01","DM2-I01.01-DA01","SM2-I01.01","VM2-I01.03-NDTH","CM2-I01.01-CR","MM2-I01.01","VM2-I01.3","VWM2-I01.3-WF","VAM2-I01.3-AS","VM2-I01.4","VWM2-I01.4-WF","VAM2-I01.4-AS","VM2-I01.5","VWM2-I01.5-WF","VAM2-I01.5-AS","VM2-I01.6","VWM2-I01.6-WF","VAM2-I01.6-AS","TM2-I02","TM2-I02.01","VM2-I02.01-WF","VM2-I02.01-AS","VM2-I02.01-Lego","VM2-I02.01-NDTH","TM4-I02.01-DA01","SM2-I02.01","VM2-I02.01-SCMU","VM2-I02.01-CR","TM3-I01","TM3-I01.02","VM3-I01.02-WF","VM3-I01.02-AS","VM3-I01.02-Lego","VM3-I01.02-NDTH","DM3-I01.03-DA01","SM3-I01.04-SCS","MM3-I01.01-SCMU","NM3-I01.05-CNGP","CM3-I01.01-CR","TM3-I01.03","VM2-I03.01-WF","VM2-I03.01-AS","VM2-I03.01-Lego","VM2-I03.01-NDTH","VM3-I01.04","VM3-I01.04-WF","VM3-I01.04-AS","VM3-I01.05","VM3-I01.05-WF","VM3-I01.05-AS","VM3-I01.06","TM4-I01.01","VM4-I01.01-WF","TM4-I02","TM4-I02.01","VM4-I02.01-WF","VM4-I02.01-AS","VM4-I02.01-Lego","VM4-I02.01-NDTH","DM4-I02.01-DA01","SM4-I02.01-SCS","MM4-I02.01-SCMU","NM4-I02.03-CNGP","TM4-I02.02","VM4-I02.02-WF","VM4-I02.02-AS","VM4-I02.02-Lego","VM4-I02.02-NDTH","DM4-I02.02-DA01","SM4-I02.02-SCS","MM4-I02.02-SCMU","NM4-I02.02-CNGP","CM4-I02.02-CR","TM4-I02.03","VM4-I02.04","VM4-I02.04-WF","VM4-I02.04-AS","VM4-I02.04-Lego","VM4-I02.04-NDTH","DM4-I02.04-DA01","SM4-I02.04-SCS","MM4-I02.04-SCMU","NM4-I02.04-CNGP","CM4-I02.04-CR","VM4-I02.05","VM4-I02.05-WF","VM4-I02.05-AS","VM4-I02.05-Lego","VM4-I02.05-NDTH","DM4-I02.05-DA01","SM4-I02.05-SCS","MM4-I02.05-SCMU","NM4-I02.05-CNGP","CM4-I02.05-CR","VM4-I02.06","VM4-I02.06-WF","VM4-I02.06-AS","VM4-I02.06-Lego","VM4-I02.06-NDTH","DM4-I02.06-DA01","SM4-I02.06-SCS","MM4-I02.06-SCMU","NM4-I02.06-CNGP","CM4-I02.06-CR","TM5-I01","TM5-I01.03","VM5-I02","VM5-I02.01","VM5-I02.01-WF","VM5-I02.01-AS","VM5-I02.01-Lego","VM5-I02.01-NDTH","SM5-I02.01-SCS","VM5-I02.01-CR","VM5-I02.02","VM5-I02.02-WF","VM5-I02.02-AS","VM5-I02.02-Lego","SM5-I02.02-SCS","VM5-I02.03","VM5-I02.03-WF","VM5-I02.03-AS","VM5-I02.03-Lego","VM5-I02.03-NDTH","VM5-I02.03-DA01","SM5-I02.03-SCS","MM5-I02.03-SCMU","NM5-I02.03-CNGP","VM5-I02.03-CR","VM5-I02.04","VM5-I02.04-WF","VM5-I02.04-AS","VM5-I02.04-Lego","VM5-I02.04-NDTH","VM5-I02.04-DA01","SM5-I02.04-SCS","MM5-I02.04-SCMU","NM5-I02.04-CNGP","VM5-I02.05","VM5-I02.05.01","VM5-I02.05.02","TM6-I01","TM6-I01.01","VM6-I01.01-WF","VM6-I01.01-AS","VM6-I01.01-Lego","VM6-I01.01-NDTH","DM6-I01.01-DA01","SM6-I01.01-SCS","MM6-I01.01-SCMU","NM6-I01.01-CNGP","CM6-I01.01-CR","TM6-I01.02","VM6-I01.02-WF","VM6-I01.02-AS","VM6-I01.02-Lego","VM6-I01.02-NDTH","DM6-I01.02-DA01","SM6-I01.02-SCS","MM6-I01.02-SCMU","NM6-I01.02-CNGP","CM6-I01.02-CR","VM6-I02","TM6-I03","TM6-I03.01","TM6-I03.02","TM7-I01","VM7-I01.01","VM7-I01.01-WF","VM7-I01.01-AS","VM7-I01.01-Lego","VM7-I01.01-NDTH","DM7-I01.01-DA01","SM7-I01.01-SCS","MM7-I01.01-SCMU","NM7-I01.01-CNGP","CM7-I01.01-CR","TM7-I02","VM7-I02.01","VM7-I02.01-WF","VM7-I02.01-AS","VM7-I02.01-Lego","VM7-I02.01-NDTH","DM7-I02.01-DA01","SM7-I02.01-SCS","MM7-I02.01-SCMU","NM7-I02.01-CNGP","CM7-I02.01-CR","VM7-I02.02","VM7-I02.02-WF","VM7-I02.02-AS","VM7-I02.02-Lego","VM7-I02.02-NDTH","DM7-I02.02-DA01","SM7-I02.02-SCS","MM7-I02.02-SCMU","NM7-I02.02-CNGP","CM7-I02.03-CR","TM7-I03","VM7-I03.01","VM7-I03.01-WF","VM7-I03.01-AS","VM7-I03.01-Lego","VM7-I03.01-NDTH","DM7-I03.01-DA01","SM7-I03.01-SCS","MM7-I03.01-SCMU","NM7-I03.01-CNGP","CM7-I03.01-CR","VM7-I03.02","VM7-I03.02-WF","VM7-I03.02-AS","VM7-I03.02-Lego","VM7-I03.02-NDTH","DM7-I03.02-DA01","SM7-I03.02-SCS","MM7-I03.02-SCMU","NM7-I03.02-CNGP","CM7-I03.02-CR"];
  const EXCLUDED_ORDER_SET = new Set([
    "MM1-I02.01.01-CNGP", "VM1-I02.02-DA01", "VM1-I02.02-PD",
    "CM1-I02.01", "DM1-I02.01", "CM1-I02.01-CNGP",
    "SM1-I02.01.01", "MM1-I02.01.01",
    "CM7-I03.01", "DM7-I03.01", "MM7-I03.01", "NM7-I03.01", "SM7-I03.01",
    "CM7-I03.02", "DM7-I03.02", "MM7-I03.02", "NM7-I03.02", "SM7-I03.02",
    "DM4-I02.01", "DM4-I02.02", "DM4-I02.04", "NM4-I02.04", "SM4-I02.06", "SM4-I02.06-SCMU",
    "VM4-I02.05-CR"
  ]);
  const scvnOrder = scvnOrderRaw.filter(c => !EXCLUDED_ORDER_SET.has(c));
  const getGroupOrder = (groupName: string) => {
    if (!groupName) return 99;
    const match = groupName.match(/M([1-7])/i) || groupName.match(/([1-7])\./);
    if (match) return parseInt(match[1]);
    if (groupName.includes("M1")) return 1;
    if (groupName.includes("M2")) return 2;
    if (groupName.includes("M3")) return 3;
    if (groupName.includes("M4")) return 4;
    if (groupName.includes("M5")) return 5;
    if (groupName.includes("M6")) return 6;
    if (groupName.includes("M7")) return 7;
    return 99;
  };

  const sortKpis = (a: any, b: any) => {
    const grpA = getGroupOrder(a.group);
    const grpB = getGroupOrder(b.group);
    if (grpA !== grpB) {
      return grpA - grpB;
    }

    const getUnitSuffix = (unit: string) => {
      if (!unit) return "";
      const u = unit.toUpperCase();
      if (u === "WO" || u === "WOFLOO") return "WF";
      return u;
    };
    const getBaseCode = (code: string) => {
      let clean = code;
      const prefixMatch = clean.match(/^[A-Z0-9]+-\d{4}-\d{3}-(.+)$/);
      if (prefixMatch) {
        clean = prefixMatch[1];
      } else if (selectedProdId && clean.startsWith(selectedProdId + "-")) {
        clean = clean.substring(selectedProdId.length + 1);
      }
      if (clean.includes("-sub-")) {
        clean = clean.split("-sub-")[0];
      }
      return clean;
    };
    const getSortIndex = (code: string) => {
      const base = getBaseCode(code);
      let idx = scvnOrder.indexOf(base);
      if (idx !== -1) return idx;

      const suffix = filters.unitCode ? getUnitSuffix(filters.unitCode) : "";
      if (suffix) {
        const candidateWithSuffix = base + "-" + suffix;
        idx = scvnOrder.indexOf(candidateWithSuffix);
        if (idx !== -1) return idx;
      }

      // Thử tìm cha bằng cách cắt phần đuôi theo dấu chấm (.)
      if (base.includes(".")) {
        const parts = base.split(".");
        for (let i = parts.length - 1; i > 0; i--) {
          const parentCandidate = parts.slice(0, i).join(".");
          let parentIdx = scvnOrder.indexOf(parentCandidate);
          if (parentIdx !== -1) return parentIdx;

          if (suffix) {
            const parentCandidateWithSuffix = parentCandidate + "-" + suffix;
            parentIdx = scvnOrder.indexOf(parentCandidateWithSuffix);
            if (parentIdx !== -1) return parentIdx;
          }
        }
      }

      // Nếu không tìm thấy, thử tìm cha của chỉ tiêu bằng cách cắt bỏ phần hậu tố sau dấu gạch ngang cuối cùng
      if (base.includes("-")) {
        const parts = base.split("-");
        for (let i = parts.length - 1; i > 0; i--) {
          const parentCandidate = parts.slice(0, i).join("-");
          let parentIdx = scvnOrder.indexOf(parentCandidate);
          if (parentIdx !== -1) return parentIdx;

          if (suffix) {
            const parentCandidateWithSuffix = parentCandidate + "-" + suffix;
            parentIdx = scvnOrder.indexOf(parentCandidateWithSuffix);
            if (parentIdx !== -1) return parentIdx;
          }
        }
      }
      return -1;
    };
    const idxA = getSortIndex(a.code);
    const idxB = getSortIndex(b.code);
    if (idxA === -1 && idxB === -1) return a.code.localeCompare(b.code);
    if (idxA === -1) return 1;
    if (idxB === -1) return -1;
    if (idxA === idxB) return a.code.localeCompare(b.code);
    return idxA - idxB;
  };

  const directVisibleKpis = kpis.filter(k => {
    if (!shouldShowByFrequency(k.frequency, k.title, k.code)) return false;
    if (filters.unitCode === "SCVN") {
      const grp = (k.group || "").toLowerCase();
      const code = (k.code || "").trim();
      if (grp.includes("bổ sung") || code === "VM4-I02.05-CR") return false;
      if (code === "CM1-I02.01" || code === "DM1-I02.01" || code === "CM1-I02.01-CNGP" || code === "SM1-I02.01.01" || code === "MM1-I02.01.01") return false;
      if (["CM7-I03.01", "DM7-I03.01", "MM7-I03.01", "NM7-I03.01", "SM7-I03.01", "CM7-I03.02", "DM7-I03.02", "MM7-I03.02", "NM7-I03.02", "SM7-I03.02"].includes(code)) return false;
      if (["DM4-I02.01", "DM4-I02.02", "DM4-I02.04", "NM4-I02.04", "SM4-I02.06", "SM4-I02.06-SCMU"].includes(code)) return false;
    }
    return true;
  });
  const visibleKpisSet = new Set<string>();
  directVisibleKpis.forEach(k => {
    visibleKpisSet.add(k.code);
    let curr = k;
    const visited = new Set<string>();
    while (curr.parentCode) {
      if (visited.has(curr.parentCode) || curr.parentCode === curr.code) break;
      visited.add(curr.parentCode);
      const parent = kpis.find(p => p.code === curr.parentCode);
      if (parent) {
        visibleKpisSet.add(parent.code);
        curr = parent;
      } else {
        break;
      }
    }
  });
  const unitKeyForHidden = filters.unitCode || "SCVN";
  const hiddenCodesForUnit = new Set(hiddenUnitKpis[unitKeyForHidden] || []);

  const visibleKpis = kpis
    .filter(k => visibleKpisSet.has(k.code))
    .filter(k => {
      const grpCode = getObjectiveGroupCode(k.group);
      const isMandatory = isMandatoryUnitIndicator(filters.unitCode, grpCode, k.title);
      if (isMandatory) return true;
      const isHidden = hiddenCodesForUnit.has(k.code);
      if (isHidden) {
        return !!showHiddenUnitGroupRows[grpCode];
      }
      return true;
    })
    .sort(sortKpis);
  const unitGroupCodes = Array.from(new Set(visibleKpis.map(k => getObjectiveGroupCode(k.group)).filter(Boolean)))
    .sort((a, b) => {
      const orderA = parseInt(a.replace("M", "")) || 99;
      const orderB = parseInt(b.replace("M", "")) || 99;
      return orderA - orderB;
    });

  const directVisibleProductKpis = productKpis.filter(pk => shouldShowByFrequency(pk.frequency, pk.title, pk.code));
  const visibleProductKpisSet = new Set<string>();
  directVisibleProductKpis.forEach(pk => {
    visibleProductKpisSet.add(pk.code);
    let curr = pk;
    const visited = new Set<string>();
    while (curr.parentCode) {
      if (visited.has(curr.parentCode) || curr.parentCode === curr.code) break;
      visited.add(curr.parentCode);
      const parent = productKpis.find(p => p.code === curr.parentCode);
      if (parent) {
        visibleProductKpisSet.add(parent.code);
        curr = parent;
      } else {
        break;
      }
    }
  });
  const prodKeyForHidden = selectedProdId || "all";
  const hiddenCodesForSelectedProd = new Set(hiddenProductKpis[prodKeyForHidden] || []);

  const visibleProductKpis = productKpis
    .filter(pk => visibleProductKpisSet.has(pk.code))
    .filter(pk => {
      const grpCode = getObjectiveGroupCode(pk.group);
      const isMandatory = isMandatoryIndicator(grpCode, pk.title);
      if (isMandatory) return true;
      const isHidden = hiddenCodesForSelectedProd.has(pk.code);
      if (isHidden) {
        return !!showHiddenGroupRows[grpCode];
      }
      return true;
    })
    .sort(sortKpis);
  const prodGroupCodes = Array.from(new Set(visibleProductKpis.map(pk => getObjectiveGroupCode(pk.group)).filter(Boolean)))
    .sort((a, b) => {
      const orderA = parseInt(a.replace("M", "")) || 99;
      const orderB = parseInt(b.replace("M", "")) || 99;
      return orderA - orderB;
    });

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

    const rRev = rev && rev.target > 0 ? (rev.actual / rev.target) * 100 : 100;
    const rVol = vol && vol.target > 0 ? Math.min(1.3, vol.actual / vol.target) * 100 : 100;
    const rView = view && view.target > 0 ? Math.min(1.3, view.actual / view.target) * 100 : 100;

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

    const rRev = rev && rev.target > 0 ? (rev.actual / rev.target) * 100 : 100;
    const rVol = vol && vol.target > 0 ? Math.min(1.3, vol.actual / vol.target) * 100 : 100;
    const rView = view && view.target > 0 ? Math.min(1.3, view.actual / view.target) * 100 : 100;

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
          {["SCVN", "TCT", "SCME"].includes(filters.unitCode) && (
            <button
              onClick={() => setActiveTab("radar")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[11px] font-black transition-all ${
                activeTab === "radar"
                  ? "bg-gradient-to-r from-rose-600 to-orange-600 text-white shadow-sm"
                  : "bg-white dark:bg-transparent text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-transparent font-bold"
              }`}
            >
              <Target size={13} /> 🎯 NHẬP BỘ 7 MỤC TIÊU
            </button>
          )}
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCodeColumn(!showCodeColumn)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  {showCodeColumn ? "🙈 Ẩn Mã chỉ tiêu" : "👁️ Hiện Mã chỉ tiêu"}
                </button>
                <button
                  onClick={handleSaveAllRows}
                  disabled={isInputDisabled}
                  className="text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-slate-800 disabled:to-slate-800 disabled:opacity-60 text-white disabled:text-slate-400 font-black px-4 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1.5 uppercase"
                >
                  💾 Lưu tổng bộ mục tiêu
                </button>
              </div>
            </div>

            <div className="max-h-[600px] overflow-y-auto overflow-x-auto relative min-h-[250px]">
              {isTableLoading && (
                <div className="absolute inset-0 z-30 bg-slate-950/85 backdrop-blur-md flex flex-col items-center justify-center p-8 rounded-xl transition-all duration-300">
                  <div className="relative flex items-center justify-center mb-4">
                    <Loader2 className="w-12 h-12 text-emerald-400 animate-spin" />
                    <Sparkles className="w-5 h-5 text-amber-300 absolute animate-pulse" />
                  </div>
                  <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
                    ⚡ Đang tải bảng nhập liệu Bộ 7 Mục tiêu...
                  </h4>
                  <p className="text-xs font-semibold text-slate-300 animate-pulse text-center max-w-md">
                    Vui lòng đợi xíu nhé! Hệ thống đang đồng bộ và tính toán số liệu thực tế...
                  </p>
                </div>
              )}
              <table className="w-full text-left text-sm border-collapse">
                <thead className="sticky top-0 z-10 bg-slate-950 shadow">
                  <tr className="border-b border-white/10 text-slate-300 font-black bg-slate-900 uppercase text-xs">
                    {showCodeColumn && <th className="p-3 w-24 text-center">Mã chỉ tiêu</th>}
                    <th className="p-3 max-w-[250px] w-[250px]">Mục tiêu / Chỉ tiêu cần báo cáo</th>
                    <th className="p-3 w-16 text-center">ĐVT</th>
                    <th className="p-3 w-20 text-center">Tỷ trọng (%)</th>
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
                  {unitGroupCodes.map(objGroupCode => {
                    const rawGroupItems = visibleKpis.filter(k => getObjectiveGroupCode(k.group) === objGroupCode && !isRootCategoryCode(k.code));
                    const items = sortKpisTree(rawGroupItems);
                    if (items.length === 0) return null;
                    const isCustomizableGroup = ["M2", "M3"].includes(objGroupCode);
                    const normalizedTitle = getNormalizedGroupTitle(objGroupCode);
                    const uKey = filters.unitCode || "SCVN";
                    const hiddenList = hiddenUnitKpis[uKey] || [];

                    const hiddenCount = kpis.filter(k => {
                      const grp = getObjectiveGroupCode(k.group);
                      const isMand = isMandatoryUnitIndicator(filters.unitCode, grp, k.title);
                      return grp === objGroupCode && !isMand && hiddenList.includes(k.code);
                    }).length;

                    return (
                      <React.Fragment key={objGroupCode}>
                        <tr className="bg-slate-900/80 border-b border-white/10 uppercase text-xs">
                          <td colSpan={showCodeColumn ? 11 : 10} className="p-2.5 tracking-wider">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                              <span className="text-white font-black text-xs tracking-wider" style={{ color: "#ffffff" }}>
                                {normalizedTitle}
                              </span>
                              {isCustomizableGroup && !isReadOnly && (
                                <div className="flex items-center gap-2 normal-case font-bold">
                                  {hiddenCount > 0 && (
                                    <button
                                      type="button"
                                      onClick={() => setShowHiddenUnitGroupRows(prev => ({ ...prev, [objGroupCode]: !prev[objGroupCode] }))}
                                      className="bg-[#F3E8FF] dark:bg-purple-950/70 hover:bg-purple-200 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/50 text-[11px] font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                                    >
                                      {showHiddenUnitGroupRows[objGroupCode] ? (
                                        <>
                                          <Eye className="w-3.5 h-3.5 text-purple-700 dark:text-purple-300" />
                                          <span className="text-purple-700 dark:text-purple-300 font-extrabold">Đang hiện {hiddenCount} chỉ tiêu ẩn</span>
                                        </>
                                      ) : (
                                        <>
                                          <EyeOff className="w-3.5 h-3.5 text-purple-700 dark:text-purple-300" />
                                          <span className="text-purple-700 dark:text-purple-300 font-extrabold">Xem {hiddenCount} chỉ tiêu đã ẩn</span>
                                        </>
                                      )}
                                    </button>
                                  )}
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setNewKpiTitle("");
                                      setNewKpiParentCode("NONE");
                                      setShowAddModalGroup(objGroupCode as "M2" | "M3");
                                    }}
                                    className="bg-purple-800 hover:bg-purple-700 border border-purple-500/40 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md transition-all"
                                  >
                                    <Plus size={14} style={{ color: "#fde047" }} />
                                    <span style={{ color: "#fde047" }}>Thêm chỉ tiêu {objGroupCode}</span>
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                        {items.filter(isRowVisible).map(kpi => {
                          const pct = calculateCompletionPct(kpi.target, kpi.actual, kpi.code, kpi.title);
                          const depth = getDepth(kpi);
                          const hasChildren = visibleKpis.some(k => isParentChildMatch(kpi.code, k.parentCode));
                          const isExpanded = expandedParents[kpi.code] !== false;
                          const objGrpCode = getObjectiveGroupCode(kpi.group);
                          const isMandatory = isMandatoryUnitIndicator(filters.unitCode, objGrpCode, kpi.title);
                          const isCustomizableGroupRow = ["M2", "M3"].includes(objGrpCode);
                          const isHidden = (hiddenUnitKpis[uKey] || []).includes(kpi.code);
                          const isCustom = kpi.code.includes("-C");

                          return (
                            <tr key={kpi.id} className={`border-b border-white/5 hover:bg-white/5 text-sm ${isHidden ? "opacity-50 bg-slate-950/80 text-slate-400 italic" : "text-slate-200"} ${depth > 0 ? "bg-slate-900/10" : ""}`}>
                              {showCodeColumn && (
                                <td className="p-3 w-24 text-center">
                                  <code className="bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono text-xs font-bold border border-sky-500/20">{kpi.code}</code>
                                </td>
                              )}
                              <td 
                                className={`p-3 font-bold max-w-[250px] w-[250px] break-words ${isImportantIndicator(kpi.title) ? "text-[#10b981] dark:text-[#34d399]" : "text-white"}`}
                                style={{ paddingLeft: `${12 + depth * 16}px` }}
                              >
                                <div className="flex items-center gap-1">
                                  {hasChildren && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setExpandedParents(prev => ({
                                          ...prev,
                                          [kpi.code]: prev[kpi.code] === false ? true : false
                                        }));
                                      }}
                                      className="mr-1 text-slate-400 hover:text-white transition-all text-xs font-mono select-none focus:outline-none w-4 h-4 flex items-center justify-center bg-slate-800/55 rounded hover:bg-slate-700"
                                    >
                                      {isExpanded ? "▼" : "▶"}
                                    </button>
                                  )}
                                  {!hasChildren && depth > 0 && (
                                    <span className="text-slate-500 mr-1.5 font-normal select-none">↳</span>
                                  )}
                                  <div className="flex-1 flex items-center gap-2">
                                    {isCustomizableGroupRow && !isMandatory && !isReadOnly && (
                                      <div className="shrink-0 flex items-center gap-1">
                                        {isCustom && (
                                          <button
                                            type="button"
                                            onClick={() => handleDeleteCustomUnitKpi(kpi.id, kpi.code)}
                                            className="bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-[10px] font-extrabold p-1 rounded-md shadow-sm transition-all"
                                            title="Xóa chỉ tiêu đơn vị tự thêm này"
                                          >
                                            🗑️
                                          </button>
                                        )}
                                        <button
                                          type="button"
                                          onClick={() => handleToggleHideUnitKpi(kpi.code, false)}
                                          className={`p-1 rounded-md border transition-all shadow-md flex items-center justify-center ${
                                            isHidden
                                              ? "bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 border-rose-500/50"
                                              : "bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 border-emerald-500/50"
                                          }`}
                                          title={isHidden ? "Bấm để hiện lại chỉ tiêu này" : "Bấm để ẩn chỉ tiêu này"}
                                        >
                                          {isHidden ? (
                                            <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                                          ) : (
                                            <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                          )}
                                        </button>
                                      </div>
                                    )}
                                    {isMandatory && isCustomizableGroupRow && (
                                      <span className="shrink-0 p-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center justify-center shadow-md" title="Chỉ tiêu then chốt cố định của đơn vị (không thể ẩn)">
                                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                                      </span>
                                    )}
                                    <span className="flex-1">{getFriendlyIndicatorTitle(kpi.code, kpi.title)}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-center text-slate-400 font-bold text-xs">{kpi.unit}</td>
                              <td className="p-3 text-center">
                                {isHeaderOnlyRow(kpi.code) ? (
                                  <span className="text-slate-500 font-bold">-</span>
                                ) : (
                                  <input
                                    type="text"
                                    value={editingCell?.kpiId === kpi.id && editingCell?.field === "weight" ? editingCell.value : (kpi.weight || 0).toString()}
                                    disabled={isInputDisabled}
                                    onFocus={() => setEditingCell({ kpiId: kpi.id, field: "weight", value: (kpi.weight || 0).toString() })}
                                    onChange={(e) => setEditingCell({ kpiId: kpi.id, field: "weight", value: e.target.value })}
                                    onBlur={() => {
                                      if (editingCell) {
                                        const val = parseFloat(editingCell.value) || 0;
                                        handleWeightChange(kpi.id, val.toString());
                                        setEditingCell(null);
                                      }
                                    }}
                                    className="w-16 bg-slate-950 border border-[var(--glass-border)] text-white text-center font-bold text-xs rounded-lg p-1.5 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                                  />
                                )}
                              </td>
                              <td className="p-3 italic text-slate-400 text-xs truncate max-w-[150px]" title={kpi.formula}>
                                {kpi.formula}
                              </td>
                              <td className="p-3 text-center">
                                {isHeaderOnlyRow(kpi.code) ? (
                                  <span className="text-slate-500 font-bold">-</span>
                                ) : (
                                  <input
                                    type="text"
                                    value={editingCell?.kpiId === kpi.id && editingCell?.field === "target" ? editingCell.value : formatValue(kpi.target, kpi.unit)}
                                    disabled={isInputDisabled}
                                    onFocus={() => setEditingCell({ kpiId: kpi.id, field: "target", value: kpi.target.toString() })}
                                    onChange={(e) => setEditingCell({ kpiId: kpi.id, field: "target", value: e.target.value })}
                                    onBlur={() => {
                                      if (editingCell) {
                                        const val = parseFloat(editingCell.value) || 0;
                                        handleTargetChange(kpi.id, val.toString());
                                        setEditingCell(null);
                                      }
                                    }}
                                    className="w-28 bg-slate-950 border border-[var(--glass-border)] text-white text-center font-bold text-xs rounded-lg p-1.5 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                                  />
                                )}
                              </td>
                              <td className="p-3 text-center">
                                {isHeaderOnlyRow(kpi.code) ? (
                                  <span className="text-slate-500 font-bold">-</span>
                                ) : (
                                  <input
                                    type="text"
                                    value={editingCell?.kpiId === kpi.id && editingCell?.field === "actual" ? editingCell.value : formatValue(kpi.actual, kpi.unit)}
                                    disabled={isInputDisabled}
                                    onFocus={() => setEditingCell({ kpiId: kpi.id, field: "actual", value: kpi.actual.toString() })}
                                    onChange={(e) => setEditingCell({ kpiId: kpi.id, field: "actual", value: e.target.value })}
                                    onBlur={() => {
                                      if (editingCell) {
                                        const val = parseFloat(editingCell.value) || 0;
                                        handleInputChange(kpi.id, val.toString());
                                        setEditingCell(null);
                                      }
                                    }}
                                    className="w-28 bg-slate-950 border border-[var(--glass-border)] text-white text-center font-bold text-xs rounded-lg p-1.5 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                                  />
                                )}
                              </td>
                              <td className="p-3 text-center font-black text-sm">
                                {isHeaderOnlyRow(kpi.code) ? (
                                  <span className="text-slate-500 font-bold">-</span>
                                ) : (
                                  <span className={pct < 80 ? "text-rose-400" : pct < 100 ? "text-amber-400" : "text-emerald-400"}>
                                    {isNaN(pct) || !isFinite(pct) ? "0%" : `${pct}%`}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-center w-[200px]">
                                {isHeaderOnlyRow(kpi.code) ? (
                                  <span className="text-slate-500">-</span>
                                ) : (
                                  <input
                                    type="text"
                                    value={explanations[kpi.id] || ""}
                                    placeholder="Ghi chú ngắn kết quả..."
                                    disabled={isInputDisabled}
                                    onChange={(e) => setExplanations(prev => ({ ...prev, [kpi.id]: e.target.value }))}
                                    className="w-full bg-slate-950 border border-[var(--glass-border)] text-white text-xs rounded-lg p-1.5 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                                  />
                                )}
                              </td>
                              <td className="p-3 text-center w-[120px]">
                                {isHeaderOnlyRow(kpi.code) ? (
                                  <span className="text-slate-500">-</span>
                                ) : (
                                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${getStatusStyle(kpi.status)}`}>
                                    {kpi.status}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-center">
                                {isHeaderOnlyRow(kpi.code) ? (
                                  <span className="text-slate-500 font-bold">-</span>
                                ) : (
                                  <button
                                    onClick={() => handleSaveRow(kpi.id)}
                                    disabled={isInputDisabled}
                                    className="bg-[#10b981] hover:bg-[#34d399] text-slate-950 text-[10px] font-black px-2.5 py-1.5 rounded-lg transition-all shadow-md uppercase"
                                  >
                                    Lưu dòng
                                  </button>
                                )}
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

          {/* KHỐI 2: TỔNG KẾT NHANH KẾT QUẢ, CẢNH BÁO AI (<50%) & BÁO CÁO NHANH GỬI GIÁM ĐỐC BU */}
          <div className={`p-5 space-y-5 rounded-2xl border-l-4 border-l-cyan-500 shadow-md transition-all ${
            theme === "light"
              ? "bg-white border border-[#E2E8F0]"
              : "glass-panel"
          }`}>
            <div className="flex flex-wrap justify-between items-center gap-3 border-b border-slate-200 dark:border-white/10 pb-3">
              <h3 className={`text-sm font-black tracking-wider uppercase flex items-center gap-2 ${
                theme === "light" ? "text-cyan-700" : "text-cyan-400"
              }`}>
                <Sparkles size={16} className={theme === "light" ? "text-cyan-600" : "text-cyan-400"} /> ⚡ KHỐI 2: TỔNG KẾT NHANH KẾT QUẢ, CẢNH BÁO AI & BÁO CÁO NHANH GỬI GIÁM ĐỐC BU
              </h3>
              <span className={`text-xs font-semibold ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>
                Đơn vị: <strong>{filters.unitCode}</strong> • {filters.periodType === "weekly" ? `Tuần ${filters.week} (Tháng ${filters.month})` : filters.periodType === "monthly" ? `Tháng ${filters.month}` : filters.periodType === "quarterly" ? `Quý ${filters.quarter}` : `Năm ${filters.year}`}
              </span>
            </div>

            {/* A. THẺ TỔNG KẾT NHANH 3 CHỈ SỐ CHÍNH (3 VIỀN: XANH DƯƠNG - XANH LÁ - ĐỎ) */}
            {(() => {
              const revItem = kpis.find(k => k.code === "VM1-I02.01" || k.code.startsWith("MM1-I02.01") || k.code.startsWith("SM1-I02.01") || k.code.startsWith("DM1-I02.01") || k.code.startsWith("NM1-I02.01") || k.code.startsWith("CM1-I02.01"));
              const volItem = kpis.find(k => k.code === "VM2-I01.01" || k.code.startsWith("MM2-I01.01") || k.code.startsWith("SM2-I01.01") || k.code.startsWith("DM2-I01.01") || k.code.startsWith("NM2-I01.01") || k.code.startsWith("CM2-I01.01"));
              const trafficItem = kpis.find(k => k.code === "VM3-I01.02" || k.code.startsWith("MM3-I01.01") || k.code.startsWith("SM3-I01.04") || k.code.startsWith("DM3-I01.03") || k.code.startsWith("NM3-I01.05") || k.code.startsWith("CM3-I01.01"));

              const revTarget = revItem?.target || 0;
              const revActual = revItem?.actual || 0;
              const revPct = revTarget > 0 ? Math.round((revActual / revTarget) * 100) : 0;

              const volTarget = volItem?.target || 0;
              const volActual = volItem?.actual || 0;
              const volPct = volTarget > 0 ? Math.round((volActual / volTarget) * 100) : 0;

              const trafficTarget = trafficItem?.target || 0;
              const trafficActual = trafficItem?.actual || 0;
              const trafficPct = trafficTarget > 0 ? Math.round((trafficActual / trafficTarget) * 100) : 0;

              const lowItems = kpis.filter(k => k.target > 0 && (k.actual / k.target) < 0.5 && !isRootCategoryCode(k.code) && !isHeaderOnlyRow(k.code));

              return (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    {/* Card 1: Doanh thu (Viền Xanh Dương) */}
                    <div className={`p-3 rounded-xl border-2 flex flex-col justify-between transition-all ${
                      theme === "light"
                        ? "bg-sky-50/90 border-sky-500 text-slate-900 shadow-sm"
                        : "bg-slate-900/80 border-sky-500/40 text-white"
                    }`}>
                      <span className={`text-[11px] font-black uppercase tracking-wider block mb-0.5 ${
                        theme === "light" ? "text-sky-800" : "text-sky-400"
                      }`}>
                        💰 TỔNG DOANH THU ĐƠN VỊ
                      </span>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className={`text-2xl font-black ${theme === "light" ? "text-sky-900" : "text-white"}`}>{revPct}%</span>
                        <span className={`text-[11px] font-extrabold ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>Thực tế / KH</span>
                      </div>
                      <div className={`text-[11px] mt-1.5 font-bold border-t pt-1.5 ${
                        theme === "light" ? "text-slate-700 border-sky-200" : "text-slate-300 border-white/5"
                      }`}>
                        {revActual >= 1e9 ? `${(revActual / 1e9).toFixed(2)} Tỷ` : `${(revActual / 1e6).toFixed(0)} Tr`} / {revTarget >= 1e9 ? `${(revTarget / 1e9).toFixed(2)} Tỷ VNĐ` : `${(revTarget / 1e6).toFixed(0)} Tr VNĐ`}
                      </div>
                    </div>

                    {/* Card 2: Sản lượng (Viền Xanh Lá Cây) */}
                    <div className={`p-3 rounded-xl border-2 flex flex-col justify-between transition-all ${
                      theme === "light"
                        ? "bg-emerald-50/90 border-emerald-500 text-slate-900 shadow-sm"
                        : "bg-slate-900/80 border-emerald-500/40 text-white"
                    }`}>
                      <span className={`text-[11px] font-black uppercase tracking-wider block mb-0.5 ${
                        theme === "light" ? "text-emerald-800" : "text-emerald-400"
                      }`}>
                        🎬 SẢN LƯỢNG SẢN XUẤT
                      </span>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className={`text-2xl font-black ${theme === "light" ? "text-emerald-800" : "text-emerald-400"}`}>{volPct}%</span>
                        <span className={`text-[11px] font-extrabold ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>Thực tế / KH</span>
                      </div>
                      <div className={`text-[11px] mt-1.5 font-bold border-t pt-1.5 ${
                        theme === "light" ? "text-slate-700 border-emerald-200" : "text-slate-300 border-white/5"
                      }`}>
                        {volActual} / {volTarget} {filters.unitCode === "CN" ? "Game" : (["Music", "SCS", "CR"].includes(filters.unitCode) ? "Sản phẩm" : "Video")}
                      </div>
                    </div>

                    {/* Card 3: Traffic (Viền Đỏ/Cam) */}
                    <div className={`p-3 rounded-xl border-2 flex flex-col justify-between transition-all ${
                      theme === "light"
                        ? "bg-rose-50/90 border-rose-500 text-slate-900 shadow-sm"
                        : "bg-slate-900/80 border-rose-500/40 text-white"
                    }`}>
                      <span className={`text-[11px] font-black uppercase tracking-wider block mb-0.5 ${
                        theme === "light" ? "text-rose-800" : "text-rose-400"
                      }`}>
                        📊 TRAFFIC / VIEWS
                      </span>
                      <div className="flex items-baseline justify-between mt-0.5">
                        <span className={`text-2xl font-black ${theme === "light" ? "text-rose-800" : "text-rose-400"}`}>{trafficPct}%</span>
                        <span className={`text-[11px] font-extrabold ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>Thực tế / KH</span>
                      </div>
                      <div className={`text-[11px] mt-1.5 font-bold border-t pt-1.5 ${
                        theme === "light" ? "text-slate-700 border-rose-200" : "text-slate-300 border-white/5"
                      }`}>
                        {trafficActual >= 1e6 ? `${(trafficActual / 1e6).toFixed(1)}M views` : `${trafficActual} views`}
                      </div>
                    </div>
                  </div>

                  {/* B. CẢNH BÁO TÓM TẮT VẮN TẮT AI AGENT (2-3 DÒNG) */}
                  <div className={`p-4 rounded-xl border transition-all ${
                    theme === "light"
                      ? "bg-amber-50/90 border-amber-300 text-amber-950 shadow-sm"
                      : "bg-slate-950 border-amber-500/20 text-amber-200"
                  }`}>
                    <h4 className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 mb-1.5 ${
                      theme === "light" ? "text-amber-800" : "text-amber-400"
                    }`}>
                      ⚠️ CẢNH BÁO TỰ ĐỘNG TỪ AI AGENT (CÁC CHỈ TIÊU ĐẠT &lt; 50% KẾ HOẠCH)
                    </h4>
                    {lowItems.length > 0 ? (
                      <div className="space-y-1 text-xs font-semibold leading-relaxed">
                        <p className={theme === "light" ? "text-rose-800 font-bold" : "text-rose-400 font-bold"}>
                          • AI Agent phát hiện <strong>{lowItems.length} chỉ tiêu</strong> đang đạt dưới 50% kế hoạch trong kỳ này.
                        </p>
                        <p className={theme === "light" ? "text-slate-800" : "text-slate-200"}>
                          • Danh sách các chỉ tiêu nổi bật: <strong>{lowItems.slice(0, 3).map(i => `${i.title} (${i.code})`).join(", ")}</strong>...
                        </p>
                        <p className={`text-[11px] italic mt-1 ${theme === "light" ? "text-slate-600" : "text-slate-400"}`}>
                          👉 Trưởng đơn vị vui lòng bổ sung thông tin giải trình ở <strong>Khối 3</strong> và chọn hành động phục hồi ở <strong>Khối 4</strong> trước khi trình Giám đốc BU.
                        </p>
                      </div>
                    ) : (
                      <div className={`text-xs font-bold ${theme === "light" ? "text-emerald-800" : "text-emerald-400"}`}>
                        🟢 AI Agent ghi nhận: Tất cả các chỉ tiêu chính của đơn vị đều duy trì tiến độ đạt trên 50% kế hoạch trong kỳ này!
                      </div>
                    )}
                  </div>

                  {/* C. KHU VỰC BÁO CÁO NHANH GỬI GIÁM ĐỐC BU */}
                  <div className="space-y-2 pt-1">
                    <div className="flex flex-wrap justify-between items-center gap-2">
                      <label className={`text-xs font-extrabold flex items-center gap-1.5 ${
                        theme === "light" ? "text-slate-800" : "text-slate-200"
                      }`}>
                        ✍️ Nội dung Báo cáo nhanh của Trưởng đơn vị gửi Giám đốc BU:
                      </label>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleGenerateQuickReport}
                          disabled={isGeneratingQuickReport}
                          className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1 shadow"
                        >
                          <Sparkles size={13} style={{ color: "#ffffff" }} />
                          <span style={{ color: "#ffffff" }}>{isGeneratingQuickReport ? "⌛ Đang tổng hợp..." : "✨ AI Tạo Báo Cáo Nhanh"}</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => showToast("💾 Đã lưu thành công nội dung Báo cáo nhanh cho Giám đốc BU!")}
                          className={`text-xs font-extrabold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1 ${
                            theme === "light"
                              ? "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300 shadow-sm"
                              : "bg-slate-800 hover:bg-slate-700 text-slate-200 border-white/10"
                          }`}
                        >
                          <Save size={13} />
                          <span>Lưu báo cáo nhanh</span>
                        </button>
                      </div>
                    </div>
                    <textarea
                      value={quickReportText}
                      onChange={(e) => setQuickReportText(e.target.value)}
                      disabled={isReadOnly}
                      rows={5}
                      placeholder="Bấm nút '✨ AI Tạo Báo Cáo Nhanh' hoặc tự nhập tóm tắt kết quả nổi bật & kiến nghị ngắn gọn gửi tới Giám đốc BU..."
                      className={`w-full rounded-xl p-3.5 text-xs font-medium resize-y min-h-[110px] transition-all focus:outline-none ${
                        theme === "light"
                          ? "bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-600 shadow-sm"
                          : "bg-slate-950 border border-white/10 text-white focus:border-cyan-400 disabled:opacity-60"
                      }`}
                    />
                  </div>
                </div>
              );
            })()}
          </div>

          {/* KHỐI 3: KHU VỰC GIẢI TRÌNH BẮT BUỘC KHI CHỈ SỐ GIẢM SÚT (HOÀN THÀNH < 70% HOẶC GIẢM KỲ TRƯỚC > 5%) */}
          <div className="glass-panel p-5 space-y-4">
            <div className={theme === "light" ? "bg-[#FEF2F2] border border-[#FEE2E2] p-3 rounded-xl" : ""}>
              <h3 className={`text-sm font-black tracking-wider uppercase flex items-center gap-2 ${
                theme === "light" ? "text-[#B91C1C]" : "text-rose-500"
              }`}>
                <AlertTriangle size={16} className={theme === "light" ? "text-[#B91C1C]" : "text-rose-500"} /> 🔴 KHU VỰC 3: GIẢI TRÌNH BẮT BUỘC KHI CHỈ SỐ GIẢM SÚT (HOÀN THÀNH &lt; 70% HOẶC GIẢM KỲ TRƯỚC &gt; 5%)
              </h3>
            </div>
            <div className="space-y-3">
              {(() => {
                const filtered = kpis.filter(k => checkKpiNeedsExplanation(k));
                const sorted = [...filtered].sort((a, b) => {
                  const rateA = a.target > 0 ? a.actual / a.target : 1;
                  const rateB = b.target > 0 ? b.actual / b.target : 1;
                  return rateA - rateB;
                });
                const displayKpis = filters.unitCode === "SCVN" ? sorted : sorted.slice(0, 5);

                if (displayKpis.length === 0) {
                  return (
                    <div className="p-4 text-center text-xs text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-500/20 rounded-xl">
                      🎉 Không có chỉ tiêu nào cần giải trình trong kỳ này!
                    </div>
                  );
                }

                return displayKpis.map(k => {
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
                    <div key={k.id} className={`p-4 rounded-xl space-y-2 transition-all ${
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
                        value={explanations[k.id] || ""}
                        disabled={isReadOnly}
                        onChange={(e) => setExplanations(prev => ({ ...prev, [k.id]: e.target.value }))}
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
                });
              })()}
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
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white !text-white text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span style={{ color: "#ffffff" }}>
                    {isAiGenerating ? "⌛ Đang đề xuất..." : "✨ AI Agent Đề xuất Action"}
                  </span>
                </button>
                <button
                  onClick={handleAddCustomAction}
                  disabled={isReadOnly}
                  className="bg-purple-800 hover:bg-purple-700 text-white !text-white text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow transition-all"
                >
                  <Plus size={14} style={{ color: "#ffffff" }} /> 
                  <span style={{ color: "#ffffff" }}>Thêm hành động chủ động</span>
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
                          className="text-[10px] bg-amber-950 font-bold px-2 py-1 rounded border border-amber-500/20"
                          style={{ color: "#fcd34d" }}
                        >
                          {act.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleAcceptAction(act.id)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 shadow"
                          >
                            <span style={{ color: "#ffffff" }}>✓ Chọn</span>
                          </button>
                          <button
                            onClick={() => handleSkipAction(act.id)}
                            className="bg-slate-800 hover:bg-slate-700 text-[10px] font-black px-2.5 py-1.5 rounded-lg border border-white/10"
                          >
                            <span style={{ color: "#cbd5e1" }}>✖ Bỏ qua</span>
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
                    className="bg-slate-800 hover:bg-slate-700 text-xs font-extrabold px-5 py-2.5 rounded-xl border border-white/10 shadow transition-all"
                  >
                    <span style={{ color: "#ffffff" }}>💾 Lưu nháp (Draft)</span>
                  </button>
                  <button
                    onClick={handleSendReport}
                    disabled={!isAdminOrLeader && reportStatus === "Chờ duyệt"}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-xs font-black px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all disabled:opacity-50"
                  >
                    <span style={{ color: "#ffffff" }}>🚀 Gửi báo cáo cho Giám đốc BU</span>
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
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-purple-950 text-purple-300 px-3 py-1.5 rounded-lg border border-purple-500/30">
                  Mã SP: {currentProduct?.code}
                </span>
                <button
                  onClick={() => setShowCodeColumn(!showCodeColumn)}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1.5 rounded-lg border border-slate-700 transition-all flex items-center gap-1.5"
                >
                  {showCodeColumn ? "🙈 Ẩn Mã chỉ tiêu" : "👁️ Hiện Mã chỉ tiêu"}
                </button>
                <button
                  onClick={handleSaveAllProductRows}
                  disabled={isInputDisabled || activeProductId === "all"}
                  className="text-xs bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 disabled:opacity-60 text-white disabled:text-slate-400 font-black px-4 py-1.5 rounded-lg shadow-md transition-all flex items-center gap-1.5 uppercase"
                >
                  💾 Lưu tổng sản phẩm
                </button>
              </div>
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
                  {prodGroupCodes.map(objGroupCode => {
                    const rawGroupItems = visibleProductKpis.filter(k => getObjectiveGroupCode(k.group) === objGroupCode && !isRootCategoryCode(k.code));
                    const items = sortProductKpisTree(rawGroupItems);
                    if (items.length === 0) return null;
                    return (
                      <React.Fragment key={objGroupCode}>
                        {(() => {
                          const isCustomizableGroup = ["M2", "M3", "M4"].includes(objGroupCode);
                          const normalizedTitle = getNormalizedGroupTitle(objGroupCode);
                          const prodKey = selectedProdId || "all";
                          const hiddenList = hiddenProductKpis[prodKey] || [];

                          const hiddenCount = productKpis.filter(k => {
                            const grp = getObjectiveGroupCode(k.group);
                            const isMand = isMandatoryIndicator(grp, k.title);
                            return grp === objGroupCode && !isMand && hiddenList.includes(k.code);
                          }).length;

                          return (
                            <tr className="bg-slate-900/80 border-b border-white/10 uppercase text-xs">
                              <td colSpan={showCodeColumn ? 8 : 7} className="p-2.5 tracking-wider">
                                <div className="flex flex-wrap justify-between items-center gap-2">
                                  <span className="text-white font-black text-xs tracking-wider" style={{ color: "#ffffff" }}>
                                    {normalizedTitle}
                                  </span>
                                  {isCustomizableGroup && !isReadOnly && activeProductId !== "all" && (
                                    <div className="flex items-center gap-2 normal-case font-bold">
                                      {hiddenCount > 0 && (
                                        <button
                                          type="button"
                                          onClick={() => setShowHiddenGroupRows(prev => ({ ...prev, [objGroupCode]: !prev[objGroupCode] }))}
                                          className="bg-[#F3E8FF] dark:bg-purple-950/70 hover:bg-purple-200 text-purple-700 dark:text-purple-300 border border-purple-300 dark:border-purple-500/50 text-[11px] font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-sm transition-all"
                                        >
                                          {showHiddenGroupRows[objGroupCode] ? (
                                            <>
                                              <Eye className="w-3.5 h-3.5 text-purple-700 dark:text-purple-300" />
                                              <span className="text-purple-700 dark:text-purple-300 font-extrabold">Đang hiện {hiddenCount} chỉ tiêu ẩn</span>
                                            </>
                                          ) : (
                                            <>
                                              <EyeOff className="w-3.5 h-3.5 text-purple-700 dark:text-purple-300" />
                                              <span className="text-purple-700 dark:text-purple-300 font-extrabold">Xem {hiddenCount} chỉ tiêu đã ẩn</span>
                                            </>
                                          )}
                                        </button>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setNewKpiTitle("");
                                          setNewKpiParentCode("NONE");
                                          setShowAddModalGroup(objGroupCode as "M2" | "M3" | "M4");
                                        }}
                                        className="bg-purple-800 hover:bg-purple-700 border border-purple-500/40 text-xs font-black px-3 py-1 rounded-lg flex items-center gap-1.5 shadow-md transition-all"
                                      >
                                        <Plus size={14} style={{ color: "#fde047" }} />
                                        <span style={{ color: "#fde047" }}>Thêm chỉ tiêu {objGroupCode}</span>
                                      </button>
                                    </div>
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })()}
                        {items.filter(isProdRowVisible).map(pk => {
                          const pct = calculateCompletionPct(pk.target, pk.actual, pk.code, pk.title);
                          const displayCode = selectedProdId ? pk.code.replace(selectedProdId + "-", "") : pk.code;
                          const depth = getProdDepth(pk);
                          const hasChildren = visibleProductKpis.some(k => isParentChildMatch(pk.code, k.parentCode));
                          const isExpanded = expandedParents[pk.code] !== false;
                          const objGrpCode = getObjectiveGroupCode(pk.group);
                          const isMandatory = isMandatoryIndicator(objGrpCode, pk.title);
                          const isCustomizableGroup = ["M2", "M3", "M4"].includes(objGrpCode);
                          const prodKey = selectedProdId || "all";
                          const isHidden = (hiddenProductKpis[prodKey] || []).includes(pk.code);
                          const isCustom = pk.code.includes("-C");

                          return (
                            <tr key={pk.id} className={`border-b border-white/5 hover:bg-white/5 text-sm ${isHidden ? "opacity-50 bg-slate-950/80 text-slate-400 italic" : "text-slate-200"} ${depth > 0 ? "bg-slate-900/10" : ""}`}>
                              {showCodeColumn && (
                                <td className="p-3 text-center">
                                  <code className="bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono text-xs font-bold border border-sky-500/20">
                                    {displayCode}
                                  </code>
                                </td>
                              )}
                              <td 
                                className={`p-3 font-bold ${isImportantIndicator(pk.title) ? "text-[#10b981] dark:text-[#34d399]" : "text-white"}`}
                                style={{ paddingLeft: `${12 + depth * 16}px` }}
                              >
                                <div className="flex items-center gap-1">
                                  {hasChildren && (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setExpandedParents(prev => ({
                                          ...prev,
                                          [pk.code]: prev[pk.code] === false ? true : false
                                        }));
                                      }}
                                      className="mr-1 text-slate-400 hover:text-white transition-all text-xs font-mono select-none focus:outline-none w-4 h-4 flex items-center justify-center bg-slate-800/55 rounded hover:bg-slate-700"
                                    >
                                      {isExpanded ? "▼" : "▶"}
                                    </button>
                                  )}
                                  {!hasChildren && depth > 0 && (
                                    <span className="text-slate-500 mr-1.5 font-normal select-none">↳</span>
                                  )}
                                  <div className="flex-1 flex items-center gap-2">
                                    {/* NÚT ICON CON MẮT EYE / EYE-OFF ẨN / HIỆN ĐẶT Ở ĐẦU (TIẾT KIỆM DIỆN TÍCH) */}
                                    {isCustomizableGroup && !isMandatory && !isReadOnly && activeProductId !== "all" && (
                                      <div className="shrink-0 flex items-center gap-1">
                                        {isCustom && (
                                          <button
                                            type="button"
                                            onClick={() => handleDeleteCustomProductKpi(pk.id, pk.code)}
                                            className="bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-[10px] font-extrabold p-1 rounded-md shadow-sm transition-all"
                                            title="Xóa chỉ tiêu tự thêm này"
                                          >
                                            🗑️
                                          </button>
                                        )}
                                        <button
                                          type="button"
                                          onClick={() => handleToggleHideProductKpi(pk.code, false)}
                                          className={`p-1 rounded-md border transition-all shadow-md flex items-center justify-center ${
                                            isHidden
                                              ? "bg-rose-500/20 hover:bg-rose-500/35 text-rose-300 border-rose-500/50"
                                              : "bg-emerald-500/20 hover:bg-emerald-500/35 text-emerald-300 border-emerald-500/50"
                                          }`}
                                          title={isHidden ? "Bấm để hiện lại chỉ tiêu này" : "Bấm để ẩn chỉ tiêu này"}
                                        >
                                          {isHidden ? (
                                            <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                                          ) : (
                                            <Eye className="w-3.5 h-3.5 text-emerald-400" />
                                          )}
                                        </button>
                                      </div>
                                    )}
                                    {isMandatory && (
                                      <span className="shrink-0 p-1 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/50 flex items-center justify-center shadow-md" title="Chỉ tiêu then chốt cố định (không thể ẩn)">
                                        <Lock className="w-3.5 h-3.5 text-amber-400" />
                                      </span>
                                    )}
                                    <span className="flex-1">{pk.title}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3 text-center text-slate-400 font-bold text-xs">{pk.unit}</td>
                              <td className="p-3 italic text-slate-400 text-xs truncate max-w-[200px]" title={pk.formula}>
                                {pk.formula}
                              </td>
                              <td className="p-3 text-center">
                                {isHeaderOnlyRow(pk.code) ? (
                                  <span className="text-slate-500 font-bold">-</span>
                                ) : (
                                  <input
                                    type="text"
                                    value={editingCell?.kpiId === pk.id && editingCell?.field === "target" ? editingCell.value : formatValue(pk.target, pk.unit)}
                                    disabled={isInputDisabled || activeProductId === "all"}
                                    onFocus={() => setEditingCell({ kpiId: pk.id, field: "target", value: pk.target.toString() })}
                                    onChange={(e) => setEditingCell({ kpiId: pk.id, field: "target", value: e.target.value })}
                                    onBlur={() => {
                                      if (editingCell) {
                                        const val = parseFloat(editingCell.value) || 0;
                                        handleProdTargetChange(pk.id, val.toString());
                                        setEditingCell(null);
                                      }
                                    }}
                                    className="w-28 bg-slate-950 border border-purple-500/40 text-white text-center font-bold text-xs rounded-lg p-1.5 focus:outline-none focus:border-purple-400 disabled:opacity-60"
                                  />
                                )}
                              </td>
                              <td className="p-3 text-center">
                                {isHeaderOnlyRow(pk.code) ? (
                                  <span className="text-slate-500 font-bold">-</span>
                                ) : (
                                  <input
                                    type="text"
                                    value={editingCell?.kpiId === pk.id && editingCell?.field === "actual" ? editingCell.value : formatValue(pk.actual, pk.unit)}
                                    disabled={isInputDisabled || activeProductId === "all"}
                                    onFocus={() => setEditingCell({ kpiId: pk.id, field: "actual", value: pk.actual.toString() })}
                                    onChange={(e) => setEditingCell({ kpiId: pk.id, field: "actual", value: e.target.value })}
                                    onBlur={() => {
                                      if (editingCell) {
                                        const val = parseFloat(editingCell.value) || 0;
                                        handleProdInputChange(pk.id, val.toString());
                                        setEditingCell(null);
                                      }
                                    }}
                                    className="w-28 bg-slate-950 border border-purple-500/40 text-white text-center font-bold text-xs rounded-lg p-1.5 focus:outline-none focus:border-purple-400 disabled:opacity-60"
                                  />
                                )}
                              </td>
                              <td className="p-3 text-center font-black text-sm">
                                {isHeaderOnlyRow(pk.code) ? (
                                  <span className="text-slate-500 font-bold">-</span>
                                ) : (
                                  <span className={pct < 80 ? "text-rose-400" : pct < 100 ? "text-amber-400" : "text-emerald-400"}>
                                    {isNaN(pct) || !isFinite(pct) ? "0%" : `${pct}%`}
                                  </span>
                                )}
                              </td>
                              <td className="p-3 text-center">
                                {isHeaderOnlyRow(pk.code) ? (
                                  <span className="text-slate-500 font-bold">-</span>
                                ) : (
                                  <button
                                    onClick={() => handleSaveProdRow(pk.id)}
                                    disabled={isInputDisabled || activeProductId === "all"}
                                    className="bg-purple-700 hover:bg-purple-600 text-white text-[10px] font-black px-2.5 py-1.5 rounded-lg transition-all shadow-md uppercase"
                                  >
                                    Lưu dòng
                                  </button>
                                )}
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
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white !text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span style={{ color: "#ffffff" }}>
                    {isProdAiGenerating ? "⌛ Đang đề xuất..." : "✨ AI Agent Đề xuất Action"}
                  </span>
                </button>
                <button
                  onClick={handleAddCustomProdAction}
                  disabled={isReadOnly || activeProductId === "all"}
                  className="bg-purple-800 hover:bg-purple-700 text-white !text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus size={14} style={{ color: "#ffffff" }} /> 
                  <span style={{ color: "#ffffff" }}>Thêm Action Sản Phẩm</span>
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
                    className="text-[10px] bg-purple-950 font-bold px-2.5 py-1 rounded border border-purple-500/30"
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
                onClick={() => showToast(`🚀 Đã gửi thành công Báo cáo Điểm PSH cho sản phẩm: ${currentProduct?.name}`)}
                className={`text-white !text-white text-xs font-black px-6 py-2.5 rounded-xl transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] disabled:opacity-40 disabled:cursor-not-allowed ${
                  activeProductId === "all"
                    ? "bg-slate-800 border border-slate-700 text-slate-500 shadow-none"
                    : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500"
                }`}
              >
                <span style={{ color: "#ffffff" }}>🚀 Gửi Báo Cáo Sản Phẩm Phê Duyệt</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ==================== TAB 3: NHẬP LIỆU BỘ 7 MỤC TIÊU (DỰ PHÒNG & GHI ĐÈ RADAR) ==================== */}
      {activeTab === "radar" && (
        <div className="glass-panel p-5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black text-rose-400 tracking-wider uppercase flex items-center gap-2">
              <Target size={16} /> 🎯 KHU VỰC: BẢNG NHẬP LIỆU & GHI ĐÈ KẾT QUẢ BỘ 7 MỤC TIÊU - ĐƠN VỊ: {filters.unitCode.toUpperCase()}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSaveRadarPoints}
                disabled={isInputDisabled || !(
                  Number(filters.year) > 2026 ||
                  (Number(filters.year) === 2026 && (
                    filters.periodType === "yearly" ||
                    (filters.periodType === "monthly" && Number(filters.month) >= 7) ||
                    (filters.periodType === "quarterly" && Number(String(filters.quarter).replace("Q", "")) >= 3)
                  ))
                )}
                className="text-xs bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-emerald-700/80 disabled:to-teal-700/80 disabled:opacity-80 text-white !text-white font-black px-4 py-2 rounded-lg shadow-md transition-all flex items-center gap-1.5 uppercase"
              >
                <span style={{ color: "#ffffff" }}>💾 LƯU SỐ LIỆU BỘ 7 MỤC TIÊU</span>
              </button>
            </div>
          </div>

          {!(
            Number(filters.year) > 2026 ||
            (Number(filters.year) === 2026 && (
              filters.periodType === "yearly" ||
              (filters.periodType === "monthly" && Number(filters.month) >= 7) ||
              (filters.periodType === "quarterly" && Number(String(filters.quarter).replace("Q", "")) >= 3)
            ))
          ) && (
            <div className="mb-4 bg-amber-500/10 border border-amber-500/20 text-amber-300 p-3 rounded-lg flex items-start gap-2 text-xs">
              <AlertTriangle size={14} className="mt-0.5 shrink-0" />
              <span>
                <strong>Lưu ý:</strong> Kỳ báo cáo được chọn (<strong>{filters.periodType === "monthly" ? `Tháng ${filters.month}/${filters.year}` : filters.periodType === "quarterly" ? `${filters.quarter}/${filters.year}` : `Năm ${filters.year}`}</strong>) là trước Tháng 7/2026. Số liệu lịch sử được giữ cố định từ hệ thống và <strong>không cho phép chỉnh sửa hay ghi đè</strong>.
              </span>
            </div>
          )}

          <div className="overflow-x-auto relative">
            <table className="w-full text-left text-sm border-collapse">
              <thead className="sticky top-0 z-10 bg-slate-950 shadow">
                <tr className="border-b border-white/10 text-slate-300 font-black bg-slate-900 uppercase text-xs">
                  <th className="p-3 w-48">Mã Mục tiêu</th>
                  <th className="p-3 w-72">Mục tiêu 7 mặt</th>
                  <th className="p-3 w-48 text-center bg-sky-950/30 text-sky-300">Kết quả tạm tính (%)</th>
                  <th className="p-3 w-48 text-center bg-purple-950/30 text-purple-300">Kết quả (%)</th>
                  <th className="p-3 text-center">Ghi chú / Giải trình</th>
                </tr>
              </thead>
              <tbody>
                {radarLoading ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      Đang tải số liệu bộ 7 mục tiêu...
                    </td>
                  </tr>
                ) : radarPoints.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400">
                      Không có dữ liệu cho kỳ báo cáo này.
                    </td>
                  </tr>
                ) : (
                  radarPoints.map((item: any) => {
                    const isReadOnlyField = isInputDisabled || !(
                      Number(filters.year) > 2026 ||
                      (Number(filters.year) === 2026 && (
                        filters.periodType === "yearly" ||
                        (filters.periodType === "monthly" && Number(filters.month) >= 7) ||
                        (filters.periodType === "quarterly" && Number(String(filters.quarter).replace("Q", "")) >= 3)
                      ))
                    );
                    return (
                      <tr key={item.code} className="border-b border-white/5 hover:bg-white/5 text-sm text-slate-200">
                        <td className="p-3">
                          <code className="bg-slate-800 text-rose-400 px-2 py-0.5 rounded font-mono text-xs font-bold border border-rose-500/20">
                            {item.code}
                          </code>
                        </td>
                        <td className="p-3 font-bold text-white">{item.subject}</td>
                        <td className="p-3 text-center font-bold text-sky-400 bg-sky-950/10">
                          {item.calculatedVal !== undefined ? `${item.calculatedVal}%` : "0%"}
                        </td>
                        <td className="p-3 text-center bg-purple-950/10">
                          <input
                            type="number"
                            min={0}
                            max={120}
                            disabled={isReadOnlyField}
                            value={item["Kỳ này"] !== undefined ? item["Kỳ này"] : ""}
                            onChange={(e) => handleRadarPointChange(item.code, "value", e.target.value)}
                            className="w-28 bg-slate-950 border border-[var(--glass-border)] text-white text-center font-bold text-xs rounded-lg p-1.5 focus:outline-none focus:border-rose-500 disabled:opacity-60"
                          />
                        </td>
                        <td className="p-3">
                          <input
                            type="text"
                            disabled={isReadOnlyField}
                            value={item.explanation || ""}
                            onChange={(e) => handleRadarPointChange(item.code, "explanation", e.target.value)}
                            placeholder="Nhập ghi chú cho mục tiêu này..."
                            className="w-full bg-slate-950 border border-[var(--glass-border)] text-white font-medium text-xs rounded-lg p-1.5 focus:outline-none focus:border-rose-500 disabled:opacity-60"
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className={`mt-4 p-4 rounded-xl border-2 transition-all text-xs leading-relaxed shadow-sm ${
            theme === "light"
              ? "bg-[#FFFBEB] border-amber-400 text-slate-800"
              : "bg-amber-950/20 border-amber-500/40 text-slate-200"
          }`}>
            <h4 className={`font-black mb-1.5 text-xs uppercase tracking-wider flex items-center gap-1.5 ${
              theme === "light" ? "text-amber-900" : "text-amber-300"
            }`}>
              💡 Quy định và Hướng dẫn sử dụng:
            </h4>
            <ul className="list-disc pl-4 space-y-1 font-medium">
              <li>
                <strong className={theme === "light" ? "text-amber-950" : "text-amber-200"}>Kết quả tạm tính (%)</strong>: Được hệ thống tính toán bằng tổng điểm hoàn thành của các chỉ tiêu con nhân tỷ trọng tương ứng đã lưu ở Tab <strong>Báo cáo theo đơn vị</strong>.
              </li>
              <li>
                <strong className={theme === "light" ? "text-amber-950" : "text-amber-200"}>Kết quả (%)</strong>: Điểm số chính thức. Mặc định hệ thống tự động gán kết quả tạm tính sang ô này. Nếu bạn muốn điều chỉnh/ghi đè điểm số cho mục tiêu lớn, chỉ cần chỉnh sửa trực tiếp tại đây.
              </li>
              <li>
                Dữ liệu ở cột <strong className={theme === "light" ? "text-amber-950" : "text-amber-200"}>Kết quả (%)</strong> và cột <strong className={theme === "light" ? "text-amber-950" : "text-amber-200"}>Ghi chú / Giải trình</strong> sau khi được lưu sẽ được cập nhật đồng bộ sang <strong>Biểu đồ Radar</strong> và bảng <strong>Chi tiết biến động 7 mặt mục tiêu</strong> ở trang Dashboard.
              </li>
            </ul>
          </div>
        </div>
      )}



      {/* ==================== MODAL 2: THÊM CHỈ TIÊU MỚI TỰ ĐỘNG SINH MÃ ==================== */}
      {showAddModalGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-black text-purple-400 uppercase flex items-center gap-2">
                  ➕ Thêm chỉ tiêu mới ({showAddModalGroup})
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tự động sinh mã chỉ tiêu theo quy tắc chuẩn hóa Sconnect
                </p>
              </div>
              <button
                onClick={() => setShowAddModalGroup(null)}
                className="text-slate-400 hover:text-white bg-slate-800 p-1.5 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Chỉ tiêu cha trực thuộc (Phân cấp chỉ tiêu):
                </label>
                <select
                  value={newKpiParentCode}
                  onChange={(e) => setNewKpiParentCode(e.target.value)}
                  className="w-full bg-slate-950 border border-purple-500/40 text-white font-bold rounded-xl p-2.5 outline-none focus:border-purple-400 text-xs"
                >
                  <option value="NONE">📌 Chỉ tiêu cấp 1 (Trực thuộc mục tiêu {showAddModalGroup})</option>
                  {(activeTab === "unit" ? kpis : productKpis)
                    .filter(k => {
                      const grpCode = getObjectiveGroupCode(k.group);
                      return grpCode === showAddModalGroup && !isRootCategoryCode(k.code);
                    })
                    .map(k => (
                      <option key={k.id} value={k.code}>
                        ↳ [{k.code}] - {k.title}
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-400 font-bold mb-1">Mã chỉ tiêu (Tự động sinh):</label>
                <input
                  type="text"
                  readOnly
                  value={generateCustomIndicatorCode(showAddModalGroup, selectedProdId, newKpiParentCode)}
                  className="w-full bg-slate-950 border border-purple-500/40 text-purple-300 font-mono font-bold rounded-xl p-2.5 outline-none cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Tên chỉ tiêu mới (*):</label>
                <input
                  type="text"
                  value={newKpiTitle}
                  onChange={(e) => setNewKpiTitle(e.target.value)}
                  placeholder="Ví dụ: Tỷ lệ Render lỗi 24h, Lượt Share TikTok..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-purple-400 text-white rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-bold mb-1">Đơn vị tính (ĐVT):</label>
                  <select
                    value={newKpiUnit}
                    onChange={(e) => setNewKpiUnit(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 focus:border-purple-400 text-white font-bold rounded-xl p-2.5 outline-none"
                  >
                    <option value="Video">Video / Tập</option>
                    <option value="Views">Views / Lượt xem</option>
                    <option value="%">% Tỷ lệ</option>
                    <option value="VNĐ">VNĐ / Doanh thu</option>
                    <option value="Kênh">Kênh kinh doanh</option>
                    <option value="Lượt">Lượt tương tác</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-bold mb-1">Chu kỳ mặc định:</label>
                  <input
                    type="text"
                    readOnly
                    value="Hằng tuần (Weekly)"
                    className="w-full bg-slate-950 border border-slate-800 text-slate-400 rounded-xl p-2.5 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Cách tính / Mô tả chỉ tiêu:</label>
                <input
                  type="text"
                  value={newKpiFormula}
                  onChange={(e) => setNewKpiFormula(e.target.value)}
                  placeholder="Ví dụ: Tổng số video upload thành công trong kỳ / Kế hoạch..."
                  className="w-full bg-slate-950 border border-slate-700 focus:border-purple-400 text-white rounded-xl p-2.5 outline-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModalGroup(null)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-4 py-2 rounded-xl"
              >
                Hủy
              </button>
              <button
                type="button"
                onClick={() => handleCreateCustomProductKpi(showAddModalGroup)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold px-5 py-2 rounded-xl shadow-lg"
              >
                🚀 Thêm chỉ tiêu ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out animate-pulse">
          <div className={`flex items-center gap-2.5 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border font-sans ${
            toast.type === "success" 
              ? "bg-emerald-950/90 border-emerald-500/40 text-emerald-300 shadow-emerald-900/30" 
              : "bg-rose-950/90 border-rose-500/40 text-rose-300 shadow-rose-900/30"
          }`}>
            <span className="text-xs font-black uppercase tracking-wider">
              {toast.type === "success" ? "✓ THÀNH CÔNG" : "❌ THẤT BẠI"}
            </span>
            <span className="text-xs font-semibold">{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}
