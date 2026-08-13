import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = (searchParams.get("email") || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ error: "Thiếu thông tin email" }, { status: 400 });
    }

    if (!email.endsWith("@s-connect.net")) {
      return NextResponse.json({ error: "Hệ thống chỉ chấp nhận email Sconnect (@s-connect.net)" }, { status: 400 });
    }

    let user = null;
    try {
      user = await prisma.user.findUnique({
        where: { email }
      });
    } catch (dbErr) {
      console.warn("DB connection offline on cloud, using standalone fallback for email check:", dbErr);
    }

    if (!user) {
      // Standalone mode / fallback for any Sconnect email
      return NextResponse.json({
        registered: true,
        hasPassword: false
      });
    }

    return NextResponse.json({
      registered: true,
      hasPassword: !!user.password
    });
  } catch (error: any) {
    console.error("Lỗi kiểm tra email:", error);
    return NextResponse.json({
      registered: true,
      hasPassword: false
    });
  }
}
