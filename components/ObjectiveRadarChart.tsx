"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { getRadarScores } from "@/lib/radarMasterData";
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

interface ObjectiveRadarChartProps {
  customData?: any[];
}

export default function ObjectiveRadarChart({ customData }: ObjectiveRadarChartProps) {
  const { filters, theme } = useApp();
  const isLight = theme === "light";

  const { unitName, labelCurr, labelPrev, points } = getRadarScores(
    filters.unitCode,
    filters.periodType,
    filters.month,
    filters.quarter,
    filters.year
  );

  const chartData = customData || points;

  return (
    <div className="w-full h-[320px] flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
          <PolarGrid stroke={isLight ? "#cbd5e1" : "rgba(255, 255, 255, 0.1)"} />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: isLight ? "#0f172a" : "#94a3b8", fontSize: 11, fontWeight: 700 }} 
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 120]} 
            tick={{ fill: isLight ? "#475569" : "#64748b", fontSize: 9 }}
          />
          <Radar
            name={`${unitName} (${labelCurr})`}
            dataKey="Kỳ này"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={isLight ? 0.35 : 0.25}
          />
          <Radar
            name={`Kỳ trước (${labelPrev})`}
            dataKey="Kỳ trước"
            stroke={isLight ? "#64748b" : "#94a3b8"}
            fill={isLight ? "#64748b" : "#94a3b8"}
            fillOpacity={0.12}
          />
          <Tooltip 
            formatter={(val: any) => `${val}%`}
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
