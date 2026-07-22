import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/users - Lấy danh sách người dùng
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { employeeCode: "asc" },
    });

    // Nếu CSDL trống hoặc chứa dữ liệu cũ SCN001, tự động nạp danh sách thực tế của Sconnect
    if (users.length === 0 || users.some(u => u.employeeCode === "SCN001")) {
      // Clear old mock data if exists
      if (users.length > 0) {
        await prisma.user.deleteMany({});
      }

      const defaultUsers = [
        { employeeCode: "SCN0066", fullname: "Trần Thị Diệu Ly", email: "lyttd@s-connect.net", role: "Admin", unitCode: "SCVN" },
        { employeeCode: "SCN0071", fullname: "Lê Đăng Khoa", email: "khoald@s-connect.net", role: "Trưởng đơn vị", unitCode: "Wofloo" },
        { employeeCode: "SCN0452", fullname: "Lê Quỳnh Nga", email: "ngalq@s-connect.net", role: "Trưởng đơn vị", unitCode: "Lego" },
        { employeeCode: "SCN0237", fullname: "Trịnh Quốc Thịnh", email: "thinhtq1@s-connect.net", role: "Trưởng đơn vị", unitCode: "AS" },
        { employeeCode: "SCN0149", fullname: "Vũ Trung Đức", email: "ductvt@s-connect.net", role: "Trưởng đơn vị", unitCode: "Music" },
        { employeeCode: "SCN0043", fullname: "Lò Quế Hằng", email: "hanglq@s-connect.net", role: "Trưởng đơn vị", unitCode: "NDTH" },
        { employeeCode: "SCN2695", fullname: "Nguyễn Quang Khánh", email: "khanhnq@s-connect.net", role: "Trưởng đơn vị", unitCode: "CR" },
        { employeeCode: "SCN1021", fullname: "Đào Thanh Công", email: "congdt@s-connect.net", role: "Trưởng đơn vị", unitCode: "CN" },
        { employeeCode: "SCN0009", fullname: "Nguyễn Ánh Tùng", email: "tungna@s-connect.net", role: "Trưởng đơn vị", unitCode: "SCS" },
        { employeeCode: "SCN0001", fullname: "Tạ Mạnh Hoàng", email: "hoangtm@s-connect.net", role: "Quản trị viên", unitCode: "SCVN" },
        { employeeCode: "SCN1451", fullname: "Phạm Thị Thanh Hiền", email: "hienptt@s-connect.net", role: "Admin", unitCode: "SCVN" },
        { employeeCode: "SCN0405", fullname: "Trần Thị Thu Hương", email: "huongttt@s-connect.net", role: "Admin", unitCode: "SCVN" },
        { employeeCode: "SCN0909", fullname: "Trần Thị Hồng", email: "hongtt@s-connect.net", role: "Trưởng đơn vị", unitCode: "DA01" },
        { employeeCode: "SCN1142", fullname: "Dương Tuấn Linh", email: "linhdt1@s-connect.net", role: "Trưởng đơn vị", unitCode: "DA01" },
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

// PUT /api/users - Cập nhật vai trò người dùng
export async function PUT(request: Request) {
  try {
    const { id, role } = await request.json();

    if (!id || !role) {
      return NextResponse.json({ error: "Thiếu ID hoặc vai trò để cập nhật" }, { status: 400 });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { role },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
