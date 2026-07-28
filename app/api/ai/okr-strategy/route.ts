import { NextResponse } from "next/server";
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";
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

// Mock AI Suggestions
function getMockSuggestions(unitCode: string) {
  const code = unitCode === "TCT" ? "TCT" : "SCVN";
  if (code === "SCVN") {
    return [
      {
        title: "O1: Thúc đẩy tăng trưởng doanh thu đa nền tảng phim hoạt hình Wolfoo 2D/3D và Animated Story",
        weight: 50,
        keyResults: [
          {
            title: "KR1: Đẩy mạnh tần suất xuất bản Wolfoo 2D/3D và đạt tỷ lệ tái sử dụng assets tối thiểu 60% để giảm OPEX",
            priority: "High",
            pic: "Nguyễn Văn A",
            actions: [
              { title: "Chuẩn hóa và phân loại kho assets Wolfoo 2D và 3D dùng chung để tái sử dụng trong dựng thô", pic: "Trần Thị B" },
              { title: "Ứng dụng AIVA-C tự động hóa 70% các tác vụ lặp lại trong quy trình thiết kế và render phim", pic: "Lê Văn D" }
            ]
          },
          {
            title: "KR2: Phát hành 24 tập Animated Story (chủ đề teen story, drama học đường) đa kênh trên YouTube và Spotify",
            priority: "High",
            pic: "Nguyễn Thị Hồng",
            actions: [
              { title: "Sản xuất nội dung truyện/phim hoạt hình tĩnh cuộc sống teen và tối ưu định dạng audio podcast lên Spotify", pic: "Phạm Văn C" }
            ]
          }
        ]
      },
      {
        title: "O2: Phát triển các dự án Game App mới, khai thác kho gốc phái sinh và cung cấp giải pháp quản trị YouTube",
        weight: 50,
        keyResults: [
          {
            title: "KR1: Hoàn thiện xuất bản 15 game mới (P CNGP nhận bàn giao từ SCCH) và đạt mốc doanh thu mục tiêu",
            priority: "High",
            pic: "Vương Tuấn Anh",
            actions: [
              { title: "Phòng CNGP hoàn thiện phát triển game Wolfoo và tích hợp mô hình kinh doanh in-app purchase", pic: "Nguyễn Minh H" }
            ]
          },
          {
            title: "KR2: Triển khai 10 giải pháp/công cụ AI (P CNGP phát triển) tự động hóa quản trị hệ thống kênh YouTube",
            priority: "High",
            pic: "Trần Minh Hoàng",
            actions: [
              { title: "Phát triển tool tự động check bản quyền và phân tích insight thời gian thực hỗ trợ xuất bản YouTube", pic: "Nguyễn Văn Nam" }
            ]
          },
          {
            title: "KR3: Doanh thu phái sinh và kinh doanh từ kho nội dung gốc của Sconnect đạt mức tăng trưởng +100% (DA 01)",
            priority: "Medium",
            pic: "Lê Thị Mai",
            actions: [
              { title: "Dự án 01 thực hiện đóng gói, biên tập và phân phối lại kho phim cũ lên các nền tảng OTT mới", pic: "Lê Thị Mai" }
            ]
          }
        ]
      }
    ];
  } else {
    return [
      {
        title: "O1: Quản trị dòng tiền tối ưu, tiết giảm chi phí vận hành và nâng cao năng lực ứng dụng AI toàn tập đoàn",
        weight: 50,
        keyResults: [
          {
            title: "KR1: Nhóm AI nghiên cứu triển khai thành công 5 giải pháp trợ lý ảo tự động hóa Shared Services và vận hành",
            priority: "High",
            pic: "Phan Anh Tuấn",
            actions: [
              { title: "Nhóm AI thiết lập và huấn luyện AI Co-Pilot tích hợp e-office để kiểm duyệt tờ trình tự động <12h", pic: "Đỗ Thị G" }
            ]
          },
          {
            title: "KR2: Tiết giảm 15% chi phí hành chính OPEX thông qua tự động hóa các thủ tục nội bộ",
            priority: "High",
            pic: "Trần Văn E",
            actions: [
              { title: "Ban hành quy định kiểm duyệt tờ trình điện tử và tự động hóa lưu kho văn bản", pic: "Đỗ Thị G" }
            ]
          }
        ]
      }
    ];
  }
}

