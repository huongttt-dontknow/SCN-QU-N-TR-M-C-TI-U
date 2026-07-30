const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

const renameMap = {
  "CM1-I02.01-DAmi": "VM1-I02.01-DA",
  "CM1-I02.01-QuIP": "VM1-I02.01-IP",
  "MM1-I02.01.01-CNGP": "CM1-I02.01-CNGP",
  "SM2-I02.01-SCMU": "VM2-I02.01-SCMU",
  "SM4-I02.06-SCMU": "MM4-I02.02",
  "TM4-I02.01": "TM4-I02.01-DA01",
  "VM1-I02.02-DA01": "DM1-I02.01-DA01",
  "VM5-I02.02-DA01": "DM7-I01.01"
};

async function main() {
  console.log("=== BẮT ĐẦU DI TRÚ VÀ CẬP NHẬT CHỈ TIÊU SCVN ===");
  
  const rulesPath = "C:\\Users\\admin\\.gemini\\antigravity\\brain\\157fccb7-a01f-49c8-8216-83497733d96d\\scratch\\scvn_rules.json";
  if (!fs.existsSync(rulesPath)) {
    console.error("Lỗi: Không tìm thấy file scvn_rules.json");
    process.exit(1);
  }
  
  const rules = JSON.parse(fs.readFileSync(rulesPath, "utf-8"));
  console.log(`Đã tải ${rules.length} chỉ tiêu từ scvn_rules.json`);

  // 1. Thực hiện di trú đổi mã chỉ tiêu để bảo toàn dữ liệu
  console.log("\n1. Đang chạy di trú đổi mã chỉ tiêu...");
  for (const [oldCode, newCode] of Object.entries(renameMap)) {
    const oldRecords = await prisma.kpiData.findMany({
      where: { indicatorCode: oldCode, unitCode: "SCVN" }
    });
    
    if (oldRecords.length > 0) {
      console.log(`Phát hiện ${oldRecords.length} bản ghi của mã cũ '${oldCode}'`);
      for (const oldRec of oldRecords) {
        // Kiểm tra xem đã có bản ghi mã mới cho kỳ này chưa
        const newRec = await prisma.kpiData.findFirst({
          where: { indicatorCode: newCode, unitCode: "SCVN", periodKey: oldRec.periodKey }
        });
        
        if (newRec) {
          // Sao chép giá trị sang mã mới, sau đó xóa mã cũ
          await prisma.kpiData.update({
            where: { id: newRec.id },
            data: {
              targetValue: oldRec.targetValue,
              actualValue: oldRec.actualValue,
              explanation: oldRec.explanation,
              status: oldRec.status
            }
          });
          await prisma.kpiData.delete({ where: { id: oldRec.id } });
          console.log(`  -> Gộp và xóa: ${oldRec.periodKey} | ${oldCode} ➔ ${newCode}`);
        } else {
          // Đổi trực tiếp mã cũ thành mã mới
          await prisma.kpiData.update({
            where: { id: oldRec.id },
            data: { indicatorCode: newCode }
          });
          console.log(`  -> Đổi mã trực tiếp: ${oldRec.periodKey} | ${oldCode} ➔ ${newCode}`);
        }
      }
    }
  }

  // 2. Cập nhật metadata hoặc seeding chỉ tiêu mới
  console.log("\n2. Đang cập nhật metadata và seeding chỉ tiêu mới cho SCVN...");
  
  const activePeriods = [
    { key: "yearly_2026", type: "yearly" },
    { key: "quarterly_3", type: "quarterly" },
    { key: "monthly_7", type: "monthly" },
    { key: "weekly_7_1", type: "weekly" },
    { key: "weekly_7_2", type: "weekly" },
    { key: "weekly_7_3", type: "weekly" },
    { key: "weekly_7_4", type: "weekly" },
    { key: "weekly_7_5", type: "weekly" }
  ];

  let updatedMetadataCount = 0;
  let createdRecordsCount = 0;

  for (const rule of rules) {
    const code = rule.code;
    const title = rule.title;
    const unit = rule.unit;
    const formula = rule.formula;
    const group = rule.group;
    const parentCode = rule.parentCode;
    const freq = rule.frequency; // weekly, monthly, quarterly, yearly
    const rollup = rule.rollup; // SUM, AVERAGE

    // Cập nhật metadata cho tất cả các bản ghi có sẵn của chỉ tiêu này trong DB
    const updateRes = await prisma.kpiData.updateMany({
      where: { indicatorCode: code, unitCode: "SCVN" },
      data: {
        title: title,
        unit: unit,
        formula: formula,
        group: group,
        parentCode: parentCode,
        frequency: freq,
        aggregationMethod: rollup
      }
    });
    updatedMetadataCount += updateRes.count;

    // Đảm bảo mỗi chỉ tiêu có đầy đủ bản ghi cho các kỳ báo cáo phù hợp
    for (const p of activePeriods) {
      // Bỏ qua kỳ tuần nếu chỉ tiêu tần suất là tháng/quý/năm
      if (p.type === "weekly" && freq !== "weekly") continue;
      // Bỏ qua kỳ tháng nếu chỉ tiêu tần suất là quý/năm
      if (p.type === "monthly" && freq !== "weekly" && freq !== "monthly") continue;
      // Bỏ qua kỳ quý nếu chỉ tiêu tần suất là năm
      if (p.type === "quarterly" && freq === "yearly") continue;

      const exists = await prisma.kpiData.count({
        where: { indicatorCode: code, unitCode: "SCVN", periodKey: p.key, periodType: p.type }
      });

      if (exists === 0) {
        await prisma.kpiData.create({
          data: {
            indicatorCode: code,
            unitCode: "SCVN",
            periodType: p.type,
            periodKey: p.key,
            targetValue: 0,
            actualValue: 0,
            title: title,
            unit: unit,
            formula: formula,
            group: group,
            parentCode: parentCode,
            frequency: freq,
            aggregationMethod: rollup,
            isOverridden: false,
            status: "Đang nhập"
          }
        });
        createdRecordsCount++;
      }
    }
  }

  console.log("\n=== HOÀN THÀNH DI TRÚ & SEEDING ===");
  console.log(`Số bản ghi đã cập nhật thông tin: ${updatedMetadataCount}`);
  console.log(`Số bản ghi kỳ mới đã được khởi tạo: ${createdRecordsCount}`);
  process.exit(0);
}

main().catch(err => {
  console.error("Lỗi chạy script di trú:", err);
  process.exit(1);
});
