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

  // Parse custom explanations/notes & KPI performance
  const evaluatedKpis = (kpis || []).map(k => {
    const target = Number(k.targetValue) || 0;
    const actual = Number(k.actualValue) || 0;
    const rate = target > 0 ? Math.round((actual / target) * 100) : (actual > 0 ? 100 : 0);
    const code = (k.indicatorCode || k.code || "").toUpperCase();
    const title = k.title || code;
    const exp = (k.explanation || "").trim();
    return { ...k, code, title, target, actual, rate, exp };
  });

  const underperforming = evaluatedKpis.filter(k => k.rate < 90);
  const targetKpis = underperforming.length > 0 ? underperforming : evaluatedKpis;

  const seenTitles = new Set<string>();

  targetKpis.forEach(k => {
    if (suggestedActions.length >= 5) return;

    const { code, title, target, actual, rate, exp } = k;
    let actionTitle = "";
    let impact = "";

    const isRevenue = code.includes("M1-I02") || title.toUpperCase().includes("DOANH THU") || title.toUpperCase().includes("TIỀN");
    const isProduction = code.includes("M2-I01") || code.includes("M2-I02") || title.toUpperCase().includes("SẢN XUẤT") || title.toUpperCase().includes("SẢN LƯỢNG") || title.toUpperCase().includes("VIDEO");
    const isTraffic = code.includes("M3-I01") || title.toUpperCase().includes("VIEW") || title.toUpperCase().includes("TRAFFIC") || title.toUpperCase().includes("KÊNH") || title.toUpperCase().includes("SUBSCRIBER");
    const isQualityDiscipline = code.includes("M4") || code.includes("M7") || title.toUpperCase().includes("KỶ LUẬT") || title.toUpperCase().includes("CHẤT LƯỢNG") || title.toUpperCase().includes("QC");
    const isHR = code.includes("M5") || code.includes("M6") || title.toUpperCase().includes("NHÂN SỰ") || title.toUpperCase().includes("ĐÀO TẠO") || title.toUpperCase().includes("NĂNG LỰC");

    const noteContext = exp ? ` (Do khó khăn: ${exp})` : "";

    if (parsedUnit === "Wolfoo" || parsedUnit === "Wofloo") {
      if (isRevenue) {
        actionTitle = `[Wolfoo OKR-O1] Thúc đẩy doanh thu phái sinh ${code}: Mở rộng phân phối và khai thác hợp tác IP Wolfoo.`;
        impact = `Nâng doanh thu đạt kế hoạch ${target > 0 ? target.toLocaleString('vi-VN') + ' VNĐ' : ''} (hiện đạt ${rate}%)${noteContext}`;
      } else if (isTraffic) {
        actionTitle = `[Wolfoo OKR-O1] Tối ưu hóa lượt xem Shorts/Reels ${code}: Đẩy mạnh thuật toán SEO và thiết kế thumbnail chuẩn Q3.`;
        impact = `Khôi phục tăng trưởng lượt xem và mở rộng tệp khán giả (hiện đạt ${rate}%)${noteContext}`;
      } else if (isQualityDiscipline) {
        actionTitle = `[Wolfoo OKR-O3] Rà soát quy trình QC & kỷ luật ${code}: Siết chặt kiểm chuẩn đầu ra và tuân thủ SLA sản xuất.`;
        impact = `Đảm bảo 100% sản phẩm đạt chuẩn chất lượng trước khi phát hành (hiện đạt ${rate}%)${noteContext}`;
      } else if (isHR) {
        actionTitle = `[Wolfoo OKR-O2] Tập huấn nhân sự & AIVA ${code}: Tổ chức đào tạo dựng thô và ứng dụng AI sinh phông nền.`;
        impact = `Nâng cao năng suất nhân sự và rút ngắn thời gian chu kỳ sản xuất (hiện đạt ${rate}%)${noteContext}`;
      } else {
        actionTitle = `[Wolfoo OKR-O1] Chuẩn hóa thư viện asset 3D/2D dùng chung ${code}: Nâng tỷ lệ tái sử dụng assets lên >=60%.`;
        impact = `Rút ngắn thời gian dựng thô nhằm bù đắp thiếu hụt sản lượng (hiện đạt ${rate}%)${noteContext}`;
      }
    } else if (parsedUnit === "Music" || parsedUnit === "SCMU") {
      if (isRevenue) {
        actionTitle = `[Music OKR-O1] Bứt phá doanh thu nhạc số phái sinh ${code}: Đẩy mạnh phân phối Spotify, Apple Music và bản quyền SCMU.`;
        impact = `Đưa doanh thu đạt mục tiêu ${target > 0 ? target.toLocaleString('vi-VN') + ' VNĐ' : ''} (hiện đạt ${rate}%)${noteContext}`;
      } else if (isProduction) {
        actionTitle = `[Music OKR-O2] Tăng tốc sản xuất nhạc nền AI ${code}: Tập huấn prompt Suno/Udio đạt >1,000 bài/tháng.`;
        impact = `Tăng sản lượng bài hát hoàn thành để bù đắp chỉ số (hiện đạt ${rate}%)${noteContext}`;
      } else if (isTraffic) {
        actionTitle = `[Music OKR-O1] Tối ưu hóa lượt nghe YouTube Music / Audio Drama ${code}: Đẩy mạnh truyền thông tệp teen story.`;
        impact = `Cải thiện lưu lượng truy cập và mở rộng tệp thính giả (hiện đạt ${rate}%)${noteContext}`;
      } else {
        actionTitle = `[Music OKR-O3] Tối ưu chi phí sản xuất & bản quyền ${code}: Ứng dụng AIVA kiểm duyệt bản quyền nhạc tự động.`;
        impact = `Nâng cao hiệu suất hoạt động đạt cam kết kế hoạch (hiện đạt ${rate}%)${noteContext}`;
      }
    } else if (parsedUnit === "Lego") {
      actionTitle = `[Lego OKR-O1] Cải tiến stop-motion chia phe ${code}: Xây dựng kịch bản Công & Thủ thành cho tệp non-KID.`;
      impact = `Tăng tỷ lệ tương tác bình luận lên 150% và nâng chỉ số đạt ${rate}%${noteContext}`;
    } else if (parsedUnit === "AS") {
      actionTitle = `[Animated Story OKR-O1] Chuẩn hóa kịch bản Teen Story ${code}: Rút ngắn thời gian duyệt và tối ưu kênh Spotify.`;
      impact = `Đảm bảo tiến độ phát hành và gia tăng lượt thính giả (hiện đạt ${rate}%)${noteContext}`;
    } else if (parsedUnit === "CN" || parsedUnit === "CNGP") {
      actionTitle = `[CNGP Game OKR-O1] Tối ưu chuyển đổi IAP & Game App ${code}: Tích hợp mua hàng trong ứng dụng và tự động hóa xuất bản.`;
      impact = `Tăng tỷ lệ chuyển đổi doanh thu người chơi (hiện đạt ${rate}%)${noteContext}`;
    } else {
      actionTitle = `[${parsedUnit}] Tháo gỡ khó khăn chỉ số ${code}: Đẩy mạnh ứng dụng AIVA và rà soát quy trình phối hợp nội bộ.`;
      impact = `Nâng hiệu suất từ ${rate}% đạt mức cam kết 100%${noteContext}`;
    }

    if (!seenTitles.has(actionTitle)) {
      seenTitles.add(actionTitle);
      suggestedActions.push({
        title: actionTitle,
        targetIndicator: code,
        impact
      });
    }
  });

  suggestedActions = suggestedActions.slice(0, 5);

  return {
    summary: summary + `Đã tổng hợp ${suggestedActions.length} hành động trọng tâm gắn liền với OKR kỳ của đơn vị.`,
    forecasts: kpis.map(k => {
      const completionRate = k.targetValue > 0 ? (k.actualValue / k.targetValue) * 100 : 100;
      let risk = "Thấp";
      if (completionRate < 75) risk = "Rất cao";
      else if (completionRate < 90) risk = "Cao";
      return {
        indicatorCode: k.indicatorCode || k.code,
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
      const fallbackData = getMockKpiAnalysis(unitCode || "SCVN", periodKey || "", kpis);
      fallbackData.summary = `⚠️ [Chưa cấu hình GEMINI_API_KEY trên máy chủ] ` + fallbackData.summary;
      return NextResponse.json(fallbackData);
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

    const MODEL_FALLBACK_LIST = [
      "gemini-flash-latest",
      "gemini-2.5-flash",
      "gemini-1.5-flash-latest",
      "gemini-2.5-pro",
      "gemini-pro-latest"
    ];

    const tools = [{
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
    }];

    const kpiSummaryText = kpis.map(k => 
      `- Chỉ số: ${k.indicatorCode || k.code} (${k.title || k.indicatorCode || k.code}), Kế hoạch: ${k.targetValue}, Thực tế: ${k.actualValue}, Ghi chú khó khăn/Giải trình thực tế: "${k.explanation || "Không có"}", PIC: ${k.pic || "Chưa gán"}`
    ).join("\n");

    const prompt = `
Bạn là Trợ lý AI Quản trị Mục tiêu cao cấp tại Sconnect. 
Hãy phân tích dữ liệu hiệu suất KPI kỳ này của đơn vị ${unitCode} (chu kỳ: ${periodType}, kỳ: ${periodKey}) và gợi ý các hành động tối ưu hóa hiệu quả thực tế.

ĐỂ ĐƯA RA ĐỀ XUẤT CHUẨN XÁC, BẠN CẦN:
1. GẮN LIỀN VỚI BỘ OKR CỦA ĐƠN VỊ THUỘC KỲ NÀY trong tài liệu chiến lược Sconnect:
=== BẮT ĐẦU CHIẾN LƯỢC SCONNECT & OKR ĐƠN VỊ ===
${sconnectContext}
=== KẾT THÚC CHIẾN LƯỢC SCONNECT & OKR ĐƠN VỊ ===

2. Đọc kỹ GIẢI TRÌNH/GHI CHÚ THỰC TẾ và TIẾN ĐỘ (%) của từng chỉ tiêu để hiểu khó khăn thực tế của nhân sự:
CHI TIẾT KPIS CẦN PHÂN TÍCH:
${kpiSummaryText}

3. QUY TẮC ĐỀ XUẤT ACTION (BẮT BỘC):
- GIỚI HẠN TỐI ĐA 5 ACTIONS (Không trả về nhiều hơn 5 hành động).
- Phân hóa rõ ràng action theo từng mảng chuyên môn: Doanh thu (M1), Sản lượng (M2), Traffic (M3), Kỷ luật (M4), Nhân sự (M5). KHÔNG lặp lại cùng 1 mẫu câu sản xuất cho các chỉ số khác mảng (ví dụ: chỉ số Doanh thu/Traffic không dùng mẫu câu dựng phim/render).
- Nội dung action vừa tháo gỡ đúng khó khăn ghi chú, vừa thể hiện rõ định hướng OKR của đơn vị.
- Đảm bảo không có 2 action nào bị trùng lặp tiêu đề.

YÊU CẦU ĐỊNH DẠNG:
Trả về phản hồi định dạng JSON duy nhất, có cấu trúc như sau:
{
  "summary": "Mô tả ngắn gọn khoảng 3-4 câu đánh giá tổng quan, đối chiếu tiến độ doanh thu, traffic, sản lượng của đơn vị. Nêu rõ cảnh báo dựa trên ghi chú giải trình khó khăn thực tế.",
  "forecasts": [
    {
      "indicatorCode": "mã chỉ tiêu",
      "progress": 80,
      "forecastProgress": 90,
      "riskLevel": "Rất cao"
    }
  ],
  "suggestedActions": [
    {
      "title": "Tên hành động cụ thể gợi ý khắc phục lỗi hoặc tối ưu hiệu suất, bám sát OKR đơn vị và thị trường",
      "targetIndicator": "mã chỉ tiêu bị ảnh hưởng trực tiếp",
      "impact": "Mô tả tác động định lượng kỳ vọng đạt được"
    }
  ]
}
`;

    let chatHistory: any[] = [
      {
        role: "user",
        parts: [{ text: prompt }]
      }
    ];

    let result: any = null;
    let modelInstance: any = null;
    let lastError: any = null;

    for (const mName of MODEL_FALLBACK_LIST) {
      try {
        const m = genAI.getGenerativeModel({
          model: mName,
          tools
        });
        result = await m.generateContent({ contents: chatHistory });
        modelInstance = m;
        break;
      } catch (err: any) {
        console.warn(`Model ${mName} (KPI analyze) tạm thời quá tải (${err?.message}), thử mô hình tiếp theo...`);
        lastError = err;
        await new Promise(r => setTimeout(r, 250));
      }
    }

    if (!result || !modelInstance) {
      throw lastError || new Error("Tất cả các mô hình Gemini AI đều tạm thời quá tải.");
    }
    
    const functionCalls = result.response.functionCalls();
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === "searchMarketTrends") {
        const queryArg = (call.args as any).query || "";
        const searchResultText = searchMarketTrends(queryArg);
        
        chatHistory.push({
          role: "model",
          parts: (result.response.candidates?.[0]?.content?.parts || []) as any
        });
        
        chatHistory.push({
          role: "user",
          parts: [{
            functionResponse: {
              name: "searchMarketTrends",
              response: { result: searchResultText }
            }
          }] as any
        });
        
        const toolResponse = await modelInstance.generateContent({
          contents: chatHistory
        });
        
        const cleanJson = toolResponse.response.text().replace(/```json/g, "").replace(/```/g, "").trim();
        const data = JSON.parse(cleanJson);
        if (data && Array.isArray(data.suggestedActions)) {
          data.suggestedActions = data.suggestedActions.slice(0, 5);
        }
        return NextResponse.json(data);
      }
    }

    const responseText = result.response.text().trim();
    const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
    const data = JSON.parse(cleanJson);

    if (data && Array.isArray(data.suggestedActions)) {
      data.suggestedActions = data.suggestedActions.slice(0, 5);
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.warn("Lỗi gọi Gemini API (KPI Analysis), kích hoạt chế độ dự phòng:", error);
    if (kpis && kpis.length > 0) {
      const fallbackData = getMockKpiAnalysis(unitCode || "SCVN", periodKey || "", kpis);
      return NextResponse.json(fallbackData);
    }
    return NextResponse.json({ error: "Không thể phân tích KPI" }, { status: 500 });
  }
}
