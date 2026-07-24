const { execSync } = require("child_process");
const path = require("path");

async function run() {
  console.log("Starting Sconnect OMS Database Seeding Master Process...\n");
  
  const scripts = [
    "seed_q3_okrs.js",
    "seed_kpi_data.js",
    "seed_product_kpi.js",
    "update_pic_2026.js"
  ];
  
  for (const script of scripts) {
    console.log(`=========================================`);
    console.log(`EXECUTING: ${script}`);
    console.log(`=========================================`);
    try {
      execSync(`node "${path.join(__dirname, script)}"`, { stdio: "inherit" });
      console.log(`SUCCESS: Completed ${script} successfully!\n`);
    } catch (err) {
      console.error(`FAILURE: Error running ${script}:`, err.message);
      process.exit(1);
    }
  }
  
  console.log("=========================================");
  console.log("Sconnect OMS Database Seeding Master Process Finished Successfully!");
  console.log("=========================================");
}

run();
