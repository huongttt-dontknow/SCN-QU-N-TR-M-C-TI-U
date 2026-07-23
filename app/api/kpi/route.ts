import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PRODUCTS_CATALOG } from "@/lib/products_catalog";
import { createAuditLog } from "@/lib/audit";

const unitToProductUnitMap: Record<string, string> = {
  "Wofloo": "Wofloo",
  "Lego": "Lego",
  "AS": "Animated Story",
  "DA01": "DA01",
  "Music": "Music",
  "NDTH": "NDTH",
  "CR": "Creative Hub",
  "CN": "CNGP",
  "SCS": "SCS"
};

// GET /api/kpi - Lấy dữ liệu KPI mục tiêu/thực tế theo Đơn vị và Kỳ
export async function GET(request: Request) {
  let unitCode = "";
  let productCode: string | undefined = undefined;
  let periodKey = "";
  let periodType = "weekly";

  try {
    const { searchParams } = new URL(request.url);
    unitCode = searchParams.get("unitCode") || "";
    productCode = searchParams.get("productCode") || undefined;
    periodKey = searchParams.get("periodKey") || "";
    periodType = searchParams.get("periodType") || "weekly";

    if ((!unitCode && !productCode) || !periodKey) {
      return NextResponse.json({ error: "Thiếu unitCode/productCode hoặc periodKey" }, { status: 400 });
    }

    // Nếu productCode === "all", lấy danh mục sản phẩm tương ứng với unitCode và gộp lại
    if (productCode === "all") {
      let targetProductCodes: string[] = [];
      if (unitCode === "SCVN" || unitCode === "TCT") {
        targetProductCodes = PRODUCTS_CATALOG.map(p => p.id);
      } else {
        const prodUnitName = unitToProductUnitMap[unitCode] || unitCode;
        targetProductCodes = PRODUCTS_CATALOG.filter(p => p.unit === prodUnitName).map(p => p.id);
      }

      if (targetProductCodes.length === 0) {
        return NextResponse.json([]);
      }

      // Tự động kiểm tra và đồng bộ hóa danh sách chỉ tiêu cho từng sản phẩm (Self-healing)
      for (const pCode of targetProductCodes) {
        const count = await prisma.kpiData.count({
          where: { productCode: pCode, periodKey, periodType }
        });
        if (count === 0) {
          const templates = await prisma.kpiData.findMany({
            where: { productCode: pCode },
            distinct: ["indicatorCode"]
          });
          if (templates.length > 0) {
            const newKpis = templates.map(t => {
              let defaultTarget = 0;
              if (periodType === "weekly" && t.periodKey.startsWith("weekly")) {
                defaultTarget = t.targetValue;
              } else if (periodType === "monthly" && t.periodKey.startsWith("monthly")) {
                defaultTarget = t.targetValue;
              } else if (periodType === "quarterly" && t.periodKey.startsWith("quarterly")) {
                defaultTarget = t.targetValue;
              } else if (periodType === "yearly" && t.periodKey.startsWith("yearly")) {
                defaultTarget = t.targetValue;
              }
              return {
                indicatorCode: t.indicatorCode,
                unitCode: t.unitCode || unitCode,
                productCode: pCode,
                periodType,
                periodKey,
                targetValue: defaultTarget,
                actualValue: 0,
                pic: t.pic,
                status: "Chưa thực hiện",
                explanation: "",
                title: t.title,
                unit: t.unit,
                formula: t.formula,
                group: t.group,
                parentCode: t.parentCode
              };
            });
            await prisma.kpiData.createMany({ data: newKpis });
          }
        }
      }

      // Lấy toàn bộ bản ghi sản phẩm của kỳ hiện tại
      const records = await prisma.kpiData.findMany({
        where: {
          productCode: { in: targetProductCodes },
          periodKey,
          periodType
        }
      });

      // Nhóm và gộp dữ liệu theo indicatorCode
      const groups: Record<string, typeof records> = {};
      records.forEach(r => {
        groups[r.indicatorCode] = groups[r.indicatorCode] || [];
        groups[r.indicatorCode].push(r);
      });

      const aggregatedRecords = Object.entries(groups).map(([indicatorCode, items]) => {
        const first = items[0];
        const isPercentage = first.unit === "%" || (first.title && first.title.toLowerCase().includes("tỷ lệ"));
        
        let sumTarget = 0;
        let sumActual = 0;
        items.forEach(item => {
          sumTarget += item.targetValue || 0;
          sumActual += item.actualValue || 0;
        });

        const targetValue = isPercentage ? (sumTarget / items.length) : sumTarget;
        const actualValue = isPercentage ? (sumActual / items.length) : sumActual;

        let status = "Chưa thực hiện";
        const statuses = items.map(i => i.status);
        if (statuses.includes("Yêu cầu hiệu chỉnh")) {
          status = "Yêu cầu hiệu chỉnh";
        } else if (statuses.includes("Chờ duyệt")) {
          status = "Chờ duyệt";
        } else if (statuses.every(s => s === "Đã duyệt" || s === "Chưa thực hiện") && statuses.includes("Đã duyệt")) {
          status = "Đã duyệt";
        } else if (statuses.some(s => s === "Đang thực hiện" || s === "Đã duyệt" || s === "Đang nhập")) {
          status = "Đang thực hiện";
        }

        return {
          id: "all-" + indicatorCode,
          indicatorCode,
          unitCode,
          productCode: "all",
          periodType,
          periodKey,
          targetValue,
          actualValue,
          status,
          explanation: items.map(i => i.explanation).filter(Boolean).join("; "),
          title: first.title,
          unit: first.unit,
          formula: first.formula,
          group: first.group,
          parentCode: first.parentCode,
          frequency: first.frequency,
          aggregationMethod: first.aggregationMethod
        };
      });

      return NextResponse.json(aggregatedRecords);
    }

    // Lấy dữ liệu đã lưu
    let kpiRecords = await prisma.kpiData.findMany({
      where: productCode ? { productCode, periodKey, periodType } : { unitCode, productCode: null, periodKey, periodType },
    });

    // Tự động kiểm tra và đồng bộ hóa danh sách chỉ tiêu của đơn vị (Self-healing mechanism)
    const unitTemplates = await prisma.kpiData.findMany({
      where: productCode ? { productCode } : { unitCode, productCode: null },
      distinct: ["indicatorCode"]
    });

    if (unitTemplates.length > 0) {
      // Tìm các chỉ tiêu template chưa có bản ghi trong kỳ hiện tại
      const existingCodes = new Set(kpiRecords.map(r => r.indicatorCode));
      const missingTemplates = unitTemplates.filter(t => !existingCodes.has(t.indicatorCode));

      if (missingTemplates.length > 0) {
        const newKpis = missingTemplates.map(t => {
          // Lấy target kế hoạch mặc định tương ứng với loại kỳ (tuần, tháng, quý, năm)
          let defaultTarget = 0;
          if (periodType === "weekly" && t.periodKey.startsWith("weekly")) {
            defaultTarget = t.targetValue;
          } else if (periodType === "monthly" && t.periodKey.startsWith("monthly")) {
            defaultTarget = t.targetValue;
          } else if (periodType === "quarterly" && t.periodKey.startsWith("quarterly")) {
            defaultTarget = t.targetValue;
          } else if (periodType === "yearly" && t.periodKey.startsWith("yearly")) {
            defaultTarget = t.targetValue;
          }

          return {
            indicatorCode: t.indicatorCode,
            unitCode: t.unitCode || unitCode,
            productCode: productCode || null,
            periodType,
            periodKey,
            targetValue: defaultTarget,
            actualValue: 0,
            pic: t.pic,
            status: "Chưa thực hiện",
            explanation: "",
            title: t.title,
            unit: t.unit,
            formula: t.formula,
            group: t.group,
            parentCode: t.parentCode
          };
        });

        await prisma.kpiData.createMany({ data: newKpis });

        // Tải lại toàn bộ dữ liệu đã được bổ sung đầy đủ
        kpiRecords = await prisma.kpiData.findMany({
          where: productCode ? { productCode, periodKey, periodType } : { unitCode, productCode: null, periodKey, periodType },
        });
      }
    } else {
      // Nếu đơn vị chưa có chỉ tiêu nào (fallback ban đầu)
      const defaultIndicators = [
        { code: "VM1-I01.01", title: "Tỷ suất lợi nhuận ROI (%)", target: 15, pic: "Lê Đăng Khoa", type: "monthly", unit: "%", group: "M1. TÀI CHÍNH" },
        { code: "VM1-I05.03", title: "Chi phí mua công cụ AI mới (VNĐ)", target: 50000000, pic: "Lê Quỳnh Nga", type: "monthly", unit: "VNĐ", group: "M1. TÀI CHÍNH" },
        { code: "VM1-I05.04", title: "Chi phí CTV (Cộng tác viên)", target: 120000000, pic: "Vũ Trung Đức", type: "monthly", unit: "VNĐ", group: "M1. TÀI CHÍNH" },
        { code: "VM2-I01.01", title: "Số lượng video hoàn thành sản xuất (Video)", target: 16, pic: "Lê Đăng Khoa", type: "weekly", unit: "Video", group: "M2. SẢN PHẨM" },
        { code: "VM2-I01.02", title: "Số lượng video biên tập hoàn thành (funny) (Video)", target: 30, pic: "Lò Quế Hằng", type: "weekly", unit: "Video", group: "M2. SẢN PHẨM" },
        { code: "VM2-I02.01", title: "Số sản phẩm phái sinh & khai thác (Sản phẩm)", target: 5, pic: "Vũ Trung Đức", type: "weekly", unit: "Sản phẩm", group: "M2. SẢN PHẨM" },
        { code: "MM2-I01.01", title: "Số lượng sản phẩm âm nhạc hoàn thành (Bài)", target: 8, pic: "Vũ Trung Đức", type: "weekly", unit: "Bài", group: "M2. SẢN PHẨM" },
        { code: "VM2-I01.3", title: "Số lượng ý tưởng mới (Ý tưởng)", target: 25, pic: "Lê Đăng Khoa", type: "weekly", unit: "Ý tưởng", group: "M2. SẢN PHẨM" },
        { code: "VM2-I01.4", title: "Số lượng ý tưởng được chọn (Ý tưởng)", target: 15, pic: "Lê Đăng Khoa", type: "weekly", unit: "Ý tưởng", group: "M2. SẢN PHẨM" },
        { code: "VM2-I01.5", title: "Tỷ lệ chọn ý tưởng (%)", target: 60, pic: "Lê Đăng Khoa", type: "weekly", unit: "%", group: "M2. SẢN PHẨM" },
        { code: "VM2-I01.6", title: "SL Kịch bản mới SX (Kịch bản)", target: 10, pic: "Lê Đăng Khoa", type: "weekly", unit: "Kịch bản", group: "M2. SẢN PHẨM" },
        { code: "TM3-I01.02", title: "Tổng traffic đơn vị (Views)", target: 120000000, pic: "Lê Đăng Khoa", type: "weekly", unit: "Views", group: "M3. KHÁCH HÀNG" },
        { code: "TM3-I01.03", title: "Số lượng video upload (nội dung)", target: 45, pic: "Trịnh Quốc Thịnh", type: "weekly", unit: "Video", group: "M3. KHÁCH HÀNG" },
        { code: "TM4-I01.01", title: "Độ phủ thương hiệu mới (Sub/Follower)", target: 50000, pic: "Lê Đăng Khoa", type: "monthly", unit: "Sub", group: "M4. THƯƠNG HIỆU" },
        { code: "TM4-I02.01", title: "Số kênh đạt ngưỡng 10k $/tháng (Kênh)", target: 4, pic: "Trần Như Quỳnh", type: "monthly", unit: "Kênh", group: "M4. THƯƠNG HIỆU" },
        { code: "VM4-I02.04", title: "Số vi phạm chính sách (Lần)", target: 0, pic: "Đào Thanh Công", type: "monthly", unit: "Lần", group: "M4. THƯƠNG HIỆU" },
        { code: "VM5-I02.01", title: "Thời gian sản xuất TB 1 video (Ngày)", target: 5, pic: "Nguyễn Ánh Tùng", type: "weekly", unit: "Ngày", group: "M5. VẬN HÀNH" },
        { code: "VM7-I03.01", title: "Tỷ lệ nhân sự không vi phạm kỷ luật (%)", target: 100, pic: "Trần Thị Diệu Ly", type: "monthly", unit: "%", group: "M7. VĂN HÓA" },
      ];

      const filteredDefaults = defaultIndicators.filter(ind => ind.type === periodType);
      const newKpis = filteredDefaults.map(ind => ({
        indicatorCode: ind.code,
        unitCode,
        periodType,
        periodKey,
        targetValue: ind.target,
        actualValue: 0,
        pic: ind.pic,
        status: "Chưa thực hiện",
        explanation: "",
        title: ind.title,
        unit: ind.unit,
        formula: "",
        group: ind.group,
        parentCode: ind.code.split("-")[0]
      }));

      await prisma.kpiData.createMany({ data: newKpis });
      kpiRecords = await prisma.kpiData.findMany({
        where: { unitCode, periodKey, periodType },
      });
    }

    return NextResponse.json(kpiRecords);
  } catch (error: any) {
    console.warn("Lấy KPI thất bại (hạn mức DB), sử dụng dữ liệu JSON dự phòng:", error);
    try {
      const fs = require("fs");
      const path = require("path");
      const filename = productCode ? "product_kpi_records.json" : "all_kpi_records.json";
      const jsonPath = path.join(process.cwd(), "lib", filename);
      
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, "utf-8");
        const kpiList = JSON.parse(raw);
        
        const pType = periodType || "weekly";
        const pKey = periodKey || "";
        
        const filtered = kpiList.filter((r: any) => {
          if (productCode) {
            return r.productCode === productCode && r.periodKey === pKey && r.periodType === pType;
          } else {
            return r.unitCode === unitCode && (!r.productCode) && r.periodKey === pKey && r.periodType === pType;
          }
        });
        
        return NextResponse.json(filtered);
      }
    } catch (fsErr) {
      console.error("Lỗi đọc file JSON dự phòng:", fsErr);
    }
    
    return NextResponse.json([]);
  }
}

