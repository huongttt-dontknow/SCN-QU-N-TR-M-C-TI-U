import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

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

  let specificRecommendations = "";
  if (unitCode === "SCVN") {
    specificRecommendations = `
    * **BP AS (Animated Story)**: Cần bám sát kế hoạch sản xuất teen story / drama học đường và tối ưu hóa phân phối âm thanh truyện đọc lên Spotify để đa dạng nguồn thu.
    * **Dự án 01 (DA 01)**: Đẩy mạnh đóng gói và khai thác kho gốc phái sinh, tăng tốc nghiên cứu và thử nghiệm phân phối nội dung trên các nền tảng OTT mới để khai phá thị trường ngách.
    * **Phòng CNGP**: Tập trung hoàn thiện các tự động hóa quản trị kênh YouTube và tăng tốc sản xuất dự án game app nhận bàn giao từ SCCH.
    * **Wolfoo 2D/3D**: Tăng tỷ lệ tái sử dụng tài nguyên (assets) Wolfoo 2D và 3D tối thiểu đạt 60% để giảm OPEX sản xuất.`;
  } else {
    specificRecommendations = `
    * **Nhóm AI**: Quyết liệt nghiên cứu và triển khai thử nghiệm các trợ lý AI Co-Pilot để tối ưu hóa quy trình phê duyệt tờ trình và Shared Services của tổng công ty.
    * **Quản trị dòng tiền**: Tắt các cổng chi phí OPEX lãng phí, đồng bộ dữ liệu Realtime lên Dashboard để phục vụ họp strategic review hàng tuần.`;
  }

  return `**AI Agent nhận định:**

1. **Đánh giá tổng quan**:
   * Mục tiêu *"${objectiveTitle}"* của đơn vị **${unitCode}** hiện đạt tiến độ chung là **${objectiveProgress}%**.
   * Nhìn chung, tiến độ này phản ánh đúng nhịp độ hoạt động thực tế của đơn vị. Tuy nhiên, để hoàn thành kế hoạch cuối năm, tốc độ hoàn thành cần được gia tốc hơn nữa ở các Actions bổ trợ.

2. **Phân tích rủi ro & Điểm nghẽn**:
   * ${delayWarning}
   * Rủi ro về nguồn lực triển khai có thể bị phân tán nếu không xác định rõ mức độ ưu tiên giữa các đầu việc.

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

  const { action, unitCode, objectiveTitle, objectiveProgress, keyResults } = requestData;

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

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    // 1. NGHIỆP VỤ AI PLANNING: GỢI Ý MỤC TIÊU THEO CHIẾN LƯỢC SCONNECT
    if (action === "suggest") {
      const prompt = `
Bạn là Trợ lý AI Hoạch định Chiến lược & OKR cao cấp tại Sconnect.
Nhiệm vụ của bạn là tư vấn đề xuất từ 1 đến 2 Objectives cùng các Key Results tương ứng cho đơn vị "${unitCode}" dựa trên định hướng chiến lược của Sconnect năm 2026.

Dưới đây là tài liệu ngữ cảnh chiến lược cốt lõi của Sconnect (bao gồm định hướng sản phẩm như Wolfoo, Lego, Music, các mục tiêu 2026, triết lý vận hành):
=== BẮT ĐẦU TÀI LIỆU NGỮ CẢNH SCONNECT ===
${sconnectContext}
=== KẾT THÚC TÀI LIỆU NGỮ CẢNH SCONNECT ===

Dựa trên đơn vị "${unitCode}", hãy đưa ra các đề xuất phù hợp:
- Nếu đơn vị là "TCT" (Tổng công ty): Tập trung vào quản trị hệ thống, tối ưu hóa dòng tiền, gia tăng hiệu suất vận hành toàn tập đoàn, và nhân rộng hệ điều hành AIVA.
- Nếu đơn vị là "SCVN" (Sconnect Việt Nam): Tập trung vào tăng trưởng hiệu quả sản xuất kinh doanh các dòng phim Wolfoo (tăng tỷ lệ tái sử dụng assets 3D để giảm chi phí dựng thô), sản xuất và kinh doanh nhạc (phân phối đa nền tảng), các dự án phát sinh thương mại phái sinh thương hiệu, thúc đẩy năng lực sáng tạo AI cho nhân sự.

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
        const actionsText = (kr.actions || []).map((act: any) => `- Action: ${act.title}, Tiến độ: ${act.progress}%, Trạng thái: ${act.status}, PIC: ${act.pic}`).join("\n  ");
        return `- KR: ${kr.title}, Tiến độ: ${kr.progress}%, PIC: ${kr.pic}\n  Hành động con:\n  ${actionsText}`;
      }).join("\n");

      const prompt = `
Bạn là Trợ lý AI Đánh giá Mục tiêu (Assessor) tại Sconnect.
Nhiệm vụ của bạn là phân tích tiến độ thực tế của Mục tiêu chiến lược (Objective) sau đây của đơn vị "${unitCode}" để đưa ra nhận định sâu sắc, chỉ rõ rủi ro và các đề xuất hành động thực tế nhằm tháo gỡ khó khăn, bám sát các tài liệu chiến lược Sconnect 2026.

Dưới đây là tài liệu ngữ cảnh chiến lược cốt lõi của Sconnect (bao gồm định hướng sản phẩm, bài học khủng hoảng, mục tiêu scaling hiệu quả năm 2026):
=== BẮT ĐẦU TÀI LIỆU NGỮ CẢNH SCONNECT ===
${sconnectContext}
=== KẾT THÚC TÀI LIỆU NGỮ CẢNH SCONNECT ===

MỤC TIÊU CẦN ĐÁNH GIÁ:
- Tên Objective: "${objectiveTitle}"
- Tiến độ chung hiện tại: ${objectiveProgress}%

CHI TIẾT CÁC KEY RESULTS & ACTIONS:
${krText}

YÊU CẦU PHÂN TÍCH:
1. Đánh giá tổng quan xem tiến độ đạt được đã bám sát kế hoạch chưa (đặc biệt lưu ý các chỉ tiêu về tối ưu chi phí, nâng cao năng suất, thúc đẩy chất lượng sản xuất tại Sconnect).
2. Chỉ ra cụ thể những kết quả then chốt (KRs) hoặc hành động (Actions) nào đang bị chậm trễ hoặc có nguy cơ cao dưới 75%.
3. Đề xuất phương án xử lý thực tế, chi tiết và sắc sảo (khuyến khích việc ứng dụng hệ điều hành AIVA, công cụ AI hoặc tối ưu quy trình sản xuất theo mô hình tinh gọn, tối giản nhân sự của Sconnect).

ĐỊNH DẠNG ĐẦU RA:
Trả về phản hồi dạng TEXT (có thể sử dụng markdown như in đậm **, danh sách * để định dạng đẹp mắt). Bắt đầu bằng dòng "**AI Agent nhận định:**" và phân tích rõ ràng, trực diện, không rườm rà.
`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text().trim();
      return NextResponse.json({ assessment: responseText });
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
