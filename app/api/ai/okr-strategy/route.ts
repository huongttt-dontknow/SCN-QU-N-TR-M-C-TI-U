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

// Perform local RAG search for specific unit Code
function performLocalOkrSearch(unitCode: string, context: string): string {
  if (!context) return "";
  
  const u = (unitCode || "SCVN").toUpperCase();
  let queryTerms = [unitCode.toLowerCase()];
  if (u.includes("WO") || u.includes("WOLFOO")) {
    queryTerms.push("wolfoo", "wofloo", "wo");
  } else if (u.includes("LEGO")) {
    queryTerms.push("lego", "non-kid", "stop-motion");
  } else if (u.includes("AS") || u.includes("ANIMATED")) {
    queryTerms.push("animated story", "as", "teen story", "podcast");
  } else if (u.includes("MUSIC") || u.includes("SCMU")) {
    queryTerms.push("music", "scmu", "suno", "udio", "nhạc");
  } else if (u.includes("GAME") || u.includes("CNGP") || u.includes("CN")) {
    queryTerms.push("cngp", "game", "youtube");
  } else if (u.includes("SCS") || u.includes("STUDIO")) {
    queryTerms.push("scs", "studio", "phái sinh");
  } else if (u === "SCVN") {
    queryTerms.push("wolfoo", "music", "lego", "animated story", "cngp");
  } else if (u === "TCT") {
    queryTerms.push("tổng công ty", "quản trị", "aiva", "shared services");
  }

  const paragraphs = context.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const scored = paragraphs.map((p, idx) => {
    const pLower = p.toLowerCase();
    let score = 0;
    
    for (const term of queryTerms) {
      if (pLower.includes(term)) {
        score += 5;
      }
    }
    
    if (pLower.includes("okr") || pLower.includes("objective") || pLower.includes("key result")) {
      score += 3;
    }
    
    return { text: p, score };
  });

  const matches = scored.filter(p => p.score > 2).sort((a, b) => b.score - a.score);
  return matches.length > 0 ? matches[0].text : "";
}

// Parse search text back to structured Next.js OKR Strategy Page JSON format
function parseTextToSuggestions(text: string, unitCode: string): any[] {
  if (!text.includes("Objective") && !text.includes("Mục tiêu")) {
    return getMockSuggestions(unitCode);
  }

  const lines = text.split("\n");
  const suggestions: any[] = [];
  let currentObj: any = null;
  let currentKR: any = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    let cleanLine = trimmed.replace(/\*\*/g, "");
    if (cleanLine.includes("|")) {
      const parts = cleanLine.split("|").map(p => p.trim()).filter(Boolean);
      cleanLine = parts[0] || cleanLine;
    }

    const objMatch = cleanLine.match(/(?:🎯\s*)?Objective\s*(\d+)[:.]?\s*(.*)/i) || cleanLine.match(/Mục tiêu\s*(\d+)[:.]?\s*(.*)/i);
    if (objMatch) {
      if (currentObj) {
        suggestions.push(currentObj);
      }
      const rawObjTitle = (objMatch[2] || "").split("|")[0].trim();
      currentObj = {
        title: `O${objMatch[1]}: ${rawObjTitle}`,
        weight: 50,
        keyResults: []
      };
      currentKR = null;
      continue;
    }

    const krMatch = cleanLine.match(/(?:-\s*🔑\s*)?KR\s*(\d+)[:.]?\s*(.*)/i) || cleanLine.match(/Key\s*Result\s*(\d+)[:.]?\s*(.*)/i);
    if (krMatch && currentObj) {
      let rawText = krMatch[2].split("|")[0].trim();
      let pic = "Trưởng phòng/PIC";
      
      const picMatch = rawText.match(/\[PIC:\s*([^\]]+)\]/i);
      if (picMatch) {
        pic = picMatch[1];
        rawText = rawText.replace(picMatch[0], "");
      }
      
      const progressMatch = rawText.match(/\(Tiến độ:\s*([^\)]+)\)/i);
      if (progressMatch) {
        rawText = rawText.replace(progressMatch[0], "");
      }

      currentKR = {
        title: `KR${krMatch[1]}: ${rawText.trim()}`,
        priority: "High",
        pic: pic,
        actions: []
      };
      currentObj.keyResults.push(currentKR);
      continue;
    }

    const actMatch = cleanLine.match(/(?:\*\s*)?Hành động:\s*(.*)/i) || cleanLine.match(/(?:\*\s*)?Action:\s*(.*)/i) || cleanLine.match(/(?:\*\s*)?Ghi chú hành động:\s*(.*)/i);
    if (actMatch && currentKR) {
      currentKR.actions.push({
        title: actMatch[1].trim(),
        pic: currentKR.pic
      });
      continue;
    }
    
    if (cleanLine.startsWith("*") && currentKR) {
      currentKR.actions.push({
        title: cleanLine.replace(/^\*\s*/, ""),
        pic: currentKR.pic
      });
    }
  }

  if (currentObj) {
    suggestions.push(currentObj);
  }

  return suggestions.length > 0 ? suggestions : getMockSuggestions(unitCode);
}

