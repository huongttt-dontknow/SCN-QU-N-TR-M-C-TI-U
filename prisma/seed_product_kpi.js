const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed_product_kpi...");
  const jsonPath = path.resolve(__dirname, "../../scratch/product_kpi_records.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const records = JSON.parse(rawData);

  console.log(`Loaded ${records.length} product KPI records from JSON.`);

  // 1. Delete existing product records to avoid duplicates
  const deleteRes = await prisma.kpiData.deleteMany({
    where: {
      productCode: {
        not: null
      }
    }
  });
  console.log(`Deleted ${deleteRes.count} existing product KPI records.`);

  // 2. Insert new records in batches
  const batchSize = 100;
  let insertedCount = 0;

  for (let i = 0; i < records.length; i += batchSize) {
    const batch = records.slice(i, i + batchSize);
    await prisma.kpiData.createMany({
      data: batch
    });
    insertedCount += batch.length;
    console.log(`Inserted batch: ${insertedCount}/${records.length}`);
  }

  console.log("Finished seeding product KPI records successfully!");
  process.exit(0);
}

main().catch(err => {
  console.error("Error seeding product KPIs:", err);
  process.exit(1);
});
