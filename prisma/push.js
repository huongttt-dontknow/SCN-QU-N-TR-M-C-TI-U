const { execSync } = require('child_process');
try {
  console.log("Starting Prisma DB Push with auto-confirm...");
  const output = execSync('npx prisma db push --skip-generate', { input: 'y\n', encoding: 'utf-8' });
  console.log("Prisma output:\n", output);
  console.log("Prisma DB Push completed successfully!");
} catch (err) {
  console.error("Prisma DB Push failed:");
  console.error(err.stdout || err.message);
  process.exit(1);
}
