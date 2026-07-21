"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { MASTER_KPI_DATA } from "@/lib/kpiMasterData";

interface Props {
  unitCode?: string;
  periodKey?: string;
}

export default function SourceRevenueDonutChart({ unitCode = "SCVN", periodKey = "monthly_6" }: Props) {
  const { theme } = useApp();
  const isLight = theme === "light";

  const uDict = MASTER_KPI_DATA[unitCode] || MASTER_KPI_DATA["SCVN"] || {};

  const getSourceVal = (kpiCode: string, keyword: string) => {
    let rec = uDict[kpiCode];
    if (!rec) {
      for (const k in uDict) {
        const v = uDict[k];
        const t = (v.title || "").toUpperCase();
        const u = (v.unit || "").toUpperCase();
        if (t.includes(keyword) || u.includes(keyword)) {
          rec = v;
          break;
        }
      }
    }
    if (!rec || !rec.periods) return 0;
    const p = rec.periods[periodKey];
    return p?.actual ?? p?.target ?? 0;
  };

  const noibo = Math.round(getSourceVal("VM1-I02.02", "NỘI BỘ") / 1e6);
  const cheo = Math.round(getSourceVal("VM1-I02.03", "CHÉO") / 1e6);
  const doitac = Math.round(getSourceVal("VM1-I02.04", "ĐỐI TÁC") / 1e6);
  const khac = Math.round(getSourceVal("VM1-I05.03", "KHÁC") / 1e6);
  const quyIp = Math.round(getSourceVal("VM1-I05.04", "QUỸ IP") / 1e6);

  const rawSources = [
    { name: "Doanh thu nội bộ", value: noibo },
    { name: "Doanh thu chéo", value: cheo },
    { name: "Doanh thu đối tác", value: doitac },
  ];

  if (unitCode === "SCVN" || unitCode === "TCT") {
    rawSources.push({ name: "Doanh thu khác", value: khac });
    rawSources.push({ name: "Quỹ IP", value: quyIp });
  }

  const validSources = rawSources.filter(s => s.value > 0);
  const totalVal = validSources.reduce((acc, curr) => acc + curr.value, 0);

  const data = validSources.map(s => ({
    ...s,
    sharePct: totalVal > 0 ? Number(((s.value / totalVal) * 100).toFixed(1)) : 0
  }));

  const COLORS = isLight 
    ? ["#16a34a", "#84cc16", "#0284c7", "#a855f7", "#ec4899"]
    : ["#22c55e", "#a3e635", "#38bdf8", "#c084fc", "#f472b6"];

  if (data.length === 0) {
    return (
      <div className="w-full h-[240px] flex items-center justify-center text-xs text-[var(--text-muted)] font-bold">
        Chưa có số liệu doanh thu theo nguồn kỳ này
      </div>
    );
  }

  return (
    <div className="w-full h-[240px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={55}
            outerRadius={75}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(val: any, name: any, item: any) => {
              const num = Number(val) || 0;
              const pct = item?.payload?.sharePct || 0;
              const valStr = num >= 1000 ? `${(num / 1000).toFixed(2)} Tỷ` : `${num.toLocaleString()} Triệu`;
              return [`${valStr} VNĐ (${pct}%)`, name];
            }}
            contentStyle={{
              background: isLight ? "#ffffff" : "#0f172a",
              border: isLight ? "1px solid #cbd5e1" : "1px solid var(--glass-border)",
              borderRadius: 8,
              fontSize: 11,
              color: isLight ? "#0f172a" : "#ffffff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
              fontWeight: "bold"
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={45}
            iconSize={8}
            layout="horizontal"
            wrapperStyle={{ fontSize: 9, color: isLight ? "#0f172a" : "#94a3b8", fontWeight: 700 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