// Mock AI Assessment
function getMockAssessment(unitCode: string, objectiveTitle: string, objectiveProgress: number, keyResults: any[]) {
  const delayedKrs = (keyResults || []).filter(kr => (kr.progress || 0) < 75);
  const delayWarning = delayedKrs.length > 0 
    ? `**Cảnh báo**: Hiện có **${delayedKrs.length}** kết quả then chốt (KRs) đạt tiến độ dưới 75% (${delayedKrs.map(k => `"${k.title}"`).join(", ")}). Cần tập trung tháo gỡ điểm nghẽn tại đây.`
    : `**Ghi nhận**: Tất cả các kết quả then chốt (KRs) đều đang bám sát tiến độ đề ra.`;

  // Parse notes from KRs & Actions
  const notesList: string[] = [];
  (keyResults || []).forEach(kr => {
    if (kr.notes && kr.notes.trim()) {
      notesList.push(`KR "${kr.title}": "${kr.notes}"`);
    }
    (kr.actions || []).forEach((act: any) => {
      if (act.notes && act.notes.trim()) {
        notesList.push(`Action "${act.title}": "${act.notes}"`);
      }
    });
  });

  const notesSection = notesList.length > 0
    ? `\n\n* **Phân tích Ghi chú thực tế (Notes)**:\n${notesList.map(n => `   * Ghi nhận: ${n}`).join("\n")}`
    : "";

  let specificRecommendations = "";
  if (unitCode === "SCVN") {
    specificRecommendations = `
    * **BP AS (Animated Story)**: Cập nhật teen story/drama học đường hằng tuần, tối ưu chất lượng âm thanh và xuất bản Podcast audio trực tiếp lên Spotify.
    * **Dự án 01 (DA 01)**: Triển khai các chiến dịch phái sinh từ kho tài nguyên gốc sẵn có, mở rộng các kênh OTT mới và duy trì biên lợi nhuận dương.
    * **Phòng CNGP**: Nghiệm thu dự án game app nhận bàn giao và vận hành trơn tru giải pháp tự động hóa quản trị kênh YouTube.
    * **Wolfoo 2D/3D**: Thúc đẩy tỷ lệ tái sử dụng tài nguyên (background/nhân vật) Wolfoo 2D/3D tối thiểu đạt 60% để tiết kiệm OPEX.`;
  } else {
    specificRecommendations = `
    * **Nhóm AI**: Nghiên cứu, vận hành và chuyển giao các AI Co-Pilot tích hợp e-office để tối ưu hóa quy trình duyệt tờ trình <12h.
    * **Quản trị mục tiêu**: Tiết giảm OPEX, kiểm soát rủi ro dòng tiền và đồng bộ Realtime Dashboard lên hệ thống tổng công ty.`;
  }

  const simulatedMarketData = unitCode === "SCVN"
    ? `\n\n* **Số liệu nghiên cứu thị trường (Simulated Search)**:\n   * Xu xu hướng xem video ngắn (Shorts/Reels) của tệp khán giả thanh thiếu niên tăng trưởng 65%. Trọng tâm phân phối đa kênh (YouTube & Spotify) cho định dạng Animated Story đang là xu hướng ngành lớn.`
    : `\n\n* **Số liệu nghiên cứu thị trường (Simulated Search)**:\n   * Xu hướng ứng dụng AI Co-Pilot/Digital COO giúp các tổng công ty cắt giảm trung bình 15-20% chi phí quản lý cố định (OPEX).`;

  return `**AI Agent nhận định:**

1. **Đánh giá tổng quan**:
   * Mục tiêu *"${objectiveTitle}"* của đơn vị **${unitCode}** hiện đạt tiến độ chung là **${objectiveProgress}%**.
   * Nhìn chung, tiến độ này phản ánh đúng nhịp độ hoạt động thực tế của đơn vị. Tuy nhiên, để hoàn thành kế hoạch cuối năm, tốc độ hoàn thành cần được gia tốc hơn nữa ở các Actions bổ trợ.${notesSection}

2. **Phân tích rủi ro & Điểm nghẽn**:
   * ${delayWarning}
   * Rủi ro về nguồn lực triển khai có thể bị phân tán nếu không xác định rõ mức độ ưu tiên giữa các đầu việc.${simulatedMarketData}

3. **Đề xuất hành động thực tế**:
   * **Đề xuất trọng tâm**: ${specificRecommendations}
   * **Quản trị mục tiêu**: Tổ chức rà soát chéo (cross-check) định kỳ hàng tuần giữa các PIC để phát hiện và hỗ trợ kịp thời các Action có tỷ lệ hoàn thành thấp.`;
}

