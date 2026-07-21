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
  Award
} from "lucide-react";

interface KpiItem {
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
  const { filters, currentLoggedUser } = useApp();

  // Tab State: "unit" vs "product"
  const [activeTab, setActiveTab] = useState<"unit" | "product">("unit");

  // Dòng sản phẩm đang chọn
  const [selectedProdId, setSelectedProdId] = useState<string>("p1");

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

  // Tự động reset sản phẩm khi đổi đơn vị ở Header
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

  // 2. Dữ liệu bảng chỉ tiêu cho từng Sản phẩm
  const defaultProductKpisMap: Record<string, ProductKpiItem[]> = {
    "p1": [
      { code: "SP-M1-01", title: "Doanh thu trực tiếp sản phẩm (Wolfoo 2D)", unit: "VNĐ", formula: "Doanh thu phát sinh từ sản phẩm", target: 45000000, actual: 48500000, group: "M1. TÀI CHÍNH / KINH DOANH" },
      { code: "SP-M1-02", title: "Tỷ suất lợi nhuận ROI sản phẩm", unit: "%", formula: "Lợi nhuận/Chi phí đầu tư sản phẩm", target: 15, actual: 16.5, group: "M1. TÀI CHÍNH / KINH DOANH" },
      { code: "SP-M2-01", title: "Sản lượng tập video hoàn thành", unit: "Tập", formula: "Tổng số tập video kết xuất đạt chuẩn", target: 8, actual: 9, group: "M2. SẢN PHẨM / SẢN XUẤT" },
      { code: "SP-M3-01", title: "Traffic tổng thể của dòng sản phẩm", unit: "Views", formula: "Lượt xem tích lũy của dòng sản phẩm", target: 12000000, actual: 13500000, group: "M3. KHÁCH HÀNG / TRAFFIC" },
      { code: "SP-M4-01", title: "Số kênh YouTube đạt ngưỡng 10k$", unit: "Kênh", formula: "Số kênh kinh doanh của sản phẩm", target: 2, actual: 2, group: "M4. KÊNH KINH DOANH" },
      { code: "SP-M5-01", title: "Thời gian chu kỳ sản xuất 1 tập", unit: "Ngày", formula: "Số ngày trung bình hoàn thành 1 tập", target: 4, actual: 3.8, group: "M5. QUẢN TRỊ VẬN HÀNH" },
      { code: "SP-M6-01", title: "Tỷ lệ nhân sự sản phẩm tham gia đào tạo AI", unit: "%", formula: "Số nhân sự đào tạo / Tổng nhân sự", target: 90, actual: 95, group: "M6. NHÂN SỰ TỔ CHỨC" },
      { code: "SP-M7-01", title: "Tỷ lệ không vi phạm quy trình sản xuất", unit: "%", formula: "Mức độ tuân thủ quy trình", target: 98, actual: 99.5, group: "M7. VĂN HÓA DOANH NGHIỆP" },
    ],
    "p2": [
      { code: "SP-M1-01", title: "Doanh thu trực tiếp sản phẩm (Wolfoo 3D)", unit: "VNĐ", formula: "Doanh thu phát sinh từ sản phẩm", target: 30000000, actual: 27000000, group: "M1. TÀI CHÍNH / KINH DOANH" },
      { code: "SP-M1-02", title: "Tỷ suất lợi nhuận ROI sản phẩm", unit: "%", formula: "Lợi nhuận/Chi phí", target: 12, actual: 10, group: "M1. TÀI CHÍNH / KINH DOANH" },
      { code: "SP-M2-01", title: "Sản lượng tập video 3D hoàn thành", unit: "Tập", formula: "Số tập 3D kết xuất", target: 4, actual: 4, group: "M2. SẢN PHẨM / SẢN XUẤT" },
      { code: "SP-M3-01", title: "Traffic tổng thể của dòng 3D", unit: "Views", formula: "Lượt xem tích lũy", target: 5000000, actual: 4800000, group: "M3. KHÁCH HÀNG / TRAFFIC" },
    ],
    "p4": [
      { code: "SP-M1-01", title: "Doanh thu dự án Lego Automation", unit: "VNĐ", formula: "Doanh thu phát sinh", target: 20000000, actual: 18500000, group: "M1. TÀI CHÍNH / KINH DOANH" },
      { code: "SP-M2-01", title: "Số tập Lego hoàn thành", unit: "Tập", formula: "Số tập Lego kết xuất", target: 6, actual: 6, group: "M2. SẢN PHẨM / SẢN XUẤT" },
      { code: "SP-M3-01", title: "Traffic kênh Lego", unit: "Views", formula: "Views tích lũy", target: 3000000, actual: 2900000, group: "M3. KHÁCH HÀNG / TRAFFIC" },
    ],
    "p5": [
      { code: "SP-M1-01", title: "Doanh thu dự án Lego AI 100%", unit: "VNĐ", formula: "Doanh thu phát sinh", target: 15000000, actual: 6500000, group: "M1. TÀI CHÍNH / KINH DOANH" },
      { code: "SP-M2-01", title: "Số tập Lego AI hoàn thành", unit: "Tập", formula: "Số tập kết xuất", target: 10, actual: 5, group: "M2. SẢN PHẨM / SẢN XUẤT" },
      { code: "SP-M3-01", title: "Traffic kênh Lego AI", unit: "Views", formula: "Views tích lũy", target: 2000000, actual: 800000, group: "M3. KHÁCH HÀNG / TRAFFIC" },
    ],
    "p8": [
      { code: "SP-M1-01", title: "Doanh thu Game Web/App", unit: "VNĐ", formula: "Doanh thu phát sinh", target: 25000000, actual: 8750000, group: "M1. TÀI CHÍNH / KINH DOANH" },
      { code: "SP-M2-01", title: "Số tính năng game mới", unit: "Tính năng", formula: "Tính năng phát hành", target: 5, actual: 2, group: "M2. SẢN PHẨM / SẢN XUẤT" },
      { code: "SP-M3-01", title: "Lượt tải Game (Downloads)", unit: "Lượt", formula: "Lượt cài đặt mới", target: 50000, actual: 18000, group: "M3. KHÁCH HÀNG / TRAFFIC" },
    ]
  };

