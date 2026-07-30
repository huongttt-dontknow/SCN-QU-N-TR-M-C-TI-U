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

let cachedProductMetadataMap: Record<string, any> | null = null;
let cachedUnitMetadataMap: Record<string, any> | null = null;

function getMetadataMap(productCode: string | undefined): Record<string, any> {
  if (productCode) {
    if (cachedProductMetadataMap) return cachedProductMetadataMap;
    const map: Record<string, any> = {};
    try {
      const fs = require("fs");
      const path = require("path");
      const jsonPath = path.join(process.cwd(), "lib", "product_kpi_records.json");
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, "utf-8");
        const jsonRecords = JSON.parse(raw);
        for (const jr of jsonRecords) {
          const code = jr.indicatorCode;
          if (code && jr.title) {
            if (!map[code] || jr.title.length > (map[code].title || "").length) {
              map[code] = {
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
      console.warn("Lỗi load product metadata:", e);
    }
    cachedProductMetadataMap = map;
    return map;
  } else {
    if (cachedUnitMetadataMap) return cachedUnitMetadataMap;
    const map: Record<string, any> = {};
    try {
      const fs = require("fs");
      const path = require("path");
      const jsonPath = path.join(process.cwd(), "lib", "all_kpi_records.json");
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, "utf-8");
        const jsonRecords = JSON.parse(raw);
        for (const jr of jsonRecords) {
          const code = jr.indicatorCode;
          if (code && jr.title) {
            if (!map[code] || jr.title.length > (map[code].title || "").length) {
              map[code] = {
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
      console.warn("Lỗi load unit metadata:", e);
    }
    cachedUnitMetadataMap = map;
    return map;
  }
}

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
      let records = await prisma.kpiData.findMany({
        where: {
          productCode: { in: targetProductCodes },
          periodKey,
          periodType
        }
      });

      if (records.length === 0) {
        try {
          const fs = require("fs");
          const path = require("path");
          const jsonPath = path.join(process.cwd(), "lib", "product_kpi_records.json");
          if (fs.existsSync(jsonPath)) {
            const raw = fs.readFileSync(jsonPath, "utf-8");
            const kpiList = JSON.parse(raw);
            records = kpiList.filter((r: any) => 
              targetProductCodes.includes(r.productCode) && 
              r.periodKey === periodKey && 
              r.periodType === periodType
            ).map((r: any) => ({
              ...r,
              id: r.id || `${r.unitCode}-${r.productCode}-${r.indicatorCode}-${r.periodKey}`
            }));
          }
        } catch (err) {
          console.error("Lỗi đọc JSON dự phòng cho sản phẩm:", err);
        }
      }

      const aggregate = searchParams.get("aggregate") ?? "true";
      if (aggregate === "false") {
        return NextResponse.json(records);
      }

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

        const meta = getMetadataMap(productCode)[indicatorCode] || {};
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
          title: meta.title || first.title || indicatorCode,
          unit: meta.unit || first.unit || "",
          formula: first.formula,
          group: first.group || meta.group,
          parentCode: first.parentCode || meta.parentCode,
          frequency: first.frequency || meta.frequency,
          aggregationMethod: first.aggregationMethod || meta.aggregationMethod
        };
      });

      return NextResponse.json(aggregatedRecords);
    }

    // Lấy dữ liệu đã lưu
    let kpiRecords = await prisma.kpiData.findMany({
      where: productCode ? { productCode, periodKey, periodType } : { unitCode, productCode: null, periodKey, periodType },
    });

    if (kpiRecords.length === 0 && productCode) {
      try {
        const fs = require("fs");
        const path = require("path");
        const jsonPath = path.join(process.cwd(), "lib", "product_kpi_records.json");
        if (fs.existsSync(jsonPath)) {
          const raw = fs.readFileSync(jsonPath, "utf-8");
          const kpiList = JSON.parse(raw);
          kpiRecords = kpiList.filter((r: any) => 
            r.productCode === productCode && 
            r.periodKey === periodKey && 
            r.periodType === periodType
          ).map((r: any) => ({
            ...r,
            id: r.id || `${r.unitCode}-${r.productCode}-${r.indicatorCode}-${r.periodKey}`
          }));
        }
      } catch (err) {
        console.error("Lỗi đọc JSON dự phòng cho một sản phẩm:", err);
      }
    }

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

    const metaMap = getMetadataMap(productCode);
    const enrichedRecords = kpiRecords.map((r: any) => {
      const code = r.indicatorCode;
      const meta = metaMap[code] || {};
      
      let title = r.title;
      if (!title || title === code || (meta.title && meta.title !== code)) {
        title = meta.title || title || code;
      }
      
      let unit = r.unit;
      if (!unit || (meta.unit && unit === "")) {
        unit = meta.unit || unit || "";
      }

      let group = r.group;
      if (!group || group === "") {
        group = meta.group || group || "";
      }

      let parentCode = r.parentCode;
      if (!parentCode || parentCode === "") {
        parentCode = meta.parentCode || parentCode || "";
      }

      return {
        ...r,
        title,
        unit,
        group,
        parentCode
      };
    });

    return NextResponse.json(enrichedRecords);
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
        }).map((r: any) => ({
          ...r,
          id: r.id || `${r.unitCode}-${r.productCode || "unit"}-${r.indicatorCode}-${r.periodKey}`
        }));
        
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
  let unitCode = "";
  let productCode: string | null = null;
  let periodKey = "";
  let periodType = "weekly";
  let kpiUpdates: any[] = [];
  let operator = "system@s-connect.net";

  try {
    operator = request.headers.get("x-operator-email") || "system@s-connect.net";
    const body = await request.json();
    unitCode = body.unitCode || "";
    productCode = body.productCode || null;
    periodKey = body.periodKey || "";
    periodType = body.periodType || "weekly";
    kpiUpdates = body.kpiUpdates || [];

    if ((!unitCode && !productCode) || !periodKey || !kpiUpdates || !Array.isArray(kpiUpdates)) {
      return NextResponse.json({ error: "Thiếu thông tin hoặc dữ liệu cập nhật không hợp lệ" }, { status: 400 });
    }

    // Cập nhật từng KPI tuần tự để hỗ trợ tự động sửa lỗi lệch ID và tạo mới
    for (const u of kpiUpdates) {
      let record = null;
      const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(u.id);
      
      if (isUuid) {
        record = await prisma.kpiData.findUnique({ where: { id: u.id } });
      }
      
      if (!record && u.indicatorCode) {
        record = await prisma.kpiData.findFirst({
          where: {
            unitCode,
            productCode: (productCode && productCode !== "all") ? productCode : null,
            indicatorCode: u.indicatorCode,
            periodKey,
            periodType
          }
        });
      }

      const updateData = {
        targetValue: u.targetValue !== undefined ? parseFloat(u.targetValue) : undefined,
        actualValue: parseFloat(u.actualValue) || 0,
        explanation: u.explanation || "",
        status: u.status || "Đang thực hiện",
        isOverridden: true,
      };

      if (record) {
        await prisma.kpiData.update({
          where: { id: record.id },
          data: updateData,
        });
      } else {
        // Tạo mới bản ghi nếu chưa tồn tại
        await prisma.kpiData.create({
          data: {
            id: isUuid ? u.id : undefined,
            indicatorCode: u.indicatorCode,
            unitCode,
            productCode: (productCode && productCode !== "all") ? productCode : null,
            periodType,
            periodKey,
            targetValue: u.targetValue !== undefined ? parseFloat(u.targetValue) : 0,
            actualValue: parseFloat(u.actualValue) || 0,
            explanation: u.explanation || "",
            status: u.status || "Đang thực hiện",
            isOverridden: true,
          }
        });
      }
    }

    const updatedRecords = await prisma.kpiData.findMany({
      where: (productCode && productCode !== "all") ? { productCode, periodKey, periodType } : { unitCode, productCode: null, periodKey, periodType },
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

    // Đồng bộ chéo dữ liệu và cộng dồn tự động (Record Rollup & Aggregation)
    try {
      await syncKpisBetweenUnits(periodKey, periodType);
    } catch (syncErr) {
      console.error("Lỗi đồng bộ chéo KPI giữa các đơn vị:", syncErr);
    }

    return NextResponse.json({ message: "Lưu dữ liệu KPI thành công", data: updatedRecords });
  } catch (error: any) {
    console.warn("Cập nhật KPI thất bại (hạn mức DB), sử dụng dữ liệu JSON dự phòng:", error);
    try {
      const fs = require("fs");
      const path = require("path");
      const filename = (productCode && productCode !== "all") ? "product_kpi_records.json" : "all_kpi_records.json";
      const jsonPath = path.join(process.cwd(), "lib", filename);
      
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, "utf-8");
        let kpiList = JSON.parse(raw);
        
        let updatedCount = 0;
        kpiUpdates.forEach((u: any) => {
          const item = kpiList.find((r: any) => {
            const matchId = r.id === u.id;
            const matchComposite = r.indicatorCode === u.indicatorCode &&
                                  r.unitCode === unitCode &&
                                  r.periodKey === periodKey &&
                                  r.periodType === periodType &&
                                  ((productCode && productCode !== "all") ? r.productCode === productCode : !r.productCode);
            return matchId || matchComposite;
          });
          
          if (item) {
            if (u.targetValue !== undefined) item.targetValue = parseFloat(u.targetValue);
            item.actualValue = parseFloat(u.actualValue) || 0;
            item.explanation = u.explanation || "";
            item.status = u.status || "Đang thực hiện";
            item.isOverridden = true;
            updatedCount++;
          } else {
            kpiList.push({
              id: u.id || `${unitCode}-${(productCode && productCode !== "all") ? productCode : "unit"}-${u.indicatorCode}-${periodKey}`,
              indicatorCode: u.indicatorCode,
              unitCode,
              productCode: (productCode && productCode !== "all") ? productCode : null,
              periodType,
              periodKey,
              targetValue: u.targetValue !== undefined ? parseFloat(u.targetValue) : 0,
              actualValue: parseFloat(u.actualValue) || 0,
              explanation: u.explanation || "",
              status: u.status || "Đang thực hiện",
              isOverridden: true
            });
            updatedCount++;
          }
        });
        
        if (updatedCount > 0) {
          fs.writeFileSync(jsonPath, JSON.stringify(kpiList, null, 2), "utf-8");
          console.log(`Đã cập nhật ${updatedCount} bản ghi dự phòng vào ${filename}`);
        }
      }
    } catch (fsErr) {
      console.error("Lỗi cập nhật dữ liệu JSON dự phòng:", fsErr);
    }
    return NextResponse.json({ message: "Lưu dữ liệu KPI thành công (Chế độ dự phòng)" });
  }
}

