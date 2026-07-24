// Wrapper for AUTO-GENERATED master data to resolve TS compiler memory exhaustion on Vercel
import masterKpiDataJson from "./kpiMasterData.json";

export interface PeriodKpiVal {
  target?: number;
  actual?: number;
  pct?: number;
}

export interface MasterKpiItem {
  title: string;
  unit: string;
  formula?: string;
  pic?: string | null;
  periods: Record<string, PeriodKpiVal>;
}

export const MASTER_KPI_DATA = masterKpiDataJson as unknown as Record<string, Record<string, MasterKpiItem>>;

export function getMasterKpiRecord(unitCode: string, kpiCode: string, periodKey: string): PeriodKpiVal | null {
  const u = MASTER_KPI_DATA[unitCode] || MASTER_KPI_DATA["SCVN"];
  if (!u) return null;
  let item = u[kpiCode];
  if (!item && (kpiCode === "VM1-I02.01" || kpiCode === "M1-I02" || kpiCode === "CM1-I02.01")) {
    item = u["VM1-I02.01"] || u["CM1-I02.01"] || u["2.1"] || Object.values(u).find(v => v.title && (v.title.toUpperCase().includes("TỔNG DOANH THU") || (v.title.toUpperCase().includes("DOANH THU") && !v.title.toUpperCase().includes("NỘI BỘ"))));
  }
  if (!item || !item.periods) return null;
  return item.periods[periodKey] || null;
}

export function getMasterKpiActual(unitCode: string, kpiCode: string, periodKey: string): number | null {
  const rec = getMasterKpiRecord(unitCode, kpiCode, periodKey);
  return rec?.actual ?? rec?.target ?? null;
}
