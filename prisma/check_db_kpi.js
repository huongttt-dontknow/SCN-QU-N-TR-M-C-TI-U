const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const records = await prisma.kpiData.findMany({
    where: {
      unitCode: 'Wofloo',
      periodKey: 'weekly_7_3'
    }
  });
  console.log('Total records for Wofloo weekly_7_3 in DB:', records.length);
  records.forEach(r => {
    console.log(`Code: ${r.indicatorCode} | Title: ${r.title} | Group: ${r.group} | Target: ${r.targetValue} | Parent: ${r.parentCode}`);
  });
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
