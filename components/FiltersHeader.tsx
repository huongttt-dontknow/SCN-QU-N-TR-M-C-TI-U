"use client";

import React from "react";
import { useApp } from "@/context/AppContext";

export default function FiltersHeader() {
  const { filters, setFilters, currentLoggedUser } = useApp();

  const isRestricted = 
    currentLoggedUser?.role === "Trưởng đơn vị" || 
    currentLoggedUser?.role === "Người dùng";

  const units = [
    { code: "SCVN", name: "BU Sconnect Việt Nam" },
    { code: "Wofloo", name: "BP Wolfoo (WO)" },
    { code: "Lego", name: "DA Lego (LEGO)" },
    { code: "AS", name: "BP Animated Story (AS)" },
    { code: "DA01", name: "Dự án 01 (DA01)" },
    { code: "Music", name: "BP Music (SCMU)" },
    { code: "NDTH", name: "BP Nội dung tổng hợp" },
    { code: "CR", name: "BP Creative Hub (CR)" },
    { code: "CN", name: "CNGP (CN)" },
    { code: "SCS", name: "BP Studio (SCS)" },
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="glass-panel p-4 mb-4 flex flex-wrap gap-4 items-center justify-between shrink-0">
      <div className="flex flex-wrap gap-3.5 items-center">
        {/* Chọn đơn vị */}
        <div className="flex flex-col">
          <label className="text-xs text-[var(--text-muted)] font-extrabold mb-1 uppercase tracking-wider">
            Đơn vị báo cáo
          </label>
          <select
            value={filters.unitCode}
            disabled={isRestricted}
            onChange={(e) => handleFilterChange("unitCode", e.target.value)}
            className="bg-slate-900 border border-[var(--glass-border)] text-white text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {units.map(u => (
              <option key={u.code} value={u.code}>{u.name}</option>
            ))}
          </select>
        </div>

        {/* Tần suất */}
        <div className="flex flex-col">
          <label className="text-xs text-[var(--text-muted)] font-extrabold mb-1 uppercase tracking-wider">
            Tần suất
          </label>
          <select
            value={filters.periodType}
            onChange={(e) => handleFilterChange("periodType", e.target.value)}
            className="bg-slate-900 border border-[var(--glass-border)] text-white text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer"
          >
            <option value="weekly">Hàng tuần</option>
            <option value="monthly">Hàng tháng</option>
            <option value="quarterly">Hàng quý</option>
            <option value="yearly">Hàng năm</option>
          </select>
        </div>

        {/* Lọc tháng */}
        {filters.periodType !== "yearly" && (
          <div className="flex flex-col">
            <label className="text-xs text-[var(--text-muted)] font-extrabold mb-1 uppercase tracking-wider">
              Tháng
            </label>
            <select
              value={filters.month}
              onChange={(e) => handleFilterChange("month", e.target.value)}
              className="bg-slate-900 border border-[var(--glass-border)] text-white text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>Tháng {i + 1}</option>
              ))}
            </select>
          </div>
        )}

        {/* Lọc tuần */}
        {filters.periodType === "weekly" && (
          <div className="flex flex-col">
            <label className="text-xs text-[var(--text-muted)] font-extrabold mb-1 uppercase tracking-wider">
              Tuần
            </label>
            <select
              value={filters.week}
              onChange={(e) => handleFilterChange("week", e.target.value)}
              className="bg-slate-900 border border-[var(--glass-border)] text-white text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer"
            >
              <option value="1">Tuần 1 (01/07 - 05/07)</option>
              <option value="2">Tuần 2 (06/07 - 12/07)</option>
              <option value="3">Tuần 3 (13/07 - 19/07)</option>
              <option value="4">Tuần 4 (20/07 - 26/07)</option>
              <option value="5">Tuần 5 (27/07 - 31/07)</option>
            </select>
          </div>
        )}

        {/* Lọc Quý */}
        {filters.periodType === "quarterly" && (
          <div className="flex flex-col">
            <label className="text-xs text-[var(--text-muted)] font-extrabold mb-1 uppercase tracking-wider">
              Quý
            </label>
            <select
              value={filters.quarter}
              onChange={(e) => handleFilterChange("quarter", e.target.value)}
              className="bg-slate-900 border border-[var(--glass-border)] text-white text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer"
            >
              <option value="Q1">Quý I</option>
              <option value="Q2">Quý II</option>
              <option value="Q3">Quý III</option>
              <option value="Q4">Quý IV</option>
            </select>
          </div>
        )}

        {/* Lọc Năm (2025 / 2026 / 2027) */}
        <div className="flex flex-col">
          <label className="text-xs text-[var(--text-muted)] font-extrabold mb-1 uppercase tracking-wider">
            Năm
          </label>
          <select
            value={filters.year}
            onChange={(e) => handleFilterChange("year", e.target.value)}
            className="bg-slate-900 border border-[var(--glass-border)] text-white text-sm font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer"
          >
            <option value="2025">Năm 2025</option>
            <option value="2026">Năm 2026</option>
            <option value="2027">Năm 2027</option>
          </select>
        </div>
      </div>

      {/* Tóm tắt bộ lọc active */}
      <div className="bg-slate-900/60 border border-[var(--glass-border)] px-3.5 py-2 rounded-xl text-xs font-black text-[var(--accent-cyan)] tracking-wider">
        KỲ LỌC: {filters.periodType === "weekly" ? `TUẦN ${filters.week} - THÁNG ${filters.month}` : filters.periodType === "monthly" ? `THÁNG ${filters.month}` : filters.periodType === "quarterly" ? `QUÝ ${filters.quarter}` : "CẢ NĂM"} / {filters.year}
      </div>
    </div>
  );
}
