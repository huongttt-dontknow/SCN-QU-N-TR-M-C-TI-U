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
    const quarter = Number(searchParams.get("quarter")) || 3;
    const year = Number(searchParams.get("year")) || 2026;

    // 1. Lấy dữ liệu tĩnh để làm fallback/so sánh lịch sử
    const staticData = getRadarScores(unitCode, periodType, month, quarter, year);

    // 2. Xác định xem kỳ này có phải kỳ động (từ tháng 7/2026 trở đi) không
    const isCurrDynamic =
      year > 2026 ||
      (year === 2026 &&
        (periodType === "yearly" ||
          (periodType === "monthly" && month >= 7) ||
          (periodType === "quarterly" && quarter >= 3)));

    if (!isCurrDynamic) {
      // Trả về dữ liệu tĩnh cho các kỳ trước Tháng 7/2026
      return NextResponse.json(staticData);
    }

    // 3. Kỳ này là kỳ động -> Cần đọc từ DB
    const currPeriodKey =
      periodType === "monthly"
        ? `monthly_${month}`
        : periodType === "quarterly"
        ? `quarterly_${quarter}`
        : `yearly_${year}`;

    // Lấy các bản ghi M1-M7 của kỳ hiện tại
    const currKpiRecords = await prisma.kpiData.findMany({
      where: {
        unitCode,
        indicatorCode: { in: ["M1", "M2", "M3", "M4", "M5", "M6", "M7"] },
        periodKey: currPeriodKey,
        periodType,
        productCode: null,
      },
    });

    const currRecordMap = new Map<string, any>();
    for (const r of currKpiRecords) {
      currRecordMap.set(r.indicatorCode, r);
    }

    // 4. Xác định xem kỳ trước có phải kỳ động không
    let isPrevDynamic = false;
    let prevPeriodKey = "";
    if (periodType === "monthly") {
      const prevMonth = month > 1 ? month - 1 : 12;
      const prevYear = month > 1 ? year : year - 1;
      isPrevDynamic = prevYear > 2026 || (prevYear === 2026 && prevMonth >= 7);
      prevPeriodKey = `monthly_${prevMonth}`;
    } else if (periodType === "quarterly") {
      const prevQuarter = quarter > 1 ? quarter - 1 : 4;
      const prevYear = quarter > 1 ? year : year - 1;
      isPrevDynamic = prevYear > 2026 || (prevYear === 2026 && prevQuarter >= 3);
      prevPeriodKey = `quarterly_${prevQuarter}`;
    } else {
      const prevYear = year - 1;
      isPrevDynamic = prevYear >= 2026;
      prevPeriodKey = `yearly_${prevYear}`;
    }

    // Lấy các bản ghi M1-M7 của kỳ trước (nếu là kỳ động)
    const prevRecordMap = new Map<string, any>();
    if (isPrevDynamic) {
      const prevKpiRecords = await prisma.kpiData.findMany({
        where: {
          unitCode,
          indicatorCode: { in: ["M1", "M2", "M3", "M4", "M5", "M6", "M7"] },
          periodKey: prevPeriodKey,
          periodType,
          productCode: null,
      },
      });
      for (const r of prevKpiRecords) {
        prevRecordMap.set(r.indicatorCode, r);
      }
    }

    // 5. Kết hợp dữ liệu tĩnh và dữ liệu DB
    const keys = ["M1", "M2", "M3", "M4", "M5", "M6", "M7"];
    const points = keys.map((mCode) => {
      const staticPoint = staticData.points.find((p) => p.code === mCode);
      const currRec = currRecordMap.get(mCode);

      // Điểm kỳ này: Ưu tiên DB (tính % hoàn thành từ target/actual), fallback dữ liệu tĩnh
      let currVal = staticPoint ? staticPoint["Kỳ này"] : 80;
      if (currRec !== undefined) {
        if (currRec.targetValue > 0 && (currRec.actualValue > 500 || currRec.targetValue > 500)) {
          currVal = Math.min(130, Math.round((currRec.actualValue / currRec.targetValue) * 1000) / 10);
        } else {
          currVal = currRec.actualValue;
        }
      }

      const calculatedVal = currRec !== undefined ? (currRec.targetValue > 500 ? currVal : currRec.targetValue) : currVal;
      const explanation = currRec !== undefined ? currRec.explanation : "";
      const isOverridden = currRec !== undefined ? currRec.isOverridden : false;

      // Điểm kỳ trước: Nếu kỳ trước là động, đọc từ DB, ngược lại lấy từ staticPoint
      let prevVal = staticPoint ? staticPoint["Kỳ trước"] : 80;
      if (isPrevDynamic) {
        const prevRec = prevRecordMap.get(mCode);
        if (prevRec !== undefined) {
          if (prevRec.targetValue > 0 && (prevRec.actualValue > 500 || prevRec.targetValue > 500)) {
            prevVal = Math.min(130, Math.round((prevRec.actualValue / prevRec.targetValue) * 1000) / 10);
          } else {
            prevVal = prevRec.actualValue;
          }
        }
      }

      return {
        subject: staticPoint ? staticPoint.subject : mCode,
        code: mCode,
        "Kỳ này": currVal,
        "Kỳ trước": prevVal,
        change: Math.round((currVal - prevVal) * 10) / 10,
        calculatedVal, // Kết quả tạm tính (Cột 2)
        explanation, // Ghi chú (Cột 4)
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
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300"
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
