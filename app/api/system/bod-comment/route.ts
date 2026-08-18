import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const commentsFilePath = path.join(process.cwd(), "lib", "bod_comments.json");

// Helper đọc file JSON kho lưu trữ chỉ đạo BOD
function readLocalComments(): Record<string, any> {
  try {
    if (fs.existsSync(commentsFilePath)) {
      const raw = fs.readFileSync(commentsFilePath, "utf-8");
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error("Lỗi đọc bod_comments.json:", err);
  }
  return {};
}

// Helper ghi file JSON kho lưu trữ chỉ đạo BOD
function writeLocalComments(data: Record<string, any>) {
  try {
    const dir = path.dirname(commentsFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(commentsFilePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Lỗi ghi bod_comments.json:", err);
  }
}

// GET /api/system/bod-comment?unitCode=SCVN&periodKey=weekly_7_1
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitCode = searchParams.get("unitCode") || "SCVN";
    const periodKey = searchParams.get("periodKey") || "weekly_7_1";
    const key = `${unitCode}_${periodKey}`;

    const commentsMap = readLocalComments();
    const entry = commentsMap[key] || { comment: "", updatedAt: null, updatedBy: null };

    return NextResponse.json(entry);
  } catch (error: any) {
    return NextResponse.json({ comment: "", error: error.message }, { status: 500 });
  }
}

// POST /api/system/bod-comment - Lưu và đồng bộ ý kiến chỉ đạo BOD
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { unitCode = "SCVN", periodKey = "weekly_7_1", comment = "", author = "Ban Giám Đốc" } = body;

    const key = `${unitCode}_${periodKey}`;
    const commentsMap = readLocalComments();

    const timestamp = new Date().toISOString();
    commentsMap[key] = {
      comment,
      unitCode,
      periodKey,
      updatedBy: author,
      updatedAt: timestamp,
    };

    writeLocalComments(commentsMap);

    return NextResponse.json({
      success: true,
      key,
      comment,
      updatedBy: author,
      updatedAt: timestamp,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
