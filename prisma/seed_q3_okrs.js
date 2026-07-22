const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const okrData = {
  "Wofloo": {
    "Q3": [
      {
        "title": "Objective 1: Chuẩn hóa mô hình và quy trình sản xuất AIVA-AI-CoreWork",
        "weight": 25.0,
        "keyResults": [
          {
            "title": "Key Result 1: Tự xây dựng 01 hệ thống AIVA - Corework Wolfoo ( Bản nâng cấp từ AIVA gốc áp dụng cho riêng biệt từng khâu của Wolfoo ) Cá nhân hóa từng dự án để hiệu quả nhất",
            "weight": 33.3,
            "pic": "Lê Đăng Khoa"
          },
          {
            "title": "Key Result 2: Tăng hiệu suất 115% với sản phẩm 2D",
            "weight": 33.3,
            "pic": "Lê Đăng Khoa"
          },
          {
            "title": "Key Result 3: Xây dựng hệ thống AIVA CoreWork cho hoạt động SEO, Quản trị Kênh Tăng hiệu suất QTK 50%",
            "weight": 33.3,
            "pic": "Lê Đăng Khoa"
          }
        ]
      },
      {
        "title": "Objective 2: Tối Đa Hóa Hiệu Suất Doanh Thu Đa Nền Tảng",
        "weight": 25.0,
        "keyResults": [
          {
            "title": "Key Result 1: Triển khai 01 DA FaceBook ( Facebook vừa update tính năng Kiếm tiền vào 21/06. Khá tương đồng với Youtube )",
            "weight": 33.3,
            "pic": "Lê Đăng Khoa"
          },
          {
            "title": "Key Result 2: Hợp tác cấp quyền khai thác nền tảng OTT chiếm tỉ trọng 4%. Gia tăng 2 đối tác",
            "weight": 33.3,
            "pic": "Lê Đăng Khoa"
          },
          {
            "title": "Key Result 3: Tiếp tục Mở rộng hệ thống kinh doanh theo 2 hướng. Mở rộng dạng Nội dung sản xuất mới, mở rộng cách thức khai thác nội dung mới cho kho nội dung Tăng trưởng Doanh thu từ tổng các dòng Nội dung 50%",
            "weight": 33.3,
            "pic": "Lê Đăng Khoa"
          }
        ]
      },
      {
        "title": "Objective 3: Xây dựng và nâng cao hiệu quả dự án từ dữ liệu phái sinh",
        "weight": 25.0,
        "keyResults": [
          {
            "title": "Key Result 1: Sản xuất nội dung KidSong 2D Nhân vật mới 500 ND ( Tiếng Anh, Tiếng Việt , Tây Ban Nha )",
            "weight": 50.0,
            "pic": "Lê Đăng Khoa"
          },
          {
            "title": "Key Result 2: Sản xuất nội dung phái sinh Stories 2D kết hợp Nhân vật mới. Gia tăng DT thương hiệu 30%. Tăng tiềm năng mở rộng hệ sinh thái Wolfoo và những người bạn",
            "weight": 50.0,
            "pic": "Lê Đăng Khoa"
          }
        ]
      },
      {
        "title": "Objective 4: Phát triển năng lực nhân sự",
        "weight": 25.0,
        "keyResults": [
          {
            "title": "Key Result 1: 100% nhân sự áp dụng được AI Agent vào công việc 1 cách hiệu quả",
            "weight": 100.0,
            "pic": "Lê Đăng Khoa"
          }
        ]
      }
    ],
    "M7": []
  },
  "AS": {
    "Q3": [
      {
        "title": "Objective 1: Nâng cấp toàn diện năng lực sáng tạo và siết chặt cơ chế kiểm soát chất lượng nội dung",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: Ban hành \"Bộ công thức sáng tạo & Chuẩn ứng dụng AI\" cho khâu biên kịch, 100% nội dung sáng tạo dựa trên vấn đề / nỗi đau tuổi teen, làm nổi bật GTCL trong cách thể hiện",
            "weight": 25.0,
            "pic": "Trịnh Quốc Thịnh"
          },
          {
            "title": "KR2: Thiết lập và vận hành chuẩn cơ chế Review - Coaching cho nhân sự, 100% sản phẩm được review và đưa ra định hướng sáng tạo thông qua bộ lọc của Quản lý trước khi NS tiếp nhận thực thi",
            "weight": 25.0,
            "pic": "Trịnh Quốc Thịnh"
          },
          {
            "title": "KR3: Thiết kế hệ thống Dashboard cảnh báo sớm các rủi ro chất lượng nội dung và thumbnail và đề xuất phương án xử lý sớm. Thời gian phát hiện rủi ro nội dung chất lượng thấp và phương án khắc phục tối đa 3 ngày",
            "weight": 25.0,
            "pic": "Trịnh Quốc Thịnh"
          },
          {
            "title": "KR4: Thử nghiệm và triển khai thành công ít nhất 02 chủ đề mới đạt hiệu quả traffic cao, traffic trung bình 30 ngày đạt 150k view",
            "weight": 25.0,
            "pic": "Trịnh Quốc Thịnh"
          }
        ]
      },
      {
        "title": "Objective 2: Minh bạch hóa hiệu quả kinh doanh và sử dụng nguồn lực",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: Xây dựng và áp dụng thành công Bảng định mức tài nguyên trên 100% nội dung",
            "weight": 33.3,
            "pic": "Trịnh Quốc Thịnh"
          },
          {
            "title": "KR2: Phân bổ và tối ưu hóa năng suất, nâng tỷ trọng đóng góp sản lượng nhân sự Fulltime lên mức >= 50%",
            "weight": 33.3,
            "pic": "Trịnh Quốc Thịnh"
          },
          {
            "title": "KR3: Giảm chi phí sản xuất trung bình 1 video xuống >= 10% so với quý II thông qua tối ưu hiệu suất",
            "weight": 33.3,
            "pic": "Trịnh Quốc Thịnh"
          }
        ]
      },
      {
        "title": "Objective 3: Phân tách nguồn lực, xây dựng hệ thống sản phẩm và doanh thu mới ứng dụng AI",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: Hoàn tất phân tách cơ cấu tổ chức với mô hình 3 nhân sự, đạt hiệu suất 50-60 sản phẩm / quý",
            "weight": 33.3,
            "pic": "Trịnh Quốc Thịnh"
          },
          {
            "title": "KR2: Mở mới hệ thống 2 kênh BKT, tận dụng 1 kênh đang được BKT từ dòng sản phẩm AI cũ để thúc đẩy doanh thu sớm",
            "weight": 33.3,
            "pic": "Trịnh Quốc Thịnh"
          },
          {
            "title": "KR3: Mở hệ thống kênh Spotify khai thác dòng sản phẩm mới, mang lại doanh thu >= $500 sau khi BKT",
            "weight": 33.3,
            "pic": "Trịnh Quốc Thịnh"
          }
        ]
      }
    ],
    "M7": []
  },
  "NDTH": {
    "Q3": [
      {
        "title": "O1: Tăng trưởng doanh thu bền vững từ hệ thống YouTube hiện hữu",
        "weight": 20.0,
        "keyResults": [
          {
            "title": "KR1:Tăng 50% doanh thu toàn hệ thống so với Quý II",
            "weight": 50.0,
            "pic": "Lò Quế Hằng"
          },
          {
            "title": "KR2:Phát triển Sticker-Kids song- TOCA thành nhóm sản phẩm doanh thu chủ lực ( 15k/tháng)",
            "weight": 50.0,
            "pic": "Lò Quế Hằng"
          }
        ]
      },
      {
        "title": "O2:Mở rộng quy mô Spotify",
        "weight": 20.0,
        "keyResults": [
          {
            "title": "KR1:Doanh thu Spotify tăng tối thiểu 200% so với Quý II",
            "weight": 50.0,
            "pic": "Lò Quế Hằng"
          },
          {
            "title": "KR2: Hoàn thiện tối thiểu 3 nhóm chủ đề nhạc có thể khai thác dài hạn doanh thu tối thiểu 500$/ tháng từ tháng 8",
            "weight": 50.0,
            "pic": "Lò Quế Hằng"
          }
        ]
      },
      {
        "title": "O3: Tăng trưởng nhóm Khai thác và mở rộng sản phẩm hiệu quả",
        "weight": 20.0,
        "keyResults": [
          {
            "title": "KR1: Xây dựng tối thiểu 2 hướng khai thác mới từ các SP như TOCA- Unbox.",
            "weight": 50.0,
            "pic": "Lò Quế Hằng"
          },
          {
            "title": "KR2: Ít nhất 1 hướng khai thác mới đạt doanh thu trên 1.000 USD/tháng",
            "weight": 50.0,
            "pic": "Lò Quế Hằng"
          }
        ]
      },
      {
        "title": "O4: Tối ưu hiệu quả kinh doanh và đạt lợi nhuận dương",
        "weight": 20.0,
        "keyResults": [
          {
            "title": "KR1: Đạt lợi nhuận dương từ tháng 8",
            "weight": 50.0,
            "pic": "Lò Quế Hằng"
          },
          {
            "title": "KR2: Giảm tối thiểu 15% chi phí sản xuất",
            "weight": 50.0,
            "pic": "Lò Quế Hằng"
          }
        ]
      },
      {
        "title": "O5: Thiết kế lại mô hình tổ chức",
        "weight": 20.0,
        "keyResults": [
          {
            "title": "KR1: Sáp nhập nhóm để tối ưu mô hình- Tinh gọn tổ chức- giảm chi phí",
            "weight": 100.0,
            "pic": "Lò Quế Hằng"
          }
        ]
      }
    ],
    "M7": []
  },
  "Lego": {
    "Q3": [
      {
        "title": "Objective 1: Tối ưu hóa cấu trúc chi phí và đưa ROI đạt trạng thái dương (Trọng số: 30%)",
        "weight": 20.0,
        "keyResults": [
          {
            "title": "KR1: Đạt chỉ số ROI dương toàn dự án ngay từ tháng 7/2026 và duy trì tăng trưởng dương ổn định trong suốt Quý III",
            "weight": 33.3,
            "pic": "Lê Quỳnh Nga"
          },
          {
            "title": "KR2: Tăng trưởng doanh thu từ nguồn Doanh thu đối tác thêm tối thiểu 25% so với Quý II nhằm bù đắp phần sụt giảm của doanh thu nội bộ",
            "weight": 33.3,
            "pic": "Lê Quỳnh Nga"
          },
          {
            "title": "KR3: Kiểm soát và cắt giảm thêm 15% tổng chi phí vận hành đơn vị thông qua việc thay đổi nhân sự đầu Quý III",
            "weight": 33.3,
            "pic": "Lê Quỳnh Nga"
          }
        ]
      },
      {
        "title": "Objective 2: Tái định vị tệp khách hàng và khai thác tối đa giá trị thương mại kho nội dung Lego (Trọng số: 25%)",
        "weight": 20.0,
        "keyResults": [
          {
            "title": "KR1: Đạt mốc tối đa 20,000,000 views Traffic Lego toàn hệ thống trong Quý III (Đặt mục tiêu thực tế dựa trên đặc thù ngách Lego non-KID)",
            "weight": 33.3,
            "pic": "Lê Quỳnh Nga"
          },
          {
            "title": "KR2: Hợp tác với ít nhất 2 đối tác (MCN/Publisher/Brand) để trực tiếp khai thác, phân phối lại kho nội dung Lego sẵn có",
            "weight": 33.3,
            "pic": "Lê Quỳnh Nga"
          },
          {
            "title": "KR3: Đảm bảo 100% các kênh cũ và mới mở đạt tỷ lệ an toàn chính sách (0 vi phạm, không chết kênh) để bảo toàn lượng traffic nền tảng",
            "weight": 33.3,
            "pic": "Lê Quỳnh Nga"
          }
        ]
      },
      {
        "title": "Objective 3: Chuẩn hóa mô hình và quy trình sản xuất AIVA-AI",
        "weight": 20.0,
        "keyResults": [
          {
            "title": "KR1: Áp dụng quy trình SC & KD theo mô hình AIVA AI xuyên suốt các khâu đối với team AI",
            "weight": 100.0,
            "pic": "Lê Quỳnh Nga"
          }
        ]
      },
      {
        "title": "Objective 4: Tái cấu trúc mô hình sản xuất và chuyển dịch định dạng nội dung mới (Trọng số: 25%)",
        "weight": 20.0,
        "keyResults": [
          {
            "title": "KR1: Hoàn thành việc tách biệt 100% bộ máy thành 2 nhóm độc lập: Team Sản xuất Thường và Team Sản xuất Nội dung AI.",
            "weight": 33.3,
            "pic": "Lê Quỳnh Nga"
          },
          {
            "title": "KR2: Áp dụng cơ chế khoán mới: 100% nhân sự Team AI tự chịu trách nhiệm tối ưu kinh doanh, tối ưu SEO và tự đăng tải sản phẩm lên hệ thống kênh được giao",
            "weight": 33.3,
            "pic": "Lê Quỳnh Nga"
          },
          {
            "title": "KR3: Đóng gói quy trình và sản xuất thành công định dạng nội dung mới: ⁠Lego Công và Thủ Thành (Chia 2 phe chiến tuyến)⁠ thay thế hoàn toàn cho định dạng ⁠Lego Automation⁠ cũ từ ngày 15/07.",
            "weight": 33.3,
            "pic": "Lê Quỳnh Nga"
          }
        ]
      },
      {
        "title": "Objective 5: Phát triển năng lực nhân sự & Ổn định tổ chức và tái hòa nhập nhân sự hậu thai sản (Trọng số: 20%)",
        "weight": 20.0,
        "keyResults": [
          {
            "title": "KR1: 100% nhân sự Quản trị kênh (QTK) quay trở lại làm việc ổn định và tiếp nhận lại hệ thống kênh cốt lõi vào tháng 8.",
            "weight": 50.0,
            "pic": "Lê Quỳnh Nga"
          },
          {
            "title": "KR2: Hoàn thành việc đào tạo chuyển đổi 100% kỹ năng sản xuất bằng AI cho nhân sự Tổ trưởng sản xuất (TTSX) tái hòa nhập vào giữa quý.",
            "weight": 50.0,
            "pic": "Lê Quỳnh Nga"
          }
        ]
      }
    ],
    "M7": []
  },
  "SCS": {
    "Q3": [
      {
        "title": "O1: Nâng cao hiệu quả hệ thống kinh doanh",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: Phát triển hệ thống kênh kinh doanh mới : 5 kênh.",
            "weight": 33.3,
            "pic": "Nguyễn Ánh Tùng"
          },
          {
            "title": "KR2: Số lượng kênh vượt ngưỡng >3k : 5 kênh. Số lượng kênh vượt ngưỡng >5k : 2 Kênh.",
            "weight": 33.3,
            "pic": "Nguyễn Ánh Tùng"
          },
          {
            "title": "KR3: Tối ưu chi phí vận hành : 15% tổng chi phí.",
            "weight": 33.3,
            "pic": "Nguyễn Ánh Tùng"
          }
        ]
      },
      {
        "title": "O2: Hoàn thiện quy hoạch tổ chức dự án sản xuất.",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: Hoàn chỉnh tổ chức triển khai 3 dự án sản xuất : Kids song (2), Trạng Quỳnh.",
            "weight": 50.0,
            "pic": "Nguyễn Ánh Tùng"
          },
          {
            "title": "KR2: Triển khai đào tạo thực thi sản xuất với pipeline sản xuất mới : 100% đồng nhất quy trình triển khai trên core aiva.",
            "weight": 50.0,
            "pic": "Nguyễn Ánh Tùng"
          }
        ]
      },
      {
        "title": "O3: Ứng vận dụng nền tảng công nghệ vào vận hành, sản xuất.",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: 100% nhận sự sản xuất triển khai sản xuất trên coworking aiva.",
            "weight": 100.0,
            "pic": "Nguyễn Ánh Tùng"
          }
        ]
      }
    ],
    "M7": []
  },
  "DA01": {
    "Q3": [
      {
        "title": "O1: Tăng trưởng doanh thu đột phá từ nội dung SCVN và NDAI",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "Key Result 1: Xây dựng và phát triển hệ thống 14 kênh Youtube chiếm 56% DT",
            "weight": 50.0,
            "pic": "Trần Thị Diệu Ly"
          },
          {
            "title": "Key Result 2: Xây dựng và phát triển hệ thống kênh Spotify chiếm 44% doanh thu",
            "weight": 50.0,
            "pic": "Trần Thị Diệu Ly"
          }
        ]
      },
      {
        "title": "O2: Phát triển sản phẩm mới",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "Key Result 1: Phát triển 01 sản phẩm key có ROI >0% sau quý 3",
            "weight": 100.0,
            "pic": "Trần Thị Diệu Ly"
          }
        ]
      },
      {
        "title": "O3: Ứng dụng AI (AIVA) để nâng cao hiệu suất sản xuất và vận hành",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "Key Result 1: 100% nhân sự sử dụng các mô hình AIVA trong sản xuất nội dung AI",
            "weight": 100.0,
            "pic": "Trần Thị Diệu Ly"
          }
        ]
      }
    ],
    "M7": [
      {
        "title": "O1: Tăng trưởng doanh thu đột phá từ nội dung SCVN và ND AI",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "Key Result 1: Xây dựng và phát triển hệ thống 14 kênh Youtube chiếm 56% DT",
            "weight": 50.0,
            "pic": "Trần Thị Diệu Ly"
          },
          {
            "title": "Key Result 2: Xây dựng và phát triển hệ thống kênh Spotify chiếm 44% doanh thu",
            "weight": 50.0,
            "pic": "Trần Thị Diệu Ly"
          }
        ]
      },
      {
        "title": "O2: Phát triển sản phẩm mới",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "Key Result 1: Phát triển 01 sản phẩm key có ROI >0% sau quý 3",
            "weight": 100.0,
            "pic": "Trần Thị Diệu Ly"
          }
        ]
      },
      {
        "title": "O3: Ứng dụng AI (AIVA) để nâng cao hiệu suất sản xuất và vận hành",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "Key Result 1: 100% nhân sự sử dụng các mô hình AIVA trong sản xuất nội dung AI",
            "weight": 100.0,
            "pic": "Trần Thị Diệu Ly"
          }
        ]
      }
    ]
  },
  "CR": {
    "Q3": [
      {
        "title": "O1: Tái cấu trúc mô hình tinh gọn, mở rộng hệ thống kênh và bứt phá doanh thu theo lộ trình",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: Xây dựng, lựa chọn và triển khai đồng loạt tối thiểu 07 đề án kinh doanh mới dựa trên tiêu chí: Top views – Top tương tác – Tiềm năng RPM.",
            "weight": 25.0,
            "pic": "Nguyễn Quang Khánh"
          },
          {
            "title": "KR2: Phát triển hệ thống kênh đạt quy mô 12–14 kênh trong Quý 3, trong đó có tối thiểu 07 kênh bật kiếm tiền thành công (làm tiền đề để tiến tới mốc 8 => 10 kênh lớn trong Q4).",
            "weight": 25.0,
            "pic": "Nguyễn Quang Khánh"
          },
          {
            "title": "KR3: Hoàn thành tái cấu trúc 100% bộ máy AIVA team theo mô hình nhóm dự án tinh gọn 3–5 người",
            "weight": 25.0,
            "pic": "Nguyễn Quang Khánh"
          },
          {
            "title": "KR4: Xây dựng hoàn thiện cơ chế đầu tư và hệ thống kiểm soát tài chính hiệu quả, đưa vào áp dụng trong Quý III.",
            "weight": 25.0,
            "pic": "Nguyễn Quang Khánh"
          }
        ]
      },
      {
        "title": "O2: Bứt tốc hiệu suất sáng tạo nội dung, ứng dụng AI toàn quy trình vào quy trình sản xuất",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: Đạt năng suất sản xuất ổn định từ 170 – 175 nội dung (Short + Story)/tháng toàn SCCH thông qua việc áp dụng quy trình phối hợp AIVA + AI.",
            "weight": 33.3,
            "pic": "Nguyễn Quang Khánh"
          },
          {
            "title": "KR2: Nghiệm thu và đưa vào ứng dụng quy trình hoàn chỉnh tích hợp AI vào 100% các khâu trong chuỗi sản xuất: Biên kịch – Art – Anim (Hoạt họa) – Phát hành.",
            "weight": 33.3,
            "pic": "Nguyễn Quang Khánh"
          },
          {
            "title": "KR3: Hoàn thành đóng gói 01 bộ tài liệu quy trình chuẩn về sản xuất và tối ưu nội dung bằng AI để chuyển giao nội bộ.",
            "weight": 33.3,
            "pic": "Nguyễn Quang Khánh"
          }
        ]
      },
      {
        "title": "O3: Chuyển đổi năng lực sản xuất mới và tối ưu hóa hiệu quả khai thác trên mỗi nhân sự",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: 100% nhân sự sản xuất (hoặc nhóm dự án tinh gọn) chịu trách nhiệm vận hành và tối ưu $/ 1 kênh kinh doanh.",
            "weight": 50.0,
            "pic": "Nguyễn Quang Khánh"
          },
          {
            "title": "KR2: Thiết lập và áp dụng thử nghiệm cơ chế hoạt động khai thác kết hợp chia sẻ doanh thu (Revenue Sharing) để tạo động lực tăng trưởng cho nhân sự.",
            "weight": 50.0,
            "pic": "Nguyễn Quang Khánh"
          }
        ]
      }
    ],
    "M7": [
      {
        "title": "O1: Cấu trúc các team dự án và triển khai đề án kinh doanh AIVA nhằm tối ưu chi phí và mở rộng hiệu quả kinh doanh mới",
        "weight": 100.0,
        "keyResults": [
          {
            "title": "KR1: Sắp xếp và phân bổ nhân sự vào 2 team dự án (DA01 và DA02) thuộc SCCH",
            "weight": 50.0,
            "pic": "Nguyễn Quang Khánh"
          },
          {
            "title": "KR2: Hoàn thiện bộ 5 đề án trọng điểm và hệ thống kênh kinh doanh được triển khai trong tháng",
            "weight": 50.0,
            "pic": "Nguyễn Quang Khánh"
          }
        ]
      }
    ]
  },
  "Music": {
    "Q3": [
      {
        "title": "O1: Tập trung phát triển dự án kinh doanh nội bộ để thúc đẩy doanh thu",
        "weight": 50.0,
        "keyResults": [
          {
            "title": "KR 1: Triển khai xây dựng và đưa vào vận hành 03 dự án kinh doanh nội bộ mới đạt doanh thu 1,5k$ ( Dự án khai thác, dự án mới)",
            "weight": 33.3,
            "pic": "Vũ Trung Đức"
          },
          {
            "title": "KR 2: Doanh thu kênh nội bộ tự khai thác trung bình đạt 3,5k$/tháng",
            "weight": 33.3,
            "pic": "Vũ Trung Đức"
          },
          {
            "title": "KR3: Chốt thành công tối thiểu 2 hợp đồng gia công giá trị cao >50M, có tối thiểu 16KH cấp kho nhạc",
            "weight": 33.3,
            "pic": "Vũ Trung Đức"
          }
        ]
      },
      {
        "title": "O2: Phát triển năng lực đội ngũ, làm chủ nền tảng công nghệ phục vụ vận hành tự chủ",
        "weight": 50.0,
        "keyResults": [
          {
            "title": "KR1: Hoàn thiện các mô hình sản xuất phù hợp với từng dự án của đơn vị",
            "weight": 33.3,
            "pic": "Vũ Trung Đức"
          },
          {
            "title": "KR2: Tiếp nhận và xây dựng hoàn thiện AIVA Publishing cho quản lý hệ thống kênh và kho",
            "weight": 33.3,
            "pic": "Vũ Trung Đức"
          },
          {
            "title": "KR3: Tiếp nhận hệ thống AIVA Entity từ công ty, bước đầu xây dựng được các nhân sự ảo phục vụ cho các công việc của đơn vị (Marketing, QTK ..)",
            "weight": 33.3,
            "pic": "Vũ Trung Đức"
          }
        ]
      }
    ],
    "M7": []
  },
  "CN": {
    "Q3": [
      {
        "title": "O1: Bứt phá năng lực kinh doanh và tối ưu nền tảng hệ thống Game",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: Hoàn thiện toàn vẹn Hệ thống Marketing AI-Native giúp giảm thiểu 70% chi phí MKT",
            "weight": 33.3,
            "pic": "Đào Thanh Công"
          },
          {
            "title": "KR2: Hoàn thiện web game với tổng 100 game trên nền tảng và nâng cấp hệ thống server đảm bảo lượng truy cập lớn",
            "weight": 33.3,
            "pic": "Đào Thanh Công"
          },
          {
            "title": "KR3: Kinh doanh Game với doanh thu đạt 650,000,000 VNĐ",
            "weight": 33.3,
            "pic": "Đào Thanh Công"
          }
        ]
      },
      {
        "title": "O2: Tối ưu hóa hiệu suất khai thác kinh doanh trên nền tảng YouTube",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: Kinh doanh Youtube với doanh thu đạt 390,000,000 VNĐ",
            "weight": 50.0,
            "pic": "Đào Thanh Công"
          },
          {
            "title": "KR2: Hoàn thiện hệ thống kênh Kinh doanh 16 kênh bật kiếm tiền , 20 kênh kinh doanh",
            "weight": 50.0,
            "pic": "Đào Thanh Công"
          }
        ]
      },
      {
        "title": "O3: Chuyển giao hệ thống vận hành nội bộ, đảm bảo an toàn và không gián đoạn hoạt động công ty.",
        "weight": 33.3,
        "keyResults": [
          {
            "title": "KR1: Hoàn thành chuyển giao 100% các hệ thống vận hành",
            "weight": 100.0,
            "pic": "Đào Thanh Công"
          }
        ]
      }
    ],
    "M7": []
  }
};

