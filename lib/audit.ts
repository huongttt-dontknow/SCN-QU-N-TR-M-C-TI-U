import { prisma } from "./prisma";

/**
 * Tạo một log kiểm toán (Audit Log) mới trong cơ sở dữ liệu
 * @param operator Email hoặc tên của tài khoản thao tác
 * @param action Hành động (LOGIN, LOGOUT, SYNC, CREATE, UPDATE, DELETE)
 * @param module Phân hệ bị tác động (system, youtube, kpi, okr, permissions)
 * @param details Chi tiết hoạt động
 */
export async function createAuditLog(
  operator: string,
  action: string,
  module: string,
  details: string
) {
  try {
    return await prisma.auditLog.create({
      data: {
        operator: operator || "unknown@s-connect.net",
        action,
        module,
        details,
      },
    });
  } catch (error) {
    console.error("Lỗi ghi Audit Log vào CSDL:", error);
  }
}
