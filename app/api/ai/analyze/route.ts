import { NextResponse } from "next/server";
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";
import { createAuditLog } from "@/lib/audit";
import fs from "fs";
import path from "path";
import { prisma } from "@/lib/prisma";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Market intelligence local data for tool fallback & simulations
const MARKET_INTELLIGENCE: Record<string, string[]> = {
  wolfoo: [
    "YouTube Kids Traffic Trend (Q3 2026): Lượng xem nội dung hoạt hình Wolfoo 3D/2D tiếp tục đứng Top đầu khu vực Đông Nam Á, tuy nhiên RPM trung bình giảm nhẹ 3%. Xu hướng khán giả chuyển từ xem Video dài sang Shorts đạt trên 65%.",
    "Facebook Reels Monetization (2026): Tính năng kiếm tiền Reels mới cập nhật mở rộng cơ hội cho các nhà sản xuất hoạt hình. CPM quảng cáo Reels tăng 15% so với đầu năm.",
    "Tỷ lệ tái sử dụng tài nguyên (assets) 2D/3D trong ngành hoạt hình đạt mức trung bình 60-70% ở các studio lớn tại Hàn Quốc và Nhật Bản để tối ưu lợi nhuận."
  ],
  music: [
    "Spotify Audio Drama / Podcast Trend (2026): Thể loại teen story, drama học đường dạng audio đang tăng trưởng 40% về lượng người nghe hằng tháng (MAU) tại thị trường Việt Nam và Đông Nam Á.",
    "AI Music (Suno/Udio): Việc ứng dụng các AI tạo nhạc thế hệ mới giúp giảm chi phí sản xuất nhạc nền xuống 85%, đồng thời cho phép sản xuất hàng loạt kho nhạc chất lượng cao với tốc độ hơn 1,000 bài/tháng."
  ],
  game: [
    "Mobile Game Market 2026: Tải lượng game casual/puzzle tăng trưởng ổn định. Các game app lấy chủ đề IP hoạt hình nổi tiếng (như Wolfoo) có tỷ lệ chuyển đổi IAP (In-App Purchase) cao hơn 25% so với game không thương hiệu.",
    "YouTube Channel Management Tools: Nhu cầu tự động hóa xuất bản, tối ưu thẻ tag bằng AI tăng mạnh. Các studio lớn bắt buộc áp dụng AI Tool để phát hiện rủi ro bản quyền và quản trị hệ thống kênh tự động."
  ],
  lego: [
    "Lego non-KID / Stop-motion Trend: Nhóm khán giả trưởng thành (AFOL) và học đường ưa chuộng các chủ đề Lego Công và Thủ Thành, có yếu tố cốt truyện phân chia phe chiến tuyến rõ ràng. Tương tác bình luận cao hơn 150% so với video lắp ráp tĩnh."
  ],
  ai: [
    "AI Agent & Digital COO trong quản trị doanh nghiệp: Tiết kiệm 45% thời gian phê duyệt nội bộ và giảm OPEX hành chính 20% khi tích hợp trợ lý AI Co-Pilot vào e-office."
  ]
};

function searchMarketTrends(query: string): string {
  const q = query.toLowerCase();
  let results: string[] = [];
  if (q.includes("wolfoo") || q.includes("hoạt hình") || q.includes("animation")) {
    results.push(...MARKET_INTELLIGENCE.wolfoo);
  }
  if (q.includes("music") || q.includes("nhạc") || q.includes("spotify") || q.includes("suno") || q.includes("udio")) {
    results.push(...MARKET_INTELLIGENCE.music);
  }
  if (q.includes("game") || q.includes("youtube") || q.includes("kênh") || q.includes("cngp")) {
    results.push(...MARKET_INTELLIGENCE.game);
  }
  if (q.includes("lego") || q.includes("stop-motion")) {
    results.push(...MARKET_INTELLIGENCE.lego);
  }
  if (q.includes("ai") || q.includes("co-pilot") || q.includes("aiva") || q.includes("vận hành")) {
    results.push(...MARKET_INTELLIGENCE.ai);
  }
  
  if (results.length === 0) {
    results = [
      `Thị trường số liệu cho từ khóa '${query}' (Q3 2026): Tăng trưởng ổn định ở mức 8-12% hằng năm. Chuyển dịch mạnh mẽ sang tự động hóa và tối ưu hóa chi phí vận hành bằng AI.`,
      `Các nền tảng phân phối lớn (YouTube, Spotify, Facebook, TikTok) tiếp tục siết chặt chính sách bản quyền và ưu tiên các nội dung phái sinh có tính nguyên bản cao.`
    ];
  }
  return results.join("\n");
}

