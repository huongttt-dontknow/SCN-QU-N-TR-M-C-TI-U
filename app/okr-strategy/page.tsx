"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import { 
  Target, 
  User, 
  X,
  TrendingUp,
  CheckCircle2,
  Plus,
  Save,
  GitBranch,
  Bot
} from "lucide-react";

// Types
interface ActionItem {
  id: string;
  title: string;
  pic: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: string;
  notes?: string;
}

interface KeyResultItem {
  id: string;
  title: string;
  weight: number;
  progress: number;
  priority: string; // High, Medium, Low
  pic: string;
  deadline: string;
  actions: ActionItem[];
  notes?: string;
}

interface ObjectiveItem {
  id: string;
  title: string;
  weight: number;
  progress: number;
  aiForecastProgress: number;
  aiRiskLevel: string; // Thấp, Cao, Rất cao
  keyResults: KeyResultItem[];
  aiAssessment?: string;
}

interface UnplannedAction {
  id: string;
  title: string;
  origin: string; // AI Review, Chỉ đạo BLĐ, Khác
  startDate: string;
  deadline: string;
  pic: string;
  progress: number;
  notes: string;
  evaluation: string;
}

// Strategy data definitions
interface StrategyItem {
  id: string;
  title: string;
  justification: string;
  initiatives?: string[];
  description?: string[];
  expectations: string;
}

const TCT_STRATEGIES: StrategyItem[] = [
  {
    id: "tct-1",
    title: "PHƯƠNG ÁN 1: TẬP TRUNG NGUỒN LỰC VÀO BA LĨNH VỰC CỐT LÕI",
    justification: "Tối ưu hóa việc sử dụng nguồn lực sau tái cấu trúc để tạo dòng tiền mạnh và bứt phá nhanh. Áp dụng Nguyên tắc 80/20 và Nguyên tắc Lãnh đạo \"Sử dụng Nguồn lực Hiệu quả\".",
    initiatives: [
      "Tập trung nguồn lực chính vào 3 dòng cốt lõi: Nội dung số (S2), Dịch vụ Nhà sáng tạo (S4), Dịch vụ Nhãn hàng/Truyền thông (S4).",
      "Ưu tiên triển khai nền tảng AIVA sâu nhất tại các lĩnh vực này để tạo hình mẫu thành công."
    ],
    expectations: "Đóng góp >90% tổng doanh thu và lợi nhuận; Đạt mục tiêu tăng trưởng +80% với tỷ suất lợi nhuận +15%."
  },
  {
    id: "tct-2",
    title: "PHƯƠNG ÁN 2: ĐỘT PHÁ NỀN TẢNG CÔNG NGHỆ AIVA",
    justification: "AIVA là nền tảng cốt lõi cho Scaling, giải quyết bài toán năng suất, chất lượng và tái thiết lợi thế cạnh tranh.",
    initiatives: [
      "AIVA-C (Creative & Production): Triển khai Siêu trợ lý AI toàn chuỗi giá trị sáng tạo và sản xuất (Kịch bản, Thiết kế, Diễn hoạt...). Hoàn thiện Platform Animation Studio Aiva, tự động hóa >80% tác vụ lặp lại.",
      "AIVA-O (Organizational Operations): Hoàn thiện Digital COO, tự động hóa 100% Shared Services (TCKT, NS), tối ưu hóa Kinh doanh/Marketing.",
      "AIVA-P (Personal & Development): Triển khai Siêu trợ lý cá nhân cho 100% Quản lý, xây dựng Hệ thống Đào tạo Thông minh."
    ],
    expectations: "Đạt mục tiêu tăng trưởng năng suất sản xuất 200%; Giảm thời gian chu kỳ quyết định <24h."
  },
  {
    id: "tct-3",
    title: "PHƯƠNG ÁN 3: CẢI TIẾN CƠ CHẾ THU NHẬP TẠO SỰ MINH BẠCH THÚC ĐẨY ĐỘNG LỰC LÀM VIỆC MẠNH MẼ",
    justification: "Chuyển dịch từ trả lương theo Thời gian/Công sức sang bảo vệ thu nhập và Chia sẻ Giá trị Thực tế (Value-Sharing). Biến chi phí lương cố định thành Chi phí biến đổi (Variable Cost) tỷ lệ thuận với doanh thu, đảm bảo an toàn dòng tiền.",
    description: [
      "Chuẩn hóa mô hình Thu nhập 3P",
      "Minh bạch 06 dòng thu nhập",
      "Công cụ: \"Total Rewards Dashboard\" trên AIVA – Minh bạch hóa thu nhập theo thời gian thực."
    ],
    expectations: "Tăng năng suất 200%, giữ chân nhân tài hiệu suất cao và kiến tạo văn hóa sòng phẳng."
  },
  {
    id: "tct-4",
    title: "PHƯƠNG ÁN 4: GIỮ VỮNG BẢN SẮC VĂN HOÁ VÀ KIẾN TẠO VĂN HOÁ MỚI AI-FIRST",
    justification: "Cân bằng \"Tư duy Nghịch lý\". Đảm bảo công nghệ phục vụ văn hóa và ngược lại. Đưa tư duy Dữ liệu và Quy trình thành bản năng của tổ chức.",
    initiatives: [
      "Tái khẳng định Giá trị Cốt lõi: Nhấn mạnh \"Kỷ luật\" và \"Sáng tạo\", \"Khát vọng phát triển\" là bản sắc văn hoá Sconnect.",
      "Kiến tạo văn hóa AI-First: Tư duy \"Mặc định là Tự động\", Ra quyết định dựa trên Dữ liệu (Data-Driven), và Cộng hưởng Người-Máy (Synergy).",
      "Thực thi 10 Nguyên tắc Lãnh đạo: Lãnh đạo làm gương về hiệu quả và đơn giản hóa."
    ],
    expectations: "Tỷ lệ chấp nhận và sử dụng thành thạo AIVA >90%; Duy trì môi trường hiệu suất cao."
  },
  {
    id: "tct-5",
    title: "PHƯƠNG ÁN 5: CHUẨN HÓA QUẢN TRỊ CHIẾN LƯỢC VÀ MỤC TIÊU",
    justification: "Thực thi triệt để \"Làm TRÒN\". Đảm bảo sự kỷ luật trong thực thi thông qua các công cụ quản trị hiện đại, làm nền tảng cho AIVA vận hành.",
    initiatives: [
      "Quản trị Chiến lược: Bắt buộc sử dụng Project Charter cho mọi nhiệm vụ chiến lược. Vận hành nghiêm ngặt theo chu trình PDCA, giám sát bởi PMO và AIVA-O.",
      "Quản trị Mục tiêu: Vận hành triệt để Triết lý Bánh xe Mục tiêu (Phân biệt rõ OKRs cho Làm LỚN và KPIs Cam kết cho Làm TRÒN).",
      "Quản trị Hiệu suất Liên tục (CPM): Chuyển đổi Check-in thành các phiên huấn luyện."
    ],
    expectations: "Tỷ lệ hoàn thành Nhiệm vụ Chiến lược >90%; Văn hóa Trách nhiệm Giải trình được thực thi mạnh mẽ."
  },
  {
    id: "tct-6",
    title: "PHƯƠNG ÁN 6: TÁI ĐỊNH VỊ KHUNG NĂNG LỰC AI-NATIVE",
    justification: "Chuẩn bị nguồn nhân lực cho mô hình vận hành mới. Chuyển dịch vai trò con người từ \"thực thi\" sang \"Đối tác với AI\" và \"sáng tạo cấp cao\".",
    initiatives: [
      "Tái thiết kế Khung Năng lực: Đưa \"Năng lực AI và Dữ liệu\" thành năng lực cốt lõi bắt buộc.",
      "Chuyển dịch Vai trò: Cập nhật 100% JDs để phản ánh vai trò mới (Phân tích, Sáng tạo, Quản trị AI).",
      "Tái đào tạo (Reskilling): Chương trình đào tạo bắt buộc về nền tảng AIVA cho 100% nhân sự (phối hợp SAMA)."
    ],
    expectations: "Mức độ Trưởng thành Cộng hưởng Người-AI đạt Level 3 (Partner); Kiến tạo đội ngũ nhân tài sẵn sàng cho tương lai."
  }
];

