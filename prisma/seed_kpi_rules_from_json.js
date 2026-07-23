const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed_kpi_rules_from_json...");
  const jsonPath = path.resolve(__dirname, "../../scratch/kpi_rules_temp.json");
  const rawData = fs.readFileSync(jsonPath, "utf-8");
  const rules = JSON.parse(rawData);

  console.log(`Loaded ${rules.length} rules from JSON.`);

  let updatedCount = 0;
  let createdCount = 0;

  for (const rule of rules) {
    const code = rule.indicatorCode;
    const name = rule.title;
    const group = rule.group;
    const unit = rule.unit;
    const freq = rule.frequency;
    const agg = rule.aggregationMethod;
    const formula = rule.formula;
    const parentCode = rule.parentCode;

    // 1. Update all existing records for this indicatorCode in the database
    const updateRes = await prisma.kpiData.updateMany({
      where: { indicatorCode: code },
      data: {
        title: name,
        unit: unit,
        formula: formula,
        group: group,
        frequency: freq,
        aggregationMethod: agg
      }
    });
    updatedCount += updateRes.count;

    // 2. Make sure that for unitCode = 'SCVN', we have records.
    // If not, create them!
    const scvnCount = await prisma.kpiData.count({
      where: { indicatorCode: code, unitCode: "SCVN" }
    });

    if (scvnCount === 0) {
      const periodsToCreate = [
        { key: "yearly_2026", type: "yearly" },
        { key: "quarterly_3", type: "quarterly" },
        { key: "monthly_7", type: "monthly" },
        { key: "weekly_7_1", type: "weekly" },
        { key: "weekly_7_2", type: "weekly" },
        { key: "weekly_7_3", type: "weekly" },
        { key: "weekly_7_4", type: "weekly" },
        { key: "weekly_7_5", type: "weekly" }
      ];

      for (const p of periodsToCreate) {
        // Skip weekly if frequency is monthly or quarterly
        if (p.type === "weekly" && freq.includes("tháng")) continue;
        if (p.type === "weekly" && freq.includes("quý")) continue;
        if (p.type === "monthly" && freq.includes("quý")) continue;

        await prisma.kpiData.create({
          data: {
            indicatorCode: code,
            unitCode: "SCVN",
            periodType: p.type,
            periodKey: p.key,
            targetValue: 0,
            actualValue: 0,
            title: name,
            unit: unit,
            formula: formula,
            group: group,
            parentCode: parentCode,
            frequency: freq,
            aggregationMethod: agg,
            isOverridden: false
          }
        });
        createdCount++;
      }
    }
  }

  console.log("Finished seeding KPI rules from JSON successfully!");
  console.log(`Total existing records updated with rules: ${updatedCount}`);
  console.log(`Total new SCVN records initialized: ${createdCount}`);
  process.exit(0);
}

main().catch(err => {
  console.error("Error seeding KPI rules:", err);
  process.exit(1);
});
