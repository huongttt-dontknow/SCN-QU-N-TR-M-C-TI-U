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
}

export default function InputFormPage() {
  const { filters, currentLoggedUser, setCurrentLoggedUser } = useApp();

  // Tab State: "unit" vs "product"
  const [activeTab, setActiveTab] = useState<"unit" | "product">("unit");

  // Dòng sản phẩm đang chọn trong Tab 2
  const [selectedProdId, setSelectedProdId] = useState<string>("");

  // Giả lập vai trò xem (Trưởng đơn vị vs Giám đốc BU)
  const [simulatedRole, setSimulatedRole] = useState<"TĐV" | "GĐBU">("TĐV");

  // Dynamic products list fetched from database API
  const [productsList, setProductsList] = useState<ProductLine[]>([]);
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

  // 1. Fetch products list on mount
  useEffect(() => {
    fetch("/api/kpi/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            code: d.id,
            unitCode: d.unit
          }));
          setProductsList(mapped);
        }
      })
      .catch(err => console.error("Lỗi tải danh sách sản phẩm:", err));
  }, []);

  const currentUnitName = unitCodeToNameMap[filters.unitCode] || filters.unitCode;
  const currentUnitProducts = filters.unitCode === "SCVN"
    ? productsList
    : productsList.filter(p => p.unitCode === currentUnitName);

  const currentProduct = currentUnitProducts.find(p => p.id === selectedProdId) || currentUnitProducts[0] || null;

  // Auto-select first product when currentUnitProducts changes
  useEffect(() => {
    if (currentUnitProducts.length > 0) {
      const match = currentUnitProducts.find(p => p.id === selectedProdId);
      if (!match) {
        setSelectedProdId(currentUnitProducts[0].id);
      }
    }
  }, [filters.unitCode, currentUnitProducts]);

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
            group: d.group || "Chỉ số bổ sung"
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
    if (!selectedProdId) return;
    let isMounted = true;
    const pKey = getPeriodKey();
    const pType = filters.periodType || "weekly";
    
    fetch(`/api/kpi?productCode=${selectedProdId}&periodKey=${pKey}&periodType=${pType}`)
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
            group: d.group || "Chỉ số bổ sung"
          }));
          setProductKpis(mapped);
        }
      })
      .catch(err => console.error("Lỗi tải dữ liệu chỉ tiêu sản phẩm:", err));

    return () => {
      isMounted = false;
    };
  }, [selectedProdId, filters.periodType, filters.month, filters.week, filters.quarter, filters.year]);

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
          productCode: selectedProdId,
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

  const groups = Array.from(new Set(kpis.map(k => k.group)));
  const prodGroups = Array.from(new Set(productKpis.map(k => k.group)));

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
                    {showCodeColumn && <th className="p-3 w-28 text-center">Mã chỉ tiêu</th>}
                    <th className="p-3">Mục tiêu / Chỉ tiêu cần báo cáo</th>
                    <th className="p-3 w-16 text-center">ĐVT</th>
                    <th className="p-3 w-56">Cách tính</th>
                    <th className="p-3 w-32 text-center bg-sky-950/30 text-sky-300">KH Định Kỳ</th>
                    <th className="p-3 w-36 text-center bg-purple-950/30 text-purple-300">Kết quả Thực tế</th>
                    <th className="p-3 w-24 text-center">% Hoàn thành</th>
                    <th className="p-3 w-24 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map(groupName => {
                    const items = kpis.filter(k => k.group === groupName);
                    return (
                      <React.Fragment key={groupName}>
                        <tr className="bg-slate-900/50 text-[#10b981] font-black border-b border-white/5 uppercase text-xs">
                          <td colSpan={showCodeColumn ? 8 : 7} className="p-2.5 tracking-wider">
                            {groupName}
                          </td>
                        </tr>
                        {items.map(kpi => {
                          const pct = kpi.target > 0 ? Math.round((kpi.actual / kpi.target) * 100) : 0;
                          return (
                            <tr key={kpi.code} className="border-b border-white/5 hover:bg-white/5 text-sm text-slate-200">
                              {showCodeColumn && (
                                <td className="p-3">
                                  <code className="bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono text-xs font-bold border border-sky-500/20">{kpi.code}</code>
                                </td>
                              )}
                              <td className={`p-3 font-bold max-w-[250px] break-words ${isImportantIndicator(kpi.title) ? "text-[#10b981] dark:text-[#34d399]" : "text-white"}`}>{kpi.title}</td>
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

          {/* KHỐI 2: KHU VỰC GIẢI TRÌNH BẮT BUỘC KHI CHỈ SỐ GIẢM SÚT (DƯỚI 80% KẾ HOẠCH) */}
          <div className="glass-panel p-5 space-y-4">
            <h3 className="text-sm font-black text-rose-500 tracking-wider uppercase flex items-center gap-2">
              <AlertTriangle size={16} /> 🔴 KHU VỰC 2: GIẢI TRÌNH BẮT BUỘC KHI CHỈ SỐ GIẢM SÚT (DƯỚI 80% KẾ HOẠCH)
            </h3>
            <div className="space-y-3">
              {kpis
                .filter(k => k.target > 0 && (k.actual / k.target) < 0.8)
                .map(k => (
                  <div key={k.code} className="bg-slate-900/60 p-4 rounded-xl border border-rose-500/20 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white text-xs">{k.title}</span>
                      <span className="text-[10px] bg-rose-950 text-rose-300 font-extrabold px-2 py-0.5 rounded border border-rose-500/30">
                        {Math.round((k.actual / k.target) * 100)}% kế hoạch
                      </span>
                    </div>
                    <textarea
                      value={explanations[k.code] || ""}
                      disabled={isReadOnly}
                      onChange={(e) => setExplanations(prev => ({ ...prev, [k.code]: e.target.value }))}
                      placeholder="Nhập chi tiết nguyên nhân khách quan/chủ quan và đề xuất hướng khắc phục cụ thể..."
                      rows={2}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-rose-400 resize-none"
                    />
                  </div>
                ))}
              <div className="flex justify-end">
                <button
                  onClick={handleSaveExplanations}
                  className="bg-rose-700 hover:bg-rose-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow"
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
              <button
                onClick={handleAddCustomAction}
                disabled={isReadOnly}
                className="bg-purple-800 hover:bg-purple-700 text-white text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow transition-all"
              >
                <Plus size={14} /> Thêm hành động chủ động
              </button>
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
                        <span className="text-[10px] bg-amber-950 text-amber-300 font-bold px-2 py-1 rounded border border-amber-500/20">
                          {act.status}
                        </span>
                      </td>
                      <td className="p-3 text-center">
                        <div className="flex justify-center items-center gap-2">
                          <button
                            onClick={() => handleAcceptAction(act.id)}
                            className="bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 shadow"
                          >
                            ✓ Chọn
                          </button>
                          <button
                            onClick={() => handleSkipAction(act.id)}
                            className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-black px-2.5 py-1.5 rounded-lg border border-white/10"
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
                    className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-extrabold px-5 py-2.5 rounded-xl border border-white/10 shadow transition-all"
                  >
                    💾 Lưu nháp (Draft)
                  </button>
                  <button
                    onClick={handleSendReport}
                    disabled={reportStatus === "Chờ duyệt"}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(99,102,241,0.4)] transition-all"
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
              value={selectedProdId}
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
                    const items = productKpis.filter(k => k.group === groupName);
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
                                  disabled={isReadOnly || reportStatus === "Chờ duyệt"}
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
                                  disabled={isReadOnly || reportStatus === "Chờ duyệt"}
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
                                  disabled={isReadOnly || reportStatus === "Chờ duyệt"}
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
                <div className="space-y-2 text-xs">
                  {unitProductRankings.map((p, idx) => (
                    <div
                      key={p.id}
                      className={`p-2 rounded-lg flex justify-between items-center ${
                        p.id === selectedProdId ? "bg-purple-600/30 border border-purple-500/50 font-bold" : "bg-white/5"
                      }`}
                    >
                      <span className="truncate max-w-[170px]">
                        #{idx + 1} {p.name}
                      </span>
                      <span className="font-black text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30 text-[11px]">
                        {p.score} điểm
                      </span>
                    </div>
                  ))}
                </div>
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
                onChange={(e) => setProductNote(e.target.value)}
                placeholder="Nhập nhận định nhanh (Ví dụ: Sản phẩm giữ vững tốc độ sản xuất, doanh thu tăng trưởng đúng lộ trình)..."
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {/* KHỐI 4 & 5: ACTIONS VÀ DUYỆT BÁO CÁO SẢN PHẨM */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-indigo-400 tracking-wider uppercase flex items-center gap-2">
                ⚡ KHỐI 4: ĐỀ XUẤT HÀNH ĐỘNG CẢI TIẾN PSH SẢN PHẨM
              </h3>
              <button
                onClick={handleAddCustomProdAction}
                disabled={isReadOnly}
                className="bg-purple-800 hover:bg-purple-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow transition-all"
              >
                <Plus size={14} /> Thêm Action Sản Phẩm
              </button>
            </div>

            <div className="space-y-2">
              {productActions.map(act => (
                <div key={act.id} className="bg-slate-900/60 p-3 rounded-xl border border-white/5 flex flex-wrap justify-between items-center gap-2">
                  <div>
                    <h4 className="text-xs font-bold text-white">{act.title}</h4>
                    <p className="text-[11px] text-slate-400">Kỳ vọng: {act.impact}</p>
                  </div>
                  <span className="text-[10px] bg-purple-950 text-purple-300 font-bold px-2.5 py-1 rounded border border-purple-500/30">
                    {act.status}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-between items-center">
              <span className="text-xs text-slate-400 italic">
                Sau khi kiểm tra Điểm PSH sản phẩm, bấm Gửi báo cáo sản phẩm để trình Giám đốc BU
              </span>
              <button
                onClick={() => alert(`🚀 Đã gửi thành công Báo cáo Điểm PSH cho sản phẩm: ${currentProduct?.name}`)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-black px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(147,51,234,0.4)] transition-all"
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