const SCVN_STRATEGIES: StrategyItem[] = [
  {
    id: "scvn-1",
    title: "PHƯƠNG ÁN 1: Tối Đa Hóa Hiệu Suất Doanh Thu Đa Nền Tảng",
    justification: "Triển khai chiến lược đa nền tảng nhất quán để tối đa hóa khả năng tiếp cận thị trường và tăng trưởng doanh thu trên nhiều kênh kinh doanh mới.",
    initiatives: [
      "Thiết lập cơ chế phân phối sản phẩm đa kênh",
      "Khảo sát và mở rộng thị trường nội dung số quốc tế"
    ],
    expectations: "Tối đa hóa khả năng tiếp cận thị trường và tăng trưởng doanh thu."
  },
  {
    id: "scvn-2",
    title: "PHƯƠNG ÁN 2: Hoàn Thiện Quy Trình & Công Nghệ AIVA",
    justification: "Xây dựng và triển khai hệ thống quy trình sản xuất hoàn chỉnh, tích hợp công nghệ AIVA để tối ưu hóa hiệu suất và chất lượng sản phẩm.",
    initiatives: [
      "Ứng dụng Platform Animation Studio Aiva",
      "Tự động hóa các tác vụ thiết kế và diễn hoạt lặp lại"
    ],
    expectations: "Tối ưu hóa hiệu suất sản xuất và nâng cao chất lượng sản phẩm."
  },
  {
    id: "scvn-3",
    title: "PHƯƠNG ÁN 3: Phái Sinh Sản Phẩm Kinh Doanh Mới",
    justification: "Tận dụng nguồn tài sản nội dung có sẵn để phát triển các sản phẩm, dịch vụ mới và tạo ra các nguồn doanh thu bổ sung.",
    initiatives: [
      "Phát triển sản phẩm thương mại phái sinh từ IP Wolfoo",
      "Đẩy mạnh các hoạt động hợp tác nhãn hàng thương mại"
    ],
    expectations: "Tạo ra các dòng doanh thu bổ sung vững chắc từ tài sản số."
  },
  {
    id: "scvn-4",
    title: "PHƯƠNG ÁN 4: Phát Triển Năng Lực Sáng Tạo AI",
    justification: "Thúc đẩy năng lực chuyên về sáng tạo và sử dụng công cụ AI, đặt nền tảng cho sự đổi mới và tăng trưởng bền vững.",
    initiatives: [
      "Đào tạo kỹ năng làm việc cộng hưởng Người-AI",
      "Xây dựng đội ngũ nhân sự sáng tạo AI-First thế hệ mới"
    ],
    expectations: "Đặt nền tảng cho sự đổi mới liên tục và tăng trưởng bền vững."
  }
];

const renderFormattedAiText = (text: string, theme: string) => {
  if (!text) return null;
  if (text.startsWith("Chưa có nhận định")) {
    return <span className={theme === "light" ? "text-slate-500 font-medium" : "text-slate-400"}>{text}</span>;
  }

  // Split key phrases to apply colors (red/purple) for highlighting key metrics
  const parts = text.split(/(AI Agent nhận định:|TỐT|90%|95%|Đề xuất:|chuẩn hóa kho asset 3D)/g);
  return (
    <span className={theme === "light" ? "text-slate-700 font-semibold" : "text-slate-300"}>
      {parts.map((part, i) => {
        if (part === "AI Agent nhận định:") {
          return <span key={i} className="text-purple-600 dark:text-purple-400 font-black">{part}</span>;
        }
        if (part === "TỐT") {
          return <span key={i} className="text-emerald-600 dark:text-emerald-400 font-extrabold">{part}</span>;
        }
        if (part === "90%" || part === "95%") {
          return <span key={i} className="text-rose-600 dark:text-rose-400 font-black">{part}</span>;
        }
        if (part === "Đề xuất:") {
          return <span key={i} className="text-indigo-600 dark:text-indigo-400 font-black">{part}</span>;
        }
        if (part === "chuẩn hóa kho asset 3D") {
          return <span key={i} className="text-purple-600 dark:text-purple-400 font-black">{part}</span>;
        }
        return part;
      })}
    </span>
  );
};

