import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { createAuditLog } from "@/lib/audit";
import fs from "fs";
import path from "path";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Mock KPI Analysis helper
function getMockKpiAnalysis(unitCode: string, periodKey: string, kpis: any[]) {
  let summary = `[MOCK AI] Đánh giá tổng hợp cho đơn vị ${unitCode} trong kỳ ${periodKey}: `;
  let suggestedActions = [];

  if (unitCode === "SCVN") {
    summary += `Tiến độ sản xuất Wolfoo 2D/3D đạt kế hoạch. Tuy doanh thu từ phái sinh kho gốc (Dự án 01) và các kênh truyện Animated Story cần được gia tốc phân phối đa nền tảng để bù đắp chi phí OPEX.`;
    suggestedActions = [
      { title: "BP AS: Sản xuất teen story / drama học đường và tối ưu định dạng audio lên Spotify", targetIndicator: "VM2-I01.01", impact: "Tăng độ phủ và khai thác doanh thu quảng cáo chéo" },
      { title: "Dự án 01: Đóng gói và biên tập lại kho phim cũ của Sconnect để đưa lên các nền tảng OTT mới", targetIndicator: "VM1-I01.01", impact: "Tận dụng tài nguyên sẵn có để phái sinh doanh thu" },
      { title: "Phòng CNGP: Tăng tốc phát triển game Wolfoo (nhận bàn giao từ SCCH) và hoàn thiện in-app purchase", targetIndicator: "VM1-I02.01", impact: "Sẵn sàng ra mắt 15 game mới trong 2026" }
    ];
  } else if (unitCode === "TCT" || unitCode === "Nhóm AI") {
    summary += `Hệ điều hành AIVA đang được nhân rộng trong quản trị Shared Services. Cần tiếp tục tiết giảm chi phí OPEX hành chính thông qua số hóa.`;
    suggestedActions = [
      { title: "Nhóm AI: Thử nghiệm và triển khai AI Co-Pilot kiểm duyệt tờ trình tự động trong e-office", targetIndicator: "TCT-I01.01", impact: "Giảm thời gian phê duyệt tờ trình xuống <12h" },
      { title: "Nhóm AI: Tổ chức huấn luyện synergy con người-AI cho nhân sự toàn tổng công ty", targetIndicator: "TCT-I02.01", impact: "Nâng cao năng suất lao động thêm 200%" }
    ];
  } else {
    summary += `Doanh thu và hiệu suất chung đạt tiến độ. Cần tiếp tục tối ưu hóa quy trình nghiệp vụ và ứng dụng nền tảng công nghệ AIVA để tự động hóa.`;
    suggestedActions = [
      { title: "Đẩy mạnh ứng dụng AIVA để tăng tốc độ dựng thô video", targetIndicator: "VM2-I01.01", impact: "Rút ngắn thời gian sản xuất xuống 20%" },
      { title: "Tổ chức thêm 1 buổi đào tạo về tối ưu prompt âm nhạc cho đội ngũ", targetIndicator: "MM2-I01.01", impact: "Nâng cao chất lượng nhạc phái sinh" }
    ];
  }

  return {
    summary,
    forecasts: kpis.map(k => {
      const completionRate = k.targetValue > 0 ? (k.actualValue / k.targetValue) * 100 : 100;
      let risk = "Thấp";
      if (completionRate < 75) risk = "Rất cao";
      else if (completionRate < 90) risk = "Cao";
      
      return {
        indicatorCode: k.indicatorCode,
        progress: Math.round(completionRate),
        forecastProgress: Math.min(100, Math.round(completionRate * 1.1)),
        riskLevel: risk,
      };
    }),
    suggestedActions
  };
}

