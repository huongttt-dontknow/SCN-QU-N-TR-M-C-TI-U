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
  const [selectedProdId, setSelectedProdId] = useState<string>("p1");

  // Giả lập vai trò xem (Trưởng đơn vị vs Giám đốc BU)
  const [simulatedRole, setSimulatedRole] = useState<"TĐV" | "GĐBU">("TĐV");

  // Danh sách dòng sản phẩm phân nhóm theo Đơn vị
  const productLinesMap: Record<string, ProductLine[]> = {
    "Wofloo": [
      { id: "p1", name: "Phim Wolfoo 2D Stories", code: "WO-2020-001", unitCode: "Wofloo" },
      { id: "p2", name: "Chuỗi Hoạt hình Wolfoo 3D", code: "WO-3D-002", unitCode: "Wofloo" },
      { id: "p3", name: "Wolfoo Short Videos", code: "WO-SHORT-003", unitCode: "Wofloo" },
    ],
    "Lego": [
      { id: "p4", name: "Dự án Lego Automation", code: "LE-2026-001", unitCode: "Lego" },
      { id: "p5", name: "Sản phẩm Lego AI 100%", code: "LE-2026-002", unitCode: "Lego" },
    ],
    "AS": [
      { id: "p6", name: "Sản phẩm Animated Story - MDA", code: "AS-MDA-001", unitCode: "AS" },
    ],
    "Music": [
      { id: "p7", name: "Sản phẩm Music SCMU", code: "SCMU-2026-001", unitCode: "Music" },
    ],
    "CN": [
      { id: "p8", name: "Game Web/App Mobile", code: "CN-2026-001", unitCode: "CN" },
    ],
    "CR": [
      { id: "p9", name: "Creative Hub Podcast & Manga", code: "CR-2026-001", unitCode: "CR" },
    ],
    "SCVN": [
      { id: "p1", name: "Phim Wolfoo 2D Stories", code: "WO-2020-001", unitCode: "Wofloo" },
      { id: "p4", name: "Dự án Lego Automation", code: "LE-2026-001", unitCode: "Lego" },
      { id: "p8", name: "Game Web/App Mobile", code: "CN-2026-001", unitCode: "CN" },
    ]
  };

  const currentUnitProducts = productLinesMap[filters.unitCode] || productLinesMap["Wofloo"];
  const currentProduct = currentUnitProducts.find(p => p.id === selectedProdId) || currentUnitProducts[0];

  useEffect(() => {
    if (currentUnitProducts.length > 0) {
      setSelectedProdId(currentUnitProducts[0].id);
    }
  }, [filters.unitCode]);

  // 1. Dữ liệu bảng chỉ tiêu cấp Đơn vị (Khớp 100% với screenshot)
  const defaultWolfooKpis: KpiItem[] = [
    { code: "VM1-I02.01", title: "Tổng doanh thu", unit: "VNĐ", formula: "Tổng doanh thu phát sinh trong kỳ", target: 91840000, actual: 83574400, status: "Đang nhập", pic: "Lê Đăng Khoa", group: "M1. TÀI CHÍNH / KINH DOANH" },
    { code: "VM2-I01.01", title: "Số lượng video hoàn thành sản xuất", unit: "Video", formula: "Số lượng video hoàn thành sản xuất", target: 11, actual: 8, status: "Đang nhập", pic: "Lê Đăng Khoa", group: "M2. SẢN PHẨM / SẢN XUẤT" },
    { code: "VM2-I02.01", title: "Số sản phẩm phái sinh & khai thác", unit: "Sản phẩm", formula: "Số sản phẩm phái sinh & khai thác xuất bản", target: 14, actual: 17, status: "Đang nhập", pic: "Lê Đăng Khoa", group: "M2. SẢN PHẨM / SẢN XUẤT" },
    { code: "VM2-I01.3", title: "Số lượng ý tưởng mới", unit: "Ý tưởng", formula: "Số lượng ý tưởng mới sx trong kỳ (Áp dụng cho BP Wolfoo và BP AS)", target: 30, actual: 36, status: "Đang nhập", pic: "Lê Đăng Khoa", group: "M2. SẢN PHẨM / SẢN XUẤT" },
    { code: "VM2-I01.4", title: "Số lượng ý tưởng được chọn", unit: "Ý tưởng", formula: "Số lượng ý tưởng được chọn sx trong kỳ (Áp dụng cho BP Wolfoo và BP AS)", target: 18, actual: 16, status: "Đang nhập", pic: "Lê Đăng Khoa", group: "M2. SẢN PHẨM / SẢN XUẤT" },
    { code: "VM2-I01.5", title: "Tỷ lệ chọn ý tưởng", unit: "%", formula: "Tỷ lệ chọn ý tưởng", target: 80, actual: 70, status: "Đang nhập", pic: "Lê Đăng Khoa", group: "M2. SẢN PHẨM / SẢN XUẤT" },
    { code: "VM2-I01.6", title: "SL Kịch bản mới SX", unit: "Kịch bản", formula: "Số lượng kịch bản mới sản xuất", target: 11, actual: 10, status: "Đang nhập", pic: "Lê Đăng Khoa", group: "M2. SẢN PHẨM / SẢN XUẤT" },
    { code: "TM3-I01.02", title: "Tổng traffic đơn vị (Views)", unit: "Lượt", formula: "Tổng traffic đơn vị", target: 17820000, actual: 17107200, status: "Đang nhập", pic: "Trịnh Quốc Thịnh", group: "M3. KHÁCH HÀNG / DỊCH VỤ" },
    { code: "TM3-I01.03", title: "Số lượng video upload (nội dung)", unit: "Video", formula: "Số lượng video upload", target: 11, actual: 13, status: "Đang nhập", pic: "Trịnh Quốc Thịnh", group: "M3. KHÁCH HÀNG / DỊCH VỤ" },
    { code: "TM3-I01.06", title: "View TB/1 nội dung mới upload trong kỳ", unit: "Views", formula: "View trung bình của video upload mới", target: 215000, actual: 225750, status: "Đang nhập", pic: "Trịnh Quốc Thịnh", group: "M3. KHÁCH HÀNG / DỊCH VỤ" },
  ];

  // 2. Dữ liệu sản phẩm cho Tab 2
  const defaultProductKpisMap: Record<string, ProductKpiItem[]> = {
    "p1": [
      { code: "SP-M1-01", title: "Doanh thu trực tiếp sản phẩm (Wolfoo 2D)", unit: "VNĐ", formula: "Doanh thu phát sinh từ sản phẩm", target: 45000000, actual: 48500000, group: "M1. TÀI CHÍNH / KINH DOANH" },
      { code: "SP-M1-02", title: "Tỷ suất lợi nhuận ROI sản phẩm", unit: "%", formula: "Lợi nhuận/Chi phí đầu tư sản phẩm", target: 15, actual: 16.5, group: "M1. TÀI CHÍNH / KINH DOANH" },
      { code: "SP-M2-01", title: "Sản lượng tập video hoàn thành", unit: "Tập", formula: "Tổng số tập video kết xuất đạt chuẩn", target: 8, actual: 9, group: "M2. SẢN PHẨM / SẢN XUẤT" },
      { code: "SP-M3-01", title: "Traffic tổng thể của dòng sản phẩm", unit: "Views", formula: "Lượt xem tích lũy của dòng sản phẩm", target: 12000000, actual: 13500000, group: "M3. KHÁCH HÀNG / TRAFFIC" },
    ],
    "p2": [
      { code: "SP-M1-01", title: "Doanh thu trực tiếp sản phẩm (Wolfoo 3D)", unit: "VNĐ", formula: "Doanh thu phát sinh từ sản phẩm", target: 30000000, actual: 27000000, group: "M1. TÀI CHÍNH / KINH DOANH" },
      { code: "SP-M2-01", title: "Sản lượng tập video 3D hoàn thành", unit: "Tập", formula: "Số tập 3D kết xuất", target: 4, actual: 4, group: "M2. SẢN PHẨM / SẢN XUẤT" },
    ],
  };

  const [kpis, setKpis] = useState<KpiItem[]>(defaultWolfooKpis);
  const [productKpis, setProductKpis] = useState<ProductKpiItem[]>(defaultProductKpisMap["p1"]);
  const [productNote, setProductNote] = useState("");

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

  // Fetch KPI data dynamically from database API
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
          
          // Đặt trạng thái báo cáo chung dựa trên trạng thái của chỉ số đầu tiên có trạng thái
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

  // Hàm lưu KPI đồng bộ với cơ sở dữ liệu
  const saveKpisToDatabase = async (kpiList: KpiItem[], statusOverride?: string) => {
    const pKey = getPeriodKey();
    const pType = filters.periodType || "weekly";
    const kpiUpdates = kpiList.map(k => ({
      id: k.id,
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

  useEffect(() => {
    const defaultData = defaultProductKpisMap[selectedProdId] || defaultProductKpisMap["p1"];
    setProductKpis(defaultData);
  }, [selectedProdId]);

  const handleInputChange = (code: string, val: string) => {
    setKpis(prev => prev.map(k => k.code === code ? { ...k, actual: parseFloat(val) || 0 } : k));
  };

  const handleProdInputChange = (code: string, val: string) => {
    setProductKpis(prev => prev.map(k => k.code === code ? { ...k, actual: parseFloat(val) || 0 } : k));
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

  const handleSaveProdRow = (code: string) => {
    if (isReadOnly) return;
    alert(`✓ Đã lưu thành công dữ liệu sản phẩm cho chỉ tiêu: ${code}`);
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
      { id: Date.now(), title, indicator: "Hiệu quả PSH", impact: "Tăng điểm PSH sản phẩm", status: "Chờ quyết định" }
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
    const success = await saveKpisToDatabase(kpis, "Đang thực hiện");
    if (success) {
      setReportStatus("Đang nhập");
      alert("💾 Đã lưu nháp báo cáo toàn kỳ thành công!");
    } else {
      alert("❌ Có lỗi xảy ra khi lưu nháp báo cáo.");
    }
  };

  const groups = Array.from(new Set(kpis.map(k => k.group)));
  const prodGroups = Array.from(new Set(productKpis.map(k => k.group)));

  // Thuật toán PSH cho Tab 2
  const isWeekly = filters.periodType === "weekly";

  const calcWeeklyPHS = (items: ProductKpiItem[]) => {
    const rev = items.find(i => i.code.includes("M1"));
    const vol = items.find(i => i.code.includes("M2"));
    const view = items.find(i => i.code.includes("M3"));

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

  const calcOfficialPHS = (items: ProductKpiItem[]) => {
    const rev = items.find(i => i.code.includes("M1"));
    const vol = items.find(i => i.code.includes("M2"));
    const view = items.find(i => i.code.includes("M3"));

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

  const unitProductRankings = currentUnitProducts.map(p => {
    const kpisForP = defaultProductKpisMap[p.id] || defaultProductKpisMap["p1"];
    const score = isWeekly ? calcWeeklyPHS(kpisForP).phsWeekly : calcOfficialPHS(kpisForP).phs;
    return { ...p, score };
  }).sort((a, b) => b.score - a.score);

  return (
    <div className="flex flex-col gap-6 pb-16 text-white">
      {/* FREEZE FILTERS */}
      <FiltersHeader />

      {/* THANH CHUYỂN TAB ĐỈNH TRANG (TAB SWITCHER BAR) */}
      <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-xl border border-slate-300 dark:border-white/10 w-full md:w-fit self-start shadow-md">
        <button
          onClick={() => setActiveTab("unit")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-black transition-all ${
            activeTab === "unit"
              ? "bg-gradient-to-r from-emerald-600 to-lime-600 text-white shadow-md"
              : "bg-white dark:bg-transparent text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-transparent font-bold"
          }`}
        >
          <Building2 size={15} /> 🏢 BÁO CÁO KẾT QUẢ THEO ĐƠN VỊ ({filters.unitCode})
        </button>
        <button
          onClick={() => setActiveTab("product")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-black transition-all ${
            activeTab === "product"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md"
              : "bg-white dark:bg-transparent text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-white/5 border border-slate-200 dark:border-transparent font-bold"
          }`}
        >
          <Film size={15} /> 🎬 BÁO CÁO KẾT QUẢ THEO SẢN PHẨM
        </button>
      </div>

      {/* ==================== TAB 1: BÁO CÁO KẾT QUẢ THEO ĐƠN VỊ (KHỐI 1 - 5 NGUYÊN MẪU) ==================== */}
      {activeTab === "unit" && (
        <>
          {/* KHỐI 1: BẢNG NHẬP LIỆU CHỈ SỐ KPI THỰC TẾ (HÀNG TUẦN) - BỘ PHẬN: SCVN */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-black text-[#10b981] tracking-wider uppercase mb-4 flex items-center gap-2">
              <Building2 size={16} /> 🟢 KHU VỰC 1: BẢNG NHẬP LIỆU CHỈ SỐ KPI THỰC TẾ (HÀNG TUẦN) - BỘ PHẬN: {filters.unitCode.toUpperCase()}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-300 font-black bg-slate-900/60 uppercase text-xs">
                    <th className="p-3 w-28">Mã chỉ tiêu</th>
                    <th className="p-3">Mục tiêu / Chi tiêu cần báo cáo</th>
                    <th className="p-3 w-16 text-center">ĐVT</th>
                    <th className="p-3 w-56">Cách tính</th>
                    <th className="p-3 w-36 text-center">Kế hoạch định kỳ</th>
                    <th className="p-3 w-32 text-center">Kết quả thực tế đã nhập</th>
                    <th className="p-3 w-24 text-center">Tỷ lệ hoàn thành</th>
                    <th className="p-3 w-28 text-center">Trạng thái duyệt</th>
                    <th className="p-3 w-24 text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map(groupName => {
                    const groupItems = kpis.filter(k => k.group === groupName);
                    return (
                      <React.Fragment key={groupName}>
                        <tr className="bg-slate-900/50 text-[var(--accent-cyan)] font-black border-b border-white/5 uppercase text-xs">
                          <td colSpan={9} className="p-2.5 tracking-wider">
                            {groupName}
                          </td>
                        </tr>
                        {groupItems.map(kpi => {
                          const pct = Math.round((kpi.actual / kpi.target) * 100);
                          return (
                            <tr key={kpi.code} className="border-b border-white/5 hover:bg-white/5 text-sm text-slate-200">
                              <td className="p-3">
                                <code className="bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono text-xs font-bold border border-sky-500/20">{kpi.code}</code>
                              </td>
                              <td className="p-3 font-bold text-white">{kpi.title}</td>
                              <td className="p-3 text-center text-slate-400 font-bold text-xs">{kpi.unit}</td>
                              <td className="p-3 italic text-slate-400 text-xs truncate max-w-[200px]" title={kpi.formula}>
                                {kpi.formula}
                              </td>
                              <td className="p-3 text-center font-extrabold text-slate-300">
                                {kpi.target.toLocaleString()} {kpi.unit}
                              </td>
                              <td className="p-3 text-center">
                                <input
                                  type="number"
                                  value={kpi.actual}
                                  disabled={isReadOnly || reportStatus === "Chờ duyệt"}
                                  onChange={(e) => handleInputChange(kpi.code, e.target.value)}
                                  className="w-28 bg-slate-950 border border-[var(--glass-border)] text-white text-center font-black text-sm rounded-lg p-1.5 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                                />
                              </td>
                              <td className="p-3 text-center font-black text-sm">
                                <span className={pct < 80 ? "text-rose-400" : pct < 100 ? "text-amber-400" : "text-emerald-400"}>
                                  {pct}%
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <span className="text-xs bg-slate-800 text-amber-300 font-extrabold px-2.5 py-1 rounded-lg border border-amber-500/20">
                                  {kpi.status}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleSaveRow(kpi.code)}
                                  disabled={isReadOnly}
                                  className="bg-indigo-600/90 hover:bg-indigo-600 text-white text-xs font-black px-3.5 py-1.5 rounded-lg transition-all shadow"
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

          {/* KHỐI 2: BÁO CÁO ĐÁNH GIÁ TỔNG HỢP & DỰ BÁO TỰ ĐỘNG BỞI AI */}
          <div className="glass-panel p-5 space-y-5">
            <h3 className="text-sm font-black text-sky-600 dark:text-sky-400 tracking-wider uppercase flex items-center gap-2">
              🤖 KHỐI 2: BÁO CÁO ĐÁNH GIÁ TỔNG HỢP & DỰ BÁO TỰ ĐỘNG BỞI AI
            </h3>

            {/* 3 THẺ MỤC TIÊU CỐT LÕI (DOANH THU, TRAFFIC, SẢN LƯỢNG) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              
              {/* Thẻ 1: Doanh thu */}
              <div className="bg-white dark:bg-slate-900/80 border-l-4 border-l-emerald-600 border border-slate-200 dark:border-white/10 p-4 rounded-xl flex flex-col justify-between h-[200px] shadow-sm">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                      📊 DOANH THU (VM1-I02.01)
                    </h4>
                    <span className="text-xs font-black text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/20 border border-emerald-300 dark:border-transparent px-2.5 py-0.5 rounded-lg">Đạt 91%</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 mt-2.5 space-y-1">
                    <p>Thực tế: <strong className="text-slate-900 dark:text-white font-black text-sm">83,574,400 VNĐ</strong></p>
                    <p>KH: <strong className="text-slate-600 dark:text-slate-400 font-bold">91,840,000 VNĐ</strong></p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">So với tuần trước: <span className="text-slate-700 dark:text-slate-300 font-bold">N/A</span></p>
                  </div>
                </div>

                <div className="bg-emerald-50/80 dark:bg-slate-950/80 p-2.5 rounded-lg border border-emerald-200 dark:border-white/5 flex justify-between items-center text-xs">
                  <span className="font-extrabold text-emerald-900 dark:text-amber-300">💡 AI DỰ BÁO THÁNG</span>
                  <span className="font-bold text-slate-900 dark:text-slate-300">Dự kiến đạt: 417,872,000 (91% KH)</span>
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">🟢 Thấp</span>
                </div>
              </div>

              {/* Thẻ 2: Traffic */}
              <div className="bg-white dark:bg-slate-900/80 border-l-4 border-l-sky-600 border border-slate-200 dark:border-white/10 p-4 rounded-xl flex flex-col justify-between h-[200px] shadow-sm">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-extrabold text-sky-700 dark:text-sky-400 uppercase tracking-wider">
                      🎬 TRAFFIC (TM3-I01.02)
                    </h4>
                    <span className="text-xs font-black text-sky-800 dark:text-sky-400 bg-sky-100 dark:bg-sky-500/20 border border-sky-300 dark:border-transparent px-2.5 py-0.5 rounded-lg">Đạt 96%</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 mt-2.5 space-y-1">
                    <p>Thực tế: <strong className="text-slate-900 dark:text-white font-black text-sm">17,107,200 Lượt</strong></p>
                    <p>KH: <strong className="text-slate-600 dark:text-slate-400 font-bold">17,820,000 Lượt</strong></p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">So với tuần trước: <span className="text-slate-700 dark:text-slate-300 font-bold">N/A</span></p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-400 font-black">Đề xuất: Duy trì</p>
                  </div>
                </div>

                <div className="bg-sky-50/80 dark:bg-slate-950/80 p-2.5 rounded-lg border border-sky-200 dark:border-white/5 flex justify-between items-center text-xs">
                  <span className="font-extrabold text-sky-900 dark:text-amber-300">💡 AI DỰ BÁO THÁNG</span>
                  <span className="font-bold text-slate-900 dark:text-slate-300">Dự kiến đạt: 85,536,000 (96% KH)</span>
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">🟢 Thấp</span>
                </div>
              </div>

              {/* Thẻ 3: Sản lượng */}
              <div className="bg-white dark:bg-slate-900/80 border-l-4 border-l-rose-500 border border-slate-200 dark:border-white/10 p-4 rounded-xl flex flex-col justify-between h-[200px] shadow-sm">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-extrabold text-rose-700 dark:text-purple-400 uppercase tracking-wider">
                      📦 SẢN LƯỢNG (VM2-I01.01)
                    </h4>
                    <span className="text-xs font-black text-rose-800 dark:text-rose-400 bg-rose-100 dark:bg-rose-500/20 border border-rose-300 dark:border-transparent px-2.5 py-0.5 rounded-lg">Đạt 73%</span>
                  </div>
                  <div className="text-xs text-slate-700 dark:text-slate-300 mt-2.5 space-y-1">
                    <p>Thực tế: <strong className="text-slate-900 dark:text-white font-black text-sm">8 Video</strong></p>
                    <p>KH: <strong className="text-slate-600 dark:text-slate-400 font-bold">11 Video</strong></p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">So với tuần trước: <span className="text-slate-700 dark:text-slate-300 font-bold">N/A</span></p>
                    <p className="text-xs text-rose-700 dark:text-rose-400 font-black">Đề xuất: Điều chỉnh (Phái sinh / Tối ưu asset)</p>
                  </div>
                </div>

                <div className="bg-rose-50/80 dark:bg-slate-950/80 p-2.5 rounded-lg border border-rose-200 dark:border-white/5 flex justify-between items-center text-xs">
                  <span className="font-extrabold text-rose-900 dark:text-amber-300">💡 AI DỰ BÁO THÁNG</span>
                  <span className="font-bold text-slate-900 dark:text-slate-300">Dự kiến đạt: 40 (73% KH)</span>
                  <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">🔴 Rất cao</span>
                </div>
              </div>

            </div>

            {/* DẢI CHỈ TIÊU BỔ SUNG & PHỤ TRỢ TRONG KỲ */}
            <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 p-4 rounded-xl space-y-3 shadow-sm">
              <h5 className="text-xs font-black text-slate-800 dark:text-slate-300 uppercase tracking-wider">
                📌 CHỈ TIÊU BỔ SUNG & PHỤ TRỢ TRONG KỲ:
              </h5>
              <div className="flex flex-wrap gap-2.5 text-xs">
                <span className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-slate-800 dark:text-slate-300 font-bold">
                  <strong className="text-slate-900 dark:text-white">VM2-I02.01</strong> Số sản phẩm phái sinh & khai thác: <strong>17 Sản phẩm</strong> <span className="text-emerald-700 dark:text-emerald-400 font-black bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md ml-1">121%</span>
                </span>
                <span className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-slate-800 dark:text-slate-300 font-bold">
                  <strong className="text-slate-900 dark:text-white">VM2-I01.3</strong> Số lượng ý tưởng mới: <strong>36 Ý tưởng</strong> <span className="text-emerald-700 dark:text-emerald-400 font-black bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md ml-1">120%</span>
                </span>
                <span className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-slate-800 dark:text-slate-300 font-bold">
                  <strong className="text-slate-900 dark:text-white">VM2-I01.4</strong> Số lượng ý tưởng được chọn: <strong>16 Ý tưởng</strong> <span className="text-amber-700 dark:text-amber-400 font-black bg-amber-100 dark:bg-amber-500/20 px-2 py-0.5 rounded-md ml-1">89%</span>
                </span>
                <span className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-slate-800 dark:text-slate-300 font-bold">
                  <strong className="text-slate-900 dark:text-white">VM2-I01.5</strong> Tỷ lệ chọn ý tưởng: <strong>70%</strong> <span className="text-amber-700 dark:text-amber-400 font-black bg-amber-100 dark:bg-amber-500/20 px-2 py-0.5 rounded-md ml-1">88%</span>
                </span>
                <span className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-slate-800 dark:text-slate-300 font-bold">
                  <strong className="text-slate-900 dark:text-white">VM2-I01.6</strong> SL Kịch bản mới SX: <strong>10 Kịch bản</strong> <span className="text-emerald-700 dark:text-emerald-400 font-black bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md ml-1">91%</span>
                </span>
                <span className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-slate-800 dark:text-slate-300 font-bold">
                  <strong className="text-slate-900 dark:text-white">TM3-I01.03</strong> Số lượng video upload (nội dung): <strong>13 Video</strong> <span className="text-emerald-700 dark:text-emerald-400 font-black bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md ml-1">118%</span>
                </span>
                <span className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-white/10 px-3 py-1.5 rounded-lg text-slate-800 dark:text-slate-300 font-bold">
                  <strong className="text-slate-900 dark:text-white">TM3-I01.06</strong> View TB/1 nội dung mới upload: <strong>225,750 Views</strong> <span className="text-emerald-700 dark:text-emerald-400 font-black bg-emerald-100 dark:bg-emerald-500/20 px-2 py-0.5 rounded-md ml-1">105%</span>
                </span>
              </div>
            </div>

            {/* Ô NHẬP Ý KIẾN TRƯỞNG ĐƠN VỊ */}
            <div className="space-y-2 pt-1">
              <label className="text-xs font-black text-amber-600 dark:text-amber-300 block">
                💡 Ghi chú sự kiện vận hành đặc thù (Ý kiến Trưởng đơn vị):
              </label>
              <textarea
                value={reportNotes}
                onChange={(e) => setReportNotes(e.target.value)}
                placeholder="Ghi chú thêm các sự kiện vận hành đặc thù của riêng kỳ báo cáo này..."
                rows={2}
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-white/10 rounded-xl p-3 text-xs text-slate-900 dark:text-white font-bold focus:outline-none focus:border-amber-500 resize-none shadow-sm"
              />
              <div className="flex justify-end">
                <button
                  onClick={handleSaveNotes}
                  className="bg-indigo-700 hover:bg-indigo-600 text-white text-xs font-bold px-4 py-1.5 rounded-lg flex items-center gap-1.5 shadow"
                >
                  <Save size={14} /> Lưu ghi chú
                </button>
              </div>
            </div>
          </div>

          {/* KHỐI 3: HỘP THÔNG TIN YÊU CẦU GIẢI TRÌNH (BẮT BUỘC BỞI AI) (KHỚP 100% ẢNH 1) */}
          <div className="glass-panel p-5 space-y-4">
            <h3 className="text-sm font-black text-rose-400 tracking-wider uppercase flex items-center gap-2">
              ⚠️ KHỐI 3: HỘP THÔNG TIN YÊU CẦU GIẢI TRÌNH (BẮT BUỘC BỞI AI)
            </h3>
            <p className="text-xs text-slate-400">
              AI tự động phát hiện các chỉ số lỗi/bất thường dưới ngưỡng quy định. Bạn bắt buộc phải nhập giải trình trước khi gửi báo cáo.
            </p>

            <div className="bg-rose-950/20 border-2 border-rose-500 p-4 rounded-xl space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-extrabold text-rose-300 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-rose-500" /> 
                  Chỉ tiêu VM2-I01.01 – Số lượng video hoàn thành sản xuất (Đạt 73%)
                  <span className="bg-rose-500 text-white font-black text-[10px] px-2 py-0.5 rounded-full ml-2">
                    🔴 RỦI RO THÁNG RẤT CAO
                  </span>
                </span>
                <span className="text-[11px] text-rose-400 font-bold italic">
                  Yêu cầu giải trình bắt buộc
                </span>
              </div>
              <textarea
                value={explanations["VM2-I01.01"] || ""}
                onChange={(e) => setExplanations(prev => ({ ...prev, "VM2-I01.01": e.target.value }))}
                placeholder="Giải trình lý do cụ thể và đề xuất giải pháp tạm thời (tối thiểu 10 ký tự)..."
                rows={2}
                className="w-full bg-slate-950 border border-rose-500/40 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-rose-400 resize-none"
              />
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

          {/* KHỐI 4: GỢI Ý HÀNH ĐỘNG KỲ TIẾP THEO (AI-GENERATED ACTIONS) (KHỚP 100% ẢNH 2) */}
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

          {/* KHỐI 5: KHU VỰC TƯƠNG TÁC & PHÊ DUYỆT CỦA GIÁM ĐỐC BU SCVN (KHỚP 100% ẢNH 2) */}
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

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-300 font-black bg-slate-900/60 uppercase text-xs">
                    <th className="p-3 w-28 text-center">Mã chỉ tiêu</th>
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
                          <td colSpan={8} className="p-2.5 tracking-wider">
                            {groupName}
                          </td>
                        </tr>
                        {items.map(pk => {
                          const pct = pk.target > 0 ? Math.round((pk.actual / pk.target) * 100) : 100;
                          return (
                            <tr key={pk.code} className="border-b border-white/5 hover:bg-white/5 text-sm text-slate-200">
                              <td className="p-3 text-center">
                                <code className="bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono text-xs font-bold border border-sky-500/20">
                                  {pk.code}
                                </code>
                              </td>
                              <td className="p-3 font-bold text-white">{pk.title}</td>
                              <td className="p-3 text-center text-slate-400 font-bold text-xs">{pk.unit}</td>
                              <td className="p-3 italic text-slate-400 text-xs truncate max-w-[200px]" title={pk.formula}>
                                {pk.formula}
                              </td>
                              <td className="p-3 text-center font-extrabold text-sky-300 bg-sky-950/10">
                                {pk.target.toLocaleString()} {pk.unit}
                              </td>
                              <td className="p-3 text-center bg-purple-950/10">
                                <input
                                  type="number"
                                  value={pk.actual}
                                  disabled={isReadOnly}
                                  onChange={(e) => handleProdInputChange(pk.code, e.target.value)}
                                  className="w-28 bg-slate-950 border border-purple-500/40 text-white text-center font-black text-sm rounded-lg p-1.5 focus:outline-none focus:border-purple-400 shadow-inner"
                                />
                              </td>
                              <td className="p-3 text-center font-black text-sm">
                                <span className={pct < 80 ? "text-rose-400" : pct < 100 ? "text-amber-400" : "text-emerald-400"}>
                                  {pct}%
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleSaveProdRow(pk.code)}
                                  disabled={isReadOnly}
                                  className="bg-purple-700 hover:bg-purple-600 text-white text-xs font-black px-3.5 py-1.5 rounded-lg transition-all shadow-md"
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
