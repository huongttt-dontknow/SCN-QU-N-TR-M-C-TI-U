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

    const resolveSourceVal = (code: string, keywords: string[], apiList: any[]) => {
      // 1. Check API list
      const apiMatch = apiList.find((r: any) => 
        (r.indicatorCode === code || r.code === code || keywords.some(kw => (r.title || "").toUpperCase().includes(kw))) &&
        ((r.actualValue || 0) > 0 || (r.targetValue || 0) > 0 || (r.actual || 0) > 0 || (r.target || 0) > 0)
      );
      if (apiMatch) {
        const val = apiMatch.actualValue ?? apiMatch.actual ?? apiMatch.targetValue ?? apiMatch.target ?? 0;
        if (val > 0) return Math.round(val / 1e6);
      }

      // 2. Check MASTER_KPI_DATA
      const uDict = MASTER_KPI_DATA[unitCode] || MASTER_KPI_DATA["SCVN"] || {};
      let mRec = uDict[code];
      if (!mRec) {
        for (const k in uDict) {
          const v = uDict[k];
          const t = (v.title || "").toUpperCase();
          if (keywords.some(kw => t.includes(kw))) {
            mRec = v;
            break;
          }
        }
      }
      if (mRec && mRec.periods && mRec.periods[periodKey]) {
        const p = mRec.periods[periodKey];
        const val = p.actual || p.target || 0;
        if (val > 0) return Math.round(val / 1e6);
      }

      return 0;
    };

    fetch(`/api/kpi?unitCode=${unitCode}&periodKey=${periodKey}`)
      .then((res) => res.json())
      .then((apiData) => {
        if (!isMounted) return;
        const apiList = Array.isArray(apiData) ? apiData : [];

        let rawSources: { name: string; value: number }[] = [];

        if (unitCode === "TCT") {
          const sangTaoND = resolveSourceVal("VM1-I02.01", ["SÁNG TẠO", "SCVN"], apiList);
          const capQuyen = resolveSourceVal("EM1-I02.01-TM", ["CẤP QUYỀN", "THƯƠNG MẠI"], apiList);
          const mcn = resolveSourceVal("EM1-I02.01-MCN", ["MCN"], apiList);
          const doanhThuKhac = resolveSourceVal("TM1-I02.02", ["KHÁC"], apiList);

          rawSources = [
            { name: "Sáng tạo nội dung số (SCVN)", value: sangTaoND },
            { name: "Cấp quyền / Distribution (SCME)", value: capQuyen },
            { name: "Kinh doanh MCN (SCME)", value: mcn },
            { name: "Doanh thu khác (TCT)", value: doanhThuKhac },
          ];
        } else {
          const noibo = resolveSourceVal("VM1-I02.02", ["NỘI BỘ"], apiList);
          const cheo = resolveSourceVal("VM1-I02.03", ["CHÉO"], apiList);
          const doitac = resolveSourceVal("VM1-I02.04", ["ĐỐI TÁC"], apiList);
          const khac = resolveSourceVal("VM1-I05.03", ["KHÁC"], apiList);
          const quyIp = resolveSourceVal("VM1-I05.04", ["QUỸ IP"], apiList);

          rawSources = [
            { name: "Doanh thu nội bộ", value: noibo },
            { name: "Doanh thu chéo", value: cheo },
            { name: "Doanh thu đối tác", value: doitac },
          ];

          if (khac > 0) rawSources.push({ name: "Doanh thu khác", value: khac });
          if (quyIp > 0) rawSources.push({ name: "Quỹ IP", value: quyIp });
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
        const noibo = resolveSourceVal("VM1-I02.02", ["NỘI BỘ"], []);
        const cheo = resolveSourceVal("VM1-I02.03", ["CHÉO"], []);
        const doitac = resolveSourceVal("VM1-I02.04", ["ĐỐI TÁC"], []);
        const khac = resolveSourceVal("VM1-I05.03", ["KHÁC"], []);
        const quyIp = resolveSourceVal("VM1-I05.04", ["QUỸ IP"], []);

        const rawSources = [
          { name: "Doanh thu nội bộ", value: noibo },
          { name: "Doanh thu chéo", value: cheo },
          { name: "Doanh thu đối tác", value: doitac },
        ];

        if (unitCode === "SCVN" || unitCode === "TCT") {
          if (khac > 0) rawSources.push({ name: "Doanh thu khác", value: khac });
          if (quyIp > 0) rawSources.push({ name: "Quỹ IP", value: quyIp });
        }

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
