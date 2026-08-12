const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Starting clean_db_scvn...");

  // Select all SCVN records that match the exclusion pattern
  const allScvnKpis = await prisma.kpiData.findMany({
    where: {
      unitCode: "SCVN"
    },
    select: {
      id: true,
      indicatorCode: true,
      title: true
    }
  });

  const toDelete = allScvnKpis.filter(k => {
    const code = k.indicatorCode;
    const title = k.title || "";
    const isExcluded = 
      code.endsWith("-SCMU") || 
      code.endsWith("-SCS") || 
      code.endsWith("-CNGP") || 
      code.includes("-SCMU-") || 
      code.includes("-SCS-") || 
      code.includes("-CNGP-") || 
      title.includes("SCMU") || 
      title.includes("SCS") || 
      title.includes("CNGP");
    return isExcluded;
  });

  console.log(`Found ${toDelete.length} obsolete SCVN records to delete.`);

  if (toDelete.length > 0) {
    const ids = toDelete.map(k => k.id);
    const deleteRes = await prisma.kpiData.deleteMany({
      where: {
        id: { in: ids }
      }
    });
    console.log(`Deleted ${deleteRes.count} records from database successfully.`);
  } else {
    console.log("No records to delete.");
  }

  await prisma.$disconnect();
}

main().catch(err => {
  console.error("Error cleaning database:", err);
  process.exit(1);
});
