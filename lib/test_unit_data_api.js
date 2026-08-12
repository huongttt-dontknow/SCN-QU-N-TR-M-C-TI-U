const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function run() {
  const unitCode = "SCVN";
  const periodKey = "monthly_7";
  const periodType = "monthly";

  console.log(`--- Đang truy vấn CSDL cho: unitCode=${unitCode}, periodKey=${periodKey}, periodType=${periodType} ---`);
  
  const records = await prisma.kpiData.findMany({
    where: {
      unitCode,
      productCode: null,
      periodKey,
      periodType
    }
  });
  console.log("Số lượng bản ghi tìm thấy trong DB:", records.length);
  if (records.length > 0) {
    console.log("Chi tiết bản ghi đầu tiên:", records[0]);
  }

  // Chạy thử logic tự động kiểm tra và đồng bộ
  const unitTemplates = await prisma.kpiData.findMany({
    where: { unitCode, productCode: null },
    distinct: ["indicatorCode"]
  });
  console.log("Số lượng template tìm thấy:", unitTemplates.length);
  if (unitTemplates.length > 0) {
    console.log("Danh sách mã indicatorCode từ template:", unitTemplates.map(t => t.indicatorCode));
  }
}

run().catch(console.error);
