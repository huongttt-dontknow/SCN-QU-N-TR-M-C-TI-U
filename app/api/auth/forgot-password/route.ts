import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: Request) {
  try {
    const { email, employeeCode, adminEmail, note } = await request.json();

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Vui lòng nhập Email công ty!" },
        { status: 400 }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const cleanCode = (employeeCode || "").trim().toUpperCase();

    if (!cleanEmail.endsWith("@s-connect.net")) {
      return NextResponse.json(
        { error: "Email phải có tên miền @s-connect.net!" },
        { status: 400 }
      );
    }

    const targetAdmin = (adminEmail || "lyttd@s-connect.net").toLowerCase();
    const allowedAdmins = ["lyttd@s-connect.net", "huongttt@s-connect.net"];
    const finalAdmin = allowedAdmins.includes(targetAdmin)
      ? targetAdmin
      : "lyttd@s-connect.net";

    let foundUser = null;
    try {
      foundUser = await prisma.user.findFirst({
        where: {
          OR: [
            { email: cleanEmail },
            ...(cleanCode ? [{ employeeCode: cleanCode }] : []),
          ],
        },
      });
    } catch (dbErr) {
      console.warn("DB check user failed, proceeding with mock check:", dbErr);
    }

    // Ghi nhận Audit Log hệ thống
    await createAuditLog(
      cleanEmail,
      "FORGOT_PASSWORD_REQUEST",
      "auth",
      `Yêu cầu cấp lại mật khẩu từ nhân sự: ${cleanEmail} (Mã SCN: ${cleanCode || "N/A"}). Email Admin nhận: ${finalAdmin}. Ghi chú: ${note || "Không có"}`
    );

    return NextResponse.json({
      success: true,
      message: `Yêu cầu hỗ trợ cấp lại mật khẩu đã được gửi đến Admin (${finalAdmin}). Admin sẽ xác minh và cấp lại mật khẩu cho bạn trong thời gian sớm nhất.`,
      userFound: !!foundUser,
      targetAdmin: finalAdmin,
    });
  } catch (error: any) {
    console.error("Lỗi API forgot-password:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi gửi yêu cầu hỗ trợ. Vui lòng thử lại sau." },
      { status: 500 }
    );
  }
}
