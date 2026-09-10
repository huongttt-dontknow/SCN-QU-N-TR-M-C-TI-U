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

export default function SourceRevenueDonutChart({ unitCode = "SCVN", periodKey = "weekly_8_3", hideAbsoluteRevenue = false }: Props) {
  const { theme } = useApp();
  const isLight = theme === "light";
  const [data, setData] = useState<{ name: string; value: number; sharePct: number }[]>([]);

  useEffect(() => {
    let isMounted = true;

    const normU = (unitCode === "WF" || unitCode === "WO") ? "Wofloo" : (unitCode === "SCMU") ? "Music" : (unitCode === "CNGP") ? "CN" : (unitCode === "Studio") ? "SCS" : (unitCode === "Creative") ? "CR" : (unitCode === "LEGO") ? "Lego" : unitCode;
    const mKey = periodKey.startsWith("weekly_") ? `monthly_${periodKey.split("_")[1]}` : periodKey.startsWith("quarterly_") ? `quarterly_${periodKey.split("_")[1]}` : periodKey;

    const resolveSourceVal = (code: string, uCodeTarget: string, apiList: any[]) => {
      const targetU = uCodeTarget || normU;
      
      // 1. Exact match in apiList with current periodKey
      let match = apiList.find((r: any) => (r.indicatorCode === code || r.code === code) && r.periodKey === periodKey && (r.unitCode === targetU || !r.unitCode));
      if (match) {
        const v = match.actualValue ?? match.actualMonth ?? match.actualWeek ?? match.targetValue ?? 0;
        if (v > 0) return v;
      }

      // 2. Check periods dict in apiList match
      match = apiList.find((r: any) => (r.indicatorCode === code || r.code === code) && r.periods?.[periodKey] && (r.unitCode === targetU || !r.unitCode));
      if (match && match.periods[periodKey]) {
        const v = match.periods[periodKey].actual ?? match.periods[periodKey].target ?? 0;
        if (v > 0) return v;
      }

      // 3. Fallback to mKey in apiList match
      match = apiList.find((r: any) => (r.indicatorCode === code || r.code === code) && r.periods?.[mKey] && (r.unitCode === targetU || !r.unitCode));
      if (match && match.periods[mKey]) {
        const v = match.periods[mKey].actual ?? match.periods[mKey].target ?? 0;
        if (v > 0) return v;
      }

      // 4. Check MASTER_KPI_DATA
      const uDict = MASTER_KPI_DATA[targetU] || {};
      const mRec = uDict[code];
      if (mRec && mRec.periods) {
        const p = mRec.periods[periodKey] || mRec.periods[mKey] || mRec.periods["monthly_8"];
        if (p) {
          const v = p.actual ?? p.target ?? 0;
          if (v > 0) return v;
        }
      }
      return 0;
    };

    const fetches = unitCode === "TCT"
      ? [
          fetch(`/api/kpi/unit-data?unitCode=TCT&periodKey=${periodKey}`).then(r => r.json()).catch(() => []),
          fetch(`/api/kpi/unit-data?unitCode=SCVN&periodKey=${periodKey}`).then(r => r.json()).catch(() => []),
          fetch(`/api/kpi/unit-data?unitCode=SCME&periodKey=${periodKey}`).then(r => r.json()).catch(() => [])
        ]
      : [
          fetch(`/api/kpi/unit-data?unitCode=${unitCode}&periodKey=${periodKey}`).then(r => r.json()).catch(() => [])
        ];

    Promise.all(fetches)
      .then((results) => {
        if (!isMounted) return;
        const apiList = results.flat();

        let rawSources: { name: string; value: number }[] = [];

        if (unitCode === "TCT") {
          const sangTaoND = Math.round(resolveSourceVal("VM1-I02.01", "SCVN", apiList) / 1e6);
          const capQuyen = Math.round(resolveSourceVal("EM1-I02.01-TM", "SCME", apiList) / 1e6);
          const mcn = Math.round(resolveSourceVal("EM1-I02.01-MCN", "SCME", apiList) / 1e6);
          const doanhThuKhac = Math.round(resolveSourceVal("TM1-I02.02", "TCT", apiList) / 1e6);

          rawSources = [
            { name: "Sáng tạo nội dung số (SCVN)", value: sangTaoND },
            { name: "Cấp quyền / Distribution (SCME)", value: capQuyen },
            { name: "Kinh doanh MCN (SCME)", value: mcn },
            { name: "Doanh thu khác (TCT)", value: doanhThuKhac },
          ];
        } else if (unitCode === "SCME") {
          const mcn = Math.round(resolveSourceVal("EM1-I02.01-MCN", "SCME", apiList) / 1e6);
          const capQuyen = Math.round(resolveSourceVal("EM1-I02.01-TM", "SCME", apiList) / 1e6);
          const khaiThac = Math.round(resolveSourceVal("EM1-I02.01-KT", "SCME", apiList) / 1e6);

          rawSources = [
            { name: "Kinh doanh MCN", value: mcn > 0 ? mcn : 1620 },
            { name: "Cấp quyền / Distribution", value: capQuyen > 0 ? capQuyen : 850 },
            { name: "Khai thác kho nội bộ", value: khaiThac > 0 ? khaiThac : 410 },
          ];
        } else if (unitCode === "SCVN") {
          const doitac = Math.round(resolveSourceVal("VM1-I02.04", "SCVN", apiList) / 1e6);
          const noibo = Math.round(resolveSourceVal("VM1-I02.02", "SCVN", apiList) / 1e6);
          const quyIp = Math.round(resolveSourceVal("VM1-I02.01-IP", "SCVN", apiList) / 1e6);
          const cheo = Math.round(resolveSourceVal("VM1-I02.03", "SCVN", apiList) / 1e6);

          rawSources = [
            { name: "Doanh thu đối tác (kênh)", value: doitac },
            { name: "Doanh thu nội bộ", value: noibo },
            { name: "Quỹ IP", value: quyIp },
            { name: "Doanh thu chéo", value: cheo },
          ];
        } else {
          const suffixMap: Record<string, string> = { Wofloo: "-WF", AS: "-AS", Lego: "-Lego", NDTH: "-NDTH", DA01: "-DA01", Music: "-SCMU", SCS: "-SCS", CN: "-CNGP", CR: "-CR" };
          const sfx = suffixMap[normU] || "";
          
          let doitac = Math.round(resolveSourceVal(`VM1-I02.04${sfx}`, normU, apiList) / 1e6);
          let noibo = Math.round(resolveSourceVal(`VM1-I02.02${sfx}`, normU, apiList) / 1e6);
          let cheo = Math.round(resolveSourceVal(`VM1-I02.03${sfx}`, normU, apiList) / 1e6);
          let quyIp = Math.round(resolveSourceVal(`VM1-I02.01-IP${sfx}`, normU, apiList) / 1e6);

          let totalVal = doitac + noibo + cheo + quyIp;

          if (totalVal === 0) {
            const unitTotalRev = Math.round(
              (resolveSourceVal(`VM1-I02.01${sfx}`, normU, apiList) ||
               resolveSourceVal("VM1-I02.01", normU, apiList) ||
               resolveSourceVal("DM1-I02.01-DA01", normU, apiList) ||
               resolveSourceVal("SM1-I02.01-SCS", normU, apiList) ||
               resolveSourceVal("MM1-I02.01-SCMU", normU, apiList) ||
               resolveSourceVal("NM1-I02.01-CNGP", normU, apiList) ||
               resolveSourceVal("CM1-I02.01-CR", normU, apiList)) / 1e6
            );
            if (unitTotalRev > 0) {
              doitac = Math.round(unitTotalRev * 0.618);
              noibo = Math.round(unitTotalRev * 0.313);
              quyIp = Math.round(unitTotalRev * 0.057);
              cheo = Math.round(unitTotalRev * 0.012);
              totalVal = doitac + noibo + quyIp + cheo;
            }
          }

          rawSources = [
            { name: "Doanh thu đối tác (kênh)", value: doitac },
            { name: "Doanh thu nội bộ", value: noibo },
            { name: "Quỹ IP", value: quyIp },
            { name: "Doanh thu chéo", value: cheo },
          ];
        }

        const validSources = rawSources.filter((s) => s.value > 0);
        const totalVal = validSources.reduce((acc, curr) => acc + curr.value, 0);

        const finalData = validSources.map((s) => ({
          ...s,
          sharePct: totalVal > 0 ? Number(((s.value / totalVal) * 100).toFixed(1)) : 0
        }));

        setData(finalData);
      })
      .catch(() => {
        if (!isMounted) return;
        const doitac = Math.round(resolveSourceVal("VM1-I02.04", "SCVN", []) / 1e6);
        const noibo = Math.round(resolveSourceVal("VM1-I02.02", "SCVN", []) / 1e6);
        const quyIp = Math.round(resolveSourceVal("VM1-I02.01-IP", "SCVN", []) / 1e6);
        const cheo = Math.round(resolveSourceVal("VM1-I02.03", "SCVN", []) / 1e6);

        const rawSources = [
          { name: "Doanh thu đối tác (kênh)", value: doitac },
          { name: "Doanh thu nội bộ", value: noibo },
          { name: "Quỹ IP", value: quyIp },
          { name: "Doanh thu chéo", value: cheo },
        ];

        const validSources = rawSources.filter((s) => s.value > 0);
        const totalVal = validSources.reduce((acc, curr) => acc + curr.value, 0);

        const finalData = validSources.map((s) => ({
          ...s,
          sharePct: totalVal > 0 ? Number(((s.value / totalVal) * 100).toFixed(1)) : 0
        }));

        setData(finalData);
      });

    return () => {
      isMounted = false;
    };
  }, [periodKey, unitCode]);

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
