const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("Starting seeding of KpiData from JSON...");

  const jsonPath = path.join(__dirname, "../../scratch/all_kpi_records.json");
  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: JSON file not found at ${jsonPath}`);
    process.exit(1);
  }

  const kpis = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  console.log(`Read ${kpis.length} KPI records from JSON.`);

  console.log("Cleaning up existing KpiData records...");
  await prisma.kpiData.deleteMany({});
  console.log("Cleanup finished.");

  // To avoid batch size limitations, insert in chunks of 5000
  const chunkSize = 5000;
  for (let i = 0; i < kpis.length; i += chunkSize) {
    const chunk = kpis.slice(i, i + chunkSize);
    console.log(`Inserting chunk ${i / chunkSize + 1} (${chunk.length} records)...`);
    
    await prisma.kpiData.createMany({
      data: chunk.map(k => ({
        indicatorCode: k.indicatorCode,
        unitCode: k.unitCode,
        periodType: k.periodType,
        periodKey: k.periodKey,
        targetValue: k.targetValue,
        actualValue: k.actualValue,
        pic: k.pic,
        status: k.status,
        title: k.title,
        unit: k.unit,
        formula: k.formula,
        group: k.group,
        parentCode: k.parentCode
      })),
      skipDuplicates: true
    });
  }

  console.log("KpiData database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
