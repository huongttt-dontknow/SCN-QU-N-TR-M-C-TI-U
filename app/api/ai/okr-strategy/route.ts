import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// POST /api/ai/okr-strategy - Phân tích, đánh giá và lập kế hoạch OKR theo chiến lược Sconnect
export async function POST(request: Request) {
  try {
    const { action, unitCode, objectiveTitle, objectiveProgress, keyResults } = await request.json();

    if (!genAI) {
      return NextResponse.json({
        error: "GEMINI_API_KEY chưa được cấu hình. Vui lòng thêm GEMINI_API_KEY vào file .env và khởi động lại server."
      }, { status: 400 });
    }

    // Tải ngữ cảnh chiến lược Sconnect 2025-2030 (được biên dịch sẵn trong thư mục API)
    const contextPath = path.join(process.cwd(), "app", "api", "ai", "okr-strategy", "sconnect_context.txt");
    let sconnectContext = "";
    if (fs.existsSync(contextPath)) {
      sconnectContext = fs.readFileSync(contextPath, "utf8");
    } else {
      console.warn("Sconnect context file not found at:", contextPath);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
      "weight": 50, // Trọng số (%) đề xuất
      "keyResults": [
        {
          "title": "Tên Key Result đề xuất (Ví dụ: KR1: Đạt tỷ lệ tái sử dụng assets Wolfoo 3D tối thiểu 60%)",
          "priority": "High", // "High" hoặc "Medium" hoặc "Low"
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
    console.error("AI Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
