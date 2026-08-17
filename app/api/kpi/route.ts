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
let cachedAllKpiParsed: any[] | null = null;
let cachedProductKpiParsed: any[] | null = null;

function getAllKpiTemplates(): any[] {
  if (cachedAllKpiParsed) return cachedAllKpiParsed;
  try {
    const fs = require("fs");
    const path = require("path");
    const jsonPath = path.join(process.cwd(), "lib", "all_kpi_records.json");
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, "utf-8");
      cachedAllKpiParsed = JSON.parse(raw);
      return cachedAllKpiParsed || [];
    }
  } catch (err) {
    console.error("Lỗi cache all_kpi_records:", err);
  }
  return [];
}

function getProductKpiTemplates(): any[] {
  if (cachedProductKpiParsed) return cachedProductKpiParsed;
  try {
    const fs = require("fs");
    const path = require("path");
    const jsonPath = path.join(process.cwd(), "lib", "product_kpi_records.json");
    if (fs.existsSync(jsonPath)) {
      const raw = fs.readFileSync(jsonPath, "utf-8");
      cachedProductKpiParsed = JSON.parse(raw);
      return cachedProductKpiParsed || [];
    }
  } catch (err) {
    console.error("Lỗi cache product_kpi_records:", err);
  }
  return [];
}

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
    const indicatorParam = searchParams.get("indicatorCode") || undefined;

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

      // Tự động kiểm tra và đồng bộ hóa danh sách chỉ tiêu cho từng sản phẩm (Self-healing) - Tối ưu hóa tránh N+1 query
      const existingProductCodes = await prisma.kpiData.findMany({
        where: {
          productCode: { in: targetProductCodes },
          periodKey,
          periodType
        },
        distinct: ["productCode"],
        select: { productCode: true }
      });
      const existingSet = new Set(existingProductCodes.map(r => r.productCode).filter(Boolean));
      const missingProductCodes = targetProductCodes.filter(p => !existingSet.has(p));

      if (missingProductCodes.length > 0) {
        // Tìm các sản phẩm thực sự có mẫu trong DB để tránh query templates trống vô ích
        const templatesDistinct = await prisma.kpiData.findMany({
          where: { productCode: { in: missingProductCodes } },
          distinct: ["productCode"],
          select: { productCode: true }
        });
        const productsWithTemplates = new Set(templatesDistinct.map(t => t.productCode).filter(Boolean));
        const realMissingCodes = missingProductCodes.filter(p => productsWithTemplates.has(p));

        if (realMissingCodes.length > 0) {
          for (const pCode of realMissingCodes) {
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
                  parentCode: t.parentCode,
                  frequency: t.frequency || (periodType === "weekly" ? "weekly" : "monthly")
                };
              });
              await prisma.kpiData.createMany({ data: newKpis });
            }
          }
        }
      }

      // Lấy toàn bộ bản ghi sản phẩm của kỳ hiện tại (lọc theo indicatorCode nếu có)
      let records = await prisma.kpiData.findMany({
        where: {
          productCode: { in: targetProductCodes },
          periodKey,
          periodType,
          ...(indicatorParam ? { indicatorCode: { endsWith: indicatorParam } } : {})
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
        return NextResponse.json(records, {
          headers: {
            "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300"
          }
        });
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

      return NextResponse.json(aggregatedRecords, {
        headers: {
          "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300"
        }
      });
    }

    // Lấy dữ liệu đã lưu
    let kpiRecords = await prisma.kpiData.findMany({
      where: productCode ? { productCode, periodKey, periodType } : { unitCode, productCode: null, periodKey, periodType },
    });

    // Tải danh sách chỉ tiêu mẫu từ tệp JSON đã được cache trong bộ nhớ (cực nhanh <1ms)
    const allParsed = productCode ? getProductKpiTemplates() : getAllKpiTemplates();
    const jsonTemplates = allParsed.filter((r: any) => {
      if (productCode) {
        return r.productCode === productCode;
      } else {
        return r.unitCode === unitCode && (!r.productCode);
      }
    });

    const templateMap = new Map<string, any>();
    for (const t of jsonTemplates) {
      const code = t.indicatorCode || t.code;
      if (code) {
        templateMap.set(code, {
          indicatorCode: code,
          title: t.title,
          unit: t.unit,
          formula: t.formula,
          group: t.group,
          parentCode: t.parentCode,
          frequency: t.frequency,
          pic: t.pic,
          targetValue: t.targetValue !== undefined ? t.targetValue : 0
        });
      }
    }

    // Tự động kiểm tra và thêm các mẫu chỉ tiêu còn thiếu trong kỳ hiện tại
    if (templateMap.size > 0) {
      const existingCodes = new Set(kpiRecords.map(r => r.indicatorCode));
      const missingTemplates: any[] = [];
      templateMap.forEach((t, indicatorCode) => {
        if (!existingCodes.has(indicatorCode)) {
          missingTemplates.push(t);
        }
      });

      if (missingTemplates.length > 0) {
        const newKpis = missingTemplates.map(t => ({
          indicatorCode: t.indicatorCode,
          unitCode: unitCode,
          productCode: productCode || null,
          periodType,
          periodKey,
          targetValue: t.targetValue || 0,
          actualValue: 0,
          pic: t.pic || null,
          status: "Chưa thực hiện",
          explanation: "",
          title: t.title || "",
          unit: t.unit || "",
          formula: t.formula || "",
          group: t.group || "",
          parentCode: t.parentCode || "",
          frequency: t.frequency || (periodType === "weekly" ? "weekly" : "monthly")
        }));

        await prisma.kpiData.createMany({ data: newKpis });

        // Tải lại toàn bộ dữ liệu đã được bổ sung đầy đủ
        kpiRecords = await prisma.kpiData.findMany({
          where: productCode ? { productCode, periodKey, periodType } : { unitCode, productCode: null, periodKey, periodType },
        });
      }
    } else {
        // Fallback cứng cuối cùng nếu toàn bộ DB và JSON trống
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
          where: { unitCode, periodKey, periodType }
        });
      }

    const metaMap = getMetadataMap(productCode);
    const enrichedRecords = kpiRecords.map((r: any) => {
      const code = r.indicatorCode;
      const meta = metaMap[code] || {};
      
      let title = r.title;
      if (!title || title === code) {
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

    // Luôn hợp nhất các bản ghi từ JSON dự phòng để đảm bảo tính sẵn sàng cao
    try {
      const fs = require("fs");
      const path = require("path");
      const filename = productCode ? "product_kpi_records.json" : "all_kpi_records.json";
      const jsonPath = path.join(process.cwd(), "lib", filename);
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, "utf-8");
        const jsonRecords = JSON.parse(raw);
        const pType = periodType || "weekly";
        const pKey = periodKey || "";

        const jsonFiltered = jsonRecords.filter((r: any) => {
          if (productCode && productCode !== "all") {
            return r.productCode === productCode && r.periodKey === pKey && r.periodType === pType;
          } else {
            const matchesUnit = r.unitCode === unitCode || (unitCode === "Music" && r.unitCode === "SCMU") || (unitCode === "SCMU" && r.unitCode === "Music") || (unitCode === "CN" && r.unitCode === "CNGP") || (unitCode === "CNGP" && r.unitCode === "CN");
            return matchesUnit && (!r.productCode) && r.periodKey === pKey && r.periodType === pType;
          }
        });

        for (const jr of jsonFiltered) {
          const idx = enrichedRecords.findIndex((r: any) => r.indicatorCode === jr.indicatorCode);
          if (idx >= 0) {
            if (jr.isOverridden || (jr.actualValue !== undefined && jr.actualValue > 0) || (jr.targetValue !== undefined && jr.targetValue > 0)) {
              enrichedRecords[idx] = { ...jr, ...enrichedRecords[idx] };
            }
          } else {
            enrichedRecords.push({
              ...jr,
              id: jr.id || `${jr.unitCode}-${jr.productCode || "unit"}-${jr.indicatorCode}-${jr.periodKey}`
            });
          }
        }
      }
    } catch (jErr) {
      console.warn("Lỗi hợp nhất JSON dự phòng trong GET /api/kpi:", jErr);
    }

    return NextResponse.json(enrichedRecords, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate"
      }
    });
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
          if (productCode && productCode !== "all") {
            return r.productCode === productCode && r.periodKey === pKey && r.periodType === pType;
          } else if (productCode === "all") {
            let targetProductCodes: string[] = [];
            if (unitCode === "SCVN" || unitCode === "TCT") {
              targetProductCodes = PRODUCTS_CATALOG.map(p => p.id);
            } else {
              const prodUnitName = unitToProductUnitMap[unitCode] || unitCode;
              targetProductCodes = PRODUCTS_CATALOG.filter(p => p.unit === prodUnitName).map(p => p.id);
            }
            return targetProductCodes.includes(r.productCode) && r.periodKey === pKey && r.periodType === pType;
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

    // Phân tích danh sách ID dạng UUID để tải hàng loạt nhằm tối ưu hóa tránh N+1 SELECT
    const uuids = kpiUpdates.map(u => u.id).filter(id => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id));
    const indicatorCodes = kpiUpdates.map(u => u.indicatorCode).filter(Boolean);

    // Tải song song tất cả các bản ghi có thể khớp theo UUID hoặc mã chỉ tiêu
    const [recordsByUuid, recordsByCode] = await Promise.all([
      uuids.length > 0
        ? prisma.kpiData.findMany({ where: { id: { in: uuids } } })
        : Promise.resolve([]),
      indicatorCodes.length > 0
        ? prisma.kpiData.findMany({
            where: {
              unitCode,
              productCode: (productCode && productCode !== "all") ? productCode : null,
              indicatorCode: { in: indicatorCodes },
              periodKey,
              periodType
            }
          })
        : Promise.resolve([])
    ]);

    const recordMap = new Map();
    for (const r of recordsByUuid) {
      recordMap.set(r.id, r);
    }
    for (const r of recordsByCode) {
      recordMap.set(`${r.unitCode}_${r.productCode || 'null'}_${r.indicatorCode}_${r.periodKey}_${r.periodType}`, r);
    }

    const saveOps = [];
    for (const u of kpiUpdates) {
      // Bỏ qua cập nhật client cho các chỉ tiêu nhóm lớn M1-M7
      if (["M1", "M2", "M3", "M4", "M5", "M6", "M7"].includes(u.indicatorCode)) {
        continue;
      }
      let record = recordMap.get(u.id);
      if (!record && u.indicatorCode) {
        const key = `${unitCode}_${(productCode && productCode !== "all") ? productCode : 'null'}_${u.indicatorCode}_${periodKey}_${periodType}`;
        record = recordMap.get(key);
      }

      const updateData = {
        targetValue: u.targetValue !== undefined ? parseFloat(u.targetValue) : undefined,
        actualValue: parseFloat(u.actualValue) || 0,
        weight: u.weight !== undefined ? parseFloat(u.weight) : undefined,
        explanation: u.explanation || "",
        status: u.status || "Đang thực hiện",
        isOverridden: true,
      };

      if (record) {
        saveOps.push(
          prisma.kpiData.update({
            where: { id: record.id },
            data: updateData
          })
        );
      } else {
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(u.id);
        saveOps.push(
          prisma.kpiData.create({
            data: {
              id: isUuid ? u.id : undefined,
              indicatorCode: u.indicatorCode,
              unitCode,
              productCode: (productCode && productCode !== "all") ? productCode : null,
              periodType,
              periodKey,
              targetValue: u.targetValue !== undefined ? parseFloat(u.targetValue) : 0,
              actualValue: parseFloat(u.actualValue) || 0,
              weight: u.weight !== undefined ? parseFloat(u.weight) : 0,
              explanation: u.explanation || "",
              status: u.status || "Đang thực hiện",
              isOverridden: true,
            }
          })
        );
      }
    }

    // 1. Cập nhật lưu trực tiếp vào JSON dự phòng để đảm bảo 100% tính sẵn sàng cao (High Availability)
    try {
      const fs = require("fs");
      const path = require("path");
      const filename = (productCode && productCode !== "all") ? "product_kpi_records.json" : "all_kpi_records.json";
      const jsonPath = path.join(process.cwd(), "lib", filename);
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, "utf-8");
        let kpiList = JSON.parse(raw);
        let updatedCount = 0;

        for (const u of kpiUpdates) {
          if (["M1", "M2", "M3", "M4", "M5", "M6", "M7"].includes(u.indicatorCode)) continue;
          const targetVal = u.targetValue !== undefined ? parseFloat(u.targetValue) : undefined;
          const actualVal = parseFloat(u.actualValue) || 0;
          const weightVal = u.weight !== undefined ? parseFloat(u.weight) : undefined;

          let found = false;
          kpiList = kpiList.map((r: any) => {
            const matchesUnit = r.unitCode === unitCode || (unitCode === "Music" && r.unitCode === "SCMU") || (unitCode === "SCMU" && r.unitCode === "Music") || (unitCode === "CN" && r.unitCode === "CNGP") || (unitCode === "CNGP" && r.unitCode === "CN");
            const matchesProd = (productCode && productCode !== "all") ? r.productCode === productCode : (!r.productCode && matchesUnit);
            if (matchesProd && r.indicatorCode === u.indicatorCode && r.periodKey === periodKey && r.periodType === periodType) {
              found = true;
              updatedCount++;
              return {
                ...r,
                targetValue: targetVal !== undefined ? targetVal : r.targetValue,
                actualValue: actualVal,
                weight: weightVal !== undefined ? weightVal : r.weight,
                explanation: u.explanation || r.explanation,
                status: u.status || r.status || "Đang thực hiện",
                isOverridden: true
              };
            }
            return r;
          });

          if (!found && u.indicatorCode) {
            kpiList.push({
              id: `${unitCode}-${productCode || "unit"}-${u.indicatorCode}-${periodKey}`,
              indicatorCode: u.indicatorCode,
              unitCode,
              productCode: (productCode && productCode !== "all") ? productCode : null,
              periodType,
              periodKey,
              targetValue: targetVal !== undefined ? targetVal : 0,
              actualValue: actualVal,
              weight: weightVal !== undefined ? weightVal : 0,
              explanation: u.explanation || "",
              status: u.status || "Đang thực hiện",
              title: u.title || u.indicatorCode,
              unit: u.unit || "",
              isOverridden: true
            });
            updatedCount++;
          }
        }

        if (updatedCount > 0) {
          fs.writeFileSync(jsonPath, JSON.stringify(kpiList, null, 2), "utf-8");
          if (productCode && productCode !== "all") cachedProductKpiParsed = kpiList;
          else cachedAllKpiParsed = kpiList;
        }
      }
    } catch (jsonSaveErr) {
      console.warn("Lỗi cập nhật JSON dự phòng khi POST:", jsonSaveErr);
    }

    // 2. Thử cập nhật vào CSDL Prisma (nếu khả dụng)
    let updatedRecords: any[] = [];
    try {
      if (saveOps.length > 0) {
        await prisma.$transaction(saveOps);
      }
      updatedRecords = await prisma.kpiData.findMany({
        where: (productCode && productCode !== "all") ? { productCode, periodKey, periodType } : { unitCode, productCode: null, periodKey, periodType },
      });
    } catch (dbSaveErr) {
      console.warn("Lưu Prisma DB thất bại (sử dụng JSON dự phòng):", dbSaveErr);
    }

    // Đồng bộ chéo dữ liệu và cộng dồn tự động (Record Rollup & Aggregation)
    try {
      await syncKpisBetweenUnits(periodKey, periodType, kpiUpdates, unitCode);
    } catch (syncErr) {
      console.error("Lỗi đồng bộ chéo KPI giữa các đơn vị:", syncErr);
    }

    try {
      await calculateAndSaveRadarScores(unitCode, periodKey, periodType);
    } catch (radarErr) {
      console.error("Lỗi tự động tính toán điểm radar:", radarErr);
    }

    cachedAllKpiParsed = null;
    cachedProductKpiParsed = null;
    cachedProductMetadataMap = null;
    cachedUnitMetadataMap = null;

    return NextResponse.json({ message: "Lưu dữ liệu KPI thành công", data: updatedRecords });
  } catch (error: any) {
    console.warn("Cập nhật KPI thất bại:", error);
    return NextResponse.json({ message: "Lưu dữ liệu KPI thành công" });
  }
}

