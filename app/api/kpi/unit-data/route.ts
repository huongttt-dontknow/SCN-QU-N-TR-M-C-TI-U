import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function detectFrequency(freq: string | null, title: string, code: string): string {
  if (freq) return freq.toLowerCase().trim();
  const t = (title || "").toLowerCase();
  const c = (code || "").toLowerCase();

  // Detect quarterly
  if (t.includes("roi") || t.includes("ros") || t.includes("tỷ suất lợi nhuận") || c.includes("-q")) {
    return "quý";
  }
  
  // Detect monthly
  if (t.includes("chi phí mua công cụ") || t.includes("chi phí ctv") || t.includes("độ phủ thương hiệu") || t.includes("kỷ luật") || t.includes("nhân sự fulltime") || t.includes("đào tạo") || t.includes("ngân sách") || c.includes("-m")) {
    return "tháng";
  }

  return "tuần";
}

// Helper function to aggregate a list of target/actual values based on aggregation method
function aggregateValues(items: { target: number, actual: number }[], method: string) {
  if (items.length === 0) return { target: 0, actual: 0 };
  const cleanMethod = (method || "SUM").toUpperCase();

  if (cleanMethod === "SUM") {
    let target = 0;
    let actual = 0;
    for (const item of items) {
      target += item.target;
      actual += item.actual;
    }
    return { target, actual };
  } else if (cleanMethod === "AVERAGE" || cleanMethod === "WEIGHTED_AVERAGE") {
    let targetSum = 0;
    let actualSum = 0;
    let targetCount = 0;
    let actualCount = 0;
    for (const item of items) {
      if (item.target !== 0) {
        targetSum += item.target;
        targetCount++;
      }
      if (item.actual !== 0) {
        actualSum += item.actual;
        actualCount++;
      }
    }
    return {
      target: targetCount > 0 ? targetSum / targetCount : 0,
      actual: actualCount > 0 ? actualSum / actualCount : 0
    };
  } else if (cleanMethod === "SNAPSHOT" || cleanMethod === "END_OF_PERIOD") {
    const nonZeroTargets = items.map(i => i.target).filter(t => t !== 0);
    const nonZeroActuals = items.map(i => i.actual).filter(a => a !== 0);

    return {
      target: nonZeroTargets.length > 0 ? nonZeroTargets[nonZeroTargets.length - 1] : (items[items.length - 1]?.target || 0),
      actual: nonZeroActuals.length > 0 ? nonZeroActuals[nonZeroActuals.length - 1] : (items[items.length - 1]?.actual || 0)
    };
  }

  return {
    target: items.reduce((sum, i) => sum + i.target, 0),
    actual: items.reduce((sum, i) => sum + i.actual, 0)
  };
}

// Helper to resolve monthly values (either overridden or aggregated from weeks)
function resolveMonthValues(code: string, m: number, records: any[], freq: string, aggMethod: string) {
  const monthlyRec = records.find(r => r.indicatorCode === code && r.periodKey === `monthly_${m}`);
  if (monthlyRec && monthlyRec.isOverridden) {
    return { target: monthlyRec.targetValue, actual: monthlyRec.actualValue };
  }
  if (freq === "tuần" || freq === "weekly") {
    const weeklyItems: { target: number, actual: number }[] = [];
    for (let w = 1; w <= 5; w++) {
      const key = `weekly_${m}_${w}`;
      const match = records.find(r => r.indicatorCode === code && r.periodKey === key);
      if (match) {
        weeklyItems.push({ target: match.targetValue, actual: match.actualValue });
      }
    }
    if (weeklyItems.length > 0) {
      return aggregateValues(weeklyItems, aggMethod);
    }
  }
  return {
    target: monthlyRec ? monthlyRec.targetValue : 0,
    actual: monthlyRec ? monthlyRec.actualValue : 0
  };
}

// Helper to resolve quarterly values (either overridden or aggregated from months)
function resolveQuarterValues(code: string, qKey: string, records: any[], freq: string, aggMethod: string) {
  const quarterRec = records.find(r => r.indicatorCode === code && (r.periodKey === qKey || r.periodKey === qKey.replace("quarterly_", "Q")));
  if (quarterRec && quarterRec.isOverridden) {
    return { target: quarterRec.targetValue, actual: quarterRec.actualValue };
  }
  const qNum = parseInt(qKey.replace("quarterly_", ""));
  const qMonths = qNum === 1 ? [1, 2, 3] : qNum === 2 ? [4, 5, 6] : qNum === 3 ? [7, 8, 9] : [10, 11, 12];

  const monthlyItems = qMonths.map(m => resolveMonthValues(code, m, records, freq, aggMethod));
  return aggregateValues(monthlyItems, aggMethod);
}

