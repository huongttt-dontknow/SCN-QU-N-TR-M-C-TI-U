import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users - Lấy danh sách người dùng
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { employeeCode: "asc" },
    });

    // Nếu CSDL trống, tự động nạp các user mặc định
    if (users.length === 0) {
      const defaultUsers = [
        { employeeCode: "SCN001", fullname: "Nguyễn Minh Trí", email: "trinm@s-connect.net", role: "Admin", unitCode: "SCVN" },
        { employeeCode: "SCN002", fullname: "Lê Quỳnh Nga", email: "ngalq@s-connect.net", role: "Quản trị viên", unitCode: "SCVN" },
        { employeeCode: "SCN003", fullname: "Lê Đăng Khoa", email: "khoald@s-connect.net", role: "Trưởng đơn vị", unitCode: "Wofloo" },
        { employeeCode: "SCN004", fullname: "Phạm Thùy Linh", email: "linhpt@s-connect.net", role: "Trưởng đơn vị", unitCode: "Music" },
        { employeeCode: "SCN005", fullname: "Trần Anh Tuấn", email: "tuanta@s-connect.net", role: "Người dùng", unitCode: "DA01" },
      ];

      await prisma.user.createMany({ data: defaultUsers });
      const seededUsers = await prisma.user.findMany({ orderBy: { employeeCode: "asc" } });
      return NextResponse.json(seededUsers);
    }

    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/users - Tạo người dùng mới
export async function POST(request: Request) {
  try {
    const { employeeCode, fullname, email, role, unitCode } = await request.json();

    if (!employeeCode || !fullname || !email || !role || !unitCode) {
      return NextResponse.json({ error: "Thiếu trường thông tin bắt buộc" }, { status: 400 });
    }

    // Kiểm tra trùng lặp
    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ employeeCode }, { email }],
      },
    });

    if (existing) {
      return NextResponse.json({ error: "Mã nhân viên hoặc Email đã tồn tại" }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: { employeeCode, fullname, email, role, unitCode },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE /api/users - Xóa người dùng
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Thiếu ID người dùng" }, { status: 400 });
    }

    await prisma.user.delete({ where: { id } });
    return NextResponse.json({ message: "Xóa người dùng thành công" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
