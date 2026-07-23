import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

export async function POST(request: Request) {
  try {
    const operator = request.headers.get("x-operator-email") || "system@s-connect.net";
    const { users } = await request.json();

    if (!Array.isArray(users)) {
      return NextResponse.json({ error: "Dữ liệu không hợp lệ, phải là danh sách người dùng" }, { status: 400 });
    }

    const results = [];
    for (const u of users) {
      const employeeCode = (u.employeeCode || "").trim();
      const fullname = (u.fullname || "").trim();
      const email = (u.email || "").trim().toLowerCase();
      const role = (u.role || "Người dùng").trim();
      const unitCode = (u.unitCode || "SCVN").trim();

      if (!employeeCode || !fullname || !email) {
        continue; // Bỏ qua bản ghi thiếu thông tin bắt buộc
      }

      // Thực hiện Upsert dựa trên email và employeeCode
      const upsertedUser = await prisma.user.upsert({
        where: { email },
        update: { employeeCode, fullname, role, unitCode },
        create: { employeeCode, fullname, email, role, unitCode },
      });

      results.push(upsertedUser);
    }

    // Ghi log nhập CSV thành công
    await createAuditLog(
      operator,
      "CREATE",
      "permissions",
      `Đồng bộ / Nhập danh sách nhân sự từ CSV: ${results.length} người dùng.`
    );

    return NextResponse.json({
      success: true,
      message: `Đã nạp thành công ${results.length} người dùng vào hệ thống.`,
      count: results.length
    });

  } catch (error: any) {
    console.error("Lỗi nhập dữ liệu người dùng:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
