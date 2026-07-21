// AUTO-GENERATED RADAR MASTER DATA FROM USER EXCEL IMAGE (TCT & SCVN M1 -> M7 FULL 2025 & 2026)
export interface ObjectiveScoreRecord {
  year_2025?: number;
  q1_2025?: number;
  q2_2025?: number;
  q3_2025?: number;
  q4_2025?: number;
  year_2026?: number;
  q1_2026?: number;
  q2_2026?: number;
  m1_26?: number;
  m2_26?: number;
  m3_26?: number;
  m4_26?: number;
  m5_26?: number;
  m6_26?: number;
  [key: string]: number | undefined;
}

export const RADAR_MASTER_DATA: Record<string, Record<string, ObjectiveScoreRecord>> = {
  "TCT": {
    "M1": { "year_2025": 35, "q1_2025": 60, "q2_2025": 45, "q3_2025": 41, "q4_2025": 50, "q1_2026": 57, "q2_2026": 58, "m1_26": 60, "m2_26": 64, "m3_26": 59, "m4_26": 47, "m5_26": 53, "m6_26": 68 },
    "M2": { "year_2025": 103, "q1_2025": 102, "q2_2025": 79, "q3_2025": 67, "q4_2025": 89, "q1_2026": 72, "q2_2026": 72, "m1_26": 71, "m2_26": 66, "m3_26": 93, "m4_26": 83, "m5_26": 88, "m6_26": 89 },
    "M3": { "year_2025": 75, "q1_2025": 72, "q2_2025": 54, "q3_2025": 72, "q4_2025": 69, "q1_2026": 87, "q2_2026": 72, "m1_26": 75, "m2_26": 67, "m3_26": 71, "m4_26": 87, "m5_26": 76, "m6_26": 81 },
    "M4": { "year_2025": 60, "q1_2025": 94, "q2_2025": 62, "q3_2025": 0, "q4_2025": 0, "q1_2026": 67, "q2_2026": 65, "m1_26": 67, "m2_26": 64, "m3_26": 64, "m4_26": 43, "m5_26": 66, "m6_26": 54 },
    "M5": { "year_2025": 73, "q1_2025": 79, "q2_2025": 103, "q3_2025": 100, "q4_2025": 100, "q1_2026": 92, "q2_2026": 94, "m1_26": 89, "m2_26": 96, "m3_26": 89, "m4_26": 93, "m5_26": 95, "m6_26": 97 },
    "M6": { "year_2025": 92, "q1_2025": 84, "q2_2025": 81, "q3_2025": 90, "q4_2025": 100, "q1_2026": 91, "q2_2026": 91, "m1_26": 84, "m2_26": 100, "m3_26": 100, "m4_26": 100, "m5_26": 100, "m6_26": 73 },
    "M7": { "year_2025": 90, "q1_2025": 100, "q2_2025": 88, "q3_2025": 100, "q4_2025": 100, "q1_2026": 88, "q2_2026": 89, "m1_26": 95, "m2_26": 95, "m3_26": 95, "m4_26": 90, "m5_26": 95, "m6_26": 99 }
  },
  "SCVN": {
    "M1": { "year_2025": 52, "q2_2025": 42, "q1_2026": 64, "q2_2026": 50, "m1_26": 68, "m2_26": 64, "m3_26": 67, "m4_26": 49, "m5_26": 51, "m6_26": 47 },
    "M2": { "year_2025": 78, "q2_2025": 71, "q1_2026": 80, "q2_2026": 78, "m1_26": 80, "m2_26": 87, "m3_26": 111, "m4_26": 83, "m5_26": 95, "m6_26": 93 },
    "M3": { "year_2025": 68, "q2_2025": 56, "q1_2026": 95, "q2_2026": 60, "m1_26": 100, "m2_26": 78, "m3_26": 83, "m4_26": 71, "m5_26": 65, "m6_26": 60 },
    "M4": { "year_2025": 75, "q2_2025": 49, "q1_2026": 51, "q2_2026": 66, "m1_26": 55, "m2_26": 65, "m3_26": 54, "m4_26": 50, "m5_26": 53, "m6_26": 49 },
    "M5": { "year_2025": 90, "q2_2025": 96, "q1_2026": 93, "q2_2026": 83, "m1_26": 85, "m2_26": 85, "m3_26": 83, "m4_26": 100, "m5_26": 70, "m6_26": 65 },
    "M6": { "year_2025": 95, "q2_2025": 100, "q1_2026": 100, "q2_2026": 90, "m1_26": 92, "m2_26": 100, "m3_26": 100, "m4_26": 100, "m5_26": 100, "m6_26": 100 },
    "M7": { "year_2025": 90, "q2_2025": 97, "q1_2026": 75, "q2_2026": 95, "m1_26": 80, "m2_26": 84, "m3_26": 95, "m4_26": 95, "m5_26": 95, "m6_26": 98 }
  }
}

