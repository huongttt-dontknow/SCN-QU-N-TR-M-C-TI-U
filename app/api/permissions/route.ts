import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/permissions - Lấy ma trận phân quyền
export async function GET() {
  try {
    const permissions = await prisma.rolePermission.findMany();

    // Nếu CSDL trống, tự động nạp ma trận phân quyền mặc định
    if (permissions.length === 0) {
      const defaultPerms = [
        { role: "Admin", viewDashboard: true, editKPI: true, approveReport: true, editOKR: true, manageRoles: true },
        { role: "Quản trị viên", viewDashboard: true, editKPI: true, approveReport: false, editOKR: true, manageRoles: false },
        { role: "Trưởng đơn vị", viewDashboard: true, editKPI: true, approveReport: false, editOKR: true, manageRoles: false },
        { role: "Người dùng", viewDashboard: true, editKPI: false, approveReport: false, editOKR: false, manageRoles: false },
      ];

      await prisma.rolePermission.createMany({ data: defaultPerms });
      const seededPerms = await prisma.rolePermission.findMany();
      return NextResponse.json(seededPerms);
    }

    return NextResponse.json(permissions);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/permissions - Cập nhật quyền cho một vai trò
export async function POST(request: Request) {
  try {
    const { role, viewDashboard, editKPI, approveReport, editOKR, manageRoles } = await request.json();

    if (!role) {
      return NextResponse.json({ error: "Thiếu tên vai trò" }, { status: 400 });
    }

    const updatedPerm = await prisma.rolePermission.upsert({
      where: { role },
      update: { viewDashboard, editKPI, approveReport, editOKR, manageRoles },
      create: { role, viewDashboard, editKPI, approveReport, editOKR, manageRoles },
    });

    return NextResponse.json(updatedPerm);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