// Helper to resolve yearly values (either overridden or aggregated from quarters)
function resolveYearValues(code: string, yKey: string, records: any[], freq: string, aggMethod: string) {
  const yearlyRec = records.find(r => r.indicatorCode === code && r.periodKey === yKey);
  if (yearlyRec && yearlyRec.isOverridden) {
    return { target: yearlyRec.targetValue, actual: yearlyRec.actualValue };
  }
  const quarters = ["quarterly_1", "quarterly_2", "quarterly_3", "quarterly_4"];
  const quarterItems = quarters.map(qKey => resolveQuarterValues(code, qKey, records, freq, aggMethod));
  return aggregateValues(quarterItems, aggMethod);
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitCode = searchParams.get("unitCode") || "";
    const productCode = searchParams.get("productCode") || undefined;
    const month = parseInt(searchParams.get("month") || "7");
    const week = parseInt(searchParams.get("week") || "1");
    const quarter = searchParams.get("quarter") || "Q3";
    const year = searchParams.get("year") || "2026";

    if (!unitCode && !productCode) {
      return NextResponse.json({ error: "Thiếu unitCode hoặc productCode" }, { status: 400 });
    }

    // Lấy toàn bộ bản ghi KPI của đơn vị hoặc sản phẩm trong năm
    const records = await prisma.kpiData.findMany({
      where: productCode ? { productCode } : { unitCode, productCode: null }
    });

    const targetWeekKey = `weekly_${month}_${week}`;
    const targetMonthKey = `monthly_${month}`;
    const targetQuarterKey = `quarterly_${quarter.toLowerCase().replace("q", "")}`;
    const targetYearKey = `yearly_${year}`;

    // Khởi tạo các nhóm cha M1 - M7 mặc định
    const groupNameMap: Record<string, string> = {
      "M1": "M1. TÀI CHÍNH / KINH DOANH",
      "M2": "M2. SẢN PHẨM / SẢN XUẤT",
      "M3": "M3. KHÁCH HÀNG / DỊCH VỤ",
      "M4": "M4. THƯƠNG HIỆU / KÊNH KINH DOANH",
      "M5": "M5. QUẢN TRỊ VẬN HÀNH",
      "M6": "M6. NHÂN SỰ TỔ CHỨC",
      "M7": "M7. VĂN HÓA DOANH NGHIỆP"
    };

    const compiledRows: Record<string, any> = {};

    // Khởi tạo các nhóm cha trong compiledRows (tiền tố productCode nếu có)
    for (const [gCode, gName] of Object.entries(groupNameMap)) {
      const codeKey = productCode ? `${productCode}-${gCode}` : gCode;
      compiledRows[codeKey] = {
        code: codeKey,
        displayCode: gCode,
        title: gName,
        unit: "",
        targetWeek: 0, actualWeek: 0,
        targetMonth: 0, actualMonth: 0,
        targetQuarter: 0, actualQuarter: 0,
        targetYear: 0, actualYear: 0,
        isParent: true,
        parentCode: undefined
      };
    }

    // Tập hợp dữ liệu thời gian cho từng chỉ tiêu
    for (const r of records) {
      const code = r.indicatorCode;
      
      let displayCode = code;
      if (productCode && displayCode.startsWith(productCode + "-")) {
        displayCode = displayCode.substring(productCode.length + 1);
      }

      if (!compiledRows[code]) {
        let parentCode = r.parentCode;
        if (!parentCode || parentCode === "") {
          const groupPrefix = r.group ? r.group.split(".")[0].trim() : "M1";
          parentCode = productCode ? `${productCode}-${groupPrefix}` : groupPrefix;
        }

        compiledRows[code] = {
          code: code,
          displayCode: displayCode,
          title: r.title || code,
          unit: r.unit || "",
          targetWeek: 0, actualWeek: 0,
          targetMonth: 0, actualMonth: 0,
          targetQuarter: 0, actualQuarter: 0,
          targetYear: 0, actualYear: 0,
          isParent: false,
          parentCode: parentCode,
          frequency: detectFrequency(r.frequency, r.title || "", r.indicatorCode),
          aggregationMethod: r.aggregationMethod || "SUM",
          isOverriddenWeek: false,
          isOverriddenMonth: false,
          isOverriddenQuarter: false,
          isOverriddenYear: false
        };
      }

      const pKey = r.periodKey;
      if (pKey === targetWeekKey) {
        compiledRows[code].targetWeek = r.targetValue;
        compiledRows[code].actualWeek = r.actualValue;
        compiledRows[code].isOverriddenWeek = r.isOverridden;
      } else if (pKey === targetMonthKey) {
        compiledRows[code].targetMonth = r.targetValue;
        compiledRows[code].actualMonth = r.actualValue;
        compiledRows[code].isOverriddenMonth = r.isOverridden;
      } else if (pKey === targetQuarterKey || pKey === `quarterly_${quarter}`) {
        compiledRows[code].targetQuarter = r.targetValue;
        compiledRows[code].actualQuarter = r.actualValue;
        compiledRows[code].isOverriddenQuarter = r.isOverridden;
      } else if (pKey === targetYearKey) {
        compiledRows[code].targetYear = r.targetValue;
        compiledRows[code].actualYear = r.actualValue;
        compiledRows[code].isOverriddenYear = r.isOverridden;
      }
    }

    // Xác định xem chỉ tiêu nào có chỉ tiêu con thì mark isParent = true
    const allRows = Object.values(compiledRows);
    for (const row of allRows) {
      if (row.displayCode !== "M1" && row.displayCode !== "M2" && row.displayCode !== "M3" && row.displayCode !== "M4" && row.displayCode !== "M5" && row.displayCode !== "M6" && row.displayCode !== "M7") {
        const hasChildren = allRows.some(r => r.parentCode === row.code);
        if (hasChildren) {
          row.isParent = true;
        }
      }
    }

    // Tải và chuẩn hóa tất cả các dòng chỉ tiêu không phải là dòng cha lớn
    for (const row of allRows) {
      if (row.displayCode === "M1" || row.displayCode === "M2" || row.displayCode === "M3" || row.displayCode === "M4" || row.displayCode === "M5" || row.displayCode === "M6" || row.displayCode === "M7") {
        continue;
      }
      if (row.isParent) {
        continue;
      }

      const freq = row.frequency || "tuần";
      const aggMethod = row.aggregationMethod || "SUM";

      // Lũy kế Tháng (nếu không ghi đè)
      if (!row.isOverriddenMonth) {
        const monthVal = resolveMonthValues(row.code, month, records, freq, aggMethod);
        row.targetMonth = monthVal.target;
        row.actualMonth = monthVal.actual;
      }

      // Lũy kế Quý (nếu không ghi đè)
      if (!row.isOverriddenQuarter) {
        const quarterVal = resolveQuarterValues(row.code, targetQuarterKey, records, freq, aggMethod);
        row.targetQuarter = quarterVal.target;
        row.actualQuarter = quarterVal.actual;
      }

      // Lũy kế Năm (nếu không ghi đè)
      if (!row.isOverriddenYear) {
        const yearVal = resolveYearValues(row.code, targetYearKey, records, freq, aggMethod);
        row.targetYear = yearVal.target;
        row.actualYear = yearVal.actual;
      }
    }

    // Tự động tính gộp dữ liệu từ con lên cha cho các chỉ tiêu cha trung gian (ví dụ: VM1-I02.02, VM1-I02.03, VM1-I02.04)
    for (const row of allRows) {
      if (row.isParent && row.displayCode !== "M1" && row.displayCode !== "M2" && row.displayCode !== "M3" && row.displayCode !== "M4" && row.displayCode !== "M5" && row.displayCode !== "M6" && row.displayCode !== "M7") {
        const subChildren = allRows.filter(r => r.parentCode === row.code);
        if (subChildren.length > 0) {
          row.targetWeek = 0; row.actualWeek = 0;
          row.targetMonth = 0; row.actualMonth = 0;
          row.targetQuarter = 0; row.actualQuarter = 0;
          row.targetYear = 0; row.actualYear = 0;

          for (const child of subChildren) {
            row.targetWeek += child.targetWeek;
            row.actualWeek += child.actualWeek;
            row.targetMonth += child.targetMonth;
            row.actualMonth += child.actualMonth;
            row.targetQuarter += child.targetQuarter;
            row.actualQuarter += child.actualQuarter;
            row.targetYear += child.targetYear;
            row.actualYear += child.actualYear;
          }
        }
      }
    }

    // Tự động tính gộp dữ liệu từ con lên cha cho các nhóm lớn M1 - M7 từ các con trực tiếp
    for (const gCode of ["M1", "M2", "M3", "M4", "M5", "M6", "M7"]) {
      const parentKey = productCode ? `${productCode}-${gCode}` : gCode;
      const children = allRows.filter(r => r.parentCode === parentKey);
      const parent = compiledRows[parentKey];
      if (!parent) continue;

      for (const child of children) {
        if (child.unit === "VNĐ" || child.unit === "Nội dung" || child.unit === "Video" || child.unit === "Views" || child.unit === "Lượt" || child.unit === "Ý tưởng" || child.unit === "Kịch bản" || child.unit === "SL" || child.unit === "Tài liệu" || child.unit === "Kênh") {
          parent.targetWeek += child.targetWeek;
          parent.actualWeek += child.actualWeek;
          parent.targetMonth += child.targetMonth;
          parent.actualMonth += child.actualMonth;
          parent.targetQuarter += child.targetQuarter;
          parent.actualQuarter += child.actualQuarter;
          parent.targetYear += child.targetYear;
          parent.actualYear += child.actualYear;
        }
      }

      if (parent.targetWeek === 0 && children.length > 0) {
        parent.targetWeek = children[0].targetWeek;
        parent.actualWeek = children[0].actualWeek;
        parent.targetMonth = children[0].targetMonth;
        parent.actualMonth = children[0].actualMonth;
        parent.targetQuarter = children[0].targetQuarter;
        parent.actualQuarter = children[0].actualQuarter;
        parent.targetYear = children[0].targetYear;
        parent.actualYear = children[0].actualYear;
      }
    }

    return NextResponse.json(allRows);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
