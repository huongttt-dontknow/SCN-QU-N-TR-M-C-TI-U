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
  const checkDict = (dict: Record<string, MasterKpiItem> | undefined) => {
    if (!dict) return null;
    let item = dict[kpiCode];
    if (!item && (kpiCode === "VM1-I02.01" || kpiCode === "M1-I02" || kpiCode === "CM1-I02.01")) {
      item = dict["VM1-I02.01"] || dict["CM1-I02.01"] || dict["2.1"] || Object.values(dict).find(v => v.title && (v.title.toUpperCase().includes("TỔNG DOANH THU") || (v.title.toUpperCase().includes("DOANH THU") && !v.title.toUpperCase().includes("NỘI BỘ"))));
    }
    if (item && item.periods && item.periods[periodKey]) {
      return item.periods[periodKey];
    }
    return null;
  };

  if (unitCode && MASTER_KPI_DATA[unitCode]) {
    const res = checkDict(MASTER_KPI_DATA[unitCode]);
    if (res) return res;
  }

  if (MASTER_KPI_DATA["SCVN"]) {
    const resSCVN = checkDict(MASTER_KPI_DATA["SCVN"]);
    if (resSCVN) return resSCVN;
  }

  return null;
}

export function getMasterKpiActual(unitCode: string, kpiCode: string, periodKey: string): number | null {
  const rec = getMasterKpiRecord(unitCode, kpiCode, periodKey);
  return rec?.actual ?? rec?.target ?? null;
}

export const KPI_TITLE_DICTIONARY: Record<string, string> = {
  "TM1-I02": "Doanh thu",
  "VM1-I02.01": "Tổng doanh thu",
  "VM1-I02.01-WF": "Doanh thu BP Wolfoo (WO)",
  "VM1-I02.01-AS": "Doanh thu BP Animated Story (AS)",
  "VM1-I02.01-NDTH": "Doanh thu BP Nội dung tổng hợp (NDTH)",
  "VM1-I02.01-Lego": "Doanh thu DA Lego (LEGO)",
  "DM1-I02.01-DA01": "Doanh thu Dự án 01 (DA01)",
  "SM1-I02.01": "Doanh thu BP Studio (SCS)",
  "MM1-I02.01": "Doanh thu BP Music (SCMU)",
  "CM1-I02.01": "Doanh thu BP Creative Hub (CR)",
  "CM1-I02.01-CR": "Doanh thu BP Creative Hub (CR)",
  "CM1-I02.03-CR": "Doanh thu ĐT BP Creative",
  "NM1-I02.01": "Doanh thu CNGP",
  "NM1-I02.01-CNGP": "Doanh thu CNGP",

  "TM1-I02.01": "Doanh thu sản xuất & phát hành",
  "VM1-I02.02": "Doanh thu NB",
  "VM1-I02.02-WF": "Doanh thu NB BP Wolfoo (WO)",
  "VM1-I02.02-AS": "Doanh thu NB BP Animated Story (AS)",
  "VM1-I02.02-NDTH": "Doanh thu NB BP Nội dung tổng hợp (NDTH)",
  "VM1-I02.02-Lego": "Doanh thu NB DA Lego (LEGO)",
  "DM1-I02.02-DA01": "Doanh thu NB Dự án 01 (DA01)",

  "TM2-I01": "Sản lượng sản xuất",
  "VM2-I01.01": "Số lượng video hoàn thành sản xuất",
  "VM2-I01.01-WF": "Sản lượng BP Wolfoo (WO)",
  "VM2-I01.01-AS": "Sản lượng BP Animated Story (AS)",
  "VM2-I01.01-NDTH": "Sản lượng BP Nội dung tổng hợp (NDTH)",
  "VM2-I01.01-Lego": "Sản lượng DA Lego (LEGO)",
  "DM2-I01.01-DA01": "Sản lượng Dự án 01 (DA01)",
  "SM2-I01.01": "Sản lượng BP Studio (SCS)",
  "MM2-I01.01": "Sản lượng BP Music (SCMU)",
  "CM2-I01.01": "Sản lượng BP Creative Hub (CR)",
  "NM2-I01.01": "Sản lượng CNGP (CN)",

  "TM3-I01": "Khách hàng & Traffic",
  "VM3-I01.02": "Tổng traffic (nội dung long)",
  "TM3-I01.02": "Tổng traffic (nội dung long)",
  "VM3-I01.02-WF": "Traffic BP Wolfoo (WO)",
  "VM3-I01.02-AS": "Traffic BP Animated Story (AS)",
  "VM3-I01.02-NDTH": "Traffic BP Nội dung tổng hợp (NDTH)",
  "VM3-I01.02-Lego": "Traffic DA Lego (LEGO)",
  "DM3-I01.03-DA01": "Traffic Dự án 01 (DA01)",
  "CM3-I01.01-CR": "Traffic BP Creative Hub (CR)",
  "SM3-I01.04": "Traffic BP Studio (SCS)",
  "MM3-I01.01": "Traffic BP Music (SCMU)",
  "NM3-I01.05": "Traffic CNGP (CN)",

  "VM7-I03.01": "Kỷ luật doanh nghiệp",
  "TM7-I01.01": "Kỷ luật doanh nghiệp",
  "VM7-I03.01-WF": "Kỷ luật BP Wolfoo (WO)",
  "VM7-I03.01-AS": "Kỷ luật BP Animated Story (AS)",
  "VM7-I03.01-Lego": "Kỷ luật DA Lego (LEGO)",
  "VM7-I03.01-NDTH": "Kỷ luật BP Nội dung tổng hợp (NDTH)",
  "DM7-I03.01-DA01": "Kỷ luật Dự án 01 (DA01)",
  "SM7-I03.01-SCS": "Kỷ luật BP Studio (SCS)",
  "MM7-I03.01-SCMU": "Kỷ luật BP Music (SCMU)",
  "NM7-I03.01-CNGP": "Kỷ luật CNGP (CN)",
  "CM7-I03.01-CR": "Kỷ luật BP Creative Hub (CR)"
};

export function getFriendlyIndicatorTitle(code: string, fallbackTitle?: string): string {
  if (!code) return fallbackTitle || "";
  const cleanCode = code.trim();
  if (KPI_TITLE_DICTIONARY[cleanCode]) {
    return KPI_TITLE_DICTIONARY[cleanCode];
  }
  if (fallbackTitle && fallbackTitle !== cleanCode) {
    return fallbackTitle;
  }
  return cleanCode;
}
