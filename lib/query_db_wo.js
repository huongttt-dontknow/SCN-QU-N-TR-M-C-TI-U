const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const records = await prisma.kpiData.findMany({
    where: { unitCode: "SCVN" },
    select: { indicatorCode: true },
    distinct: ["indicatorCode"]
  });
  const codes = records.map(r => r.indicatorCode).sort();
  console.log("All distinct indicatorCode for SCVN:");
  console.log(codes);
}

main().catch(err => {
  console.error(err);
}).finally(() => {
  prisma.$disconnect();
});
