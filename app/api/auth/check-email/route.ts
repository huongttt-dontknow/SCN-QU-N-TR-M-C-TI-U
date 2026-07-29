import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return NextResponse.json({
        registered: false,
        error: `Tài khoản '${email}' chưa được phân quyền trên hệ thống. Vui lòng liên hệ Admin.`
      });
    }

    return NextResponse.json({
      registered: true,
      hasPassword: !!user.password
    });
  } catch (error: any) {
    console.error("Lỗi kiểm tra email:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra khi kiểm tra tài khoản" }, { status: 500 });
  }
}
