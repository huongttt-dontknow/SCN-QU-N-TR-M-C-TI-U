"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";

interface RadarData {
  subject: string;
  "Kỳ này": number;
  "Kỳ trước": number;
}

export default function ObjectiveRadarChart() {
  const { theme } = useApp();
  const isLight = theme === "light";

  // Dữ liệu mặc định 7 mặt mục tiêu
  const data: RadarData[] = [
    { subject: "Tài chính", "Kỳ này": 85, "Kỳ trước": 75 },
    { subject: "Sản phẩm", "Kỳ này": 90, "Kỳ trước": 80 },
    { subject: "Khách hàng", "Kỳ này": 70, "Kỳ trước": 85 },
    { subject: "Thương hiệu", "Kỳ này": 88, "Kỳ trước": 70 },
    { subject: "QT Vận hành", "Kỳ này": 95, "Kỳ trước": 88 },
    { subject: "Nhân sự", "Kỳ này": 80, "Kỳ trước": 82 },
    { subject: "Văn hóa", "Kỳ này": 90, "Kỳ trước": 92 },
  ];

  return (
    <div className="w-full h-[320px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke={isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.1)"} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: isLight ? "#0f172a" : "#94a3b8", fontSize: 11, fontWeight: 700 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: isLight ? "#475569" : "#64748b", fontSize: 9 }}
          />
          <Radar
            name="Kỳ này"
            dataKey="Kỳ này"
            stroke="var(--accent-emerald)"
            fill="var(--accent-emerald)"
            fillOpacity={isLight ? 0.35 : 0.25}
          />
          <Radar
            name="Kỳ trước"
            dataKey="Kỳ trước"
            stroke={isLight ? "#64748b" : "#94a3b8"}
            fill={isLight ? "#64748b" : "#94a3b8"}
            fillOpacity={0.15}
          />
          <Tooltip 
            contentStyle={{ 
              background: isLight ? "#ffffff" : "#0f172a", 
              border: isLight ? "1px solid #cbd5e1" : "1px solid var(--glass-border)", 
              borderRadius: 8,
              fontSize: 12,
              color: isLight ? "#0f172a" : "#ffffff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }} 
          />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconSize={8}
            wrapperStyle={{ fontSize: 11, color: isLight ? "#0f172a" : "#94a3b8", fontWeight: 600 }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
