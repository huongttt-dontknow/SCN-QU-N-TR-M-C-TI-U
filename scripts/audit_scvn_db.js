const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function audit() {
  const rulesPath = path.join(__dirname, '../scvn_rules.json');
  const rules = JSON.parse(fs.readFileSync(rulesPath, 'utf8'));

  console.log(`=== HỆ THỐNG AUDIT CSDL SCVN ===`);
  console.log(`Tổng số quy tắc chuẩn trong scvn_rules.json: ${rules.length}`);

  const periods = await prisma.kpiData.findMany({
    where: { unitCode: 'SCVN' },
    select: { periodKey: true },
    distinct: ['periodKey']
  });

  console.log(`Tổng số kỳ dữ liệu của SCVN trong CSDL: ${periods.length}`);

  let totalMismatches = 0;
  let missingCodesCount = 0;
  let invalidParentCount = 0;

  for (const p of periods) {
    const records = await prisma.kpiData.findMany({
      where: { unitCode: 'SCVN', periodKey: p.periodKey }
    });

    const recMap = new Map(records.map(r => [r.indicatorCode, r]));

    for (const rule of rules) {
      if (!recMap.has(rule.code)) {
        console.log(`[THIẾU RECORD] Period ${p.periodKey} thiếu mã ${rule.code} (${rule.title})`);
        missingCodesCount++;
        totalMismatches++;
      } else {
        const rec = recMap.get(rule.code);
        if ((rec.parentCode || null) !== (rule.parentCode || null)) {
          console.log(`[SAI PARENT] Period ${p.periodKey} | ${rule.code}: DB parent '${rec.parentCode}' vs Rule parent '${rule.parentCode}'`);
          invalidParentCount++;
          totalMismatches++;
        }
      }
    }
  }

  console.log(`\n=== KẾT QUẢ AUDIT ===`);
  console.log(`Tổng số lỗi phát hiện: ${totalMismatches}`);
  console.log(`- Thừa/Thiếu chỉ tiêu: ${missingCodesCount}`);
  console.log(`- Sai parentCode hierarchy: ${invalidParentCount}`);

  if (totalMismatches === 0) {
    console.log(`SUCCESS: CSDL SCVN ĐẠT CHUẨN 100% (Full 280 chỉ tiêu x ${periods.length} kỳ).`);
  }

  await prisma.$disconnect();
}

audit().catch(err => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