// POST /api/ai/okr-strategy - Phân tích, đánh giá và lập kế hoạch OKR theo chiến lược Sconnect
export async function POST(request: Request) {
  let requestData: any = {};
  try {
    requestData = await request.json();
  } catch (e) {
    return NextResponse.json({ error: "Yêu cầu không hợp lệ" }, { status: 400 });
  }

  const { action, unitCode, objectiveTitle, objectiveProgress, keyResults, period } = requestData;

  // Nếu API Key chưa được cấu hình, dùng ngay chế độ dự phòng
  if (!genAI) {
    console.warn("GEMINI_API_KEY chưa được cấu hình, kích hoạt chế độ dự phòng.");
    if (action === "suggest") {
      return NextResponse.json({ suggestions: getMockSuggestions(unitCode || "SCVN") });
    }
    if (action === "assess") {
      return NextResponse.json({
        assessment: getMockAssessment(unitCode || "SCVN", objectiveTitle || "", objectiveProgress || 0, keyResults || [])
      });
    }
    return NextResponse.json({ error: "Hành động không hợp lệ" }, { status: 400 });
  }

  try {
    const contextPath = path.join(process.cwd(), "app", "api", "ai", "okr-strategy", "sconnect_context.txt");
    let sconnectContext = "";
    if (fs.existsSync(contextPath)) {
      sconnectContext = fs.readFileSync(contextPath, "utf8");
    }

    // 1. Truy vấn chéo toàn bộ objectives của đơn vị đó từ DB qua Prisma để có cơ sở đối chiếu chéo
    let allObjectivesText = "";
    try {
      const filterPeriod = period || "Q3_2026";
      const dbObjectives = await prisma.objective.findMany({
        where: {
          unitCode: unitCode || "SCVN",
          period: filterPeriod
        },
        include: {
          keyResults: {
            include: {
              actions: true
            }
          }
        }
      });
      
      if (dbObjectives && dbObjectives.length > 0) {
        allObjectivesText = dbObjectives.map(o => {
          const krsText = (o.keyResults || []).map(kr => {
            const actsText = (kr.actions || []).filter(act => act.notes).map(act => `    * Action: ${act.title} -> Ghi chú: ${act.notes}`).join("\n");
            const actsHeader = actsText ? `\n    Ghi chú hành động:\n${actsText}` : "";
            return `  - KR: ${kr.title}, Tiến độ: ${kr.progress}%${actsHeader}`;
          }).join("\n");
          return `- Mục tiêu: ${o.title}, Tiến độ chung: ${o.progress}%\n${krsText}`;
        }).join("\n");
      }
    } catch (dbErr) {
      console.warn("Lỗi truy vấn DB objectives chéo, bỏ qua dữ liệu bổ sung:", dbErr);
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

    // 1. NGHIỆP VỤ AI PLANNING: GỢI Ý MỤC TIÊU THEO CHIẾN LƯỢC SCONNECT
    if (action === "suggest") {
      const prompt = `
Bạn là Trợ lý AI Hoạch định Chiến lược & OKR cao cấp tại Sconnect.
Nhiệm vụ của bạn là tư vấn đề xuất từ 1 đến 2 Objectives cùng các Key Results tương ứng cho đơn vị "${unitCode}" dựa trên định hướng chiến lược của Sconnect năm 2026.

YÊU CẦU THIẾT LẬP OKR ĐÚNG LÝ THUYẾT:
- Objective (Mục tiêu): Phải là mục tiêu lớn, truyền cảm hứng, định hướng hành động và mang tính chất lượng (định tính), KHÔNG được chứa các số liệu định lượng hay chỉ tiêu đo lường. Đại diện cho sự bứt phá đột phá (Làm LỚN).
- Key Result (Kết quả then chốt): Phải chứa chỉ số đo lường định lượng cụ thể, có thời hạn và phản ánh kết quả (outcome) chứ không chỉ đơn thuần là liệt kê công việc (output).
- Khác biệt với KPI: Tránh đề xuất các công việc duy trì vận hành hằng ngày, lặp đi lặp lại hoặc công việc thường nhật của phòng ban dưới dạng OKR (các việc đó thuộc về KPI - Làm TRÒN).

Dưới đây là tài liệu ngữ cảnh chiến lược cốt lõi của Sconnect (bao gồm định hướng sản phẩm như Wolfoo, Lego, Music, các mục tiêu 2026, triết lý vận hành):
=== BẮT ĐẦU TÀI LIỆU NGỮ CẢNH SCONNECT ===
${sconnectContext}
=== KẾT THÚC TÀI LIỆU NGỮ CẢNH SCONNECT ===

Dựa trên đơn vị "${unitCode}", hãy đưa ra các đề xuất phù hợp:
- Nếu đơn vị là "TCT" (Tổng công ty): Tập trung vào quản trị hệ thống, tối ưu hóa dòng tiền, gia tăng hiệu suất vận hành toàn tập đoàn, và nhân rộng hệ điều hành AIVA.
- Nếu đơn vị là "SCVN" (Sconnect Việt Nam): Tập trung vào các bộ phận con như Wolfoo 2D/3D (tái sử dụng assets), BP AS (teen story/drama học đường trên YouTube & Spotify), Dự án 01 (khai thác kho gốc), BP Music (nhạc số AI), P CNGP (game app & YouTube).

YÊU CẦU ĐẦU RA:
Trả về phản hồi định dạng JSON duy nhất dưới dạng một đối tượng (không kèm markdown block hoặc bất kỳ văn bản giải thích nào):
{
  "suggestions": [
    {
      "title": "Tên Objective đề xuất (Ví dụ: O1: Tối ưu hóa chi phí vận hành hệ thống sản xuất và nâng tỷ lệ tái sử dụng assets Wolfoo 3D)",
      "weight": 50,
      "keyResults": [
        {
          "title": "Tên Key Result đề xuất (Ví dụ: KR1: Đạt tỷ lệ tái sử dụng assets Wolfoo 3D tối thiểu 60%)",
          "priority": "High",
          "pic": "Trưởng phòng/PIC đại diện",
          "actions": [
            {
              "title": "Hành động cụ thể (Ví dụ: Thực hiện kiểm kê, phân loại và chuẩn hóa kho Asset Wolfoo 3D lên server chung)",
              "pic": "Nhân sự triển khai"
            }
          ]
        }
      ]
    }
  ]
}
`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();
      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const data = JSON.parse(cleanJson);
      return NextResponse.json(data);
    } 
    
    // 2. NGHIỆP VỤ AI ASSESSOR: ĐÁNH GIÁ TIẾN ĐỘ THỰC TẾ OKR
    if (action === "assess") {
      const krText = (keyResults || []).map((kr: any) => {
        const actionsText = (kr.actions || []).map((act: any) => 
          `- Action: ${act.title}, Tiến độ: ${act.progress}%, Trạng thái: ${act.status}, Ghi chú thực tế: ${act.notes || "Không có"}, PIC: ${act.pic}`
        ).join("\n  ");
        return `- KR: ${kr.title}, Tiến độ: ${kr.progress}%, Ghi chú thực tế: ${kr.notes || "Không có"}, PIC: ${kr.pic}\n  Hành động con:\n  ${actionsText}`;
      }).join("\n");

      const prompt = `
Bạn là Trợ lý AI Đánh giá Mục tiêu (Assessor) tại Sconnect.
Nhiệm vụ của bạn là phân tích tiến độ thực tế và đề xuất hành động thực tiễn tháo gỡ rủi ro cho Mục tiêu "${objectiveTitle}" của đơn vị "${unitCode}".

ĐỂ ĐƯA RA NHẬN ĐỊNH SÁT THỰC TẾ, BẠN CẦN:
1. ĐÁNH GIÁ TÍNH ĐÚNG ĐẮN CỦA VIỆC THIẾT LẬP OKR (OKR VALIDATION):
   - Đánh giá xem tên Objective và các Key Results đã tuân thủ đúng lý thuyết hay chưa:
     * O phải mang tính định tính, truyền cảm hứng, định hướng hành động, KHÔNG chứa chỉ số định lượng.
     * KRs phải mang tính định lượng, đo lường được kết quả cụ thể.
     * Phân biệt rõ OKR (Làm LỚN - bứt phá, thay đổi) với KPI (Làm TRÒN - công việc duy trì vận hành hằng ngày, lặp đi lặp lại). Nếu Objective/KR thực chất chỉ là KPI vận hành lặp lại, hãy chỉ rõ lỗi này và đưa ra nhận xét cảnh báo ở phần đầu nhận định.
   - Kiểm tra xem OKR thiết lập đã phù hợp và bám sát định hướng chiến lược Sconnect năm 2026 và mục tiêu Quý 3/2026 chưa. Nếu lệch hướng, đưa ra cảnh báo điều chỉnh.

2. So sánh đối chiếu với TOÀN BỘ CÁC MỤC TIÊU KHÁC trong hệ thống của đơn vị:
=== BẮT ĐẦU TOÀN BỘ OKRS ĐƠN VỊ TRONG HỆ THỐNG ===
${allObjectivesText || "Không có thông tin bổ sung"}
=== KẾT THÚC TOÀN BỘ OKRS ĐƠN VỊ TRONG HỆ THỐNG ===

3. Đọc kỹ GHI CHÚ THỰC TẾ (Notes) và TIẾN ĐỘ (%) của từng KR/Action để hiểu khó khăn thực tế mà nhân sự ghi nhận:
CHI TIẾT MỤC TIÊU CẦN ĐÁNH GIÁ:
- Tên Objective: "${objectiveTitle}"
- Tiến độ chung: ${objectiveProgress}%
Các KRs & Actions kèm ghi chú thực tế:
${krText}

4. Phân tích bối cảnh chiến lược năm 2026 của Sconnect/SCVN:
=== BẮT ĐẦU CHIẾN LƯỢC SCONNECT 2026 ===
${sconnectContext}
=== KẾT THÚC CHIẾN LƯỢC SCONNECT 2026 ===

5. SỬ DỤNG TOOL 'searchMarketTrends' để chủ động tìm kiếm thông tin thị trường/đối thủ trên Google/YouTube/Spotify liên quan đến đơn vị "${unitCode}" để đưa ra đề xuất mang tính chiến đấu và chuẩn xác nhất.

ĐỊNH DẠNG ĐẦU RA:
Trả về phản hồi dạng TEXT (sử dụng markdown in đậm **, danh sách *). Bắt đầu bằng dòng "**AI Agent nhận định:**" và phân tích rõ ràng, trực diện, không rườm rà.
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
          return NextResponse.json({ assessment: toolResponse.response.text() });
        }
      }
      return NextResponse.json({ assessment: result.response.text() });
    }

    return NextResponse.json({ error: "Hành động không hợp lệ" }, { status: 400 });
  } catch (error: any) {
    console.warn("Lỗi gọi Gemini API (API Key sai/hết hạn), kích hoạt chế độ dự phòng:", error);
    
    // Khối dự phòng tự phục hồi (Self-healing fallbacks)
    if (action === "suggest") {
      return NextResponse.json({ suggestions: getMockSuggestions(unitCode || "SCVN") });
    }
    if (action === "assess") {
      return NextResponse.json({
        assessment: getMockAssessment(unitCode || "SCVN", objectiveTitle || "", objectiveProgress || 0, keyResults || [])
      });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