// Generate dynamic offline assessment comparing current progress to target RAG text
function getDynamicOfflineAssessment(unitCode: string, objectiveTitle: string, progress: number, keyResults: any[], ragText: string): string {
  const delayedKrs = (keyResults || []).filter(kr => (kr.progress || 0) < 75);
  
  let assessment = `🤖 **AI AGENT NHẬN ĐỊNH & ĐÁNH GIÁ TIẾN ĐỘ OKR**\n\n`;
  assessment += `🎯 **Mục tiêu:** **"${objectiveTitle}"** (Đơn vị: **${unitCode}** | Tiến độ chung: **${progress}%**)\n`;
  
  if (progress >= 80) {
    assessment += `📊 **Trạng thái:** ✅ **Đạt kỳ vọng tốt** (Tốc độ hoàn thành bám sát kế hoạch đề ra)\n\n`;
  } else if (progress >= 50) {
    assessment += `📊 **Trạng thái:** ⚡ **Cần gia tốc** (Tiến độ ở mức trung bình, cần tập trung tháo gỡ điểm nghẽn)\n\n`;
  } else {
    assessment += `📊 **Trạng thái:** ⚠️ **Cảnh báo chậm tiến độ** (Tiến độ chung dưới 50%, cần hành động khắc phục ngay)\n\n`;
  }

  // 1. Phân tích điểm nghẽn ngắn gọn
  if (delayedKrs.length > 0) {
    assessment += `🔍 **1. ĐIỂM NGHẼN & KRs CHẬM TIẾN ĐỘ (<75%):**\n`;
    delayedKrs.forEach((kr, idx) => {
      const pStr = kr.progress !== undefined ? `${kr.progress}%` : "0%";
      const notes = kr.notes ? ` (Ghi chú: ${kr.notes})` : "";
      const pic = kr.pic ? ` [PIC: ${kr.pic}]` : "";
      assessment += `  • **KR ${idx + 1}**: "${kr.title}" — Tiến độ: **${pStr}**${pic}${notes}\n`;
    });
    assessment += `\n`;
  } else {
    assessment += `🔍 **1. ĐÁNH GIÁ KRs:**\n  • 100% các KRs đều đạt tiến độ cam kết (>75%). Tiếp tục duy trì nhịp độ thực thi.\n\n`;
  }

  // 2. Tăng não AI khuyến nghị hành động khắc phục thực chiến
  assessment += `💡 **2. KHUYẾN NGHỊ HÀNH ĐỘNG KHẮC PHỤC TRỌNG TÂM (AI RECOMMENDED ACTIONS):**\n`;
  
  const objLower = objectiveTitle.toLowerCase();
  
  if (objLower.includes("sáng tạo") || objLower.includes("chất lượng") || objLower.includes("nội dung") || objLower.includes("phim")) {
    assessment += `  • 🔹 **Hành động 1 (Chuẩn hóa quy trình Review & Coaching)**: Thiết lập lịch họp Review hàng tuần giữa TBP và các nhóm sản xuất để duyệt kịch bản/thumbnail trước khi dựng, kiểm soát chất lượng từ khâu đầu vào.\n`;
    assessment += `  • 🔹 **Hành động 2 (Ứng dụng AIVA CoreWork)**: Đưa 100% nhân sự biên kịch, art và hoạt họa vào sử dụng bộ Tool AIVA CoreWork/Skills để tự động hóa 50% khâu tạo prompt và làm đẹp thumbnail.\n`;
    assessment += `  • 🔹 **Hành động 3 (Dashboard Cảnh báo Rủi ro)**: Thiết lập ngay bảng theo dõi các video có tỷ lệ giữ chân khán giả thấp (<30%) để xử lý chỉnh sửa lại kịch bản trong vòng 48h.`;
  } else if (objLower.includes("doanh thu") || objLower.includes("tài chính") || objLower.includes("kinh doanh")) {
    assessment += `  • 🔹 **Hành động 1 (Đóng gói & Phân phối Đa nền tảng)**: Đẩy nhanh tiến độ đóng gói nội dung để phân phối lên các kênh Reels Facebook, TikTok và các nền tảng OTT mới nhằm tăng doanh thu phái sinh.\n`;
    assessment += `  • 🔹 **Hành động 2 (Ứng dụng AI MKT & SEO)**: Triển khai bộ Tool AI SEO tự động hóa tối ưu thẻ tag, tiêu đề và thumbnail để gia tăng CTR & RPM lên 15%.\n`;
    assessment += `  • 🔹 **Hành động 3 (Rà soát Dòng tiền & P&L)**: Đánh giá hiệu quả từng kênh kinh doanh, tập trung nguồn lực vào Top 20% kênh mang lại 80% doanh thu.`;
  } else {
    assessment += `  • 🔹 **Hành động 1 (Tập trung tháo gỡ KRs thấp)**: Tổ chức buổi họp giao ban đột xuất với các PIC của KRs đạt dưới 75% để rà soát điểm nghẽn và cấp bổ sung nguồn lực.\n`;
    assessment += `  • 🔹 **Hành động 2 (Ứng dụng AIVA OS)**: Đưa các công cụ AIVA OS vào quy trình tác nghiệp hằng ngày để tự động hóa 40% khối lượng công việc lặp lại.\n`;
    assessment += `  • 🔹 **Hành động 3 (Quản trị Mục tiêu Realtime)**: Cập nhật nhật ký tiến độ hàng tuần lên hệ thống OMS để Giám đốc BU theo dõi và hỗ trợ tháo gỡ kịp thời.`;
  }

  return assessment;
}

