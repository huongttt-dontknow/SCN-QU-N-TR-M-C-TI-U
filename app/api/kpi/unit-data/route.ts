import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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
  let unitCode = "";
  let productCode: string | undefined = undefined;

  try {
    const { searchParams } = new URL(request.url);
    unitCode = searchParams.get("unitCode") || "";
    productCode = searchParams.get("productCode") || undefined;
    const month = parseInt(searchParams.get("month") || "7");
    const week = parseInt(searchParams.get("week") || "1");
    const quarter = searchParams.get("quarter") || "Q3";
    const year = searchParams.get("year") || "2026";

    if (!unitCode && !productCode) {
      return NextResponse.json({ error: "Thiếu unitCode hoặc productCode" }, { status: 400 });
    }

    // Lấy toàn bộ bản ghi KPI của đơn vị hoặc sản phẩm trong năm
    let records: any[] = [];
    try {
      records = await prisma.kpiData.findMany({
        where: productCode ? { productCode } : { unitCode, productCode: null }
      });
    } catch (dbErr) {
      console.warn("Lấy KPI từ DB thất bại (hạn mức), sử dụng dữ liệu JSON dự phòng:", dbErr);
      const fs = require("fs");
      const path = require("path");
      const filename = productCode ? "product_kpi_records.json" : "all_kpi_records.json";
      const jsonPath = path.join(process.cwd(), "lib", filename);
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, "utf-8");
        records = JSON.parse(raw).filter((r: any) => {
          if (productCode) {
            return r.productCode === productCode;
          } else {
            return r.unitCode === unitCode && (!r.productCode);
          }
        });
      }
    }

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

    // Tải trước metadata từ file JSON gốc để sửa lỗi các bản ghi CSDL bị mất title/unit khi người dùng chỉnh sửa
    const metadataMap: Record<string, any> = {};
    try {
      const fs = require("fs");
      const path = require("path");
      const filename = productCode ? "product_kpi_records.json" : "all_kpi_records.json";
      const jsonPath = path.join(process.cwd(), "lib", filename);
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, "utf-8");
        const jsonRecords = JSON.parse(raw);
        for (const jr of jsonRecords) {
          const code = jr.indicatorCode;
          if (code && jr.title) {
            // Giữ tiêu đề dài và chi tiết nhất nếu có nhiều bản ghi trùng mã
            if (!metadataMap[code] || jr.title.length > (metadataMap[code].title || "").length) {
              metadataMap[code] = {
                title: jr.title,
                unit: jr.unit || "",
                parentCode: jr.parentCode || undefined,
                frequency: jr.frequency || undefined,
                aggregationMethod: jr.aggregationMethod || undefined,
                group: jr.group || undefined
              };
            }
          }
        }
      }
    } catch (e) {
      console.warn("Lỗi load metadata từ JSON:", e);
    }

    // Tập hợp dữ liệu thời gian cho từng chỉ tiêu
    for (const r of records) {
      const code = r.indicatorCode;
      
      if (unitCode === "SCVN" && !productCode) {
        // Loại bỏ các chỉ tiêu con chi tiết của các đơn vị thành viên
        const subUnitRevenueCodes = [
          "DM1-I02.01", "SM1-I02.01", "MM1-I02.01", "NM1-I02.01", "CM1-I02.01",
          "VM1-I02.01-WF", "VM1-I02.01-AS", "VM1-I02.01-NDTH", "VM1-I02.01-Lego"
        ];
        if (r.parentCode && subUnitRevenueCodes.includes(r.parentCode)) {
          continue;
        }
      }
      
      let displayCode = code;
      if (productCode && displayCode.startsWith(productCode + "-")) {
        displayCode = displayCode.substring(productCode.length + 1);
      }

      if (!compiledRows[code]) {
        // Lấy metadata làm fallback nếu các trường trong DB bị null
        const meta = metadataMap[code] || {};
        let title = r.title;
        if (!title || title === code || (meta.title && meta.title !== code)) {
          title = meta.title || title || code;
        }
        let unit = r.unit;
        if (!unit || (meta.unit && unit === "")) {
          unit = meta.unit || unit || "";
        }
        const freq = r.frequency || meta.frequency || undefined;
        const aggMethod = r.aggregationMethod || meta.aggregationMethod || "SUM";

        let parentCode = r.parentCode || meta.parentCode;
        if (!parentCode || parentCode === "") {
          const groupPrefix = r.group ? r.group.split(".")[0].trim() : (meta.group ? meta.group.split(".")[0].trim() : "M1");
          parentCode = productCode ? `${productCode}-${groupPrefix}` : groupPrefix;
        }

        // Ép cấu trúc cây cho SCVN theo bảng Excel
        if (unitCode === "SCVN" && !productCode) {
          if (code === "VM1-I02.01") {
            parentCode = "M1";
          } else if (
            code === "DM1-I02.01" || code === "SM1-I02.01" || code === "MM1-I02.01" || code === "NM1-I02.01" || code === "CM1-I02.01" ||
            code === "VM1-I02.01-WF" || code === "VM1-I02.01-AS" || code === "VM1-I02.01-NDTH" || code === "VM1-I02.01-Lego"
          ) {
            parentCode = "VM1-I02.01";
          } else if (code === "VM2-I01.01-WF" || code === "VM2-I01.01-AS" || code === "VM2-I01.01-Lego" || code === "VM2-I01.02-NDTH") {
            parentCode = "VM2-I01.01";
          } else if (
            code === "VM3-I01.02-WF" || code === "VM3-I01.02-AS" || code === "VM3-I01.02-Lego" || code === "VM3-I01.02-NDTH" ||
            code === "DM3-I01.03" || code === "SM3-I01.04" || code === "MM3-I01.01" || code === "NM3-I01.05" || code === "CM3-I01.01"
          ) {
            parentCode = "TM3-I01.02";
          } else if (code && code.endsWith("7-I03.01") && code !== "VM7-I03.01") {
            parentCode = "VM7-I03.01";
          } else if (code && code.endsWith("7-I03.02") && code !== "VM7-I03.02") {
            parentCode = "VM7-I03.02";
          }
        }

        compiledRows[code] = {
          code: code,
          displayCode: displayCode,
          title: title,
          unit: unit,
          targetWeek: 0, actualWeek: 0,
          targetMonth: 0, actualMonth: 0,
          targetQuarter: 0, actualQuarter: 0,
          targetYear: 0, actualYear: 0,
          isParent: false,
          parentCode: parentCode,
          frequency: detectFrequency(freq, title, code),
          aggregationMethod: aggMethod,
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
      
      // Ép cấu trúc phẳng cho các đơn vị con của SCVN
      if (unitCode === "SCVN" && !productCode) {
        if (row.code === "DM1-I02.01" || row.code === "SM1-I02.01" || row.code === "MM1-I02.01" || row.code === "NM1-I02.01" || row.code === "CM1-I02.01") {
          row.isParent = false;
        }
      }
    }

    // Tải và chuẩn hóa tất cả các dòng chỉ tiêu không phải là dòng cha lớn
    for (const row of allRows) {
      if (row.displayCode === "M1" || row.displayCode === "M2" || row.displayCode === "M3" || row.displayCode === "M4" || row.displayCode === "M5" || row.displayCode === "M6" || row.displayCode === "M7") {
        continue;
      }
      // resolves monthly/quarterly/yearly values for all indicators including intermediate parents


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
        if (unitCode === "SCVN" && !productCode) {
          // Không tự động gộp cho bất kỳ chỉ tiêu cha trung gian nào của SCVN để giữ số kế hoạch/thực tế chính xác từ Excel
          continue;
        }
        const subChildren = allRows.filter(r => r.parentCode === row.code);
        if (subChildren.length > 0) {
          // Only perform rollup if the parent itself has no target or actual values set
          if (row.targetMonth === 0 && row.actualMonth === 0 && row.targetWeek === 0 && row.actualWeek === 0) {
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
    }

    // Tự động tính gộp dữ liệu từ con lên cha cho các nhóm lớn M1 - M7 từ các con trực tiếp
    for (const gCode of ["M1", "M2", "M3", "M4", "M5", "M6", "M7"]) {
      if (unitCode === "SCVN" && !productCode && (gCode === "M1" || gCode === "M2" || gCode === "M3")) {
        // Bỏ qua cộng dồn tự động cho các nhóm lớn M1, M2, M3 của SCVN để tránh double-count
        continue;
      }
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

    // Gán dữ liệu chính xác cho nhóm M1, M2, M3 của SCVN
    if (unitCode === "SCVN" && !productCode) {
      const m1Row = compiledRows["VM1-I02.01"];
      const m1Parent = compiledRows["M1"];
      if (m1Row && m1Parent) {
        m1Parent.targetWeek = m1Row.targetWeek; m1Parent.actualWeek = m1Row.actualWeek;
        m1Parent.targetMonth = m1Row.targetMonth; m1Parent.actualMonth = m1Row.actualMonth;
        m1Parent.targetQuarter = m1Row.targetQuarter; m1Parent.actualQuarter = m1Row.actualQuarter;
        m1Parent.targetYear = m1Row.targetYear; m1Parent.actualYear = m1Row.actualYear;
      }

      const m2Row = compiledRows["VM2-I01.01"];
      const m2Parent = compiledRows["M2"];
      if (m2Row && m2Parent) {
        m2Parent.targetWeek = m2Row.targetWeek; m2Parent.actualWeek = m2Row.actualWeek;
        m2Parent.targetMonth = m2Row.targetMonth; m2Parent.actualMonth = m2Row.actualMonth;
        m2Parent.targetQuarter = m2Row.targetQuarter; m2Parent.actualQuarter = m2Row.actualQuarter;
        m2Parent.targetYear = m2Row.targetYear; m2Parent.actualYear = m2Row.actualYear;
      }

      const m3Row = compiledRows["TM3-I01.02"];
      const m3Parent = compiledRows["M3"];
      if (m3Row && m3Parent) {
        m3Parent.targetWeek = m3Row.targetWeek; m3Parent.actualWeek = m3Row.actualWeek;
        m3Parent.targetMonth = m3Row.targetMonth; m3Parent.actualMonth = m3Row.actualMonth;
        m3Parent.targetQuarter = m3Row.targetQuarter; m3Parent.actualQuarter = m3Row.actualQuarter;
        m3Parent.targetYear = m3Row.targetYear; m3Parent.actualYear = m3Row.actualYear;
      }
    }

    return NextResponse.json(allRows.map(r => ({ ...r, __test_version: "v3" })));
  } catch (error: any) {
    console.error("Lỗi xử lý dữ liệu KPI đơn vị:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
