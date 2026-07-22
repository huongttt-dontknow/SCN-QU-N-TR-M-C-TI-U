"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { getMasterKpiRecord } from "@/lib/kpiMasterData";

interface Props {
  unitCode?: string;
  periodKey?: string;
}

export default function RevenueDonutChart({ unitCode = "SCVN", periodKey = "monthly_6" }: Props) {
  const { theme } = useApp();
  const isLight = theme === "light";

  const unitList = [
    { code: "Wofloo", name: "Wolfoo (WO)" },
    { code: "Lego", name: "Lego (LEGO)" },
    { code: "AS", name: "Animated Story" },
    { code: "DA01", name: "Dự án 01" },
    { code: "Music", name: "Music (SCMU)" },
    { code: "NDTH", name: "NDTH" },
    { code: "CR", name: "Creative Hub" },
    { code: "CN", name: "CNGP" },
    { code: "SCS", name: "Studio" },
  ];

  // Raw values in Triệu VNĐ
  const rawData = unitList.map(u => {
    const rec = getMasterKpiRecord(u.code, "VM1-I02.01", periodKey);
    const val = rec?.actual ? Math.round(rec.actual / 1e6) : (rec?.target ? Math.round(rec.target / 1e6) : 0);
    return { name: u.name, value: val };
  }).filter(d => d.value > 0);

  const totalRev = rawData.reduce((acc, curr) => acc + curr.value, 0);

  const data = rawData.map(d => ({
    ...d,
    sharePct: totalRev > 0 ? Number(((d.value / totalRev) * 100).toFixed(1)) : 0
  }));

  const COLORS = isLight 
    ? ["#16a34a", "#84cc16", "#0284c7", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#06b6d4", "#64748b"]
    : ["#22c55e", "#a3e635", "#38bdf8", "#c084fc", "#f472b6", "#fbbf24", "#34d399", "#22d3ee", "#94a3b8"];

  if (data.length === 0) {
    return (
      <div className="w-full h-[240px] flex items-center justify-center text-xs text-[var(--text-muted)] font-bold">
        Chưa có số liệu doanh thu đơn vị kỳ này
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
