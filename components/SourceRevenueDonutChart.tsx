"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface DonutData {
  name: string;
  value: number;
}

export default function SourceRevenueDonutChart() {
  const { theme } = useApp();
  const isLight = theme === "light";

  // Dữ liệu cơ cấu doanh thu theo nguồn
  const data: DonutData[] = [
    { name: "Doanh thu nội bộ", value: 35 },
    { name: "Doanh thu chéo", value: 25 },
    { name: "DT đối tác", value: 20 },
    { name: "Quỹ IP", value: 12 },
    { name: "Khác", value: 8 },
  ];

  const COLORS = isLight 
    ? ["#16a34a", "#a3e635", "#84cc16", "#10b981", "#64748b"]
    : ["#10b981", "#a3e635", "#22c55e", "#00f2fe", "#64748b"];

  return (
    <div className="w-full h-[240px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: any) => `${value}%`}
            contentStyle={{
              background: isLight ? "#ffffff" : "#0f172a",
              border: isLight ? "1px solid #cbd5e1" : "1px solid var(--glass-border)",
              borderRadius: 8,
              fontSize: 12,
              color: isLight ? "#0f172a" : "#ffffff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconSize={8}
            layout="horizontal"
            wrapperStyle={{ fontSize: 10, color: isLight ? "#0f172a" : "#94a3b8", fontWeight: 700 }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
