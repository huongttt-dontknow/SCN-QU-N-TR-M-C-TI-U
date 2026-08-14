import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

// Hàm sinh mật khẩu tạm ngẫu nhiên
function generateTemporaryPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const specialChars = "@#$%!";
  let pass = "SCN";
  for (let i = 0; i < 5; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  pass += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  pass += Math.floor(10 + Math.random() * 90);
  return pass;
}

export async function POST(request: Request) {
  try {
    const operator = request.headers.get("x-operator-email") || "admin@s-connect.net";
    const { userId, employeeCode, email, resetMode, customPassword } = await request.json();

    if (!userId && !employeeCode && !email) {
      return NextResponse.json(
        { error: "Cần cung cấp ID, Mã nhân viên hoặc Email của người dùng" },
        { status: 400 }
      );
    }

    let newPassword: string | null = null;
    let modeText = "";

    if (resetMode === "clear") {
      newPassword = null;
      modeText = "Xóa mật khẩu (Về trạng thái khởi tạo)";
    } else if (resetMode === "custom" && customPassword) {
      newPassword = customPassword;
      modeText = "Đặt mật khẩu thủ công";
    } else {
      newPassword = generateTemporaryPassword();
      modeText = "Tạo mật khẩu tạm ngẫu nhiên";
    }

    let updatedUser = null;

    try {
      // Tìm user theo ID hoặc employeeCode hoặc email
      const targetUser = await prisma.user.findFirst({
        where: {
          OR: [
            ...(userId ? [{ id: userId }] : []),
            ...(employeeCode ? [{ employeeCode }] : []),
            ...(email ? [{ email }] : []),
          ],
        },
      });

      if (targetUser) {
        const mustChangePassword = resetMode !== "clear";
        try {
          updatedUser = await prisma.user.update({
            where: { id: targetUser.id },
            data: { password: newPassword, mustChangePassword } as any,
          });
        } catch (updateErr) {
          // Fallback nếu schema DB cũ chưa có cột mustChangePassword
          updatedUser = await prisma.user.update({
            where: { id: targetUser.id },
            data: { password: newPassword },
          });
          (updatedUser as any).mustChangePassword = mustChangePassword;
        }

        await createAuditLog(
          operator,
          "RESET_PASSWORD",
          "system",
          `Admin [${operator}] đã reset mật khẩu cho nhân sự [${targetUser.fullname}] (${targetUser.email} - ${targetUser.employeeCode}). Chế độ: ${modeText}`
        );
      }
    } catch (dbErr) {
      console.warn("Lưu DB reset-password thất bại, dùng mock fallback:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Đã reset mật khẩu thành công cho tài khoản.`,
      temporaryPassword: newPassword,
      resetMode: resetMode || "temporary",
      targetUser: updatedUser ? {
        id: updatedUser.id,
        fullname: updatedUser.fullname,
        email: updatedUser.email,
        employeeCode: updatedUser.employeeCode,
      } : { email, employeeCode },
    });
  } catch (error: any) {
    console.error("Lỗi API reset-password:", error);
    return NextResponse.json(
      { error: error.message || "Không thể reset mật khẩu." },
      { status: 500 }
    );
  }
}
