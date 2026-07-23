const { PrismaClient } = require("@prisma/client");
const xlsx = require("xlsx");
const path = require("path");

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed_kpi_rules...");
  const excelPath = path.resolve(__dirname, "../Ma_Tran_7_Muc_Tieu_AntiGravity.xlsx");
  const workbook = xlsx.readFile(excelPath);
  const sheet = workbook.Sheets["Target_Matrix_Spec"];

  if (!sheet) {
    console.error("Sheet 'Target_Matrix_Spec' not found in Excel!");
    process.exit(1);
  }

  const range = xlsx.utils.decode_range(sheet["!ref"]);
  console.log(`Decoding range: Row 4 to ${range.e.r + 1}`);

  let updatedCount = 0;
  let createdCount = 0;

  // We will loop from row 4 (index 3) to the end
  for (let r = 3; r <= range.e.r; r++) {
    const groupCell = sheet[xlsx.utils.encode_cell({ r, c: 0 })];
    const groupNameCell = sheet[xlsx.utils.encode_cell({ r, c: 1 })];
    const codeCell = sheet[xlsx.utils.encode_cell({ r, c: 2 })];
    const nameCell = sheet[xlsx.utils.encode_cell({ r, c: 3 })];
    const unitCell = sheet[xlsx.utils.encode_cell({ r, c: 4 })];
    const freqCell = sheet[xlsx.utils.encode_cell({ r, c: 5 })];
    const aggCell = sheet[xlsx.utils.encode_cell({ r, c: 9 })];
    const descCell = sheet[xlsx.utils.encode_cell({ r, c: 10 })];

    if (!codeCell || !codeCell.v) continue;

    const code = String(codeCell.v).trim();
    const name = nameCell ? String(nameCell.v).trim() : code;
    const group = groupCell && groupNameCell ? `${groupCell.v}. ${groupNameCell.v}` : "M1. TÀI CHÍNH";
    const unit = unitCell ? String(unitCell.v).trim() : "";
    const freq = freqCell ? String(freqCell.v).trim().toLowerCase() : "tuần";
    const agg = aggCell ? String(aggCell.v).trim().toUpperCase() : "SUM";
    const formula = descCell ? String(descCell.v).trim() : "";

    console.log(`Processing Rule -> Code: ${code} | Name: ${name} | Freq: ${freq} | Agg: ${agg}`);

    // Standardize freq to English: tuần -> weekly, tháng -> monthly, quý -> quarterly
    let periodType = "weekly";
    if (freq.includes("tháng")) periodType = "monthly";
    else if (freq.includes("quý")) periodType = "quarterly";

    // 1. Update all existing records for this indicatorCode in the DB
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

    // 2. Make sure that for unitCode = 'SCVN' (or others), we have at least one record.
    // If SCVN has no templates/records for this indicator, let's create a template record for it!
    const scvnCount = await prisma.kpiData.count({
      where: { indicatorCode: code, unitCode: "SCVN" }
    });

    if (scvnCount === 0) {
      // Let's create default records for this indicator for SCVN (e.g. yearly_2026, quarterly_3, monthly_7, and weekly_7_1 to weekly_7_5)
      // This will ensure SCVN starts with these indicators fully initialized!
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
        // Skip weekly if the base frequency is monthly or quarterly
        if (p.type === "weekly" && periodType !== "weekly") continue;
        if (p.type === "monthly" && periodType === "quarterly") continue;

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
            parentCode: code.split("-")[0],
            frequency: freq,
            aggregationMethod: agg,
            isOverridden: false
          }
        });
        createdCount++;
      }
    }
  }

  console.log(`Finished seed_kpi_rules successfully!`);
  console.log(`Total existing records updated: ${updatedCount}`);
  console.log(`Total new SCVN records created: ${createdCount}`);
  process.exit(0);
}

main().catch(err => {
  console.error("Error running seed_kpi_rules:", err);
  process.exit(1);
});