  const [kpis, setKpis] = useState<KpiItem[]>(defaultWolfooKpis);
  const [productKpis, setProductKpis] = useState<ProductKpiItem[]>(defaultProductKpisMap["p1"]);
  const [productNote, setProductNote] = useState("");

  const [reportNotes, setReportNotes] = useState("");
  const [reportStatus, setReportStatus] = useState("Đang nhập");
  const [explanations, setExplanations] = useState<Record<string, string>>({
    "VM2-I01.01": "Giải trình do nhân sự thiết kế chính xin nghỉ 3 ngày giữa tuần ảnh hưởng tốc độ kết xuất."
  });
  
  const [actions, setActions] = useState<ActionItem[]>([
    { id: 1, title: "Chuẩn hóa thư viện asset dùng chung để đẩy nhanh tốc độ diễn hoạt", indicator: "VM2-I01.01", impact: "Tăng sản lượng thêm 2 tập/tuần", status: "Chờ quyết định" }
  ]);

  const [productActions, setProductActions] = useState<ActionItem[]>([
    { id: 101, title: "Áp dụng công cụ AI sinh phông nền tự động cho Wolfoo 2D", indicator: "SP-M2-01", impact: "Tăng 20% tốc độ sản xuất", status: "Chờ quyết định" }
  ]);

  const [directorComment, setDirectorComment] = useState("");
  const isReadOnly = currentLoggedUser?.role === "Người dùng";

  // Cập nhật dữ liệu khi đổi sản phẩm được chọn
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

  const handleSaveRow = (code: string) => {
    if (isReadOnly) return;
    alert(`✓ Đã lưu tạm dữ liệu của chỉ tiêu: ${code}`);
  };

