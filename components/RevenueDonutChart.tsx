"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { MASTER_KPI_DATA } from "@/lib/kpiMasterData";

interface Props {
  unitCode?: string;
  periodKey?: string;
  hideAbsoluteRevenue?: boolean;
}

interface UnitItem {
  code: string;
  name: string;
  candidates: string[];
}

export default function RevenueDonutChart({ unitCode = "SCVN", periodKey = "weekly_8_3", hideAbsoluteRevenue = false }: Props) {
  const { theme } = useApp();
  const isLight = theme === "light";
  const [data, setData] = useState<{ name: string; value: number; sharePct: number }[]>([]);

  let unitList: UnitItem[] = [
    { code: "Wofloo", name: "Wolfoo (WO)", candidates: ["VM1-I02.01-WF"] },
    { code: "Lego", name: "Lego (LEGO)", candidates: ["VM1-I02.01-Lego"] },
    { code: "AS", name: "Animated Story", candidates: ["VM1-I02.01-AS"] },
    { code: "DA01", name: "Dự án 01", candidates: ["DM1-I02.01-DA01", "DM1-I02.01"] },
    { code: "Music", name: "Music (SCMU)", candidates: ["MM1-I02.01"] },
    { code: "NDTH", name: "NDTH", candidates: ["VM1-I02.01-NDTH", "2.1"] },
    { code: "CR", name: "Creative Hub", candidates: ["CM1-I02.01", "CM1-I02.01-CR"] },
    { code: "CN", name: "CNGP", candidates: ["NM1-I02.01", "NM1-I02.01-CNGP"] },
    { code: "SCS", name: "Studio", candidates: ["SM1-I02.01"] }
  ];

  if (unitCode === "TCT") {
    unitList = [
      { code: "SCVN", name: "Khối SCVN (Sáng tạo ND)", candidates: ["VM1-I02.01"] },
      { code: "SCME", name: "Khối SCME (Kinh doanh & TM)", candidates: ["EM1-I02.01"] }
    ];
  }

  useEffect(() => {
    let isMounted = true;

    const resolveValue = (u: UnitItem, apiList: any[]) => {
      // 1. Search API list
      for (const cCode of u.candidates) {
        const match = apiList.find((r: any) => 
          (r.indicatorCode === cCode || r.code === cCode || r.displayCode === cCode) &&
          ((r.actualValue || 0) > 0 || (r.targetValue || 0) > 0 || (r.actual || 0) > 0 || (r.target || 0) > 0)
        );
        if (match) {
          const val = match.actualValue ?? match.actual ?? match.targetValue ?? match.target ?? 0;
          if (val > 0) return Math.round(val / 1e6);
        }
      }

      // 2. Search master dict
      const scvnDict = MASTER_KPI_DATA["SCVN"] || {};
      const uDict = MASTER_KPI_DATA[u.code] || {};
      for (const cCode of u.candidates) {
        const p1 = uDict[cCode]?.periods?.[periodKey];
        if (p1 && ((p1.actual || 0) > 0 || (p1.target || 0) > 0)) {
          const val = p1.actual || p1.target || 0;
          return Math.round(val / 1e6);
        }
        const p2 = scvnDict[cCode]?.periods?.[periodKey];
        if (p2 && ((p2.actual || 0) > 0 || (p2.target || 0) > 0)) {
          const val = p2.actual || p2.target || 0;
          return Math.round(val / 1e6);
        }
      }

      return 0;
    };

    const fetches = unitCode === "TCT"
      ? [
          fetch(`/api/kpi?unitCode=TCT&periodKey=${periodKey}`).then(r => r.json()).catch(() => []),
          fetch(`/api/kpi?unitCode=SCVN&periodKey=${periodKey}`).then(r => r.json()).catch(() => []),
          fetch(`/api/kpi?unitCode=SCME&periodKey=${periodKey}`).then(r => r.json()).catch(() => [])
        ]
      : [
          fetch(`/api/kpi?unitCode=${unitCode}&periodKey=${periodKey}`).then(r => r.json()).catch(() => [])
        ];

    Promise.all(fetches)
      .then((results) => {
        if (!isMounted) return;
        const apiList = results.flat();
        const rawData = unitList.map((u) => ({
          name: u.name,
          value: resolveValue(u, apiList)
        })).filter((d) => d.value > 0);

        const totalRev = rawData.reduce((acc, curr) => acc + curr.value, 0);
        const finalData = rawData.map((d) => ({
          ...d,
          sharePct: totalRev > 0 ? Number(((d.value / totalRev) * 100).toFixed(1)) : 0
        }));

        setData(finalData);
      })
      .catch(() => {
        if (!isMounted) return;
        const rawData = unitList.map((u) => ({
          name: u.name,
          value: resolveValue(u, [])
        })).filter((d) => d.value > 0);

        const totalRev = rawData.reduce((acc, curr) => acc + curr.value, 0);
        const finalData = rawData.map((d) => ({
          ...d,
          sharePct: totalRev > 0 ? Number(((d.value / totalRev) * 100).toFixed(1)) : 0
        }));

        setData(finalData);
      });

    return () => {
      isMounted = false;
    };
  }, [periodKey]);

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
              if (hideAbsoluteRevenue) {
                return [`Tỷ trọng: ${pct}%`, name];
              }
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
            itemStyle={{
              color: isLight ? "#0f172a" : "#ffffff"
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
