import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = (searchParams.get("email") || "").trim().toLowerCase();
    const deviceId = (searchParams.get("deviceId") || "").trim();

    if (!email || !deviceId) {
      return NextResponse.json({ valid: false, error: "Thiếu thông tin email hoặc deviceId" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        devices: {
          where: { deviceId }
        }
      }
    });

    if (!user) {
      return NextResponse.json({ valid: false, error: "Tài khoản không tồn tại trên hệ thống" }, { status: 404 });
    }

    const device = user.devices[0];

    if (!device) {
      return NextResponse.json({
        valid: false,
        error: "Thiết bị này đã bị đăng xuất do vượt quá giới hạn 5 thiết bị truy cập đồng thời hoặc bị thu hồi phiên."
      });
    }

    // Cập nhật lastActive cho thiết bị
    await prisma.userDevice.update({
      where: { id: device.id },
      data: { lastActive: new Date() }
    });

    return NextResponse.json({ valid: true });

  } catch (error: any) {
    console.error("Lỗi xác thực phiên thiết bị:", error);
    return NextResponse.json({ valid: false, error: "Lỗi hệ thống khi xác thực phiên" }, { status: 500 });
  }
}
