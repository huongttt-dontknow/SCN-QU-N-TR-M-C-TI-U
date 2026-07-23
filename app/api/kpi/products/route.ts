import { NextResponse } from "next/server";
import { PRODUCTS_CATALOG } from "@/lib/products_catalog";

export async function GET() {
  try {
    return NextResponse.json(PRODUCTS_CATALOG);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
