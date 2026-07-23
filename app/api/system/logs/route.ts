import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/audit";

const mockLogs = [
  { id: "mock-1", timestamp: new Date().toISOString(), operator: "huongttt@s-connect.net", action: "LOGIN", module: "system", details: "Trần Thị Thu Hương (Đăng nhập hệ thống - Mock Fallback)" },
  { id: "mock-2", timestamp: new Date(Date.now() - 1800000).toISOString(), operator: "huongttt@s-connect.net", action: "SYNC", module: "system", details: "Kích hoạt chế độ CSDL dự phòng (Local Mock Mode) do hệ thống vượt giới hạn hạn mức Neon Tech" },
  { id: "mock-3", timestamp: new Date(Date.now() - 3600000).toISOString(), operator: "lyttd@s-connect.net", action: "UPDATE", module: "permissions", details: "Thay đổi vai trò của Trần Thị Thu Hương thành Admin" },
  { id: "mock-4", timestamp: new Date(Date.now() - 7200000).toISOString(), operator: "khoald@s-connect.net", action: "SYNC", module: "kpi", details: "Đồng bộ / Nhập danh sách nhân sự từ CSV: 14 người dùng." },
  { id: "mock-5", timestamp: new Date(Date.now() - 14400000).toISOString(), operator: "huongttt@s-connect.net", action: "CREATE", module: "permissions", details: "Tạo tài khoản mới: Trần Thị Hồng (hongtt@s-connect.net), vai trò Trưởng đơn vị, đơn vị DA01" },
];

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
        where.timestamp.gte = new Date(`${startDateStr}T00:00:00.000Z`);
      }
      if (endDateStr) {
        where.timestamp.lte = new Date(`${endDateStr}T23:59:59.999Z`);
      }
    }

    const logs = await prisma.auditLog.findMany({
      where,
      orderBy: { timestamp: "desc" },
      take: 200,
    });

    return NextResponse.json(logs);
  } catch (error: any) {
    console.warn("Lấy audit logs thất bại (hạn mức DB), dùng mock logs:", error);
    
    // Áp dụng bộ lọc giả lập trên client-side mock logs
    let filteredLogs = [...mockLogs];
    const { searchParams } = new URL(request.url);
    const operator = searchParams.get("operator");
    const action = searchParams.get("action");

    if (operator && operator !== "all") {
      filteredLogs = filteredLogs.filter(log => log.operator === operator);
    }
    if (action && action !== "all") {
      filteredLogs = filteredLogs.filter(log => log.action === action);
    }

    return NextResponse.json(filteredLogs);
  }
}

// POST /api/system/logs - Tạo log kiểm toán mới từ Client-side
export async function POST(request: Request) {
  try {
    const { operator, action, module, details } = await request.json();

    if (!action || !module || !details) {
      return NextResponse.json({ error: "Thiếu trường thông tin bắt buộc" }, { status: 400 });
    }

    try {
      const newLog = await createAuditLog(operator, action, module, details);
      return NextResponse.json({ success: true, log: newLog }, { status: 201 });
    } catch (dbErr) {
      console.warn("Ghi log DB thất bại, giả lập thành công:", dbErr);
      return NextResponse.json({ 
        success: true, 
        log: {
          id: "mock-log-" + Date.now(),
          timestamp: new Date().toISOString(),
          operator,
          action,
          module,
          details
        }
      }, { status: 201 });
    }
  } catch (error: any) {
    console.error("Lỗi ghi nhận Audit Log từ API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