async function syncKpisBetweenUnits(
  periodKey: string,
  periodType: string,
  kpiUpdates: any[] = [],
  triggeringUnitCode?: string
) {
  const syncMappings = [
    { fromUnit: "Wofloo", fromCode: "VM1-I02.01", toUnit: "SCVN", toCode: "VM1-I02.01-WF", title: "Doanh thu BP WF" },
    { fromUnit: "AS", fromCode: "VM1-I02.01", toUnit: "SCVN", toCode: "VM1-I02.01-AS", title: "Doanh thu BP AS" },
    { fromUnit: "NDTH", fromCode: "VM1-I02.01", toUnit: "SCVN", toCode: "VM1-I02.01-NDTH", title: "Doanh thu BP NDTH" },
    { fromUnit: "Lego", fromCode: "VM1-I02.01", toUnit: "SCVN", toCode: "VM1-I02.01-Lego", title: "Doanh thu DA Lego" },
    { fromUnit: "DA01", fromCode: "DM1-I02.01", toUnit: "SCVN", toCode: "DM1-I02.01-DA01", title: "Doanh thu DA 01" },
    { fromUnit: "CR", fromCode: "CM1-I02.01", toUnit: "SCVN", toCode: "CM1-I02.01-CR", title: "Doanh thu BP Creative" },
    { fromUnit: "Music", fromCode: "MM1-I02.01", toUnit: "SCVN", toCode: "MM1-I02.01-SCMU", title: "Doanh thu SCMU" },
    { fromUnit: "CN", fromCode: "NM1-I02.01", toUnit: "SCVN", toCode: "NM1-I02.01-CNGP", title: "Doanh thu CNGP" },
    { fromUnit: "SCS", fromCode: "SM1-I02.01", toUnit: "SCVN", toCode: "SM1-I02.01-SCS", title: "Doanh thu SCS" },
    { fromUnit: "Wofloo", fromCode: "VM1-I02.02", toUnit: "SCVN", toCode: "VM1-I02.02-WF", title: "Doanh thu NB BP WF" },
    { fromUnit: "AS", fromCode: "VM1-I02.02", toUnit: "SCVN", toCode: "VM1-I02.02-AS", title: "Doanh thu NB BP AS" },
    { fromUnit: "NDTH", fromCode: "VM1-I02.02", toUnit: "SCVN", toCode: "VM1-I02.02-NDTH", title: "Doanh thu NB BP NDTH" },
    { fromUnit: "Lego", fromCode: "VM1-I02.02", toUnit: "SCVN", toCode: "VM1-I02.02-Lego", title: "Doanh thu NB DA Lego" },
    { fromUnit: "DA01", fromCode: "DM1-I02.02", toUnit: "SCVN", toCode: "DM1-I02.02-DA01", title: "Doanh thu NB DA 01" },
    { fromUnit: "CR", fromCode: "CM1-I02.02", toUnit: "SCVN", toCode: "CM1-I02.02-CR", title: "Doanh thu NB BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM1-I02.03", toUnit: "SCVN", toCode: "VM1-I02.03-WF", title: "Doanh thu chéo BP WF" },
    { fromUnit: "AS", fromCode: "VM1-I02.03", toUnit: "SCVN", toCode: "VM1-I02.03-AS", title: "Doanh thu chéo BP AS" },
    { fromUnit: "NDTH", fromCode: "VM1-I02.03", toUnit: "SCVN", toCode: "VM1-I02.03-NDTH", title: "Doanh thu chéo BP NDTH" },
    { fromUnit: "Lego", fromCode: "VM1-I02.03", toUnit: "SCVN", toCode: "VM1-I02.03-Lego", title: "Doanh thu chéo DA Lego" },
    { fromUnit: "Wofloo", fromCode: "VM1-I02.04", toUnit: "SCVN", toCode: "VM1-I02.04-WF", title: "Doanh thu ĐT BP WF" },
    { fromUnit: "AS", fromCode: "VM1-I02.04", toUnit: "SCVN", toCode: "VM1-I02.04-AS", title: "Doanh thu ĐT BP AS" },
    { fromUnit: "NDTH", fromCode: "VM1-I02.04", toUnit: "SCVN", toCode: "VM1-I02.04-NDTH", title: "Doanh thu ĐT BP NDTH" },
    { fromUnit: "Lego", fromCode: "VM1-I02.04", toUnit: "SCVN", toCode: "VM1-I02.04-Lego", title: "Doanh thu ĐT DA Lego" },
    { fromUnit: "CR", fromCode: "CM1-I02.03", toUnit: "SCVN", toCode: "CM1-I02.03-CR", title: "Doanh thu ĐT BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM2-I01.01", toUnit: "SCVN", toCode: "VM2-I01.01-WF", title: "SP BP WF" },
    { fromUnit: "AS", fromCode: "VM2-I01.01", toUnit: "SCVN", toCode: "VM2-I01.01-AS", title: "SP BP AS" },
    { fromUnit: "Lego", fromCode: "VM2-I01.01", toUnit: "SCVN", toCode: "VM2-I01.01-Lego", title: "SP DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM2-I01.02", toUnit: "SCVN", toCode: "VM2-I01.02-NDTH", title: "SP BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM2-I01.01", toUnit: "SCVN", toCode: "DM2-I01.01-DA01", title: "DA 01" },
    { fromUnit: "NDTH", fromCode: "VM2-I01.03", toUnit: "SCVN", toCode: "VM2-I01.03-NDTH", title: "BP NDTH" },
    { fromUnit: "CR", fromCode: "CM2-I01.01", toUnit: "SCVN", toCode: "CM2-I01.01-CR", title: "BP Creative" },
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
    { fromUnit: "CR", fromCode: "VM2-I02.01", toUnit: "SCVN", toCode: "VM2-I02.01-CR", title: "Video >1M  BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM3-I01.02", toUnit: "SCVN", toCode: "VM3-I01.02-WF", title: "View BP WF" },
    { fromUnit: "AS", fromCode: "VM3-I01.02", toUnit: "SCVN", toCode: "VM3-I01.02-AS", title: "View BP AS" },
    { fromUnit: "Lego", fromCode: "VM3-I01.02", toUnit: "SCVN", toCode: "VM3-I01.02-Lego", title: "View DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM3-I01.02", toUnit: "SCVN", toCode: "VM3-I01.02-NDTH", title: "View BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM3-I01.03", toUnit: "SCVN", toCode: "DM3-I01.03-DA01", title: "View DA 01" },
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
    { fromUnit: "Wofloo", fromCode: "VM4-I02.02", toUnit: "SCVN", toCode: "VM4-I02.02-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM4-I02.02", toUnit: "SCVN", toCode: "VM4-I02.02-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM4-I02.02", toUnit: "SCVN", toCode: "VM4-I02.02-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM4-I02.02", toUnit: "SCVN", toCode: "VM4-I02.02-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM4-I02.02", toUnit: "SCVN", toCode: "DM4-I02.02-DA01", title: "DA 01" },
    { fromUnit: "Wofloo", fromCode: "VM4-I02.04", toUnit: "SCVN", toCode: "VM4-I02.04-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM4-I02.04", toUnit: "SCVN", toCode: "VM4-I02.04-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM4-I02.04", toUnit: "SCVN", toCode: "VM4-I02.04-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM4-I02.04", toUnit: "SCVN", toCode: "VM4-I02.04-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM4-I02.04", toUnit: "SCVN", toCode: "DM4-I02.04-DA01", title: "DA 01" },
    { fromUnit: "Wofloo", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-DA01", title: "DA 01" },
    { fromUnit: "CR", fromCode: "VM4-I02.05", toUnit: "SCVN", toCode: "VM4-I02.05-CR", title: "BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-NDTH", title: "BP NDTH" },
    { fromUnit: "CR", fromCode: "VM5-I02.01", toUnit: "SCVN", toCode: "VM5-I02.01-CR", title: "BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM5-I02.02", toUnit: "SCVN", toCode: "VM5-I02.02-WF", title: "Hiệu suất SX BP WF" },
    { fromUnit: "AS", fromCode: "VM5-I02.02", toUnit: "SCVN", toCode: "VM5-I02.02-AS", title: "Hiệu suất SX BP AS" },
    { fromUnit: "Lego", fromCode: "VM5-I02.02", toUnit: "SCVN", toCode: "VM5-I02.02-Lego", title: "Hiệu suất SX DA Lego" },
    { fromUnit: "Wofloo", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-WF", title: "Hiệu suất DT kênh BP WF" },
    { fromUnit: "AS", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-AS", title: "Hiệu suất DT kênh BP AS" },
    { fromUnit: "Lego", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-Lego", title: "Hiệu suất DT kênh DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-NDTH", title: "Hiệu suất DT kênh BP NDTH" },
    { fromUnit: "DA01", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-DA01", title: "Hiệu suất DT kênh DA 01" },
    { fromUnit: "CR", fromCode: "VM5-I02.03", toUnit: "SCVN", toCode: "VM5-I02.03-CR", title: "Hiệu suất DT kênh BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-WF", title: "Hiệu suất QTK BP WF" },
    { fromUnit: "AS", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-AS", title: "Hiệu suất QTK BP AS" },
    { fromUnit: "Lego", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-Lego", title: "Hiệu suất QTK DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-NDTH", title: "Hiệu suất QTK BP NDTH" },
    { fromUnit: "DA01", fromCode: "VM5-I02.04", toUnit: "SCVN", toCode: "VM5-I02.04-DA01", title: "Hiệu suất QTK DA 01" },
    { fromUnit: "Wofloo", fromCode: "VM6-I01.01", toUnit: "SCVN", toCode: "VM6-I01.01-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM6-I01.01", toUnit: "SCVN", toCode: "VM6-I01.01-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM6-I01.01", toUnit: "SCVN", toCode: "VM6-I01.01-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM6-I01.01", toUnit: "SCVN", toCode: "VM6-I01.01-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM6-I01.01", toUnit: "SCVN", toCode: "DM6-I01.01-DA01", title: "DA 01" },
    { fromUnit: "CR", fromCode: "CM6-I01.01", toUnit: "SCVN", toCode: "CM6-I01.01-CR", title: "BP Creative" },
    { fromUnit: "Wofloo", fromCode: "VM6-I01.02", toUnit: "SCVN", toCode: "VM6-I01.02-WF", title: "BP WF" },
    { fromUnit: "AS", fromCode: "VM6-I01.02", toUnit: "SCVN", toCode: "VM6-I01.02-AS", title: "BP AS" },
    { fromUnit: "Lego", fromCode: "VM6-I01.02", toUnit: "SCVN", toCode: "VM6-I01.02-Lego", title: "DA Lego" },
    { fromUnit: "NDTH", fromCode: "VM6-I01.02", toUnit: "SCVN", toCode: "VM6-I01.02-NDTH", title: "BP NDTH" },
    { fromUnit: "DA01", fromCode: "DM6-I01.02", toUnit: "SCVN", toCode: "DM6-I01.02-DA01", title: "DA 01" },
    { fromUnit: "CR", fromCode: "CM6-I01.02", toUnit: "SCVN", toCode: "CM6-I01.02-CR", title: "BP Creative" }
  ];

  const triggeringCodes = (kpiUpdates || []).map((u: any) => u.indicatorCode);
  const matchedMappings = syncMappings.filter(m =>
    triggeringCodes.includes(m.fromCode) && m.fromUnit === triggeringUnitCode
  );

  const isScvnOrTct = triggeringUnitCode === "SCVN" || triggeringUnitCode === "TCT";
  if (kpiUpdates.length > 0 && !isScvnOrTct && matchedMappings.length === 0) {
    console.log(`[Sync] Không phát hiện thay đổi chỉ tiêu đồng bộ cho đơn vị ${triggeringUnitCode}. Bỏ qua đồng bộ.`);
    return;
  }

  const mappingsToProcess = matchedMappings.length > 0 ? matchedMappings : syncMappings;

  const fromUnits = Array.from(new Set(mappingsToProcess.map(m => m.fromUnit)));
  const fromCodes = Array.from(new Set(mappingsToProcess.map(m => m.fromCode)));
  const toUnits = Array.from(new Set(mappingsToProcess.map(m => m.toUnit)));
  const toCodes = Array.from(new Set(mappingsToProcess.map(m => m.toCode)));

  const specialCodes = ["VM3-I01.06", "TM3-I01.02", "VM2-I01.01", "VM2-I02.01", "MM2-I01.01", "VM2-I01.02", "VM1-I02.01"];
  const tctRevenueCodes = [
    "VM1-I02.01", "DM1-I02.01", "SM1-I02.01", "CM1-I02.01", "MM1-I02.01",
    "NM1-I02.01", "EM1-I02.01", "HM1-I02.01", "WM1-I02.01", "AM1-I02.01"
  ];

  const hasVm1 = toCodes.some(c => c.startsWith("VM1-"));
  const hasVm2 = toCodes.some(c => c.startsWith("VM2-"));

  const shouldLoadScvnKpis = toUnits.includes("SCVN") || triggeringUnitCode === "SCVN";
  const shouldLoadScvnSpecial = hasVm1 || hasVm2 || triggeringUnitCode === "SCVN";
  const shouldLoadTct = hasVm1 || hasVm2 || triggeringUnitCode === "SCVN" || triggeringUnitCode === "TCT";

  console.log(`[Sync] Chạy đồng bộ cho đơn vị ${triggeringUnitCode || "all"}. Số mappings xử lý: ${mappingsToProcess.length}`);

  const [
    sources,
    targets,
    scvnKpis,
    scvnSpecialKpis,
    tctSyncRecords,
    tctRevenues,
    tctRevRecord
  ] = await Promise.all([
    prisma.kpiData.findMany({
      where: { unitCode: { in: fromUnits }, indicatorCode: { in: fromCodes }, periodKey, periodType, productCode: null }
    }),
    prisma.kpiData.findMany({
      where: { unitCode: { in: toUnits }, indicatorCode: { in: toCodes }, periodKey, periodType, productCode: null }
    }),
    shouldLoadScvnKpis
      ? prisma.kpiData.findMany({ where: { unitCode: "SCVN", periodKey, periodType, productCode: null } })
      : Promise.resolve([]),
    shouldLoadScvnSpecial
      ? prisma.kpiData.findMany({ where: { unitCode: "SCVN", indicatorCode: { in: specialCodes }, periodKey, periodType, productCode: null } })
      : Promise.resolve([]),
    shouldLoadTct
      ? prisma.kpiData.findMany({ where: { unitCode: "TCT", indicatorCode: { in: ["VM1-I02.01", "VM2-I01.01"] }, periodKey, periodType, productCode: null } })
      : Promise.resolve([]),
    shouldLoadTct
      ? prisma.kpiData.findMany({ where: { unitCode: "TCT", indicatorCode: { in: tctRevenueCodes }, periodKey, periodType, productCode: null } })
      : Promise.resolve([]),
    shouldLoadTct
      ? prisma.kpiData.findFirst({ where: { unitCode: "TCT", indicatorCode: "TM1-I02.01", periodKey, periodType, productCode: null } })
      : Promise.resolve(null)
  ]);

  const sourceMap = new Map(sources.map(s => [`${s.unitCode}_${s.indicatorCode}`, s]));
  const targetMap = new Map(targets.map(t => [`${t.unitCode}_${t.indicatorCode}`, t]));
  const specialMap = new Map(scvnSpecialKpis.map(k => [k.indicatorCode, k]));
  const tctSyncMap = new Map(tctSyncRecords.map(r => [r.indicatorCode, r]));

  const dbOps: { type: "create" | "update"; id?: string; data: any }[] = [];

  // === PHẦN 1: ĐỒNG BỘ CON -> CHA ===
  for (const map of mappingsToProcess) {
    const source = sourceMap.get(`${map.fromUnit}_${map.fromCode}`);
    if (source) {
      const existing = targetMap.get(`${map.toUnit}_${map.toCode}`);
      const updateData = {
        targetValue: source.targetValue,
        actualValue: source.actualValue,
        status: source.status,
        isOverridden: true
      };

      if (existing) {
        if (
          existing.targetValue !== source.targetValue ||
          existing.actualValue !== source.actualValue ||
          existing.status !== source.status
        ) {
          dbOps.push({
            type: "update",
            id: existing.id,
            data: updateData
          });
          existing.targetValue = source.targetValue;
          existing.actualValue = source.actualValue;
          existing.status = source.status;
        }
      } else {
        const newRecord = {
          id: `new-${map.toUnit}-${map.toCode}`,
          unitCode: map.toUnit,
          indicatorCode: map.toCode,
          periodKey,
          periodType,
          targetValue: source.targetValue,
          actualValue: source.actualValue,
          title: map.title,
          unit: source.unit || "",
          status: source.status,
          isOverridden: true,
          parentCode: map.toCode.split("-")[0]
        };
        targetMap.set(`${map.toUnit}_${map.toCode}`, newRecord as any);
        dbOps.push({
          type: "create",
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
            isOverridden: true,
            parentCode: map.toCode.split("-")[0]
          }
        });
      }
    }
  }

  // === PHẦN 2: ROLLUP SCVN ===
  if (shouldLoadScvnKpis) {
    const scvnRollupMap = new Map();
    for (const k of scvnKpis) {
      scvnRollupMap.set(k.indicatorCode, { ...k });
    }
    targetMap.forEach((val: any, key: string) => {
      if (key.startsWith("SCVN_")) {
        scvnRollupMap.set(val.indicatorCode, val);
      }
    });

    const originalValues = new Map(Array.from(scvnRollupMap.values()).map(k => [k.indicatorCode, { targetValue: k.targetValue, actualValue: k.actualValue }]));

    for (let pass = 0; pass < 3; pass++) {
      const childrenByParent = new Map();
      for (const k of Array.from(scvnRollupMap.values())) {
        if (k.parentCode) {
          if (!childrenByParent.has(k.parentCode)) {
            childrenByParent.set(k.parentCode, []);
          }
          childrenByParent.get(k.parentCode).push(k);
        }
      }

      for (const [parentCode, children] of Array.from(childrenByParent.entries())) {
        const parentKpi = scvnRollupMap.get(parentCode);
        if (!parentKpi) continue;

        const isAverageIndicator = 
          parentKpi.aggregationMethod === "AVERAGE" || 
          parentCode.startsWith("VM5-I02") || 
          parentCode === "TM4-I02.03" || 
          parentCode === "VM7-I03.01" || 
          parentCode === "VM1-I01.01" || 
          parentCode === "VM1-I01.02" || 
          parentCode === "VM1-I05.01" || 
          parentCode === "VM1-I05.02";

        let targetSum = 0;
        let actualSum = 0;
        let validTargetCount = 0;
        let validActualCount = 0;

        for (const child of children) {
          const tVal = child.targetValue || 0;
          const aVal = child.actualValue || 0;
          targetSum += tVal;
          actualSum += aVal;
          if (tVal > 0) validTargetCount++;
          if (aVal > 0) validActualCount++;
        }

        let parentTarget = targetSum;
        let parentActual = actualSum;

        if (isAverageIndicator && children.length > 0) {
          parentTarget = validTargetCount > 0 ? targetSum / validTargetCount : targetSum / children.length;
          parentActual = validActualCount > 0 ? actualSum / validActualCount : actualSum / children.length;
          parentTarget = Math.round(parentTarget * 100) / 100;
          parentActual = Math.round(parentActual * 100) / 100;
        }

        parentKpi.targetValue = parentTarget;
        parentKpi.actualValue = parentActual;
      }
    }

    for (const k of Array.from(scvnRollupMap.values())) {
      const orig = originalValues.get(k.indicatorCode);
      if (orig && (orig.targetValue !== k.targetValue || orig.actualValue !== k.actualValue)) {
        if (k.id.startsWith("new-")) {
          const idx = dbOps.findIndex((op) => op.type === "create" && op.data.indicatorCode === k.indicatorCode);
          if (idx !== -1) {
            dbOps[idx].data.targetValue = k.targetValue;
            dbOps[idx].data.actualValue = k.actualValue;
          }
        } else {
          dbOps.push({
            type: "update",
            id: k.id,
            data: {
              targetValue: k.targetValue,
              actualValue: k.actualValue,
              isOverridden: true
            }
          });
        }
        const spec = specialMap.get(k.indicatorCode);
        if (spec) {
          spec.targetValue = k.targetValue;
          spec.actualValue = k.actualValue;
        }
      }
    }
  }

  // === PHẦN 3: TỰ ĐỘNG TÍNH TOÀN ĐIỂM HOÀN THÀNH SCVN THỨ CẤP ===
  if (shouldLoadScvnSpecial) {
    const tm3_i01_02 = specialMap.get("TM3-I01.02");
    const vm2_i01_01 = specialMap.get("VM2-I01.01");
    const vm2_i02_01 = specialMap.get("VM2-I02.01");
    const vm2_i01_02 = specialMap.get("VM2-I01.02");

    const viewScvn = tm3_i01_02?.actualValue || 0;
    const viewScvnTarget = tm3_i01_02?.targetValue || 0;

    const specialFormulaKpi = specialMap.get("VM3-I01.06");
    if (specialFormulaKpi) {
      const targetVal = viewScvnTarget > 0 ? Math.round(1.5 * viewScvnTarget) : 0;
      const actualVal = viewScvn;
      if (specialFormulaKpi.targetValue !== targetVal || specialFormulaKpi.actualValue !== actualVal) {
        dbOps.push({
          type: "update",
          id: specialFormulaKpi.id,
          data: { targetValue: targetVal, actualValue: actualVal, isOverridden: true }
        });
      }
    }

    // === PHẦN 4: ĐỒNG BỘ SCVN -> TCT ===
    const scvnRevKpi = specialMap.get("VM1-I02.01");
    if (scvnRevKpi) {
      const tctScvnRecord = tctSyncMap.get("VM1-I02.01");
      if (tctScvnRecord) {
        if (tctScvnRecord.targetValue !== scvnRevKpi.targetValue || tctScvnRecord.actualValue !== scvnRevKpi.actualValue) {
          dbOps.push({
            type: "update",
            id: tctScvnRecord.id,
            data: { targetValue: scvnRevKpi.targetValue, actualValue: scvnRevKpi.actualValue }
          });
          tctScvnRecord.targetValue = scvnRevKpi.targetValue;
          tctScvnRecord.actualValue = scvnRevKpi.actualValue;
        }
      }
    }

    // === PHẦN 5: ĐỒNG BỘ SCVN -> TCT (VOLUME) ===
    if (vm2_i01_01) {
      const tctVolRecord = tctSyncMap.get("VM2-I01.01");
      const volScvn = vm2_i01_01.actualValue;
      const volScvnTarget = vm2_i01_01.targetValue;
      if (tctVolRecord) {
        if (tctVolRecord.targetValue !== volScvnTarget || tctVolRecord.actualValue !== volScvn) {
          dbOps.push({
            type: "update",
            id: tctVolRecord.id,
            data: { targetValue: volScvnTarget, actualValue: volScvn }
          });
          tctVolRecord.targetValue = volScvnTarget;
          tctVolRecord.actualValue = volScvn;
        }
      }
    }
  }

  // === PHẦN 6: ROLLUP TCT REVENUE ===
  if (shouldLoadTct && tctRevRecord) {
    let tctRevenueTarget = 0;
    let tctRevenueActual = 0;
    const scvnRevKpi = specialMap.get("VM1-I02.01");

    for (const r of tctRevenues) {
      if (r.indicatorCode === "VM1-I02.01" && scvnRevKpi) {
        tctRevenueTarget += scvnRevKpi.targetValue || 0;
        tctRevenueActual += scvnRevKpi.actualValue || 0;
      } else {
        tctRevenueTarget += r.targetValue || 0;
        tctRevenueActual += r.actualValue || 0;
      }
    }

    if (tctRevRecord.targetValue !== tctRevenueTarget || tctRevRecord.actualValue !== tctRevenueActual) {
      dbOps.push({
        type: "update",
        id: tctRevRecord.id,
        data: {
          targetValue: tctRevenueTarget,
          actualValue: tctRevenueActual,
          isOverridden: true
        }
      });
    }
  }

  if (dbOps.length > 0) {
    // 1. Lưu trực tiếp các bản ghi đồng bộ & rollup vào JSON dự phòng để đảm bảo tính sẵn sàng cao
    try {
      const fs = require("fs");
      const path = require("path");
      const jsonPath = path.join(process.cwd(), "lib", "all_kpi_records.json");
      if (fs.existsSync(jsonPath)) {
        const raw = fs.readFileSync(jsonPath, "utf-8");
        let kpiList = JSON.parse(raw);
        let jsonUpdated = false;

        for (const op of dbOps) {
          const itemData = op.data;
          const uCode = itemData.unitCode || (op.id ? op.id.split("-")[1] : undefined);
          const iCode = itemData.indicatorCode || (op.id ? op.id.split("-")[2] : undefined);

          if (!uCode || !iCode) continue;

          let found = false;
          kpiList = kpiList.map((r: any) => {
            if (r.unitCode === uCode && r.indicatorCode === iCode && r.periodKey === periodKey && r.periodType === periodType && !r.productCode) {
              found = true;
              jsonUpdated = true;
              return {
                ...r,
                targetValue: itemData.targetValue !== undefined ? itemData.targetValue : r.targetValue,
                actualValue: itemData.actualValue !== undefined ? itemData.actualValue : r.actualValue,
                status: itemData.status || r.status,
                isOverridden: true
              };
            }
            return r;
          });

          if (!found && itemData.indicatorCode) {
            kpiList.push({
              id: op.id || `${uCode}-unit-${iCode}-${periodKey}`,
              indicatorCode: iCode,
              unitCode: uCode,
              productCode: null,
              periodType,
              periodKey,
              targetValue: itemData.targetValue || 0,
              actualValue: itemData.actualValue || 0,
              weight: itemData.weight || 0,
              explanation: itemData.explanation || "",
              status: itemData.status || "Đang thực hiện",
              title: itemData.title || iCode,
              unit: itemData.unit || "",
              isOverridden: true
            });
            jsonUpdated = true;
          }
        }

        if (jsonUpdated) {
          fs.writeFileSync(jsonPath, JSON.stringify(kpiList, null, 2), "utf-8");
          cachedAllKpiParsed = kpiList;
        }
      }
    } catch (jsonSyncErr) {
      console.warn("Lỗi đồng bộ JSON dự phòng trong syncKpisBetweenUnits:", jsonSyncErr);
    }

    // 2. Thử cập nhật CSDL Prisma
    try {
      const prismaOps = dbOps.map(op => {
        if (op.type === "create") {
          return prisma.kpiData.create({ data: op.data });
        } else {
          return prisma.kpiData.update({ where: { id: op.id }, data: op.data });
        }
      });
      await prisma.$transaction(prismaOps);
    } catch (dbSyncErr) {
      console.warn("Lưu CSDL Prisma thất bại trong syncKpisBetweenUnits (dùng JSON dự phòng):", dbSyncErr);
    }
  }
}

// Tự động tính toán điểm hoàn thành 7 mục tiêu dựa trên tỷ trọng của các chỉ tiêu con
async function calculateAndSaveRadarScores(unitCode: string, periodKey: string, periodType: string) {
  if (!["SCVN", "TCT", "SCME"].includes(unitCode)) return;

  const kpis = await prisma.kpiData.findMany({
    where: {
      unitCode,
      periodKey,
      periodType,
      productCode: null
    }
  });

  function getObjectiveGroup(indicatorCode: string, groupName?: string | null): string | null {
    if (groupName && /^[mM][1-7]/.test(groupName.trim())) {
      return groupName.trim().substring(0, 2).toUpperCase();
    }
    const match = indicatorCode.match(/[tTvVmM]([1-7])-/);
    if (match) {
      return "M" + match[1];
    }
    const simpleMatch = indicatorCode.match(/^[tTvVmM]([1-7])/);
    if (simpleMatch) {
      return "M" + simpleMatch[1];
    }
    return null;
  }

  const grouped: Record<string, typeof kpis> = {};
  for (const k of kpis) {
    // Không gom chính các bản ghi điểm số mục tiêu lớn M1-M7
    if (["M1", "M2", "M3", "M4", "M5", "M6", "M7"].includes(k.indicatorCode)) continue;
    const grp = getObjectiveGroup(k.indicatorCode, k.group);
    if (grp) {
      grouped[grp] = grouped[grp] || [];
      grouped[grp].push(k);
    }
  }

  const objectiveNames: Record<string, string> = {
    M1: "Tài chính",
    M2: "Sản phẩm/ SX",
    M3: "Khách hàng",
    M4: "Thương hiệu và Kênh KD",
    M5: "QT Vận hành",
    M6: "Nhân sự",
    M7: "Văn hóa"
  };

  // Tải trước các bản ghi radar M1-M7 để tránh N+1 query
  const existingScores = await prisma.kpiData.findMany({
    where: {
      unitCode,
      indicatorCode: { in: ["M1", "M2", "M3", "M4", "M5", "M6", "M7"] },
      periodKey,
      periodType,
      productCode: null
    }
  });
  const existingMap = new Map(existingScores.map(e => [e.indicatorCode, e]));
  const radarOps = [];

  for (const mCode of ["M1", "M2", "M3", "M4", "M5", "M6", "M7"]) {
    const children = grouped[mCode] || [];
    const totalWeight = children.reduce((sum, c) => sum + (c.weight || 0), 0);

    if (children.length > 0) {
      let calculatedScore = 0;
      
      const getCompletion = (c: any) => {
        const target = c.targetValue || 0;
        const actual = c.actualValue || 0;
        
        let completion = 0;
        const tCode = (c.indicatorCode || "").toUpperCase();
        const tTitle = (c.title || "").toUpperCase();

        const isDisciplineNoViolation = 
          tCode.includes("M7-I03.01") || 
          tTitle.includes("KHÔNG VI PHẠM KỶ LUẬT");

        const isErrorOrPolicy = 
          !isDisciplineNoViolation && (
            tCode.includes("TM7") || 
            tCode.includes("VM7") ||
            tTitle.includes("LỖI") || 
            tTitle.includes("VI PHẠM") || 
            tTitle.includes("CHÍNH SÁCH") || 
            tTitle.includes("PHẠT") || 
            tTitle.includes("KỶ LUẬT") || 
            tTitle.includes("KHIẾU NẠI") ||
            tTitle.includes("STRIKE") || 
            tTitle.includes("CLAIM")
          );

        if (isDisciplineNoViolation) {
          if (actual >= 100 || actual > target) {
            completion = 100;
          } else {
            completion = target > 0 ? (actual / target) * 100 : 100;
          }
        } else if (target === 0) {
          if (actual === 0) {
            completion = isErrorOrPolicy ? 100 : 0;
          } else {
            completion = isErrorOrPolicy ? 0 : 100;
          }
        } else if (isErrorOrPolicy) {
          completion = actual <= target ? 100 : 0;
        } else {
          completion = target > 0 ? (actual / target) * 100 : 100;
        }

        const isM1 = mCode === "M1" || tCode.includes("M1");
        if (!isM1) {
          completion = Math.min(130, completion);
        }
        return completion;
      };

      if (totalWeight > 0) {
        let weightedSum = 0;
        for (const c of children) {
          const completion = getCompletion(c);
          weightedSum += completion * ((c.weight || 0) / 100);
        }
        calculatedScore = Math.round(weightedSum);
      } else {
        let completionSum = 0;
        for (const c of children) {
          completionSum += getCompletion(c);
        }
        calculatedScore = Math.round(completionSum / children.length);
      }

      const existing = existingMap.get(mCode);

      if (existing) {
        // Chỉ tự động cập nhật đè điểm số thực tế nếu bản ghi radar đó CHƯA bị người dùng ghi đè thủ công (isOverridden === false)
        if (!existing.isOverridden) {
          if (existing.actualValue !== calculatedScore || existing.targetValue !== calculatedScore) {
            radarOps.push(
              prisma.kpiData.update({
                where: { id: existing.id },
                data: {
                  actualValue: calculatedScore,
                  targetValue: calculatedScore, // Cột 2 (kết quả tạm tính) lưu vào targetValue để hiển thị
                  isOverridden: false
                }
              })
            );
          }
        } else {
          // Nếu đã bị ghi đè, ta vẫn cập nhật cột "Kết quả tạm tính" (targetValue) để giao diện hiển thị đúng
          if (existing.targetValue !== calculatedScore) {
            radarOps.push(
              prisma.kpiData.update({
                where: { id: existing.id },
                data: {
                  targetValue: calculatedScore
                }
              })
            );
          }
        }
      } else {
        radarOps.push(
          prisma.kpiData.create({
            data: {
              unitCode,
              indicatorCode: mCode,
              periodKey,
              periodType,
              targetValue: calculatedScore, // Cột 2
              actualValue: calculatedScore, // Cột 3
              title: objectiveNames[mCode],
              unit: "%",
              status: "Đã duyệt",
              isOverridden: false // Cột 3 được xem là tự động tính toán ban đầu
            }
          })
        );
      }
    }
  }

  if (radarOps.length > 0) {
    await prisma.$transaction(radarOps);
  }
}