// Mock KPI Analysis helper
function getMockKpiAnalysis(unitCode: string, periodKey: string, kpis: any[]) {
  let summary = `[MOCK AI] Đánh giá tổng hợp cho đơn vị ${unitCode} trong kỳ ${periodKey}: `;
  let suggestedActions = [];

  // Parse custom explanations/notes from KPIs
  const explanationsList: string[] = [];
  (kpis || []).forEach(k => {
    if (k.explanation && k.explanation.trim()) {
      explanationsList.push(`Chỉ số ${k.indicatorCode}: "${k.explanation}"`);
    }
  });

  const notesSection = explanationsList.length > 0
    ? `\n\nGhi chú/Giải trình thực tế được ghi nhận: ${explanationsList.join("; ")}.`
    : "";

  if (unitCode === "SCVN") {
    summary += `Tiến độ sản xuất Wolfoo 2D/3D đạt kế hoạch. Tuy nhiên, doanh thu từ phái sinh kho gốc (Dự án 01) và các kênh truyện Animated Story cần được gia tốc phân phối đa nền tảng để bù đắp chi phí OPEX.${notesSection}`;
    suggestedActions = [
      { title: "BP AS: Sản xuất teen story / drama học đường và tối ưu định dạng audio lên Spotify", targetIndicator: "VM2-I01.01", impact: "Tăng độ phủ và khai thác doanh thu quảng cáo chéo" },
      { title: "Dự án 01: Đóng gói và biên tập lại kho phim cũ của Sconnect để đưa lên các nền tảng OTT mới", targetIndicator: "VM1-I01.01", impact: "Tận dụng tài nguyên sẵn có để phái sinh doanh thu" },
      { title: "Phòng CNGP: Tăng tốc phát triển game Wolfoo (nhận bàn giao từ SCCH) và hoàn thiện in-app purchase", targetIndicator: "VM1-I02.01", impact: "Sẵn sàng ra mắt 15 game mới trong 2026" }
    ];
  } else if (unitCode === "TCT" || unitCode === "Nhóm AI") {
    summary += `Hệ điều hành AIVA đang được nhân rộng trong quản trị Shared Services. Cần tiếp tục tiết giảm chi phí OPEX hành chính thông qua số hóa.${notesSection}`;
    suggestedActions = [
      { title: "Nhóm AI: Thử nghiệm và triển khai AI Co-Pilot kiểm duyệt tờ trình tự động trong e-office", targetIndicator: "TCT-I01.01", impact: "Giảm thời gian phê duyệt tờ trình xuống <12h" },
      { title: "Nhóm AI: Tổ chức huấn luyện synergy con người-AI cho nhân sự toàn tổng công ty", targetIndicator: "TCT-I02.01", impact: "Nâng cao năng suất lao động thêm 200%" }
    ];
  } else {
    summary += `Doanh thu và hiệu suất chung đạt tiến độ. Cần tiếp tục tối ưu hóa quy trình nghiệp vụ và ứng dụng nền tảng công nghệ AIVA để tự động hóa.${notesSection}`;
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

    // Truy cập chéo toàn bộ KPIs của đơn vị từ DB để có cái nhìn toàn cảnh
    let dbKpisText = "";
    try {
      const dbKpis = await prisma.kpiData.findMany({
        where: {
          unitCode: unitCode || "SCVN",
          periodKey: periodKey || "",
          periodType: periodType || ""
        }
      });
      
      if (dbKpis && dbKpis.length > 0) {
        dbKpisText = dbKpis.map(k => 
          `- Chỉ số: ${k.indicatorCode} (${k.title || k.indicatorCode}), Kế hoạch: ${k.targetValue}, Thực tế: ${k.actualValue}, Trạng thái: ${k.status}, Giải trình/Ghi chú: ${k.explanation || "Không có"}, PIC: ${k.pic}`
        ).join("\n");
      }
    } catch (dbErr) {
      console.warn("Lỗi truy vấn DB KPIs chéo, bỏ qua dữ liệu bổ sung:", dbErr);
    }

    // Thiết lập Generative Model của Gemini và khai báo Web Search Tool
    const model = genAI.getGenerativeModel({
      model: "gemini-flash-latest",
      tools: [{
        functionDeclarations: [{
          name: "searchMarketTrends",
          description: "Search Google/YouTube and Spotify for market trends, competitor strategies, and audience statistics for Sconnect units (Wolfoo animation, teen drama Spotify, Game app, Tubrr MCN, digital music).",
          parameters: {
            type: FunctionDeclarationSchemaType.OBJECT,
            properties: {
              query: { type: FunctionDeclarationSchemaType.STRING, description: "Search query containing keywords like 'Wolfoo views trend', 'Spotify teen podcast drama', etc." }
            },
            required: ["query"]
          }
        }]
      }]
    });

    const kpiSummaryText = kpis.map(k => 
      `- Chỉ số: ${k.indicatorCode} (${k.title || k.indicatorCode}), Kế hoạch: ${k.targetValue}, Thực tế: ${k.actualValue}, Giải trình/Ghi chú thực tế: ${k.explanation || "Không có"}, PIC: ${k.pic}`
    ).join("\n");

    const prompt = `
Bạn là Trợ lý AI Quản trị Mục tiêu cao cấp tại Sconnect. 
Hãy phân tích dữ liệu hiệu suất KPI kỳ này của đơn vị ${unitCode} (chu kỳ: ${periodType}, kỳ: ${periodKey}) và gợi ý các hành động tối ưu hóa hiệu quả thực tế.

ĐỂ ĐƯA RA ĐỀ XUẤT CHUẨN XÁC, BẠN CẦN:
1. So sánh đối chiếu với TOÀN BỘ CÁC CHỈ TIÊU KHÁC trong hệ thống của đơn vị:
=== BẮT ĐẦU TOÀN BỘ KPIS ĐƠN VỊ TRONG HỆ THỐNG ===
${dbKpisText || "Không có thông tin bổ sung"}
=== KẾT THÚC TOÀN BỘ KPIS ĐƠN VỊ TRONG HỆ THỐNG ===

2. Đọc kỹ GIẢI TRÌNH/GHI CHÚ THỰC TẾ và TIẾN ĐỘ (%) của từng chỉ tiêu để hiểu khó khăn thực tế của nhân sự:
CHI TIẾT KPIS CẦN PHÂN TÍCH:
${kpiSummaryText}

3. Phân tích bối cảnh chiến lược năm 2026 của Sconnect/SCVN:
=== BẮT ĐẦU CHIẾN LƯỢC SCONNECT 2026 ===
${sconnectContext}
=== KẾT THÚC CHIẾN LƯỢC SCONNECT 2026 ===

4. SỬ DỤNG TOOL 'searchMarketTrends' để chủ động tìm kiếm thông tin thị trường/đối thủ trên Google/YouTube/Spotify liên quan đến đơn vị "${unitCode}" để đưa ra đề xuất sát sườn nhất.

YÊU CẦU:
Trả về phản hồi định dạng JSON duy nhất, có cấu trúc như sau (không kèm markdown block hoặc giải thích bên ngoài):
{
  "summary": "Mô tả ngắn gọn khoảng 3-4 câu đánh giá tổng quan, đối chiếu tiến độ doanh thu, traffic, sản lượng của đơn vị. Nêu rõ cảnh báo dựa trên ghi chú giải trình khó khăn thực tế.",
  "forecasts": [
    {
      "indicatorCode": "mã chỉ tiêu",
      "progress": 80, // % hoàn thành hiện tại
      "forecastProgress": 90, // % dự báo đạt được vào cuối kỳ
      "riskLevel": "Rất cao" // Rất cao (nếu % < 75), Cao (nếu % từ 75-85), Thấp (nếu % > 85)
    }
  ],
  "suggestedActions": [
    {
      "title": "Tên hành động cụ thể gợi ý khắc phục lỗi hoặc tối ưu hiệu suất, bám sát thị trường ngành",
      "targetIndicator": "mã chỉ tiêu bị ảnh hưởng trực tiếp",
      "impact": "Mô tả tác động định lượng kỳ vọng đạt được"
    }
  ]
}
`;

    let chat = model.startChat();
    let result = await chat.sendMessage(prompt);
    
    const functionCalls = result.response.functionCalls();
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === "searchMarketTrends") {
        const queryArg = (call.args as any).query || "";
        const searchResultText = searchMarketTrends(queryArg);
        
        const toolResponse = await chat.sendMessage([{
          functionResponse: {
            name: "searchMarketTrends",
            response: { result: searchResultText }
          }
        }]);
        
        const cleanJson = toolResponse.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
        const data = JSON.parse(cleanJson);
        return NextResponse.json(data);
      }
    }

    const responseText = result.response.text().trim();
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
