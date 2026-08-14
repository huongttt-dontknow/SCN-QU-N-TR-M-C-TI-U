"use client";

import React from "react";
import { useApp } from "@/context/AppContext";
import { MASTER_KPI_DATA } from "@/lib/kpiMasterData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Cell,
  CartesianGrid,
  LabelList
} from "recharts";

interface MonthlyRevenueProgressChartProps {
  kpiDataList?: any[];
}

export default function MonthlyRevenueProgressChart({ kpiDataList }: MonthlyRevenueProgressChartProps = {}) {
  const { filters, theme } = useApp();
  const isLight = theme === "light";
  const month = Number(filters.month) || 7;

  const unitList = [
    { code: "SCVN", name: "BU SCVN" },
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

  const formatRevenue = (val: number) => {
    if (val >= 1e9) {
      return `${(val / 1e9).toFixed(2)} Tỷ`;
    }
    return `${(val / 1e6).toFixed(0)} Triệu`;
  };

  const getRecordVal = (uCode: string, pKey: string) => {
    const candidateCodes: string[] = [];
    if (uCode === "SCVN") candidateCodes.push("VM1-I02.01");
    else if (uCode === "Wofloo") candidateCodes.push("VM1-I02.01-WF");
    else if (uCode === "AS") candidateCodes.push("VM1-I02.01-AS");
    else if (uCode === "Lego") candidateCodes.push("VM1-I02.01-Lego");
    else if (uCode === "DA01") candidateCodes.push("DM1-I02.01-DA01", "DM1-I02.01");
    else if (uCode === "NDTH") candidateCodes.push("VM1-I02.01-NDTH", "2.1");
    else if (uCode === "CR") candidateCodes.push("CM1-I02.01-CR", "CM1-I02.01");
    else if (uCode === "CN") candidateCodes.push("NM1-I02.01-CNGP", "NM1-I02.01");
    else if (uCode === "SCS") candidateCodes.push("SM1-I02.01-SCS", "SM1-I02.01");
    else if (uCode === "Music") candidateCodes.push("MM1-I02.01", "MM1-I02.01-SCMU");
    candidateCodes.push("VM1-I02.01");

    if (kpiDataList && kpiDataList.length > 0) {
      for (const cCode of candidateCodes) {
        const match = kpiDataList.find(k => 
          (k.code === cCode || k.displayCode === cCode || k.indicatorCode === cCode) && 
          (!k.periodKey || k.periodKey === pKey)
        );
        if (match) {
          let target = match.targetWeek ?? match.targetMonth ?? match.targetValue ?? 0;
          let actual = match.actualWeek ?? match.actualMonth ?? match.actualValue ?? 0;
          if (pKey.startsWith("monthly_")) {
            target = match.targetMonth ?? match.targetValue ?? 0;
            actual = match.actualMonth ?? match.actualValue ?? 0;
          }
          return { target, actual };
        }
      }
    }

    // fallback to MASTER_KPI_DATA
    const uData = MASTER_KPI_DATA[uCode] || MASTER_KPI_DATA["SCVN"] || {};
    for (const cCode of candidateCodes) {
      if (uData[cCode] && uData[cCode].periods && uData[cCode].periods[pKey]) {
        const p = uData[cCode].periods[pKey];
        return { target: p.target || 0, actual: p.actual || 0 };
      }
    }
    return null;
  };

  const data = unitList.map(u => {
    // 1. Kế hoạch tháng
    const mRec = getRecordVal(u.code, `monthly_${month}`);
    let target = mRec?.target || 0;

    // 2. Lũy kế doanh thu thực tế các tuần trong tháng
    let sumActual = 0;
    for (let w = 1; w <= 5; w++) {
      const wRec = getRecordVal(u.code, `weekly_${month}_${w}`);
      if (wRec && (wRec.actual !== undefined || wRec.target !== undefined)) {
        sumActual += wRec.actual || 0;
      }
    }

    // 3. Tính % tiến độ
    const pct = target > 0 ? Math.round((sumActual / target) * 100) : 0;

    return {
      name: u.name,
      code: u.code,
      actual: sumActual,
      target,
      pct,
    };
  });

  return (
    <div className="w-full h-[320px] flex flex-col justify-between mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={false}
            stroke={isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.05)"}
          />
          <XAxis
            type="number"
            domain={[0, (dataMax: number) => Math.max(100, dataMax)]}
            tickFormatter={(val) => `${val}%`}
            tick={{ fill: isLight ? "#475569" : "#64748b", fontSize: 9, fontWeight: 600 }}
            stroke={isLight ? "#cbd5e1" : "rgba(255,255,255,0.1)"}
          />
          <YAxis
            type="category"
            dataKey="name"
            width={110}
            tick={{ fill: isLight ? "#0f172a" : "#cbd5e1", fontSize: 10, fontWeight: 700 }}
            stroke={isLight ? "#cbd5e1" : "rgba(255,255,255,0.1)"}
          />
          <Tooltip
            cursor={{ fill: isLight ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.02)" }}
            contentStyle={{
              background: isLight ? "#ffffff" : "#0f172a",
              border: isLight ? "1px solid #cbd5e1" : "1px solid var(--glass-border)",
              borderRadius: 10,
              fontSize: 11,
              color: isLight ? "#0f172a" : "#ffffff",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              fontWeight: "bold"
            }}
            formatter={(value: any, name: any, props: any) => {
              const { actual, target, pct } = props.payload;
              return [
                <div key={props.payload.code} className="space-y-1 text-xs">
                  <div className="text-emerald-500 font-extrabold">Tiến độ: {pct}%</div>
                  <div>Thực tế tích lũy: {formatRevenue(actual)}</div>
                  <div className="text-[var(--text-muted)]">Kế hoạch tháng: {formatRevenue(target)}</div>
                </div>,
                null
              ];
            }}
          />
          <Bar
            dataKey="pct"
            radius={[0, 4, 4, 0]}
            barSize={12}
          >
            {data.map((entry, index) => {
              const isSCVN = entry.code === "SCVN";
              const color = isSCVN 
                ? (isLight ? "#7c3aed" : "#a78bfa")
                : (entry.pct >= 100 
                    ? (isLight ? "#059669" : "#34d399") 
                    : (entry.pct >= 50 ? (isLight ? "#0284c7" : "#38bdf8") : (isLight ? "#ea580c" : "#fb923c")));
              return <Cell key={`cell-${index}`} fill={color} />;
            })}
            <LabelList 
              dataKey="pct" 
              position="right" 
              formatter={(val: number) => `${val}%`} 
              style={{ fill: isLight ? "#0f172a" : "#cbd5e1", fontSize: 9, fontWeight: 700 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