// Helper function to sync and aggregate KPIs between child and parent units
// Helper function to sync and aggregate KPIs between child and parent units
async function syncKpisBetweenUnits(periodKey: string, periodType: string) {
  const syncMappings = [
    { fromUnit: "Wofloo", fromCode: "VM1-I02.01", toUnit: "SCVN", toCode: "VM1-I02.01-WF", title: "Doanh thu BP WF" },
    { fromUnit: "AS", fromCode: "VM1-I02.01", toUnit: "SCVN", toCode: "VM1-I02.01-AS", title: "Doanh thu BP AS" },
    { fromUnit: "NDTH", fromCode: "VM1-I02.01", toUnit: "SCVN", toCode: "VM1-I02.01-NDTH", title: "Doanh thu BP NDTH" },
    { fromUnit: "Lego", fromCode: "VM1-I02.01", toUnit: "SCVN", toCode: "VM1-I02.01-Lego", title: "Doanh thu DA Lego" },
    { fromUnit: "DA01", fromCode: "DM1-I02.01", toUnit: "SCVN", toCode: "DM1-I02.01-DA01", title: "Doanh thu DA 01" },
    { fromUnit: "SCS", fromCode: "SM1-I02.01", toUnit: "SCVN", toCode: "SM1-I02.01-SCS", title: "Doanh thu SCS" },
    { fromUnit: "Music", fromCode: "MM1-I02.01", toUnit: "SCVN", toCode: "MM1-I02.01-SCMU", title: "Doanh thu SCMU" },
    { fromUnit: "CN", fromCode: "NM1-I02.01", toUnit: "SCVN", toCode: "NM1-I02.01-CNGP", title: "Doanh thu CNGP" },
    { fromUnit: "CR", fromCode: "CM1-I02.01", toUnit: "SCVN", toCode: "CM1-I02.01-CR", title: "Doanh thu BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM1-I02.02", toUnit: "SCVN", toCode: "VM1-I02.02-WF", title: "Doanh thu NB BP WF" },
    { fromUnit: "AS", fromCode: "VM1-I02.02", toUnit: "SCVN", toCode: "VM1-I02.02-AS", title: "Doanh thu NB BP AS" },
    { fromUnit: "NDTH", fromCode: "VM1-I02.02", toUnit: "SCVN", toCode: "VM1-I02.02-NDTH", title: "Doanh thu NB BP NDTH" },
    { fromUnit: "Lego", fromCode: "VM1-I02.02", toUnit: "SCVN", toCode: "VM1-I02.02-Lego", title: "Doanh thu NB DA Lego" },
    { fromUnit: "DA01", fromCode: "DM1-I02.01", toUnit: "SCVN", toCode: "DM1-I02.01-DA01", title: "Doanh thu NB DA 01" },
    { fromUnit: "SCS", fromCode: "SM1-I02.01.01", toUnit: "SCVN", toCode: "SM1-I02.01.01-SCS", title: "Doanh thu NB SCS" },
    { fromUnit: "Music", fromCode: "MM1-I02.01.01", toUnit: "SCVN", toCode: "MM1-I02.01.01-SCMU", title: "Doanh thu NB SCMU" },
    { fromUnit: "CN", fromCode: "CM1-I02.01", toUnit: "SCVN", toCode: "CM1-I02.01-CNGP", title: "Doanh thu NB CNGP" },
    { fromUnit: "CR", fromCode: "CM1-I02.02", toUnit: "SCVN", toCode: "CM1-I02.02-CR", title: "Doanh thu NB BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM1-I02.03", toUnit: "SCVN", toCode: "VM1-I02.03-WF", title: "Doanh thu chéo BP WF" },
    { fromUnit: "AS", fromCode: "VM1-I02.03", toUnit: "SCVN", toCode: "VM1-I02.03-AS", title: "Doanh thu chéo BP AS" },
    { fromUnit: "NDTH", fromCode: "VM1-I02.03", toUnit: "SCVN", toCode: "VM1-I02.03-NDTH", title: "Doanh thu chéo BP NDTH" },
    { fromUnit: "Lego", fromCode: "VM1-I02.03", toUnit: "SCVN", toCode: "VM1-I02.03-Lego", title: "Doanh thu chéo DA Lego" },
    { fromUnit: "SCS", fromCode: "SM1-I02.01.03", toUnit: "SCVN", toCode: "SM1-I02.01.03-SCS", title: "Doanh thu chéo SCS" },
    { fromUnit: "Music", fromCode: "MM1-I02.01.02", toUnit: "SCVN", toCode: "MM1-I02.01.02-SCMU", title: "Doanh thu chéo SCMU" },
    { fromUnit: "Wofloo", fromCode: "VM1-I02.04", toUnit: "SCVN", toCode: "VM1-I02.04-WF", title: "Doanh thu ĐT BP WF" },
    { fromUnit: "AS", fromCode: "VM1-I02.04", toUnit: "SCVN", toCode: "VM1-I02.04-AS", title: "Doanh thu ĐT BP AS" },
    { fromUnit: "NDTH", fromCode: "VM1-I02.04", toUnit: "SCVN", toCode: "VM1-I02.04-NDTH", title: "Doanh thu ĐT BP NDTH" },
    { fromUnit: "Lego", fromCode: "VM1-I02.04", toUnit: "SCVN", toCode: "VM1-I02.04-Lego", title: "Doanh thu ĐT DA Lego" },
    { fromUnit: "SCS", fromCode: "SM1-I02.01.04", toUnit: "SCVN", toCode: "SM1-I02.01.04-SCS", title: "Doanh thu ĐT SCS" },
    { fromUnit: "Music", fromCode: "MM1-I02.01.03", toUnit: "SCVN", toCode: "MM1-I02.01.03-SCMU", title: "Doanh thu ĐT SCMU" },
    { fromUnit: "CR", fromCode: "CM1-I02.03", toUnit: "SCVN", toCode: "CM1-I02.03-CR", title: "Doanh thu ĐT BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM2-I01.01", toUnit: "SCVN", toCode: "VM2-I01.01-WF", title: "SP BP WF" },
    { fromUnit: "AS", fromCode: "VM2-I01.01", toUnit: "SCVN", toCode: "VM2-I01.01-AS", title: "SP BP AS" },
    { fromUnit: "Lego", fromCode: "VM2-I01.01", toUnit: "SCVN", toCode: "VM2-I01.01-Lego", title: "SP DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM2-I01.02", toUnit: "SCVN", toCode: "VM2-I01.02-NDTH", title: "SP BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM2-I01.01", toUnit: "SCVN", toCode: "DM2-I01.01-DA01", title: "DA 01" },
    { fromUnit: "SCS", fromCode: "SM2-I01.01", toUnit: "SCVN", toCode: "SM2-I01.01-SCS", title: "SCS" },
    { fromUnit: "NDTH", fromCode: "VM2-I01.03", toUnit: "SCVN", toCode: "VM2-I01.03-NDTH", title: "BP NDTH" },
    { fromUnit: "CR", fromCode: "CM2-I01.01", toUnit: "SCVN", toCode: "CM2-I01.01-CR", title: "BP Creative" },
    { fromUnit: "Music", fromCode: "MM2-I01.01", toUnit: "SCVN", toCode: "MM2-I01.01-SCMU", title: "SP âm nhạc SCMU" },
    { fromUnit: "Wofloo", fromCode: "VWM2-I01.3", toUnit: "SCVN", toCode: "VWM2-I01.3-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VAM2-I01.3", toUnit: "SCVN", toCode: "VAM2-I01.3-AS", title: "BP AS" },
    { fromUnit: "Wofloo", fromCode: "VWM2-I01.4", toUnit: "SCVN", toCode: "VWM2-I01.4-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VAM2-I01.4", toUnit: "SCVN", toCode: "VAM2-I01.4-AS", title: "BP AS" },
    { fromUnit: "Wofloo", fromCode: "VWM2-I01.5", toUnit: "SCVN", toCode: "VWM2-I01.5-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VAM2-I01.5", toUnit: "SCVN", toCode: "VAM2-I01.5-AS", title: "BP AS" },
    { fromUnit: "Wofloo", fromCode: "VWM2-I01.6", toUnit: "SCVN", toCode: "VWM2-I01.6-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VAM2-I01.6", toUnit: "SCVN", toCode: "VAM2-I01.6-AS", title: "BP AS" },
    { fromUnit: "Wofloo", fromCode: "VM2-I02.01", toUnit: "SCVN", toCode: "VM2-I02.01-WF", title: "Video >1M  BP WF" },
    { fromUnit: "AS", fromCode: "VM2-I02.01", toUnit: "SCVN", toCode: "VM2-I02.01-AS", title: "Video >1M  BP AS" },
    { fromUnit: "Lego", fromCode: "VM2-I02.01", toUnit: "SCVN", toCode: "VM2-I02.01-Lego", title: "Video >1M  DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM2-I02.01", toUnit: "SCVN", toCode: "VM2-I02.01-NDTH", title: "Video >1M  BP NDTH" },
    { fromUnit: "DA01", fromCode: "TM4-I02.01", toUnit: "SCVN", toCode: "TM4-I02.01-DA01", title: "Video >1M  DA 01" },
    { fromUnit: "SCS", fromCode: "SM2-I02.01", toUnit: "SCVN", toCode: "SM2-I02.01-SCS", title: "Video >1M  SCS" },
    { fromUnit: "Music", fromCode: "VM2-I02.01", toUnit: "SCVN", toCode: "VM2-I02.01-SCMU", title: "Video >1M  SCMU" },
    { fromUnit: "CR", fromCode: "VM2-I02.01", toUnit: "SCVN", toCode: "VM2-I02.01-CR", title: "Video >1M  BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM3-I01.02", toUnit: "SCVN", toCode: "VM3-I01.02-WF", title: "View BP WF" },
    { fromUnit: "AS", fromCode: "VM3-I01.02", toUnit: "SCVN", toCode: "VM3-I01.02-AS", title: "View BP AS" },
    { fromUnit: "Lego", fromCode: "VM3-I01.02", toUnit: "SCVN", toCode: "VM3-I01.02-Lego", title: "View DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM3-I01.02", toUnit: "SCVN", toCode: "VM3-I01.02-NDTH", title: "View BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM3-I01.03", toUnit: "SCVN", toCode: "DM3-I01.03-DA01", title: "View DA 01" },
    { fromUnit: "SCS", fromCode: "SM3-I01.04", toUnit: "SCVN", toCode: "SM3-I01.04-SCS", title: "View SCS" },
    { fromUnit: "Music", fromCode: "MM3-I01.01", toUnit: "SCVN", toCode: "MM3-I01.01-SCMU", title: "View SCMU" },
    { fromUnit: "CN", fromCode: "NM3-I01.05", toUnit: "SCVN", toCode: "NM3-I01.05-CNGP", title: "View CNGP" },
    { fromUnit: "CR", fromCode: "CM3-I01.01", toUnit: "SCVN", toCode: "CM3-I01.01-CR", title: "View BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM2-I03.01", toUnit: "SCVN", toCode: "VM2-I03.01-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM2-I03.01", toUnit: "SCVN", toCode: "VM2-I03.01-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM2-I03.01", toUnit: "SCVN", toCode: "VM2-I03.01-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM2-I03.01", toUnit: "SCVN", toCode: "VM2-I03.01-NDTH", title: "BP NDTH" },
    { fromUnit: "Wofloo", fromCode: "VM3-I01.04", toUnit: "SCVN", toCode: "VM3-I01.04-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM3-I01.04", toUnit: "SCVN", toCode: "VM3-I01.04-AS", title: "BP AS" },
    { fromUnit: "Wofloo", fromCode: "VM3-I01.05", toUnit: "SCVN", toCode: "VM3-I01.05-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM3-I01.05", toUnit: "SCVN", toCode: "VM3-I01.05-AS", title: "BP AS" },
    { fromUnit: "Wofloo", fromCode: "VM4-I01.01", toUnit: "SCVN", toCode: "VM4-I01.01-WF", title: "Độ phủ BP WF" },
    { fromUnit: "Wofloo", fromCode: "VM4-I02.01", toUnit: "SCVN", toCode: "VM4-I02.01-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM4-I02.01", toUnit: "SCVN", toCode: "VM4-I02.01-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM4-I02.01", toUnit: "SCVN", toCode: "VM4-I02.01-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM4-I02.01", toUnit: "SCVN", toCode: "VM4-I02.01-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM4-I02.01", toUnit: "SCVN", toCode: "DM4-I02.01-DA01", title: "DA 01" },
    { fromUnit: "SCS", fromCode: "SM4-I02.01", toUnit: "SCVN", toCode: "SM4-I02.01-SCS", title: "SCS" },
    { fromUnit: "CN", fromCode: "NM4-I02.03", toUnit: "SCVN", toCode: "NM4-I02.03-CNGP", title: "CNGP" },
    { fromUnit: "Wofloo", fromCode: "VM4-I02.02", toUnit: "SCVN", toCode: "VM4-I02.02-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM4-I02.02", toUnit: "SCVN", toCode: "VM4-I02.02-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM4-I02.02", toUnit: "SCVN", toCode: "VM4-I02.02-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM4-I02.02", toUnit: "SCVN", toCode: "VM4-I02.02-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM4-I02.02", toUnit: "SCVN", toCode: "DM4-I02.02-DA01", title: "DA 01" },
    { fromUnit: "Music", fromCode: "MM4-I02.02", toUnit: "SCVN", toCode: "MM4-I02.02-SCMU", title: "SCMU" },
    { fromUnit: "Wofloo", fromCode: "VM4-I02.04", toUnit: "SCVN", toCode: "VM4-I02.04-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM4-I02.04", toUnit: "SCVN", toCode: "VM4-I02.04-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM4-I02.04", toUnit: "SCVN", toCode: "VM4-I02.04-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM4-I02.04", toUnit: "SCVN", toCode: "VM4-I02.04-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM4-I02.04", toUnit: "SCVN", toCode: "DM4-I02.04-DA01", title: "DA 01" },
    { fromUnit: "SCS", fromCode: "SM4-I02.06", toUnit: "SCVN", toCode: "SM4-I02.06-SCS", title: "SCS" },
    { fromUnit: "CN", fromCode: "NM4-I02.04", toUnit: "SCVN", toCode: "NM4-I02.04-CNGP", title: "CNGP" },
    { fromUnit: "Wofloo", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-DA01", title: "DA 01" },
    { fromUnit: "SCS", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-SCS", title: "SCS" },
    { fromUnit: "Music", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-SCMU", title: "SCMU" },
    { fromUnit: "CN", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-CNGP", title: "CNGP" },
    { fromUnit: "CR", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-CR", title: "BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-NDTH", title: "BP NDTH" },
    { fromUnit: "SCS", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-SCS", title: "SCS" },
    { fromUnit: "CR", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-CR", title: "BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM5-I02.02", toUnit: "SCVN", toCode: "VM5-I02.02-WF", title: "Hiệu suất SX BP WF" },
    { fromUnit: "AS", fromCode: "VM5-I02.02", toUnit: "SCVN", toCode: "VM5-I02.02-AS", title: "Hiệu suất SX BP AS" },
    { fromUnit: "Lego", fromCode: "VM5-I02.02", toUnit: "SCVN", toCode: "VM5-I02.02-Lego", title: "Hiệu suất SX DA Lego" },
    { fromUnit: "SCS", fromCode: "VM5-I02.02", toUnit: "SCVN", toCode: "VM5-I02.02-SCS", title: "Hiệu suất SX SCS" },
    { fromUnit: "Wofloo", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-WF", title: "Hiệu suất DT kênh BP WF" },
    { fromUnit: "AS", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-AS", title: "Hiệu suất DT kênh BP AS" },
    { fromUnit: "Lego", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-Lego", title: "Hiệu suất DT kênh DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-NDTH", title: "Hiệu suất DT kênh BP NDTH" },
    { fromUnit: "DA01", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-DA01", title: "Hiệu suất DT kênh DA 01" },
    { fromUnit: "SCS", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-SCS", title: "Hiệu suất DT kênh SCS" },
    { fromUnit: "Music", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-SCMU", title: "Hiệu suất DT kênh SCMU" },
    { fromUnit: "CN", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-CNGP", title: "Hiệu suất DT kênh CNGP" },
    { fromUnit: "CR", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-CR", title: "Hiệu suất DT kênh BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-WF", title: "Hiệu suất QTK BP WF" },
    { fromUnit: "AS", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-AS", title: "Hiệu suất QTK BP AS" },
    { fromUnit: "Lego", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-Lego", title: "Hiệu suất QTK DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-NDTH", title: "Hiệu suất QTK BP NDTH" },
    { fromUnit: "DA01", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-DA01", title: "Hiệu suất QTK DA 01" },
    { fromUnit: "SCS", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-SCS", title: "Hiệu suất QTK SCS" },
    { fromUnit: "Music", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-SCMU", title: "Hiệu suất QTK SCMU" },
    { fromUnit: "CN", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-CNGP", title: "Hiệu suất QTK CNGP" },
    { fromUnit: "Wofloo", fromCode: "VM6-I01.01", toUnit: "SCVN", toCode: "VM6-I01.01-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM6-I01.01", toUnit: "SCVN", toCode: "VM6-I01.01-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM6-I01.01", toUnit: "SCVN", toCode: "VM6-I01.01-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM6-I01.01", toUnit: "SCVN", toCode: "VM6-I01.01-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM6-I01.01", toUnit: "SCVN", toCode: "DM6-I01.01-DA01", title: "DA 01" },
    { fromUnit: "SCS", fromCode: "SM6-I01.01", toUnit: "SCVN", toCode: "SM6-I01.01-SCS", title: "SCS" },
    { fromUnit: "Music", fromCode: "MM6-I01.01", toUnit: "SCVN", toCode: "MM6-I01.01-SCMU", title: "SCMU" },
    { fromUnit: "CN", fromCode: "NM6-I01.01", toUnit: "SCVN", toCode: "NM6-I01.01-CNGP", title: "CNGP" },
    { fromUnit: "CR", fromCode: "CM6-I01.01", toUnit: "SCVN", toCode: "CM6-I01.01-CR", title: "BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM6-I01.02", toUnit: "SCVN", toCode: "VM6-I01.02-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM6-I01.02", toUnit: "SCVN", toCode: "VM6-I01.02-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM6-I01.02", toUnit: "SCVN", toCode: "VM6-I01.02-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM6-I01.02", toUnit: "SCVN", toCode: "VM6-I01.02-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM6-I01.02", toUnit: "SCVN", toCode: "DM6-I01.02-DA01", title: "DA 01" },
    { fromUnit: "SCS", fromCode: "SM6-I01.02", toUnit: "SCVN", toCode: "SM6-I01.02-SCS", title: "SCS" },
    { fromUnit: "Music", fromCode: "MM6-I01.02", toUnit: "SCVN", toCode: "MM6-I01.02-SCMU", title: "SCMU" },
    { fromUnit: "CN", fromCode: "NM6-I01.02", toUnit: "SCVN", toCode: "NM6-I01.02-CNGP", title: "CNGP" },
    { fromUnit: "CR", fromCode: "CM6-I01.02", toUnit: "SCVN", toCode: "CM6-I01.02-CR", title: "BP Creative" }
];

  // 1. Đồng bộ các giá trị ngang từ con sang các chỉ tiêu tương ứng của cha
  for (const map of syncMappings) {
    const source = await prisma.kpiData.findFirst({
      where: {
        unitCode: map.fromUnit,
        indicatorCode: map.fromCode,
        periodKey,
        periodType,
        productCode: null
      }
    });

    if (source) {
      const existing = await prisma.kpiData.findFirst({
        where: {
          unitCode: map.toUnit,
          indicatorCode: map.toCode,
          periodKey,
          periodType,
          productCode: null
        }
      });

      const updateData = {
        targetValue: source.targetValue,
        actualValue: source.actualValue,
        status: source.status,
        isOverridden: true
      };

      if (existing) {
        await prisma.kpiData.update({
          where: { id: existing.id },
          data: updateData
        });
      } else {
        await prisma.kpiData.create({
          data: {
            unitCode: map.toUnit,
            indicatorCode: map.toCode,
            periodKey,
            periodType,
            targetValue: source.targetValue,
            actualValue: source.actualValue,
            title: map.title,
            unit: source.unit || "",
            status: source.status,
            isOverridden: true
          }
        });
      }
    }
  }

  // 2. Tự động cộng dồn / tính trung bình (Rollup) cho SCVN dựa trên parentCode và aggregationMethod
  // Chạy 3 vòng lặp để đảm bảo tính toán từ lá lên các cành cây trung gian rồi lên gốc
  for (let pass = 0; pass < 3; pass++) {
    const scvnKpis = await prisma.kpiData.findMany({
      where: { unitCode: "SCVN", periodKey, periodType, productCode: null }
    });

    const kpiByCode = new Map();
    for (const k of scvnKpis) {
      kpiByCode.set(k.indicatorCode, k);
    }

    const childrenByParent = new Map();
    for (const k of scvnKpis) {
      if (k.parentCode) {
        if (!childrenByParent.has(k.parentCode)) {
          childrenByParent.set(k.parentCode, []);
        }
        childrenByParent.get(k.parentCode).push(k);
      }
    }

    for (const [parentCode, children] of Array.from(childrenByParent.entries())) {
      const parentKpi = kpiByCode.get(parentCode);
      if (!parentKpi) continue;

      const method = parentKpi.aggregationMethod || "SUM";

      let targetSum = 0;
      let actualSum = 0;
      let count = 0;

      for (const child of children) {
        targetSum += child.targetValue || 0;
        actualSum += child.actualValue || 0;
        count++;
      }

      let parentTarget = targetSum;
      let parentActual = actualSum;

      if (method === "AVERAGE" && count > 0) {
        parentTarget = targetSum / count;
        parentActual = actualSum / count;
      }

      // Chỉ cập nhật nếu giá trị thực sự thay đổi để tránh trigger update database liên tục
      if (parentKpi.targetValue !== parentTarget || parentKpi.actualValue !== parentActual) {
        await prisma.kpiData.update({
          where: { id: parentKpi.id },
          data: {
            targetValue: parentTarget,
            actualValue: parentActual,
            isOverridden: true
          }
        });
      }
    }
  }

  // 3. Tính toán đặc thù cho chỉ tiêu VM3-I01.06 (View TB/1 nội dung mới upload trong kỳ)
  const vm3_i01_06 = await prisma.kpiData.findFirst({
    where: { unitCode: "SCVN", indicatorCode: "VM3-I01.06", periodKey, periodType, productCode: null }
  });
  if (vm3_i01_06) {
    const tm3_i01_02 = await prisma.kpiData.findFirst({
      where: { unitCode: "SCVN", indicatorCode: "TM3-I01.02", periodKey, periodType, productCode: null }
    });
    const vm2_i01_01 = await prisma.kpiData.findFirst({
      where: { unitCode: "SCVN", indicatorCode: "VM2-I01.01", periodKey, periodType, productCode: null }
    });
    const vm2_i02_01 = await prisma.kpiData.findFirst({
      where: { unitCode: "SCVN", indicatorCode: "VM2-I02.01", periodKey, periodType, productCode: null }
    });
    const mm2_i01_01 = await prisma.kpiData.findFirst({
      where: { unitCode: "SCVN", indicatorCode: "MM2-I01.01", periodKey, periodType, productCode: null }
    });
    const vm2_i01_02 = await prisma.kpiData.findFirst({
      where: { unitCode: "SCVN", indicatorCode: "VM2-I01.02", periodKey, periodType, productCode: null }
    });

    const viewScvn = tm3_i01_02?.actualValue || 0;
    const viewScvnTarget = tm3_i01_02?.targetValue || 0;

    const totalVideo =
      (vm2_i01_01?.actualValue || 0) +
      (vm2_i02_01?.actualValue || 0) +
      (mm2_i01_01?.actualValue || 0) +
      (vm2_i01_02?.actualValue || 0);

    const totalVideoTarget =
      (vm2_i01_01?.targetValue || 0) +
      (vm2_i02_01?.targetValue || 0) +
      (mm2_i01_01?.targetValue || 0) +
      (vm2_i01_02?.targetValue || 0);

    const actual_vm3 = totalVideo > 0 ? (viewScvn / totalVideo) : 0;
    const target_vm3 = totalVideoTarget > 0 ? (viewScvnTarget / totalVideoTarget) : 0;

    if (vm3_i01_06.targetValue !== target_vm3 || vm3_i01_06.actualValue !== actual_vm3) {
      await prisma.kpiData.update({
        where: { id: vm3_i01_06.id },
        data: {
          targetValue: target_vm3,
          actualValue: actual_vm3,
          isOverridden: true
        }
      });
    }
  }

  // 4. Đồng bộ tổng doanh thu SCVN sang TCT (VM1-I02.01)
  const scvnRevKpi = await prisma.kpiData.findFirst({
    where: { unitCode: "SCVN", indicatorCode: "VM1-I02.01", periodKey, periodType, productCode: null }
  });
  if (scvnRevKpi) {
    const tctScvnRecord = await prisma.kpiData.findFirst({
      where: { unitCode: "TCT", indicatorCode: "VM1-I02.01", periodKey, periodType, productCode: null }
    });
    if (tctScvnRecord) {
      await prisma.kpiData.update({
        where: { id: tctScvnRecord.id },
        data: { targetValue: scvnRevKpi.targetValue, actualValue: scvnRevKpi.actualValue }
      });
    } else {
      await prisma.kpiData.create({
        data: {
          unitCode: "TCT",
          indicatorCode: "VM1-I02.01",
          periodKey,
          periodType,
          targetValue: scvnRevKpi.targetValue,
          actualValue: scvnRevKpi.actualValue,
          title: "SCVN",
          unit: "VNĐ",
          status: "Đang thực hiện",
          isOverridden: true
        }
      });
    }
  }

  // 5. Đồng bộ tổng sản lượng sản xuất SCVN sang TCT (VM2-I01.01)
  const scvnVolKpi = await prisma.kpiData.findFirst({
    where: { unitCode: "SCVN", indicatorCode: "VM2-I01.01", periodKey, periodType, productCode: null }
  });
  if (scvnVolKpi) {
    const tctScvnVolRecord = await prisma.kpiData.findFirst({
      where: { unitCode: "TCT", indicatorCode: "VM2-I01.01", periodKey, periodType, productCode: null }
    });
    if (tctScvnVolRecord) {
      await prisma.kpiData.update({
        where: { id: tctScvnVolRecord.id },
        data: { targetValue: scvnVolKpi.targetValue, actualValue: scvnVolKpi.actualValue }
      });
    } else {
      await prisma.kpiData.create({
        data: {
          unitCode: "TCT",
          indicatorCode: "VM2-I01.01",
          periodKey,
          periodType,
          targetValue: scvnVolKpi.targetValue,
          actualValue: scvnVolKpi.actualValue,
          title: "Số lượng sp SCVN",
          unit: "Video",
          status: "Đang thực hiện",
          isOverridden: true
        }
      });
    }
  }

  // 6. Tính tổng doanh thu (TM1-I02.01) của TCT
  const tctRevenueCodes = [
    "VM1-I02.01", "DM1-I02.01", "SM1-I02.01", "CM1-I02.01", "MM1-I02.01",
    "NM1-I02.01", "EM1-I02.01", "HM1-I02.01", "WM1-I02.01", "AM1-I02.01"
  ];
  const tctRevenues = await prisma.kpiData.findMany({
    where: {
      unitCode: "TCT",
      indicatorCode: { in: tctRevenueCodes },
      periodKey,
      periodType,
      productCode: null
    }
  });

  let tctRevenueTarget = 0;
  let tctRevenueActual = 0;
  for (const r of tctRevenues) {
    tctRevenueTarget += r.targetValue || 0;
    tctRevenueActual += r.actualValue || 0;
  }

  const tctRevRecord = await prisma.kpiData.findFirst({
    where: { unitCode: "TCT", indicatorCode: "TM1-I02.01", periodKey, periodType, productCode: null }
  });
  if (tctRevRecord) {
    await prisma.kpiData.update({
      where: { id: tctRevRecord.id },
      data: { targetValue: tctRevenueTarget, actualValue: tctRevenueActual }
    });
  } else {
    await prisma.kpiData.create({
      data: {
        unitCode: "TCT",
        indicatorCode: "TM1-I02.01",
        periodKey,
        periodType,
        targetValue: tctRevenueTarget,
        actualValue: tctRevenueActual,
        title: "Tổng doanh thu",
        unit: "VNĐ",
        status: "Đang thực hiện",
        isOverridden: true
      }
    });
  }
}
