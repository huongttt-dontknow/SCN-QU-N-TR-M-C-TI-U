const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const leaderMapping = {
  Wofloo: "Lê Đăng Khoa",
  AS: "Trịnh Quốc Thịnh",
  NDTH: "Lò Quế Hằng",
  Lego: "Lê Quỳnh Nga",
  DA01: "Trần Thị Diệu Ly",
  SCS: "Nguyễn Ánh Tùng",
  Music: "Vũ Trung Đức"
};

async function main() {
  console.log("Updating KeyResult PICs in the database for 2026 periods...");

  for (const [unitCode, leaderName] of Object.entries(leaderMapping)) {
    console.log(`Updating unit ${unitCode} -> Leader: ${leaderName}...`);
    
    // Find all objectives for this unit in 2026 periods
    const objectives = await prisma.objective.findMany({
      where: {
        unitCode,
        period: { endsWith: "_2026" }
      }
    });

    const objectiveIds = objectives.map(o => o.id);

    if (objectiveIds.length > 0) {
      const result = await prisma.keyResult.updateMany({
        where: {
          objectiveId: { in: objectiveIds }
        },
        data: {
          pic: leaderName
        }
      });
      console.log(`Updated ${result.count} KeyResults for ${unitCode}.`);
    } else {
      console.log(`No objectives found for ${unitCode} in 2026 periods.`);
    }
  }

  console.log("Database update completed successfully.");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
