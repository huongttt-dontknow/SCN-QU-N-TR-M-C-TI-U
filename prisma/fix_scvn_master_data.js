const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const unitAliasesMap = {
  "Wofloo": ["Wofloo", "WF", "WO"],
  "WF": ["Wofloo", "WF", "WO"],
  "WO": ["Wofloo", "WF", "WO"],
  "NDTH": ["NDTH"],
  "AS": ["AS"],
  "Lego": ["Lego", "LEGO"],
  "LEGO": ["Lego", "LEGO"],
  "DA01": ["DA01"],
  "SCS": ["SCS", "Studio"],
  "Studio": ["SCS", "Studio"],
  "Music": ["Music", "SCMU"],
  "SCMU": ["Music", "SCMU"],
  "CN": ["CN", "CNGP"],
  "CNGP": ["CN", "CNGP"],
  "CR": ["CR", "Creative"],
  "Creative": ["CR", "Creative"]
};

// Sub-unit to SCVN indicator mapping table (280 standard rules reference)
const subUnitSyncMappings = [
  // Doanh thu Tong (VM1-I02.01)
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VM1-I02.01", toCode: "VM1-I02.01-WF" },
  { fromUnits: ["AS"], fromCode: "VM1-I02.01", toCode: "VM1-I02.01-AS" },
  { fromUnits: ["NDTH"], fromCode: "VM1-I02.01", toCode: "VM1-I02.01-NDTH" },
  { fromUnits: ["Lego", "LEGO"], fromCode: "VM1-I02.01", toCode: "VM1-I02.01-Lego" },
  { fromUnits: ["DA01"], fromCode: "DM1-I02.01", toCode: "DM1-I02.01-DA01" },
  { fromUnits: ["SCS", "Studio"], fromCode: "SM1-I02.01", toCode: "SM1-I02.01" },
  { fromUnits: ["Music", "SCMU"], fromCode: "MM1-I02.01", toCode: "MM1-I02.01" },
  { fromUnits: ["CN", "CNGP"], fromCode: "NM1-I02.01", toCode: "NM1-I02.01" },
  { fromUnits: ["CR", "Creative"], fromCode: "CM1-I02.01", toCode: "CM1-I02.01-CR" },

  // Doanh thu Noi bo (VM1-I02.02)
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VM1-I02.02", toCode: "VM1-I02.02-WF" },
  { fromUnits: ["AS"], fromCode: "VM1-I02.02", toCode: "VM1-I02.02-AS" },
  { fromUnits: ["NDTH"], fromCode: "VM1-I02.02", toCode: "VM1-I02.02-NDTH" },
  { fromUnits: ["Lego", "LEGO"], fromCode: "VM1-I02.02", toCode: "VM1-I02.02-Lego" },
  { fromUnits: ["DA01"], fromCode: "DM1-I02.02", toCode: "DM1-I02.02-DA01" },
  { fromUnits: ["SCS", "Studio"], fromCode: "SM1-I02.01.01", toCode: "SM1-I02.01.01" },
  { fromUnits: ["Music", "SCMU"], fromCode: "MM1-I02.01.01", toCode: "MM1-I02.01.01" },
  { fromUnits: ["CN", "CNGP"], fromCode: "CM1-I02.01-CNGP", toCode: "CM1-I02.01-CNGP" },
  { fromUnits: ["CR", "Creative"], fromCode: "CM1-I02.02", toCode: "CM1-I02.02-CR" },

  // Doanh thu Cheo (VM1-I02.03)
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VM1-I02.03", toCode: "VM1-I02.03-WF" },
  { fromUnits: ["AS"], fromCode: "VM1-I02.03", toCode: "VM1-I02.03-AS" },
  { fromUnits: ["NDTH"], fromCode: "VM1-I02.03", toCode: "VM1-I02.03-NDTH" },
  { fromUnits: ["Lego", "LEGO"], fromCode: "VM1-I02.03", toCode: "VM1-I02.03-Lego" },
  { fromUnits: ["SCS", "Studio"], fromCode: "SM1-I02.01.03", toCode: "SM1-I02.01.03" },
  { fromUnits: ["Music", "SCMU"], fromCode: "MM1-I02.01.02", toCode: "MM1-I02.01.02" },

  // Doanh thu Doi tac (VM1-I02.04)
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VM1-I02.04", toCode: "VM1-I02.04-WF" },
  { fromUnits: ["AS"], fromCode: "VM1-I02.04", toCode: "VM1-I02.04-AS" },
  { fromUnits: ["NDTH"], fromCode: "VM1-I02.04", toCode: "VM1-I02.04-NDTH" },
  { fromUnits: ["Lego", "LEGO"], fromCode: "VM1-I02.04", toCode: "VM1-I02.04-Lego" },
  { fromUnits: ["SCS", "Studio"], fromCode: "SM1-I02.01.04", toCode: "SM1-I02.01.04" },
  { fromUnits: ["Music", "SCMU"], fromCode: "MM1-I02.01.03", toCode: "MM1-I02.01.03" },
  { fromUnits: ["CR", "Creative"], fromCode: "CM1-I02.03", toCode: "CM1-I02.03-CR" },

  // San luong San xuat (VM2-I01.01 / VM2-I02.01)
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VM2-I01.01", toCode: "VM2-I01.01-WF" },
  { fromUnits: ["AS"], fromCode: "VM2-I01.01", toCode: "VM2-I01.01-AS" },
  { fromUnits: ["Lego", "LEGO"], fromCode: "VM2-I01.01", toCode: "VM2-I01.01-Lego" },
  { fromUnits: ["NDTH"], fromCode: "VM2-I01.02", toCode: "VM2-I01.02-NDTH" },
  { fromUnits: ["DA01"], fromCode: "DM2-I01.01", toCode: "DM2-I01.01-DA01" },
  { fromUnits: ["SCS", "Studio"], fromCode: "SM2-I01.01", toCode: "SM2-I01.01" },
  { fromUnits: ["NDTH"], fromCode: "VM2-I01.03", toCode: "VM2-I01.03-NDTH" },
  { fromUnits: ["CR", "Creative"], fromCode: "CM2-I01.01", toCode: "CM2-I01.01-CR" },
  { fromUnits: ["Music", "SCMU"], fromCode: "MM2-I01.01", toCode: "MM2-I01.01" },

  // Y tuong & Kich ban
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VWM2-I01.3", toCode: "VWM2-I01.3-WF" },
  { fromUnits: ["AS"], fromCode: "VAM2-I01.3", toCode: "VAM2-I01.3-AS" },
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VWM2-I01.4", toCode: "VWM2-I01.4-WF" },
  { fromUnits: ["AS"], fromCode: "VAM2-I01.4", toCode: "VAM2-I01.4-AS" },
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VWM2-I01.5", toCode: "VWM2-I01.5-WF" },
  { fromUnits: ["AS"], fromCode: "VAM2-I01.5", toCode: "VAM2-I01.5-AS" },
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VWM2-I01.6", toCode: "VWM2-I01.6-WF" },
  { fromUnits: ["AS"], fromCode: "VAM2-I01.6", toCode: "VAM2-I01.6-AS" },

  // Chat luong video >=1M views (TM2-I02.01)
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VM2-I02.01", toCode: "VM2-I02.01-WF" },
  { fromUnits: ["AS"], fromCode: "VM2-I02.01", toCode: "VM2-I02.01-AS" },
  { fromUnits: ["Lego", "LEGO"], fromCode: "VM2-I02.01", toCode: "VM2-I02.01-Lego" },
  { fromUnits: ["NDTH"], fromCode: "VM2-I02.01", toCode: "VM2-I02.01-NDTH" },
  { fromUnits: ["DA01"], fromCode: "TM4-I02.01", toCode: "TM4-I02.01-DA01" },
  { fromUnits: ["SCS", "Studio"], fromCode: "SM2-I02.01", toCode: "SM2-I02.01" },
  { fromUnits: ["Music", "SCMU"], fromCode: "VM2-I02.01", toCode: "VM2-I02.01-SCMU" },
  { fromUnits: ["CR", "Creative"], fromCode: "VM2-I02.01", toCode: "VM2-I02.01-CR" },

  // Traffic (TM3-I01.02 / VM3-I01.02)
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VM3-I01.02", toCode: "VM3-I01.02-WF" },
  { fromUnits: ["AS"], fromCode: "VM3-I01.02", toCode: "VM3-I01.02-AS" },
  { fromUnits: ["Lego", "LEGO"], fromCode: "VM3-I01.02", toCode: "VM3-I01.02-Lego" },
  { fromUnits: ["NDTH"], fromCode: "VM3-I01.02", toCode: "VM3-I01.02-NDTH" },
  { fromUnits: ["DA01"], fromCode: "DM3-I01.03", toCode: "DM3-I01.03-DA01" },
  { fromUnits: ["SCS", "Studio"], fromCode: "SM3-I01.04", toCode: "SM3-I01.04" },
  { fromUnits: ["Music", "SCMU"], fromCode: "MM3-I01.01", toCode: "MM3-I01.01" },
  { fromUnits: ["CN", "CNGP"], fromCode: "NM3-I01.05", toCode: "NM3-I01.05" },
  { fromUnits: ["CR", "Creative"], fromCode: "CM3-I01.01", toCode: "CM3-I01.01-CR" },

  // Ky luat M7 (VM7-I03.01)
  { fromUnits: ["Wofloo", "WF", "WO"], fromCode: "VM7-I03.01", toCode: "VM7-I03.01-WF" },
  { fromUnits: ["AS"], fromCode: "VM7-I03.01", toCode: "VM7-I03.01-AS" },
  { fromUnits: ["Lego", "LEGO"], fromCode: "VM7-I03.01", toCode: "VM7-I03.01-Lego" },
  { fromUnits: ["NDTH"], fromCode: "VM7-I03.01", toCode: "VM7-I03.01-NDTH" },
  { fromUnits: ["DA01"], fromCode: "DM7-I03.01", toCode: "DM7-I03.01-DA01" },
  { fromUnits: ["SCS", "Studio"], fromCode: "SM7-I03.01", toCode: "SM7-I03.01-SCS" },
  { fromUnits: ["Music", "SCMU"], fromCode: "MM7-I03.01", toCode: "MM7-I03.01-SCMU" },
  { fromUnits: ["CN", "CNGP"], fromCode: "NM7-I03.01", toCode: "NM7-I03.01-CNGP" },
  { fromUnits: ["CR", "Creative"], fromCode: "CM7-I03.01", toCode: "CM7-I03.01-CR" }
];

