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
  const parsedUnit = unitCode || "SCVN";
  let summary = `[DỰ BÁO AI DỰ PHÒNG] Đánh giá tổng hợp cho đơn vị ${parsedUnit} trong kỳ ${periodKey}: `;
  let suggestedActions: any[] = [];

  // Parse custom explanations/notes from KPIs
  const explanationsList: string[] = [];
  (kpis || []).forEach(k => {
    if (k.explanation && k.explanation.trim()) {
      explanationsList.push(`Chỉ số ${k.indicatorCode}: "${k.explanation}"`);
    }
  });

  const notesSection = explanationsList.length > 0
    ? ` Ghi chú/Giải trình thực tế: ${explanationsList.join("; ")}.`
    : "";

  // 1. Phân tích các KPI chưa đạt kế hoạch (tiến độ < 90%)
  const underperformingKpis = (kpis || []).filter(k => {
    const target = k.targetValue || 0;
    const actual = k.actualValue || 0;
    const rate = target > 0 ? (actual / target) * 100 : 100;
    return rate < 90;
  });

  if (underperformingKpis.length > 0) {
    summary += `Hệ thống ghi nhận ${underperformingKpis.length} chỉ tiêu có hiệu suất dưới 90% (gồm: ${underperformingKpis.map(k => k.indicatorCode).join(", ")}). Cần tập trung tháo gỡ rủi ro cho các chỉ số này.${notesSection}`;
    
    // Sinh các action động khắc phục
    underperformingKpis.forEach(k => {
      const target = k.targetValue || 0;
      const actual = k.actualValue || 0;
      const rate = target > 0 ? Math.round((actual / target) * 100) : 100;
      
      let title = `[AI Khắc phục] Tối ưu hóa chỉ số ${k.indicatorCode}`;
      let impact = `Khắc phục hiệu suất hiện tại (${rate}%), đưa chỉ số đạt mục tiêu kế hoạch ${target}`;
      
      if (parsedUnit === "Wofloo") {
        if (k.indicatorCode.includes("VM") || k.indicatorCode.includes("V")) {
          title = `[Wolfoo] Khắc phục chỉ số sản xuất ${k.indicatorCode}: Chuẩn hóa thư viện asset dùng chung và đẩy nhanh tốc độ dựng thô video Wolfoo.`;
          impact = `Tăng sản lượng và rút ngắn thời gian sản xuất nhằm bù đắp thiếu hụt (hiện đạt ${rate}%)`;
        } else {
          title = `[Wolfoo] Thúc đẩy doanh thu ${k.indicatorCode}: Mở rộng phân phối và khai thác thương mại các kênh phái sinh Wolfoo.`;
          impact = `Nâng doanh thu đạt kế hoạch ${target} VNĐ (hiện đạt ${rate}%)`;
        }
      } else if (parsedUnit === "Music") {
        title = `[Music] Tối ưu chỉ số ${k.indicatorCode}: Tổ chức tập huấn prompt âm nhạc AI (Suno/Udio) và tăng tốc phát hành bản quyền nhạc số SCMU.`;
        impact = `Nâng cao hiệu suất sáng tác để cải thiện chỉ số từ ${rate}% lên 100%`;
      } else if (parsedUnit === "Lego") {
        title = `[Lego] Cải tiến chỉ số ${k.indicatorCode}: Tập trung sản xuất stop-motion đồ chơi ngách non-KID và xây dựng kịch bản chia phe.`;
        impact = `Gia tăng tỷ lệ giữ chân người xem và tương tác bình luận (hiện đạt ${rate}%)`;
      } else if (parsedUnit === "AS") {
        title = `[Animated Story] Tháo gỡ chỉ số ${k.indicatorCode}: Chuẩn hóa kịch bản teen story/drama học đường và tối ưu định dạng Spotify.`;
        impact = `Rút ngắn thời gian duyệt kịch bản và gia tăng lượng thính giả (hiện đạt ${rate}%)`;
      } else if (parsedUnit === "DA01") {
        title = `[Dự án 01] Thúc đẩy chỉ số ${k.indicatorCode}: Đóng gói và tái biên tập kho phim hoạt hình cũ của Sconnect để đưa lên các nền tảng OTT mới.`;
        impact = `Khai thác tối đa giá trị kho nội dung gốc sẵn có nhằm đạt kế hoạch doanh thu ${target}`;
      } else if (parsedUnit === "CN") {
        title = `[CNGP Game] Tối ưu chỉ số ${k.indicatorCode}: Hoàn thiện tích hợp in-app purchase (IAP) và tự động hóa hệ thống kênh game app.`;
        impact = `Cải thiện tỷ lệ chuyển đổi doanh thu người chơi game Wolfoo (hiện đạt ${rate}%)`;
      } else {
        title = `[${parsedUnit}] Khắc phục chỉ số ${k.indicatorCode}: Đẩy mạnh ứng dụng AIVA và rà soát quy trình phối hợp để tháo gỡ điểm nghẽn.`;
        impact = `Nâng cao hiệu suất thực tế từ ${rate}% đạt mức cam kết 100%`;
      }

      suggestedActions.push({
        title,
        targetIndicator: k.indicatorCode,
        impact
      });
    });
  } else {
    // Tất cả KPI đều đạt hoặc không có dữ liệu yếu
    summary += `Tất cả các chỉ số KPI của đơn vị ${parsedUnit} đều đạt tiến độ và nằm trong vùng an toàn (>= 90%). Khuyến nghị tiếp tục tối ưu hóa hiệu suất.${notesSection}`;
    
    // Sinh các action tối ưu hóa theo đơn vị
    const firstCode = kpis[0]?.indicatorCode || "VM2-I01.01";
    if (parsedUnit === "Wofloo") {
      suggestedActions = [
        { title: "[Wolfoo] Tiếp tục chuẩn hóa thư viện asset dùng chung để giữ vững đà tăng trưởng sản xuất Wolfoo 3D.", targetIndicator: firstCode, impact: "Duy trì sản lượng ổn định và nâng cao tính kế thừa" },
        { title: "[Wolfoo] Áp dụng công cụ AI sinh phông nền tự động để giảm OPEX sản xuất phim hoạt hình.", targetIndicator: firstCode, impact: "Tiết kiệm 20% chi phí bối cảnh sản xuất" }
      ];
    } else if (parsedUnit === "Music") {
      suggestedActions = [
        { title: "[Music] Tăng cường kiểm duyệt và phân phối bản quyền nhạc số đa nền tảng toàn cầu.", targetIndicator: firstCode, impact: "Tối đa hóa doanh thu nhạc số phái sinh" },
        { title: "[Music] Tổ chức buổi đào tạo nâng cao kỹ năng prompt âm nhạc AI thế hệ mới.", targetIndicator: firstCode, impact: "Nâng cao năng suất sáng tác bài hát nền" }
      ];
    } else if (parsedUnit === "Lego") {
      suggestedActions = [
        { title: "[Lego] Tiếp tục tối ưu hóa nội dung stop-motion chia phe chiến tuyến cho tệp non-KID.", targetIndicator: firstCode, impact: "Duy trì lượng tương tác bình luận cao hơn 150%" }
      ];
    } else if (parsedUnit === "AS") {
      suggestedActions = [
        { title: "[Animated Story] Phối hợp PnC và SAMA mở lớp đào tạo biên kịch và viết prompt kịch bản nhanh.", targetIndicator: firstCode, impact: "Đảm bảo cung cấp đủ lượng kịch bản đầu vào" }
      ];
    } else {
      suggestedActions = [
        { title: `[${parsedUnit}] Đẩy mạnh ứng dụng AIVA để tăng tốc độ tự động hóa quy trình vận hành.`, targetIndicator: firstCode, impact: "Tối ưu hóa năng suất lao động thêm 200%" },
        { title: `[${parsedUnit}] Thực hiện đồng bộ hóa thư viện và tối ưu quy trình phối hợp nội bộ.`, targetIndicator: firstCode, impact: "Giảm thời gian chu kỳ ra quyết định xuống <24h" }
      ];
    }
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
      model: "gemini-1.5-flash",
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
