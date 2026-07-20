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
  UserCheck2 
} from "lucide-react";

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentLoggedUser } = useApp();

  const menuItems = [
    { name: "Dashboard Tổng Hợp", path: "/", icon: <LayoutDashboard size={18} /> },
    { name: "Báo Cáo Đơn Vị", path: "/unit-data", icon: <Building2 size={18} /> },
    { name: "Báo Cáo Sản Phẩm", path: "/product-data", icon: <Layers size={18} /> },
    { name: "Nhập Liệu KPI", path: "/input-form", icon: <FileEdit size={18} /> },
    { name: "Chiến Lược & OKRs", path: "/okr-strategy", icon: <TrendingUp size={18} /> },
    { name: "Phân Quyền", path: "/permissions", icon: <KeyRound size={18} /> },
  ];

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 glass-panel m-4 mr-0 flex flex-col p-4 shrink-0">
        <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-[var(--glass-border)]">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center font-bold text-slate-900">
            S
          </div>
          <div>
            <h1 className="font-extrabold text-sm tracking-wide bg-gradient-to-r from-white to-[var(--text-muted)] bg-clip-text text-transparent">
              SCONNECT
            </h1>
            <p className="text-[10px] text-[var(--accent-cyan)] font-semibold tracking-widest uppercase">
              Goal Manager
            </p>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 space-y-1">
          {menuItems.map(item => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-[rgba(0,242,254,0.15)] to-[rgba(139,92,246,0.05)] text-white border-l-2 border-[var(--accent-cyan)] shadow-md"
                    : "text-[var(--text-muted)] hover:text-white hover:bg-white/5"
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* FOOTER USER DISPLAY */}
        {currentLoggedUser && (
          <div className="mt-auto pt-4 border-t border-[var(--glass-border)] flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-slate-950 text-sm shadow-inner"
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
              <h4 className="text-xs font-bold text-white truncate">
                {currentLoggedUser.fullname}
              </h4>
              <p className="text-[10px] text-[var(--text-muted)] truncate">
                {currentLoggedUser.role} @ {currentLoggedUser.unitCode}
              </p>
            </div>
          </div>
        )}
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 p-4">
        {/* HEADER TOP-BAR */}
        <header className="glass-panel w-full p-4 mb-4 flex justify-between items-center">
          <div className="flex items-center gap-2 text-[var(--accent-cyan)] font-bold text-xs tracking-wider">
            <UserCheck2 size={16} />
            <span>MÔ PHỎNG ĐANG KÍCH HOẠT:</span>
            {currentLoggedUser && (
              <span className="bg-white/10 px-2.5 py-1 rounded text-white font-extrabold ml-1">
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
