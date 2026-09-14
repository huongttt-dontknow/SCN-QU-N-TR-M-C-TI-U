const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const normalizeCodeForMatch = (code) => {
  if (!code) return "";
  return code.trim();
};

const isParentChildMatch = (parentCodeCandidate, childParentCode) => {
  if (!childParentCode || !parentCodeCandidate) return false;
  const normParent = normalizeCodeForMatch(parentCodeCandidate);
  const normChildParent = normalizeCodeForMatch(childParentCode);
  if (normParent === normChildParent) return true;
  
  const pBase = normParent.replace(/^[TVSDMN]/i, "");
  const cBase = normChildParent.replace(/^[TVSDMN]/i, "");
  return pBase !== "" && pBase === cBase;
};

const findParentKpiInList = (list, childParentCode) => {
  if (!childParentCode) return undefined;
  const normChildParent = normalizeCodeForMatch(childParentCode);
  const exact = list.find(k => normalizeCodeForMatch(k.indicatorCode || k.code) === normChildParent);
  if (exact) return exact;
  return list.find(k => isParentChildMatch(k.indicatorCode || k.code, childParentCode));
};

async function main() {
  const kpis = await prisma.kpiData.findMany({
    where: { unitCode: 'SCVN', periodKey: 'monthly_9', periodType: 'monthly' }
  });

  const findParent = (pk) => {
    if (!pk.parentCode) return null;
    return findParentKpiInList(kpis, pk.parentCode) || null;
  };

  const childrenMap = new Map();
  const rootItems = [];

  kpis.forEach(pk => {
    const parent = findParent(pk);
    const code = pk.indicatorCode;
    if (parent) {
      const pCode = parent.indicatorCode;
      const list = childrenMap.get(pCode) || [];
      list.push(pk);
      childrenMap.set(pCode, list);
    } else {
      rootItems.push(pk);
    }
  });

  console.log("Children of TM2-I02.01 (SL video đạt 1M view):");
  const children1M = childrenMap.get("TM2-I02.01") || [];
  children1M.forEach(c => console.log(`  - [${c.indicatorCode}] ${c.title} (parent: ${c.parentCode})`));

  console.log("\nChildren of VM2-I02.01 (Số sản phẩm phái sinh):");
  const childrenPhaiSinh = childrenMap.get("VM2-I02.01") || [];
  childrenPhaiSinh.forEach(c => console.log(`  - [${c.indicatorCode}] ${c.title} (parent: ${c.parentCode})`));

  console.log("\nChildren of VM2-I01.03-NDTH (BP NDTH):");
  const childrenNDTH = childrenMap.get("VM2-I01.03-NDTH") || [];
  childrenNDTH.forEach(c => console.log(`  - [${c.indicatorCode}] ${c.title} (parent: ${c.parentCode})`));

  await prisma.$disconnect();
}

main().catch(err => {
  console.error(err);
  prisma.$disconnect();
});
