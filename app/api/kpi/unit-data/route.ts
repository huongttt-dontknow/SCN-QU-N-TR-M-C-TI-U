import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitCode = searchParams.get("unitCode");
    const month = parseInt(searchParams.get("month") || "7");
    const week = parseInt(searchParams.get("week") || "1");
    const quarter = searchParams.get("quarter") || "Q3";
    const year = searchParams.get("year") || "2026";

    if (!unitCode) {
      return NextResponse.json({ error: "Thiếu unitCode" }, { status: 400 });
    }

    // Lấy toàn bộ bản ghi KPI của đơn vị trong năm
    const records = await prisma.kpiData.findMany({
      where: { unitCode }
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

    // Khởi tạo các nhóm cha trong compiledRows
    for (const [gCode, gName] of Object.entries(groupNameMap)) {
      compiledRows[gCode] = {
        code: gCode,
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
      if (!compiledRows[code]) {
        let parentCode = r.parentCode;
        if (!parentCode || parentCode === "") {
          // Lấy mã group từ prefix của group trường dữ liệu (ví dụ: "M1. TÀI CHÍNH" -> "M1")
          const groupPrefix = r.group ? r.group.split(".")[0].trim() : "M1";
          parentCode = groupPrefix;
        }

        compiledRows[code] = {
          code: code,
          title: r.title || code,
          unit: r.unit || "",
          targetWeek: 0, actualWeek: 0,
          targetMonth: 0, actualMonth: 0,
          targetQuarter: 0, actualQuarter: 0,
          targetYear: 0, actualYear: 0,
          isParent: false,
          parentCode: parentCode
        };
      }

      const pKey = r.periodKey;
      if (pKey === targetWeekKey) {
        compiledRows[code].targetWeek = r.targetValue;
        compiledRows[code].actualWeek = r.actualValue;
      } else if (pKey === targetMonthKey) {
        compiledRows[code].targetMonth = r.targetValue;
        compiledRows[code].actualMonth = r.actualValue;
      } else if (pKey === targetQuarterKey || pKey === `quarterly_${quarter}`) {
        compiledRows[code].targetQuarter = r.targetValue;
        compiledRows[code].actualQuarter = r.actualValue;
      } else if (pKey === targetYearKey) {
        compiledRows[code].targetYear = r.targetValue;
        compiledRows[code].actualYear = r.actualValue;
      }
    }

    // Xác định xem chỉ tiêu nào có chỉ tiêu con thì mark isParent = true
    const allRows = Object.values(compiledRows);
    for (const row of allRows) {
      if (row.code !== "M1" && row.code !== "M2" && row.code !== "M3" && row.code !== "M4" && row.code !== "M5" && row.code !== "M6" && row.code !== "M7") {
        const hasChildren = allRows.some(r => r.parentCode === row.code);
        if (hasChildren) {
          row.isParent = true;
        }
      }
    }

    // Tự động tính gộp dữ liệu từ con lên cha cho các chỉ tiêu cha hoặc nhóm cha
    // Để đơn giản và trực quan, ta thực hiện tính tổng doanh thu/sản lượng cho nhóm M1, M2, M3 từ các con trực tiếp
    for (const gCode of ["M1", "M2", "M3", "M4", "M5", "M6", "M7"]) {
      const children = allRows.filter(r => r.parentCode === gCode);
      const parent = compiledRows[gCode];
      for (const child of children) {
        // Chỉ tính gộp cộng dồn nếu đơn vị tính tương thích và là chỉ tiêu trực tiếp (không tính tỷ lệ % hoặc ngày)
        if (child.unit === "VNĐ" || child.unit === "Nội dung" || child.unit === "Video" || child.unit === "Views" || child.unit === "Lượt") {
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
      
      // Nếu nhóm cha vẫn bằng 0 (ví dụ M5, M6, M7 không cộng dồn tổng), gán tạm giá trị tượng trưng hoặc giữ nguyên
      if (parent.targetWeek === 0 && children.length > 0) {
        // Lấy giá trị của con đầu tiên hoặc trung bình
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
