import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
  try {
    const jsonPath = path.resolve(process.cwd(), "../scratch/excel_products.json");
    if (!fs.existsSync(jsonPath)) {
      return NextResponse.json([]);
    }
    const raw = fs.readFileSync(jsonPath, "utf-8");
    const products = JSON.parse(raw);
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
