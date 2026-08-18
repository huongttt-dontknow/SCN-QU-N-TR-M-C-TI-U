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
  hideAbsoluteRevenue?: boolean;
}

export default function MonthlyRevenueProgressChart({ kpiDataList, hideAbsoluteRevenue = false }: MonthlyRevenueProgressChartProps = {}) {
  const { filters, theme } = useApp();
  const isLight = theme === "light";
  const month = Number(filters.month) || 7;
  const week = Number(filters.week) || 1;
  const periodType = filters.periodType;

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
    else if (uCode === "CR") candidateCodes.push("CM1-I02.01", "CM1-I02.01-CR", "CM1-I02.01.01");
    else if (uCode === "CN") candidateCodes.push("NM1-I02.01", "NM1-I02.01-CNGP", "NM1-I02.01.01");
    else if (uCode === "SCS") candidateCodes.push("SM1-I02.01", "SM1-I02.01-SCS", "SM1-I02.01.01");
    else if (uCode === "Music") candidateCodes.push("MM1-I02.01", "MM1-I02.01-SCMU", "MM1-I02.01.01");

    const month8MasterTargets: Record<string, number> = {
      SCVN: 6691075313,
      Wofloo: 560000000,
      AS: 2096797220,
      NDTH: 600000000,
      Lego: 750100325,
      DA01: 761332000,
      SCS: 758784000,
      Music: 283961768,
      CN: 330000000,
      CR: 100100000,
    };

    if (kpiDataList && kpiDataList.length > 0) {
      const subSuffixes = ["-Lego", "-WF", "-AS", "-NDTH", "-DA01", "-CR", "-CNGP", "-SCS", "-SCMU", "-WO", "-LEGO"];
      let matches = kpiDataList.filter(k => {
        const kCode = k.code || k.indicatorCode;
        if (uCode === "SCVN") {
          return kCode === "VM1-I02.01" && (!k.unitCode || k.unitCode === "SCVN");
        }
        return (k.unitCode === uCode || subSuffixes.some(s => kCode?.endsWith(s))) && candidateCodes.includes(kCode);
      });

      if (matches.length > 0) {
        let maxAct = 0;
        let maxTgt = 0;
        for (const m of matches) {
          let act = 0;
          let tgt = 0;
          if (m.periods && m.periods[pKey]) {
            act = m.periods[pKey].actual || 0;
            tgt = m.periods[pKey].target || 0;
          } else if (m.periodKey === pKey) {
            act = m.actualValue || 0;
            tgt = m.targetValue || 0;
          } else if (pKey.startsWith("monthly_")) {
            act = m.actualMonth || 0;
            tgt = m.targetMonth || 0;
          } else if (pKey.startsWith("weekly_")) {
            act = m.actualWeek || 0;
            tgt = m.targetWeek || 0;
          }
          if (act > maxAct) maxAct = act;
          if (tgt > maxTgt) maxTgt = tgt;
        }

        let target = maxTgt;
        if (pKey.startsWith("monthly_")) {
          if (month === 8 && month8MasterTargets[uCode]) {
            target = month8MasterTargets[uCode];
          }
        }
        return { target, actual: maxAct };
      }
    }

    if (pKey.startsWith("monthly_") && month === 8 && month8MasterTargets[uCode]) {
      return { target: month8MasterTargets[uCode], actual: 0 };
    }

    return null;
  };

  const selectedW = periodType === "weekly" ? (Number(week) || 1) : 5;

  const data = unitList.map(u => {
    // 1. Kế hoạch tháng
    const mRec = getRecordVal(u.code, `monthly_${month}`);
    let target = mRec?.target || 0;

    // 2. Lũy kế doanh thu thực tế các tuần trong tháng từ Tuần 1 đến Tuần đang lọc (selectedW)
    let sumActual = 0;
    for (let w = 1; w <= selectedW; w++) {
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
      pct
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
                  {!hideAbsoluteRevenue && (
                    <>
                      <div>Thực tế tích lũy: {formatRevenue(actual)}</div>
                      <div className="text-[var(--text-muted)]">Kế hoạch tháng: {formatRevenue(target)}</div>
                    </>
                  )}
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