async function main() {
  console.log("=== BẮT ĐẦU CHUẨN HÓA CSDL SCVN & ĐỒNG BỘ DỮ LIỆU ĐƠN VỊ TRỰC THUỘC ===");

  const rulesPath = path.join(__dirname, "..", "scvn_rules.json");
  if (!fs.existsSync(rulesPath)) {
    console.error("Không tìm thấy tệp scvn_rules.json");
    process.exit(1);
  }

  const rules = JSON.parse(fs.readFileSync(rulesPath, "utf-8"));
  console.log(`Đã tải ${rules.length} chỉ tiêu chuẩn từ scvn_rules.json`);

  // 1. Merge and rename old/non-standard indicator codes safely
  const renameMap = {
    "MM1-I02.01-SCMU": "MM1-I02.01",
    "SM1-I02.01-SCS": "SM1-I02.01",
    "NM1-I02.01-CNGP": "NM1-I02.01",
    "TM2-I01.01": "VM2-I01.01",
    "TM7-I01.01": "VM7-I03.01",
    "DM2-I01.01": "DM2-I01.01-DA01",
    "VM2-I02.01-SCS": "SM2-I01.01",
    "CM2-I01.01": "CM2-I01.01-CR",
    "MM3-I01.01-SCMU": "MM3-I01.01",
    "NM3-I01.05-CNGP": "NM3-I01.05",
    "SM3-I01.04-SCS": "SM3-I01.04"
  };


  console.log("1. Đang chuyển đổi các mã chỉ tiêu cũ/không chuẩn...");
  const scvnLegacyRecs = await prisma.kpiData.findMany({
    where: {
      unitCode: 'SCVN',
      indicatorCode: { in: Object.keys(renameMap) }
    }
  });

  console.log(`Tìm thấy ${scvnLegacyRecs.length} bản ghi mã cũ cần xử lý...`);
  for (const rec of scvnLegacyRecs) {
    const newCode = renameMap[rec.indicatorCode];
    if (newCode) {
      const existingNew = await prisma.kpiData.findFirst({
        where: { unitCode: 'SCVN', indicatorCode: newCode, periodKey: rec.periodKey, periodType: rec.periodType }
      });
      if (existingNew) {
        if ((rec.actualValue || 0) > 0 || (rec.targetValue || 0) > 0) {
          await prisma.kpiData.update({
            where: { id: existingNew.id },
            data: {
              targetValue: rec.targetValue || existingNew.targetValue,
              actualValue: rec.actualValue || existingNew.actualValue
            }
          });
        }
        await prisma.kpiData.delete({ where: { id: rec.id } });
      } else {
        await prisma.kpiData.update({
          where: { id: rec.id },
          data: { indicatorCode: newCode }
        });
      }
    }
  }

  // 2. Batch update metadata for all existing SCVN records using Prisma updateMany inside a transaction
  console.log("2. Đang cập nhật metadata chuẩn cho tất cả bản ghi SCVN...");
  const metadataPromises = rules.map(rule => 
    prisma.kpiData.updateMany({
      where: { unitCode: 'SCVN', indicatorCode: rule.code },
      data: {
        title: rule.title,
        unit: rule.unit || "",
        formula: rule.formula || "",
        group: rule.group || "",
        parentCode: rule.parentCode || null,
        frequency: rule.frequency || "weekly",
        aggregationMethod: rule.rollup || "SUM"
      }
    })
  );
  await prisma.$transaction(metadataPromises);
  console.log(`Đã cập nhật metadata cho ${rules.length} quy tắc.`);

  // 3. Ensure all active periods have full 280 indicator records
  const distinctPeriods = await prisma.kpiData.findMany({
    where: { unitCode: 'SCVN' },
    select: { periodKey: true, periodType: true },
    distinct: ['periodKey', 'periodType']
  });

  console.log(`3. Đang kiểm tra và bổ sung chỉ tiêu còn thiếu cho ${distinctPeriods.length} kỳ của SCVN...`);
  
  const allScvnRecords = await prisma.kpiData.findMany({
    where: { unitCode: 'SCVN' },
    select: { id: true, indicatorCode: true, periodKey: true, periodType: true }
  });
  
  const existingPeriodSet = new Set(allScvnRecords.map(r => `${r.periodKey}_${r.indicatorCode}`));
  const toCreateBatch = [];

  for (const p of distinctPeriods) {
    for (const r of rules) {
      const key = `${p.periodKey}_${r.code}`;
      if (!existingPeriodSet.has(key)) {
        existingPeriodSet.add(key);
        toCreateBatch.push({
          indicatorCode: r.code,
          unitCode: 'SCVN',
          periodType: p.periodType,
          periodKey: p.periodKey,
          targetValue: 0,
          actualValue: 0,
          status: 'Chưa thực hiện',
          title: r.title,
          unit: r.unit || "",
          formula: r.formula || "",
          group: r.group || "",
          parentCode: r.parentCode || null,
          frequency: r.frequency || "weekly",
          aggregationMethod: r.rollup || "SUM",
          isOverridden: false
        });
      }
    }
  }

  if (toCreateBatch.length > 0) {
    console.log(`Tạo mới ${toCreateBatch.length} bản ghi SCVN...`);
    for (let i = 0; i < toCreateBatch.length; i += 500) {
      const chunk = toCreateBatch.slice(i, i + 500);
      await prisma.kpiData.createMany({ data: chunk, skipDuplicates: true });
    }
  }

  // 4. Load all child units data across all periods and sync to SCVN in memory
  console.log("4. Đang đồng bộ dữ liệu từ 9 đơn vị con sang SCVN...");

  const allChildRecords = await prisma.kpiData.findMany({
    where: {
      unitCode: { in: ["Wofloo", "WF", "WO", "AS", "NDTH", "Lego", "LEGO", "DA01", "SCS", "Studio", "Music", "SCMU", "CN", "CNGP", "CR", "Creative"] },
      productCode: null
    }
  });

  const childMap = new Map();
  allChildRecords.forEach(r => {
    const key = `${r.unitCode}_${r.indicatorCode}_${r.periodKey}_${r.periodType}`;
    childMap.set(key, r);
  });

  const scvnDataMap = new Map();
  const freshScvnRecs = await prisma.kpiData.findMany({ where: { unitCode: 'SCVN', productCode: null } });
  freshScvnRecs.forEach(r => {
    scvnDataMap.set(`${r.indicatorCode}_${r.periodKey}_${r.periodType}`, { ...r });
  });

  let syncCount = 0;
  for (const p of distinctPeriods) {
    const { periodKey, periodType } = p;

    for (const mapping of subUnitSyncMappings) {
      let bestSource = null;
      for (const u of mapping.fromUnits) {
        const src = childMap.get(`${u}_${mapping.fromCode}_${periodKey}_${periodType}`);
        if (src && (src.actualValue > 0 || src.targetValue > 0)) {
          bestSource = src;
          break;
        }
        if (src && !bestSource) bestSource = src;
      }

      if (bestSource) {
        const scvnItemKey = `${mapping.toCode}_${periodKey}_${periodType}`;
        const scvnItem = scvnDataMap.get(scvnItemKey);
        if (scvnItem) {
          if (scvnItem.actualValue !== bestSource.actualValue || scvnItem.targetValue !== bestSource.targetValue) {
            scvnItem.targetValue = bestSource.targetValue;
            scvnItem.actualValue = bestSource.actualValue;
            scvnItem.isOverridden = true;
            syncCount++;
          }
        }
      }
    }

    // Tree rollup for SCVN for this period
    const periodItems = Array.from(scvnDataMap.values()).filter(r => r.periodKey === periodKey && r.periodType === periodType);
    const periodMap = new Map(periodItems.map(r => [r.indicatorCode, r]));

    for (let pass = 0; pass < 3; pass++) {
      const childrenByParent = new Map();
      periodMap.forEach(r => {
        if (r.parentCode) {
          if (!childrenByParent.has(r.parentCode)) childrenByParent.set(r.parentCode, []);
          childrenByParent.get(r.parentCode).push(r);
        }
      });

      childrenByParent.forEach((children, parentCode) => {
        const parentKpi = periodMap.get(parentCode);
        if (!parentKpi) return;

        const isAvg = parentKpi.aggregationMethod === "AVERAGE" || 
                      parentCode.startsWith("VM5-I02") || 
                      parentCode === "VM7-I03.01" || 
                      parentCode === "VM1-I01.01" || 
                      parentCode === "VM1-I01.02" || 
                      parentCode === "VM1-I05.01" || 
                      parentCode === "VM1-I05.02";

        let sumTgt = 0, sumAct = 0, cntTgt = 0, cntAct = 0;
        for (const child of children) {
          const t = child.targetValue || 0;
          const a = child.actualValue || 0;
          sumTgt += t;
          sumAct += a;
          if (t > 0) cntTgt++;
          if (a > 0) cntAct++;
        }

        let parentTgt = sumTgt;
        let parentAct = sumAct;
        if (isAvg && children.length > 0) {
          parentTgt = cntTgt > 0 ? sumTgt / cntTgt : sumTgt / children.length;
          parentAct = cntAct > 0 ? sumAct / cntAct : sumAct / children.length;
          parentTgt = Math.round(parentTgt * 100) / 100;
          parentAct = Math.round(parentAct * 100) / 100;
        }

        parentKpi.targetValue = parentTgt;
        parentKpi.actualValue = parentAct;
      });
    }
  }

  console.log(`Đã tính toán xong đồng bộ (${syncCount} chỉ tiêu cập nhật) và Rollup cây chỉ tiêu SCVN.`);

  // 5. Save modified SCVN items to DB in bulk
  console.log("5. Lưu thay đổi SCVN vào CSDL...");
  const updateItems = [];
  for (const item of scvnDataMap.values()) {
    const orig = freshScvnRecs.find(r => r.id === item.id);
    if (orig && (orig.targetValue !== item.targetValue || orig.actualValue !== item.actualValue || orig.isOverridden !== item.isOverridden)) {
      updateItems.push(item);
    }
  }

  if (updateItems.length > 0) {
    console.log(`Chạy ${updateItems.length} lệnh update CSDL...`);
    for (let i = 0; i < updateItems.length; i += 100) {
      const chunk = updateItems.slice(i, i + 100);
      await prisma.$transaction(
        chunk.map(item => prisma.kpiData.update({
          where: { id: item.id },
          data: {
            targetValue: item.targetValue,
            actualValue: item.actualValue,
            isOverridden: item.isOverridden
          }
        }))
      );
    }
  }

  // 6. Update sconnect-web/lib/all_kpi_records.json fallback cache
  console.log("6. Cập nhật file all_kpi_records.json...");
  const jsonPath = path.join(__dirname, "..", "lib", "all_kpi_records.json");
  if (fs.existsSync(jsonPath)) {
    const dbAllScvn = await prisma.kpiData.findMany({ where: { unitCode: 'SCVN' } });
    const existingJson = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
    const otherUnitsJson = existingJson.filter(r => r.unitCode !== 'SCVN');
    const finalJson = [...otherUnitsJson, ...dbAllScvn.map(r => ({ ...r }))];
    fs.writeFileSync(jsonPath, JSON.stringify(finalJson, null, 2), "utf-8");
    console.log(`Tệp all_kpi_records.json đã cập nhật (${finalJson.length} bản ghi total).`);
  }

  console.log("=== CHUẨN HÓA & ĐỒNG BỘ CSDL SCVN HOÀN TẤT TRÊN LOCAL ===");
  await prisma.$disconnect();
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