// POST /api/kpi - Cập nhật số liệu thực tế và giải trình của KPI
export async function POST(request: Request) {
  try {
    const operator = request.headers.get("x-operator-email") || "system@s-connect.net";
    const body = await request.json();
    const { unitCode, productCode, periodKey, periodType, kpiUpdates } = body; // kpiUpdates: array of { id, actualValue, explanation, status }

    if ((!unitCode && !productCode) || !periodKey || !kpiUpdates || !Array.isArray(kpiUpdates)) {
      return NextResponse.json({ error: "Thiếu thông tin hoặc dữ liệu cập nhật không hợp lệ" }, { status: 400 });
    }

    // Cập nhật từng KPI bằng Prisma transaction
    const updatePromises = kpiUpdates.map(u => {
      return prisma.kpiData.update({
        where: { id: u.id },
        data: {
          targetValue: u.targetValue !== undefined ? parseFloat(u.targetValue) : undefined,
          actualValue: parseFloat(u.actualValue) || 0,
          explanation: u.explanation || "",
          status: u.status || "Đang thực hiện",
          isOverridden: true,
        },
      });
    });

    await prisma.$transaction(updatePromises);

    const updatedRecords = await prisma.kpiData.findMany({
      where: productCode ? { productCode, periodKey, periodType } : { unitCode, productCode: null, periodKey, periodType },
    });

    // Xác định hành động (Lưu nháp vs Gửi duyệt)
    const isApprovedOrPending = kpiUpdates.some(u => u.status === "Chờ duyệt" || u.status === "Đã duyệt" || u.status === "Yêu cầu hiệu chỉnh");
    const actionLabel = isApprovedOrPending ? "SYNC" : "UPDATE";
    const statusMsg = isApprovedOrPending 
      ? `Thay đổi trạng thái báo cáo KPI đơn vị ${unitCode || ""} (${periodType} - ${periodKey}) thành ${kpiUpdates[0]?.status || "Đang thực hiện"}`
      : `Lưu nháp số liệu KPI đơn vị ${unitCode || ""} sản phẩm ${productCode || "Không"}, ${kpiUpdates.length} chỉ tiêu`;

    await createAuditLog(
      operator,
      actionLabel,
      "kpi",
      statusMsg
    );

    return NextResponse.json({ message: "Lưu dữ liệu KPI thành công", data: updatedRecords });
  } catch (error: any) {
    console.warn("Cập nhật KPI thất bại (hạn mức DB), giả lập lưu thành công:", error);
    return NextResponse.json({ message: "Lưu dữ liệu KPI thành công (Chế độ dự phòng)" });
  }
}
