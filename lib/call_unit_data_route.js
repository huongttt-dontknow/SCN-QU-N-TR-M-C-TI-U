const { GET } = require("../app/api/kpi/unit-data/route.ts");

async function main() {
  const req = new Request("http://localhost/api/kpi/unit-data?unitCode=Wofloo&periodType=weekly&month=7&week=4&quarter=Q3&year=2026");
  const res = await GET(req);
  const json = await res.json();
  console.log("Returned rows length:", json.length);
  const wm = json.filter(r => r.code.includes("WM1"));
  console.log("WM rows returned:", wm);
  const vm = json.filter(r => r.code.includes("VM1-I02"));
  console.log("VM1-I02 rows returned:", vm);
}

main().catch(err => {
  console.error(err);
});
