"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import { 
  Save, 
  Sparkles, 
  AlertTriangle, 
  Check, 
  X, 
  Plus, 
  FolderPlus,
  Send,
  Database,
  Lock
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

export default function InputFormPage() {
  const { filters, currentLoggedUser, setCurrentLoggedUser } = useApp();

  // 1. Dữ liệu bảng chỉ tiêu cho Wolfoo (Khớp 100% với screenshot)
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

  const [kpis, setKpis] = useState<KpiItem[]>(defaultWolfooKpis);
  const [reportNotes, setReportNotes] = useState("");
  const [reportStatus, setReportStatus] = useState("Đang nhập");
  const [explanations, setExplanations] = useState<Record<string, string>>({
    "VM2-I01.01": "Giải trình do nhân sự thiết kế chính xin nghỉ 3 ngày giữa tuần ảnh hưởng tốc độ kết xuất."
  });
  
  // Khối 4: Suggested Actions
  const [actions, setActions] = useState<ActionItem[]>([
    { id: 1, title: "Chuẩn hóa thư viện asset dùng chung để đẩy nhanh tốc độ diễn hoạt", indicator: "VM2-I01.01", impact: "Tăng sản lượng thêm 2 tập/tuần", status: "Chờ quyết định" }
  ]);

  // Khối 5: Chỉ đạo GĐBU
  const [directorComment, setDirectorComment] = useState("");

  const isReadOnly = currentLoggedUser?.role === "Người dùng";

  // Đồng bộ thay đổi dữ liệu theo đơn vị được lọc
  useEffect(() => {
    if (filters.unitCode === "Wofloo") {
      setKpis(defaultWolfooKpis);
    } else {
      // Giả lập các đơn vị khác
      setKpis(defaultWolfooKpis.map(k => ({
        ...k,
        actual: Math.round(k.target * (0.85 + Math.random() * 0.3))
      })));
    }
  }, [filters]);

  const handleInputChange = (code: string, val: string) => {
    setKpis(prev => prev.map(k => k.code === code ? { ...k, actual: parseFloat(val) || 0 } : k));
  };

  // Lưu dòng đơn lẻ (Khớp với nút [Lưu dòng])
  const handleSaveRow = (code: string) => {
    if (isReadOnly) return;
    setKpis(prev => prev.map(k => k.code === code ? { ...k, status: "Đang nhập" } : k));
    alert(`✓ Đã lưu tạm dữ liệu của chỉ tiêu: ${code}`);
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
    const title = prompt("Nhập tiêu đề hành động chủ động:");
    if (!title) return;
    const indicator = prompt("Nhập mã chỉ tiêu tác động:", "VM2-I01.01");
    if (!indicator) return;
    const impact = prompt("Nhập kỳ vọng giải quyết (Impact):", "Tối ưu hóa thời gian");
    if (!indicator) return;

    setActions(prev => [
      ...prev,
      { id: Date.now(), title, indicator, impact, status: "Chờ quyết định" }
    ]);
  };

  const handleSendReport = () => {
    setReportStatus("Chờ duyệt");
    alert("🚀 Đã gửi báo cáo lên Giám đốc BU SCVN duyệt thành công!");
  };

  const handleSaveDraft = () => {
    alert("💾 Đã lưu nháp báo cáo toàn kỳ!");
  };

  // Lọc lấy các chỉ số lỗi (< 80%) để đưa vào Khối 3 giải trình
  const failedKpis = kpis.filter(k => k.target > 0 && (k.actual / k.target) < 0.8);

  // Group KPIs by their category header for presentation
  const groups = Array.from(new Set(kpis.map(k => k.group)));

  return (
    <div className="flex flex-col gap-6 pb-16">
      {/* FREEZE FILTERS */}
      <FiltersHeader />

      {/* KHU VỰC 1: BẢNG NHẬP LIỆU CHỈ SỐ KPI THỰC TẾ */}
      <div className="glass-panel p-5">
        <h3 className="text-sm font-bold text-[#10b981] tracking-wider uppercase mb-4">
          🟢 KHU VỰC 1: BẢNG NHẬP LIỆU CHỈ SỐ KPI THỰC TẾ (HÀNG TUẦN) - BỘ PHẬN: {filters.unitCode.toUpperCase()}
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
                    {/* Header Row */}
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
                          <td className={`p-3 text-center font-bold ${pct >= 100 ? "text-emerald-400" : pct >= 75 ? "text-yellow-400" : "text-rose-500"}`}>
                            {pct}%
                          </td>
                          <td className="p-3 text-center font-bold text-yellow-400">
                            {reportStatus}
                          </td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => handleSaveRow(kpi.code)}
                              disabled={isReadOnly || reportStatus === "Chờ duyệt"}
                              className="bg-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/80 text-white font-bold text-[9px] px-2.5 py-1.5 rounded transition-all disabled:opacity-40"
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
      <div className="glass-panel p-5">
        <h3 className="text-sm font-bold text-[#00f2fe] tracking-wider uppercase mb-4 flex items-center gap-1.5">
          <Sparkles size={16} />
          🤖 KHỐI 2: BÁO CÁO ĐÁNH GIÁ TỔNG HỢP & DỰ BÁO TỰ ĐỘNG BỞI AI
        </h3>

        {/* 3 AI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          {/* Card A: Doanh thu */}
          <div className="glass-card flex flex-col justify-between h-[180px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-white font-extrabold uppercase tracking-wide">
                🟢 DOANH THU (VM1-I02.01)
              </span>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Đạt 91%
              </span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)] space-y-1 my-2">
              <div>Thực tế: <span className="font-bold text-white">83,574,400 VNĐ</span></div>
              <div>KH: <span className="font-semibold text-slate-300">91,840,000 VNĐ</span></div>
              <div>So với tuần trước: <span className="font-bold text-emerald-400">N/A</span></div>
              <div>Đề xuất: <span className="text-emerald-400 font-bold">Duy trì</span></div>
            </div>
            <div className="bg-slate-950 p-2 rounded text-[10px] text-emerald-400 font-bold flex justify-between items-center border border-white/5">
              <span>💡 AI DỰ BÁO THÁNG: Dự kiến đạt 91% KH</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[8px] uppercase font-extrabold">Thấp</span>
            </div>
          </div>

          {/* Card B: Traffic */}
          <div className="glass-card flex flex-col justify-between h-[180px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-white font-extrabold uppercase tracking-wide">
                📊 TRAFFIC (TM3-I01.02)
              </span>
              <span className="text-[10px] font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                Đạt 96%
              </span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)] space-y-1 my-2">
              <div>Thực tế: <span className="font-bold text-white">17,107,200 Lượt</span></div>
              <div>KH: <span className="font-semibold text-slate-300">17,820,000 Lượt</span></div>
              <div>So với tuần trước: <span className="font-bold text-emerald-400">N/A</span></div>
              <div>Đề xuất: <span className="text-emerald-400 font-bold">Duy trì</span></div>
            </div>
            <div className="bg-slate-950 p-2 rounded text-[10px] text-emerald-400 font-bold flex justify-between items-center border border-white/5">
              <span>💡 AI DỰ BÁO THÁNG: Dự kiến đạt 96% KH</span>
              <span className="bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded text-[8px] uppercase font-extrabold">Thấp</span>
            </div>
          </div>

          {/* Card C: Sản lượng */}
          <div className="glass-card flex flex-col justify-between h-[180px]">
            <div className="flex justify-between items-start">
              <span className="text-[10px] text-white font-extrabold uppercase tracking-wide">
                🪵 SẢN LƯỢNG (VM2-I01.01)
              </span>
              <span className="text-[10px] font-black text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                Đạt 73%
              </span>
            </div>
            <div className="text-[11px] text-[var(--text-muted)] space-y-1 my-2">
              <div>Thực tế: <span className="font-bold text-white">8 Video</span></div>
              <div>KH: <span className="font-semibold text-slate-300">11 Video</span></div>
              <div>So với tuần trước: <span className="font-bold text-rose-400">N/A</span></div>
              <div>Đề xuất: <span className="text-rose-400 font-bold">Tối ưu asset, tăng phái sinh</span></div>
            </div>
            <div className="bg-slate-950 p-2 rounded text-[10px] text-rose-500 font-bold flex justify-between items-center border border-white/5">
              <span>💡 AI DỰ BÁO THÁNG: Dự kiến đạt 73% KH</span>
              <span className="bg-rose-500/20 text-rose-500 px-1.5 py-0.5 rounded text-[8px] uppercase font-extrabold animate-pulse">Rất cao</span>
            </div>
          </div>
        </div>

        {/* CHỈ TIÊU BỔ SUNG & PHỤ TRỢ TRONG KỲ */}
        <div className="bg-slate-950/40 border border-white/5 p-4 rounded-lg mb-4">
          <h4 className="text-[10px] text-[var(--text-muted)] font-extrabold uppercase tracking-wider mb-2">
            ⚙️ Chỉ tiêu bổ sung & phụ trợ trong kỳ
          </h4>
          <div className="flex flex-wrap gap-2">
            {kpis.slice(2).map(k => {
              const pct = Math.round((k.actual / k.target) * 100);
              return (
                <span key={k.code} className="bg-white/5 border border-white/10 rounded px-2.5 py-1 text-[10px] text-slate-300 flex items-center gap-1.5">
                  <span className="font-bold text-[var(--accent-cyan)]">{k.code}</span>
                  <span>{k.title}:</span>
                  <span className="font-bold text-white">{k.actual.toLocaleString()} {k.unit}</span>
                  <span className={`font-black ${pct >= 100 ? "text-emerald-400" : "text-yellow-400"}`}>{pct}%</span>
                </span>
              );
            })}
          </div>
        </div>

        {/* Ý kiến Trưởng đơn vị */}
        <div className="flex flex-col gap-2">
          <label className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
            ✍️ Ghi chú sự kiện vận hành đặc thù (Ý kiến Trưởng đơn vị):
          </label>
          <textarea
            value={reportNotes}
            onChange={(e) => setReportNotes(e.target.value)}
            placeholder="Ghi chú thêm các sự kiện vận hành đặc thù của riêng kỳ báo cáo này..."
            rows={2}
            className="w-full bg-slate-950 border border-[var(--glass-border)] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] transition-all resize-none"
          />
          <div className="text-right">
            <button
              onClick={handleSaveNotes}
              className="bg-[var(--accent-cyan)] text-slate-950 text-[10px] font-extrabold px-3 py-1.5 rounded hover:shadow-[0_0_10px_rgba(0,242,254,0.3)] transition-all"
            >
              💾 Lưu ghi chú
            </button>
          </div>
        </div>
      </div>

      {/* KHỐI 3: HỘP THÔNG TIN YÊU CẦU GIẢI TRÌNH BẮT BUỘC */}
      {failedKpis.length > 0 && (
        <div className="glass-panel p-5 border-l-4 border-l-rose-500 bg-rose-500/5">
          <h3 className="text-xs font-bold text-rose-500 tracking-wider uppercase mb-3 flex items-center gap-1.5">
            <AlertTriangle size={16} />
            ⚠️ KHỐI 3: HỘP THÔNG TIN YÊU CẦU GIẢI TRÌNH (BẮT BUỘC BỞI AI)
          </h3>
          <p className="text-[10px] text-[var(--text-muted)] mb-4">
            AI tự động phát hiện các chỉ số lỗi/bất thường dưới ngưỡng quy định. Bạn bắt buộc phải nhập giải trình trước khi gửi báo cáo.
          </p>

          <div className="space-y-4">
            {failedKpis.map(kpi => {
              const pct = Math.round((kpi.actual / kpi.target) * 100);
              return (
                <div key={kpi.code} className="bg-slate-950 border border-rose-500/20 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-xs font-bold text-white">
                      ⚠️ Chỉ tiêu {kpi.code} - {kpi.title} (Đạt {pct}%)
                    </span>
                    <span className="text-[9px] font-bold bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded">
                      Rủi ro tháng: Rất cao
                    </span>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <textarea
                      value={explanations[kpi.code] || ""}
                      onChange={(e) => setExplanations(prev => ({ ...prev, [kpi.code]: e.target.value }))}
                      placeholder="Giải trình lý do cụ thể và đề xuất giải pháp tạm thời (tối thiểu 10 ký tự)..."
                      rows={2}
                      className="flex-1 bg-slate-950 border border-rose-500/30 rounded p-2 text-xs text-white focus:outline-none focus:border-rose-500 resize-none w-full"
                    />
                    <span className="text-[10px] text-rose-400 font-extrabold shrink-0">
                      Yêu cầu giải trình bắt buộc
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="text-right">
              <button
                onClick={handleSaveExplanations}
                className="bg-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] transition-all"
              >
                💾 Lưu Giải Trình
              </button>
            </div>
          </div>
        </div>
      )}

      {/* KHỐI 4: GỢI Ý HÀNH ĐỘNG KỲ TIẾP THEO (AI-GENERATED ACTIONS) */}
      <div className="glass-panel p-5">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xs font-bold text-[#8b5cf6] tracking-wider uppercase">
              ⚡ KHỐI 4: GỢI Ý HÀNH ĐỘNG KỲ TIẾP THEO (AI-GENERATED ACTIONS)
            </h3>
            <p className="text-[10px] text-[var(--text-muted)] mt-1">
              Đề xuất tự động từ AI Agent dựa trên bối cảnh dữ liệu. Hãy chọn các giải pháp phù hợp để chốt kế hoạch kỳ sau.
            </p>
          </div>
          <button
            onClick={handleAddCustomAction}
            disabled={isReadOnly}
            className="bg-slate-900 hover:bg-slate-800 border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-all disabled:opacity-40"
          >
            <Plus size={12} />
            Thêm hành động chủ động
          </button>
        </div>

        <div className="overflow-x-auto border border-white/5 rounded">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[var(--text-muted)] font-bold bg-slate-900/50">
                <th className="p-3">Tên hành động khắc phục đề xuất</th>
                <th className="p-3 w-40 text-center">Chỉ tiêu tác động</th>
                <th className="p-3 w-52 text-center">Kỳ vọng giải quyết</th>
                <th className="p-3 w-40 text-center">Trạng thái duyệt</th>
                <th className="p-3 w-44 text-center">Tương tác</th>
              </tr>
            </thead>
            <tbody>
              {actions.map(action => (
                <tr key={action.id} className="border-b border-white/5 hover:bg-white/5 text-[11px] text-[var(--text-muted)]">
                  <td className="p-3 text-white font-semibold">{action.title}</td>
                  <td className="p-3 text-center">
                    <code className="bg-white/5 px-1.5 py-0.5 rounded text-[10px] text-white">{action.indicator}</code>
                  </td>
                  <td className="p-3 text-center italic text-slate-300">{action.impact}</td>
                  <td className="p-3 text-center font-bold text-yellow-500">{action.status}</td>
                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleAcceptAction(action.id)}
                        disabled={isReadOnly || action.status !== "Chờ quyết định"}
                        className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-[10px] px-2.5 py-1.5 rounded flex items-center gap-1 transition-all disabled:opacity-40"
                      >
                        <Check size={12} /> Chọn
                      </button>
                      <button
                        onClick={() => handleSkipAction(action.id)}
                        disabled={isReadOnly || action.status !== "Chờ quyết định"}
                        className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 font-bold text-[10px] px-2.5 py-1.5 rounded flex items-center gap-1 transition-all disabled:opacity-40"
                      >
                        <X size={12} /> Bỏ qua
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
      <div className="glass-panel p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-3 mb-4 gap-3">
          <h3 className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
            👑 KHỐI 5: KHU VỰC TƯƠNG TÁC & PHÊ DUYỆT CỦA GIÁM ĐỐC BU SCVN
          </h3>
          <div className="flex items-center gap-4 text-[10px] font-bold">
            <span className="text-[var(--text-muted)]">
              Trạng thái báo cáo: <span className="text-yellow-400 uppercase font-black ml-1">{reportStatus}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-[var(--text-muted)]">Vai trò giả lập:</span>
              <select
                value={currentLoggedUser?.role || "Trưởng đơn vị"}
                onChange={(e) => {
                  const targetRole = e.target.value;
                  const targetUser = {
                    id: currentLoggedUser?.id || "1",
                    employeeCode: currentLoggedUser?.employeeCode || "SCN001",
                    fullname: currentLoggedUser?.fullname || "Trần Thị Thu Hương",
                    email: currentLoggedUser?.email || "huongttt@s-connect.net",
                    role: targetRole,
                    unitCode: currentLoggedUser?.unitCode || "Wofloo"
                  };
                  setCurrentLoggedUser(targetUser);
                }}
                className="bg-slate-900 border border-[var(--glass-border)] text-white text-[10px] rounded px-1.5 py-1 focus:outline-none"
              >
                <option value="Admin">Admin</option>
                <option value="Quản trị viên">Quản trị viên</option>
                <option value="Trưởng đơn vị">Trưởng đơn vị (TĐV)</option>
                <option value="Người dùng">Người dùng</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">
            Ý kiến chỉ đạo của Giám đốc BU (Dành riêng cho GĐBU):
          </label>
          <textarea
            value={directorComment}
            onChange={(e) => setDirectorComment(e.target.value)}
            disabled={currentLoggedUser?.role !== "Admin" && currentLoggedUser?.role !== "Quản trị viên"}
            placeholder="Nhập ý kiến chỉ đạo, nhận xét hoặc lý do yêu cầu hiệu chỉnh..."
            rows={2}
            className="w-full bg-slate-950 border border-[var(--glass-border)] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] transition-all resize-none disabled:opacity-50"
          />
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-2">
            {currentLoggedUser?.role === "Admin" || currentLoggedUser?.role === "Quản trị viên" ? (
              <>
                <button
                  onClick={() => {
                    setReportStatus("Đã duyệt");
                    alert("✓ Báo cáo đã được phê duyệt! Toàn bộ số liệu vận hành đã khóa và các Actions được duyệt đã tự động đồng bộ sang Module 5.2 của kỳ kế tiếp.");
                  }}
                  className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-[10px] font-extrabold px-4 py-2 rounded transition-all"
                >
                  ✓ PHÊ DUYỆT BÁO CÁO (APPROVE)
                </button>
                <button
                  onClick={() => {
                    setReportStatus("Đang nhập");
                    alert("✖ Đã từ chối duyệt báo cáo. Báo cáo được mở khóa (trả về Trạng thái nháp) để Trưởng đơn vị chỉnh sửa.");
                  }}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 border border-rose-500/20 text-[10px] font-bold px-4 py-2 rounded transition-all"
                >
                  ✖ YÊU CẦU HIỆU CHỈNH (REJECT)
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleSaveDraft}
                  disabled={isReadOnly || reportStatus === "Chờ duyệt" || reportStatus === "Đã duyệt"}
                  className="bg-slate-900 hover:bg-slate-800 border border-white/10 text-white text-[10px] font-bold px-4 py-2 rounded transition-all disabled:opacity-40"
                >
                  💾 Lưu nháp (Draft)
                </button>
                <button
                  onClick={handleSendReport}
                  disabled={isReadOnly || reportStatus === "Chờ duyệt" || reportStatus === "Đã duyệt"}
                  className="bg-white text-slate-950 hover:bg-slate-100 text-[10px] font-extrabold px-4 py-2 rounded transition-all disabled:opacity-40"
                >
                  🚀 Gửi báo cáo cho Giám đốc BU
                </button>
              </>
            )}
          </div>
          <div className="text-[9px] text-[var(--text-muted)] italic">
            Lưu ý: Báo cáo sau khi gửi sẽ bị khóa dữ liệu nhập cho đến khi được duyệt hoặc từ chối duyệt.
          </div>
        </div>
      </div>
    </div>
  );
}