export default function OkrStrategyPage() {
  const { filters, currentLoggedUser, setCurrentLoggedUser, theme } = useApp();
  const isCorporateLevel = filters.unitCode === "TCT" || filters.unitCode === "SCVN";
  
  // Tab chính của Phân hệ 5
  const [activeTab, setActiveTab] = useState<"5.1" | "5.2" | "5.3" | "5.4">("5.2");
  
  // Tab phụ của Module 5.1
  const [tab51Sub, setTab51Sub] = useState<"pillars" | "setup">("setup");
  const effectiveSubTab = isCorporateLevel ? tab51Sub : "setup";

  const [objectives, setObjectives] = useState<ObjectiveItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedKr, setExpandedKr] = useState<Record<string, boolean>>({});

  // States cho Module 5.2 Cập nhật & Theo dõi
  const [unplannedActions, setUnplannedActions] = useState<UnplannedAction[]>([
    {
      id: "unplan-1",
      title: "Cài đặt bổ sung Server dự phòng cho cụm render Wolfoo 3D",
      origin: "Chỉ đạo BLĐ",
      startDate: "2026-07-05",
      deadline: "2026-07-20",
      pic: "Trần Anh Tuấn",
      progress: 90,
      notes: "Đã cấu hình xong 4/5 server node",
      evaluation: "Tốt, kịp thời xử lý nghẽn render"
    }
  ]);

  const [aiAssessments, setAiAssessments] = useState<Record<string, string>>({});
  const [isAiAssessing, setIsAiAssessing] = useState<Record<string, boolean>>({});

  // Modals cho Module 5.1 & 5.2
  const [isObjModalOpen, setIsObjModalOpen] = useState(false);
  const [isKrModalOpen, setIsKrModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isUnplannedModalOpen, setIsUnplannedModalOpen] = useState(false);

  // States cho Sửa OKRs
  const [editingObjId, setEditingObjId] = useState<string | null>(null);
  const [editingKrId, setEditingKrId] = useState<string | null>(null);

  // Active parent IDs
  const [activeObjId, setActiveObjId] = useState("");
  const [activeKrId, setActiveKrId] = useState("");

  // Objective Form States
  const [objTitle, setObjTitle] = useState("");
  const [objWeight, setObjWeight] = useState("35");

  // KR Form States
  const [krTitle, setKrTitle] = useState("");
  const [krWeight, setKrWeight] = useState("50");
  const [krPriority, setKrPriority] = useState("High");
  const [krPic, setKrPic] = useState("");
  const [krDeadline, setKrDeadline] = useState("");

  // Action Form States
  const [actionTitle, setActionTitle] = useState("");
  const [actionPic, setActionPic] = useState("");
  const [actionStart, setActionStart] = useState("");
  const [actionEnd, setActionEnd] = useState("");

  // Unplanned Action Form States
  const [unplanTitle, setUnplanTitle] = useState("");
  const [unplanOrigin, setUnplanOrigin] = useState("Chỉ đạo BLĐ");
  const [unplanPic, setUnplanPic] = useState("");
  const [unplanStart, setUnplanStart] = useState("");
  const [unplanDeadline, setUnplanDeadline] = useState("");

  // Module 5.3 Reflection States
  const [reflectionStep, setReflectionStep] = useState(1);
  const [whysChat, setWhysChat] = useState<{ role: "ai" | "user"; text: string }[]>([
    { role: "ai", text: "Xin chào TĐV! AI nhận thấy KR 'Mở rộng kênh Tiktok Beta' đạt tiến độ 10% (Chậm tiến độ). Hãy chọn nhóm nguyên nhân chính ảnh hưởng đến chỉ tiêu này:" }
  ]);
  const [selectedCauseGroup, setSelectedCauseGroup] = useState("");
  const [whyInput, setWhyInput] = useState("");
  const [reflectionAnswers, setReflectionAnswers] = useState({
    q1_result: "Kết quả chưa đạt kỳ vọng do khâu duyệt kịch bản kéo dài",
    q3_actions: "Hành động chuẩn hóa thư viện đã xong nhưng chưa áp dụng triệt để",
    q4_nextPlan: "Tập trung mở rộng 5 kênh Tiktok Beta mới và tự động hóa khâu đăng clip"
  });

  // Check editable permission
  const isEditable = 
    currentLoggedUser?.role === "Admin" || 
    currentLoggedUser?.role === "Quản trị viên" || 
    (currentLoggedUser?.role === "Trưởng đơn vị" && currentLoggedUser?.unitCode === filters.unitCode);

  const fetchOkrs = async () => {
    setLoading(true);
    try {
      const periodKey = (filters.periodType === "weekly" || filters.periodType === "monthly") 
        ? "M" + filters.month 
        : filters.quarter;
      const res = await fetch(`/api/okrs?unitCode=${filters.unitCode}&period=${periodKey}_${filters.year}`);
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        setObjectives(data);
      } else {
        // Mock data khớp 100% hình ảnh nguyên mẫu của người dùng nếu DB trống
        setObjectives([
          {
            id: "obj-mock-1",
            title: "Tối ưu hóa chi phí vận hành hệ thống sản xuất và nâng tỷ lệ tái sử dụng assets Wolfoo",
            weight: 35,
            progress: 90,
            aiForecastProgress: 92,
            aiRiskLevel: "Thấp",
            keyResults: [
              {
                id: "kr-mock-1",
                title: "Tái sử dụng trên 60% assets (background, nhân vật, đạo cụ) trong sản xuất phim mới",
                weight: 50,
                progress: 80,
                priority: "High",
                pic: "Nguyễn Văn A",
                deadline: "2026-09-30",
                notes: "Đã phân loại xong kho asset 3D, đang gắn tag metadata.",
                actions: [
                  {
                    id: "act-mock-1",
                    title: "Chuẩn hóa và gắn tag siêu dữ liệu cho 500 assets dùng chung",
                    pic: "Trần Thị B",
                    startDate: "2026-07-01",
                    endDate: "2026-07-15",
                    progress: 100,
                    status: "Hoàn thành",
                    notes: "Đã gắn tag xong cho 520 assets."
                  },
                  {
                    id: "act-mock-2",
                    title: "Tổ chức kiểm định chất lượng asset hàng tuần trước khi up lên kho dùng chung",
                    pic: "Phạm Văn C",
                    startDate: "2026-07-05",
                    endDate: "2026-08-30",
                    progress: 60,
                    status: "Đang thực hiện",
                    notes: "Đã hoàn thành 2 buổi kiểm định."
                  }
                ]
              },
              {
                id: "kr-mock-2",
                title: "Giảm hao phí render lỗi xuống dưới 5% tổng thời gian kết xuất sản phẩm",
                weight: 50,
                progress: 100,
                priority: "Medium",
                pic: "Lê Văn D",
                deadline: "2026-09-30",
                notes: "Đang áp dụng phần mềm kiểm tra tự động trước render.",
                actions: [
                  {
                    id: "act-mock-3",
                    title: "Cài đặt plugin tự động check lỗi mesh và vật liệu cho render farm",
                    pic: "Lê Văn D",
                    startDate: "2026-07-10",
                    endDate: "2026-07-25",
                    progress: 100,
                    status: "Hoàn thành",
                    notes: "Đã cài đặt trên toàn bộ máy farm."
                  }
                ]
              }
            ]
          }
        ]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOkrs();
  }, [filters]);

  const toggleKr = (krId: string) => {
    setExpandedKr(prev => ({ ...prev, [krId]: !prev[krId] }));
  };

  // -------------------------------------------------------------
  // Xử lý Cập nhật Tiến độ & Ghi chú trực tiếp (Module 5.2)
  // -------------------------------------------------------------
  const handleUpdateItem = (type: "kr" | "action", objId: string, krId: string, actionId: string | null, field: "progress" | "status" | "notes", val: any) => {
    setObjectives(prev => prev.map(obj => {
      if (obj.id !== objId) return obj;

      const updatedKrs = obj.keyResults.map(kr => {
        if (kr.id !== krId) return kr;

        if (type === "kr") {
          return { ...kr, [field]: val };
        } else {
          const updatedActions = kr.actions.map(act => {
            if (act.id !== actionId) return act;
            return { ...act, [field]: val };
          });

          // Tự động tính lại tiến độ KR dựa trên trung bình cộng Actions
          const avgActProgress = updatedActions.length > 0
            ? Math.round(updatedActions.reduce((sum, a) => sum + (Number(a.progress) || 0), 0) / updatedActions.length)
            : kr.progress;

          return { ...kr, actions: updatedActions, progress: avgActProgress };
        }
      });

      // Tự động tính lại tiến độ Objective dựa trên trọng số KR
      const objProgress = Math.round(updatedKrs.reduce((sum, k) => sum + (k.progress * (k.weight / 100)), 0));

      return { ...obj, keyResults: updatedKrs, progress: objProgress };
    }));
  };

  const handleSaveRow = async (title: string) => {
    alert(`✓ Đã lưu thành công kết quả và tiến độ cho: ${title}`);
  };

  // Xử lý AI Đánh giá Mục tiêu (Assessor)
  const handleAiAssessObjective = (objId: string, objTitle: string) => {
    setIsAiAssessing(prev => ({ ...prev, [objId]: true }));
    setTimeout(() => {
      setAiAssessments(prev => ({
        ...prev,
        [objId]: `AI Agent nhận định: Objective "${objTitle.substring(0, 35)}..." đang vận hành TỐT (Tiến độ 90%). Dự báo cuối kỳ đạt 95% kế hoạch. Đề xuất: Tiếp tục nhân rộng quy trình chuẩn hóa kho asset 3D cho các BU khác.`
      }));
      setIsAiAssessing(prev => ({ ...prev, [objId]: false }));
    }, 1200);
  };

  // -------------------------------------------------------------
  // Xử lý Modal Thêm mới (Module 5.1 & 5.2)
  // -------------------------------------------------------------
  const handleOpenObjModal = () => {
    if (!isEditable) return;
    setEditingObjId(null);
    const nextIndex = objectives.length + 1;
    setObjTitle(`O${nextIndex}: `);
    setObjWeight("35");
    setIsObjModalOpen(true);
  };

  const handleOpenKrModal = (objId: string) => {
    if (!isEditable) return;
    setActiveObjId(objId);
    setEditingKrId(null);
    const parentObj = objectives.find(o => o.id === objId);
    const nextKrIndex = parentObj ? parentObj.keyResults.length + 1 : 1;
    setKrTitle(`KR${nextKrIndex}: `);
    setKrWeight("50");
    setKrPriority("High");
    setKrPic(currentLoggedUser?.fullname || "Nguyễn Văn A");
    setKrDeadline("2026-09-30");
    setIsKrModalOpen(true);
  };

  const handleOpenActionModal = (krId: string) => {
    if (!isEditable) return;
    setActiveKrId(krId);
    setActionTitle("");
    setActionPic(currentLoggedUser?.fullname || "Trần Thị B");
    setActionStart(new Date().toISOString().split('T')[0]);
    setActionEnd(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setIsActionModalOpen(true);
  };

  const handleEditObjective = (obj: ObjectiveItem) => {
    if (!isEditable) return;
    setEditingObjId(obj.id);
    setObjTitle(obj.title);
    setObjWeight(obj.weight.toString());
    setIsObjModalOpen(true);
  };

  const handleEditKr = (objId: string, kr: KeyResultItem) => {
    if (!isEditable) return;
    setActiveObjId(objId);
    setEditingKrId(kr.id);
    setKrTitle(kr.title);
    setKrWeight(kr.weight.toString());
    setKrPriority(kr.priority);
    setKrPic(kr.pic);
    setKrDeadline(kr.deadline ? new Date(kr.deadline).toISOString().split('T')[0] : "2026-09-30");
    setIsKrModalOpen(true);
  };

  const handleDeleteObjective = (objId: string) => {
    if (!isEditable) return;
    if (!confirm("Bạn có chắc chắn muốn xóa Objective này và toàn bộ KRs/Actions trực thuộc không?")) return;
    setObjectives(prev => prev.filter(o => o.id !== objId));
  };

  const handleDeleteKr = (objId: string, krId: string) => {
    if (!isEditable) return;
    if (!confirm("Bạn có chắc chắn muốn xóa Key Result này và các Actions trực thuộc không?")) return;
    setObjectives(prev => prev.map(o => o.id === objId ? { ...o, keyResults: o.keyResults.filter(k => k.id !== krId) } : o));
  };

  const handleSaveOkrSetupSession = async () => {
    setLoading(true);
    try {
      const periodKey = (filters.periodType === "weekly" || filters.periodType === "monthly") 
        ? "M" + filters.month 
        : filters.quarter;
      const res = await fetch("/api/okrs/save-setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          unitCode: filters.unitCode,
          period: `${periodKey}_${filters.year}`,
          objectives: objectives,
        }),
      });
      if (res.ok) {
        alert("✓ Đã lưu thành công phiên thiết lập OKRs!");
        await fetchOkrs();
      } else {
        const err = await res.json();
        alert(`❌ Lỗi khi lưu: ${err.error || "Không rõ nguyên nhân"}`);
      }
    } catch (e) {
      console.error(e);
      alert("❌ Lỗi mạng khi lưu thiết lập OKRs!");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitObjective = (e: React.FormEvent) => {
    e.preventDefault();
    if (!objTitle) return;

    if (editingObjId) {
      setObjectives(prev => prev.map(o => o.id === editingObjId ? { ...o, title: objTitle, weight: parseFloat(objWeight) || 30 } : o));
      setEditingObjId(null);
    } else {
      const nextIndex = objectives.length + 1;
      let finalTitle = objTitle;
      if (!/^O\d+:/.test(objTitle)) {
        finalTitle = `O${nextIndex}: ${objTitle}`;
      }
      const newObj: ObjectiveItem = {
        id: `obj-${Date.now()}`,
        title: finalTitle,
        weight: parseFloat(objWeight) || 30,
        progress: 0,
        aiForecastProgress: 10,
        aiRiskLevel: "Thấp",
        keyResults: []
      };
      setObjectives(prev => [...prev, newObj]);
    }
    setIsObjModalOpen(false);
  };

  const handleSubmitKr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!krTitle) return;

    if (editingKrId) {
      setObjectives(prev => prev.map(o => o.id === activeObjId ? {
        ...o,
        keyResults: o.keyResults.map(k => k.id === editingKrId ? {
          ...k,
          title: krTitle,
          weight: parseFloat(krWeight) || 50,
          priority: krPriority,
          pic: krPic,
          deadline: krDeadline || "2026-09-30"
        } : k)
      } : o));
      setEditingKrId(null);
    } else {
      const parentObj = objectives.find(o => o.id === activeObjId);
      const nextKrIndex = parentObj ? parentObj.keyResults.length + 1 : 1;
      let finalKrTitle = krTitle;
      if (!/^KR\d+:/.test(krTitle)) {
        finalKrTitle = `KR${nextKrIndex}: ${krTitle}`;
      }
      const newKr: KeyResultItem = {
        id: `kr-${Date.now()}`,
        title: finalKrTitle,
        weight: parseFloat(krWeight) || 50,
        progress: 0,
        priority: krPriority,
        pic: krPic,
        deadline: krDeadline || "2026-09-30",
        actions: []
      };
      setObjectives(prev => prev.map(o => o.id === activeObjId ? { ...o, keyResults: [...o.keyResults, newKr] } : o));
    }
    setIsKrModalOpen(false);
  };

  const handleSubmitAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionTitle) return;
    const newAct: ActionItem = {
      id: `act-${Date.now()}`,
      title: actionTitle,
      pic: actionPic,
      startDate: actionStart,
      endDate: actionEnd,
      progress: 0,
      status: "Chưa thực hiện",
      notes: ""
    };
    setObjectives(prev => prev.map(o => ({
      ...o,
      keyResults: o.keyResults.map(k => k.id === activeKrId ? { ...k, actions: [...k.actions, newAct] } : k)
    })));
    setIsActionModalOpen(false);
  };

  const handleSubmitUnplannedAction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unplanTitle) return;
    const newUnplan: UnplannedAction = {
      id: `unplan-${Date.now()}`,
      title: unplanTitle,
      origin: unplanOrigin,
      startDate: unplanStart || new Date().toISOString().split('T')[0],
      deadline: unplanDeadline || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pic: unplanPic || currentLoggedUser?.fullname || "Nhân sự Sconnect",
      progress: 0,
      notes: "Mới tạo",
      evaluation: "Chưa đánh giá"
    };
    setUnplannedActions(prev => [...prev, newUnplan]);
    setIsUnplannedModalOpen(false);
  };

  // 5.3 5 Whys Chat Submission
  const handleSendWhy = (e: React.FormEvent) => {
    e.preventDefault();
    if (!whyInput.trim()) return;
    const userMsg = whyInput;
    setWhysChat(prev => [...prev, { role: "user", text: userMsg }]);
    setWhyInput("");
    setTimeout(() => {
      setWhysChat(prev => [...prev, { 
        role: "ai", 
        text: `AI Agent (Tại sao lần ${prev.length / 2 + 1}): Vấn đề "${userMsg}" xuất phát từ nguyên nhân quy trình chưa nghiệm thu giai đoạn kịch bản. Bạn đề xuất giải pháp nào cho kỳ tới?` 
      }]);
    }, 800);
  };

  // Tính toán số liệu Thẻ Freeze Panel
  const totalObjCount = objectives.length;
  const avgOkrProgress = objectives.length > 0 
    ? Math.round(objectives.reduce((sum, o) => sum + o.progress * (o.weight / 100), 0))
    : 0;
  
  const totalKrs = objectives.reduce((sum, o) => sum + o.keyResults.length, 0);
  const completedKrs = objectives.reduce((sum, o) => 
    sum + o.keyResults.filter(k => k.progress === 100).length, 0
  );

  return (
    <div className={`flex flex-col gap-4 relative ${theme === "light" ? "text-slate-900" : "text-white"}`}>
      {/* HEADER PHÂN HỆ 5 */}
      <div className="glass-panel p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-base font-black tracking-wider uppercase text-white flex items-center gap-2">
            🚀 PHÂN HỆ 5: QUẢN TRỊ OKR & CHIẾN LƯỢC (2026)
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Liên kết mục tiêu ngắn hạn của các Đơn vị với Trụ cột chiến lược của Sconnect
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--text-muted)] font-bold">Vai trò:</span>
          <select
            value={currentLoggedUser?.role || "Trưởng đơn vị"}
            onChange={(e) => {
              const targetRole = e.target.value;
              setCurrentLoggedUser({
                id: currentLoggedUser?.id || "1",
                employeeCode: currentLoggedUser?.employeeCode || "SCN001",
                fullname: currentLoggedUser?.fullname || "Trần Thị Thu Hương",
                email: currentLoggedUser?.email || "huongttt@s-connect.net",
                role: targetRole,
                unitCode: currentLoggedUser?.unitCode || "Wofloo"
              });
            }}
            className="bg-slate-900 border border-[var(--glass-border)] text-white text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none"
          >
            <option value="Trưởng đơn vị">Trưởng đơn vị (TĐV)</option>
            <option value="Giám đốc BU">Giám đốc BU SCVN</option>
            <option value="Admin">Admin / BLĐ</option>
          </select>
        </div>
      </div>

      {/* thanh ĐIỀU HƯỚNG 4 MODULE CON */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
        <div
          role="button"
          onClick={() => setActiveTab("5.1")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer select-none ${
            activeTab === "5.1"
              ? "bg-[var(--accent-purple)] !text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]"
              : theme === "light"
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 border border-slate-200"
                : "bg-slate-900/60 text-[var(--text-muted)] hover:bg-slate-900 hover:text-white"
          }`}
        >
          <Target size={15} /> 5.1 Thiết lập Chiến lược & OKRs
        </div>

        <div
          role="button"
          onClick={() => setActiveTab("5.2")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer select-none ${
            activeTab === "5.2"
              ? "bg-[var(--accent-cyan)] text-slate-950 shadow-[0_0_15px_rgba(0,242,254,0.4)]"
              : theme === "light"
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 border border-slate-200"
                : "bg-slate-900/60 text-[var(--text-muted)] hover:bg-slate-900 hover:text-white"
          }`}
        >
          <TrendingUp size={15} /> 5.2 Cập nhật & Theo dõi Tiến độ
        </div>

        <div
          role="button"
          onClick={() => setActiveTab("5.3")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer select-none ${
            activeTab === "5.3"
              ? "bg-[var(--accent-pink)] !text-white shadow-[0_0_15px_rgba(255,75,114,0.4)]"
              : theme === "light"
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 border border-slate-200"
                : "bg-slate-900/60 text-[var(--text-muted)] hover:bg-slate-900 hover:text-white"
          }`}
        >
          <Bot size={15} /> 5.3 AI Review & Phản tỉnh (Reflection)
        </div>

        <div
          role="button"
          onClick={() => setActiveTab("5.4")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer select-none ${
            activeTab === "5.4"
              ? "bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              : theme === "light"
                ? "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 border border-slate-200"
                : "bg-slate-900/60 text-[var(--text-muted)] hover:bg-slate-900 hover:text-white"
          }`}
        >
          <GitBranch size={15} /> 5.4 Sơ đồ Liên kết (Alignment Tree)
        </div>
      </div>

      {/* FREEZE PANEL FILTER HEADER */}
      <FiltersHeader hideFrequency={effectiveSubTab === "pillars"} />

      {/* ========================================================================= */}
      {/* MODULE 5.2: CẬP NHẬT VÀ THEO DÕI TIẾN ĐỘ (KHỚP 100% ẢNH MẪU CỦA NGƯỜI DÙNG) */}
      {/* ========================================================================= */}
      {activeTab === "5.2" && (
        <div className="space-y-6">
          {/* 3 THẺ MICRO CARDS TỔNG QUAN (FREEZE PANEL) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-4 flex justify-between items-center h-[90px] border-l-4 border-l-[var(--accent-purple)]">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-extrabold tracking-wider uppercase block">
                  MỤC TIÊU HOẠT ĐỘNG (O)
                </span>
                <span className="text-xl font-black text-white mt-1 block">
                  {totalObjCount} Objectives
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--accent-purple)]/10 flex items-center justify-center text-[var(--accent-purple)]">
                <Target size={20} />
              </div>
            </div>

            <div className="glass-panel p-4 flex justify-between items-center h-[90px] border-l-4 border-l-[var(--accent-cyan)]">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-extrabold tracking-wider uppercase block">
                  TIẾN ĐỘ TRUNG BÌNH ĐƠN VỊ
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-black text-[var(--accent-cyan)]">{avgOkrProgress}%</span>
                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                    avgOkrProgress < 50 ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-emerald-500/20 text-emerald-400"
                  }`}>
                    {avgOkrProgress < 50 ? "Chậm tiến độ" : "Đúng tiến độ"}
                  </span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-[var(--accent-cyan)]/10 flex items-center justify-center text-[var(--accent-cyan)]">
                <TrendingUp size={20} />
              </div>
            </div>

            <div className="glass-panel p-4 flex justify-between items-center h-[90px] border-l-4 border-l-emerald-500">
              <div>
                <span className="text-[10px] text-[var(--text-muted)] font-extrabold tracking-wider uppercase block">
                  KR ĐÃ HOÀN THÀNH
                </span>
                <span className="text-xl font-black text-emerald-400 mt-1 block">
                  {completedKrs} / {totalKrs} KRs ({totalKrs > 0 ? Math.round((completedKrs / totalKrs) * 100) : 0}%)
                </span>
              </div>
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CheckCircle2 size={20} />
              </div>
            </div>
          </div>

          {/* BẢNG THEO DÕI & CẬP NHẬT SỐ LIỆU OKR (TỪNG OBJECTIVE LÀ 1 BẢNG NỔI CHUẨN NGUYÊN MẪU) */}
          {objectives.map(obj => (
            <div key={obj.id} className="glass-panel p-5 relative overflow-hidden">
              
              {/* Objective Card Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-3 mb-4 gap-3">
                <div>
                  <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[10px] font-black px-2.5 py-0.5 rounded uppercase tracking-wider">
                    MỤC TIÊU TRỌNG SỐ {obj.weight}%
                  </span>
                  <h3 className="font-extrabold text-sm text-white mt-1.5">
                    {obj.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase block">TIẾN ĐỘ CHUNG</span>
                    <span className="text-sm font-black text-[var(--accent-cyan)]">{obj.progress}%</span>
                  </div>
                  <div className="w-24 bg-slate-900 h-2.5 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-[var(--accent-cyan)] to-emerald-400 transition-all"
                      style={{ width: `${obj.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* BẢNG CÁC KRs VÀ ACTIONs CON */}
              <div className="overflow-x-auto border border-white/5 rounded-lg mb-4">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-[var(--text-muted)] font-bold bg-slate-900/60 text-[10px] uppercase">
                      <th className="p-3">Mục tiêu / Kết quả / Hành động</th>
                      <th className="p-3 w-36 text-center">Phụ trách</th>
                      <th className="p-3 w-40 text-center">Tiến độ (%)</th>
                      <th className="p-3 w-36 text-center">Trạng thái</th>
                      <th className="p-3">Ghi chú kết quả thực tế</th>
                      <th className="p-3 w-20 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {obj.keyResults.map(kr => (
                      <React.Fragment key={kr.id}>
                        {/* HÀNG KEY RESULT */}
                        <tr className="border-b border-white/5 bg-slate-900/30 font-bold text-white">
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <span className="text-[var(--accent-purple)]">↳</span>
                              <span>{kr.title}</span>
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                                kr.priority === "High" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" : "bg-amber-500/20 text-amber-400"
                              }`}>
                                {kr.priority}
                              </span>
                            </div>
                          </td>
                          <td className="p-3 text-center text-[var(--text-muted)] font-medium">{kr.pic}</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center gap-2 justify-center">
                              <input
                                type="number"
                                value={kr.progress}
                                onChange={(e) => handleUpdateItem("kr", obj.id, kr.id, null, "progress", parseFloat(e.target.value) || 0)}
                                className="w-12 bg-slate-950 border border-white/10 rounded text-center py-1 font-bold text-white text-xs focus:outline-none"
                              />
                              <div className="w-16 bg-slate-900 h-2 rounded-full overflow-hidden border border-white/10">
                                <div className={`h-full ${kr.progress >= 70 ? "bg-emerald-400" : kr.progress >= 40 ? "bg-amber-400" : "bg-rose-500"}`} style={{ width: `${kr.progress}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                              {kr.progress === 100 ? "Hoàn thành" : "Đang thực hiện"}
                            </span>
                          </td>
                          <td className="p-3">
                            <input
                              type="text"
                              value={kr.notes || ""}
                              onChange={(e) => handleUpdateItem("kr", obj.id, kr.id, null, "notes", e.target.value)}
                              placeholder="Nhập ghi chú báo cáo..."
                              className="w-full bg-slate-950/80 border border-white/10 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-[var(--accent-cyan)]"
                            />
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleSaveRow(kr.title)}
                              className="bg-slate-800 hover:bg-slate-700 border border-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded transition-all"
                            >
                              Lưu
                            </button>
                          </td>
                        </tr>

                        {/* HÀNG ACTIONs CON */}
                        {kr.actions.map(act => (
                          <tr key={act.id} className="border-b border-white/5 hover:bg-white/5 text-[11px] text-slate-300">
                            <td className="p-3 pl-8">
                              <div className="flex items-center gap-1.5 italic text-slate-300">
                                <span className="text-[var(--accent-cyan)]">↳ Action:</span>
                                <span>{act.title}</span>
                              </div>
                            </td>
                            <td className="p-3 text-center text-[var(--text-muted)]">{act.pic}</td>
                            <td className="p-3 text-center">
                              <div className="flex items-center gap-2 justify-center">
                                <input
                                  type="number"
                                  value={act.progress}
                                  onChange={(e) => handleUpdateItem("action", obj.id, kr.id, act.id, "progress", parseFloat(e.target.value) || 0)}
                                  className="w-12 bg-slate-950 border border-white/10 rounded text-center py-1 font-bold text-white text-xs focus:outline-none"
                                />
                                <div className="w-16 bg-slate-900 h-2 rounded-full overflow-hidden border border-white/10">
                                  <div className={`h-full ${act.progress >= 70 ? "bg-emerald-400" : act.progress >= 40 ? "bg-amber-400" : "bg-rose-500"}`} style={{ width: `${act.progress}%` }} />
                                </div>
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <select
                                value={act.status}
                                onChange={(e) => handleUpdateItem("action", obj.id, kr.id, act.id, "status", e.target.value)}
                                className="bg-slate-950 border border-white/10 text-[10px] font-bold text-white rounded px-2 py-1 focus:outline-none"
                              >
                                <option value="Chưa thực hiện">Chưa thực hiện</option>
                                <option value="Đang thực hiện">Đang thực hiện</option>
                                <option value="Hoàn thành">Hoàn thành</option>
                                <option value="Hoãn">Hoãn</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <input
                                type="text"
                                value={act.notes || ""}
                                onChange={(e) => handleUpdateItem("action", obj.id, kr.id, act.id, "notes", e.target.value)}
                                placeholder="Ghi chú báo cáo thực tế..."
                                className="w-full bg-slate-950/80 border border-white/10 rounded px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-[var(--accent-cyan)]"
                              />
                            </td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleSaveRow(act.title)}
                                className="bg-slate-800 hover:bg-slate-700 border border-white/10 text-white text-[10px] font-bold px-2.5 py-1 rounded transition-all"
                              >
                                Lưu
                              </button>
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* HỘP TRỢ LÝ AI ĐÁNH GIÁ MỤC TIÊU (ASSESSOR) KHỚP NGUYÊN MẪU */}
              <div className={`rounded-xl p-3.5 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 border transition-all ${
                theme === "light"
                  ? "bg-white border-[#32CD32] shadow-[0_2px_10px_rgba(50,205,50,0.06)]"
                  : "bg-slate-950/60 border-[var(--accent-purple)]/30"
              }`}>
                <div className="flex items-start gap-2.5">
                  <span className="text-base">🤖</span>
                  <div>
                    <h4 className={`text-xs font-black tracking-wider uppercase ${
                      theme === "light" ? "text-[#228B22]" : "text-[var(--accent-purple)]"
                    }`}>
                      TRỢ LÝ AI ĐÁNH GIÁ MỤC TIÊU (ASSESSOR)
                    </h4>
                    <div className="text-[11px] mt-0.5 leading-relaxed">
                      {renderFormattedAiText(
                        aiAssessments[obj.id] || "Chưa có nhận định. Nhấn nút \"AI Đánh giá\" để nhận phân tích từ AI Agent.",
                        theme
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleAiAssessObjective(obj.id, obj.title)}
                  disabled={isAiAssessing[obj.id]}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] font-black px-4 py-2 rounded-lg shadow-[0_0_12px_rgba(147,51,234,0.4)] transition-all shrink-0 disabled:opacity-50"
                >
                  {isAiAssessing[obj.id] ? "Đang phân tích..." : "AI Đánh giá"}
                </button>
              </div>

            </div>
          ))}

          {/* BẢNG BỔ SUNG: ACTIONS PHÁT SINH NGOÀI KẾ HOẠCH */}
          <div className="glass-panel p-5">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-xs font-extrabold text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
                  ⚡ ACTIONS PHÁT SINH NGOÀI KẾ HOẠCH
                </h3>
                <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
                  Lưu trữ các đầu việc phát sinh đột xuất để kiểm soát hao phí nguồn lực tổ chức.
                </p>
              </div>
              <button
                onClick={() => setIsUnplannedModalOpen(true)}
                disabled={!isEditable}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-[10px] font-black px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all disabled:opacity-50"
              >
                <Plus size={12} /> Thêm Action ngoài kế hoạch
              </button>
            </div>

            <div className="overflow-x-auto border border-white/5 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-[var(--text-muted)] font-bold bg-slate-900/60 text-[10px] uppercase">
                    <th className="p-3">Tên Action phát sinh</th>
                    <th className="p-3 w-32 text-center">Nguồn phát sinh</th>
                    <th className="p-3 w-28 text-center">Thời gian</th>
                    <th className="p-3 w-28 text-center">PIC</th>
                    <th className="p-3 w-28 text-center">Tiến độ (%)</th>
                    <th className="p-3">Kết quả chi tiết</th>
                    <th className="p-3">Đánh giá TĐV / GĐBU</th>
                  </tr>
                </thead>
                <tbody>
                  {unplannedActions.map(act => (
                    <tr key={act.id} className="border-b border-white/5 hover:bg-white/5 text-[11px] text-slate-300">
                      <td className="p-3 font-semibold text-white">{act.title}</td>
                      <td className="p-3 text-center">
                        <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold px-2 py-0.5 rounded">
                          {act.origin}
                        </span>
                      </td>
                      <td className="p-3 text-center text-[var(--text-muted)] text-[10px]">
                        {act.startDate} → {act.deadline}
                      </td>
                      <td className="p-3 text-center font-medium">{act.pic}</td>
                      <td className="p-3 text-center font-bold text-[var(--accent-cyan)]">{act.progress}%</td>
                      <td className="p-3 text-slate-300">{act.notes}</td>
                      <td className="p-3 italic text-emerald-400">{act.evaluation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 5.1: THIẾT LẬP CHIẾN LƯỢC & OKRs */}
      {/* ========================================================================= */}
      {activeTab === "5.1" && (
        <div className="space-y-6">
          {isCorporateLevel && (
            <div className="flex gap-3 border-b border-white/10 pb-2">
              <div
                role="button"
                onClick={() => setTab51Sub("setup")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer select-none ${
                  effectiveSubTab === "setup"
                    ? theme === "light"
                      ? "bg-gradient-to-r from-emerald-500/10 to-lime-500/5 text-emerald-800 font-black shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-emerald-500/20 border-l-[4px] border-l-emerald-500"
                      : "bg-[var(--accent-cyan)] text-slate-950 shadow-md border border-[var(--accent-cyan)]/20"
                    : theme === "light"
                      ? "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-800"
                      : "bg-slate-900 text-[var(--text-muted)] border border-white/5 hover:bg-slate-800 hover:text-white"
                }`}
              >
                📋 Tab 2: Thiết lập OKRs Đơn vị
              </div>
              <div
                role="button"
                onClick={() => setTab51Sub("pillars")}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition-all cursor-pointer select-none ${
                  effectiveSubTab === "pillars"
                    ? theme === "light"
                      ? "bg-gradient-to-r from-emerald-500/10 to-lime-500/5 text-emerald-800 font-black shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-emerald-500/20 border-l-[4px] border-l-emerald-500"
                      : "bg-[var(--accent-cyan)] text-slate-950 shadow-md border border-[var(--accent-cyan)]/20"
                    : theme === "light"
                      ? "bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200 hover:text-slate-800"
                      : "bg-slate-900 text-[var(--text-muted)] border border-white/5 hover:bg-slate-800 hover:text-white"
                }`}
              >
                🏛️ Tab 1: Trụ cột Chiến lược Sconnect 2026
              </div>
            </div>
          )}

          {effectiveSubTab === "pillars" ? (
            <div className="glass-panel p-6 space-y-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-4 gap-4">
                <div>
                  <h3 className="text-base font-black text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                    🏛️ {filters.unitCode === "TCT" ? "CHIẾN LƯỢC NĂM 2026 TỔNG CÔNG TY (TCT)" : "CHIẾN LƯỢC NĂM 2026 BU SCONNECT VIỆT NAM (SCVN)"}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-semibold mt-1">
                    Chương trình hành động và định hướng chiến lược trọng tâm năm 2026
                  </p>
                </div>
                <div className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-extrabold tracking-wide">
                  ĐƠN VỊ: {filters.unitCode}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {(filters.unitCode === "TCT" ? TCT_STRATEGIES : SCVN_STRATEGIES).map((strategy, idx) => (
                  <div 
                    key={strategy.id} 
                    className={`flex flex-col justify-between rounded-2xl border transition-all duration-300 p-5 ${
                      theme === "light"
                        ? "bg-white border-emerald-100 shadow-sm hover:shadow-md hover:border-emerald-300"
                        : "bg-slate-900/60 border-white/5 hover:border-emerald-500/30 shadow-inner"
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Badge & Number */}
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-wider ${
                          theme === "light" ? "bg-emerald-50 text-emerald-700" : "bg-emerald-500/10 text-emerald-400"
                        }`}>
                          Phương án {idx + 1}
                        </span>
                        <Target size={16} className="text-emerald-500 opacity-60" />
                      </div>

                      {/* Title */}
                      <h4 className={`font-black text-sm leading-snug ${
                        theme === "light" ? "text-slate-900" : "text-white"
                      }`}>
                        {strategy.title.replace(/^PHƯƠNG ÁN \d+:\s*/i, "")}
                      </h4>

                      {/* Strategic Justification */}
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                          Giải trình Chiến lược
                        </span>
                        <p className={`text-xs leading-relaxed italic ${
                          theme === "light" ? "text-slate-600" : "text-slate-300"
                        }`}>
                          "{strategy.justification}"
                        </p>
                      </div>

                      {/* Key Initiatives */}
                      {strategy.initiatives && strategy.initiatives.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                            Sáng kiến Trọng tâm
                          </span>
                          <ul className="space-y-1.5">
                            {strategy.initiatives.map((init, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs">
                                <span className="text-emerald-500 mt-1 shrink-0">•</span>
                                <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}>
                                  {init}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Description (Custom structured data like P3) */}
                      {strategy.description && strategy.description.length > 0 && (
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                            Mô tả chi tiết
                          </span>
                          <ul className="space-y-1">
                            {strategy.description.map((desc, i) => (
                              <li key={i} className="flex items-start gap-2 text-xs">
                                <span className="text-emerald-500 mt-1 shrink-0">✓</span>
                                <span className={theme === "light" ? "text-slate-700" : "text-slate-300"}>
                                  {desc}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>

                    {/* Expected Results */}
                    {strategy.expectations && (
                      <div className={`mt-5 p-3 rounded-xl border ${
                        theme === "light" 
                          ? "bg-emerald-50/50 border-emerald-100 text-slate-800" 
                          : "bg-emerald-500/5 border-emerald-500/10 text-slate-300"
                      }`}>
                        <span className="text-[9px] font-extrabold text-emerald-500 uppercase tracking-wider block mb-1">
                          🎯 Kỳ vọng Kết quả
                        </span>
                        <p className="text-xs leading-relaxed font-semibold">
                          {strategy.expectations}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  🌳 THIẾT LẬP CÂY MỤC TIÊU OKR ĐƠN VỊ
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => alert("🤖 AI Planning Agent: Đã quét chiến lược 2026. Đề xuất Objective: 'Nâng cao tỷ lệ tái sử dụng Assets 3D Wolfoo lên 60%'")}
                    className="bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600/30 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all"
                  >
                    <Bot size={14} /> Gợi ý AI Planning
                  </button>
                  <button
                    onClick={handleOpenObjModal}
                    disabled={!isEditable}
                    className="bg-[var(--accent-cyan)] text-slate-950 text-xs font-extrabold px-3 py-1.5 rounded hover:shadow-[0_0_10px_rgba(0,242,254,0.3)] transition-all disabled:opacity-50"
                  >
                    + THÊM MỤC TIÊU (O)
                  </button>
                  {isEditable && (
                    <button
                      onClick={handleSaveOkrSetupSession}
                      className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1.5 rounded hover:bg-emerald-500 shadow-md hover:shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all flex items-center gap-1"
                    >
                      <Save size={14} /> Lưu phiên thiết lập
                    </button>
                  )}
                </div>
              </div>

              {/* Danh sách Objective setup */}
              {objectives.map(obj => (
                <div key={obj.id} className="glass-panel p-5 border-l-4 border-purple-600 dark:border-purple-500">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Target className="text-purple-600 dark:text-purple-400" size={18} />
                      <h3 className={`font-extrabold text-sm ${theme === "light" ? "text-purple-900" : "text-white"}`}>O: {obj.title}</h3>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">
                        Trọng số: {obj.weight}%
                      </span>
                      {isEditable && (
                        <div className="flex gap-1.5">
                          <button
                            onClick={() => handleEditObjective(obj)}
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 hover:bg-sky-500/30 transition-all"
                          >
                            Sửa
                          </button>
                          <button
                            onClick={() => handleDeleteObjective(obj.id)}
                            className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 transition-all"
                          >
                            Xóa
                          </button>
                        </div>
                      )}
                      <div
                        role="button"
                        onClick={() => {
                          if (isEditable) handleOpenKrModal(obj.id);
                        }}
                        className={`text-xs font-extrabold px-3 py-1.5 rounded-lg border transition-all select-none ${
                          !isEditable
                            ? "opacity-50 cursor-not-allowed"
                            : theme === "light"
                              ? "bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100 cursor-pointer shadow-sm"
                              : "bg-white/5 border border-white/10 text-emerald-400 hover:bg-white/10 cursor-pointer"
                        }`}
                      >
                        + Thêm KR con
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {obj.keyResults.map(kr => (
                      <div
                        key={kr.id}
                        className={`p-3 rounded-lg border transition-all ${
                          theme === "light"
                            ? "bg-purple-50/70 border-purple-200 text-purple-950 shadow-sm"
                            : "bg-slate-950/40 border border-white/5 text-white"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className={`font-bold text-xs ${theme === "light" ? "text-purple-950" : "text-white"}`}>
                            ↳ KR: {kr.title} (Trọng số: {kr.weight}%)
                          </span>
                          <div className="flex items-center gap-2">
                            {isEditable && (
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => handleEditKr(obj.id, kr)}
                                  className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-600 dark:text-sky-400 border border-sky-500/30 hover:bg-sky-500/30 transition-all"
                                >
                                  Sửa
                                </button>
                                <button
                                  onClick={() => handleDeleteKr(obj.id, kr.id)}
                                  className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-600 dark:text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 transition-all"
                                >
                                  Xóa
                                </button>
                              </div>
                            )}
                            <div
                              role="button"
                              onClick={() => {
                                if (isEditable) handleOpenActionModal(kr.id);
                              }}
                              className={`text-[10px] font-extrabold px-2.5 py-1 rounded-lg border transition-all select-none ${
                                !isEditable
                                  ? "opacity-50 cursor-not-allowed"
                                  : theme === "light"
                                    ? "bg-purple-50 border-purple-300 text-purple-700 hover:bg-purple-100 cursor-pointer shadow-sm"
                                    : "bg-[var(--accent-purple)]/10 border-transparent text-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/20 cursor-pointer"
                              }`}
                            >
                              + Thêm Action
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 5.3: AI REVIEW & PHẢN TỈNH (REFLECTION) */}
      {/* ========================================================================= */}
      {activeTab === "5.3" && (
        <div className="glass-panel p-6 space-y-6">
          <div>
            <h2 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${
              theme === "light" ? "text-pink-700" : "text-[var(--accent-pink)]"
            }`}>
              🧠 MODULE 5.3: AI REVIEW & PHẢN TỈNH HÀNG TUẦN (REFLECTION)
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Vòng lặp học tập liên tục qua bộ câu hỏi chuẩn hóa dẫn dắt bởi AI Agent.
            </p>
          </div>

          {/* 4 BƯỚC PHẢN TỈNH */}
          <div className={`grid grid-cols-4 gap-2 border-b pb-4 ${
            theme === "light" ? "border-slate-200" : "border-white/10"
          }`}>
            {["1. AI Phân tích kỳ trước", "2. Dẫn dắt Phản tỉnh", "3. 5 Whys đào sâu", "4. Chốt Action kỳ tới"].map((st, idx) => (
              <div
                key={idx}
                role="button"
                onClick={() => setReflectionStep(idx + 1)}
                className={`py-2 px-3 rounded-lg text-xs font-extrabold text-center transition-all cursor-pointer select-none border ${
                  reflectionStep === idx + 1
                    ? "bg-[var(--accent-pink)] text-white shadow-[0_0_10px_rgba(255,75,114,0.4)] border-transparent"
                    : theme === "light"
                      ? "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200 hover:text-slate-800"
                      : "bg-slate-900/60 text-[var(--text-muted)] border-white/5 hover:bg-slate-800"
                }`}
              >
                {st}
              </div>
            ))}
          </div>

          {/* BƯỚC 1 & 2 & 3 & 4 CONTENT */}
          {reflectionStep === 1 && (
            <div className="space-y-4">
              <h3 className={`text-xs font-extrabold uppercase ${
                theme === "light" ? "text-slate-800" : "text-white"
              }`}>📌 BƯỚC 1: AI TỰ ĐỘNG PHÂN TÍCH KẾT QUẢ KỲ TRƯỚC</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className={`p-4 rounded-xl border ${
                  theme === "light"
                    ? "bg-rose-50 border-rose-200/80 shadow-sm"
                    : "bg-rose-500/10 border border-rose-500/30"
                }`}>
                  <span className={`text-[10px] font-black uppercase ${
                    theme === "light" ? "text-rose-700" : "text-rose-400"
                  }`}>KR Chậm tiến độ (Cần xử lý)</span>
                  <p className={`text-xs font-bold mt-1 ${
                    theme === "light" ? "text-slate-900" : "text-white"
                  }`}>KR: Mở rộng kênh Tiktok Beta (Đạt 10% / KH 50%)</p>
                </div>
                <div className={`p-4 rounded-xl border ${
                  theme === "light"
                    ? "bg-emerald-50 border-emerald-200/80 shadow-sm"
                    : "bg-emerald-500/10 border border-emerald-500/30"
                }`}>
                  <span className={`text-[10px] font-black uppercase ${
                    theme === "light" ? "text-emerald-700" : "text-emerald-400"
                  }`}>KR Tiến triển tốt</span>
                  <p className={`text-xs font-bold mt-1 ${
                    theme === "light" ? "text-slate-900" : "text-white"
                  }`}>KR: Tái sử dụng assets Wolfoo 3D (Đạt 80% / KH 60%)</p>
                </div>
              </div>
            </div>
          )}

          {reflectionStep === 2 || reflectionStep === 3 ? (
            <div className="space-y-4">
              <h3 className={`text-xs font-extrabold uppercase ${
                theme === "light" ? "text-slate-800" : "text-white"
              }`}>💬 BƯỚC 2 & 3: KHẢO SÁT PHẢN TỈNH & 5 WHYS CHAT</h3>
              <div className={`border rounded-xl p-4 h-[240px] overflow-y-auto space-y-3 ${
                theme === "light"
                  ? "bg-slate-50 border-slate-200"
                  : "bg-slate-950 border border-white/10"
              }`}>
                {whysChat.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`p-3 rounded-xl max-w-[80%] text-xs ${
                      msg.role === "user"
                        ? "bg-[var(--accent-purple)] text-white"
                        : theme === "light"
                          ? "bg-white border border-slate-200 text-slate-800 shadow-sm font-semibold"
                          : "bg-slate-900 border border-white/10 text-slate-200"
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendWhy} className="flex gap-2">
                <input
                  type="text"
                  value={whyInput}
                  onChange={(e) => setWhyInput(e.target.value)}
                  placeholder="Trả lời AI hoặc nhập lý do nguyên nhân tại sao..."
                  className={`flex-1 rounded-lg px-3 py-2 text-xs focus:outline-none transition-all ${
                    theme === "light"
                      ? "bg-white border border-slate-200 text-slate-900 focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
                      : "bg-slate-950 border border-white/10 text-white focus:border-[var(--accent-pink)]"
                  }`}
                />
                <button type="submit" className="bg-[var(--accent-pink)] text-white font-extrabold text-xs px-4 py-2 rounded-lg">
                  Gửi AI
                </button>
              </form>
            </div>
          ) : null}

          {reflectionStep === 4 && (
            <div className="space-y-4">
              <h3 className={`text-xs font-extrabold uppercase ${
                theme === "light" ? "text-slate-800" : "text-white"
              }`}>⚡ BƯỚC 4: KẾ HOẠCH HÀNH ĐỘNG MỚI ĐÃ ĐƯỢC DUYỆT</h3>
              <div className={`p-4 border rounded-xl flex justify-between items-center transition-all ${
                theme === "light"
                  ? "bg-emerald-50/50 border-emerald-200/80 shadow-sm"
                  : "bg-slate-950/60 border border-emerald-500/30"
              }`}>
                <div>
                  <h4 className={`font-extrabold text-xs ${
                    theme === "light" ? "text-slate-900" : "text-white"
                  }`}>Action: Setup tự động hóa khâu đăng clip lên 5 kênh Tiktok Beta mới</h4>
                  <span className={`text-[10px] ${
                    theme === "light" ? "text-slate-500" : "text-[var(--text-muted)]"
                  }`}>Nguồn sinh: AI Review | PIC: Nguyễn Minh Trí</span>
                </div>
                <button
                  onClick={() => alert("✓ Đã đồng bộ thành công Action này sang Module 5.2!")}
                  className="bg-emerald-500 text-slate-950 font-black text-xs px-3 py-1.5 rounded-lg hover:bg-emerald-600 transition-all"
                >
                  ✓ Bổ sung vào Module 5.2
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 5.4: SƠ ĐỒ LIÊN KẾT CHIẾN LƯỢC (ALIGNMENT TREE) */}
      {/* ========================================================================= */}
      {activeTab === "5.4" && (
        <div className="glass-panel p-6 space-y-6">
          <div>
            <h2 className={`text-sm font-black uppercase tracking-wider flex items-center gap-2 ${
              theme === "light" ? "text-emerald-700" : "text-emerald-400"
            }`}>
              🌳 MODULE 5.4: SƠ ĐỒ LIÊN KẾT CHIẾN LƯỢC (ALIGNMENT TREE)
            </h2>
            <p className="text-xs text-[var(--text-muted)] mt-1">
              Trực quan hóa cây đóng góp từ Mục tiêu cấp Công ty năm 2026 tới các KRs & Actions cấp Bộ phận.
            </p>
          </div>

          {/* CÂY LIÊN KẾT TRỰC QUAN */}
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border transition-all ${
              theme === "light"
                ? "bg-emerald-50/40 border-emerald-200/80 shadow-sm"
                : "bg-slate-950/80 border-emerald-500/40"
            }`}>
              <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
                theme === "light"
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-emerald-500/10 text-emerald-400"
              }`}>
                MỤC TIÊU CÔNG TY SCONNECT 2026
              </span>
              <h3 className={`font-black text-sm mt-1.5 ${
                theme === "light" ? "text-emerald-950" : "text-white"
              }`}>
                🎯 Trụ cột 1: Tối ưu quy trình AIVA-AI & Nâng cao hiệu suất sản xuất ND 2D/3D
              </h3>

              <div className="mt-4 pl-6 border-l-2 border-emerald-500/30 space-y-3">
                <div className={`p-3 rounded-xl border transition-all ${
                  theme === "light"
                    ? "bg-white border-slate-200 shadow-sm"
                    : "bg-slate-900/80 border-white/10"
                }`}>
                  <span className={`text-[10px] font-bold uppercase ${
                    theme === "light" ? "text-indigo-700" : "text-[var(--accent-cyan)]"
                  }`}>
                    Đơn vị: Wolfoo (WO)
                  </span>
                  <h4 className={`font-extrabold text-xs mt-0.5 ${
                    theme === "light" ? "text-slate-900" : "text-white"
                  }`}>
                    O: Tối ưu hóa chi phí vận hành hệ thống sản xuất và nâng tỷ lệ tái sử dụng assets Wolfoo (Trọng số 35%)
                  </h4>

                  <div className={`mt-2 pl-4 border-l space-y-2 ${
                    theme === "light" ? "border-slate-200" : "border-white/10"
                  }`}>
                    <div className={theme === "light" ? "text-[11px] text-slate-700 font-medium" : "text-[11px] text-slate-300"}>
                      ↳ <span className={theme === "light" ? "font-bold text-slate-900" : "font-bold text-white"}>KR1:</span> Tái sử dụng trên 60% assets trong sản xuất phim mới (HIGH)
                    </div>
                    <div className={theme === "light" ? "text-[11px] text-slate-700 font-medium" : "text-[11px] text-slate-300"}>
                      ↳ <span className={theme === "light" ? "font-bold text-slate-900" : "font-bold text-white"}>KR2:</span> Giảm hao phí render lỗi xuống dưới 5% (MEDIUM)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS TẠO MỚI */}
      {/* ========================================================================= */}
       {isObjModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl p-6 relative text-white">
            <button onClick={() => setIsObjModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={18} />
            </button>
            <h3 className="text-sm font-extrabold uppercase mb-4 text-[var(--accent-cyan)]">
              {editingObjId ? "🎯 Cập nhật Mục tiêu (Objective)" : "🎯 Thiết lập Mục tiêu (Objective) mới"}
            </h3>
            <form onSubmit={handleSubmitObjective} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Tên mục tiêu:</label>
                <input type="text" required value={objTitle} onChange={(e) => setObjTitle(e.target.value)} placeholder="Nhập tên mục tiêu..." className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Trọng số (%):</label>
                <input type="number" required value={objWeight} onChange={(e) => setObjWeight(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsObjModalOpen(false)} className="bg-slate-800 text-xs px-4 py-2 rounded font-bold">Hủy</button>
                <button type="submit" className="bg-white text-slate-950 text-xs px-4 py-2 rounded font-extrabold">
                  {editingObjId ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isKrModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl p-6 relative text-white">
            <button onClick={() => setIsKrModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={18} />
            </button>
            <h3 className="text-sm font-extrabold uppercase mb-4 text-[var(--accent-purple)]">
              {editingKrId ? "🔑 Cập nhật Kết quả then chốt (KR)" : "🔑 Thiết lập Kết quả then chốt (KR) mới"}
            </h3>
            <form onSubmit={handleSubmitKr} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Tên KR:</label>
                <input type="text" required value={krTitle} onChange={(e) => setKrTitle(e.target.value)} placeholder="Nhập nội dung KR..." className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Trọng số (%):</label>
                  <input type="number" required value={krWeight} onChange={(e) => setKrWeight(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Mức ưu tiên:</label>
                  <select value={krPriority} onChange={(e) => setKrPriority(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white">
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Phụ trách (PIC):</label>
                <input type="text" required value={krPic} onChange={(e) => setKrPic(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsKrModalOpen(false)} className="bg-slate-800 text-xs px-4 py-2 rounded font-bold">Hủy</button>
                <button type="submit" className="bg-white text-slate-950 text-xs px-4 py-2 rounded font-extrabold">
                  {editingKrId ? "Cập nhật" : "Thêm mới"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isActionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl p-6 relative text-white">
            <button onClick={() => setIsActionModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={18} />
            </button>
            <h3 className="text-sm font-extrabold uppercase mb-4 text-[var(--accent-cyan)]">⚡ Thêm Hành động (Action) con</h3>
            <form onSubmit={handleSubmitAction} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Tên Action:</label>
                <input type="text" required value={actionTitle} onChange={(e) => setActionTitle(e.target.value)} placeholder="Nhập tên action..." className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Người thực hiện:</label>
                <input type="text" required value={actionPic} onChange={(e) => setActionPic(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsActionModalOpen(false)} className="bg-slate-800 text-xs px-4 py-2 rounded font-bold">Hủy</button>
                <button type="submit" className="bg-white text-slate-950 text-xs px-4 py-2 rounded font-extrabold">Thêm mới</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isUnplannedModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl p-6 relative text-white">
            <button onClick={() => setIsUnplannedModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
              <X size={18} />
            </button>
            <h3 className="text-sm font-extrabold uppercase mb-4 text-amber-400">⚡ Thêm Action Phát sinh ngoài kế hoạch</h3>
            <form onSubmit={handleSubmitUnplannedAction} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Tên Action phát sinh:</label>
                <input type="text" required value={unplanTitle} onChange={(e) => setUnplanTitle(e.target.value)} placeholder="Nhập tên công việc phát sinh..." className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Nguồn phát sinh:</label>
                  <select value={unplanOrigin} onChange={(e) => setUnplanOrigin(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white">
                    <option value="Chỉ đạo BLĐ">Chỉ đạo BLĐ</option>
                    <option value="AI Review">AI Review</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] uppercase mb-1">Người thực hiện (PIC):</label>
                  <input type="text" required value={unplanPic} onChange={(e) => setUnplanPic(e.target.value)} placeholder="Tên PIC..." className="w-full bg-slate-950 border border-white/10 rounded p-2 text-xs text-white" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setIsUnplannedModalOpen(false)} className="bg-slate-800 text-xs px-4 py-2 rounded font-bold">Hủy</button>
                <button type="submit" className="bg-amber-500 text-slate-950 text-xs px-4 py-2 rounded font-extrabold">Thêm mới</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
