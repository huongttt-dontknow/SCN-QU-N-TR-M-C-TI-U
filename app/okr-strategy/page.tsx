"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import { 
  Target, 
  Calendar, 
  User, 
  ChevronRight, 
  ChevronDown 
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

  // Add new Objective
  const handleAddObjective = async () => {
    if (!isEditable) return;
    const title = prompt("Nhập tiêu đề Mục tiêu (Objective) mới:");
    if (!title) return;
    const weight = prompt("Nhập trọng số (%) của Mục tiêu này:", "20");
    if (!weight) return;

    try {
      const res = await fetch("/api/okrs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "objective",
          data: {
            unitCode: filters.unitCode,
            title,
            weight: parseFloat(weight) || 10,
            period: `${filters.periodType === "weekly" ? "M" + filters.month : filters.quarter}_${filters.year}`,
          }
        }),
      });

      if (res.ok) {
        fetchOkrs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add Key Result
  const handleAddKr = async (objId: string) => {
    if (!isEditable) return;
    const title = prompt("Nhập tiêu đề Kết quả then chốt (Key Result) mới:");
    if (!title) return;
    const weight = prompt("Nhập trọng số (%) trong Objective:", "25");
    if (!weight) return;
    const pic = prompt("Nhập tên PIC chịu trách nhiệm:", currentLoggedUser?.fullname || "");
    if (!pic) return;

    try {
      const res = await fetch("/api/okrs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "kr",
          data: {
            objectiveId: objId,
            title,
            weight: parseFloat(weight) || 25,
            pic,
            priority: "Medium",
            deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          }
        }),
      });

      if (res.ok) {
        fetchOkrs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add Action
  const handleAddAction = async (krId: string) => {
    if (!isEditable) return;
    const title = prompt("Nhập hành động (Action) chi tiết:");
    if (!title) return;
    const pic = prompt("Nhập tên người thực thi:", currentLoggedUser?.fullname || "");
    if (!pic) return;

    try {
      const res = await fetch("/api/okrs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "action",
          data: {
            keyResultId: krId,
            unitCode: filters.unitCode,
            title,
            pic,
            startDate: new Date().toISOString(),
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          }
        }),
      });

      if (res.ok) {
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
    <div className="flex flex-col gap-4">
      <FiltersHeader />

      {/* FREEZE MICRO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Số lượng O */}
        <div className="glass-panel p-4 flex flex-col justify-between h-[100px]">
          <span className="text-[10px] text-[var(--text-muted)] font-extrabold tracking-wider uppercase">
            Mục tiêu (Objectives) kỳ này
          </span>
          <div className="flex justify-between items-baseline mt-2">
            <span className="text-2xl font-black text-white">{totalObjCount} Mục tiêu</span>
            <span className="text-xs text-[var(--text-muted)]">Đã thiết lập</span>
          </div>
        </div>

        {/* Card 2: Tiến độ TB */}
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

        {/* Card 3: KR Hoàn thành */}
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
          onClick={handleAddObjective}
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
                    onClick={() => handleAddKr(obj.id)}
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
                            onClick={() => handleAddAction(kr.id)}
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
    </div>
  );
}
