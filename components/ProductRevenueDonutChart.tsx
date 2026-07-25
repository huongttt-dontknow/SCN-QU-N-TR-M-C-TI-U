"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { PRODUCTS_CATALOG } from "@/lib/products_catalog";

interface Props {
  periodKey?: string;
  periodType?: string;
}

interface ChartItem {
  name: string;
  value: number;
  sharePct: number;
}

export default function ProductRevenueDonutChart({ periodKey = "monthly_7", periodType = "weekly" }: Props) {
  const { theme } = useApp();
  const isLight = theme === "light";
  const [data, setData] = useState<ChartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/kpi?productCode=all&unitCode=SCVN&periodKey=${periodKey}&periodType=${periodType}&aggregate=false`)
      .then((res) => res.json())
      .then((resData) => {
        if (!isMounted) return;
        if (!Array.isArray(resData)) {
          setData([]);
          setLoading(false);
          return;
        }

        // 1. Lọc các chỉ tiêu doanh thu của sản phẩm (indicatorCode kết thúc bằng VM1-I02.01)
        const revRecords = resData.filter(
          (r: any) => r.indicatorCode && r.indicatorCode.endsWith("VM1-I02.01")
        );

        // 2. Map sang dạng { name, value }
        const mapped = revRecords.map((r: any) => {
          const product = PRODUCTS_CATALOG.find((p) => p.id === r.productCode);
          const name = product ? product.name : (r.productCode || "Không rõ");
          const val = r.actualValue ? Math.round(r.actualValue / 1e6) : (r.targetValue ? Math.round(r.targetValue / 1e6) : 0);
          return { name, value: val };
        }).filter((d) => d.value > 0);

        if (mapped.length === 0) {
          setData([]);
          setLoading(false);
          return;
        }

        // 3. Sắp xếp giảm dần theo doanh thu
        mapped.sort((a, b) => b.value - a.value);

        // 4. Lấy Top 10 và gộp các sản phẩm còn lại vào "Khác"
        let processedData: { name: string; value: number }[] = [];
        if (mapped.length <= 10) {
          processedData = mapped;
        } else {
          const top10 = mapped.slice(0, 10);
          const others = mapped.slice(10);
          const othersSum = others.reduce((acc, curr) => acc + curr.value, 0);
          processedData = [...top10];
          if (othersSum > 0) {
            processedData.push({ name: "Khác", value: othersSum });
          }
        }

        // 5. Tính tỷ trọng
        const total = processedData.reduce((acc, curr) => acc + curr.value, 0);
        const finalData = processedData.map((d) => ({
          ...d,
          sharePct: total > 0 ? Number(((d.value / total) * 100).toFixed(1)) : 0,
        }));

        setData(finalData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Lỗi khi tải tỷ trọng doanh thu sản phẩm:", err);
        if (isMounted) {
          setData([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [periodKey, periodType]);

  const COLORS = isLight
    ? ["#0284c7", "#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#22c55e", "#84cc16", "#eab308", "#f59e0b", "#ef4444", "#64748b"]
    : ["#38bdf8", "#7dd3fc", "#22d3ee", "#2dd4bf", "#34d399", "#4ade80", "#a3e635", "#facc15", "#fbbf24", "#f87171", "#94a3b8"];

  if (loading) {
    return (
      <div className="w-full h-[240px] flex items-center justify-center text-xs text-[var(--text-muted)] font-bold">
        Đang tải dữ liệu sản phẩm...
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="w-full h-[240px] flex items-center justify-center text-xs text-[var(--text-muted)] font-bold">
        Chưa có số liệu doanh thu sản phẩm kỳ này
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
            paddingAngle={2}
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
          />
          <Legend
            verticalAlign="bottom"
            height={55}
            iconSize={6}
            layout="horizontal"
            wrapperStyle={{ fontSize: 8, color: isLight ? "#0f172a" : "#94a3b8", fontWeight: 700, lineHeight: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
