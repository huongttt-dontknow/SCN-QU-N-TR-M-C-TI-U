import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const actionsFilePath = path.join(process.cwd(), "lib", "key_actions.json");

function readLocalActions(): Record<string, any> {
  try {
    if (fs.existsSync(actionsFilePath)) {
      const raw = fs.readFileSync(actionsFilePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Lỗi đọc key_actions.json:", err);
  }
  return {};
}

function writeLocalActions(data: Record<string, any>) {
  try {
    const dir = path.dirname(actionsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(actionsFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Lỗi ghi key_actions.json:", err);
  }
}

const defaultActions = [
  { id: 1, title: "Đánh giá hiệu quả DA sản phẩm lần 1", note: "(Đã trao đổi với 1 số đơn vị có sản phẩm cần thay đổi - các sản phẩm mới <2 tháng k đánh giá)", progress: 100 },
  { id: 2, title: "Tiếp tục DA AIVA Asset Library và DA AIVA Production", note: "Demo xong khung quản lý tài sản và phái sinh", progress: 100 },
  { id: 3, title: "Hoàn thiện hệ thống quản trị mục tiêu", note: "Đã public test từ 13/8 - các TĐV test hết tuần 3 tháng 8 - link", progress: 100 },
  { id: 4, title: "Tối ưu hóa quy trình báo cáo và lập kế hoạch", note: "Áp dụng biểu mẫu và tần suất chuẩn hóa theo bộ chỉ tiêu SCVN", progress: 100 },
];

// GET /api/system/key-actions?unitCode=SCVN&periodKey=weekly_7_1
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitCode = searchParams.get("unitCode") || "SCVN";
    const periodKey = searchParams.get("periodKey") || "weekly_7_1";
    const key = `${unitCode}_${periodKey}`;

    const actionsMap = readLocalActions();
    const entry = actionsMap[key] || {
      actions: defaultActions,
      updatedAt: null,
      updatedBy: null,
    };

    return NextResponse.json(entry);
  } catch (error: any) {
    return NextResponse.json({ actions: defaultActions, error: error.message }, { status: 500 });
  }
}

// POST /api/system/key-actions - Lưu và đồng bộ danh sách 4 hành động trọng tâm
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { unitCode = "SCVN", periodKey = "weekly_7_1", actions = defaultActions, author = "Ban Giám Đốc" } = body;

    const key = `${unitCode}_${periodKey}`;
    const actionsMap = readLocalActions();

    const timestamp = new Date().toISOString();
    actionsMap[key] = {
      actions,
      unitCode,
      periodKey,
      updatedBy: author,
      updatedAt: timestamp,
    };

    writeLocalActions(actionsMap);

    return NextResponse.json({
      success: true,
      key,
      actions,
      updatedBy: author,
      updatedAt: timestamp,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
