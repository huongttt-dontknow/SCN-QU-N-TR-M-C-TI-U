"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { 
  LayoutDashboard, 
  Building2, 
  Layers, 
  FileEdit, 
  TrendingUp, 
  KeyRound, 
  UserCheck2,
  Sun,
  Moon
} from "lucide-react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentLoggedUser, theme, toggleTheme } = useApp();

  const menuItems = [
    { name: "Dashboard Tổng Hợp", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Báo Cáo Đơn Vị", path: "/unit-data", icon: <Building2 size={18} /> },
    { name: "Báo Cáo Sản Phẩm", path: "/product-data", icon: <Layers size={18} /> },
    { name: "Nhập Liệu Báo Cáo", path: "/input-form", icon: <FileEdit size={18} /> },
    { name: "Chiến Lược & OKRs", path: "/okr-strategy", icon: <TrendingUp size={18} /> },
    { name: "Phân Quyền", path: "/permissions", icon: <KeyRound size={18} /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 glass-panel m-4 mr-0 flex flex-col p-4 shrink-0 justify-between">
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-[var(--glass-border)]">
            <div className="w-8 h-8 rounded bg-gradient-to-tr from-[#16a34a] to-[#84cc16] flex items-center justify-center font-black text-slate-950 shadow-md">
              S
            </div>
            <div>
              <h1 className="font-black text-sm tracking-wide bg-gradient-to-r from-emerald-500 to-lime-500 bg-clip-text text-transparent">
                SCONNECT
              </h1>
              <p className="text-[10px] text-emerald-500 font-extrabold tracking-widest uppercase">
                Goal Manager
              </p>
            </div>
          </div>

          {/* MENU */}
          <nav className="space-y-1">
            {menuItems.map(item => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500/20 to-lime-500/10 text-emerald-400 border-l-2 border-emerald-500 shadow-md font-bold"
                      : "text-[var(--text-muted)] hover:text-emerald-400 hover:bg-emerald-500/5"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="space-y-4">
          {/* THEME SWITCHER TOGGLE BUTTON (NÚT CHUYỂN ĐỔI GIAO DIỆN SÁNG/TỐI) */}
          <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-[var(--text-muted)] uppercase tracking-wider">
              GIAO DIỆN
            </span>
            <button
              onClick={toggleTheme}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/60 border border-white/10 hover:border-emerald-500/50 transition-all shadow-inner"
              title="Bấm để chuyển đổi giao diện Sáng / Tối chuẩn Sconnect"
            >
              {theme === "dark" ? (
                <>
                  <Moon size={14} className="text-purple-400" />
                  <span className="text-[10px] font-bold text-slate-300">Tối</span>
                </>
              ) : (
                <>
                  <Sun size={14} className="text-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-600">Sáng</span>
                </>
              )}
            </button>
          </div>

          {/* FOOTER USER DISPLAY */}
          {currentLoggedUser && (
            <div className="pt-3 border-t border-[var(--glass-border)] flex items-center gap-3">
              <div 
                className="w-9 h-9 rounded-full flex items-center justify-center font-black text-slate-950 text-xs shadow-inner"
                style={{
                  background: currentLoggedUser.role === "Admin" 
                    ? "var(--accent-pink)" 
                    : currentLoggedUser.role === "Trưởng đơn vị" 
                      ? "var(--accent-purple)" 
                      : currentLoggedUser.role === "Người dùng" 
                        ? "var(--accent-emerald)" 
                        : "var(--accent-cyan)"
                }}
              >
                {currentLoggedUser.fullname.charAt(0)}
              </div>
              <div className="overflow-hidden">
                <h4 className="text-xs font-bold text-[var(--text-main)] truncate">
                  {currentLoggedUser.fullname}
                </h4>
                <p className="text-[10px] text-[var(--text-muted)] truncate">
                  {currentLoggedUser.role} @ {currentLoggedUser.unitCode}
                </p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 p-4">
        {/* HEADER TOP-BAR */}
        <header className="glass-panel w-full p-4 mb-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs tracking-wider">
            <UserCheck2 size={16} />
            <span>MÔ PHỎNG ĐANG KÍCH HOẠT:</span>
            {currentLoggedUser && (
              <span className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-black ml-1">
                {currentLoggedUser.fullname} ({currentLoggedUser.role} - {currentLoggedUser.unitCode})
              </span>
            )}
          </div>
          <div className="text-xs text-[var(--text-muted)] font-medium">
            Hệ thống Quản trị Mục tiêu & Chiến dịch OKR 2026
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 flex flex-col min-h-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
