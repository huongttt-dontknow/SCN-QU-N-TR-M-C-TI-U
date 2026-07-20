"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import { 
  Target, 
  Calendar, 
  User, 
  ChevronRight, 
  ChevronDown,
  X
} from "lucide-react";

interface ActionItem {
  id: string;
  title: string;
  pic: string;
  startDate: string;
  endDate: string;
  progress: number;
  status: string;
}

interface KeyResultItem {
  id: string;
  title: string;
  weight: number;
  progress: number;
  priority: string;
  pic: string;
  deadline: string;
  actions: ActionItem[];
}

interface ObjectiveItem {
  id: string;
  title: string;
  weight: number;
  progress: number;
  aiForecastProgress: number;
  aiRiskLevel: string;
  keyResults: KeyResultItem[];
}

export default function OkrStrategyPage() {
  const { filters, currentLoggedUser } = useApp();
  const [objectives, setObjectives] = useState<ObjectiveItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [expandedKr, setExpandedKr] = useState<Record<string, boolean>>({});

  // Modal states
  const [isObjModalOpen, setIsObjModalOpen] = useState(false);
  const [isKrModalOpen, setIsKrModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);

  // Active parent IDs
  const [activeObjId, setActiveObjId] = useState("");
  const [activeKrId, setActiveKrId] = useState("");

  // Objective Form States
  const [objTitle, setObjTitle] = useState("");
  const [objWeight, setObjWeight] = useState("30");
  const [objPic, setObjPic] = useState("");

  // KR Form States
  const [krTitle, setKrTitle] = useState("");
  const [krWeight, setKrWeight] = useState("25");
  const [krPic, setKrPic] = useState("");
  const [krDeadline, setKrDeadline] = useState("");

  // Action Form States
  const [actionTitle, setActionTitle] = useState("");
  const [actionPic, setActionPic] = useState("");
  const [actionStart, setActionStart] = useState("");
  const [actionEnd, setActionEnd] = useState("");

  // Check editable permission
  const isEditable = 
    currentLoggedUser?.role === "Admin" || 
    currentLoggedUser?.role === "Quản trị viên" || 
    (currentLoggedUser?.role === "Trưởng đơn vị" && currentLoggedUser?.unitCode === filters.unitCode);

  const fetchOkrs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/okrs?unitCode=${filters.unitCode}&period=${filters.periodType === "weekly" ? "M" + filters.month : filters.quarter}_${filters.year}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setObjectives(data);
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

  // Open Modal Helpers
  const handleOpenObjModal = () => {
    if (!isEditable) return;
    setObjTitle("");
    setObjWeight("30");
    setObjPic(currentLoggedUser?.fullname || "Lê Quỳnh Nga");
    setIsObjModalOpen(true);
  };

  const handleOpenKrModal = (objId: string) => {
    if (!isEditable) return;
    setActiveObjId(objId);
    setKrTitle("");
    setKrWeight("25");
    setKrPic(currentLoggedUser?.fullname || "Lê Quỳnh Nga");
    setKrDeadline(new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setIsKrModalOpen(true);
  };

  const handleOpenActionModal = (krId: string) => {
    if (!isEditable) return;
    setActiveKrId(krId);
    setActionTitle("");
    setActionPic(currentLoggedUser?.fullname || "Lê Quỳnh Nga");
    setActionStart(new Date().toISOString().split('T')[0]);
    setActionEnd(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);
    setIsActionModalOpen(true);
  };

  // Submissions
  const handleSubmitObjective = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!objTitle) return;

    try {
      const res = await fetch("/api/okrs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "objective",
          data: {
            unitCode: filters.unitCode,
            title: objTitle,
            weight: parseFloat(objWeight) || 10,
            period: `${filters.periodType === "weekly" ? "M" + filters.month : filters.quarter}_${filters.year}`,
          }
        }),
      });

      if (res.ok) {
        setIsObjModalOpen(false);
        fetchOkrs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitKr = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!krTitle) return;

    try {
      const res = await fetch("/api/okrs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "kr",
          data: {
            objectiveId: activeObjId,
            title: krTitle,
            weight: parseFloat(krWeight) || 25,
            pic: krPic,
            priority: "Medium",
            deadline: new Date(krDeadline).toISOString(),
          }
        }),
      });

      if (res.ok) {
        setIsKrModalOpen(false);
        fetchOkrs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmitAction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actionTitle) return;

    try {
      const res = await fetch("/api/okrs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "action",
          data: {
            keyResultId: activeKrId,
            unitCode: filters.unitCode,
            title: actionTitle,
            pic: actionPic,
            startDate: new Date(actionStart).toISOString(),
            endDate: new Date(actionEnd).toISOString(),
          }
        }),
      });

      if (res.ok) {
        setIsActionModalOpen(false);
        fetchOkrs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Tính các chỉ số Micro cards
  const totalObjCount = objectives.length;
  const avgOkrProgress = objectives.length > 0 
    ? Math.round(objectives.reduce((sum, o) => sum + o.progress * (o.weight / 100), 0))
    : 0;
  
  const totalKrs = objectives.reduce((sum, o) => sum + o.keyResults.length, 0);
  const completedKrs = objectives.reduce((sum, o) => 
    sum + o.keyResults.filter(k => k.progress === 100).length, 0
  );

  return (
    <div className="flex flex-col gap-4 relative">
      <FiltersHeader />

      {/* FREEZE MICRO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-4 flex flex-col justify-between h-[100px]">
          <span className="text-[10px] text-[var(--text-muted)] font-extrabold tracking-wider uppercase">
            Mục tiêu (Objectives) kỳ này
          </span>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-2xl font-black text-white">{totalObjCount} Mục tiêu</span>
            <span className="text-xs text-[var(--text-muted)]">Đã thiết lập</span>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col justify-between h-[100px]">
          <span className="text-[10px] text-[var(--text-muted)] font-extrabold tracking-wider uppercase">
            Tiến độ hoàn thành OKR đơn vị
          </span>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-2xl font-black text-emerald-400">{avgOkrProgress}%</span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
              Đúng tiến độ
            </span>
          </div>
        </div>

        <div className="glass-panel p-4 flex flex-col justify-between h-[100px]">
          <span className="text-[10px] text-[var(--text-muted)] font-extrabold tracking-wider uppercase">
            Kết quả then chốt đã xong
          </span>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-2xl font-black text-white">{completedKrs} / {totalKrs} KRs</span>
            <span className="text-xs text-[var(--text-muted)]">
              {totalKrs > 0 ? Math.round((completedKrs / totalKrs) * 100) : 0}% hoàn thành
            </span>
          </div>
        </div>
      </div>

      {/* OKR TREE STRUCTURE */}
      <div className="flex justify-between items-center mt-2">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          🌳 BẢN ĐỒ CHIẾN LƯỢC & THIẾT LẬP OKR ĐƠN VỊ
        </h2>
        <button
          onClick={handleOpenObjModal}
          disabled={!isEditable}
          className="bg-[var(--accent-cyan)] text-slate-950 text-xs font-extrabold px-3 py-1.5 rounded hover:shadow-[0_0_10px_rgba(0,242,254,0.3)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + THÊM MỤC TIÊU (O)
        </button>
      </div>

      {loading ? (
        <div className="glass-panel p-8 text-center text-[var(--text-muted)] text-sm">
          Đang tải cấu trúc OKRs...
        </div>
      ) : (
        <div className="space-y-6">
          {objectives.map(obj => (
            <div key={obj.id} className="glass-panel p-5">
              
              {/* Header Objective */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/5 pb-3 mb-4 gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 flex items-center justify-center text-[var(--accent-cyan)]">
                    <Target size={16} />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-white">
                      O: {obj.title}
                    </h3>
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold">
                      Trọng số: {obj.weight}% | Tiến độ: {obj.progress}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {obj.aiRiskLevel && (
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      obj.aiRiskLevel === "Rất cao"
                        ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                        : "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                    }`}>
                      🤖 Rủi ro AI: {obj.aiRiskLevel}
                    </span>
                  )}
                  <button
                    onClick={() => handleOpenKrModal(obj.id)}
                    disabled={!isEditable}
                    className="bg-white/5 border border-white/10 text-[var(--text-muted)] hover:text-white text-xs font-bold px-3 py-1.5 rounded transition-all disabled:opacity-50"
                  >
                    + Thêm KR con
                  </button>
                </div>
              </div>

              {/* Key Results list */}
              <div className="space-y-4">
                {obj.keyResults.map(kr => {
                  const isOpen = !!expandedKr[kr.id];
                  return (
                    <div key={kr.id} className="bg-slate-950/40 border border-white/5 rounded-lg p-4">
                      
                      {/* KR Row Header */}
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleKr(kr.id)}
                            className="text-[var(--accent-cyan)] focus:outline-none"
                          >
                            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                          <div>
                            <h4 className="font-bold text-xs text-white">
                              KR: {kr.title}
                            </h4>
                            <span className="text-[10px] text-[var(--text-muted)] font-medium">
                              Trọng số: {kr.weight}% | Deadline: {new Date(kr.deadline).toLocaleDateString("vi-VN")}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <span className="text-[10px] text-[var(--text-muted)] block">Tiến độ</span>
                            <span className="text-xs font-extrabold text-[var(--accent-cyan)]">{kr.progress}%</span>
                          </div>
                          <button
                            onClick={() => handleOpenActionModal(kr.id)}
                            disabled={!isEditable}
                            className="bg-[var(--accent-purple)]/10 text-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/20 border border-[var(--accent-purple)]/20 text-[10px] font-bold px-2 py-1 rounded transition-all disabled:opacity-50"
                          >
                            + Thêm Action
                          </button>
                        </div>
                      </div>

                      {/* Actions List (Child actions expandable) */}
                      {isOpen && (
                        <div className="mt-3 pl-6 border-t border-white/5 pt-3 space-y-2">
                          {kr.actions.length === 0 ? (
                            <p className="text-[10px] text-[var(--text-muted)] italic">
                              Chưa có hành động con nào được thiết lập.
                            </p>
                          ) : (
                            kr.actions.map(act => (
                              <div key={act.id} className="flex justify-between items-center py-2 border-b border-white/5 text-[11px]">
                                <div className="flex items-center gap-2">
                                  <span className="text-[var(--accent-purple)]">↳ Action:</span>
                                  <span className="text-slate-300 font-medium">{act.title}</span>
                                </div>
                                <div className="flex items-center gap-6">
                                  <div className="flex items-center gap-1 text-[var(--text-muted)]">
                                    <User size={10} />
                                    <span>PIC: {act.pic}</span>
                                  </div>
                                  <div className="flex items-center gap-1 text-[var(--text-muted)]">
                                    <Calendar size={10} />
                                    <span>{new Date(act.startDate).toLocaleDateString("vi-VN")} - {new Date(act.endDate).toLocaleDateString("vi-VN")}</span>
                                  </div>
                                  <span className="font-extrabold text-white">{act.progress}%</span>
                                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold ${
                                    act.status === "Hoàn thành" 
                                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                                      : "bg-slate-900 text-[var(--text-muted)] border border-white/5"
                                  }`}>
                                    {act.status}
                                  </span>
                                </div>
                              </div>
                            ))
                          )}
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>
          ))}
        </div>
      )}

      {/* MODAL 1: THIẾT LẬP MỤC TIÊU (OBJECTIVE) MỚI - Match screenshot */}
      {isObjModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl p-6 relative">
            <button 
              onClick={() => setIsObjModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[var(--accent-pink)]">🎯</span>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">
                Thiết lập mục tiêu (Objective) mới
              </h3>
            </div>

            <form onSubmit={handleSubmitObjective} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                  Tên mục tiêu (Objective):
                </label>
                <input
                  type="text"
                  required
                  value={objTitle}
                  onChange={(e) => setObjTitle(e.target.value)}
                  placeholder="Nhập tên mục tiêu của bạn..."
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                    Trọng số (%):
                  </label>
                  <input
                    type="number"
                    required
                    value={objWeight}
                    onChange={(e) => setObjWeight(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                    Người phụ trách (PIC):
                  </label>
                  <input
                    type="text"
                    required
                    value={objPic}
                    onChange={(e) => setObjPic(e.target.value)}
                    placeholder="Tên người phụ trách..."
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsObjModalOpen(false)}
                  className="bg-slate-950 text-slate-300 border border-white/10 hover:bg-slate-900 text-xs font-bold px-4 py-2 rounded-lg transition-all"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="bg-white text-slate-950 hover:bg-slate-100 text-xs font-extrabold px-4 py-2 rounded-lg transition-all"
                >
                  Thêm mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: THIẾT LẬP KẾT QUẢ THEN CHỐT (KEY RESULT) MỚI */}
      {isKrModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl p-6 relative">
            <button 
              onClick={() => setIsKrModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[var(--accent-cyan)]">🔑</span>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">
                Thiết lập kết quả then chốt (Key Result) mới
              </h3>
            </div>

            <form onSubmit={handleSubmitKr} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                  Tên Kết quả then chốt (Key Result):
                </label>
                <input
                  type="text"
                  required
                  value={krTitle}
                  onChange={(e) => setKrTitle(e.target.value)}
                  placeholder="Nhập nội dung kết quả then chốt..."
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                    Trọng số (%):
                  </label>
                  <input
                    type="number"
                    required
                    value={krWeight}
                    onChange={(e) => setKrWeight(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                    Người phụ trách:
                  </label>
                  <input
                    type="text"
                    required
                    value={krPic}
                    onChange={(e) => setKrPic(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                    Hạn chót:
                  </label>
                  <input
                    type="date"
                    required
                    value={krDeadline}
                    onChange={(e) => setKrDeadline(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsKrModalOpen(false)}
                  className="bg-slate-950 text-slate-300 border border-white/10 hover:bg-slate-900 text-xs font-bold px-4 py-2 rounded-lg transition-all"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="bg-white text-slate-950 hover:bg-slate-100 text-xs font-extrabold px-4 py-2 rounded-lg transition-all"
                >
                  Thêm mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: THÊM HÀNH ĐỘNG (ACTION) MỚI */}
      {isActionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="w-full max-w-lg bg-slate-900/90 border border-white/10 rounded-2xl shadow-2xl p-6 relative">
            <button 
              onClick={() => setIsActionModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X size={18} />
            </button>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-[var(--accent-purple)]">⚡</span>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wide">
                Thiết lập hành động (Action) mới
              </h3>
            </div>

            <form onSubmit={handleSubmitAction} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                  Tên hành động (Action) chi tiết:
                </label>
                <input
                  type="text"
                  required
                  value={actionTitle}
                  onChange={(e) => setActionTitle(e.target.value)}
                  placeholder="Nhập mô tả hành động chi tiết..."
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                    Người thực hiện:
                  </label>
                  <input
                    type="text"
                    required
                    value={actionPic}
                    onChange={(e) => setActionPic(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                    Từ ngày:
                  </label>
                  <input
                    type="date"
                    required
                    value={actionStart}
                    onChange={(e) => setActionStart(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[var(--text-muted)] mb-1.5 uppercase">
                    Đến ngày:
                  </label>
                  <input
                    type="date"
                    required
                    value={actionEnd}
                    onChange={(e) => setActionEnd(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-[var(--accent-cyan)]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsActionModalOpen(false)}
                  className="bg-slate-950 text-slate-300 border border-white/10 hover:bg-slate-900 text-xs font-bold px-4 py-2 rounded-lg transition-all"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="bg-white text-slate-950 hover:bg-slate-100 text-xs font-extrabold px-4 py-2 rounded-lg transition-all"
                >
                  Thêm mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
