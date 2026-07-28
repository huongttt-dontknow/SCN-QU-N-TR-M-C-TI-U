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
        title: "O1: Tối ưu hóa chi phí vận hành hệ thống sản xuất và nâng tỷ lệ tái sử dụng assets Wolfoo 3D",
        weight: 35,
        keyResults: [
          {
            title: "KR1: Tái sử dụng trên 60% assets (background, nhân vật, đạo cụ) trong sản xuất phim mới",
            priority: "High",
            pic: "Nguyễn Văn A",
            actions: [
              { title: "Chuẩn hóa và gắn tag siêu dữ liệu cho 500 assets dùng chung", pic: "Trần Thị B" },
              { title: "Tổ chức kiểm định chất lượng asset hàng tuần trước khi up lên kho dùng chung", pic: "Phạm Văn C" }
            ]
          },
          {
            title: "KR2: Giảm hao phí render lỗi xuống dưới 5% tổng thời gian kết xuất sản phẩm",
            priority: "High",
            pic: "Lê Văn D",
            actions: [
              { title: "Cài đặt plugin tự động check lỗi mesh và vật liệu cho render farm", pic: "Lê Văn D" }
            ]
          }
        ]
      },
      {
        title: "O2: Tăng cường sản xuất nhạc số Wolfoo và thương mại hóa phái sinh thương hiệu",
        weight: 35,
        keyResults: [
          {
            title: "KR1: Tăng trưởng doanh thu nhạc số Wolfoo thêm 20% trên YouTube Music và Spotify",
            priority: "Medium",
            pic: "Nguyễn Văn A",
            actions: [
              { title: "Phát hành album nhạc Wolfoo Remix trên 5 nền tảng quốc tế lớn", pic: "Trần Thị B" }
            ]
          }
        ]
      }
    ];
  } else {
    return [
      {
        title: "O1: Quản trị dòng tiền tối ưu và số hóa quy trình vận hành toàn tổng công ty",
        weight: 40,
        keyResults: [
          {
            title: "KR1: Tiết giảm 15% chi phí hành chính và quản lý thông qua ứng dụng hệ điều hành e-office",
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

  return `**AI Agent nhận định:**

1. **Đánh giá tổng quan**:
   * Mục tiêu *"${objectiveTitle}"* của đơn vị **${unitCode}** hiện đạt tiến độ chung là **${objectiveProgress}%**.
   * Nhìn chung, tiến độ này phản ánh đúng nhịp độ hoạt động thực tế của đơn vị. Tuy nhiên, để hoàn thành kế hoạch cuối năm, tốc độ hoàn thành cần được gia tốc hơn nữa ở các Actions bổ trợ.

2. **Phân tích rủi ro & Điểm nghẽn**:
   * ${delayWarning}
   * Rủi ro về nguồn lực triển khai có thể bị phân tán nếu không xác định rõ mức độ ưu tiên giữa các đầu việc.

3. **Đề xuất hành động thực tế**:
   * **Số hóa & Tự động hóa**: Đẩy mạnh ứng dụng hệ điều hành AIVA trong khâu gắn thẻ metadata assets và kiểm tra mesh/vật liệu tự động để tối ưu công suất render farm.
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
