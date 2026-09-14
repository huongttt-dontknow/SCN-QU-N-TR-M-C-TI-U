const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const v1mRecs = await prisma.kpiData.findMany({
    where: {
      unitCode: 'SCVN',
      title: { contains: 'Video >1M' }
    },
    select: { id: true, indicatorCode: true, parentCode: true, title: true, periodKey: true, periodType: true }
  });

  console.log(`Total Video >1M records for SCVN: ${v1mRecs.length}`);
  const parentCodeCounts = {};
  v1mRecs.forEach(r => {
    parentCodeCounts[r.parentCode] = (parentCodeCounts[r.parentCode] || 0) + 1;
  });
  console.log("ParentCode distribution:", parentCodeCounts);

  const sampleByCode = {};
  v1mRecs.forEach(r => {
    if (!sampleByCode[r.indicatorCode]) {
      sampleByCode[r.indicatorCode] = { indicatorCode: r.indicatorCode, title: r.title, parentCode: r.parentCode };
    }
  });
  console.log("Sample records by indicatorCode:", Object.values(sampleByCode));

  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  prisma.$disconnect();
});
