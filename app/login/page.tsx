"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ShieldCheck, LogIn, Mail, AlertCircle, KeyRound, HelpCircle, Send, CheckCircle2, X } from "lucide-react";

export default function LoginPage() {
  const { currentLoggedUser, setCurrentLoggedUser, usersList, refreshUsers } = useApp();
  const router = useRouter();
  const [emailInput, setEmailInput] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleClientId, setGoogleClientId] = useState("");

  const [step, setStep] = useState(1); // 1: Email check, 2: Password setup/input
  const [passwordMode, setPasswordMode] = useState<"login" | "register" | "must_change">("login");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [tempPassSaved, setTempPassSaved] = useState("");
  const [deviceId, setDeviceId] = useState("");

  // States cho Modal Quên mật khẩu
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotCode, setForgotCode] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState("lyttd@s-connect.net");
  const [forgotNote, setForgotNote] = useState("");
  const [forgotSubmitting, setForgotSubmitting] = useState(false);
  const [forgotSuccessMsg, setForgotSuccessMsg] = useState("");
  const [forgotErrorMsg, setForgotErrorMsg] = useState("");

  // Kiểm tra lý do đăng xuất nếu bị đẩy phiên đăng nhập và tạo deviceId
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("reason") === "device_evicted") {
        setErrorMsg("Phiên đăng nhập đã hết hạn hoặc tài khoản đã đăng nhập trên thiết bị mới khác.");
      }

      let id = localStorage.getItem("sconnect_device_id");
      if (!id) {
        id = "dev-" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem("sconnect_device_id", id);
      }
      setDeviceId(id);
    }
  }, []);

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
            body: JSON.stringify({ 
              idToken: response.credential,
              deviceId: localStorage.getItem("sconnect_device_id") || "default-device",
              userAgent: navigator.userAgent
            }),
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

  // Bước 1: Kiểm tra Email và Trạng thái mật khẩu
  const handleCheckEmail = async (e: React.FormEvent) => {
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
      const res = await fetch(`/api/auth/check-email?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      
      if (!res.ok || data.error) {
        setErrorMsg(data.error || "Lỗi kiểm tra tài khoản.");
        return;
      }

      if (!data.registered) {
        setErrorMsg("Email chưa được phân quyền truy cập hệ thống.");
        return;
      }

      if (data.hasPassword) {
        setPasswordMode("login");
      } else {
        setPasswordMode("register");
      }
      setStep(2);
    } catch (err) {
      console.error(err);
      setErrorMsg("Có lỗi xảy ra khi xác thực email.");
    } finally {
      setLoading(false);
    }
  };

  // Bước 2: Xác nhận hoặc thiết lập mật khẩu và đăng nhập
  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setErrorMsg("Vui lòng nhập mật khẩu!");
      return;
    }

    if (passwordMode === "register" || passwordMode === "must_change") {
      if (password.length < 6) {
        setErrorMsg("Mật khẩu bảo vệ phải từ 6 ký tự trở lên!");
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg("Mật khẩu xác nhận không trùng khớp!");
        return;
      }
    }

    setLoading(true);
    setErrorMsg("");

    const email = emailInput.trim().toLowerCase();

    try {
      const payload: any = {
        email,
        deviceId: localStorage.getItem("sconnect_device_id") || "default-device",
        userAgent: navigator.userAgent
      };

      if (passwordMode === "must_change") {
        payload.password = tempPassSaved;
        payload.newPassword = password;
      } else {
        payload.password = password;
      }

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (data.mustChangePassword) {
          // Bắt buộc đổi mật khẩu cá nhân mới
          setTempPassSaved(password);
          setPasswordMode("must_change");
          setPassword("");
          setConfirmPassword("");
          setErrorMsg("");
        } else {
          setCurrentLoggedUser(data.user);
          router.push("/");
        }
      } else {
        setErrorMsg(data.error || "Mật khẩu không chính xác.");
      }
    } catch (err) {
      console.error(err);
      setErrorMsg("Có lỗi xảy ra khi đăng nhập.");
    } finally {
      setLoading(false);
    }
  };

  // Mở Modal Quên Mật Khẩu
  const handleOpenForgotModal = () => {
    setForgotEmail(emailInput.trim() || "");
    setForgotCode("");
    setSelectedAdmin("lyttd@s-connect.net");
    setForgotNote("");
    setForgotSuccessMsg("");
    setForgotErrorMsg("");
    setShowForgotModal(true);
  };

  // Gửi Yêu Cầu Quên Mật Khẩu
  const handleSendForgotRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim()) {
      setForgotErrorMsg("Vui lòng nhập Email công ty!");
      return;
    }
    if (!forgotEmail.trim().toLowerCase().endsWith("@s-connect.net")) {
      setForgotErrorMsg("Email phải có tên miền @s-connect.net!");
      return;
    }

    setForgotSubmitting(true);
    setForgotErrorMsg("");
    setForgotSuccessMsg("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: forgotEmail.trim(),
          employeeCode: forgotCode.trim(),
          adminEmail: selectedAdmin,
          note: forgotNote.trim()
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setForgotSuccessMsg(data.message || "Yêu cầu hỗ trợ đã được gửi thành công!");
      } else {
        setForgotErrorMsg(data.error || "Không thể gửi yêu cầu hỗ trợ.");
      }
    } catch (err) {
      console.error(err);
      setForgotErrorMsg("Có lỗi xảy ra khi gửi yêu cầu. Vui lòng kiểm tra lại kết nối.");
    } finally {
      setForgotSubmitting(false);
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
          <h1 className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-emerald-400 to-lime-400 bg-clip-text text-transparent text-center">
            SCONNECT OMS
          </h1>
          <p className="text-xs text-slate-400 font-bold text-center">
            Objectives Management System (OMS)
          </p>
          <p className="text-[10px] text-emerald-500 font-extrabold uppercase tracking-widest text-center mt-1">
            Aligning Strategy, Driving Performance
          </p>
        </div>

        {/* ERROR WARNING CONTAINER */}
        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-xl text-xs flex gap-2 items-start">
            <AlertCircle className="shrink-0 mt-0.5" size={16} />
            <span className="font-semibold leading-relaxed">{errorMsg}</span>
          </div>
        )}

        {/* GOOGLE SIGN IN (PRIMARY OPTION) */}
        {googleClientId && step === 1 && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
                XÁC THỰC DOANH NGHIỆP
              </span>
            </div>

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
          </div>
        )}

        {/* OR DIVIDER */}
        {googleClientId && step === 1 && (
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/5" />
            <span className="flex-shrink mx-4 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Hoặc</span>
            <div className="flex-grow border-t border-white/5" />
          </div>
        )}

        {/* STEP 1: ENTER EMAIL */}
        {step === 1 && (
          <form onSubmit={handleCheckEmail} className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">
                Đăng nhập bằng Email & Mật khẩu
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
              {loading ? "ĐANG KIỂM TRA..." : "TIẾP TỤC"}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={handleOpenForgotModal}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 font-bold transition-colors inline-flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle size={13} />
                Quên mật khẩu? Gửi yêu cầu hỗ trợ Admin
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PASSWORD CHECK / SETUP */}
        {step === 2 && (
          <form onSubmit={handlePasswordSubmit} className="space-y-4 animate-fade-in">
            <div className="flex items-center gap-2 border-b border-white/5 pb-2 mb-2">
              <span className="text-xs font-mono bg-emerald-950/60 text-emerald-400 px-3 py-1 rounded-lg border border-emerald-500/20 max-w-[70%] truncate" title={emailInput}>
                {emailInput}
              </span>
              <button 
                type="button" 
                onClick={() => { setStep(1); setPassword(""); setConfirmPassword(""); setErrorMsg(""); }} 
                className="text-[10px] text-slate-400 hover:text-white font-extrabold uppercase tracking-wider underline cursor-pointer ml-auto shrink-0"
              >
                Thay đổi
              </button>
            </div>

            {passwordMode === "must_change" ? (
              <div className="space-y-3">
                <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 p-3.5 rounded-xl text-[11px] leading-relaxed font-bold">
                  🔑 Bạn đang sử dụng mật khẩu tạm thời do Admin cấp. Vì lý do bảo mật, vui lòng thiết lập mật khẩu cá nhân mới để hoàn tất đăng nhập.
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">
                    Mật khẩu cá nhân mới *
                  </label>
                  <input
                    type="password"
                    disabled={loading}
                    placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">
                    Xác nhận mật khẩu mới *
                  </label>
                  <input
                    type="password"
                    disabled={loading}
                    placeholder="Nhập lại mật khẩu mới để xác nhận"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/80 transition-all font-semibold"
                  />
                </div>
              </div>
            ) : passwordMode === "register" ? (
              <div className="space-y-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-[11px] leading-relaxed font-bold">
                  🔒 Tài khoản của bạn chưa được thiết lập mật khẩu bảo vệ. Vui lòng thiết lập mật khẩu mới (tối thiểu 6 ký tự).
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    disabled={loading}
                    placeholder="Nhập mật khẩu mới"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-all font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">
                    Xác nhận mật khẩu
                  </label>
                  <input
                    type="password"
                    disabled={loading}
                    placeholder="Nhập lại mật khẩu để xác nhận"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-all font-semibold"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">
                    Mật khẩu tài khoản
                  </label>
                  <button
                    type="button"
                    onClick={handleOpenForgotModal}
                    className="text-[10px] text-emerald-400 hover:underline font-extrabold cursor-pointer"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
                <div className="relative">
                  <KeyRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="password"
                    disabled={loading}
                    placeholder="Nhập mật khẩu để đăng nhập"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 transition-all font-semibold"
                  />
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-10 font-black rounded-xl text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all disabled:opacity-50 ${
                passwordMode === "must_change"
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 shadow-amber-500/15"
                  : "bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-400 hover:to-lime-400 text-slate-950 shadow-emerald-500/15"
              }`}
            >
              <ShieldCheck size={15} />
              {loading
                ? "ĐANG XÁC THỰC..."
                : passwordMode === "must_change"
                ? "LƯU MẬT KHẨU MỚI & ĐĂNG NHẬP"
                : passwordMode === "register"
                ? "KÍCH HOẠT & ĐĂNG NHẬP"
                : "ĐĂNG NHẬP HỆ THỐNG"}
            </button>
          </form>
        )}

      </div>

      {/* MODAL QUÊN MẬT KHẨU / YÊU CẦU HỖ TRỢ ADMIN */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <HelpCircle size={18} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Yêu Cầu Hỗ Trợ Đặt Lại Mật Khẩu</h3>
                  <p className="text-[10px] text-slate-400">Gửi thông báo xác minh trực tiếp đến Admin</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Success Message */}
            {forgotSuccessMsg ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={28} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-emerald-400">Đã gửi yêu cầu thành công!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-white/5">
                    {forgotSuccessMsg}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl transition-all"
                >
                  Đóng cửa sổ
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendForgotRequest} className="space-y-3.5">
                
                {forgotErrorMsg && (
                  <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3 rounded-xl text-xs flex gap-2 items-center">
                    <AlertCircle size={15} className="shrink-0" />
                    <span>{forgotErrorMsg}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Email Công Ty (@s-connect.net) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="tennhanvien@s-connect.net"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Mã Nhân Sự SCN (Tùy chọn)
                  </label>
                  <input
                    type="text"
                    placeholder="VD: SCN0066"
                    value={forgotCode}
                    onChange={(e) => setForgotCode(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 font-semibold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Admin Tiếp Nhận Hỗ Trợ *
                  </label>
                  <select
                    value={selectedAdmin}
                    onChange={(e) => setSelectedAdmin(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/80 font-semibold"
                  >
                    <option value="lyttd@s-connect.net">Trần Thị Diệu Ly (lyttd@s-connect.net)</option>
                    <option value="huongttt@s-connect.net">Trần Thị Thu Hương (huongttt@s-connect.net)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Ghi chú / Lý do hỗ trợ
                  </label>
                  <textarea
                    rows={2}
                    placeholder="VD: Em bị quên mật khẩu cá nhân tự đặt..."
                    value={forgotNote}
                    onChange={(e) => setForgotNote(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/80 font-semibold resize-none"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-colors"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={forgotSubmitting}
                    className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                  >
                    <Send size={14} />
                    {forgotSubmitting ? "Đang gửi..." : "Gửi yêu cầu"}
                  </button>
                </div>

              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
