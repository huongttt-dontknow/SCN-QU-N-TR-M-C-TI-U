const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.kpiData.count();
  console.log(`Total KpiData records in DB: ${count}`);
  
  if (count > 0) {
    const samples = await prisma.kpiData.findMany({ take: 5 });
    for (const s of samples) {
      console.log(`  ID: ${s.id} | Code: ${s.indicatorCode} | Unit: ${s.unitCode} | Period: ${s.periodKey} | Target: ${s.targetValue} | Actual: ${s.actualValue}`);
    }
  }
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