export interface RadarPoint {
  subject: string;
  code: string;
  "Kỳ này": number;
  "Kỳ trước": number;
  change: number;
}

const OBJECTIVE_NAMES: Record<string, string> = {
  M1: "Tài chính",
  M2: "Sản phẩm/ SX",
  M3: "Khách hàng",
  M4: "Thương hiệu – kênh KD",
  M5: "QT Vận hành",
  M6: "Nhân sự",
  M7: "Văn hóa"
};

export function getRadarScores(
  unitCode: string,
  periodType: string,
  monthStr: number | string,
  quarterStr: number | string,
  yearStr: number | string
) {
  const month = Number(monthStr) || 6;
  const quarterStrVal = String(quarterStr || "Q2").replace("Q", "");
  const quarter = Number(quarterStrVal) || 2;
  const year = Number(yearStr) || 2026;

  let currKey = "m6_26";
  let prevKey = "m5_26";
  let labelCurr = `Tháng ${month}/${year}`;
  let labelPrev = month > 1 ? `Tháng ${month - 1}/${year}` : `Tháng 12/${year - 1}`;

  if (year === 2025) {
    if (periodType === "weekly" || periodType === "monthly") {
      currKey = `m${month}_25`;
      prevKey = month > 1 ? `m${month - 1}_25` : "year_2025";
    } else if (periodType === "quarterly") {
      currKey = `q${quarter}_2025`;
      prevKey = quarter > 1 ? `q${quarter - 1}_2025` : "year_2025";
      labelCurr = `Quý ${quarter}/2025`;
      labelPrev = quarter > 1 ? `Quý ${quarter - 1}/2025` : "Năm 2025";
    } else {
      currKey = "year_2025";
      prevKey = "year_2025";
      labelCurr = "Năm 2025";
      labelPrev = "Năm 2025";
    }
  } else {
    if (periodType === "weekly" || periodType === "monthly") {
      currKey = `m${month}_26`;
      prevKey = month > 1 ? `m${month - 1}_26` : "m1_26";
      labelCurr = `Tháng ${month}/${year}`;
      labelPrev = month > 1 ? `Tháng ${month - 1}/${year}` : `Tháng 12/${year - 1}`;
    } else if (periodType === "quarterly") {
      currKey = `q${quarter}_2026`;
      prevKey = quarter > 1 ? `q${quarter - 1}_2026` : "q4_2025";
      labelCurr = `Quý ${quarter}/${year}`;
      labelPrev = quarter > 1 ? `Quý ${quarter - 1}/${year}` : `Quý 4/2025`;
    } else {
      currKey = "year_2026";
      prevKey = "year_2025";
      labelCurr = `Năm ${year}`;
      labelPrev = `Năm ${year - 1}`;
    }
  }

  const activeUnit = (unitCode === "TCT" ? "TCT" : "SCVN");
  const unitData = RADAR_MASTER_DATA[activeUnit] || RADAR_MASTER_DATA["SCVN"];

  const points: RadarPoint[] = [];
  const keys = ["M1", "M2", "M3", "M4", "M5", "M6", "M7"];

  for (const k of keys) {
    const rec = unitData[k] || {};
    const currVal = rec[currKey] ?? rec["m6_26"] ?? rec["q2_2026"] ?? rec["year_2025"] ?? 80;
    const prevVal = rec[prevKey] ?? rec["m5_26"] ?? currVal;
    const change = currVal - prevVal;

    points.push({
      code: k,
      subject: OBJECTIVE_NAMES[k] || k,
      "Kỳ này": currVal,
      "Kỳ trước": prevVal,
      change
    });
  }

  const unitName = activeUnit === "TCT" ? "Tổng Công Ty (TCT)" : "BU Sconnect VN (SCVN)";

  return {
    unitName,
    labelCurr,
    labelPrev,
    points
  };
}