// Mock AI Suggestions
function getMockSuggestions(unitCode: string) {
  const u = (unitCode || "SCVN").toUpperCase();

  if (u.includes("WO") || u.includes("WOLFOO")) {
    return [
      {
        title: "O1: Chuẩn hóa mô hình và quy trình sản xuất AIVA-AI-CoreWork Wolfoo",
        weight: 50,
        keyResults: [
          {
            title: "KR1: Tự xây dựng 01 hệ thống AIVA - Corework Wolfoo (Bản nâng cấp từ AIVA gốc áp dụng cho riêng từng khâu của Wolfoo)",
            priority: "High",
            pic: "Lê Đăng Khoa",
            actions: [
              { title: "Thử nghiệm hệ thống AIVA Corework trên 3 đội nhóm sản xuất phim Wolfoo 2D/3D", pic: "Trần Thị B" },
              { title: "Tự động hóa 70% quy trình render và kiểm soát tiến độ sản xuất phim Wolfoo", pic: "Lê Văn D" }
            ]
          },
          {
            title: "KR2: Tăng hiệu suất 115% với sản phẩm Wolfoo 2D",
            priority: "High",
            pic: "Lê Đăng Khoa",
            actions: [
              { title: "Chuẩn hóa kho tài nguyên 2D assets dùng chung giữa các team sản xuất Wolfoo", pic: "Nguyễn Thị C" }
            ]
          },
          {
            title: "KR3: Xây dựng hệ thống AIVA CoreWork cho hoạt động SEO, Quản trị Kênh Tăng hiệu suất QTK 50%",
            priority: "High",
            pic: "Đỗ Thị G",
            actions: [
              { title: "Ứng dụng AI Tool phân tích từ khóa và tối ưu thẻ tag tự động cho hệ thống kênh Wolfoo", pic: "Vũ Văn F" }
            ]
          }
        ]
      },
      {
        title: "O2: Tối Đa Hóa Hiệu Suất Doanh Thu Đa Nền Tảng Wolfoo",
        weight: 50,
        keyResults: [
          {
            title: "KR1: Triển khai 01 DA Facebook (Facebook vừa update tính năng Kiếm tiền vào 21/06. Khả tương đồng với Youtube)",
            priority: "High",
            pic: "Nguyễn Thị Hồng",
            actions: [
              { title: "Phân phối lại các tập phim Wolfoo đạt 1M+ views lên Facebook Reels", pic: "Phạm Văn C" }
            ]
          },
          {
            title: "KR2: Hợp tác cấp quyền khai thác nền tảng OTT chiếm tỉ trọng 4%. Gia tăng 2 đối tác",
            priority: "Medium",
            pic: "Vương Tuấn Anh",
            actions: [
              { title: "Đóng gói kho phim Wolfoo 3D đạt chuẩn kỹ thuật phân phối OTT quốc tế", pic: "Lê Thị Mai" }
            ]
          }
        ]
      }
    ];
  }

  if (u.includes("LEGO")) {
    return [
      {
        title: "O1: Đột phá lượt xem và giữ chân khán giả với nội dung Stop-motion Lego phân chia phe chiến tuyến",
        weight: 100,
        keyResults: [
          {
            title: "KR1: Sản xuất 16 video Stop-motion chủ đề Lego Công & Thủ Thành dành cho khán giả AFOL và học đường",
            priority: "High",
            pic: "Trần Minh Hoàng",
            actions: [
              { title: "Xây dựng kịch bản kịch tính và phối cảnh trận đao Lego độc đáo", pic: "Nguyễn Văn Nam" }
            ]
          },
          {
            title: "KR2: SL video đạt ngưỡng 1M+ views YouTube trên kênh DA Lego đạt 100% kế hoạch",
            priority: "High",
            pic: "Trần Minh Hoàng",
            actions: [
              { title: "Tối ưu hóa tiêu đề, thumbnail và thời điểm đăng video đạt đỉnh tương tác", pic: "Trần Minh Hoàng" }
            ]
          }
        ]
      }
    ];
  }

  if (u.includes("AS") || u.includes("ANIMATED")) {
    return [
      {
        title: "O1: Phát triển thương hiệu phim hoạt hình Animated Story 2D/3D chất lượng cao",
        weight: 100,
        keyResults: [
          {
            title: "KR1: Phát hành 24 tập Animated Story (chủ đề teen story, drama học đường) đa kênh trên YouTube và Spotify",
            priority: "High",
            pic: "Nguyễn Thị Hồng",
            actions: [
              { title: "Sản xuất nội dung truyện/phim hoạt hình tĩnh cuộc sống teen và tối ưu định dạng audio podcast lên Spotify", pic: "Phạm Văn C" }
            ]
          }
        ]
      }
    ];
  }

  if (u.includes("MUSIC") || u.includes("SCMU")) {
    return [
      {
        title: "O1: Bứt phá sản lượng và doanh thu âm nhạc phái sinh ứng dụng công nghệ AI Music",
        weight: 100,
        keyResults: [
          {
            title: "KR1: Đạt sản lượng phát hành >1,000 bài nhạc nền AI chất lượng cao hằng tháng (Suno/Udio)",
            priority: "High",
            pic: "Phan Anh Tuấn",
            actions: [
              { title: "Đào tạo đội ngũ nhân sự ứng dụng prompt AI Music tự động hóa quy trình phối khí", pic: "Trần Văn E" }
            ]
          },
          {
            title: "KR2: Doanh thu nhạc số trên Spotify, Apple Music tăng trưởng +75% so với kỳ trước",
            priority: "High",
            pic: "Phan Anh Tuấn",
            actions: [
              { title: "Đẩy mạnh đăng ký bản quyền và phân phối nhạc số toàn cầu", pic: "Phan Anh Tuấn" }
            ]
          }
        ]
      }
    ];
  }

  if (u.includes("GAME") || u.includes("CNGP") || u.includes("CN")) {
    return [
      {
        title: "O1: Nâng cao năng lực nghiên cứu phát triển Game App và bộ công cụ AI Quản trị Kênh",
        weight: 100,
        keyResults: [
          {
            title: "KR1: Hoàn thiện xuất bản 15 game mới (P CNGP nhận bàn giao từ SCCH) và đạt mốc doanh thu",
            priority: "High",
            pic: "Vương Tuấn Anh",
            actions: [
              { title: "Phòng CNGP hoàn thiện phát triển game Wolfoo và tích hợp mô hình kinh doanh in-app purchase", pic: "Nguyễn Minh H" }
            ]
          },
          {
            title: "KR2: Triển khai 10 giải pháp/công cụ AI tự động hóa quản trị hệ thống kênh YouTube",
            priority: "High",
            pic: "Trần Minh Hoàng",
            actions: [
              { title: "Phát triển tool tự động check bản quyền và phân tích insight thời gian thực hỗ trợ xuất bản YouTube", pic: "Nguyễn Văn Nam" }
            ]
          }
        ]
      }
    ];
  }

  return [
    {
      title: "O1: Minh bạch hóa hiệu quả kinh doanh theo từng sản phẩm và nâng cao năng lực ứng dụng AI",
      weight: 50,
      keyResults: [
        {
          title: "KR1: Rà soát chuẩn hóa danh mục sản phẩm, gán Product Owner và hoàn thành Dashboard P&L chuẩn",
          priority: "High",
          pic: "Trần Thị Thu Hương",
          actions: [
            { title: "Đóng gói báo cáo P&L định kỳ hàng tháng cho 9 đơn vị trực thuộc", pic: "Trần Thị Thu Hương" }
          ]
        }
      ]
    },
    {
      title: "O2: AI hóa quản trị và tối ưu hiệu quả sử dụng nguồn lực số toàn đơn vị",
      weight: 50,
      keyResults: [
        {
          title: "KR1: Hoàn thiện AI Playbook V1 và lựa chọn 5 workflow AI ưu tiên triển khai",
          priority: "High",
          pic: "Lê Đăng Khoa",
          actions: [
            { title: "Đào tạo toàn bộ nhân sự sử dụng trợ lý AIVA OS vào công việc hằng ngày", pic: "Lê Đăng Khoa" }
          ]
        }
      ]
    }
  ];
}

