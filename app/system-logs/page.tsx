"use client";

import React, { useState, useEffect } from "react";
import { useApp, User, RolePermission } from "@/context/AppContext";
import { 
  Users, 
  Key, 
  UserPlus, 
  Trash2, 
  ShieldCheck, 
  Database,
  FileSpreadsheet,
  Bell,
  RefreshCw,
  SlidersHorizontal,
  X,
  FileText,
  AlertTriangle,
  Upload,
  Download,
  Settings
} from "lucide-react";

export default function SystemLogsPage() {
  const { 
    currentLoggedUser, 
    usersList, 
    permissions, 
    setCurrentLoggedUser, 
    refreshUsers, 
    refreshPermissions,
    theme
  } = useApp();

  // Active Tab: logs, rbac, bigquery, gsheet, notify
  const [activeTab, setActiveTab] = useState<"logs" | "rbac" | "bigquery" | "gsheet" | "notify">("logs");

  // Authentication security check
  const isAdmin = currentLoggedUser?.role === "Admin";

  // Operator email for logs headers
  const operatorEmail = currentLoggedUser?.email || "unknown@s-connect.net";
  const requestHeaders = {
    "Content-Type": "application/json",
    "x-operator-email": operatorEmail
  };

  // --- TAB 1: ACCESS LOGS STATES ---
  const [logs, setLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [filterUser, setFilterUser] = useState("all");
  const [filterAction, setFilterAction] = useState("all");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  // Statistics
  const [stats, setStats] = useState({
    todayActions: 0,
    activeUsers: 0,
    modifications: 0,
    syncs: 0
  });

  const fetchLogs = async () => {
    setLoadingLogs(true);
    try {
      const queryParams = new URLSearchParams();
      if (filterUser !== "all") queryParams.append("operator", filterUser);
      if (filterAction !== "all") queryParams.append("action", filterAction);
      if (filterStartDate) queryParams.append("startDate", filterStartDate);
      if (filterEndDate) queryParams.append("endDate", filterEndDate);

      const res = await fetch(`/api/system/logs?${queryParams.toString()}`, {
        headers: { "x-operator-email": operatorEmail }
      });
      if (res.ok) {
        const data = await res.json();
        setLogs(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error("Lỗi fetch logs:", error);
    } finally {
      setLoadingLogs(false);
    }
  };

  const calculateStats = (logData: any[]) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const todayLogs = logData.filter(log => log.timestamp.startsWith(todayStr));
    
    const uniqueOperatorsToday = new Set(todayLogs.map(log => log.operator));
    const modificationsToday = todayLogs.filter(log => ["CREATE", "UPDATE", "DELETE"].includes(log.action)).length;
    const syncsToday = todayLogs.filter(log => log.action === "SYNC").length;

    setStats({
      todayActions: todayLogs.length,
      activeUsers: uniqueOperatorsToday.size,
      modifications: modificationsToday,
      syncs: syncsToday
    });
  };

  useEffect(() => {
    if (isAdmin) {
      fetchLogs();
      refreshUsers();
      refreshPermissions();
    }
  }, [isAdmin]);

  const handleClearFilters = () => {
    setFilterUser("all");
    setFilterAction("all");
    setFilterStartDate("");
    setFilterEndDate("");
    // Re-fetch logs with cleared filters
    setTimeout(() => fetchLogs(), 50);
  };

  // --- TAB 2: RBAC STATES & FORM HANDLERS ---
  const [code, setCode] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Trưởng đơn vị");
  const [unitCode, setUnitCode] = useState("Wofloo");
  const [submittingUser, setSubmittingUser] = useState(false);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !fullname || !email) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setSubmittingUser(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ employeeCode: code, fullname, email, role, unitCode }),
      });

      if (res.ok) {
        setCode("");
        setFullname("");
        setEmail("");
        refreshUsers();
        fetchLogs();
        alert("✓ Tạo tài khoản thành công!");
      } else {
        const err = await res.json();
        alert(`Lỗi: ${err.error}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmittingUser(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const res = await fetch("/api/users", {
        method: "PUT",
        headers: requestHeaders,
        body: JSON.stringify({ id: userId, role: newRole }),
      });

      if (res.ok) {
        refreshUsers();
        fetchLogs();
        if (currentLoggedUser?.id === userId) {
          setCurrentLoggedUser({ ...currentLoggedUser, role: newRole });
        }
      } else {
        const err = await res.json();
        alert(`Lỗi: ${err.error}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (currentLoggedUser?.id === id) {
      alert("Không thể xóa tài khoản đang đăng nhập mô phỏng!");
      return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        const res = await fetch(`/api/users?id=${id}`, { 
          method: "DELETE",
          headers: requestHeaders
        });
        if (res.ok) {
          refreshUsers();
          fetchLogs();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSimulateUser = async (user: User) => {
    setCurrentLoggedUser(user);
    
    // Log simulation login client-side to database
    try {
      await fetch("/api/system/logs", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          operator: operatorEmail,
          action: "LOGIN",
          module: "system",
          details: `🔌 Chuyển đổi giả lập sang người dùng: ${user.fullname} (${user.role})`
        })
      });
    } catch (e) {
      console.error(e);
    }

    alert(`🔌 Đã chuyển đổi giả lập sang người dùng: ${user.fullname} (${user.role})`);
  };

  const handleTogglePermission = async (roleName: string, key: keyof RolePermission, currentVal: boolean) => {
    if (roleName === "Admin" && key === "manageRoles") {
      alert("Không thể tước quyền quản trị hệ thống của vai trò Admin!");
      return;
    }

    try {
      const res = await fetch("/api/permissions", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ role: roleName, [key]: !currentVal }),
      });

      if (res.ok) {
        refreshPermissions();
        // Log permissions update
        await fetch("/api/system/logs", {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify({
            operator: operatorEmail,
            action: "UPDATE",
            module: "permissions",
            details: `Cập nhật ma trận phân quyền: Vai trò ${roleName} - Thay đổi ${String(key)} thành ${!currentVal}`
          })
        });
        fetchLogs();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleCsvUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (evt) => {
      const text = evt.target?.result as string;
      if (!text) return;

      const lines = text.split(/\r?\n/);
      if (lines.length < 2) {
        alert("File CSV rỗng hoặc không hợp lệ!");
        return;
      }

      const headers = lines[0].split(",").map(h => h.trim().replace(/^["']|["']$/g, ""));
      const parsedUsers = [];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const cols = line.split(",").map(c => c.trim().replace(/^["']|["']$/g, ""));
        if (cols.length < headers.length) continue;

        const uObj: any = {};
        headers.forEach((h, idx) => {
          uObj[h] = cols[idx];
        });
        parsedUsers.push(uObj);
      }

      if (parsedUsers.length === 0) {
        alert("Không tìm thấy người dùng hợp lệ để nhập!");
        return;
      }

      try {
        setSubmittingUser(true);
        const res = await fetch("/api/users/import", {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify({ users: parsedUsers }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          alert(`✓ Nhập thành công: ${data.message}`);
          refreshUsers();
          fetchLogs();
        } else {
          alert(`Lỗi: ${data.error}`);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setSubmittingUser(false);
      }
    };
    reader.readAsText(file, "UTF-8");
    e.target.value = ""; // Clear input
  };

  // --- TAB 3: BIGQUERY CONFIG STATES & SIMULATOR ---
  const [bqProjectId, setBqProjectId] = useState("sconnect-oms-production");
  const [bqDataset, setBqDataset] = useState("kpi_data_warehouse");
  const [bqFrequency, setBqFrequency] = useState("daily");
  const [bqCredentials, setBqCredentials] = useState('{\n  "type": "service_account",\n  "project_id": "sconnect-oms-production",\n  "private_key_id": "84a7db2e...",\n  "client_email": "bigquery-sync@sconnect.iam.gserviceaccount.com"\n}');
  const [bqSyncing, setBqSyncing] = useState(false);

  const handleBqSync = async () => {
    setBqSyncing(true);
    // Simulate API delay
    setTimeout(async () => {
      setBqSyncing(false);
      try {
        await fetch("/api/system/logs", {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify({
            operator: operatorEmail,
            action: "SYNC",
            module: "system",
            details: `Đồng bộ dữ liệu BigQuery thủ công: Dự án '${bqProjectId}', Dataset '${bqDataset}'`
          })
        });
        fetchLogs();
        alert("✓ Đồng bộ dữ liệu sang BigQuery thành công!");
      } catch (e) {
        console.error(e);
      }
    }, 1500);
  };

  const handleSaveBqConfig = async () => {
    try {
      await fetch("/api/system/logs", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          operator: operatorEmail,
          action: "UPDATE",
          module: "system",
          details: `Cập nhật cấu hình BigQuery: Dataset '${bqDataset}', tần suất '${bqFrequency}'`
        })
      });
      fetchLogs();
      alert("✓ Đã lưu cấu hình kết nối BigQuery thành công!");
    } catch (e) {
      console.error(e);
    }
  };

  // --- TAB 4: GSHEET CONFIG STATES & SIMULATOR ---
  const [gsheetUrl, setGsheetUrl] = useState("https://docs.google.com/spreadsheets/d/1XyZ4TjXGg8pY7B...");
  const [gsheetRange, setGsheetRange] = useState("KPI_Import!A1:H100");
  const [gsheetEnabled, setGsheetEnabled] = useState(true);
  const [gsheetSyncing, setGsheetSyncing] = useState(false);

  const handleGsheetSync = async () => {
    setGsheetSyncing(true);
    setTimeout(async () => {
      setGsheetSyncing(false);
      try {
        await fetch("/api/system/logs", {
          method: "POST",
          headers: requestHeaders,
          body: JSON.stringify({
            operator: operatorEmail,
            action: "SYNC",
            module: "youtube",
            details: `Đồng bộ số liệu từ Google Sheet: Dải ô '${gsheetRange}'`
          })
        });
        fetchLogs();
        alert("✓ Đồng bộ số liệu từ Google Sheet thành công!");
      } catch (e) {
        console.error(e);
      }
    }, 1200);
  };

  const handleSaveGsheetConfig = async () => {
    try {
      await fetch("/api/system/logs", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          operator: operatorEmail,
          action: "UPDATE",
          module: "system",
          details: `Cập nhật cấu hình Google Sheet: Kích hoạt: ${gsheetEnabled}`
        })
      });
      fetchLogs();
      alert("✓ Đã lưu cấu hình Google Sheet!");
    } catch (e) {
      console.error(e);
    }
  };

  // --- TAB 5: NOTIFY CONFIG STATES & SIMULATOR ---
  const [notifySlackUrl, setNotifySlackUrl] = useState("https://hooks.slack.com/" + "services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX");
  const [notifyEmailEnabled, setNotifyEmailEnabled] = useState(true);
  const [notifyRules, setNotifyRules] = useState({
    onDrop: true,
    onDelete: true,
    onPending: false
  });

  const handleSaveNotify = async () => {
    try {
      await fetch("/api/system/logs", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({
          operator: operatorEmail,
          action: "UPDATE",
          module: "system",
          details: `Cập nhật cấu hình thông báo hệ thống: Email=${notifyEmailEnabled}, Slack=Enabled`
        })
      });
      fetchLogs();
      alert("✓ Đã lưu cài đặt nhận thông báo!");
    } catch (e) {
      console.error(e);
    }
  };

  // --- RENDER SECURITY CHECK FOR NON-ADMIN ---
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center h-[70vh]">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 mb-4 border border-rose-500/30">
          <AlertTriangle size={32} />
        </div>
        <h2 className="text-lg font-black text-white">KHÔNG CÓ QUYỀN TRUY CẬP</h2>
        <p className="text-xs text-slate-400 mt-2 max-w-sm leading-relaxed">
          Giao diện và tính năng Kiểm toán & Cấu hình hệ thống chỉ khả dụng đối với tài khoản quản trị (**Admin**). Vui lòng chuyển đổi vai trò hoặc đăng nhập tài khoản hợp lệ.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-16 text-white">
      
      {/* HEADER SECTION */}
      <div className="glass-panel p-5 flex flex-wrap justify-between items-center gap-4">
        <div>
          <h2 className="text-lg font-black text-emerald-400 uppercase tracking-wide">
            Kiểm toán & Cấu hình
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Quản trị hoạt động đăng nhập, chỉnh sửa thông tin, phân quyền và kết nối dịch vụ đồng bộ đám mây.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {currentLoggedUser && (
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/20 text-xs font-bold px-3 py-1.5 rounded-lg">
              Đang thao tác: {currentLoggedUser.fullname} ({currentLoggedUser.role})
            </span>
          )}
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab("logs")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
            activeTab === "logs"
              ? "bg-emerald-600 text-white border-transparent shadow-md"
              : "bg-slate-900/60 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <ShieldCheck size={16} />
          <span style={{ color: "#ffffff" }}>Kiểm toán Lịch sử (Access Logs)</span>
        </button>

        <button
          onClick={() => setActiveTab("rbac")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
            activeTab === "rbac"
              ? "bg-emerald-600 text-white border-transparent shadow-md"
              : "bg-slate-900/60 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Users size={16} />
          <span style={{ color: "#ffffff" }}>Phân quyền Người dùng (RBAC)</span>
        </button>

        <button
          onClick={() => setActiveTab("bigquery")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
            activeTab === "bigquery"
              ? "bg-emerald-600 text-white border-transparent shadow-md"
              : "bg-slate-900/60 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Database size={16} />
          <span style={{ color: "#ffffff" }}>Đồng bộ BigQuery</span>
        </button>

        <button
          onClick={() => setActiveTab("gsheet")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
            activeTab === "gsheet"
              ? "bg-emerald-600 text-white border-transparent shadow-md"
              : "bg-slate-900/60 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <FileSpreadsheet size={16} />
          <span style={{ color: "#ffffff" }}>Đồng bộ Google Sheet</span>
        </button>

        <button
          onClick={() => setActiveTab("notify")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold transition-all border ${
            activeTab === "notify"
              ? "bg-emerald-600 text-white border-transparent shadow-md"
              : "bg-slate-900/60 text-slate-400 border-white/5 hover:bg-slate-800 hover:text-white"
          }`}
        >
          <Bell size={16} />
          <span style={{ color: "#ffffff" }}>Thông báo</span>
        </button>
      </div>

      {/* --- CONTENT AREA --- */}

      {/* TAB 1: ACCESS LOGS */}
      {activeTab === "logs" && (
        <div className="space-y-4">
          
          {/* STATS OVERVIEW CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="glass-panel p-4 flex flex-col justify-center">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                Thao tác hôm nay
              </span>
              <span className="text-3xl font-black text-emerald-400 mt-1">
                {stats.todayActions}
              </span>
            </div>

            <div className="glass-panel p-4 flex flex-col justify-center">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                Người dùng truy cập
              </span>
              <span className="text-3xl font-black text-indigo-400 mt-1">
                {stats.activeUsers}
              </span>
            </div>

            <div className="glass-panel p-4 flex flex-col justify-center">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                Thêm/Sửa/Xóa
              </span>
              <span className="text-3xl font-black text-amber-400 mt-1">
                {stats.modifications}
              </span>
            </div>

            <div className="glass-panel p-4 flex flex-col justify-center">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">
                Đồng bộ
              </span>
              <span className="text-3xl font-black text-rose-400 mt-1">
                {stats.syncs}
              </span>
            </div>
          </div>

          {/* FILTERS */}
          <div className="glass-panel p-4 space-y-4">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="text-xs font-black text-slate-300 flex items-center gap-1.5 uppercase tracking-wide">
                <SlidersHorizontal size={14} /> Bộ lọc nâng cao & Tìm kiếm
              </h3>
              <button 
                onClick={fetchLogs} 
                className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 hover:text-emerald-300"
              >
                <RefreshCw size={12} className={loadingLogs ? "animate-spin" : ""} /> Làm mới
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold block">Người dùng:</label>
                <select
                  value={filterUser}
                  onChange={(e) => setFilterUser(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
                >
                  <option value="all">Tất cả người dùng</option>
                  {usersList.map(u => (
                    <option key={u.id} value={u.email}>{u.fullname} ({u.email})</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-400 font-bold block">Loại hành động:</label>
                <select
                  value={filterAction}
                  onChange={(e) => setFilterAction(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
                >
                  <option value="all">Tất cả hành động</option>
                  <option value="LOGIN">LOGIN (Đăng nhập)</option>
                  <option value="SYNC">SYNC (Đồng bộ / AI)</option>
                  <option value="CREATE">CREATE (Tạo mới)</option>
                  <option value="UPDATE">UPDATE (Cập nhật)</option>
                  <option value="DELETE">DELETE (Xóa)</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-slate-400 font-bold block">Khoảng thời gian:</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={filterStartDate}
                    onChange={(e) => setFilterStartDate(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
                  />
                  <span className="text-slate-500 font-bold">→</span>
                  <input
                    type="date"
                    value={filterEndDate}
                    onChange={(e) => setFilterEndDate(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end items-center gap-2 pt-1">
              <button
                onClick={handleClearFilters}
                className="bg-slate-900 border border-white/10 hover:bg-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <X size={14} /> Xóa lọc
              </button>
              <button
                onClick={fetchLogs}
                className="bg-emerald-600 hover:bg-emerald-500 text-xs font-extrabold px-4 py-1.5 rounded-lg flex items-center gap-1.5"
              >
                <SlidersHorizontal size={14} /> Lọc kết quả
              </button>
            </div>
          </div>

          {/* TABLE LOGS */}
          <div className="glass-panel p-4">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-300 font-bold bg-slate-900/60">
                    <th className="p-3 w-44">Thời gian</th>
                    <th className="p-3 w-48">User thao tác</th>
                    <th className="p-3 w-28 text-center">Hành động</th>
                    <th className="p-3 w-28 text-center">Module</th>
                    <th className="p-3">Đối tượng & Chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingLogs ? (
                    <tr>
                      <td colSpan={5} className="text-center p-8 text-slate-400">
                        <RefreshCw className="animate-spin inline-block mr-2" size={16} /> Đang tải log...
                      </td>
                    </tr>
                  ) : logs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center p-8 text-slate-400 italic">
                        Không tìm thấy log hoạt động nào khớp với bộ lọc.
                      </td>
                    </tr>
                  ) : (
                    logs.map(log => {
                      // Formatting timestamp: 16:11:10 23/7/2026
                      const dateObj = new Date(log.timestamp);
                      const timeStr = dateObj.toLocaleTimeString("vi-VN", { hour12: false });
                      const dateStr = `${dateObj.getDate()}/${dateObj.getMonth() + 1}/${dateObj.getFullYear()}`;
                      
                      // Badge color mappings
                      let actionClass = "bg-slate-900 text-slate-400 border border-white/10";
                      if (log.action === "LOGIN") actionClass = "bg-emerald-950 text-emerald-400 border border-emerald-500/20";
                      else if (log.action === "SYNC") actionClass = "bg-amber-950 text-amber-300 border border-amber-500/20";
                      else if (log.action === "CREATE") actionClass = "bg-teal-950 text-teal-300 border border-teal-500/20";
                      else if (log.action === "UPDATE") actionClass = "bg-indigo-950 text-indigo-300 border border-indigo-500/20";
                      else if (log.action === "DELETE") actionClass = "bg-rose-950 text-rose-400 border border-rose-500/20";

                      return (
                        <tr key={log.id} className="border-b border-white/5 hover:bg-white/5">
                          <td className="p-3 text-slate-400 font-mono">{timeStr} {dateStr}</td>
                          <td className="p-3 font-semibold text-slate-300">{log.operator}</td>
                          <td className="p-3 text-center">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider ${actionClass}`}>
                              {log.action}
                            </span>
                          </td>
                          <td className="p-3 text-center">
                            <code className="bg-slate-800/80 text-sky-400 px-2 py-0.5 rounded font-mono text-[10px]">
                              {log.module}
                            </code>
                          </td>
                          <td className="p-3 text-slate-200 leading-relaxed font-medium">{log.details}</td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RBAC PERMISSIONS MATRIX */}
      {activeTab === "rbac" && (
        <div className="space-y-4">
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            
            {/* THÊM TÀI KHOẢN MỚI */}
            <div className="glass-panel p-5 space-y-4 h-fit">
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wide flex items-center gap-2">
                <UserPlus size={16} /> Thêm nhân sự phân quyền
              </h3>
              
              <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-400 font-bold block">Mã nhân sự (SCN):</label>
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Ví dụ: SCN0405"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold block">Họ và tên:</label>
                  <input
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder="Ví dụ: Trần Thị Thu Hương"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-bold block">Email Sconnect:</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Ví dụ: huongttt@s-connect.net"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block">Vai trò:</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Quản trị viên">Quản trị viên</option>
                      <option value="Trưởng đơn vị">Trưởng đơn vị</option>
                      <option value="Người dùng">Người dùng</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-bold block">Đơn vị:</label>
                    <select
                      value={unitCode}
                      onChange={(e) => setUnitCode(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                    >
                      <option value="SCVN">SCVN (TCT)</option>
                      <option value="Wofloo">Wofloo (Khối 1)</option>
                      <option value="Lego">Lego (Khối 1)</option>
                      <option value="AS">AS (Khối 1)</option>
                      <option value="Music">Music (Khối 1)</option>
                      <option value="NDTH">NDTH (Khối 2)</option>
                      <option value="CR">CR (Khối 2)</option>
                      <option value="CN">CNGP (Khối 3)</option>
                      <option value="SCS">SCS (Khối 3)</option>
                      <option value="DA01">DA01 (Khối 4)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingUser}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 font-bold text-white py-2 rounded-lg flex items-center justify-center gap-1.5 shadow"
                >
                  {submittingUser ? "Đang xử lý..." : "✓ Tạo tài khoản"}
                </button>
              </form>

              {/* IMPORT/EXPORT CSV */}
              <div className="border-t border-white/5 pt-4 space-y-2.5">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                  Đồng bộ hàng loạt
                </span>
                <div className="flex gap-2">
                  <label className="flex-1 bg-slate-900 border border-white/10 hover:bg-slate-800 text-xs font-bold py-2 rounded-lg text-center cursor-pointer flex items-center justify-center gap-1">
                    <Upload size={14} /> Nhập CSV
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleCsvUpload}
                      className="hidden"
                    />
                  </label>
                  <a
                    href="data:text/csv;charset=utf-8,employeeCode,fullname,email,role,unitCode%0ASCN0405,Trần Thị Thu Hương,huongttt@s-connect.net,Admin,SCVN%0ASCN0071,Lê Đăng Khoa,khoald@s-connect.net,Trưởng đơn vị,Wofloo"
                    download="sconnect_users_template.csv"
                    className="flex-1 bg-slate-900 border border-white/10 hover:bg-slate-800 text-xs font-bold py-2 rounded-lg text-center flex items-center justify-center gap-1"
                  >
                    <Download size={14} /> Tải Template
                  </a>
                </div>
              </div>
            </div>

            {/* DANH SÁCH NHÂN SỰ VÀ GIẢ LẬP */}
            <div className="glass-panel p-5 lg:col-span-2 space-y-4">
              <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wide flex items-center gap-2">
                <Users size={16} /> Danh sách tài khoản hoạt động
              </h3>
              
              <div className="overflow-y-auto max-h-[500px]">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-slate-300 font-bold bg-slate-900/60">
                      <th className="p-3 w-20">Mã NV</th>
                      <th className="p-3">Họ tên / Email</th>
                      <th className="p-3 w-28">Đơn vị</th>
                      <th className="p-3 w-36">Vai trò</th>
                      <th className="p-3 w-20 text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersList.map(u => (
                      <tr key={u.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-3 font-mono text-slate-400">{u.employeeCode}</td>
                        <td className="p-3">
                          <div className="font-bold text-slate-200">{u.fullname}</div>
                          <div className="text-[10px] text-slate-400">{u.email}</div>
                        </td>
                        <td className="p-3 font-bold text-slate-300">{u.unitCode}</td>
                        <td className="p-3">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="bg-slate-950 border border-white/10 rounded px-2 py-1 text-xs text-white"
                          >
                            <option value="Admin">Admin</option>
                            <option value="Quản trị viên">Quản trị viên</option>
                            <option value="Trưởng đơn vị">Trưởng đơn vị</option>
                            <option value="Người dùng">Người dùng</option>
                          </select>
                        </td>
                        <td className="p-3 text-center">
                          <div className="flex items-center gap-1.5 justify-center">
                            <button
                              onClick={() => handleSimulateUser(u)}
                              className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 px-2 py-1 rounded text-[10px] font-bold"
                              title="Giả lập trạng thái đăng nhập của tài khoản này"
                            >
                              Giả lập
                            </button>
                            <button
                              onClick={() => handleDeleteUser(u.id)}
                              className="text-rose-400 hover:text-rose-300 p-1 rounded"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* MA TRẬN PHÂN QUYỀN (RBAC MATRIX) */}
          <div className="glass-panel p-5 space-y-4">
            <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wide flex items-center gap-2">
              <Key size={16} /> Ma trận phân quyền tính năng (RBAC)
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-300 font-bold bg-slate-900/60">
                    <th className="p-3 w-48">Vai trò hệ thống</th>
                    <th className="p-3 text-center">Xem Dashboard</th>
                    <th className="p-3 text-center">Nhập KPI / Thực tế</th>
                    <th className="p-3 text-center">Phê duyệt báo cáo KPI</th>
                    <th className="p-3 text-center">Thiết lập OKR đơn vị</th>
                    <th className="p-3 text-center">Cấu hình Hệ thống & Logs</th>
                  </tr>
                </thead>
                <tbody>
                  {permissions.map(p => (
                    <tr key={p.role} className="border-b border-white/5 hover:bg-white/5">
                      <td className="p-3 font-black text-slate-200">{p.role}</td>
                      
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={p.viewDashboard}
                          onChange={() => handleTogglePermission(p.role, "viewDashboard", p.viewDashboard)}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                        />
                      </td>

                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={p.editKPI}
                          onChange={() => handleTogglePermission(p.role, "editKPI", p.editKPI)}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                        />
                      </td>

                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={p.approveReport}
                          onChange={() => handleTogglePermission(p.role, "approveReport", p.approveReport)}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                        />
                      </td>

                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={p.editOKR}
                          onChange={() => handleTogglePermission(p.role, "editOKR", p.editOKR)}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                        />
                      </td>

                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={p.manageRoles}
                          onChange={() => handleTogglePermission(p.role, "manageRoles", p.manageRoles)}
                          className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BIGQUERY CONFIGURATION */}
      {activeTab === "bigquery" && (
        <div className="glass-panel p-5 space-y-6">
          <div>
            <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wide flex items-center gap-2">
              <Database size={16} /> Thiết lập kết nối Google BigQuery Data Warehouse
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Đồng bộ tự động số liệu thực tế KPI và OKR từ cơ sở dữ liệu hệ thống sang kho dữ liệu tập trung BigQuery của tổng công ty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold block">GCP Project ID:</label>
                <input
                  type="text"
                  value={bqProjectId}
                  onChange={(e) => setBqProjectId(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold block">BigQuery Dataset ID:</label>
                <input
                  type="text"
                  value={bqDataset}
                  onChange={(e) => setBqDataset(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold block">Tần suất đồng bộ tự động:</label>
                <select
                  value={bqFrequency}
                  onChange={(e) => setBqFrequency(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                >
                  <option value="hourly">Hằng giờ (Every Hour)</option>
                  <option value="daily">Hằng ngày vào lúc 23:59 (Daily)</option>
                  <option value="weekly">Hằng tuần vào Chủ Nhật (Weekly)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-slate-400 font-bold block">Tài khoản dịch vụ (GCP Service Account JSON):</label>
              <textarea
                value={bqCredentials}
                onChange={(e) => setBqCredentials(e.target.value)}
                rows={6}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-3 text-xs text-slate-300 font-mono focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 flex justify-between items-center">
            <button
              onClick={handleBqSync}
              disabled={bqSyncing}
              className="bg-indigo-600 hover:bg-indigo-500 text-xs font-extrabold px-5 py-2.5 rounded-lg flex items-center gap-1.5 shadow disabled:opacity-50"
            >
              <RefreshCw size={14} className={bqSyncing ? "animate-spin" : ""} />
              {bqSyncing ? "Đang đồng bộ..." : "Đồng bộ BigQuery Ngay"}
            </button>
            <button
              onClick={handleSaveBqConfig}
              className="bg-emerald-600 hover:bg-emerald-500 text-xs font-extrabold px-6 py-2.5 rounded-lg shadow"
            >
              Lưu cấu hình kết nối
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: GOOGLE SHEET CONFIGURATION */}
      {activeTab === "gsheet" && (
        <div className="glass-panel p-5 space-y-6">
          <div>
            <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wide flex items-center gap-2">
              <FileSpreadsheet size={16} /> Đồng bộ dữ liệu KPI từ Google Spreadsheet
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Hệ thống sẽ tự động quét các Spreadsheet được cấu hình bên dưới để tải trước các số liệu sản phẩm hoặc kết quả đơn vị từ các bộ phận sản xuất.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-400 font-bold block">Spreadsheet URL / ID:</label>
              <input
                type="text"
                value={gsheetUrl}
                onChange={(e) => setGsheetUrl(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-slate-400 font-bold block">Tên Sheet và Dải ô dữ liệu (Range Name):</label>
                <input
                  type="text"
                  value={gsheetRange}
                  onChange={(e) => setGsheetRange(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-400 font-bold block">Trạng thái tự động cập nhật:</label>
                <div className="flex items-center h-[42px] px-1">
                  <input
                    type="checkbox"
                    id="gsheet_active"
                    checked={gsheetEnabled}
                    onChange={(e) => setGsheetEnabled(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 mr-2"
                  />
                  <label htmlFor="gsheet_active" className="text-slate-300 font-semibold cursor-pointer">
                    Kích hoạt quét định kỳ (Mỗi 10 phút một lần)
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 flex justify-between items-center">
            <button
              onClick={handleGsheetSync}
              disabled={gsheetSyncing}
              className="bg-indigo-600 hover:bg-indigo-500 text-xs font-extrabold px-5 py-2.5 rounded-lg flex items-center gap-1.5 shadow disabled:opacity-50"
            >
              <RefreshCw size={14} className={gsheetSyncing ? "animate-spin" : ""} />
              {gsheetSyncing ? "Đang kết nối..." : "Đọc & Kiểm tra Dữ liệu Google Sheet"}
            </button>
            <button
              onClick={handleSaveGsheetConfig}
              className="bg-emerald-600 hover:bg-emerald-500 text-xs font-extrabold px-6 py-2.5 rounded-lg shadow"
            >
              Lưu cấu hình
            </button>
          </div>
        </div>
      )}

      {/* TAB 5: NOTIFICATIONS CONFIGURATION */}
      {activeTab === "notify" && (
        <div className="glass-panel p-5 space-y-6">
          <div>
            <h3 className="text-sm font-black text-emerald-400 uppercase tracking-wide flex items-center gap-2">
              <Bell size={16} /> Cấu hình Cảnh báo & Thông báo hệ thống
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Thiết lập các kênh nhận cảnh báo bảo mật khi có xóa tài khoản, hoặc khi chỉ số sản xuất của đơn vị sụt giảm nghiêm trọng.
            </p>
          </div>

          <div className="space-y-5 text-xs">
            <div className="space-y-2">
              <label className="text-slate-400 font-bold block">Slack Webhook URL (Kênh nhận thông báo nhanh):</label>
              <input
                type="text"
                value={notifySlackUrl}
                onChange={(e) => setNotifySlackUrl(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-lg p-2.5 text-white"
              />
            </div>

            <div className="space-y-2">
              <label className="text-slate-400 font-bold block">Email cảnh báo:</label>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="email_alert"
                  checked={notifyEmailEnabled}
                  onChange={(e) => setNotifyEmailEnabled(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500 mr-2"
                />
                <label htmlFor="email_alert" className="text-slate-300 font-semibold cursor-pointer">
                  Gửi thư cảnh báo bảo mật đến hòm thư Admin khi có sự kiện nghiêm trọng
                </label>
              </div>
            </div>

            <div className="space-y-2.5 border-t border-white/5 pt-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                Luật kích hoạt thông báo
              </span>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyRules.onDrop}
                    onChange={(e) => setNotifyRules({ ...notifyRules, onDrop: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <span className="text-slate-300">Khi một chỉ tiêu KPI sụt giảm &gt;5% so với kỳ trước</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyRules.onDelete}
                    onChange={(e) => setNotifyRules({ ...notifyRules, onDelete: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <span className="text-slate-300">Khi Admin thực hiện thao tác xóa dữ liệu (DELETE) nhân sự hoặc chỉ tiêu</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyRules.onPending}
                    onChange={(e) => setNotifyRules({ ...notifyRules, onPending: e.target.checked })}
                    className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500 accent-emerald-500"
                  />
                  <span className="text-slate-300">Hằng tuần gửi báo cáo nhắc nhở các Trưởng đơn vị chưa nộp số liệu</span>
                </label>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 flex justify-end">
            <button
              onClick={handleSaveNotify}
              className="bg-emerald-600 hover:bg-emerald-500 text-xs font-extrabold px-6 py-2.5 rounded-lg shadow"
            >
              Lưu cấu hình thông báo
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
