import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Fallback rule-based and local RAG search engine for OM Agent when Gemini connection is offline
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

  // 2. Tìm kiếm từ khóa cục bộ trên toàn bộ tài liệu đã trích xuất
  if (sconnectContext) {
    const stopWords = ["là", "gì", "của", "cho", "các", "những", "nào", "được", "trong", "trên", "dưới", "về", "và", "được", "có", "mã", "bộ", "phần", "khu", "tại", "để", "như", "thế", "đâu"];
    const keywords = q
      .replace(/[?,.:;!\(\)\[\]"']/g, " ")
      .split(/\s+/)
      .filter(word => word.length >= 2 && !stopWords.includes(word));

    if (keywords.length > 0) {
      // Tách văn bản ngữ cảnh thành các đoạn văn riêng biệt
      const paragraphs = sconnectContext
        .split(/\n\s*\n/)
        .map(p => p.trim())
        .filter(Boolean);

      // Tính điểm độ trùng khớp cho từng đoạn văn
      const scoredParagraphs = paragraphs.map((p, idx) => {
        const pLower = p.toLowerCase();
        let score = 0;
        let matchedCount = 0;

        for (const kw of keywords) {
          if (pLower.includes(kw)) {
            matchedCount++;
            // Trọng số cao hơn cho các từ khóa cốt lõi (tên đơn vị, năm, cụm từ chuyên môn)
            const isStrategic = /wolfoo|music|lego|scvn|scme|sama|woa|su|pc&ksnb|tckt|qtnnl|ai|2026|2030|quý 3|q3|okr|kpi|tầm nhìn|mục tiêu|chiến lược/i.test(kw);
            score += isStrategic ? 6 : 2;
          }
        }

        // Ưu tiên đoạn chứa tiêu đề chính hoặc phân mục
        if (p.startsWith("TÀI LIỆU CHÍNH THỨC") || p.startsWith("I.") || p.startsWith("II.") || p.startsWith("III.")) {
          score += 2;
        }

        // Cộng điểm theo tỷ lệ từ khóa khớp được trên tổng số từ khóa câu hỏi
        const ratio = matchedCount / keywords.length;
        score += ratio * 12;

        return { text: p, score, index: idx };
      });

      // Lọc các đoạn văn có mức độ liên quan tốt (score > 3) và sắp xếp giảm dần theo điểm số
      const matches = scoredParagraphs
        .filter(p => p.score > 3)
        .sort((a, b) => b.score - a.score);

      if (matches.length > 0) {
        const best = matches[0];
        let replyText = best.text;

        // Tự động gộp thêm đoạn văn tiếp theo trong tài liệu nếu nó ngắn hoặc cũng liên quan
        const nextIdx = best.index + 1;
        if (nextIdx < paragraphs.length) {
          const nextPara = paragraphs[nextIdx];
          const nextParaLower = nextPara.toLowerCase();
          const isNextRelated = keywords.some(kw => nextParaLower.includes(kw)) || nextPara.length < 350;
          if (isNextRelated && !nextPara.startsWith("TÀI LIỆU CHÍNH THỨC")) {
            replyText += "\n\n" + nextPara;
          }
        }

        // Định dạng tiêu đề hiển thị và giới hạn độ dài hiển thị trên Widget
        if (replyText.length > 2000) {
          replyText = replyText.slice(0, 2000) + "... *(Xem chi tiết trong các file báo cáo chiến lược)*";
        }

        return `**OM Agent (Offline Search):** ${replyText}`;
      }
    }
  }

  // 3. Fallback ngược về các bộ quy tắc tĩnh nếu không tìm thấy đoạn văn phù hợp
  if (q.includes("scvn") && (q.includes("okr") || q.includes("objective") || q.includes("mục tiêu") || q.includes("quý 3") || q.includes("q3"))) {
    return `**OM Agent:** Trong quý 3 (mã kỳ M7_2026) của **SCVN (Sconnect Việt Nam)**, hệ thống ghi nhận **04 Objectives (Mục tiêu)** cốt lõi sau:

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
    return `**OM Agent:** Đối với **BP Wolfoo** trong chiến lược 2026:
- **Định hướng cốt lõi:** Tập trung vào tối ưu hóa chi phí sản xuất Wolfoo 2D/3D. Mục tiêu then chốt là nâng tỷ lệ tái sử dụng tài nguyên dựng hình thô (assets) lên tối thiểu **60%** để tối ưu hóa lợi nhuận.
- **Kênh phân phối:** Phát triển mạnh mẽ định dạng Shorts và Reels (Facebook/TikTok) song song với video dài.
- **OKR gợi ý:** O1: Tăng tốc độ sản xuất và tối ưu hóa thư viện asset Wolfoo 3D dùng chung.
- **KPI cốt lõi:** Số lượng video hoàn thành đúng hạn (>= 3 video/tuần); Tỷ lệ video đạt chuẩn chất lượng (>= 95%).`;
  }
  
  if (q.includes("music") || q.includes("âm nhạc") || q.includes("scmu")) {
    return `**OM Agent:** Đối với **BP Music (SCMU)** trong chiến lược 2026:
- **Định hướng cốt lõi:** Phát triển nhạc số, phân phối bản quyền đa nền tảng trên phạm vi toàn cầu (Spotify, Apple Music, YouTube Music).
- **Ứng dụng AI:** Đào tạo đội ngũ tối ưu prompt nhạc nền AI (Suno/Udio) giúp giảm chi phí sản xuất nhạc nền xuống 85% và sản xuất hàng loạt kho nhạc chất lượng cao.
- **KPI cốt lõi:** Đạt chỉ tiêu doanh thu nhạc số phái sinh và sản lượng nhạc nền AI chất lượng cao hàng tháng.`;
  }

  if (q.includes("lego")) {
    return `**OM Agent:** Đối với **DA Lego** trong chiến lược 2026:
- **Định hướng cốt lõi:** Sản xuất nội dung stop-motion đồ chơi ngách dành riêng cho tệp khán giả trưởng thành và học đường (non-KID).
- **Nội dung:** Xây dựng cốt truyện phân chia phe chiến tuyến (Công và Thủ thành) để gia tăng lượng bình luận, tương tác lên 150% và nâng cao tỷ lệ giữ chân người xem.`;
  }

  if (q.includes("animated") || q.includes("bp as") || q.includes("truyện tranh")) {
    return `**OM Agent:** Đối với **BP AS (Animated Story)** trong chiến lược 2026:
- **Định hướng cốt lõi:** Định vị sản xuất teen story, drama học đường phân phối đa kênh trên cả YouTube và Spotify (dưới dạng Audio Drama/Podcast).
- **Hành động:** Rút ngắn thời gian duyệt kịch bản xuống dưới 24h và thiết lập liên kết mục tiêu chặt chẽ từ công ty xuống cá nhân.`;
  }

  if (q.includes("pháp chế") || q.includes("pc&ksnb") || q.includes("pc & ksnb")) {
    return `**OM Agent:** Đối với **Phòng Pháp chế & Kiểm soát nội bộ (PC&KSNB)** thuộc khối SUs:
- **Vai trò:** Lá chắn pháp lý, giám sát tuân thủ kỷ luật và kiểm soát rủi ro hệ thống.
- **Mục tiêu:** Bảo vệ bản quyền IP nội dung của Sconnect, giảm thiểu tối đa các rủi ro pháp lý khi phân phối nội dung trên các nền tảng quốc tế (YouTube, Spotify).
- **Sáng kiến:** Số hóa lưu kho văn bản pháp lý và chuẩn hóa quy tắc tuân thủ chính sách nền tảng.`;
  }

  if (q.includes("tài chính") || q.includes("kế toán") || q.includes("tckt")) {
    return `**OM Agent:** Đối với **Phòng Tài chính Kế toán (TCKT)** thuộc khối SUs:
- **Vai trò:** Người bảo vệ dòng tiền và là Nhà đầu tư Chiến lược của hệ sinh thái Sconnect.
- **Mục tiêu:** Quản trị dòng tiền dương ổn định, giảm tỷ lệ chi phí vận hành (OPEX Ratio).
- **Sáng kiến:** Vận hành tài chính AI-Native (AIVA-O), tự động hóa >90% quy trình kế toán báo cáo realtime và lập FP&A dựa trên AI.`;
  }

  if (q.includes("nhân sự") || q.includes("nguồn nhân lực") || q.includes("qtnnl")) {
    return `**OM Agent:** Đối với **Phòng Quản trị Nguồn nhân lực (QTNNL)** thuộc khối SUs:
- **Vai trò:** Kiến trúc sư văn hóa AI-First và là Đối tác Chiến lược nhân tài.
- **Mục tiêu:** Hoàn thiện Khung năng lực mới cho 100% vị trí, đảm bảo đánh giá thành tích OKR/KPI minh bạch rõ ràng.
- **Sáng kiến:** Thực thi chương trình tái đào tạo toàn diện (The Great Reskilling) nâng cao kỹ năng AI và tự động hóa quy trình quản sự vận hành.`;
  }

  if (q.includes("nhóm ai") || q.includes("su mới")) {
    return `**OM Agent:** Đối với **Nhóm AI (Đơn vị hỗ trợ SU mới)**:
- **Vai trò:** Động cơ công nghệ AI-native và Siêu trợ lý vận hành doanh nghiệp.
- **Mục tiêu:** Nghiên cứu và vận hành hệ điều hành AIVA của tổng công ty, triển khai tối thiểu 5 giải pháp AI Agent tự chủ phục vụ Shared Services.
- **Sáng kiến:** Phát triển trợ lý AI Co-Pilot giúp duyệt tờ trình hành chính tự động nhanh dưới **12 giờ**.`;
  }

  if (q.includes("okr là gì") || q.includes("kpi là gì") || q.includes("phân biệt") || q.includes("khác nhau")) {
    return `**OM Agent:** Theo cẩm nang Quản lý hiệu suất của Sconnect, **OKR** và **KPI** được phân biệt rõ ràng:
1. **OKR (Objectives & Key Results) - Làm LỚN:**
   - **Bản chất:** Hệ thống mục tiêu định hướng bứt phá, thay đổi đột phá và sáng tạo.
   - **Cấu trúc:** Objective (Mục tiêu định tính truyền cảm hứng) + Key Results (Kết quả then chốt định lượng đo lường được).
   - **Tính chất:** Linh hoạt, thay đổi theo quý/dự án. Thường không gắn trực tiếp vào lương thưởng để nhân sự tự tin đặt mục tiêu thách thức (Sweet spot đạt 70-80% là thành công lớn).
2. **KPI (Key Performance Indicator) - Làm TRÒN:**
   - **Bản chất:** Chỉ số đo lường hiệu suất công việc cốt lõi, duy trì vận hành ổn định.
   - **Cấu trúc:** Chỉ số định lượng cụ thể (%, số lượng, thời gian) tuân thủ SMART.
   - **Tính chất:** Ổn định, lặp lại qua các kỳ. Gắn chặt chẽ trực tiếp với đánh giá năng lực thăng tiến và lương thưởng (yêu cầu cam kết đạt 100%).`;
  }

  if (q.includes("chiến lược") || q.includes("sconnect 2026") || q.includes("định hướng")) {
    return `**OM Agent:** **Chiến lược năm 2026 của Sconnect** tập cung vào các điểm cốt lõi:
1. **Triết lý vận hành:** Phân biệt rõ ràng giữa "Làm LỚN" (OKR hướng đột phá) và "Làm TRÒN" (KPI bảo vệ nền móng ổn định).
2. **Tái cấu trúc tinh gọn:** SCVN quản lý tập trung 8-9 đơn vị thành viên, cắt giảm OPEX lãng phí, ra quyết định dựa trên dữ liệu realtime (SSoT).
3. **Đột phá công nghệ AIVA:** Triển khai AIVA-C (sản xuất nội dung), AIVA-O (tự động hóa Shared Services) và AIVA-P (đào tạo phát triển cá nhân) để nâng hiệu suất lao động toàn tập đoàn lên 200%.`;
  }

  return `**OM Agent:** Xin chào! Tôi là **OM Agent** - Trợ lý Chiến lược và Quản trị Mục tiêu tại Sconnect. 
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
      console.warn("GEMINI_API_KEY chưa được cấu hình cho OM Agent. Kích hoạt chế độ trả lời dự phòng.");
      const reply = getMockOmResponse(latestMessage);
      return NextResponse.json({ reply });
    }

    // 3. Gọi Gemini API thực tế với systemInstruction chứa toàn bộ tri thức chiến lược
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `Bạn là OM Agent - Trợ lý Chiến lược và Quản trị Mục tiêu cao cấp, thông minh tại Sconnect.
Nhiệm vụ của bạn là hỗ trợ, đồng hành (cowork) cùng người dùng trong việc quản lý, xây dựng chiến lược và thiết lập mục tiêu OKR/KPI.

HÃY TUÂN THỦ CÁC QUY TẮC SAU:
1. Luôn căn cứ vào tài liệu bối cảnh chiến lược chính thống của Sconnect dưới đây để trả lời câu hỏi:
=== BỐI CẢNH CHIẾN LƯỢC SCONNECT ===
${sconnectContext}
=== KẾT THÚC BỐI CẢNH CHIẾN LƯỢC ===

2. Khi người dùng hỏi về bất kỳ đơn vị nào (Wolfoo, Lego, Music SCMU, Animated Story, hay các SUs hỗ trợ như TCKT, QTNNL, PC&KSNB, Nhóm AI), hãy trả lời cụ thể, chính xác theo định hướng và chỉ số của đơn vị đó có trong tài liệu.
3. Khi người dùng hỏi về OKR hay KPI, hãy dùng cẩm nang "Hướng dẫn Quản lý hiệu suất theo KPI/OKR" của Sconnect để hướng dẫn viết OKR chuẩn (John Doerr), thiết lập KPI SMART, và cách phối hợp chéo theo triết lý "Bánh xe Mục tiêu" (Làm LỚN - Làm TRÒN).
4. Câu trả lời của bạn phải rõ ràng, ngắn gọn, có cấu trúc tốt (sử dụng gạch đầu dòng, chữ in đậm), viết bằng tiếng Việt và mang văn phong chuyên nghiệp, tin cậy.`
    });

    // Định dạng lịch sử trò chuyện cho Gemini Chat. Lịch sử bắt buộc phải bắt đầu bằng tin nhắn từ "user".
    const firstUserIdx = messages.findIndex((m: any) => m.role === "user");
    let chatHistory: any[] = [];
    if (firstUserIdx !== -1) {
      chatHistory = messages.slice(firstUserIdx, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }]
      }));
    }

    const chat = model.startChat({
      history: chatHistory
    });

    const result = await chat.sendMessage(latestMessage);
    const replyText = result.response.text();
    return NextResponse.json({ reply: replyText });

  } catch (error: any) {
    console.error("Lỗi khi xử lý hội thoại OM Agent (Chuyển sang chế độ dự phòng):", error);
    const reply = getMockOmResponse(latestMessage);
    return NextResponse.json({ reply });
  }
}
