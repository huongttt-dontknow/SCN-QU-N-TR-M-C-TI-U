import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getRadarScores } from "@/lib/radarMasterData";
import { createAuditLog } from "@/lib/audit";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitCode = searchParams.get("unitCode") || "SCVN";
    const periodType = searchParams.get("periodType") || "monthly";
    const month = Number(searchParams.get("month")) || 7;
    const week = Number(searchParams.get("week")) || 1;
    const quarter = Number(searchParams.get("quarter")) || 3;
    const year = Number(searchParams.get("year")) || 2026;
    const periodKeyParam = searchParams.get("periodKey") || "";

    // 1. Lấy dữ liệu tĩnh để làm fallback/so sánh lịch sử
    const staticData = getRadarScores(unitCode, periodType, month, quarter, year);

    // 2. Xác định periodKey hiện tại
    const currPeriodKey = periodKeyParam || (
      periodType === "weekly"
        ? `weekly_${month}_${week}`
        : periodType === "monthly"
        ? `monthly_${month}`
        : periodType === "quarterly"
        ? `quarterly_${quarter}`
        : `yearly_${year}`
    );

    // Thử đọc các bản ghi M1-M7 từ DB cho kỳ hiện tại
    let currKpiRecords: any[] = [];
    try {
      currKpiRecords = await prisma.kpiData.findMany({
        where: {
          unitCode,
          indicatorCode: { in: ["M1", "M2", "M3", "M4", "M5", "M6", "M7"] },
          OR: [
            { periodKey: currPeriodKey },
            { periodKey: `monthly_${month}` },
            { periodKey: `monthly_8` }
          ],
          periodType: { in: [periodType, "monthly"] },
          productCode: null,
        },
      });
    } catch (e) {
      console.warn("DB offline/timeout khi lấy kpiData radar, dùng fallback");
    }

    const currRecordMap = new Map<string, any>();
    for (const r of currKpiRecords) {
      // Ưu tiên bản ghi khớp chính xác periodKey
      if (!currRecordMap.has(r.indicatorCode) || r.periodKey === currPeriodKey) {
        currRecordMap.set(r.indicatorCode, r);
      }
    }

    // 3. Xác định kỳ trước
    let prevPeriodKey = "";
    if (periodType === "monthly") {
      const prevMonth = month > 1 ? month - 1 : 12;
      prevPeriodKey = `monthly_${prevMonth}`;
    } else if (periodType === "quarterly") {
      const prevQuarter = quarter > 1 ? quarter - 1 : 4;
      prevPeriodKey = `quarterly_${prevQuarter}`;
    } else if (periodType === "weekly") {
      const prevW = week > 1 ? week - 1 : 4;
      prevPeriodKey = `weekly_${month}_${prevW}`;
    } else {
      prevPeriodKey = `yearly_${year - 1}`;
    }

    const prevRecordMap = new Map<string, any>();
    if (currKpiRecords.length > 0) {
      try {
        const prevKpiRecords = await prisma.kpiData.findMany({
          where: {
            unitCode,
            indicatorCode: { in: ["M1", "M2", "M3", "M4", "M5", "M6", "M7"] },
            periodKey: prevPeriodKey,
            productCode: null,
          },
        });
        for (const r of prevKpiRecords) {
          prevRecordMap.set(r.indicatorCode, r);
        }
      } catch (e) {}
    }

    // 4. Kết hợp dữ liệu tĩnh và dữ liệu DB
    const keys = ["M1", "M2", "M3", "M4", "M5", "M6", "M7"];
    const points = keys.map((mCode) => {
      const staticPoint = staticData.points.find((p) => p.code === mCode);
      const currRec = currRecordMap.get(mCode);

      let currVal = staticPoint ? staticPoint["Kỳ này"] : 80;
      if (currRec !== undefined) {
        if (currRec.isOverridden || currRec.actualValue <= 500) {
          currVal = currRec.actualValue;
        } else if (currRec.targetValue > 0) {
          currVal = Math.min(130, Math.round((currRec.actualValue / currRec.targetValue) * 1000) / 10);
        } else {
          currVal = currRec.actualValue;
        }
      }

      const calculatedVal = currRec !== undefined ? (currRec.targetValue > 500 ? currVal : currRec.targetValue) : currVal;
      const explanation = currRec !== undefined ? currRec.explanation : "";
      const isOverridden = currRec !== undefined ? currRec.isOverridden : false;

      let prevVal = staticPoint ? staticPoint["Kỳ trước"] : 80;
      const prevRec = prevRecordMap.get(mCode);
      if (prevRec !== undefined) {
        if (prevRec.isOverridden || prevRec.actualValue <= 500) {
          prevVal = prevRec.actualValue;
        } else if (prevRec.targetValue > 0) {
          prevVal = Math.min(130, Math.round((prevRec.actualValue / prevRec.targetValue) * 1000) / 10);
        } else {
          prevVal = prevRec.actualValue;
        }
      }

      return {
        subject: staticPoint ? staticPoint.subject : mCode,
        code: mCode,
        "Kỳ này": currVal,
        "Kỳ trước": prevVal,
        change: Math.round((currVal - prevVal) * 10) / 10,
        calculatedVal,
        explanation,
        isOverridden,
      };
    });

    return NextResponse.json({
      unitName: staticData.unitName,
      labelCurr: staticData.labelCurr,
      labelPrev: staticData.labelPrev,
      points,
    }, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
  } catch (error: any) {
    console.error("Lỗi lấy dữ liệu radar:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const operator = request.headers.get("x-operator-email") || "system@s-connect.net";
    const body = await request.json();
    const { unitCode, periodType, periodKey, scores } = body;

    if (!unitCode || !periodType || !periodKey || !scores || !Array.isArray(scores)) {
      return NextResponse.json({ error: "Thiếu dữ liệu lưu trữ" }, { status: 400 });
    }

    const objectiveNames: Record<string, string> = {
      M1: "Tài chính",
      M2: "Sản phẩm/ SX",
      M3: "Khách hàng",
      M4: "Thương hiệu và Kênh KD",
      M5: "QT Vận hành",
      M6: "Nhân sự",
      M7: "Văn hóa",
    };

    const savedRecords = [];

    for (const item of scores) {
      const { code, value, calculatedVal, explanation } = item;
      if (!["M1", "M2", "M3", "M4", "M5", "M6", "M7"].includes(code)) continue;

      const finalValue = parseFloat(value) || 0;
      const calcValue = parseFloat(calculatedVal) || 0;
      const notes = explanation || "";

      // Xem là đã bị ghi đè thủ công
      const isOverridden = true;

      const existing = await prisma.kpiData.findFirst({
        where: {
          unitCode,
          indicatorCode: code,
          periodKey,
          periodType,
          productCode: null,
        },
      });

      if (existing) {
        const updated = await prisma.kpiData.update({
          where: { id: existing.id },
          data: {
            actualValue: finalValue,
            targetValue: calcValue, // Lưu giá trị tạm tính vào targetValue
            explanation: notes,
            isOverridden,
            status: "Đã duyệt",
          },
        });
        savedRecords.push(updated);
      } else {
        const created = await prisma.kpiData.create({
          data: {
            unitCode,
            indicatorCode: code,
            periodKey,
            periodType,
            targetValue: calcValue,
            actualValue: finalValue,
            explanation: notes,
            title: objectiveNames[code] || code,
            unit: "%",
            status: "Đã duyệt",
            isOverridden,
          },
        });
        savedRecords.push(created);
      }
    }

    await createAuditLog(
      operator,
      "UPDATE",
      "kpi",
      `Ghi đè thủ công điểm 7 mục tiêu cho đơn vị ${unitCode} kỳ ${periodKey} (${periodType})`
    );

    return NextResponse.json({ message: "Lưu điểm mục tiêu thành công", data: savedRecords });
  } catch (error: any) {
    console.error("Lỗi lưu điểm radar:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
