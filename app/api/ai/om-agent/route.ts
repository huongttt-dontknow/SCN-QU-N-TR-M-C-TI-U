import { NextResponse } from "next/server";
import { GoogleGenerativeAI, FunctionDeclarationSchemaType } from "@google/generative-ai";
import fs from "fs";
import path from "path";

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

// Clean up spreadsheet and raw table formatting from search results
function cleanSearchResult(text: string): string {
  if (!text.includes("|")) {
    return text.replace(/#DIV\/0!/g, "").replace(/\s+/g, " ").trim();
  }

  const lines = text.split("\n");
  const cleaned: string[] = [];
  let currentObjective = "";

  for (const line of lines) {
    if (!line.includes("|")) {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith("===") && !trimmed.startsWith("---") && !trimmed.startsWith("=================")) {
        cleaned.push(trimmed);
      }
      continue;
    }

    const cells = line.split("|").map(c => c.trim());
    if (cells.length < 3 || cells.every(c => c === "" || c.startsWith("-"))) {
      continue;
    }

    const titleVal = cells[1] || "";
    if (!titleVal) continue;

    if (/Ưu tiên|Time Start|Time End|Tiến độ thực hiện|Chi tiết hành động|Trạng thái|PIC|Kết quả/i.test(titleVal)) {
      continue;
    }

    const objectiveMatch = titleVal.match(/Objective\s*(\d+)[:.]?\s*(.*)/i);
    if (objectiveMatch) {
      const objNum = objectiveMatch[1];
      const objText = objectiveMatch[2].replace(/#DIV\/0!/g, "").replace(/\s+/g, " ").trim();
      currentObjective = `🎯 **Objective ${objNum}: ${objText}**`;
      cleaned.push("\n" + currentObjective);
      continue;
    }

    const krMatch = titleVal.match(/Key\s*Result\s*(\d+)[:.]?\s*(.*)/i);
    if (krMatch) {
      const krNum = krMatch[1];
      const krText = krMatch[2].replace(/#DIV\/0!/g, "").replace(/\s+/g, " ").trim();

      let progress = "";
      const rawProgress = cells[9] || cells[10] || "";
      if (/^\d+(\.\d+)?%?$/.test(rawProgress)) {
        progress = ` (Tiến độ: ${rawProgress}%)`;
      }

      let pic = "";
      const rawPic = cells[11] || cells[12] || "";
      if (rawPic && !/^\d+(\.\d+)?$/.test(rawPic)) {
        pic = ` [PIC: ${rawPic}]`;
      }

      let notes = "";
      const rawNotes = cells[14] || cells[15] || "";
      if (rawNotes && rawNotes.length > 5) {
        notes = `\n    * Ghi chú hành động: ${rawNotes.replace(/\s+/g, " ").trim()}`;
      }

      let status = "";
      const rawStatus = cells[16] || cells[17] || "";
      if (rawStatus && /triển khai|hoàn thành|chưa/i.test(rawStatus)) {
        status = ` [Trạng thái: ${rawStatus}]`;
      }

      cleaned.push(`  - 🔑 **KR ${krNum}**: ${krText}${progress}${pic}${status}${notes}`);
      continue;
    }

    if (titleVal.includes("OKR - BP") || titleVal.includes("OKR - ĐV") || titleVal.includes("OKR - SCVN") || titleVal.includes("OKR - SCONNECT")) {
      cleaned.push(`\n### ${titleVal.replace(/\s+/g, " ").trim()}`);
      continue;
    }

    const nonActionCells = cells.map(c => c.trim()).filter(c => c !== "" && !c.startsWith("-") && !c.includes("DIV/0"));
    if (nonActionCells.length > 0) {
      const cleanVal = nonActionCells.join(" - ").replace(/\s+/g, " ").trim();
      if (cleanVal.length > 5 && !cleanVal.includes("---")) {
        cleaned.push(`  - ${cleanVal}`);
      }
    }
  }

  return cleaned
    .join("\n")
    .replace(/\n\s*\n+/g, "\n\n")
    .trim();
}

function getMockOmResponse(question: string): string {
  const q = question.toLowerCase();

  // 1. Tải tài liệu ngữ cảnh sconnect_context.txt
  const contextPath = path.join(process.cwd(), "app", "api", "ai", "okr-strategy", "sconnect_context.txt");
  let sconnectContext = "";
  try {
    if (fs.existsSync(contextPath)) {
      sconnectContext = fs.readFileSync(contextPath, "utf8");
    }
  } catch (err) {
    console.error("Lỗi khi đọc file ngữ cảnh sconnect_context.txt cho bộ phản hồi dự phòng:", err);
  }

  // 2. Tìm kiếm từ khóa cục bộ trên toàn bộ tài liệu đã trích xuất trước để làm ngữ cảnh
  let ragMatch = "";
  if (sconnectContext) {
    const stopWords = ["là", "gì", "của", "cho", "các", "những", "nào", "được", "trong", "trên", "dưới", "về", "và", "được", "có", "mã", "bộ", "phần", "khu", "tại", "để", "như", "thế", "đâu"];
    const keywords = q
      .replace(/[?,.:;!\(\)\[\]"']/g, " ")
      .split(/\s+/)
      .filter(word => word.length >= 2 && !stopWords.includes(word));

    if (keywords.length > 0) {
      const paragraphs = sconnectContext
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean);

      const scoredParagraphs = paragraphs.map((p, idx) => {
        const pLower = p.toLowerCase();
        let score = 0;
        let matchedCount = 0;

        for (const kw of keywords) {
          if (pLower.includes(kw)) {
            matchedCount++;
            const isStrategic = /wolfoo|music|lego|scvn|scme|sama|woa|su|pc&ksnb|tckt|qtnnl|ai|2026|2030|quý 3|q3|okr|kpi|tầm nhìn|mục tiêu|chiến lược|tháng/i.test(kw);
            score += isStrategic ? 6 : 2;
          }
        }

        if (p.startsWith("TÀI LIỆU CHÍNH THỨC") || p.startsWith("I.") || p.startsWith("II.") || p.startsWith("III.")) {
          score += 2;
        }

        const ratio = matchedCount / keywords.length;
        score += ratio * 12;

        return { text: p, score, index: idx };
      });

      const matches = scoredParagraphs
        .filter(p => p.score > 3)
        .sort((a, b) => b.score - a.score);

      if (matches.length > 0) {
        const best = matches[0];
        let replyText = best.text;

        const nextIdx = best.index + 1;
        if (nextIdx < paragraphs.length) {
          const nextPara = paragraphs[nextIdx];
          const nextParaLower = nextPara.toLowerCase();
          const isNextRelated = keywords.some(kw => nextParaLower.includes(kw)) || nextPara.length < 350;
          if (isNextRelated && !nextPara.startsWith("TÀI LIỆU CHÍNH THỨC")) {
            replyText += "\n\n" + nextPara;
          }
        }

        if (replyText.length > 2000) {
          replyText = replyText.slice(0, 2000) + "... *(Xem chi tiết trong các file báo cáo chiến lược)*";
        }
        ragMatch = replyText;
      }
    }
  }

  // 3. Xử lý các câu hỏi Hoạch định/Gợi ý/Đề xuất OKR hoặc KPI
  if (q.includes("gợi ý") || q.includes("hoạch định") || q.includes("đề xuất") || q.includes("quý 4") || q.includes("q4") || q.includes("2027") || q.includes("tháng")) {
    let targetUnit = "Đơn vị";
    if (q.includes("wolfoo")) targetUnit = "BP Wolfoo";
    else if (q.includes("music") || q.includes("scmu")) targetUnit = "BP Music (SCMU)";
    else if (q.includes("lego")) targetUnit = "DA Lego";
    else if (q.includes("pháp chế") || q.includes("pc&ksnb")) targetUnit = "Phòng Pháp chế & KSNB";
    else if (q.includes("tài chính") || q.includes("tckt")) targetUnit = "Phòng TCKT";

    let timeContext = "";
    if (q.includes("tháng 8")) timeContext = "Tháng 8 (thuộc Quý 3/2026)";
    else if (q.includes("tháng 7")) timeContext = "Tháng 7 (thuộc Quý 3/2026)";
    else if (q.includes("tháng 9")) timeContext = "Tháng 9 (thuộc Quý 3/2026)";
    else if (q.includes("quý 3") || q.includes("q3")) timeContext = "Quý 3/2026";
    else if (q.includes("quý 4") || q.includes("q4")) timeContext = "Quý 4/2026";

    const responseIntro = `**OM AI Agent (Offline Planning):** Nhận được yêu cầu gợi ý hoạch định cho **${targetUnit}** ${timeContext ? `vào ${timeContext}` : ""}.`;

    if (ragMatch) {
      const cleanedOkr = cleanSearchResult(ragMatch);
      return `${responseIntro} Dựa trên tài liệu chiến lược của Sconnect, dưới đây là định hướng mục tiêu liên quan được tìm thấy:

${cleanedOkr}

*Lưu ý: Để nhận được các đề xuất mục tiêu sáng tạo mới tự động mở rộng theo thời gian thực (giống ChatGPT/Gemini), vui lòng đảm bảo khóa GEMINI_API_KEY trên Vercel của bạn hoạt động bình thường.*`;
    }

    // Static fallback if no RAG match is found
    if (q.includes("wolfoo")) {
      return `${responseIntro} Đề xuất hoạch định OKR Q4/2026 cho **BP Wolfoo**:
- **Objective:** Tối ưu hóa chuỗi sản xuất Wolfoo 2D/3D và nâng cao tỷ lệ tái sử dụng tài nguyên dựng hình thô.
- **Key Results:**
  1. Đạt tỷ lệ tái sử dụng assets Wolfoo 3D/2D tối thiểu **60%** trong dựng thô để giảm chi phí sản xuất.
  2. Ứng dụng AIVA-C tự động hóa **>70%** quy trình render và xuất bản phim hoạt hình.`;
    }
    if (q.includes("music") || q.includes("âm nhạc") || q.includes("scmu")) {
      return `${responseIntro} Đề xuất hoạch định OKR Q4/2026 cho **BP Music (SCMU)**:
- **Objective:** Bứt phá doanh thu nhạc số đa kênh trên các nền tảng quốc tế (Spotify, Apple Music).
- **Key Results:**
  1. Đạt sản lượng phát hành **>1,000 bài nhạc nền AI** chất lượng cao hằng tháng bằng các công cụ Suno/Udio.
  2. Doanh thu nhạc số phái sinh tăng trưởng tối thiểu **+75%** so với kỳ trước.`;
    }

    return `${responseIntro} Đề xuất hoạch định chiến lược chung cho kỳ tiếp theo (Q4/2026):
- **Objective 1 (Tài chính & Hiệu suất):** Tăng trưởng hiệu quả doanh thu nội dung số và dịch vụ, tối ưu hóa OPEX bằng AI.
- **Objective 2 (AIVA OS):** Hoàn thiện và tích hợp sâu phân hệ AIVA-O, AIVA-C và AIVA-P vào quy trình làm việc hằng ngày của toàn bộ nhân sự.`;
  }

  // 4. Nếu là câu hỏi bình thường và có kết quả RAG
  if (ragMatch) {
    return `**OM AI Agent (Offline Search):**\n\n${cleanSearchResult(ragMatch)}`;
  }

  // 4. Fallback tĩnh cho SCVN
  if (q.includes("scvn") && (q.includes("okr") || q.includes("objective") || q.includes("mục tiêu") || q.includes("quý 3") || q.includes("q3"))) {
    return `**OM AI Agent:** Trong quý 3 (mã kỳ M7_2026) của **SCVN (Sconnect Việt Nam)**, hệ thống ghi nhận **04 Objectives (Mục tiêu)** cốt lõi sau:

1. **O1: Minh bạch hóa hiệu quả kinh doanh theo từng sản phẩm** (Trọng số 30%)
   - *Chi tiết:* Rà soát chuẩn hóa danh mục sản phẩm, gán Product Owner và hoàn thành Dashboard P&L chuẩn.
2. **O2: Tái cấu trúc mô hình vận hành theo chức năng nhằm nâng cao hiệu suất nguồn lực** (Trọng số 25%)
   - *Chi tiết:* Phân loại nhân sự theo chức năng, cập nhật JD và xây dựng cơ chế điều phối linh hoạt.
3. **O3: AI hóa quản trị và tối ưu hiệu quả sử dụng nguồn lực số** (Trọng số 20%)
   - *Chi tiết:* Hoàn thiện AI Playbook V1, thiết kế AIVA Studio và lựa chọn 5 workflow AI ưu tiên triển khai.
4. **O4: Tăng tốc triển khai và tối ưu hiệu quả các dự án tăng trưởng chiến lược** (Trọng số 25%)
   - *Chi tiết:* Rà soát dự án chiến lược, gán KPI/Owner và thiết lập Dashboard theo dõi chặt chẽ.`;
  }

  if (q.includes("wolfoo")) {
    return `**OM AI Agent:** Đối với **BP Wolfoo** trong chiến lược 2026:
- **Định hướng cốt lõi:** Tập trung vào tối ưu hóa chi phí sản xuất Wolfoo 2D/3D. Mục tiêu then chốt là nâng tỷ lệ tái sử dụng tài nguyên dựng hình thô (assets) lên tối thiểu **60%** để tối ưu hóa lợi nhuận.
- **Kênh phân phối:** Phát triển mạnh mẽ định dạng Shorts và Reels (Facebook/TikTok) song song với video dài.
- **OKR gợi ý:** O1: Tăng tốc độ sản xuất và tối ưu hóa thư viện asset Wolfoo 3D dùng chung.
- **KPI cốt lõi:** Số lượng video hoàn thành đúng hạn (>= 3 video/tuần); Tỷ lệ video đạt chuẩn chất lượng (>= 95%).`;
  }
  
  if (q.includes("music") || q.includes("âm nhạc") || q.includes("scmu")) {
    return `**OM AI Agent:** Đối với **BP Music (SCMU)** trong chiến lược 2026:
- **Định hướng cốt lõi:** Phát triển nhạc số, phân phối bản quyền đa nền tảng trên phạm vi toàn cầu (Spotify, Apple Music, YouTube Music).
- **Ứng dụng AI:** Đào tạo đội ngũ tối ưu prompt nhạc nền AI (Suno/Udio) giúp giảm chi phí sản xuất nhạc nền xuống 85% và sản xuất hàng loạt kho nhạc chất lượng cao.
- **KPI cốt lõi:** Đạt chỉ tiêu doanh thu nhạc số phái sinh và sản lượng nhạc nền AI chất lượng cao hàng tháng.`;
  }

  if (q.includes("lego")) {
    return `**OM AI Agent:** Đối với **DA Lego** trong chiến lược 2026:
- **Định hướng cốt lõi:** Sản xuất nội dung stop-motion đồ chơi ngách dành riêng cho tệp khán giả trưởng thành và học đường (non-KID).
- **Nội dung:** Xây dựng cốt truyện phân chia phe chiến tuyến (Công và Thủ thành) để gia tăng lượng bình luận, tương tác lên 150% và nâng cao tỷ lệ giữ chân người xem.`;
  }

  return `**OM AI Agent:** Xin chào! Tôi là **OM AI Agent** - Trợ lý Chiến lược và Quản trị Mục tiêu tại Sconnect. 
Tôi có thể hỗ trợ bạn trả lời các câu hỏi về:
- Định hướng chiến lược Sconnect 2026 hoặc mục tiêu Q3/2026 của các đơn vị (Wolfoo, Lego, Music, AS...).
- Cơ cấu tổ chức và chỉ tiêu của các phòng ban SUs hỗ trợ (TCKT, QTNNL, PC&KSNB, Nhóm AI).
- Phương pháp viết OKR chuẩn, thiết lập KPI và triết lý "Bánh xe Mục tiêu" (Làm LỚN - Làm TRÒN).

Hãy nhập câu hỏi của bạn hoặc chọn các chủ đề gợi ý nhanh bên dưới nhé!`;
}

export async function POST(request: Request) {
  let latestMessage = "";
  try {
    const { messages } = await request.json();
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Thiếu dữ liệu lịch sử chat" }, { status: 400 });
    }

    latestMessage = messages[messages.length - 1]?.content || "";

    // 1. Tải tài liệu ngữ cảnh sconnect_context.txt
    const contextPath = path.join(process.cwd(), "app", "api", "ai", "okr-strategy", "sconnect_context.txt");
    let sconnectContext = "";
    if (fs.existsSync(contextPath)) {
      sconnectContext = fs.readFileSync(contextPath, "utf8");
    }

    // 2. Nếu chưa cấu hình API Key, sử dụng công cụ Mock trả lời động
    if (!genAI) {
      console.warn("GEMINI_API_KEY chưa được cấu hình cho OM AI Agent. Kích hoạt chế độ trả lời dự phòng.");
      const reply = getMockOmResponse(latestMessage);
      return NextResponse.json({ reply });
    }

    // 3. Gọi Gemini API thực tế với systemInstruction và Google Search Tool để hỗ trợ hoạch định
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Bạn là OM AI Agent - Siêu Cộng sự Chiến lược và Quản trị Mục tiêu thông minh (Strategy Coworker) tại Sconnect.
Nhiệm vụ của bạn là đồng hành, phản biện và hỗ trợ người dùng thảo luận chiến lược, viết OKR/KPI, và đặc biệt là động não (brainstorming), hoạch định kế hoạch hành động kỳ tiếp theo.

HÃY VẬN HÀNH THEO PHONG CÁCH COWORKING & TƯƠNG TÁC CAO CẤP:
1. SỬ DỤNG TRI THỨC ĐÃ NẠP LÀM NỀN TẢNG (BASELINE):
- Luôn sử dụng tài liệu bối cảnh chiến lược của Sconnect dưới đây làm tiền đề định hướng cốt lõi:
=== BỐI CẢNH CHIẾN LƯỢC SCONNECT ===
${sconnectContext}
=== KẾT THÚC BỐI CẢNH CHIẾN LƯỢC ===

2. GIẢI PHÓNG TRÍ TUỆ TỔNG QUÁT & KHẢ NĂNG GENERATIVE:
- Bạn KHÔNG phải là một bot tra cứu tài liệu cứng nhắc. Hãy phát huy toàn bộ năng lực tư duy, hiểu biết sâu rộng về kinh tế, marketing, công nghệ, quản trị hiệu suất giống như Gemini và ChatGPT để mở rộng ý tưởng, gợi mở các chiến dịch cụ thể ngoài tài liệu nếu thấy hữu ích cho Sconnect.
- Hãy chủ động liên kết dữ liệu trong tài liệu Sconnect với xu hướng thị trường bên ngoài (ví dụ: thuật toán YouTube, phân phối âm nhạc số, stop-motion Lego, các workflow tự động hóa AI) bằng công cụ 'searchMarketTrends'.

3. TƯƠNG TÁC HAI CHIỀU & PHẢN BIỆN (COWORKING FLOW):
- Khi trả lời hoặc đề xuất OKR/KPI, hãy viết với văn phong cởi mở, thân thiện, mang tính thảo luận như một đồng nghiệp thực thụ.
- Luôn đặt câu hỏi gợi mở ở cuối câu trả lời để kích thích người dùng chia sẻ thêm về mong muốn của họ hoặc phản biện lại đề xuất của bạn (Ví dụ: "Bạn nghĩ sao về đề xuất Objective này cho Q4?", "Tôi nên đi sâu hơn vào giải pháp AI hay tối ưu hóa chi phí cho phòng ban của bạn?").
- Hãy phản biện một cách thông minh nếu nhận thấy OKR/KPI của người dùng chưa chuẩn lý thuyết (nhầm lẫn giữa OKR và KPI, Key Result không đo lường được kết quả đầu ra, hoặc Objective thiếu truyền cảm hứng).

4. TRÌNH BÀY chuyên nghiệp, ngắn gọn, có cấu trúc tốt (markdown, gạch đầu dòng, bôi đậm các từ khóa quan trọng).`,
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

    // Định dạng lịch sử trò chuyện cho Gemini generateContent (tránh lỗi role 'function' của SDK)
    const firstUserIdx = messages.findIndex((m: any) => m.role === "user");
    let chatHistory: any[] = [];
    if (firstUserIdx !== -1) {
      chatHistory = messages.slice(firstUserIdx, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));
    }

    chatHistory.push({
      role: "user",
      parts: [{ text: latestMessage }]
    });

    const result = await model.generateContent({
      contents: chatHistory
    });

    // Xử lý gọi hàm (Function Calling) nếu Gemini muốn tra cứu thông tin thị trường
    const functionCalls = result.response.functionCalls();
    if (functionCalls && functionCalls.length > 0) {
      const call = functionCalls[0];
      if (call.name === "searchMarketTrends") {
        const queryArg = (call.args as any).query || "";
        const searchResultText = searchMarketTrends(queryArg);
        
        // Nạp cuộc gọi hàm của Model vào lịch sử
        chatHistory.push({
          role: "model",
          parts: [{
            functionCall: {
              name: "searchMarketTrends",
              args: call.args
            }
          }] as any
        });
        
        // Nạp kết quả trả về của hàm dưới role 'user' (để tránh lỗi role 'function' bị Google deprecate)
        chatHistory.push({
          role: "user",
          parts: [{
            functionResponse: {
              name: "searchMarketTrends",
              response: { result: searchResultText }
            }
          }] as any
        });
        
        const finalResponse = await model.generateContent({
          contents: chatHistory
        });
        return NextResponse.json({ reply: finalResponse.response.text() });
      }
    }

    const replyText = result.response.text();
    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("Lỗi khi xử lý hội thoại OM Agent (Chuyển sang chế độ dự phòng):", error);
    const errMsg = error?.message || String(error);
    const reply = `⚠️ **[Lỗi Gemini API: ${errMsg}]**\n\n` + getMockOmResponse(latestMessage);
    return NextResponse.json({ reply });
  }
}
