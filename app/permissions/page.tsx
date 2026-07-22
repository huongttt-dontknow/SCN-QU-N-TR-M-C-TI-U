"use client";

import React, { useState } from "react";
import { useApp, User, RolePermission } from "@/context/AppContext";
import { 
  Users, 
  Key, 
  UserPlus, 
  Trash2, 
  ShieldCheck, 
  ToggleLeft,
  Upload,
  Download
} from "lucide-react";

export default function PermissionsPage() {
  const { 
    currentLoggedUser, 
    usersList, 
    permissions, 
    setCurrentLoggedUser, 
    refreshUsers, 
    refreshPermissions 
  } = useApp();

  // Form states
  const [code, setCode] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Trưởng đơn vị");
  const [unitCode, setUnitCode] = useState("Wofloo");
  const [submitting, setSubmitting] = useState(false);

  // Security Check: Only Admin can edit permissions
  const isAdmin = currentLoggedUser?.role === "Admin";

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

      // Parse headers
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
        setSubmitting(true);
        const res = await fetch("/api/users/import", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ users: parsedUsers }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          alert(`✓ Nhập thành công: ${data.message}`);
          refreshUsers();
        } else {
          alert(`Lỗi: ${data.error}`);
        }
      } catch (err) {
        console.error(err);
        alert("Lỗi kết nối khi gửi dữ liệu CSV.");
      } finally {
        setSubmitting(false);
      }
    };
    reader.readAsText(file, "UTF-8");
    e.target.value = ""; // Clear input
  };

  const handleSimulateUser = (user: User) => {
    setCurrentLoggedUser(user);
    alert(`🔌 Đã chuyển đổi giả lập sang người dùng: ${user.fullname} (${user.role})`);
  };

  const handleDeleteUser = async (id: string) => {
    if (!isAdmin) {
      alert("Chỉ tài khoản Admin mới có quyền xóa người dùng!");
      return;
    }

    if (currentLoggedUser?.id === id) {
      alert("Không thể xóa tài khoản đang đăng nhập mô phỏng!");
      return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
      try {
        const res = await fetch(`/api/users?id=${id}`, { method: "DELETE" });
        if (res.ok) {
          refreshUsers();
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !fullname || !email) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeCode: code, fullname, email, role, unitCode }),
      });

      if (res.ok) {
        setCode("");
        setFullname("");
        setEmail("");
        refreshUsers();
        alert("✓ Tạo tài khoản thành công!");
      } else {
        const err = await res.json();
        alert(`Lỗi: ${err.error}`);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePermission = async (roleName: string, key: keyof RolePermission, currentVal: boolean) => {
    if (!isAdmin) {
      alert("Chỉ tài khoản Admin mới có quyền thay đổi ma trận phân quyền!");
      return;
    }

    if (roleName === "Admin" && key === "manageRoles") {
      alert("Không thể tước quyền quản trị hệ thống của vai trò Admin!");
      return;
    }

    try {
      const targetRole = permissions.find(p => p.role === roleName);
      if (!targetRole) return;

      const payload = {
        role: roleName,
        viewDashboard: targetRole.viewDashboard,
        editKPI: targetRole.editKPI,
        approveReport: targetRole.approveReport,
        editOKR: targetRole.editOKR,
        manageRoles: targetRole.manageRoles,
        [key]: !currentVal
      };

      const res = await fetch("/api/permissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        refreshPermissions();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* 50/50 LAYOUT: USER MANAGEMENT & PERMISSION MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* LEFT COLUMN: USER MANAGEMENT */}
        <div className="glass-panel p-5 flex flex-col gap-4">
          <h3 className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
            <Users size={16} className="text-[var(--accent-cyan)]" />
            👥 QUẢN LÝ TÀI KHOẢN NGƯỜI DÙNG
          </h3>

          {/* CSV Import Section */}
          <div className="bg-slate-950/40 p-4 rounded-lg border border-white/5 flex flex-col gap-3">
            <h4 className="text-xs font-bold text-[var(--accent-cyan)] uppercase tracking-wider flex items-center justify-between">
              <span>📥 Nhập hàng loạt qua file CSV</span>
              <button 
                type="button"
                onClick={() => {
                  const csvContent = "data:text/csv;charset=utf-8,employeeCode,fullname,email,role,unitCode\nSCN0066,Trần Thị Diệu Ly,lyttd@s-connect.net,Admin,SCVN\nSCN0071,Lê Đăng Khoa,khoald@s-connect.net,Trưởng đơn vị,Wofloo";
                  const encodedUri = encodeURI(csvContent);
                  const link = document.createElement("a");
                  link.setAttribute("href", encodedUri);
                  link.setAttribute("download", "sconnect_users_template.csv");
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
                className="text-[9px] bg-slate-900 border border-white/10 hover:border-[var(--accent-cyan)] px-2 py-0.5 rounded text-white flex items-center gap-1 font-extrabold"
              >
                <Download size={10} /> Tải file mẫu
              </button>
            </h4>
            <div className="flex items-center gap-3">
              <label 
                htmlFor="csv-upload-file" 
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 text-slate-950 text-xs font-black py-2 px-3 rounded hover:shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow"
              >
                <Upload size={14} /> TẢI FILE CSV PHÂN QUYỀN
              </label>
              <input 
                id="csv-upload-file"
                type="file" 
                accept=".csv"
                onChange={handleCsvUpload}
                className="hidden" 
              />
            </div>
            <p className="text-[10px] text-slate-500 leading-normal font-semibold">
              * Hỗ trợ cập nhật tự động (Upsert). Hãy tải file mẫu để xem đúng định dạng tiêu đề cột.
            </p>
          </div>

          {/* Create User Form */}
          <form onSubmit={handleCreateUser} className="bg-slate-950/40 p-4 rounded-lg border border-white/5 space-y-3">
            <h4 className="text-xs font-bold text-[var(--accent-cyan)] uppercase tracking-wider flex items-center gap-1">
              <UserPlus size={14} /> Thêm tài khoản mới
            </h4>
            
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                placeholder="Mã nhân sự (ví dụ: SCN0080)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="bg-slate-900 border border-[var(--glass-border)] text-white text-xs rounded p-2 focus:outline-none focus:border-[var(--accent-cyan)]"
              />
              <input
                type="text"
                placeholder="Họ và tên"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="bg-slate-900 border border-[var(--glass-border)] text-white text-xs rounded p-2 focus:outline-none focus:border-[var(--accent-cyan)]"
              />
            </div>
            
            <input
              type="email"
              placeholder="Email nhân sự"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-[var(--glass-border)] text-white text-xs rounded p-2 focus:outline-none focus:border-[var(--accent-cyan)]"
            />

            <div className="grid grid-cols-2 gap-3">
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-slate-900 border border-[var(--glass-border)] text-white text-xs rounded p-2 focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer"
              >
                <option value="Admin">Admin</option>
                <option value="Quản trị viên">Quản trị viên</option>
                <option value="Trưởng đơn vị">Trưởng đơn vị</option>
                <option value="Người dùng">Người dùng (Middle Manager)</option>
              </select>

              <select
                value={unitCode}
                onChange={(e) => setUnitCode(e.target.value)}
                className="bg-slate-900 border border-[var(--glass-border)] text-white text-xs rounded p-2 focus:outline-none focus:border-[var(--accent-cyan)] cursor-pointer"
              >
                <option value="SCVN">BU Sconnect VN (SCVN)</option>
                <option value="Wofloo">BP Wolfoo (WO)</option>
                <option value="Lego">DA Lego (LEGO)</option>
                <option value="AS">BP Animated Story (AS)</option>
                <option value="DA01">Dự án 01 (DA01)</option>
                <option value="Music">BP Music (SCMU)</option>
                <option value="NDTH">BP Nội dung tổng hợp</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[var(--accent-cyan)] text-slate-950 text-xs font-extrabold py-2 rounded hover:shadow-[0_0_10px_rgba(0,242,254,0.3)] transition-all disabled:opacity-50"
            >
              {submitting ? "Đang tạo..." : "TẠO NGƯỜI DÙNG MỚI"}
            </button>
          </form>

          {/* Users List Table */}
          <div className="overflow-x-auto max-h-[300px] overflow-y-auto border border-white/5 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[var(--text-muted)] font-bold bg-slate-900/60 sticky top-0">
                  <th className="p-2.5 w-16 text-center">Mã</th>
                  <th className="p-2.5">Họ tên</th>
                  <th className="p-2.5 w-24">Bộ phận</th>
                  <th className="p-2.5 w-28">Vai trò</th>
                  <th className="p-2.5 w-28 text-center">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {usersList.map(user => {
                  const isActive = currentLoggedUser?.id === user.id;
                  return (
                    <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 text-[11px] text-[var(--text-muted)]">
                      <td className="p-2.5 text-center">
                        <code className="bg-white/5 px-1 py-0.5 rounded text-[10px]">{user.employeeCode}</code>
                      </td>
                      <td className="p-2.5 text-white font-semibold">{user.fullname} {isActive && "⭐"}</td>
                      <td className="p-2.5">{user.unitCode}</td>
                      <td className="p-2.5 font-bold text-[var(--accent-purple)]">{user.role}</td>
                      <td className="p-2.5 flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleSimulateUser(user)}
                          className={`text-[9px] font-black px-2 py-1 rounded flex items-center gap-1 transition-all ${
                            isActive 
                              ? "bg-emerald-500 text-slate-950 font-extrabold" 
                              : "bg-white/5 text-white border border-white/10 hover:bg-white/15"
                          }`}
                        >
                          <ToggleLeft size={10} />
                          {isActive ? "ĐANG DÙNG" : "MÔ PHỎNG"}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          disabled={user.employeeCode === "SCN001"}
                          className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 p-1.5 rounded disabled:opacity-30"
                        >
                          <Trash2 size={12} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: PERMISSION MATRIX */}
        <div className="glass-panel p-5 flex flex-col gap-4">
          <h3 className="text-xs font-bold text-white tracking-wider uppercase flex items-center gap-1.5">
            <Key size={16} className="text-[var(--accent-purple)]" />
            🔑 MA TRẬN PHÂN QUYỀN HỆ THỐNG
          </h3>

          <div className="overflow-x-auto border border-white/5 rounded">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-white/5 text-[var(--text-muted)] font-bold bg-slate-900/60">
                  <th className="p-3">Vai trò</th>
                  <th className="p-3 text-center">Xem Dashboard</th>
                  <th className="p-3 text-center">Sửa KPI</th>
                  <th className="p-3 text-center">Duyệt Báo cáo</th>
                  <th className="p-3 text-center">Sửa OKRs</th>
                  <th className="p-3 text-center">Quản lý User</th>
                </tr>
              </thead>
              <tbody>
                {permissions.map(perm => (
                  <tr key={perm.role} className="border-b border-white/5 hover:bg-white/5 text-xs">
                    <td className="p-3 text-white font-extrabold text-[var(--accent-purple)]">{perm.role}</td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={perm.viewDashboard}
                        disabled={!isAdmin}
                        onChange={() => handleTogglePermission(perm.role, "viewDashboard", perm.viewDashboard)}
                        className="cursor-pointer accent-[var(--accent-cyan)]"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={perm.editKPI}
                        disabled={!isAdmin}
                        onChange={() => handleTogglePermission(perm.role, "editKPI", perm.editKPI)}
                        className="cursor-pointer accent-[var(--accent-cyan)]"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={perm.approveReport}
                        disabled={!isAdmin}
                        onChange={() => handleTogglePermission(perm.role, "approveReport", perm.approveReport)}
                        className="cursor-pointer accent-[var(--accent-cyan)]"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={perm.editOKR}
                        disabled={!isAdmin}
                        onChange={() => handleTogglePermission(perm.role, "editOKR", perm.editOKR)}
                        className="cursor-pointer accent-[var(--accent-cyan)]"
                      />
                    </td>
                    <td className="p-3 text-center">
                      <input
                        type="checkbox"
                        checked={perm.manageRoles}
                        disabled={!isAdmin}
                        onChange={() => handleTogglePermission(perm.role, "manageRoles", perm.manageRoles)}
                        className="cursor-pointer accent-[var(--accent-cyan)]"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white/5 p-3 rounded-lg border border-white/5 flex gap-2.5 items-start text-[11px] text-[var(--text-muted)] leading-relaxed">
            <ShieldCheck className="text-[var(--accent-emerald)] shrink-0 mt-0.5" size={16} />
            <div>
              <span className="font-bold text-white uppercase block mb-0.5">Lưu ý kiểm soát</span>
              Chỉ tài khoản có vai trò **Admin** (mô phỏng bằng `SCN001`) mới được tích chọn thay đổi trực tiếp ma trận này. Khi phân quyền cập nhật, các elements tương ứng trên các phân hệ khác sẽ bị khóa/mở động theo thời gian thực.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
