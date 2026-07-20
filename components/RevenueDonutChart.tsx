"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface DonutData {
  name: string;
  value: number;
}

export default function RevenueDonutChart() {
  // Dữ liệu tỷ trọng đóng góp doanh thu đơn vị
  const data: DonutData[] = [
    { name: "Wolfoo (WO)", value: 45 },
    { name: "Lego (LEGO)", value: 20 },
    { name: "Music (SCMU)", value: 15 },
    { name: "Animated Story", value: 12 },
    { name: "Khác", value: 8 },
  ];

  const COLORS = ["#00f2fe", "#8b5cf6", "#10b981", "#ff4b72", "#64748b"];

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
              background: "#0f172a",
              border: "1px solid var(--glass-border)",
              borderRadius: 8,
              fontSize: 12,
            }}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconSize={8}
            layout="horizontal"
            wrapperStyle={{ fontSize: 10, color: "#94a3b8" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
