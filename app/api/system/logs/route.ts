import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

// GET /api/system/logs - Lấy danh sách log lịch sử kiểm toán
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const operator = searchParams.get("operator");
    const action = searchParams.get("action");
    const startDateStr = searchParams.get("startDate");
    const endDateStr = searchParams.get("endDate");

    // Xây dựng điều kiện lọc (where clause)
    const where: any = {};

    if (operator && operator !== "all") {
      where.operator = operator;
    }

    if (action && action !== "all") {
      where.action = action;
    }

    if (startDateStr || endDateStr) {
      where.timestamp = {};
      if (startDateStr) {
        // Bắt đầu ngày (00:00:00)
        where.timestamp.gte = new Date(`${startDateStr}T00:00:00.000Z`);
      }
      if (endDateStr) {
        // Kết thúc ngày (23:59:59)
        where.timestamp.lte = new Date(`${endDateStr}T23:59:59.999Z`);
      }
    }

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { timestamp: "desc" },
      take: 200, // Giới hạn lấy 200 logs gần nhất để bảo đảm tốc độ
    });

    return NextResponse.json(logs);
  } catch (error: any) {
    console.error("Lỗi lấy danh sách Audit Log:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/system/logs - Tạo log kiểm toán mới từ Client-side (ví dụ: đăng nhập, chuyển đổi mô phỏng)
export async function POST(request: Request) {
  try {
    const { operator, action, module, details } = await request.json();

    if (!action || !module || !details) {
      return NextResponse.json({ error: "Thiếu trường thông tin bắt buộc" }, { status: 400 });
    }

    const newLog = await createAuditLog(operator, action, module, details);
    return NextResponse.json({ success: true, log: newLog }, { status: 201 });
  } catch (error: any) {
    console.error("Lỗi ghi nhận Audit Log từ API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
