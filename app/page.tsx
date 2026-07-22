"use client";

import React, { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import FiltersHeader from "@/components/FiltersHeader";
import ObjectiveRadarChart from "@/components/ObjectiveRadarChart";
import MonthlyRevenueProgressChart from "@/components/MonthlyRevenueProgressChart";
import RevenueDonutChart from "@/components/RevenueDonutChart";
import SourceRevenueDonutChart from "@/components/SourceRevenueDonutChart";
import { getMasterKpiRecord, MASTER_KPI_DATA } from "@/lib/kpiMasterData";
import { getRadarScores } from "@/lib/radarMasterData";
import { BarChart3 } from "lucide-react";
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer, 
  CartesianGrid,
  LabelList
} from "recharts";

export default function DashboardPage() {
  const { filters, theme } = useApp();
  // Helper tính periodKey dựa trên bộ lọc
  const getPeriodKey = () => {
    if (filters.periodType === "weekly") {
      return `weekly_${filters.month}_${filters.week}`;
    } else if (filters.periodType === "monthly") {
      return `monthly_${filters.month}`;
    } else if (filters.periodType === "quarterly") {
      return `quarterly_${filters.quarter}`;
    } else {
      return `yearly_2026`;
    }
  };

  const [bodComment, setBodComment] = useState("");
  const [savedComment, setSavedComment] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const pKey = getPeriodKey();
      const key = `bod_comment_${filters.unitCode}_${pKey}`;
      const saved = localStorage.getItem(key) || "";
      setSavedComment(saved);
      setBodComment(saved);
    }
    setIsSaved(false);
  }, [filters]);

  const handleSaveComment = () => {
    if (typeof window !== "undefined") {
      const pKey = getPeriodKey();
      const key = `bod_comment_${filters.unitCode}_${pKey}`;
      localStorage.setItem(key, bodComment);
      setSavedComment(bodComment);
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const getUnitName = (code: string) => {
    const found = [
      { code: "SCVN", name: "SCVN" },
      { code: "TCT", name: "TCT" },
      { code: "Wofloo", name: "Wolfoo" },
      { code: "Lego", name: "Lego" },
      { code: "AS", name: "AS" },
      { code: "DA01", name: "DA01" },
      { code: "Music", name: "Music" },
      { code: "NDTH", name: "NDTH" },
      { code: "CR", name: "Creative" },
      { code: "CN", name: "CNGP" },
      { code: "SCS", name: "Studio" },
    ].find(u => u.code === code);
    return found ? found.name : code;
  };

  const getSelectedUnitRevenuePeriods = () => {
    const u = MASTER_KPI_DATA[filters.unitCode] || MASTER_KPI_DATA["SCVN"];
    let kpiItem = u?.["VM1-I02.01"];
    if (filters.unitCode === "TCT") {
      kpiItem = u?.["TM1-I02.01"];
    } else if (!kpiItem) {
      kpiItem = u?.["2.1"] || Object.values(u || {}).find(v => v.title && (v.title.toUpperCase().includes("TỔNG DOANH THU") || (v.title.toUpperCase().includes("DOANH THU") && !v.title.toUpperCase().includes("NỘI BỘ"))));
    }
    return kpiItem?.periods || {};
  };

  const periodKey = getPeriodKey();

  // Dữ liệu biểu đồ so sánh hoàn thành doanh thu 9 đơn vị THỰC TẾ từ lib/kpiMasterData.ts
  const unitList = [
    { code: "Wofloo", label: "Wolfoo" },
    { code: "Lego", label: "Lego" },
    { code: "AS", label: "Animated" },
    { code: "DA01", label: "Dự án 01" },
    { code: "Music", label: "Music" },
    { code: "NDTH", label: "NDTH" },
    { code: "CR", label: "Creative" },
    { code: "CN", label: "CNGP" },
    { code: "SCS", label: "Studio" },
  ];

  const barComparisonData = unitList.map(u => {
    const rec = getMasterKpiRecord(u.code, "VM1-I02.01", periodKey);
    let target = rec?.target ? Math.round(rec.target / 1e6) : 0;
    let revenue = rec?.actual ? Math.round(rec.actual / 1e6) : 0;

    // Nếu là báo cáo tháng và chưa có số liệu thực tế tháng, cộng dồn từ các tuần của tháng đó
    if (filters.periodType === "monthly" && revenue === 0) {
      const uDict = MASTER_KPI_DATA[u.code] || {};
      const key = u.code === "NDTH" ? "2.1" : "VM1-I02.01";
      const kpiItem = uDict[key];
      if (kpiItem && kpiItem.periods) {
        let sumAct = 0;
        const m = Number(filters.month) || 7;
        for (let w = 1; w <= 5; w++) {
          const wKey = `weekly_${m}_${w}`;
          if (kpiItem.periods[wKey]) {
            sumAct += kpiItem.periods[wKey].actual ?? 0;
          }
        }
        if (sumAct > 0) {
          revenue = Math.round(sumAct / 1e6);
        }
      }
    }

    let completion = 0;
    if (rec?.pct !== undefined && rec.pct !== null && rec.pct < 10) {
      completion = Math.round(rec.pct * 100);
    } else if (target > 0) {
      completion = Math.round((revenue / target) * 100);
    }

    return {
      name: u.label,
      target,
      revenue,
      completion
    };
  });

  // Số liệu thực tế đơn vị cấp Toàn hệ thống/BU
  const scvnRevRec = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", periodKey);
  const scvnVolRec = getMasterKpiRecord(filters.unitCode, "VM2-I01.01", periodKey);
  const scvnDisciplineRec = getMasterKpiRecord(filters.unitCode, "TM7-I01.01", periodKey);
  const scvnRoiRec = getMasterKpiRecord(filters.unitCode, "VM1-I01.01", periodKey);

  const isParentUnit = filters.unitCode === "SCVN" || filters.unitCode === "TCT";

  // Calculations for Card 3 & 4 when isParentUnit is false:
  let monthlyCompletionPct = 0;
  let forecastPct = 0;
  let quarterCompletionPct = 0;
  let yearCompletionPct = 0;
  let currentQuarterNum = 1;

  if (!isParentUnit) {
    const currentM = Number(filters.month) || 7;
    const currentW = Number(filters.week) || 1;

    // Monthly Target & Accumulated Actual (for weekly report)
    const mTargetRec = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", `monthly_${currentM}`);
    const monthlyTarget = mTargetRec?.target || 0;

    let accumulatedActual = 0;
    const uPeriods = getSelectedUnitRevenuePeriods();
    for (let w = 1; w <= currentW; w++) {
      const wKey = `weekly_${currentM}_${w}`;
      accumulatedActual += uPeriods[wKey]?.actual || 0;
    }

    if (mTargetRec?.pct !== undefined && mTargetRec.pct !== null && mTargetRec.pct > 0) {
      monthlyCompletionPct = Math.round(mTargetRec.pct * 100);
    } else if (monthlyTarget > 0) {
      monthlyCompletionPct = Math.round((accumulatedActual / monthlyTarget) * 100);
    }

    // Forecast Calculation
    let weeksInMonth = 4;
    const refPeriods = MASTER_KPI_DATA["SCVN"]?.["VM1-I02.01"]?.periods || {};
    if (refPeriods[`weekly_${currentM}_5`]) {
      weeksInMonth = 5;
    }
    const forecastActual = currentW > 0 ? (accumulatedActual / currentW) * weeksInMonth : 0;
    forecastPct = monthlyTarget > 0 ? Math.round((forecastActual / monthlyTarget) * 100) : 0;

    // Quarterly completion calculation (for monthly report)
    currentQuarterNum = Math.ceil(currentM / 3);
    const qRec = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", `quarterly_${currentQuarterNum}`);
    const qTarget = qRec?.target || 0;
    const qActual = qRec?.actual || 0;

    let sumMonthAct = 0;
    const startM = (currentQuarterNum - 1) * 3 + 1;
    for (let mIdx = startM; mIdx < startM + 3; mIdx++) {
      let mAct = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", `monthly_${mIdx}`)?.actual || 0;
      if (mAct === 0) {
        for (let w = 1; w <= 5; w++) {
          mAct += uPeriods[`weekly_${mIdx}_${w}`]?.actual || 0;
        }
      }
      sumMonthAct += mAct;
    }
    const qActualReal = qActual > 0 ? qActual : sumMonthAct;
    quarterCompletionPct = qTarget > 0 ? Math.round((qActualReal / qTarget) * 100) : (qRec?.pct ? Math.round(qRec.pct * 100) : 0);

    // Yearly completion calculation
    const yRec = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", "yearly_2026");
    const yTarget = yRec?.target || 0;
    const yActual = yRec?.actual || 0;
    yearCompletionPct = yTarget > 0 ? Math.round((yActual / yTarget) * 100) : (yRec?.pct ? Math.round(yRec.pct * 100) : 0);
  }

  // Card 1: Doanh thu & Tiến độ hoàn thành SCVN
  const revTargetVal = scvnRevRec?.target ? (scvnRevRec.target >= 1e9 ? `${(scvnRevRec.target / 1e9).toFixed(2)} Tỷ VNĐ` : `${(scvnRevRec.target / 1e6).toFixed(0)} Triệu VNĐ`) : "7.98 Tỷ VNĐ";
  const revActualVal = scvnRevRec?.actual ? (scvnRevRec.actual >= 1e9 ? `${(scvnRevRec.actual / 1e9).toFixed(2)} Tỷ VNĐ` : `${(scvnRevRec.actual / 1e6).toFixed(0)} Triệu VNĐ`) : "3.76 Tỷ VNĐ";
  const revPct = scvnRevRec?.pct ? Math.round(scvnRevRec.pct * 100) : 47;

  // Card 2: Sản lượng Video hoàn thành SCVN
  const volTargetVal = scvnVolRec?.target ?? 112;
  const volActualVal = scvnVolRec?.actual ?? 108;
  const volPct = scvnVolRec?.pct ? Math.round(scvnVolRec.pct * 100) : (volTargetVal > 0 ? Math.round((volActualVal / volTargetVal) * 100) : 96);

  // Card 3: Đơn vị xuất sắc nhất
  const topUnit = [...barComparisonData].sort((a, b) => b.completion - a.completion)[0] || { name: "Dự án 01", completion: 88 };

  // Card 4: Kỷ luật (Tháng/Quý/Năm) vs Biến động doanh thu cao nhất (Tuần)
  const disciplinePct = scvnDisciplineRec?.actual ? `${scvnDisciplineRec.actual}%` : (scvnDisciplineRec?.pct ? `${(scvnDisciplineRec.pct * 100).toFixed(1)}%` : "99.85%");

  // Tính toán biến động doanh thu theo tuần cho 9 đơn vị
  const getPrevWeeklyPeriodKey = (mStr: string, wStr: string) => {
    const m = Number(mStr) || 7;
    const w = Number(wStr) || 1;
    if (w > 1) {
      return `weekly_${m}_${w - 1}`;
    }
    if (m > 1) {
      return `weekly_${m - 1}_4`;
    }
    return `weekly_12_5`;
  };

  const isWeeklyReport = filters.periodType === "weekly";
  const prevWeeklyKey = getPrevWeeklyPeriodKey(filters.month, filters.week);

  const unitPrevWeeklyRec = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", prevWeeklyKey);
  const unitCurrWeeklyAct = scvnRevRec?.actual || 0;
  const unitPrevWeeklyAct = unitPrevWeeklyRec?.actual || 0;
  const unitWeeklyDiff = unitCurrWeeklyAct - unitPrevWeeklyAct;
  const unitWeeklyPct = unitPrevWeeklyAct > 0 ? Math.round((unitWeeklyDiff / unitPrevWeeklyAct) * 100) : (unitCurrWeeklyAct > 0 ? 100 : 0);

  // Helper function to build weekly trend data for charts
  const getWeeklyTrendData = () => {
    const m = Number(filters.month) || 7;
    const data = [];
    const uPeriods = getSelectedUnitRevenuePeriods();
    for (let w = 1; w <= 5; w++) {
      const wKey = `weekly_${m}_${w}`;
      
      // Check if this week has any data for the selected unit
      let hasWeek = false;
      const u = MASTER_KPI_DATA[filters.unitCode] || MASTER_KPI_DATA["SCVN"];
      for (const k in u) {
        if (u[k].periods?.[wKey]) {
          hasWeek = true;
          break;
        }
      }
      if (!hasWeek) continue;

      const revAct = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", wKey)?.actual ?? 0;
      const revTgt = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", wKey)?.target ?? 0;
      
      // Get traffic actuals
      let trafAct = 0;
      const uDict = MASTER_KPI_DATA[filters.unitCode] || {};
      for (const k in uDict) {
        const v = uDict[k];
        const t = (v.title || "").toUpperCase();
        const uStr = (v.unit || "").toUpperCase();
        const kStr = k.toUpperCase();
        if (
          (t.includes("VIEW") || t.includes("TRAFFIC") || uStr.includes("VIEWS") || kStr.includes("VIEW") || kStr.includes("3.1") || kStr.includes("TM3-I01.02") || kStr.includes("VM3-I01.02")) &&
          !uStr.includes("CTR") &&
          !uStr.includes("TB/1")
        ) {
          const pData = v.periods?.[wKey];
          if (pData && pData.actual !== undefined) {
            if (pData.actual > trafAct) {
              trafAct = pData.actual;
            }
          }
        }
      }
      
      // Get traffic target
      let trafTgt = 0;
      for (const k in uDict) {
        const v = uDict[k];
        const t = (v.title || "").toUpperCase();
        const uStr = (v.unit || "").toUpperCase();
        const kStr = k.toUpperCase();
        if (
          (t.includes("VIEW") || t.includes("TRAFFIC") || uStr.includes("VIEWS") || kStr.includes("VIEW") || kStr.includes("3.1") || kStr.includes("TM3-I01.02") || kStr.includes("VM3-I01.02")) &&
          !uStr.includes("CTR") &&
          !uStr.includes("TB/1")
        ) {
          const pData = v.periods?.[wKey];
          if (pData && pData.target !== undefined) {
            if (pData.target > trafTgt) {
              trafTgt = pData.target;
            }
          }
        }
      }

      data.push({
        name: `Tuần ${w}`,
        revenue: Math.round(revAct / 1e6), // in Millions
        revenueTarget: Math.round(revTgt / 1e6),
        traffic: Number((trafAct / 1e6).toFixed(2)), // in Millions views
        trafficTarget: Number((trafTgt / 1e6).toFixed(2)),
      });
    }
    return data;
  };

  const weeklyTrendData = getWeeklyTrendData();

  // Helper function to build monthly trend data for child units (from Month 1 to Month 12)
  const getMonthlyTrendData = () => {
    const data = [];
    for (let m = 1; m <= 12; m++) {
      const mKey = `monthly_${m}`;
      
      // Check if this month has any data for the selected unit
      let hasMonth = false;
      const u = MASTER_KPI_DATA[filters.unitCode] || MASTER_KPI_DATA["SCVN"];
      for (const k in u) {
        if (u[k].periods?.[mKey]) {
          hasMonth = true;
          break;
        }
      }
      if (!hasMonth) continue;

      const revAct = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", mKey)?.actual ?? 0;
      const revTgt = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", mKey)?.target ?? 0;
      
      // Get traffic actuals
      let trafAct = 0;
      const uDict = MASTER_KPI_DATA[filters.unitCode] || {};
      for (const k in uDict) {
        const v = uDict[k];
        const t = (v.title || "").toUpperCase();
        const uStr = (v.unit || "").toUpperCase();
        const kStr = k.toUpperCase();
        if (
          (t.includes("VIEW") || t.includes("TRAFFIC") || uStr.includes("VIEWS") || kStr.includes("VIEW") || kStr.includes("3.1") || kStr.includes("TM3-I01.02") || kStr.includes("VM3-I01.02")) &&
          !uStr.includes("CTR") &&
          !uStr.includes("TB/1")
        ) {
          const pData = v.periods?.[mKey];
          if (pData && pData.actual !== undefined) {
            if (pData.actual > trafAct) {
              trafAct = pData.actual;
            }
          }
        }
      }

      data.push({
        name: `Th ${m}`,
        revenue: Math.round(revAct / 1e6), // in Millions
        revenueTarget: Math.round(revTgt / 1e6),
        traffic: Number((trafAct / 1e6).toFixed(2)), // in Millions views
      });
    }
    return data;
  };

  const monthlyTrendData = getMonthlyTrendData();

  const weeklyChanges = unitList.map(u => {
    const currRec = getMasterKpiRecord(u.code, "VM1-I02.01", periodKey);
    const prevRec = getMasterKpiRecord(u.code, "VM1-I02.01", prevWeeklyKey);

    const currAct = currRec?.actual ?? 0;
    const prevAct = prevRec?.actual ?? 0;
    const diff = currAct - prevAct;
    let pct = 0;
    if (prevAct > 0) {
      pct = Math.round(((currAct - prevAct) / prevAct) * 100);
    } else if (currAct > 0) {
      pct = 100;
    }
    return { name: u.label, currAct, prevAct, diff, pct };
  });

  const incUnits = [...weeklyChanges].filter(x => x.diff > 0).sort((a, b) => b.pct - a.pct);
  const decUnits = [...weeklyChanges].filter(x => x.diff < 0).sort((a, b) => a.pct - b.pct);

  let weeklyTopRows: { label: string; text: string; isUp: boolean }[] = [];
  if (incUnits.length > 0 && decUnits.length > 0) {
    weeklyTopRows = [
      { label: "Tăng cao nhất", text: `${incUnits[0].name} (▲ +${incUnits[0].pct}%)`, isUp: true },
      { label: "Giảm cao nhất", text: `${decUnits[0].name} (▼ ${decUnits[0].pct}%)`, isUp: false },
    ];
  } else if (decUnits.length > 0) {
    weeklyTopRows = [
      { label: "Giảm mạnh nhất", text: `${decUnits[0].name} (▼ ${decUnits[0].pct}%)`, isUp: false },
      { label: "Giảm thứ 2", text: decUnits[1] ? `${decUnits[1].name} (▼ ${decUnits[1].pct}%)` : "-", isUp: false },
    ];
  } else if (incUnits.length > 0) {
    weeklyTopRows = [
      { label: "Tăng mạnh nhất", text: `${incUnits[0].name} (▲ +${incUnits[0].pct}%)`, isUp: true },
      { label: "Tăng thứ 2", text: incUnits[1] ? `${incUnits[1].name} (▲ +${incUnits[1].pct}%)` : "-", isUp: true },
    ];
  } else {
    weeklyTopRows = [
      { label: "Tăng mạnh nhất", text: "Không biến động", isUp: true },
      { label: "Giảm mạnh nhất", text: "Không biến động", isUp: false },
    ];
  }

  // Dữ liệu M3 Traffic (Số lượt view youtube) cho 9 đơn vị theo kỳ
  const trafficData = unitList.map(u => {
    const uDict = MASTER_KPI_DATA[u.code] || {};
    const candidates: { item: any; rec: any }[] = [];

    for (const k in uDict) {
      const v = uDict[k];
      const t = (v.title || "").toUpperCase();
      const uStr = (v.unit || "").toUpperCase();
      const kStr = k.toUpperCase();

      if (
        (t.includes("VIEW YOUTUBE") || t.includes("SỐ LƯỢT VIEW") || t.includes("TRAFFIC") || uStr.includes("VIEWS") || kStr.includes("VIEW") || kStr.includes("3.1") || kStr.includes("TM3-I01.02") || kStr.includes("VM3-I01.02")) &&
        !uStr.includes("CTR") &&
        !uStr.includes("TB/1")
      ) {
        const pData = v.periods?.[periodKey];
        if (pData && (pData.actual !== undefined || pData.target !== undefined)) {
          candidates.push({ item: v, rec: pData });
        }
      }
    }

    let rec: any = null;
    if (candidates.length > 0) {
      candidates.sort((a, b) => Math.max(b.rec.actual || 0, b.rec.target || 0) - Math.max(a.rec.actual || 0, a.rec.target || 0));
      rec = candidates[0].rec;
    } else {
      for (const k in uDict) {
        const v = uDict[k];
        const t = (v.title || "").toUpperCase();
        const uStr = (v.unit || "").toUpperCase();
        if (t.includes("SỐ LƯỢT VIEW YOUTUBE") || t.includes("VIEW YOUTUBE") || t.includes("TRAFFIC") || uStr.includes("VIEWS")) {
          rec = v.periods?.[periodKey];
          if (rec) break;
        }
      }
    }

    const tgt = rec?.target ?? 0;
    const act = rec?.actual ?? 0;

    const tgtM = tgt >= 1000 ? Number((tgt / 1e6).toFixed(1)) : tgt;
    const actM = act >= 1000 ? Number((act / 1e6).toFixed(1)) : act;
    const pct = rec?.pct ? Math.round(rec.pct * 100) : (tgtM > 0 ? Math.round((actM / tgtM) * 100) : 0);

    let color = "bg-emerald-500 font-extrabold";
    if (tgtM === 0) color = "bg-slate-600 font-medium";
    else if (pct < 75) color = "bg-rose-500 font-extrabold";
    else if (pct < 100) color = "bg-lime-500 font-extrabold";

    return {
      name: u.label,
      actual: actM,
      target: tgtM,
      pct,
      color
    };
  });

  // 1. Hàm tính khóa thời gian của kỳ trước
  const getPrevPeriodKey = (type: string, mStr: string, wStr: string, qStr: string, yStr: string) => {
    const m = Number(mStr) || 7;
    const w = Number(wStr) || 1;
    const y = Number(yStr) || 2026;
    if (type === "weekly") {
      if (w > 1) {
        return `weekly_${m}_${w - 1}`;
      }
      if (m > 1) {
        return `weekly_${m - 1}_4`;
      }
      return `weekly_12_5`;
    } else if (type === "monthly") {
      if (m > 1) {
        return `monthly_${m - 1}`;
      }
      return `monthly_12`;
    } else if (type === "quarterly") {
      if (qStr === "Q4") return "quarterly_Q3";
      if (qStr === "Q3") return "quarterly_Q2";
      if (qStr === "Q2") return "quarterly_Q1";
      return "quarterly_Q4";
    } else {
      return "yearly";
    }
  };

  const prevPeriodKey = getPrevPeriodKey(filters.periodType, filters.month, filters.week, filters.quarter, filters.year);

  // 2. Tính BXH Tăng Trưởng Doanh Thu
  const formatRevenueVal = (val: number) => {
    if (val >= 1e9) {
      return `${(val / 1e9).toFixed(1)} Tỷ`;
    }
    return `${(val / 1e6).toFixed(0)} Triệu`;
  };

  const bxhRevenueData = unitList.map(u => {
    const currRec = getMasterKpiRecord(u.code, "VM1-I02.01", periodKey);
    const prevRec = getMasterKpiRecord(u.code, "VM1-I02.01", prevPeriodKey);

    const currAct = currRec?.actual ?? 0;
    const prevAct = prevRec?.actual ?? 0;

    let change = "-";
    let pctRaw = -999;
    let up = true;

    if (prevAct > 0) {
      const pct = Number(((currAct - prevAct) / prevAct * 100).toFixed(1));
      change = `${pct >= 0 ? "+" : ""}${pct}%`;
      pctRaw = pct;
      up = pct >= 0;
    } else if (currAct > 0) {
      change = "-";
      pctRaw = 0;
      up = true;
    }

    return {
      name: u.label,
      val: formatRevenueVal(currAct),
      change,
      pctRaw,
      up
    };
  }).sort((a, b) => b.pctRaw - a.pctRaw);

  const bxhRevenueSorted = bxhRevenueData.map((x, idx) => ({
    ...x,
    rank: `#${idx + 1}`,
    highlight: idx === 0,
    warning: x.pctRaw < 0
  }));

  // 3. Tính BXH Hoàn Thành Sản Xuất (M2)
  const getUnitProductionData = (uCode: string, pKey: string) => {
    const uDict = MASTER_KPI_DATA[uCode] || {};
    const candidates: { item: any; rec: any }[] = [];

    // Priority keys
    const prioKeys = ["VM2-I01.01", "VM2-I01.04", "VM2-I01", "MM1-I03.01", "NM2-I01"];
    for (const pk of prioKeys) {
      if (uDict[pk]) {
        const pData = uDict[pk].periods?.[pKey];
        if (pData && (pData.actual !== undefined || pData.target !== undefined)) {
          candidates.push({ item: uDict[pk], rec: pData });
        }
      }
    }

    if (candidates.length === 0) {
      for (const k in uDict) {
        const v = uDict[k];
        const t = (v.title || "").toUpperCase();
        const uStr = (v.unit || "").toUpperCase();
        const kStr = k.toUpperCase();

        if (
          (t.includes("SẢN XUẤT") || t.includes("SẢN LƯỢNG") || kStr.includes("SẢN XUẤT") || t.includes("HOÀN THÀNH") || kStr.includes("MM1-I03.01") || kStr.includes("NM2-I01")) &&
          (uStr.includes("VIDEO") || uStr.includes("TẬP") || uStr.includes("SẢN PHẨM") || uStr.includes("GAME") || kStr.includes("VIDEO") || kStr.includes("SẢN PHẨM"))
        ) {
          if (uStr.includes("CTR") || uStr.includes("APV") || uStr.includes("CHI PHÍ") || t.includes("HIỆU SUẤT")) {
            continue;
          }
          const pData = v.periods?.[pKey];
          if (pData && (pData.actual !== undefined || pData.target !== undefined)) {
            candidates.push({ item: v, rec: pData });
          }
        }
      }
    }

    if (candidates.length === 0) return null;
    candidates.sort((a, b) => Math.max(b.rec.actual || 0, b.rec.target || 0) - Math.max(a.rec.actual || 0, a.rec.target || 0));
    return candidates[0];
  };

  const bxhProductionData = unitList.map(u => {
    const res = getUnitProductionData(u.code, periodKey);
    if (!res) {
      return { name: u.label, val: "0 Video", pctRaw: 0, pctStr: "0%" };
    }
    const { item, rec } = res;
    const tgt = rec.target ?? 0;
    const act = rec.actual ?? 0;
    const pct = rec.pct ? Math.round(rec.pct * 100) : (tgt > 0 ? Math.round((act / tgt) * 100) : 0);

    const unitSuffix = (item.unit || "").toLowerCase().includes("game") ? "Game" : ((item.unit || "").toLowerCase().includes("sản phẩm") ? "Sản phẩm" : "Video");

    return {
      name: u.label,
      val: `${act} ${unitSuffix}`,
      pctRaw: pct,
      pctStr: `${pct}%`
    };
  }).sort((a, b) => b.pctRaw - a.pctRaw);

  const bxhProductionSorted = bxhProductionData.map((x, idx) => ({
    ...x,
    rank: `#${idx + 1}`,
    highlight: idx === 0,
    warning: idx === bxhProductionData.length - 1
  }));

  // 4. Tính BXH Tăng Trưởng Traffic (M3)
  const getUnitTrafficActual = (uCode: string, pKey: string) => {
    const uDict = MASTER_KPI_DATA[uCode] || {};
    const candidates: { item: any; rec: any }[] = [];

    for (const k in uDict) {
      const v = uDict[k];
      const t = (v.title || "").toUpperCase();
      const uStr = (v.unit || "").toUpperCase();
      const kStr = k.toUpperCase();

      if (
        (t.includes("VIEW YOUTUBE") || t.includes("SỐ LƯỢT VIEW") || t.includes("TRAFFIC") || uStr.includes("VIEWS") || kStr.includes("VIEW") || kStr.includes("3.1") || kStr.includes("TM3-I01.02") || kStr.includes("VM3-I01.02")) &&
        !uStr.includes("CTR") &&
        !uStr.includes("TB/1")
      ) {
        const pData = v.periods?.[pKey];
        if (pData && (pData.actual !== undefined || pData.target !== undefined)) {
          candidates.push({ item: v, rec: pData });
        }
      }
    }

    if (candidates.length === 0) return 0;
    candidates.sort((a, b) => Math.max(b.rec.actual || 0, b.rec.target || 0) - Math.max(a.rec.actual || 0, a.rec.target || 0));
    return candidates[0].rec.actual ?? 0;
  };

  const formatTrafficVal = (val: number) => {
    if (val >= 1e6) {
      return `${(val / 1e6).toFixed(1)}M`;
    }
    if (val >= 1e3) {
      return `${(val / 1e3).toFixed(0)}K`;
    }
    return `${val}`;
  };

  const bxhTrafficData = unitList.map(u => {
    const currAct = getUnitTrafficActual(u.code, periodKey);
    const prevAct = getUnitTrafficActual(u.code, prevPeriodKey);
    const diff = currAct - prevAct;

    let change = "-";
    let pctRaw = -999;
    let up = true;

    if (prevAct > 0) {
      const pct = Number((diff / prevAct * 100).toFixed(1));
      change = `${pct >= 0 ? "+" : ""}${pct}%`;
      pctRaw = pct;
      up = pct >= 0;
    } else if (currAct > 0) {
      change = "-";
      pctRaw = 0;
      up = true;
    }

    return {
      name: u.label,
      val: formatTrafficVal(currAct),
      change,
      pctRaw,
      up
    };
  }).sort((a, b) => b.pctRaw - a.pctRaw);

  const bxhTrafficSorted = bxhTrafficData.map((x, idx) => ({
    ...x,
    rank: `#${idx + 1}`,
    highlight: idx === 0,
    warning: x.pctRaw < 0
  }));

  // Card 5: ROI
  const roiVal = scvnRoiRec?.actual ? `${(scvnRoiRec.actual * 100).toFixed(1)}%` : (scvnRoiRec?.pct ? `${(scvnRoiRec.pct * 100).toFixed(1)}%` : "16.5%");

  // Tính toán so sánh Doanh thu đơn vị kỳ liền trước & cùng kỳ tháng trước (cho Card 1) - Tăng trưởng của doanh thu thực tế
  const scvnRevRecPrev = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", prevPeriodKey);
  
  let currActVal = scvnRevRec?.actual || 0;
  if (filters.periodType === "monthly" && currActVal === 0) {
    const periods = getSelectedUnitRevenuePeriods();
    let sumAct = 0;
    const m = Number(filters.month) || 7;
    for (let w = 1; w <= 5; w++) {
      const wKey = `weekly_${m}_${w}`;
      if (periods[wKey]) {
        sumAct += periods[wKey].actual ?? 0;
      }
    }
    if (sumAct > 0) {
      currActVal = sumAct;
    }
  }

  let prevActVal = scvnRevRecPrev?.actual || 0;
  if (filters.periodType === "monthly" && prevActVal === 0 && prevPeriodKey) {
    const periods = getSelectedUnitRevenuePeriods();
    let sumAct = 0;
    const prevM = Number(filters.month) > 1 ? Number(filters.month) - 1 : 12;
    for (let w = 1; w <= 5; w++) {
      const wKey = `weekly_${prevM}_${w}`;
      if (periods[wKey]) {
        sumAct += periods[wKey].actual ?? 0;
      }
    }
    if (sumAct > 0) {
      prevActVal = sumAct;
    }
  }

  const diffPrev = prevActVal > 0 ? Number(((currActVal - prevActVal) / prevActVal * 100).toFixed(1)) : null;

  const getSamePeriodLastMonthKey = (type: string, mStr: string, wStr: string, qStr: string, yStr: string) => {
    const m = Number(mStr) || 7;
    const w = Number(wStr) || 1;
    if (type === "weekly") {
      if (m > 1) {
        const prevMonth = m - 1;
        const targetKey = `weekly_${prevMonth}_${w}`;
        const periods = getSelectedUnitRevenuePeriods();
        const hasWeekRecord = periods[targetKey];
        if (hasWeekRecord) {
          return targetKey;
        }
      }
      return null;
    }
    return null;
  };

  const samePeriodLastMonthKey = getSamePeriodLastMonthKey(filters.periodType, filters.month, filters.week, filters.quarter, filters.year);
  let diffLastMonth: number | null = null;
  if (samePeriodLastMonthKey) {
    const scvnRevRecSameLastMonth = getMasterKpiRecord(filters.unitCode, "VM1-I02.01", samePeriodLastMonthKey);
    if (scvnRevRecSameLastMonth) {
      const sameLastMonthActVal = scvnRevRecSameLastMonth.actual || 0;
      if (sameLastMonthActVal > 0) {
        diffLastMonth = Number(((currActVal - sameLastMonthActVal) / sameLastMonthActVal * 100).toFixed(1));
      }
    }
  }

  // Dữ liệu Bánh xe mục tiêu 7 mặt M1 -> M7 từ Excel
  const radarData = getRadarScores(
    filters.unitCode,
    filters.periodType,
    filters.month,
    filters.quarter,
    filters.year
  );

  return (
    <div className="flex flex-col gap-6 text-white text-sm">
      {/* 1. FREEZE FILTERS PANEL */}
      <FiltersHeader />

      {/* 2. KHU VỰC HÀNG TRÊN (TOP SECTION - BỐ CỤC 6-6 CÂN ĐỐI) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* KHỐI BÊN TRÁI: TIẾN ĐỘ THÁNG (KHI LÀ TUẦN) HOẶC BÁNH XE MỤC TIÊU (KHI LÀ THÁNG/QUÝ/NĂM) */}
        {isWeeklyReport ? (
          isParentUnit ? (
            <div className="lg:col-span-6 glass-panel p-5 flex flex-col justify-between min-h-[380px]">
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-black text-white tracking-wider uppercase border-b border-white/10 pb-2.5 flex items-center gap-2">
                  📈 TIẾN ĐỘ HOÀN THÀNH DOANH THU THÁNG {filters.month}/2026 (%)
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-1.5 font-semibold">
                  Lũy kế doanh thu thực tế các tuần chia cho mục tiêu doanh thu cả tháng
                </p>
                <MonthlyRevenueProgressChart />
              </div>
              <div className="text-[10px] text-[var(--text-muted)] pt-3 border-t border-white/5 font-semibold mt-3">
                Biểu đồ thể hiện mức độ hoàn thành tiến độ doanh thu của SCVN và các đơn vị thành viên
              </div>
            </div>
          ) : (
            <div className="lg:col-span-6 glass-panel p-5 flex flex-col justify-between min-h-[380px]">
              <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-black text-white tracking-wider uppercase border-b border-white/10 pb-2.5 flex items-center gap-2 mb-4">
                  📊 XU HƯỚNG TUẦN ĐƠN VỊ: {getUnitName(filters.unitCode).toUpperCase()} (THÁNG {filters.month})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                  {/* Revenue trend chart */}
                  <div className="h-[210px] flex flex-col justify-between">
                    <span className="text-xs font-black text-slate-300 block text-center">Doanh thu từng tuần (Triệu VNĐ)</span>
                    <ResponsiveContainer width="100%" height="88%">
                      <ComposedChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: "#0f172a", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} 
                          labelStyle={{ fontWeight: "bold", color: "#fff" }}
                        />
                        <Bar dataKey="revenue" name="Thực tế" fill="#8b5cf6" radius={[3, 3, 0, 0]} barSize={16} />
                        <Line type="monotone" dataKey="revenue" name="Xu hướng" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: "#f59e0b" }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Traffic trend chart */}
                  <div className="h-[210px] flex flex-col justify-between">
                    <span className="text-xs font-black text-slate-300 block text-center">Traffic từng tuần (M views)</span>
                    <ResponsiveContainer width="100%" height="88%">
                      <ComposedChart data={weeklyTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: "#0f172a", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} 
                          labelStyle={{ fontWeight: "bold", color: "#fff" }}
                        />
                        <Bar dataKey="traffic" name="Thực tế" fill="#06b6d4" radius={[3, 3, 0, 0]} barSize={16} />
                        <Line type="monotone" dataKey="traffic" name="Xu hướng" stroke="#ec4899" strokeWidth={2.5} dot={{ r: 3, fill: "#ec4899" }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] pt-3 border-t border-white/5 font-semibold mt-3">
                Biểu đồ xu hướng biểu diễn sự thay đổi kết quả tuần nội bộ đơn vị {getUnitName(filters.unitCode)}
              </div>
            </div>
          )
        ) : (
          isParentUnit ? (
            <div className="lg:col-span-6 glass-panel p-5 flex flex-col md:flex-row gap-5 min-h-[380px]">
              {/* Radar Chart */}
              <div className="flex-1 flex flex-col justify-between">
                <h3 className="text-sm font-black text-white tracking-wider uppercase border-b border-white/10 pb-2.5 flex items-center gap-2">
                  🎯 BÁNH XE MỤC TIÊU SỨC KHỎE ({radarData.unitName})
                </h3>
                <ObjectiveRadarChart />
                <div className="flex justify-center gap-4 text-xs font-bold mt-2">
                  <span className="flex items-center gap-1.5 text-emerald-500">
                    <span className="w-2.5 h-1 bg-emerald-500 inline-block rounded"></span> {radarData.unitName} ({radarData.labelCurr})
                  </span>
                  <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                    <span className="w-2.5 h-1 bg-slate-500 inline-block border-t border-dashed rounded"></span> Kỳ trước ({radarData.labelPrev})
                  </span>
                </div>
              </div>

              {/* Chi tiết biến động */}
              <div className="w-full md:w-72 shrink-0 flex flex-col justify-between border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-5">
                <h4 className="text-xs font-black text-[var(--accent-purple)] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                  📈 CHI TIẾT BIẾN ĐỘNG (7 MẶT MT)
                </h4>
                <div className="space-y-2.5 text-xs flex-1">
                  <div className="flex justify-between text-xs text-[var(--text-muted)] font-black border-b border-white/10 pb-1.5 uppercase tracking-wider">
                    <span>MỤC TIÊU</span>
                    <div className="flex gap-4">
                      <span>HIỆN TẠI</span>
                      <span>BIẾN ĐỘNG</span>
                    </div>
                  </div>
                  {radarData.points.map(item => {
                    const isUp = item.change >= 0;
                    return (
                      <div key={item.code} className="flex justify-between items-center py-1.5 border-b border-white/5 text-xs gap-2">
                        <span className="text-[var(--text-muted)] font-bold whitespace-nowrap">{item.subject}</span>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="font-extrabold text-white min-w-[32px] text-right text-xs">{item["Kỳ này"]}%</span>
                          <span className={`font-black min-w-[42px] text-right text-xs ${isUp ? "text-emerald-500" : "text-rose-500"}`}>
                            {isUp ? "▲" : "▼"} {isUp ? `+${item.change}%` : `${item.change}%`}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="lg:col-span-6 glass-panel p-5 flex flex-col justify-between min-h-[380px]">
              <div className="flex-1 flex flex-col">
                <h3 className="text-sm font-black text-white tracking-wider uppercase border-b border-white/10 pb-2.5 flex items-center gap-2 mb-4">
                  📊 XU HƯỚNG THÁNG ĐƠN VỊ: {getUnitName(filters.unitCode).toUpperCase()} (NĂM 2026)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
                  {/* Monthly Revenue Trend Chart */}
                  <div className="h-[210px] flex flex-col justify-between">
                    <span className="text-xs font-black text-slate-300 block text-center">Doanh thu qua các tháng (Triệu VNĐ)</span>
                    <ResponsiveContainer width="100%" height="88%">
                      <ComposedChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: "#0f172a", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} 
                          labelStyle={{ fontWeight: "bold", color: "#fff" }}
                        />
                        <Bar dataKey="revenue" name="Thực tế" fill="#8b5cf6" radius={[3, 3, 0, 0]} barSize={16} />
                        <Line type="monotone" dataKey="revenue" name="Xu hướng" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: "#f59e0b" }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Monthly Traffic Trend Chart */}
                  <div className="h-[210px] flex flex-col justify-between">
                    <span className="text-xs font-black text-slate-300 block text-center">Traffic qua các tháng (M views)</span>
                    <ResponsiveContainer width="100%" height="88%">
                      <ComposedChart data={monthlyTrendData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                        <XAxis dataKey="name" stroke="#64748b" fontSize={9} tickLine={false} />
                        <YAxis stroke="#64748b" fontSize={9} tickLine={false} />
                        <RechartsTooltip 
                          contentStyle={{ backgroundColor: "#0f172a", borderColor: "rgba(255,255,255,0.1)", borderRadius: "8px" }} 
                          labelStyle={{ fontWeight: "bold", color: "#fff" }}
                        />
                        <Bar dataKey="traffic" name="Thực tế" fill="#06b6d4" radius={[3, 3, 0, 0]} barSize={16} />
                        <Line type="monotone" dataKey="traffic" name="Xu hướng" stroke="#ec4899" strokeWidth={2.5} dot={{ r: 3, fill: "#ec4899" }} />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-[var(--text-muted)] pt-3 border-t border-white/5 font-semibold mt-3">
                Biểu đồ xu hướng biểu diễn kết quả tháng nội bộ đơn vị {getUnitName(filters.unitCode)}
              </div>
            </div>
          )
        )}

        {/* CỤM KPI CARDS (COL-SPAN-6 CỐ ĐỊNH CÂN ĐỐI) */}
        <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1: Doanh thu & Tiến độ hoàn thành */}
          <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-purple)] min-h-[175px]">
            <div>
              <span className="text-xs font-black text-[var(--accent-purple)] uppercase tracking-wider block">
                DOANH THU & TIẾN ĐỘ HOÀN THÀNH ({getUnitName(filters.unitCode)})
              </span>
              <div className="flex items-baseline justify-between mt-1.5">
                <span className="text-4xl font-black text-white">{revPct}%</span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-sm font-extrabold text-emerald-500">
                {revActualVal} | Thực tế đạt được
              </p>
              <span className="text-xs text-[var(--text-muted)] font-semibold">(KH: {revTargetVal})</span>
            </div>

            <div className="mt-2.5 pt-2 border-t border-white/5 space-y-1 text-[10px] font-bold text-slate-400">
              {diffPrev !== null && (
                <div className="flex justify-between items-center">
                  <span>Kỳ liền trước:</span>
                  <span className={diffPrev >= 0 ? "text-emerald-400" : "text-rose-400"}>
                    {diffPrev >= 0 ? `▲ +${diffPrev}%` : `▼ ${diffPrev}%`}
                  </span>
                </div>
              )}
              {diffLastMonth !== null && (
                <div className="flex justify-between items-center">
                  <span>Cùng kỳ tháng trước:</span>
                  <span className={diffLastMonth >= 0 ? "text-emerald-400" : "text-rose-400"}>
                    {diffLastMonth >= 0 ? `▲ +${diffLastMonth}%` : `▼ ${diffLastMonth}%`}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Card 2: Sản lượng Video hoàn thành */}
          <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-emerald-500 min-h-[175px]">
            <div>
              <span className="text-xs font-black text-emerald-500 uppercase tracking-wider block">
                SẢN LƯỢNG SẢN XUẤT ({getUnitName(filters.unitCode)})
              </span>
              <div className="flex items-baseline justify-between mt-1.5">
                <span className="text-4xl font-black text-emerald-500">{volActualVal} {filters.unitCode === "CN" ? "Game" : (filters.unitCode === "SCS" ? "Sản phẩm" : "Video")}</span>
              </div>
            </div>
            <div className="my-1">
              <p className="text-sm font-extrabold text-emerald-500">
                Đạt {volPct}% Kế hoạch
              </p>
              <span className="text-xs text-[var(--text-muted)] font-semibold">(KH: {volTargetVal} {filters.unitCode === "CN" ? "Game" : (filters.unitCode === "SCS" ? "Sản phẩm" : "Video")})</span>
            </div>
          </div>

          {/* Card 3: Đơn vị HT Doanh thu cao nhất (Parent) hoặc Tiến độ doanh thu (Child) */}
          {isParentUnit ? (
            <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-cyan)] min-h-[175px]">
              <div>
                <span className="text-xs font-black text-[var(--accent-cyan)] uppercase tracking-wider block">
                  ĐƠN VỊ HT DOANH THU CAO NHẤT
                </span>
                <div className="mt-1.5">
                  <span className="text-3xl font-black text-white truncate block">
                    {topUnit.name} - {topUnit.completion}%
                  </span>
                </div>
              </div>
              <div className="text-xs text-[var(--text-muted)] border-t border-white/5 pt-2 font-bold">
                Đơn vị trực thuộc xuất sắc nhất kỳ
              </div>
            </div>
          ) : (
            isWeeklyReport ? (
              <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-cyan)] min-h-[175px]">
                <div>
                  <span className="text-xs font-black text-[var(--accent-cyan)] uppercase tracking-wider block">
                    TIẾN ĐỘ DOANH THU THÁNG
                  </span>
                  <div className="mt-1.5">
                    <span className="text-4xl font-black text-white block">
                      {monthlyCompletionPct}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-300 border-t border-white/5 pt-2 font-bold">
                  <span className={forecastPct >= 100 ? "text-emerald-400" : "text-rose-400"}>
                    Dự báo cả tháng: {forecastPct}%
                  </span>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-cyan)] min-h-[175px]">
                <div>
                  <span className="text-xs font-black text-[var(--accent-cyan)] uppercase tracking-wider block">
                    {filters.periodType === "monthly" ? "TIẾN ĐỘ DOANH THU QUÝ" : "TIẾN ĐỘ DOANH THU NĂM"}
                  </span>
                  <div className="mt-1.5">
                    <span className="text-4xl font-black text-white block">
                      {filters.periodType === "monthly" ? quarterCompletionPct : yearCompletionPct}%
                    </span>
                  </div>
                </div>
                <div className="text-xs text-[var(--text-muted)] border-t border-white/5 pt-2 font-bold">
                  {filters.periodType === "monthly" ? `Tiến độ hoàn thành doanh thu Quý ${currentQuarterNum}` : "Tiến độ hoàn thành doanh thu Năm 2026"}
                </div>
              </div>
            )
          )}

          {/* Card 4: Tuần vs Tháng/Quý/Năm */}
          {isWeeklyReport ? (
            isParentUnit ? (
              <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-pink)] min-h-[175px]">
                <div>
                  <span className="text-xs font-black text-[var(--accent-pink)] uppercase tracking-wider block">
                    BIẾN ĐỘNG DOANH THU SO VỚI TUẦN TRƯỚC
                  </span>
                  <div className="mt-2.5 space-y-2">
                    {weeklyTopRows.map((r, i) => (
                      <div key={i} className="flex justify-between items-center text-xs border-b border-white/5 pb-1.5">
                        <span className="text-[var(--text-muted)] font-bold">{r.label}:</span>
                        <span className={`font-black text-sm ${r.isUp ? "text-emerald-400" : "text-rose-400"}`}>
                          {r.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="text-xs text-[var(--text-muted)] border-t border-white/5 pt-2 font-bold">
                  Thống kê tăng / giảm mạnh nhất so với tuần trước
                </div>
              </div>
            ) : (
              <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-pink)] min-h-[175px]">
                <div>
                  <span className="text-xs font-black text-[var(--accent-pink)] uppercase tracking-wider block">
                    TĂNG TRƯỞNG TUẦN NÀY
                  </span>
                  <div className="mt-2 flex flex-col justify-center min-h-[70px]">
                    <span className={`text-3xl font-black ${unitWeeklyDiff >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {unitWeeklyDiff >= 0 ? "▲ +" : "▼ "}{Math.abs(unitWeeklyPct)}%
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)] font-semibold mt-1">
                      Doanh thu tuần này so với tuần trước
                    </span>
                  </div>
                </div>
                <div className="text-xs text-[var(--text-muted)] border-t border-white/5 pt-2 font-bold">
                  Tăng trưởng doanh thu nội bộ
                </div>
              </div>
            )
          ) : (
            <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-[var(--accent-pink)] min-h-[175px]">
              <div>
                <span className="text-xs font-black text-[var(--accent-pink)] uppercase tracking-wider block">
                  TỶ LỆ KHÔNG VI PHẠM KỶ LUẬT
                </span>
                <div className="mt-1.5">
                  <span className="text-4xl font-black text-[var(--accent-pink)]">
                    {disciplinePct}
                  </span>
                </div>
              </div>
              <div className="my-1">
                <p className="text-sm font-extrabold text-emerald-500">
                  Kỷ luật tuân thủ nhân sự ({getUnitName(filters.unitCode)})
                </p>
                <span className="text-xs text-[var(--text-muted)] font-semibold">(Mục tiêu: &gt; 98.0%)</span>
              </div>
            </div>
          )}

          {/* Card 5: Tỷ suất lợi nhuận ROI */}
          {(filters.periodType === "quarterly" || filters.periodType === "yearly") && (
            <div className="glass-panel p-5 flex flex-col justify-between border-l-4 border-l-purple-500 md:col-span-2 min-h-[140px]">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs font-black text-purple-400 uppercase tracking-wider block">
                    TỶ SUẤT LỢI NHUẬN ROI ({filters.periodType === "quarterly" ? "QUÝ" : "NĂM"})
                  </span>
                  <span className="text-4xl font-black text-purple-300 mt-1 block">
                    {roiVal}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-extrabold block text-emerald-500">
                    Hiệu quả đầu tư ROI thực tế
                  </span>
                  <span className="text-xs text-[var(--text-muted)] font-semibold">
                    (Số liệu kế toán tổng hợp)
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* 3. BIỂU ĐỒ SO SÁNH HOÀN THÀNH DOANH THU CÁC ĐƠN VỊ THEO KỲ */}
      {isParentUnit && (
        <div className="glass-panel p-6">
        <h3 className="text-sm font-black text-white tracking-wider uppercase mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-[var(--accent-cyan)]" /> 
          📊 BIỂU ĐỒ SO SÁNH HOÀN THÀNH DOANH THU {filters.periodType === "weekly" ? `TUẦN ${filters.week} - THÁNG ${filters.month}` : filters.periodType === "monthly" ? `THÁNG ${filters.month}` : filters.periodType === "quarterly" ? `QUÝ ${filters.quarter}` : "CẢ NĂM"} / {filters.year} (9 ĐƠN VỊ)
        </h3>
        
        <div className="w-full h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={barComparisonData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === "light" ? "#cbd5e1" : "rgba(255, 255, 255, 0.05)"} />
              <XAxis dataKey="name" tick={{ fill: theme === "light" ? "#0f172a" : "#94a3b8", fontSize: 11, fontWeight: 700 }} />
              <YAxis 
                yAxisId="left" 
                tick={{ fill: theme === "light" ? "#0f172a" : "#94a3b8", fontSize: 11 }} 
                tickFormatter={(val) => val >= 1000 ? `${(val / 1000).toFixed(1)}T` : `${val}Tr`} 
                label={{ value: 'Triệu VNĐ', angle: -90, position: 'insideLeft', fill: theme === "light" ? "#0f172a" : "#94a3b8" }} 
              />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: theme === "light" ? "#0f172a" : "#94a3b8", fontSize: 11 }} label={{ value: '% HT', angle: 90, position: 'insideRight', fill: theme === "light" ? "#0f172a" : "#94a3b8" }} />
              <RechartsTooltip 
                formatter={(value: any, name: any) => {
                  if (name === "% Hoàn thành") return [`${value}%`, name];
                  const num = Number(value) || 0;
                  const str = num >= 1000 ? `${(num / 1000).toFixed(2)} Tỷ VNĐ (${num.toLocaleString()} Triệu)` : `${num.toLocaleString()} Triệu VNĐ`;
                  return [str, name];
                }}
                contentStyle={{ 
                  background: theme === "light" ? "#ffffff" : "#0f172a", 
                  border: theme === "light" ? "1px solid #cbd5e1" : "1px solid var(--glass-border)", 
                  borderRadius: 8,
                  color: theme === "light" ? "#0f172a" : "#ffffff",
                  fontWeight: "bold"
                }} 
              />
              <Bar yAxisId="left" dataKey="target" name="Mục tiêu (Triệu VNĐ)" fill="#0284c7" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="left" dataKey="revenue" name="Thực tế (Triệu VNĐ)" fill="#16a34a" radius={[4, 4, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="completion" name="% Hoàn thành" stroke="#a855f7" strokeWidth={3} dot={{ r: 6, fill: "#a855f7", stroke: "#ffffff", strokeWidth: 2 }}>
                <LabelList 
                  dataKey="completion" 
                  position="top" 
                  offset={12}
                  formatter={(val: any) => `${val}%`} 
                  style={{ 
                    fill: theme === "light" ? "#6d28d9" : "#facc15", 
                    fontSize: 12, 
                    fontWeight: 900,
                    paintOrder: "stroke",
                    stroke: theme === "light" ? "#ffffff" : "#0f172a",
                    strokeWidth: 3
                  }} 
                />
              </Line>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
      )}

      {/* 4. KHU VỰC CƠ CẤU DOANH THU & TRAFFIC */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Tỷ trọng Cơ cấu Doanh thu (M1) */}
        <div className="glass-panel p-5">
          <h3 className="text-sm font-black text-white tracking-wider uppercase mb-1">
            📊 Tỷ trọng Cơ cấu Doanh thu (M1)
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-4 font-semibold">
            {isParentUnit ? "Cơ cấu đóng góp doanh thu theo Đơn vị và theo Nguồn phát sinh doanh thu" : "Cơ cấu đóng góp doanh thu theo Nguồn phát sinh doanh thu"}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-white/5 pt-4">
            {isParentUnit ? (
              <>
                <div>
                  <h4 className="text-xs font-extrabold text-white uppercase mb-2 text-center">Doanh thu theo Đơn vị</h4>
                  <RevenueDonutChart unitCode={filters.unitCode} periodKey={periodKey} />
                </div>
                <div className="border-t sm:border-t-0 sm:border-l border-white/5 pt-4 sm:pt-0 sm:pl-4">
                  <h4 className="text-xs font-extrabold text-white uppercase mb-2 text-center">Doanh thu theo Nguồn</h4>
                  <SourceRevenueDonutChart unitCode={filters.unitCode} periodKey={periodKey} />
                </div>
              </>
            ) : (
              <div className="col-span-2">
                <h4 className="text-xs font-extrabold text-white uppercase mb-2 text-center">Doanh thu theo Nguồn</h4>
                <div className="max-w-[320px] mx-auto">
                  <SourceRevenueDonutChart unitCode={filters.unitCode} periodKey={periodKey} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mức độ Hoàn thành Mục tiêu Traffic (M3) */}
        <div className="glass-panel p-5 flex flex-col justify-between">
          <h3 className="text-sm font-black text-white tracking-wider uppercase mb-1">
            📈 Mức độ Hoàn thành Mục tiêu Traffic (M3)
          </h3>
          <p className="text-xs text-[var(--text-muted)] mb-3 font-semibold">
            So sánh lượt xem/truy cập thực tế so với mục tiêu kế hoạch (M triệu views)
          </p>
          <div className="space-y-3 overflow-y-auto max-h-[280px] pr-1">
            {trafficData.map(item => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-200 font-extrabold">{item.name}</span>
                  <span className="text-slate-300 font-black">
                    {item.actual}M / {item.target}M ({item.pct}%)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-white/5">
                  <div className={`h-full rounded-full ${item.color}`} style={{ width: `${Math.min(100, item.pct)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 5. CỤM 3 BẢNG XẾP HẠNG (BXH DOANH THU, SẢN XUẤT, TRAFFIC) */}
      {isParentUnit && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* BXH Tăng trưởng Doanh thu */}
          <div className="glass-panel p-5">
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              📝 BXH Tăng trưởng Doanh thu
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-3 font-semibold">Xếp hạng theo % tăng trưởng so với kỳ trước</p>
            <div className="space-y-2.5 text-xs max-h-[380px] overflow-y-auto pr-1">
              {bxhRevenueSorted.map(row => (
                <div key={row.rank + row.name} className={`flex justify-between items-center p-2.5 rounded-lg border ${
                  row.highlight ? "bg-amber-500/10 border-amber-500/30" : row.warning ? "bg-rose-500/10 border-rose-500/30" : "bg-slate-900/40 border-white/5"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-amber-500 w-6 text-sm">{row.rank}</span>
                    <span className="font-extrabold text-white text-xs">{row.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--text-muted)] font-bold text-xs">{row.val}</span>
                    <span className={`font-black text-xs ${row.up ? "text-emerald-500" : "text-rose-500"}`}>{row.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BXH Hoàn thành Sản xuất */}
          <div className="glass-panel p-5">
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              🎬 BXH Hoàn thành Sản xuất
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-3 font-semibold">Mức độ hoàn thành kế hoạch số lượng video</p>
            <div className="space-y-2.5 text-xs max-h-[380px] overflow-y-auto pr-1">
              {bxhProductionSorted.map(row => (
                <div key={row.rank + row.name} className={`flex justify-between items-center p-2.5 rounded-lg border ${
                  row.highlight ? "bg-amber-500/10 border-amber-500/30" : row.warning ? "bg-rose-500/10 border-rose-500/30" : "bg-slate-900/40 border-white/5"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-amber-500 w-6 text-sm">{row.rank}</span>
                    <span className="font-extrabold text-white text-xs">{row.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--text-muted)] font-bold text-xs">{row.val}</span>
                    <span className="font-black text-emerald-500 text-xs">{row.pctStr}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* BXH Tăng trưởng Traffic */}
          <div className="glass-panel p-5">
            <h3 className="text-xs font-black text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
              🌐 BXH Tăng trưởng Traffic
            </h3>
            <p className="text-xs text-[var(--text-muted)] mb-3 font-semibold">Xếp hạng theo % tăng trưởng traffic views</p>
            <div className="space-y-2.5 text-xs max-h-[380px] overflow-y-auto pr-1">
              {bxhTrafficSorted.map(row => (
                <div key={row.rank + row.name} className={`flex justify-between items-center p-2.5 rounded-lg border ${
                  row.highlight ? "bg-amber-500/10 border-amber-500/30" : row.warning ? "bg-rose-500/10 border-rose-500/30" : "bg-slate-900/40 border-white/5"
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-amber-500 w-6 text-sm">{row.rank}</span>
                    <span className="font-extrabold text-white text-xs">{row.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[var(--text-muted)] font-bold text-xs">{row.val}</span>
                    <span className={`font-black text-xs ${row.up ? "text-emerald-500" : "text-rose-500"}`}>{row.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* 6. KHU VỰC CHỈ ĐẠO CỦA BOD (BOTTOM SECTION) */}
      <div className="glass-panel p-5 space-y-4">
        <h3 className="text-sm font-black text-[var(--accent-purple)] uppercase tracking-wider flex items-center gap-2">
          💬 Ý KIẾN CHỈ ĐẠO ĐIỀU HÀNH CỦA BAN GIÁM ĐỐC (BOD)
        </h3>
        <p className="text-sm text-[var(--text-muted)] font-medium">
          Ghi chú ý kiến chỉ đạo hành động, nhận định hiệu xuất kỳ này để lưu trữ và gửi thông báo tới các đơn vị
        </p>
        <textarea
          value={bodComment}
          onChange={(e) => setBodComment(e.target.value)}
          placeholder="Nhập nội dung chỉ đạo điều hành chiến lược cho các đơn vị thuộc BU Sconnect..."
          rows={3}
          className="w-full bg-slate-950 border border-[var(--glass-border)] rounded-xl p-3 text-sm text-white focus:outline-none focus:border-[var(--accent-purple)] resize-none"
        />
        <div className="flex justify-end gap-3 items-center">
          {isSaved && <span className="text-sm text-emerald-500 font-extrabold">✓ Đã lưu thành công!</span>}
          <button
            onClick={handleSaveComment}
            className="bg-purple-700 hover:bg-purple-600 text-white text-sm font-extrabold px-5 py-2.5 rounded-xl shadow transition-all"
          >
            💾 Lưu chỉ đạo BOD
          </button>
        </div>

        {savedComment && (
          <div className="mt-3 p-4 rounded-xl bg-purple-950/20 border border-purple-500/25 space-y-1.5">
            <span className="text-[10px] uppercase font-black text-[var(--accent-purple)] block tracking-wider">
              📌 CHỈ ĐẠO ĐÃ LƯU ĐANG ÁP DỤNG KỲ NÀY:
            </span>
            <p className="text-sm font-semibold text-slate-200 whitespace-pre-wrap">{savedComment}</p>
          </div>
        )}
      </div>

    </div>
  );
}