async function main() {
  console.log("Starting Q3 2026 OKRs database seeding from Excel...");

  const periods = ["Q3_2026", "M7_2026", "M8_2026", "M9_2026"];
  const unitCodes = Object.keys(okrData);

  console.log("Cleaning up existing OKRs in Q3 periods for: ", unitCodes);
  await prisma.objective.deleteMany({
    where: {
      unitCode: { in: unitCodes },
      period: { in: periods }
    }
  });
  console.log("Cleanup finished.");

  // Seed data
  for (const period of periods) {
    console.log(`Seeding period: ${period}...`);
    for (const [unitCode, buckets] of Object.entries(okrData)) {
      // Determine which bucket of objectives to use for this period
      let objsToSeed = [];
      if (period === "M7_2026") {
        // For Month 7, if there is a separate M7 bucket, use it. Otherwise fallback to Q3.
        objsToSeed = buckets.M7 && buckets.M7.length > 0 ? buckets.M7 : buckets.Q3;
      } else {
        // Q3_2026, M8_2026, M9_2026 always use the Q3 bucket
        objsToSeed = buckets.Q3;
      }

      for (const obj of objsToSeed) {
        await prisma.objective.create({
          data: {
            unitCode,
            title: obj.title,
            weight: obj.weight,
            period,
            progress: 0,
            keyResults: {
              create: obj.keyResults.map(kr => ({
                title: kr.title,
                weight: kr.weight,
                progress: 0,
                priority: "Medium",
                pic: kr.pic,
                deadline: period === "M7_2026" ? new Date("2026-07-31") : new Date("2026-09-30")
              }))
            }
          }
        });
      }
    }
  }

  console.log("Q3 2026 OKRs database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