  const handleSaveProdRow = (code: string) => {
    if (isReadOnly) return;
    alert(`✓ Đã lưu thành công dữ liệu sản phẩm cho chỉ tiêu: ${code}`);
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

  const handleAddCustomAction = () => {
    if (isReadOnly) return;
    const title = prompt("Nhập tên hành động đơn vị:") || "";
    if (!title) return;
    setActions(prev => [
      ...prev,
      { id: Date.now(), title, indicator: "KPI Đơn vị", impact: "Tăng trưởng hiệu suất", status: "Chờ quyết định" }
    ]);
  };

  const handleSendReport = () => {
    setReportStatus("Chờ duyệt");
    alert("🚀 Đã gửi báo cáo lên Giám đốc BU SCVN duyệt thành công!");
  };

  const failedKpis = kpis.filter(k => k.target > 0 && (k.actual / k.target) < 0.8);

  // Grouping
  const groups = Array.from(new Set(kpis.map(k => k.group)));
  const prodGroups = Array.from(new Set(productKpis.map(k => k.group)));

  // Thuật toán Tính Điểm PSH
  const isWeekly = filters.periodType === "weekly";

  // 1. Tính toán PSH Vận Hành Tuần
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

  // 2. Tính toán PSH 7M Chính thức (Tháng/Quý/Năm)
  const calcOfficialPHS = (items: ProductKpiItem[]) => {
    const rev = items.find(i => i.code.includes("M1"));
    const vol = items.find(i => i.code.includes("M2"));
    const view = items.find(i => i.code.includes("M3"));
    const channel = items.find(i => i.code.includes("M4"));
    const time = items.find(i => i.code.includes("M5"));
    const hr = items.find(i => i.code.includes("M6"));
    const chi = items.find(i => i.code.includes("M7"));

    const rRev = rev && rev.target > 0 ? Math.min(1.2, rev.actual / rev.target) * 100 : 100;
    const rRoi = 95;
    const rCost = 100;
    const fhi = 0.6 * rRev + 0.3 * rRoi + 0.1 * rCost;

    const rVol = vol && vol.target > 0 ? Math.min(1.2, vol.actual / vol.target) * 100 : 100;
    const rTime = time && time.actual > 0 ? Math.min(1.2, time.target / time.actual) * 100 : 100;
    const ohi = 0.7 * rVol + 0.3 * rTime;

    const rView = view && view.target > 0 ? Math.min(1.2, view.actual / view.target) * 100 : 100;
    const rChannel = channel && channel.target > 0 ? Math.min(1.2, channel.actual / channel.target) * 100 : 100;
    const qci = 0.2 * 100 + 0.6 * rView + 0.2 * rChannel;

    const rhi = hr ? Math.min(1.2, hr.actual / hr.target) * 100 : 95;
    const chiVal = chi ? Math.min(1.2, chi.actual / chi.target) * 100 : 99;

    const phs = Math.round(0.4 * fhi + 0.3 * ohi + 0.2 * qci + 0.05 * rhi + 0.05 * chiVal);

    let status = "🟢 XANH LÁ (Khỏe mạnh / On track)";
    let isVeto = false;
    let badgeColor = "bg-emerald-500/20 text-emerald-400 border-emerald-500/30";

    if (fhi < 60 || ohi < 60 || phs < 70) {
      status = "🔴 ĐỎ (Nguy kịch / Critical)";
      badgeColor = "bg-rose-500/20 text-rose-400 border-rose-500/30";
      if (fhi < 60 || ohi < 60) isVeto = true;
    } else if (phs < 90) {
      status = "🟡 VÀNG (Cảnh báo / At risk)";
      badgeColor = "bg-amber-500/20 text-amber-400 border-amber-500/30";
    }

    return { 
      phs, 
      fhi: Math.round(fhi), 
      ohi: Math.round(ohi), 
      qci: Math.round(qci), 
      rhi: Math.round(rhi), 
      chi: Math.round(chiVal), 
      status, 
      isVeto,
      badgeColor
    };
  };

  const weeklyPHSInfo = calcWeeklyPHS(productKpis);
  const officialPHSInfo = calcOfficialPHS(productKpis);

  // Bảng xếp hạng PSH so sánh nội bộ đơn vị
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
      <div className="flex bg-slate-900/80 p-1.5 rounded-xl border border-white/10 w-full md:w-fit self-start shadow-lg">
        <button
          onClick={() => setActiveTab("unit")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-black transition-all ${
            activeTab === "unit"
              ? "bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Building2 size={15} /> 🏢 BÁO CÁO KẾT QUẢ THEO ĐƠN VỊ ({filters.unitCode})
        </button>
        <button
          onClick={() => setActiveTab("product")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-black transition-all ${
            activeTab === "product"
              ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)]"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Film size={15} /> 🎬 BÁO CÁO KẾT QUẢ THEO SẢN PHẨM
        </button>
      </div>

      {/* ==================== TAB 1: BÁO CÁO KẾT QUẢ THEO ĐƠN VỊ ==================== */}
      {activeTab === "unit" && (
        <>
          {/* KHU VỰC 1: BẢNG NHẬP LIỆU CHỈ SỐ KPI THỰC TẾ */}
          <div className="glass-panel p-5">
            <h3 className="text-sm font-bold text-[#10b981] tracking-wider uppercase mb-4 flex items-center gap-2">
              <Building2 size={16} /> KHU VỰC 1: BẢNG NHẬP LIỆU CHỈ SỐ KPI THỰC TẾ ({isWeekly ? "HÀNG TUẦN" : "ĐỊNH KỲ"}) - BỘ PHẬN: {filters.unitCode.toUpperCase()}
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[var(--text-muted)] font-bold bg-slate-900/60">
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
                        <tr className="bg-slate-900/40 text-[var(--accent-cyan)] font-extrabold border-b border-white/5">
                          <td colSpan={9} className="p-2.5 uppercase text-[10px] tracking-wider">
                            {groupName}
                          </td>
                        </tr>
                        {groupItems.map(kpi => {
                          const pct = Math.round((kpi.actual / kpi.target) * 100);
                          return (
                            <tr key={kpi.code} className="border-b border-white/5 hover:bg-white/5 text-[11px] text-[var(--text-muted)]">
                              <td className="p-3">
                                <code className="bg-white/5 px-1.5 py-0.5 rounded text-[10px] text-white font-mono">{kpi.code}</code>
                              </td>
                              <td className="p-3 text-white font-medium">{kpi.title}</td>
                              <td className="p-3 text-center">{kpi.unit}</td>
                              <td className="p-3 italic text-slate-400 font-medium truncate max-w-[200px]" title={kpi.formula}>
                                {kpi.formula}
                              </td>
                              <td className="p-3 text-center font-semibold text-slate-300">
                                {kpi.target.toLocaleString()} {kpi.unit}
                              </td>
                              <td className="p-3 text-center">
                                <input
                                  type="number"
                                  value={kpi.actual}
                                  disabled={isReadOnly || reportStatus === "Chờ duyệt"}
                                  onChange={(e) => handleInputChange(kpi.code, e.target.value)}
                                  className="w-24 bg-slate-950 border border-[var(--glass-border)] text-white text-center text-xs font-bold rounded p-1 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                                />
                              </td>
                              <td className="p-3 text-center font-bold">
                                <span className={pct < 80 ? "text-rose-400" : pct < 100 ? "text-amber-400" : "text-emerald-400"}>
                                  {pct}%
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded border border-white/5 font-semibold">
                                  {kpi.status}
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleSaveRow(kpi.code)}
                                  disabled={isReadOnly}
                                  className="bg-indigo-600/80 hover:bg-indigo-600 text-white text-[10px] font-bold px-2.5 py-1 rounded transition-all shadow"
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

          {/* KHU VỰC 2 & 3: AI DỰ BÁO & GIẢI TRÌNH ĐƠN VỊ */}
          <div className="glass-panel p-5 space-y-4">
            <h3 className="text-sm font-bold text-sky-400 tracking-wider uppercase flex items-center gap-2">
              <Sparkles size={16} /> KHU VỰC 2 & 3: ĐÁNH GIÁ AI & BÁO CÁO GIẢI TRÌNH BỘ PHẬN
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-white/5">
              💡 <strong>AI Agent tổng hợp:</strong> Bộ phận {filters.unitCode} đạt tiến độ <strong>90% doanh thu</strong> và <strong>78% traffic</strong>. Có 1 chỉ tiêu đạt &lt; 80% kế hoạch cần giải trình lý do thực tế.
            </p>

            {failedKpis.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle size={14} /> YÊU CẦU GIẢI TRÌNH CHỈ TIÊU LỖI (&lt; 80%)
                </h4>
                {failedKpis.map(fk => (
                  <div key={fk.code} className="bg-rose-950/20 border border-rose-500/20 p-3 rounded-xl flex flex-col gap-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-rose-300">{fk.code} - {fk.title}</span>
                      <span className="text-rose-400 font-black">
                        Thực tế: {fk.actual} / KH: {fk.target} ({Math.round((fk.actual / fk.target) * 100)}%)
                      </span>
                    </div>
                    <textarea
                      value={explanations[fk.code] || ""}
                      onChange={(e) => setExplanations(prev => ({ ...prev, [fk.code]: e.target.value }))}
                      placeholder="Nhập nguyên nhân khách quan/chủ quan khiến chỉ tiêu không đạt..."
                      rows={2}
                      className="w-full bg-slate-950 border border-rose-500/30 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-rose-400"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KHU VỰC 4 & 5: ACTIONS & DUYỆT BÁO CÁO ĐƠN VỊ */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-purple-400 tracking-wider uppercase flex items-center gap-2">
                <Send size={16} /> KHU VỰC 4 & 5: KẾ HOẠCH HÀNH ĐỘNG & GỬI BÁO CÁO ĐƠN VỊ
              </h3>
              <button
                onClick={handleSendReport}
                disabled={reportStatus === "Chờ duyệt"}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs px-5 py-2 rounded-lg shadow-lg transition-all"
              >
                🚀 Gửi Báo Cáo Đơn Vị Phê Duyệt
              </button>
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
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-300 font-bold bg-slate-900/60 uppercase text-[10px]">
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
                        <tr className="bg-slate-900/50 text-sky-400 font-black border-b border-white/5 uppercase text-[10px]">
                          <td colSpan={8} className="p-2.5 tracking-wider">
                            {groupName}
                          </td>
                        </tr>
                        {items.map(pk => {
                          const pct = pk.target > 0 ? Math.round((pk.actual / pk.target) * 100) : 100;
                          return (
                            <tr key={pk.code} className="border-b border-white/5 hover:bg-white/5 text-xs text-slate-200">
                              <td className="p-3 text-center">
                                <code className="bg-slate-800 text-sky-400 px-2 py-0.5 rounded font-mono text-[11px] border border-sky-500/20">
                                  {pk.code}
                                </code>
                              </td>
                              <td className="p-3 font-semibold text-white">{pk.title}</td>
                              <td className="p-3 text-center text-slate-400 font-bold">{pk.unit}</td>
                              <td className="p-3 italic text-slate-400 text-[11px] truncate max-w-[200px]" title={pk.formula}>
                                {pk.formula}
                              </td>
                              <td className="p-3 text-center font-bold text-sky-300 bg-sky-950/10">
                                {pk.target.toLocaleString()} {pk.unit}
                              </td>
                              <td className="p-3 text-center bg-purple-950/10">
                                <input
                                  type="number"
                                  value={pk.actual}
                                  disabled={isReadOnly}
                                  onChange={(e) => handleProdInputChange(pk.code, e.target.value)}
                                  className="w-28 bg-slate-950 border border-purple-500/40 text-white text-center font-black rounded-lg p-1.5 focus:outline-none focus:border-purple-400 shadow-inner"
                                />
                              </td>
                              <td className="p-3 text-center font-black">
                                <span className={pct < 80 ? "text-rose-400" : pct < 100 ? "text-amber-400" : "text-emerald-400"}>
                                  {pct}%
                                </span>
                              </td>
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleSaveProdRow(pk.code)}
                                  disabled={isReadOnly}
                                  className="bg-purple-700 hover:bg-purple-600 text-white text-[10px] font-black px-3 py-1.5 rounded-lg transition-all shadow-md"
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
                  {!isWeekly && officialPHSInfo.isVeto && (
                    <p className="text-[10px] text-rose-400 font-bold mt-1">
                      ⚠️ Bị Phủ quyết (Veto): Sức khỏe Tài chính (FHI) hoặc Vận hành (OHI) &lt; 60%!
                    </p>
                  )}
                </div>
              </div>

              {/* Card 2: AI Dự Phóng Cuối Tháng (Nếu chọn Báo cáo Tuần) hoặc Phân rã 5 chỉ số 7M */}
              {isWeekly ? (
                <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-indigo-500 bg-indigo-950/30">
                  <div>
                    <span className="text-[10px] font-black text-indigo-300 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                      <Sparkles size={14} /> 🔮 AI DỰ PHÓNG PSH CUỐI THÁNG (RUN-RATE)
                    </span>
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-black text-indigo-200">
                        {weeklyPHSInfo.projectedMonthlyPHS}đ
                      </span>
                      <span className="text-xs text-indigo-300">Dự báo ngày 30/31</span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px] pt-3 text-indigo-200 border-t border-indigo-500/20">
                    <div className="flex justify-between">
                      <span>• Nhịp chạy Doanh thu tuần:</span>
                      <strong className="text-white">{weeklyPHSInfo.rRev}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>• Nhịp chạy Sản lượng video:</span>
                      <strong className="text-white">{weeklyPHSInfo.rVol}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>• Nhịp chạy Traffic Views:</span>
                      <strong className="text-white">{weeklyPHSInfo.rView}%</strong>
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

          {/* KHỐI 4 & 5: ACTIONS VÀ DÙYỆT BÁO CÁO SẢN PHẨM */}
          <div className="glass-panel p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-black text-indigo-400 tracking-wider uppercase flex items-center gap-2">
                ⚡ KHỐI 4: ĐỀ XUẤT HÀNH ĐỘNG CẢI TIẾN PSH SẢN PHẨM
              </h3>
              <button
                onClick={handleAddCustomAction}
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
