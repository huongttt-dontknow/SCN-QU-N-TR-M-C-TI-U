import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: Request) {
  try {
    const { idToken, email: mockEmail, password } = await request.json();

    let email = "";
    let fullname = "";

    // 1. Dành cho Môi trường chạy thử hoặc Mô phỏng nếu không truyền idToken
    if (!idToken && mockEmail) {
      email = mockEmail.trim().toLowerCase();
    } else if (idToken) {
      // 2. Xác thực Token trực tiếp qua Google OAuth2 API
      const verifyRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
      if (!verifyRes.ok) {
        return NextResponse.json({ error: "Google ID Token không hợp lệ hoặc đã hết hạn" }, { status: 400 });
      }

      const payload = await verifyRes.json();
      email = (payload.email || "").trim().toLowerCase();
      fullname = payload.name || "";

      // Xác minh email thuộc Google Workspace Sconnect
      if (!email.endsWith("@s-connect.net")) {
        return NextResponse.json({ error: "Hệ thống chỉ chấp nhận đăng nhập bằng email Sconnect (@s-connect.net)" }, { status: 403 });
      }
    } else {
      return NextResponse.json({ error: "Thiếu thông tin xác thực" }, { status: 400 });
    }

    // 3. Đối chiếu với danh sách phân quyền trong Database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ 
        error: `Tài khoản '${email}' chưa được phân quyền trên hệ thống. Vui lòng liên hệ Admin.` 
      }, { status: 403 });
    }

    // 4. Nếu đăng nhập bằng email (không qua Google OAuth), xác thực mật khẩu
    if (!idToken) {
      if (!password) {
        return NextResponse.json({ error: "Vui lòng nhập mật khẩu" }, { status: 400 });
      }

      if (!user.password) {
        // Tài khoản chưa đặt mật khẩu -> Thiết lập mật khẩu lần đầu
        await prisma.user.update({
          where: { id: user.id },
          data: { password }
        });
      } else {
        // So khớp mật khẩu
        if (user.password !== password) {
          return NextResponse.json({ error: "Mật khẩu không chính xác" }, { status: 401 });
        }
      }
    }

    // Ghi nhận lịch sử đăng nhập vào Access Logs
    await createAuditLog(
      email,
      "LOGIN",
      "system",
      `${user.fullname} (Đăng nhập hệ thống bằng ${idToken ? "Google" : "Email/Password"})`
    );

    // Trả về thông tin người dùng và quyền truy cập
    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        employeeCode: user.employeeCode,
        fullname: user.fullname || fullname,
        email: user.email,
        role: user.role,
        unitCode: user.unitCode,
      }
    });

  } catch (error: any) {
    console.error("Lỗi đăng nhập:", error);
    return NextResponse.json({ error: "Có lỗi xảy ra trong quá trình xác thực" }, { status: 500 });
  }
}
