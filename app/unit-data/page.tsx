"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import { 
  DollarSign, 
  TrendingUp, 
  AlertOctagon, 
  ChevronRight, 
  ChevronDown 
} from "lucide-react";

interface KpiRow {
  code: string;
  title: string;
  target: number;
  actual: number;
  unit: string;
  pic: string;
  isParent: boolean;
  parentCode?: string;
  children?: KpiRow[];
}

export default function UnitDataPage() {
  const { filters } = useApp();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    "M1": true, "M2": true, "M3": true, "M4": true, "M5": true, "M6": true, "M7": true
  });
  const [kpiRows, setKpiRows] = useState<KpiRow[]>([]);

  // Đổi dữ liệu mẫu theo đơn vị được chọn
  useEffect(() => {
    // Seed list based on unitCode and period
    const defaultData: KpiRow[] = [
      { code: "M1", title: "MÀN HÌNH TÀI CHÍNH / DOANH THU", target: 4500, actual: 4162, unit: "Triệu", pic: "Trần Thị Diệu Ly", isParent: true },
      { code: "VM1-I01.01", title: "Tỷ suất lợi nhuận ROI (%)", target: 15, actual: 12.5, unit: "%", pic: "Lê Đăng Khoa", isParent: false, parentCode: "M1" },
      { code: "VM1-I05.03", title: "Chi phí mua công cụ AI mới", target: 50, actual: 58, unit: "Triệu", pic: "Lê Quỳnh Nga", isParent: false, parentCode: "M1" },

      { code: "M2", title: "SẢN PHẨM / SẢN XUẤT", target: 50, actual: 48, unit: "SP", pic: "Lê Đăng Khoa", isParent: true },
      { code: "VM2-I01.01", title: "Số lượng video hoàn thành sản xuất", target: 16, actual: 18, unit: "Video", pic: "Lê Đăng Khoa", isParent: false, parentCode: "M2" },
      { code: "VM2-I01.3", title: "Số lượng ý tưởng mới", target: 25, actual: 28, unit: "Ý tưởng", pic: "Lê Đăng Khoa", isParent: false, parentCode: "M2" },
      { code: "VM2-I01.4", title: "Số lượng ý tưởng được chọn", target: 15, actual: 10, unit: "Ý tưởng", pic: "Lê Đăng Khoa", isParent: false, parentCode: "M2" },
      { code: "VM2-I01.5", title: "Tỷ lệ chọn ý tưởng", target: 60, actual: 35, unit: "%", pic: "Lê Đăng Khoa", isParent: false, parentCode: "M2" },

      { code: "M3", title: "KHÁCH HÀNG / DỊCH VỤ", target: 150, actual: 145, unit: "Views", pic: "Trịnh Quốc Thịnh", isParent: true },
      { code: "TM3-I01.02", title: "Tổng traffic đơn vị (Views)", target: 120, actual: 110, unit: "Triệu", pic: "Lê Đăng Khoa", isParent: false, parentCode: "M3" },
      { code: "TM3-I01.03", title: "Số lượng video upload", target: 45, actual: 48, unit: "Video", pic: "Trịnh Quốc Thịnh", isParent: false, parentCode: "M3" },

      { code: "M4", title: "THƯƠNG HIỆU / KÊNH KINH DOANH", target: 10, actual: 8, unit: "Kênh", pic: "Trần Như Quỳnh", isParent: true },
      { code: "TM4-I02.01", title: "Số kênh đạt ngưỡng 10k $/tháng", target: 4, actual: 2, unit: "Kênh", pic: "Trần Như Quỳnh", isParent: false, parentCode: "M4" },
      { code: "VM4-I02.04", title: "Số vi phạm chính sách", target: 0, actual: 1, unit: "Lần", pic: "Đào Thanh Công", isParent: false, parentCode: "M4" },

      { code: "M5", title: "QUẢN TRỊ VẬN HÀNH", target: 10, actual: 9, unit: "Điểm", pic: "Nguyễn Ánh Tùng", isParent: true },
      { code: "VM5-I02.01", title: "Thời gian sản xuất TB 1 video", target: 5, actual: 6.2, unit: "Ngày", pic: "Nguyễn Ánh Tùng", isParent: false, parentCode: "M5" },

      { code: "M6", title: "NHÂN SỰ TỔ CHỨC", target: 100, actual: 90, unit: "%", pic: "Trần Thị Diệu Ly", isParent: true },
      { code: "TM6-I01.02", title: "Tỷ lệ nhân sự tham gia đào tạo", target: 95, actual: 88, unit: "%", pic: "Trần Thị Diệu Ly", isParent: false, parentCode: "M6" },

      { code: "M7", title: "VĂN HÓA DOANH NGHIỆP", target: 100, actual: 98, unit: "%", pic: "Trần Thị Diệu Ly", isParent: true },
      { code: "VM7-I03.01", title: "Tỷ lệ nhân sự không vi phạm kỷ luật", target: 100, actual: 98.5, unit: "%", pic: "Trần Thị Diệu Ly", isParent: false, parentCode: "M7" },
    ];

    setKpiRows(defaultData);
  }, [filters]);

  const toggleRow = (code: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [code]: !prev[code]
    }));
  };

  // Tính toán chỉ số Micro Cards
  const financialParent = kpiRows.find(r => r.code === "M1");
  const trafficSub = kpiRows.find(r => r.code === "TM3-I01.02");

  const revenueCompletion = financialParent ? Math.round((financialParent.actual / financialParent.target) * 100) : 0;
  const trafficCompletion = trafficSub ? Math.round((trafficSub.actual / trafficSub.target) * 100) : 0;

  // Lọc tìm chỉ tiêu hoàn thành thấp nhất (<80%)
  const warningList = kpiRows
    .filter(r => !r.isParent && r.target > 0)
    .map(r => {
      const pct = Math.round((r.actual / r.target) * 100);
      return { ...r, pct };
    })
    .filter(r => r.pct < 80)
    .sort((a, b) => a.pct - b.pct)
    .slice(0, 3);

  // Hàm trả màu cho thanh tiến trình
  const getProgressColor = (val: number) => {
    if (val < 75) return "bg-rose-500";
    if (val < 95) return "bg-yellow-400";
    return "bg-emerald-500";
  };

  const getProgressTextColor = (val: number) => {
    if (val < 75) return "text-rose-500";
    if (val < 95) return "text-yellow-400";
    return "text-emerald-500";
  };

  return (
    <div className="flex flex-col gap-4">
      <FiltersHeader />

      {/* UNIT-LEVEL MICRO CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: % Hoàn thành doanh thu */}
        <div className="glass-panel p-4 flex flex-col justify-between h-[110px]">
          <div className="flex justify-between items-start">
            <h4 className="text-[10px] text-[var(--text-muted)] font-extrabold tracking-wider uppercase">
              Doanh thu hoàn thành
            </h4>
            <DollarSign size={16} className="text-[var(--accent-cyan)]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-black ${getProgressTextColor(revenueCompletion)}`}>
                {revenueCompletion}%
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">
                {financialParent?.actual}M / {financialParent?.target}M
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full ${getProgressColor(revenueCompletion)}`}
                style={{ width: `${Math.min(100, revenueCompletion)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 2: % Hoàn thành traffic */}
        <div className="glass-panel p-4 flex flex-col justify-between h-[110px]">
          <div className="flex justify-between items-start">
            <h4 className="text-[10px] text-[var(--text-muted)] font-extrabold tracking-wider uppercase">
              Traffic hoàn thành (M3)
            </h4>
            <TrendingUp size={16} className="text-[var(--accent-purple)]" />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className={`text-2xl font-black ${getProgressTextColor(trafficCompletion)}`}>
                {trafficCompletion}%
              </span>
              <span className="text-[10px] text-[var(--text-muted)]">
                {trafficSub?.actual}M / {trafficSub?.target}M Views
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full mt-2 overflow-hidden">
              <div 
                className={`h-full rounded-full ${getProgressColor(trafficCompletion)}`}
                style={{ width: `${Math.min(100, trafficCompletion)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Card 3: Cảnh báo rủi ro */}
        <div className={`glass-panel p-4 flex flex-col justify-between h-[110px] border-l-4 ${warningList.length > 0 ? "border-l-rose-500" : "border-l-emerald-500"}`}>
          <div className="flex justify-between items-start">
            <h4 className="text-[10px] text-[var(--text-muted)] font-extrabold tracking-wider uppercase">
              Chỉ tiêu báo động (&lt; 80%)
            </h4>
            <AlertOctagon size={16} className={warningList.length > 0 ? "text-rose-500" : "text-emerald-500"} />
          </div>
          <div className="text-xs">
            {warningList.length > 0 ? (
              <div className="space-y-1">
                {warningList.map(w => (
                  <div key={w.code} className="flex justify-between text-[11px] font-semibold text-rose-400">
                    <span className="truncate max-w-[140px]">⚠️ {w.title}</span>
                    <span>{w.pct}%</span>
                  </div>
                ))}
              </div>
            ) : (
              <span className="text-emerald-400 font-extrabold text-sm block py-1">
                ✓ Hệ thống an toàn (100% đạt chuẩn)
              </span>
            )}
          </div>
        </div>
      </div>

      {/* TREE GRID SMART TABLE */}
      <div className="glass-panel p-5 overflow-hidden">
        <h3 className="text-sm font-bold text-white tracking-wider mb-4 uppercase">
          📋 BẢNG CHỈ TIÊU CHI TIẾT THEO ĐƠN VỊ (TREE GRID)
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[var(--text-muted)] font-bold bg-slate-900/50">
                <th className="p-3 w-12 text-center">Mã</th>
                <th className="p-3">Chỉ tiêu / Mục tiêu</th>
                <th className="p-3 w-28 text-center">Kế hoạch</th>
                <th className="p-3 w-28 text-center">Thực tế</th>
                <th className="p-3 w-20 text-center">ĐVT</th>
                <th className="p-3 w-20 text-center">Tiến độ</th>
                <th className="p-3 w-36">Người phụ trách</th>
              </tr>
            </thead>
            <tbody>
              {kpiRows.map(row => {
                const isParent = row.isParent;
                const isExpanded = expandedRows[row.code];
                const pct = row.target > 0 ? Math.round((row.actual / row.target) * 100) : 100;

                // Nếu là con của parent bị collapse thì ẩn đi
                if (row.parentCode && !expandedRows[row.parentCode]) {
                  return null;
                }

                return (
                  <tr 
                    key={row.code} 
                    className={`border-b border-white/5 transition-all ${
                      isParent 
                        ? "bg-slate-900/40 font-bold text-white hover:bg-slate-900/60" 
                        : "text-[var(--text-muted)] hover:bg-white/5"
                    }`}
                  >
                    <td className="p-3 text-center">
                      <code className="bg-white/5 px-1.5 py-0.5 rounded text-[10px]">
                        {row.code}
                      </code>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        {isParent && (
                          <button 
                            onClick={() => toggleRow(row.code)}
                            className="text-[var(--accent-cyan)] focus:outline-none"
                          >
                            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                          </button>
                        )}
                        {!isParent && <span className="text-[var(--accent-purple)] pl-6">↳</span>}
                        <span>{row.title}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center font-semibold">
                      {row.target.toLocaleString()}
                    </td>
                    <td className="p-3 text-center font-bold text-white">
                      {row.actual.toLocaleString()}
                    </td>
                    <td className="p-3 text-center">{row.unit}</td>
                    <td className="p-3 text-center font-bold">
                      <span className={isParent ? "text-white" : getProgressTextColor(pct)}>
                        {pct}%
                      </span>
                    </td>
                    <td className="p-3 text-left font-medium">{row.pic}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