// POST /api/ai/analyze - Phân tích hiệu suất KPI và tạo dự báo qua Gemini AI
export async function POST(request: Request) {
  let unitCode = "";
  let periodKey = "";
  let periodType = "";
  let kpis: any[] = [];

  try {
    const operator = request.headers.get("x-operator-email") || "system@s-connect.net";
    const body = await request.json();
    unitCode = body.unitCode;
    periodKey = body.periodKey;
    periodType = body.periodType;
    kpis = body.kpis;

    if (!kpis || !Array.isArray(kpis)) {
      return NextResponse.json({ error: "Thiếu dữ liệu KPIs để phân tích" }, { status: 400 });
    }

    // Ghi log kích hoạt AI đề xuất
    await createAuditLog(
      operator,
      "SYNC",
      "system",
      `Kích hoạt AI Agent phân tích và đề xuất Action cho đơn vị: ${unitCode || ""} (${periodType || ""} - ${periodKey || ""})`
    );

    if (!genAI) {
      console.warn("GEMINI_API_KEY chưa được cấu hình, kích hoạt chế độ dự phòng cho KPI Analysis.");
      return NextResponse.json(getMockKpiAnalysis(unitCode || "SCVN", periodKey || "", kpis));
    }

    // Nạp tài liệu chiến lược
    const contextPath = path.join(process.cwd(), "app", "api", "ai", "okr-strategy", "sconnect_context.txt");
    let sconnectContext = "";
    if (fs.existsSync(contextPath)) {
      sconnectContext = fs.readFileSync(contextPath, "utf8");
    }

    // Nếu có API key, gọi Gemini API thực tế
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const kpiSummaryText = kpis.map(k => 
      `- Chỉ số: ${k.indicatorCode} (${k.title || k.indicatorCode}), Kế hoạch: ${k.targetValue}, Thực tế: ${k.actualValue}, Trách nhiệm: ${k.pic}`
    ).join("\n");

    const prompt = `
Bạn là Trợ lý AI Quản trị Mục tiêu cao cấp tại Sconnect. 
Hãy phân tích dữ liệu hiệu suất KPI kỳ này của đơn vị ${unitCode} (chu kỳ: ${periodType}, kỳ: ${periodKey}):

Dưới đây là tài liệu ngữ cảnh chiến lược cốt lõi của Sconnect (bao gồm định hướng sản phẩm, bài học khủng hoảng, mục tiêu scaling hiệu quả năm 2026):
=== BẮT ĐẦU TÀI LIỆU NGỮ CẢNH SCONNECT ===
${sconnectContext}
=== KẾT THÚC TÀI LIỆU NGỮ CẢNH SCONNECT ===

DỮ LIỆU KPI:
${kpiSummaryText}

YÊU CẦU:
Trả về phản hồi định dạng JSON duy nhất, có cấu trúc như sau (không kèm markdown block):
{
  "summary": "Mô tả ngắn gọn khoảng 3-4 câu đánh giá tổng quan, dự báo tiến độ doanh thu, traffic, sản lượng của đơn vị. Nêu rõ cảnh báo nếu doanh thu hoặc các chỉ tiêu chính hoàn thành dưới 75%.",
  "forecasts": [
    {
      "indicatorCode": "mã chỉ tiêu",
      "progress": 80, // % hoàn thành hiện tại
      "forecastProgress": 90, // % dự báo đạt được vào cuối tháng nếu giữ nguyên tốc độ
      "riskLevel": "Rất cao" // Rất cao (nếu % < 75), Cao (nếu % từ 75-85), Thấp (nếu % > 85)
    }
  ],
  "suggestedActions": [
    {
      "title": "Tên hành động cụ thể gợi ý khắc phục lỗi hoặc tối ưu hiệu suất",
      "targetIndicator": "mã chỉ tiêu bị ảnh hưởng trực tiếp",
      "impact": "Mô tả tác động định lượng kỳ vọng đạt được"
    }
  ]
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text().trim();
    
    // Clean codeblock markers from Gemini json output if present
    const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanJson);

    return NextResponse.json(data);
  } catch (error: any) {
    console.warn("Lỗi gọi Gemini API (KPI Analysis) (API Key sai/hết hạn), kích hoạt chế độ dự phòng:", error);
    if (kpis && kpis.length > 0) {
      return NextResponse.json(getMockKpiAnalysis(unitCode || "SCVN", periodKey || "", kpis));
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