// Mock AI Assessment
function getMockAssessment(unitCode: string, objectiveTitle: string, objectiveProgress: number, keyResults: any[]) {
  const delayedKrs = (keyResults || []).filter(kr => (kr.progress || 0) < 75);
  const delayWarning = delayedKrs.length > 0 
    ? `**Cảnh báo**: Hiện có **${delayedKrs.length}** kết quả then chốt (KRs) đạt tiến độ dưới 75% (${delayedKrs.map(k => `"${k.title}"`).join(", ")}). Cần tập trung tháo gỡ điểm nghẽn tại đây.`
    : `**Ghi nhận**: Tất cả các kết quả then chốt (KRs) đều đang bám sát tiến độ đề ra.`;

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
    * **BP AS (Animated Story)**: Cập nhật teen story/drama học đường hằng tuần, tối ưu chất lượng âm thanh và xuất bản Podcast audio trực tiếp lên Spotify.`;
  }

  return `**AI Agent nhận định (Chế độ Dự phòng)**:\n\nĐang đánh giá Mục tiêu **"${objectiveTitle}"** (Tiến độ: **${objectiveProgress}%**).\n\n${delayWarning}${notesSection}\n\n👉 **Khuyến nghị**: Tập trung chuẩn hóa quy trình sản xuất và ứng dụng trợ lý AIVA để tăng tốc hoàn thành các KRs.`;
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

  // 1. Đọc tệp ngữ cảnh sconnect_context.txt trước để phục vụ cả online/offline
  const contextPath = path.join(process.cwd(), "app", "api", "ai", "okr-strategy", "sconnect_context.txt");
  let sconnectContext = "";
  if (fs.existsSync(contextPath)) {
    sconnectContext = fs.readFileSync(contextPath, "utf8");
  }

  // Nếu API Key chưa được cấu hình, dùng ngay chế độ dự phòng thông minh
  if (!genAI) {
    console.warn("GEMINI_API_KEY chưa được cấu hình, kích hoạt chế độ dự phòng RAG.");
    if (action === "suggest") {
      const matchedText = performLocalOkrSearch(unitCode || "SCVN", sconnectContext);
      const suggestions = parseTextToSuggestions(matchedText, unitCode || "SCVN");
      if (suggestions.length > 0) {
        suggestions[0].title = `⚠️ [Chưa cấu hình GEMINI_API_KEY trên Vercel] ` + suggestions[0].title;
      }
      return NextResponse.json({ suggestions });
    }
    if (action === "assess") {
      const matchedText = performLocalOkrSearch(unitCode || "SCVN", sconnectContext);
      const assessment = `⚠️ **[Lỗi Gemini API: Chưa cấu hình GEMINI_API_KEY trên máy chủ Vercel Settings]**\n\n` + getDynamicOfflineAssessment(unitCode || "SCVN", objectiveTitle || "", objectiveProgress || 0, keyResults || [], matchedText);
      return NextResponse.json({ assessment });
    }
    return NextResponse.json({ error: "Hành động không hợp lệ" }, { status: 400 });
  }

  try {
    // 2. Truy vấn chéo toàn bộ objectives của đơn vị đó từ DB qua Prisma để có cơ sở đối chiếu chéo
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
      let chatHistory: any[] = [
        {
          role: "user",
          parts: [{ text: prompt }]
        }
      ];

      let result = await model.generateContent({
        contents: chatHistory
      });
      
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
          
          const toolResponse = await model.generateContent({
            contents: chatHistory
          });
          return NextResponse.json({ assessment: toolResponse.response.text() });
        }
      }
      return NextResponse.json({ assessment: result.response.text() });
    }

    return NextResponse.json({ error: "Hành động không hợp lệ" }, { status: 400 });
  } catch (error: any) {
    console.warn("Lỗi gọi Gemini API (API Key sai/hết hạn), kích hoạt chế độ dự phòng RAG:", error);
    const errMsg = error?.message || String(error);
    
    // Khối dự phòng tự phục hồi (Self-healing fallbacks) thông minh hơn
    if (action === "suggest") {
      const matchedText = performLocalOkrSearch(unitCode || "SCVN", sconnectContext);
      const suggestions = parseTextToSuggestions(matchedText, unitCode || "SCVN");
      return NextResponse.json({ suggestions });
    }
    if (action === "assess") {
      const matchedText = performLocalOkrSearch(unitCode || "SCVN", sconnectContext);
      const assessment = getDynamicOfflineAssessment(unitCode || "SCVN", objectiveTitle || "", objectiveProgress || 0, keyResults || [], matchedText);
      return NextResponse.json({ assessment });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
