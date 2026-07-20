"use client";

import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface DonutData {
  name: string;
  value: number;
}

export default function SourceRevenueDonutChart() {
  // Dữ liệu cơ cấu doanh thu theo nguồn
  const data: DonutData[] = [
    { name: "Doanh thu nội bộ", value: 35 },
    { name: "Doanh thu chéo", value: 25 },
    { name: "DT đối tác", value: 20 },
    { name: "Quỹ IP", value: 12 },
    { name: "Khác", value: 8 },
  ];

  // Bảng màu Glassmorphism tương thích
  const COLORS = ["#00f2fe", "#10b981", "#ff4b72", "#8b5cf6", "#f59e0b"];

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
