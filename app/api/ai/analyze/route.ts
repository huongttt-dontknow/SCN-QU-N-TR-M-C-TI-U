import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// POST /api/ai/analyze - Phân tích hiệu suất KPI và tạo dự báo qua Gemini AI
export async function POST(request: Request) {
  try {
    const { unitCode, periodKey, periodType, kpis } = await request.json();

    if (!kpis || !Array.isArray(kpis)) {
      return NextResponse.json({ error: "Thiếu dữ liệu KPIs để phân tích" }, { status: 400 });
    }

    if (!genAI) {
      // Mock AI response if API Key is not set yet (helpful for initial deployment setup)
      return NextResponse.json({
        summary: `[MOCK AI] Đánh giá tổng hợp cho đơn vị ${unitCode} trong kỳ ${periodKey}: Doanh thu đạt tiến độ tốt, tuy nhiên sản lượng đang có dấu hiệu chậm trễ do ảnh hưởng từ nhân sự. Khuyến nghị tập trung tối ưu hóa quy trình.`,
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
        suggestedActions: [
          { title: "Đẩy mạnh ứng dụng AIVA để tăng tốc độ dựng thô video", targetIndicator: "VM2-I01.01", impact: "Rút ngắn thời gian sản xuất xuống 20%" },
          { title: "Tổ chức thêm 1 buổi đào tạo về tối ưu prompt âm nhạc cho đội ngũ", targetIndicator: "MM2-I01.01", impact: "Nâng cao chất lượng nhạc phái sinh" },
        ]
      });
    }

    // Nếu có API key, gọi Gemini API thực tế
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const kpiSummaryText = kpis.map(k => 
      `- Chỉ số: ${k.indicatorCode} (${k.title || k.indicatorCode}), Kế hoạch: ${k.targetValue}, Thực tế: ${k.actualValue}, Trách nhiệm: ${k.pic}`
    ).join("\n");

    const prompt = `
Bạn là Trợ lý AI Quản trị Mục tiêu cao cấp tại Sconnect. 
Hãy phân tích dữ liệu hiệu suất KPI kỳ này của đơn vị ${unitCode} (chu kỳ: ${periodType}, kỳ: ${periodKey}):

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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
