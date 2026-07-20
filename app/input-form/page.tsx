"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/context/../components/FiltersHeader";
import { 
  Save, 
  Sparkles, 
  MessageSquare, 
  Send, 
  CheckCircle, 
  XCircle, 
  AlertTriangle 
} from "lucide-react";

interface KpiItem {
  id: string;
  indicatorCode: string;
  targetValue: number;
  actualValue: number;
  pic: string;
  status: string;
  explanation: string;
  title?: string;
  periodType: string;
}

interface AiForecast {
  indicatorCode: string;
  progress: number;
  forecastProgress: number;
  riskLevel: string;
}

interface SuggestedAction {
  title: string;
  targetIndicator: string;
  impact: string;
}

interface ChatMessage {
  sender: "ai" | "user";
  text: string;
}

export default function InputFormPage() {
  const { filters, currentLoggedUser } = useApp();
  
  // States
  const [kpis, setKpis] = useState<KpiItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);
  
  // AI Results States
  const [aiSummary, setAiSummary] = useState("");
  const [aiForecasts, setAiForecasts] = useState<AiForecast[]>([]);
  const [aiActions, setAiActions] = useState<SuggestedAction[]>([]);
  const [acceptedActions, setAcceptedActions] = useState<Record<number, boolean>>({});
  const [tdvNotes, setTdvNotes] = useState("");

  // Reflection/5 Whys Chat States
  const [q1, setQ1] = useState("");
  const [causeCat, setCauseCat] = useState("Nhân sự");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: "ai", text: "Xin chào! Tôi thấy hiệu suất Doanh thu kỳ này của bạn giảm xuống 72%. Hãy cho biết tại sao kế hoạch không đạt được?" }
  ]);
  const [whyCount, setWhyCount] = useState(1);

  // Security checks
  const isReadOnly = currentLoggedUser?.role === "Người dùng";
  const isDirector = currentLoggedUser?.role === "Admin" || currentLoggedUser?.role === "Quản trị viên"; // Directors simulator

  // Fetch KPIs
  const fetchKpis = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/kpi?unitCode=${filters.unitCode}&periodKey=${filters.periodType}_${filters.month}_${filters.week}&periodType=${filters.periodType}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setKpis(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKpis();
    // Clear AI states on filter change
    setAiSummary("");
    setAiForecasts([]);
    setAiActions([]);
    setAcceptedActions({});
  }, [filters]);

  // Handle actual value input change
  const handleActualChange = (id: string, val: string) => {
    setKpis(prev => prev.map(k => k.id === id ? { ...k, actualValue: parseFloat(val) || 0 } : k));
  };

  // Handle explanation change
  const handleExplanationChange = (id: string, val: string) => {
    setKpis(prev => prev.map(k => k.id === id ? { ...k, explanation: val } : k));
  };

  // Save KPI data and trigger AI analysis
  const handleSaveAndAnalyze = async () => {
    if (isReadOnly) return;
    setSaving(true);
    setAiAnalyzing(true);

    try {
      // 1. Save data to database
      const saveRes = await fetch("/api/kpi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitCode: filters.unitCode,
          periodKey: `${filters.periodType}_${filters.month}_${filters.week}`,
          periodType: filters.periodType,
          kpiUpdates: kpis.map(k => ({
            id: k.id,
            actualValue: k.actualValue,
            explanation: k.explanation,
            status: k.actualValue >= k.targetValue ? "Hoàn thành" : "Đang thực hiện",
          })),
        }),
      });

      const saveResult = await saveRes.json();
      if (saveResult.data) {
        setKpis(saveResult.data);
      }

      // 2. Call AI analyze endpoint
      const aiRes = await fetch("/api/ai/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          unitCode: filters.unitCode,
          periodKey: `${filters.periodType}_${filters.month}_${filters.week}`,
          periodType: filters.periodType,
          kpis: kpis,
        }),
      });

      const aiResult = await aiRes.json();
      setAiSummary(aiResult.summary || "");
      setAiForecasts(aiResult.forecasts || []);
      setAiActions(aiResult.suggestedActions || []);
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
      setAiAnalyzing(false);
    }
  };

  // Chat message send
  const handleSendMessage = () => {
    if (!chatInput.trim() || isReadOnly) return;

    const newMsgs = [...chatMessages, { sender: "user", text: chatInput } as ChatMessage];
    setChatMessages(newMsgs);
    setChatInput("");

    if (whyCount < 5) {
      setTimeout(() => {
        const questions = [
          "Tại sao nhân sự tham gia dự án lại thiếu hụt trong tuần?",
          "Tại sao designer chính lại nghỉ đột xuất và không có người back up?",
          "Tại sao quy trình đào tạo chéo kỹ năng cho team chưa hoàn thành?",
          "Tại sao ngân sách đào tạo nội bộ lại bị trì hoãn duyệt?"
        ];
        setChatMessages(prev => [
          ...prev,
          { sender: "ai", text: `[Why ${whyCount + 1}] Cảm ơn bạn. ${questions[whyCount - 1]}` }
        ]);
        setWhyCount(whyCount + 1);
      }, 1000);
    } else {
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          { sender: "ai", text: "✓ [Nguyên nhân gốc rễ]: Chậm phê duyệt ngân sách và thiếu Skill Matrix dự phòng. Tôi đã đề xuất giải pháp ở Khối 4 phía dưới." }
        ]);
      }, 1000);
    }
  };

  // Accept suggested action
  const toggleAcceptAction = (index: number) => {
    setAcceptedActions(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Director actions
  const handleApproveReport = () => {
    alert("✓ Phê duyệt báo cáo thành công! Dữ liệu đã được khóa và Actions đã đồng bộ sang OKR tháng tiếp theo.");
  };

  const handleRejectReport = () => {
    alert("✖ Đã yêu cầu hiệu chỉnh báo cáo! Trưởng đơn vị đã nhận được thông báo.");
  };

  return (
    <div className="flex flex-col gap-4 pb-12">
      <FiltersHeader />

      {loading ? (
        <div className="glass-panel p-8 text-center text-[var(--text-muted)] text-sm">
          Đang tải dữ liệu nhập liệu KPI...
        </div>
      ) : (
        <>
          {/* KHỐI 1: BẢNG NHẬP LIỆU CHỈ SỐ KPI THỰC TẾ */}
          <div className="glass-panel p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-bold text-white tracking-wider uppercase">
                📋 KHỐI 1: BẢNG NHẬP LIỆU CHỈ SỐ KPI THỰC TẾ
              </h3>
              <button
                onClick={handleSaveAndAnalyze}
                disabled={isReadOnly || saving}
                className="bg-[var(--accent-cyan)] text-slate-950 text-xs font-extrabold px-4 py-2 rounded-lg hover:shadow-[0_0_15px_rgba(0,242,254,0.4)] transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save size={14} />
                {saving ? "Đang lưu..." : "LƯU SỐ LIỆU & AI PHÂN TÍCH"}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/5 text-[var(--text-muted)] font-bold bg-slate-900/50">
                    <th className="p-3 w-16 text-center">Mã</th>
                    <th className="p-3">Tên Chỉ tiêu</th>
                    <th className="p-3 w-28 text-center">Chỉ tiêu</th>
                    <th className="p-3 w-32 text-center">Thực tế đã nhập</th>
                    <th className="p-3 w-20 text-center">Tiến độ</th>
                    <th className="p-3 w-36">Người phụ trách</th>
                  </tr>
                </thead>
                <tbody>
                  {kpis.map(kpi => {
                    const pct = kpi.targetValue > 0 ? Math.round((kpi.actualValue / kpi.targetValue) * 100) : 100;
                    return (
                      <tr key={kpi.id} className="border-b border-white/5 text-[var(--text-muted)] hover:bg-white/5">
                        <td className="p-3 text-center">
                          <code className="bg-white/5 px-1.5 py-0.5 rounded text-[10px]">{kpi.indicatorCode}</code>
                        </td>
                        <td className="p-3 text-white font-medium">{kpi.title || kpi.indicatorCode}</td>
                        <td className="p-3 text-center font-bold">{kpi.targetValue.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <input
                            type="number"
                            value={kpi.actualValue || ""}
                            disabled={isReadOnly}
                            onChange={(e) => handleActualChange(kpi.id, e.target.value)}
                            className="w-24 bg-slate-950 border border-[var(--glass-border)] text-white text-center text-xs font-bold rounded p-1.5 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                          />
                        </td>
                        <td className={`p-3 text-center font-bold ${pct >= 100 ? "text-emerald-400" : pct >= 75 ? "text-yellow-400" : "text-rose-500"}`}>
                          {pct}%
                        </td>
                        <td className="p-3 text-left font-medium">{kpi.pic}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* KHỐI 2: BÁO CÁO ĐÁNH GIÁ TỔNG HỢP & DỰ BÁO TỰ ĐỘNG BỞI AI */}
          {(aiAnalyzing || aiSummary) && (
            <div className="glass-panel p-5 relative overflow-hidden">
              {aiAnalyzing && (
                <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center gap-2 z-10">
                  <Sparkles className="animate-spin text-[var(--accent-cyan)]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    AI Agent đang phân tích & lập dự báo...
                  </span>
                </div>
              )}

              <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-1.5">
                <Sparkles size={16} className="text-[var(--accent-cyan)]" />
                🤖 KHỐI 2: BÁO CÁO ĐÁNH GIÁ TỔNG HỢP & DỰ BÁO TỰ ĐỘNG BỞI AI
              </h3>

              <div className="bg-slate-900/60 border border-[var(--glass-border)] p-4 rounded-lg text-sm text-[var(--text-muted)] mb-5 leading-relaxed">
                {aiSummary}
              </div>

              {/* Grid 3 Forecast Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {aiForecasts.slice(0, 3).map((f, i) => (
                  <div key={f.indicatorCode} className="glass-card flex flex-col justify-between h-[130px]">
                    <div className="flex justify-between items-start">
                      <span className="text-[9px] text-[var(--accent-cyan)] font-extrabold tracking-widest uppercase">
                        Chỉ số: {f.indicatorCode}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        f.riskLevel === "Rất cao" 
                          ? "bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse" 
                          : f.riskLevel === "Cao"
                            ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/20"
                            : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      }`}>
                        ⚠️ Rủi ro {f.riskLevel}
                      </span>
                    </div>
                    <div className="my-2">
                      <div className="text-[10px] text-[var(--text-muted)]">Tiến độ kỳ này</div>
                      <div className="text-xl font-black text-white">{f.progress}%</div>
                    </div>
                    <div className="bg-white/5 p-1.5 rounded text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                      💡 AI Dự báo tháng: {f.forecastProgress}% hoàn thành
                    </div>
                  </div>
                ))}
              </div>

              {/* TĐV notes */}
              <div className="mt-4">
                <label className="block text-[10px] text-[var(--text-muted)] font-bold mb-2 uppercase tracking-wider">
                  Ý kiến ghi chú của Trưởng đơn vị
                </label>
                <textarea
                  value={tdvNotes}
                  onChange={(e) => setTdvNotes(e.target.value)}
                  placeholder="Ghi chú thêm về vận hành đặc thù trong kỳ này..."
                  rows={2}
                  className="w-full bg-slate-950 border border-[var(--glass-border)] rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)] transition-all resize-none"
                />
              </div>
            </div>
          )}

          {/* KHỐI 3: HỘP THÔNG TIN YÊU CẦU GIẢI TRÌNH BẮT BUỘC */}
          {kpis.some(k => k.actualValue < k.targetValue * 0.8) && (
            <div className="glass-panel p-5 border-l-4 border-l-rose-500 bg-rose-500/5">
              <h3 className="text-xs font-bold text-rose-500 tracking-wider uppercase mb-4 flex items-center gap-1.5">
                <AlertTriangle size={16} />
                ⚠️ KHỐI 3: GIẢI TRÌNH BẮT BUỘC (HOÀN THÀNH DƯỚI 80%)
              </h3>
              
              <div className="space-y-4">
                {kpis.filter(k => k.actualValue < k.targetValue * 0.8).map(kpi => (
                  <div key={kpi.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center py-2 border-b border-white/5">
                    <div>
                      <h4 className="text-xs font-bold text-white">{kpi.title || kpi.indicatorCode}</h4>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        Kế hoạch: {kpi.targetValue} | Thực tế: {kpi.actualValue} ({Math.round((kpi.actualValue / kpi.targetValue) * 100)}%)
                      </p>
                    </div>
                    <textarea
                      value={kpi.explanation}
                      disabled={isReadOnly}
                      onChange={(e) => handleExplanationChange(kpi.id, e.target.value)}
                      placeholder="Bắt buộc nhập lý do lỗi cụ thể và giải pháp khắc phục..."
                      rows={2}
                      className="bg-slate-950 border border-rose-500/30 rounded p-2 text-xs text-white focus:outline-none focus:border-rose-500 resize-none w-full"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* KHỐI Phản tỉnh 5 Whys (Phân hệ 5.3) */}
          <div className="glass-panel p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Vùng khảo sát khảo sát */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-[var(--accent-purple)] tracking-wider uppercase mb-2">
                🧠 PHẢN TỈNH CHUYÊN SÂU & ĐÁNH GIÁ CHẤT LƯỢNG (PHÂN HỆ 5.3)
              </h3>
              
              <div>
                <label className="block text-[11px] font-bold text-white mb-1.5">
                  Q1: Đánh giá kết quả: Kết quả thực tế có đạt kỳ vọng không? Mức độ ảnh hưởng?
                </label>
                <textarea
                  value={q1}
                  disabled={isReadOnly}
                  onChange={(e) => setQ1(e.target.value)}
                  placeholder="Đánh giá nhanh về sự tác động..."
                  rows={2}
                  className="w-full bg-slate-950 border border-[var(--glass-border)] rounded text-xs p-2 text-white focus:outline-none focus:border-[var(--accent-cyan)] resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white mb-1.5">
                  Q2: Chọn nhóm nguyên nhân chính cốt lõi ảnh hưởng
                </label>
                <select
                  value={causeCat}
                  disabled={isReadOnly}
                  onChange={(e) => setCauseCat(e.target.value)}
                  className="w-full bg-slate-950 border border-[var(--glass-border)] rounded text-xs p-2 text-white focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer"
                >
                  <option value="Nhân sự">Nhân sự (Thiếu người, năng lực yếu, phối hợp kém)</option>
                  <option value="Quy trình">Quy trình (Rườm rà, thiếu tài liệu hướng dẫn, chậm duyệt)</option>
                  <option value="Công nghệ">Công nghệ & Công cụ (Máy tính yếu, lỗi tool, thiếu tài nguyên)</option>
                  <option value="Khách hàng">Khách hàng / Đối tác (Yêu cầu thay đổi, chậm thanh toán)</option>
                  <option value="Ngân sách">Ngân sách & Chi phí (Bị cắt giảm, thiếu kinh phí)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white mb-1.5">
                  Q3: Đánh giá Action kỳ trước: Đối chiếu lại cam kết và hiệu quả thực tế
                </label>
                <textarea
                  value={q3}
                  disabled={isReadOnly}
                  onChange={(e) => setQ3(e.target.value)}
                  placeholder="Ví dụ: Đã đẩy mạnh SEO - tăng traffic 20%, Action về Asset bị chậm..."
                  rows={2}
                  className="w-full bg-slate-950 border border-[var(--glass-border)] rounded text-xs p-2 text-white focus:outline-none focus:border-[var(--accent-cyan)] resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-white mb-1.5">
                  Q4: Cam kết kế hoạch kỳ tiếp theo: Tiếp tục gì? Dừng gì? Bắt đầu làm gì mới?
                </label>
                <textarea
                  value={q4}
                  disabled={isReadOnly}
                  onChange={(e) => setQ4(e.target.value)}
                  placeholder="Nhập cam kết cải tiến..."
                  rows={2}
                  className="w-full bg-slate-950 border border-[var(--glass-border)] rounded text-xs p-2 text-white focus:outline-none focus:border-[var(--accent-cyan)] resize-none"
                />
              </div>
            </div>

            {/* Vùng Chatbot 5 Whys */}
            <div className="flex flex-col border-l border-[var(--glass-border)] pl-6">
              <h3 className="text-xs font-bold text-[var(--accent-cyan)] tracking-wider uppercase mb-4 flex items-center gap-1.5">
                <MessageSquare size={16} />
                💬 HỘI THOẠI 5 WHYS TÌM NGUYÊN NHÂN GỐC RỄ
              </h3>

              {/* Chat Messages Panel */}
              <div className="flex-1 min-h-[220px] max-h-[220px] overflow-y-auto bg-slate-950/60 border border-[var(--glass-border)] rounded-lg p-3 space-y-2 mb-3">
                {chatMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed ${
                        msg.sender === "user" 
                          ? "bg-[var(--accent-purple)] text-white" 
                          : "bg-slate-900 text-[var(--text-muted)] border border-white/5"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  disabled={isReadOnly}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={whyCount < 5 ? `Why ${whyCount}: Trả lời nguyên nhân của bạn...` : "Nhập tin nhắn..."}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-slate-950 border border-[var(--glass-border)] text-white text-xs rounded-lg px-3 py-2 focus:outline-none focus:border-[var(--accent-cyan)] disabled:opacity-60"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isReadOnly}
                  className="bg-[var(--accent-cyan)] text-slate-950 p-2 rounded-lg hover:shadow-[0_0_10px_rgba(0,242,254,0.3)] transition-all disabled:opacity-50"
                >
                  <Send size={14} />
                </button>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] mt-1.5 font-semibold">
                Tiến độ phản tỉnh: {whyCount}/5 câu hỏi cốt lõi
              </div>
            </div>

          </div>

          {/* KHỐI 4: GỢI Ý HÀNH ĐỘNG KỲ TIẾP THEO (AI SUGGESTED ACTIONS) */}
          {aiActions.length > 0 && (
            <div className="glass-panel p-5">
              <h3 className="text-xs font-bold text-white tracking-wider uppercase mb-4">
                💡 KHỐI 4: GỢI Ý HÀNH ĐỘNG KỲ TIẾP THEO (AI-GENERATED ACTIONS)
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-[var(--text-muted)] font-bold bg-slate-900/50">
                      <th className="p-3">Hành động khắc phục đề xuất</th>
                      <th className="p-3 w-40">Chỉ tiêu tác động</th>
                      <th className="p-3 w-64">Kỳ vọng giải quyết (Impact)</th>
                      <th className="p-3 w-32 text-center">Quyết định TĐV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {aiActions.map((action, i) => {
                      const isAccepted = !!acceptedActions[i];
                      return (
                        <tr key={i} className="border-b border-white/5 text-[var(--text-muted)] hover:bg-white/5">
                          <td className="p-3 text-white font-semibold">{action.title}</td>
                          <td className="p-3">
                            <code className="bg-white/5 px-1.5 py-0.5 rounded text-[10px]">{action.targetIndicator}</code>
                          </td>
                          <td className="p-3 italic">{action.impact}</td>
                          <td className="p-3 text-center">
                            <button
                              onClick={() => toggleAcceptAction(i)}
                              className={`text-[10px] font-extrabold px-3 py-1.5 rounded-lg border transition-all ${
                                isAccepted 
                                  ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                                  : "bg-slate-950 text-[var(--text-muted)] border-[var(--glass-border)] hover:text-white"
                              }`}
                            >
                              {isAccepted ? "✓ ĐÃ CHẤP NHẬN" : "➕ CHẤP NHẬN"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* KHỐI 5: KHU VỰC TƯƠNG TÁC & PHÊ DUYỆT CỦA GIÁM ĐỐC BU SCVN */}
          <div className="glass-panel p-5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xs font-bold text-white tracking-wider uppercase">
                🔑 KHỐI 5: THẨM ĐỊNH & DUYỆT BÁO CÁO CỦA GIÁM ĐỐC BU
              </h3>
              <p className="text-[10px] text-[var(--text-muted)] mt-1 font-medium">
                Chỉ dành riêng cho Giám đốc BU SCVN hoặc Admin phê duyệt báo cáo cuối kỳ để đồng bộ số liệu.
              </p>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleRejectReport}
                disabled={!isDirector}
                className="bg-rose-500/10 text-rose-500 border border-rose-500/30 hover:bg-rose-500/20 text-xs font-extrabold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <XCircle size={14} />
                YÊU CẦU HIỆU CHỈNH (REJECT)
              </button>
              <button
                onClick={handleApproveReport}
                disabled={!isDirector}
                className="bg-emerald-500 text-slate-950 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] text-xs font-extrabold px-4 py-2 rounded-lg transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle size={14} />
                PHÊ DUYỆT BÁO CÁO (APPROVE)
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
