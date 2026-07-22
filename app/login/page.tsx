"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ShieldCheck, LogIn, Mail, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const { currentLoggedUser, setCurrentLoggedUser, usersList, refreshUsers } = useApp();
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleClientId, setGoogleClientId] = useState("");

  useEffect(() => {
    // Nếu đã đăng nhập, chuyển về Dashboard
    if (currentLoggedUser) {
      router.push("/");
    }
  }, [currentLoggedUser, router]);

  // Load Google SDK & Client ID
  useEffect(() => {
    refreshUsers();
    
    // Đọc Google Client ID từ biến môi trường
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
    setGoogleClientId(clientId);

    if (clientId) {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);

      // Định nghĩa hàm callback cho Google OAuth
      (window as any).handleCredentialResponse = async (response: any) => {
        setLoading(true);
        setErrorMsg("");
        try {
          const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: response.credential }),
          });

          const data = await res.json();
          if (res.ok && data.success) {
            setCurrentLoggedUser(data.user);
            router.push("/");
          } else {
            setErrorMsg(data.error || "Xác thực tài khoản Google thất bại.");
          }
        } catch (err) {
          console.error(err);
          setErrorMsg("Không thể kết nối đến máy chủ xác thực.");
        } finally {
          setLoading(false);
        }
      };
    }
  }, [refreshUsers, router, setCurrentLoggedUser]);

  // Đăng nhập nhanh bằng Email (phương án hỗ trợ chạy thử)
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setErrorMsg("Vui lòng nhập Email Sconnect!");
      return;
    }

    const email = emailInput.trim().toLowerCase();
    if (!email.endsWith("@s-connect.net")) {
      setErrorMsg("Email đăng nhập phải có đuôi @s-connect.net!");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setCurrentLoggedUser(data.user);
        router.push("/");
      } else {
        setErrorMsg(data.error || "Email chưa được cấp quyền truy cập hệ thống.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Có lỗi xảy ra khi xác thực email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-lime-500/10 blur-[120px]" />

      <div className="glass-panel w-full max-w-md p-8 m-4 border border-white/10 shadow-2xl relative z-10 flex flex-col gap-6 font-semibold">
        
        {/* LOGO & TITLE */}
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-lime-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/20 mb-2 animate-pulse">
            S
          </div>
          <h1 className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent">
            SCONNECT GOAL MANAGER
          </h1>
          <p className="text-xs text-slate-400 font-medium">
            Hệ thống Quản trị Mục tiêu & Chiến dịch OKR 2026
          </p>
        </div>

        {/* ERROR WARNING CONTAINER */}
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-xl text-xs flex gap-2 items-start animate-bounce">
            <AlertCircle className="shrink-0 mt-0.5" size={16} />
            <span className="font-semibold leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {/* GOOGLE SIGN IN (PRIMARY OPTION) */}
        <div className="space-y-4">
          <div className="text-center">
            <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
              XÁC THỰC DOANH NGHIỆP
            </span>
          </div>

          {googleClientId ? (
            <div className="flex flex-col items-center justify-center py-4 bg-slate-900/40 border border-white/5 rounded-xl gap-2">
              <div
                id="g_id_onload"
                data-client_id={googleClientId}
                data-context="signin"
                data-ux_mode="popup"
                data-callback="handleCredentialResponse"
                data-auto_prompt="false"
              />
              <div
                className="g_id_signin"
                data-type="standard"
                data-shape="pill"
                data-theme="filled_black"
                data-text="signin_with"
                data-size="large"
                data-logo_alignment="left"
              />
              <p className="text-[9px] text-slate-500 mt-2">
                Sử dụng tài khoản Google Sconnect Workspace
              </p>
            </div>
          ) : (
            <div className="bg-amber-500/10 border border-amber-500/30 text-amber-400 p-3.5 rounded-xl text-[11px] leading-relaxed">
              <span className="font-bold uppercase block mb-1">⚠️ Chưa cấu hình Google OAuth Client ID</span>
              Hãy điền biến `NEXT_PUBLIC_GOOGLE_CLIENT_ID` vào tệp `.env` để kích hoạt đăng nhập Google. Bạn có thể sử dụng form đăng nhập nhanh bên dưới để chạy thử.
            </div>
          )}
        </div>

        {/* OR DIVIDER */}
        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-white/5" />
          <span className="flex-shrink mx-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Hoặc</span>
          <div className="flex-grow border-t border-white/5" />
        </div>

        {/* DIRECT EMAIL LOGIN (FALLBACK/DEMO FLOW) */}
        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">
              Đăng nhập nhanh bằng Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="email"
                disabled={loading}
                placeholder="tennhanvien@s-connect.net"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-all font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-500/15 flex items-center justify-center gap-1.5 transition-all disabled:opacity-50"
          >
            <LogIn size={15} />
            {loading ? "ĐANG XÁC THỰC..." : "ĐĂNG NHẬP HỆ THỐNG"}
          </button>
        </form>

        {/* HELPFUL TIPS FOR SEEDED USERS */}
        <div className="bg-slate-900/60 p-4 rounded-xl border border-white/5 flex gap-2.5 items-start text-[10px] text-slate-400 leading-relaxed mt-2">
          <ShieldCheck className="text-emerald-500 shrink-0 mt-0.5" size={16} />
          <div>
            <span className="font-bold text-white uppercase block mb-0.5">Danh sách Email được cấp quyền</span>
            Nhập email của bạn (Ví dụ: `lyttd@s-connect.net`, `khoald@s-connect.net`, `hoangtm@s-connect.net`...) để đăng nhập tức thì.
          </div>
        </div>

      </div>
    </div>
  );
}
