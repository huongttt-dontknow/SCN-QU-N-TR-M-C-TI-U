import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: Request) {
  try {
    const { idToken, email: mockEmail, password, deviceId, userAgent } = await request.json();

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

    // 3.5. Kiểm soát số lượng thiết bị đăng nhập (Tối đa 5 thiết bị)
    const clientDeviceId = deviceId || "default-device";
    const clientUserAgent = userAgent || "Không rõ trình duyệt";

    const existingDevice = await prisma.userDevice.findUnique({
      where: {
        userId_deviceId: {
          userId: user.id,
          deviceId: clientDeviceId
        }
      }
    });

    if (!existingDevice) {
      // Thiết bị mới. Kiểm tra số lượng thiết bị hiện có
      const devices = await prisma.userDevice.findMany({
        where: { userId: user.id },
        orderBy: { lastActive: "asc" } // Thiết bị hoạt động cũ nhất lên đầu
      });

      if (devices.length >= 5) {
        // Đã đạt/vượt ngưỡng 5 thiết bị -> Xóa thiết bị hoạt động cũ nhất để nhường chỗ
        const toDeleteCount = devices.length - 5 + 1;
        const devicesToDelete = devices.slice(0, toDeleteCount);
        for (const d of devicesToDelete) {
          await prisma.userDevice.delete({ where: { id: d.id } });
          
          await createAuditLog(
            email,
            "LOGOUT",
            "system",
            `Hệ thống tự động đăng xuất thiết bị cũ: ${d.userAgent || "Không rõ"} do đăng nhập thiết bị mới vượt giới hạn 5 thiết bị`
          );
        }
      }

      // Tạo thiết bị mới
      await prisma.userDevice.create({
        data: {
          userId: user.id,
          deviceId: clientDeviceId,
          userAgent: clientUserAgent,
          ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1"
        }
      });
    } else {
      // Thiết bị cũ quay lại -> Cập nhật thời gian hoạt động mới nhất
      await prisma.userDevice.update({
        where: { id: existingDevice.id },
        data: {
          lastActive: new Date(),
          userAgent: clientUserAgent,
          ipAddress: request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || existingDevice.ipAddress
        }
      });
    }

    // Ghi nhận lịch sử đăng nhập vào Access Logs
    await createAuditLog(
      email,
      "LOGIN",
      "system",
      `${user.fullname} (Đăng nhập hệ thống bằng ${idToken ? "Google" : "Email/Password"} trên thiết bị ${clientUserAgent})`
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
