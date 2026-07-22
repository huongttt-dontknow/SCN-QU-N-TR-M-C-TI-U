const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Define the OKR templates for the 7 units
const okrTemplates = {
  Wofloo: [
    {
      title: "Tăng tốc hoàn thiện toàn diện và chuẩn hóa mô hình, quy trình sản xuất AIVA-AI",
      weight: 25,
      keyResults: [
        { title: "Đảm bảo 100% quy trình quản lý sản xuất cho tất cả các dòng sản phẩm", weight: 20, pic: "Trần Anh Tuấn" },
        { title: "Xây dựng và áp dụng mô hình vận hành AIVA Ani cho toàn bộ các sản phẩm trong đơn vị", weight: 20, pic: "Lê Đăng Khoa" },
        { title: "Tăng hiệu suất 150% với sản phẩm hiện tại", weight: 20, pic: "Lê Đăng Khoa" },
        { title: "Tăng hiệu suất 300% với sản phẩm cùng công nghệ 3D", weight: 20, pic: "Phạm Thùy Linh" },
        { title: "Giảm thời gian sản xuất trung bình của 1 sản phẩm về 4.5 ngày", weight: 20, pic: "Trần Anh Tuấn" }
      ]
    },
    {
      title: "Tối đa hóa hiệu suất khai thác nội dung một cách hiệu quả tạo đột phá tăng trưởng doanh thu",
      weight: 25,
      keyResults: [
        { title: "Mở mới hệ thống kinh doanh trên Tiktok (Đa dạng cách kiếm tiền, Tiktok Beta, Gắn giỏ hàng,...). Số kênh mở mới tối thiểu 5 kênh. Tỷ trọng chiếm dựa trên tổng DT là 2%. Mỗi kênh 12tr/tháng", weight: 20, pic: "Nguyễn Minh Trí" },
        { title: "Hợp tác cấp quyền khai thác nền tảng OTT chiếm tỉ trọng 4%. Gia tăng 3 đối tác", weight: 20, pic: "Nguyễn Minh Trí" },
        { title: "Hợp tác phân phối nội dung B2B youtube chiếm tỉ trọng 4%. Gia tăng thêm 3 đối tác (Nước ngoài, không tính các đối tác hiện tại)", weight: 20, pic: "Lê Đăng Khoa" },
        { title: "Mở rộng hệ thống kênh khai thác vận dụng AI cho nhóm KD: 8 kênh", weight: 20, pic: "Phạm Thùy Linh" },
        { title: "Tăng trưởng hệ thống kinh Doanh hiện tại 50%", weight: 20, pic: "Nguyễn Minh Trí" }
      ]
    },
    {
      title: "Nâng cao hiệu quả sản xuất kinh doanh thông qua việc xây dựng các dự án phái sinh dữ liệu",
      weight: 25,
      keyResults: [
        { title: "Thực hiện dựng phái sinh 500 nội dung phái sinh từ kho cũ (Nhân bản từ project diễn, kịch bản, nguyên liệu)", weight: 50, pic: "Lê Đăng Khoa" },
        { title: "Triển khai 01 DA WF3D. Tận dụng kho tài nguyên phái sinh từ sản phẩm 2D. Doanh Thu dự án mới đạt 8,203,404,435 trong năm", weight: 50, pic: "Trần Anh Tuấn" }
      ]
    },
    {
      title: "Đổi mới năng lực nhân sự, Xây dựng văn hóa AI 1st",
      weight: 25,
      keyResults: [
        { title: "100% nhân sự sản xuất hoàn thành chương trình đào tạo về AIVA", weight: 50, pic: "Phạm Thùy Linh" },
        { title: "100% nhân sự xây dựng được AIVA-P và ứng dụng hiệu quả AI trong công việc", weight: 50, pic: "Lê Đăng Khoa" }
      ]
    }
  ],
  AS: [
    {
      title: "Gia tăng hiệu suất doanh thu youtube bền vững",
      weight: 20,
      keyResults: [
        { title: "Tăng RPM kênh thương hiệu ≥ 100%", weight: 25, pic: "Nguyễn Văn Hùng" },
        { title: "Không có kênh bị tắt kiếm tiền", weight: 25, pic: "Nguyễn Văn Hùng" },
        { title: "Tăng trưởng traffic kênh thương hiệu ≥ 40%", weight: 25, pic: "Lê Thị Lan" },
        { title: "Tăng trưởng doanh thu hệ thống khai thác ≥ 30%", weight: 25, pic: "Trần Đức Nam" }
      ]
    },
    {
      title: "Gia tăng hiệu suất doanh thu đa nền tảng",
      weight: 20,
      keyResults: [
        { title: "Doanh thu nền tảng Spotify tăng ≥ 200%", weight: 100, pic: "Trần Đức Nam" }
      ]
    },
    {
      title: "Ứng dụng AIVA-Animation Studio mở rộng kho nội dung",
      weight: 20,
      keyResults: [
        { title: "Sản xuất kho ≥ 200 nội dung AI animated", weight: 20, pic: "Lê Thị Lan" },
        { title: "Sản xuất kho ≥ 1000 nội dung slideshow", weight: 20, pic: "Nguyễn Văn Hùng" },
        { title: "Sản xuất kho 1000 nội dung short", weight: 20, pic: "Lê Thị Lan" },
        { title: "Doanh thu kho nd AI ≥ $70000", weight: 20, pic: "Trần Đức Nam" },
        { title: "Gia tăng hiệu suất sản xuất ≥ 30%", weight: 20, pic: "Nguyễn Văn Hùng" }
      ]
    },
    {
      title: "Đổi mới năng lực nhân sự bối cảnh AI-Native",
      weight: 20,
      keyResults: [
        { title: "Tỉ lệ nhân sự được tăng ngạch ≥ 20%", weight: 25, pic: "Lê Thị Lan" },
        { title: "100% nhân sự hoàn thành chương trình đào tạo sử dụng AIVA", weight: 25, pic: "Nguyễn Văn Hùng" },
        { title: "Nhân sự tham gia chương trình đào tạo phát triển đội ngũ quản lý đạt 3 nhân sự", weight: 25, pic: "Lê Thị Lan" },
        { title: "Đổi mới cơ cấu thu nhập cho nhân sự", weight: 25, pic: "Trần Đức Nam" }
      ]
    },
    {
      title: "Tăng trưởng doanh thu từ nguồn khai thác chéo",
      weight: 20,
      keyResults: [
        { title: "Doanh thu từ nguồn OTT đạt ≥ $12.000", weight: 50, pic: "Trần Đức Nam" },
        { title: "Doanh thu từ nguồn khai thác chéo trên youtube đạt ≥ $7.500", weight: 50, pic: "Nguyễn Văn Hùng" }
      ]
    }
  ],
  NDTH: [
    {
      title: "Đổi mới năng lực khai thác hướng tới tăng trưởng đột phá về doanh thu",
      weight: 20,
      keyResults: [
        { title: "Tập trung nâng cao năng lực khai thác, mục tiêu chuyển đổi hướng khai thác cho 50% sản phẩm cũ", weight: 25, pic: "Trần Văn Sơn" },
        { title: "100% nhân sự vận dụng AI vào công việc chuyên môn tối thiểu 30% đến 100%", weight: 25, pic: "Phan Văn Minh" },
        { title: "Hoàn thành khung năng lực và KPI 2026", weight: 25, pic: "Trần Văn Sơn" },
        { title: "Xây dựng được 2 nhân sự Key AI", weight: 25, pic: "Phan Văn Minh" }
      ]
    },
    {
      title: "Xây dựng nhóm 3 sản phẩm HM (Doll – Sticker – ASMR Beauty) thành nhóm sản phẩm tăng trưởng mạnh top đầu thị trường",
      weight: 20,
      keyResults: [
        { title: "Ra mắt và vận hành ổn định 2 dự án mới: HM ASMR Beauty & Doll Story. Hết quý II kênh Beauty đạt >=5ks/tháng, hết quý II kênh Story đạt>=5ks/tháng", weight: 25, pic: "Vũ Thị Ngọc" },
        { title: "Doanh thu nhóm sản phẩm Sticker 2026 đạt 2 tỉ. Nội dung bắt trend chiếm 60% doanh thu", weight: 25, pic: "Trần Văn Sơn" },
        { title: "Phát triển 3 hướng kênh chính cho Doll: 3 Kênh thương hiệu, 3 kênh khai thác vệ tinh và 3 kênh shorts", weight: 25, pic: "Vũ Thị Ngọc" },
        { title: "Mở rộng nền tảng sang Tiktok, tối thiểu 3 kênh hoạt động ổn định : 2 kênh đạt 50k follow", weight: 25, pic: "Phan Văn Minh" }
      ]
    },
    {
      title: "Khôi phục – phát triển hệ thống kênh kinh doanh khai thác Youtube dẫn đầu SCN",
      weight: 20,
      keyResults: [
        { title: "Mở mới 15 kênh kinh doanh YT, Cơ cấu doanh thu 2025: TOCA 10%, DIY 40%, AFV 10%, SPOTIFY 10%, Khai thác và AI 30%", weight: 25, pic: "Trần Văn Sơn" },
        { title: "Tiếp tục phát triển nhóm kênh kinh doanh hiện tại với 2 kênh doanh thu >= 10k$/tháng/ 10 kênh doanh thu từ 1-2k$/tháng", weight: 25, pic: "Phan Văn Minh" },
        { title: "Kho cũ chạy lại tối thiểu 2 kênh >3k$/tháng", weight: 25, pic: "Trần Văn Sơn" },
        { title: "Mở mới 6 kênh chuyên shorts và 2 kênh chuyên livestream", weight: 25, pic: "Vũ Thị Ngọc" }
      ]
    },
    {
      title: "Tăng trưởng mạnh mẽ doanh thu thông qua kinh doanh đa nền tảng",
      weight: 20,
      keyResults: [
        { title: "Củng cố và phát triển hệ thống sản phẩm trên Spotify: 2 kênh phát triển ổn định đến quý II đạt 3k$/tháng. 2 kênh còn lại doanh thu 2k$/tháng", weight: 40, pic: "Vũ Thị Ngọc" },
        { title: "Mở 2 page FB, doanh thu 1k$/tháng từ quý III", weight: 30, pic: "Phan Văn Minh" },
        { title: "3 Kênh tiktok >10K Follow", weight: 30, pic: "Trần Văn Sơn" }
      ]
    },
    {
      title: "Chuẩn hóa mô hình và quy trình sản xuất ND AI cùng tổng Cty",
      weight: 20,
      keyResults: [
        { title: "Phối hợp AIVA triển khai thành công tối thiểu 2 nhóm sản phẩm mới AI DT 2k$/tháng", weight: 35, pic: "Phan Văn Minh" },
        { title: "Đảm bảo 100% các khâu sản xuất- kinh doanh có vận dụng AI tối thiểu 30%/khâu", weight: 35, pic: "Trần Văn Sơn" },
        { title: "AVD các sản phẩm vận dụng AI vào khâu hậu kỳ, biên tập tăng 15%", weight: 30, pic: "Vũ Thị Ngọc" }
      ]
    }
  ],
  Lego: [
    {
      title: "Tăng hiệu suất doanh thu mạnh mẽ",
      weight: 20,
      keyResults: [
        { title: "Đẩy mạnh doanh thu kinh doanh trực tiếp từ YouTube đạt mức min 500 triệu/tháng (Đầu kỳ) - min 850 triệu/ tháng (Cuối kỳ). Tăng trưởng 45% doanh thu so với năm 2025. Doanh thu 2026 (~8,3 tỷ)", weight: 40, pic: "Hoàng Văn Tuấn" },
        { title: "Phối hợp vs đề xuất các PA tăng trưởng KD khác cùng các phòng ban KD trong công ty và tạo ra doanh thu 5% KH năm", weight: 30, pic: "Nguyễn Huy Hoàng" },
        { title: "Tăng doanh thu gián tiếp qua nội dung phái sinh & nền tảng thứ cấp: VD: Tiktok, Facebook ... và tạo ra doanh thu 5% KH năm", weight: 30, pic: "Nguyễn Huy Hoàng" }
      ]
    },
    {
      title: "Tăng cường hiệu suất sản xuất/ chất lượng sản phẩm",
      weight: 20,
      keyResults: [
        { title: "Tăng hiệu suất sản xuất ND long từ việc tối ưu năng lực đội ngũ = 343 NDSX mới. Trong đó: NDSX thường: 185 NDSX, NDSX AI PET: 58 NDSX, NDSX AI TĐH: 100 NDSX", weight: 40, pic: "Hoàng Văn Tuấn" },
        { title: "Tăng hiệu suất sản xuất ND short. Bao gồm: 30 ND mới và 50-60 ND phái sinh/ tháng", weight: 30, pic: "Nguyễn Huy Hoàng" },
        { title: "Tăng tỷ lệ giữ chân khách hàng lên 98%", weight: 30, pic: "Hoàng Văn Tuấn" }
      ]
    },
    {
      title: "Vận dụng nhanh và tốt mô hình và quy trình sản xuất AIVA-AI",
      weight: 20,
      keyResults: [
        { title: "Xây dựng quy trình quản lý sản xuất và áp dụng mô hình vận hành AIVA-AI cho khâu phù hợp trong DA và các dòng SP khai thác gia tăng", weight: 25, pic: "Hoàng Văn Tuấn" },
        { title: "Tăng năng suất sản xuất ≥ 150% trong giai đoạn chuyển đổi", weight: 25, pic: "Nguyễn Huy Hoàng" },
        { title: "Giảm thời gian sản xuất TB ≥ 20% cho mỗi sản phẩm thường và ≥ 50% so với thời gian sản xuất 2025", weight: 25, pic: "Hoàng Văn Tuấn" },
        { title: "Triển khai hoạt động kinh doanh từ việc áp dụng mô hình để sản xuất nhiều video/ tháng", weight: 25, pic: "Nguyễn Huy Hoàng" }
      ]
    },
    {
      title: "Phát triển hiệu quả các sản phẩm kinh doanh từ dữ liệu phái sinh",
      weight: 20,
      keyResults: [
        { title: "Chuẩn hóa kho lưu trữ các dữ liệu phái sinh của DA Lego 7-10 kho", weight: 35, pic: "Nguyễn Huy Hoàng" },
        { title: "Thực hiện các hoạt động phái sinh dữ liệu phù hợp và tạo ra 15% kết quả doanh thu từ hoạt động này", weight: 35, pic: "Hoàng Văn Tuấn" },
        { title: "Đề xuất các bên khai thác nội dung triển khai khai thác sản phẩm Lego trên các nền tảng. Mục tiêu đem tới doanh thu: ~500 triệu", weight: 30, pic: "Nguyễn Huy Hoàng" }
      ]
    },
    {
      title: "Phát triển năng lực nhân sự tối đa",
      weight: 20,
      keyResults: [
        { title: "100% nhân sự sản xuất & kinh doanh hoàn thành chương trình đào tạo về AIVA", weight: 50, pic: "Hoàng Văn Tuấn" },
        { title: "Tối ưu chức năng NS: Xây Skill Matrix: mỗi người phải có ít nhất 2-3 kỹ năng", weight: 50, pic: "Nguyễn Huy Hoàng" }
      ]
    }
  ],
  DA01: [
    {
      title: "Tăng trưởng doanh thu thông qua phát triển hệ thống kênh kd đa nền tảng",
      weight: 16.6,
      keyResults: [
        { title: "Xây dựng và phát triển hệ thống 14 kênh Youtube chiếm 85% DT", weight: 40, pic: "Lê Quốc Bảo" },
        { title: "Xây dựng và phát triển hệ thống 3 kênh Spotify chiếm 10% DT", weight: 30, pic: "Trần Ngọc Hân" },
        { title: "Xây dựng và phát triển hệ thống 3 kênh Tik Tok chiếm 5% DT", weight: 30, pic: "Lê Quốc Bảo" }
      ]
    },
    {
      title: "Phát triển sản phẩm",
      weight: 16.6,
      keyResults: [
        { title: "Phát triển 2 sản phẩm key có ROI >0%", weight: 50, pic: "Lê Quốc Bảo" },
        { title: "Sản phẩm AI mới được sản xuất theo quy trình AIVA- AI 100%", weight: 50, pic: "Trần Ngọc Hân" }
      ]
    },
    {
      title: "Phát triển cộng đồng",
      weight: 16.6,
      keyResults: [
        { title: "Phát triển 5 cộng đồng có lượt tương tác ổn định", weight: 100, pic: "Lê Quốc Bảo" }
      ]
    },
    {
      title: "Kiểm soát an toàn hệ thống kênh",
      weight: 16.6,
      keyResults: [
        { title: "Hệ thống kênh thương hiệu 0 vi phạm chính sách", weight: 50, pic: "Trần Ngọc Hân" },
        { title: "Hệ thống kênh có doanh thu cao > 10K$", weight: 50, pic: "Lê Quốc Bảo" }
      ]
    },
    {
      title: "Quản lý kho nội dung",
      weight: 16.8,
      keyResults: [
        { title: "Quản lý lưu trữ kho nội dung đảm bảo 100% tiêu chí yêu cầu", weight: 40, pic: "Trần Ngọc Hân" },
        { title: "Đảm bảo 100% ổn định cấp kho cho các bên", weight: 30, pic: "Lê Quốc Bảo" },
        { title: "Thời gian tìm kiếm tài nguyên biên tập giảm còn 5p/ tập", weight: 30, pic: "Trần Ngọc Hân" }
      ]
    },
    {
      title: "Nâng cao hiệu suất/năng lực nhân sự",
      weight: 16.8,
      keyResults: [
        { title: "100% nhân sự xây dựng được AIVA-P và ứng dụng hiệu quả AI trong công việc", weight: 50, pic: "Lê Quốc Bảo" },
        { title: "100% nhân sự sản xuất hoàn thành chương trình đào tạo về AIVA", weight: 50, pic: "Trần Ngọc Hân" }
      ]
    }
  ],
  SCS: [
    {
      title: "Đột phá tăng trưởng doanh thu đạt lợi nhuận dương tối thiểu 15%",
      weight: 25,
      keyResults: [
        { title: "Tăng trưởng doanh thu khai thác kinh doanh trên nền tảng youtube : chiếm 60% doanh thu", weight: 40, pic: "Phạm Minh Hoàng" },
        { title: "Mở rộng nền tảng khai thác nội dung sản xuất, kho nội dung : 20% doanh thu", weight: 30, pic: "Phạm Minh Hoàng" },
        { title: "Mở rộng các dự án hợp tác sản xuất kinh doanh : 10 dự án chiếm 20% doanh thu", weight: 30, pic: "Trương Quốc Khánh" }
      ]
    },
    {
      title: "Đột phá gia tăng hiệu suất sản xuất nội dung",
      weight: 25,
      keyResults: [
        { title: "Năng xuất sáng tạo và sản xuất tăng trưởng tối thiểu 200%", weight: 40, pic: "Trương Quốc Khánh" },
        { title: "Mở rộng các dự án sản xuất phái sinh sản phẩm : 5 dự án", weight: 30, pic: "Phạm Minh Hoàng" },
        { title: "Nhanh chóng chuyển đổi quy trình sản xuất mới với AIVA-C Animation Studio : Quý 1", weight: 30, pic: "Trương Quốc Khánh" }
      ]
    },
    {
      title: "Đột phá ứng dụng công nghệ nền tảng AIVA-C Animation Studio vào sản xuất sản phẩm chất lượng cao",
      weight: 25,
      keyResults: [
        { title: "Hoàn thành các bộ series dài tập : 5 bộ series (20 tập)", weight: 40, pic: "Trương Quốc Khánh" },
        { title: "Hoàn thành sản xuất thô của movie \"Chiến Binh Gốm\"", weight: 35, pic: "Phạm Minh Hoàng" },
        { title: "Hoạch định phương án triển khai Movie Hub", weight: 25, pic: "Trương Quốc Khánh" }
      ]
    },
    {
      title: "Nâng cao năng lực AI nhân sự",
      weight: 25,
      keyResults: [
        { title: "Kiến tạo thành công văn hoá AI First", weight: 35, pic: "Phạm Minh Hoàng" },
        { title: "Xây dựng nguồn lực cốt lõi đảm bảo dẫn dắt, vận hành hiệu quả mô hình AIVA.Team core AIVA : 3 chuyên gia", weight: 35, pic: "Trương Quốc Khánh" },
        { title: "100% nhân sự ứng dụng hiệu quả với mô hình AIVA O,P", weight: 30, pic: "Phạm Minh Hoàng" }
      ]
    }
  ],
  Music: [
    {
      title: "Tăng trưởng doanh thu",
      weight: 25,
      keyResults: [
        { title: "Tăng trưởng 170% doanh thu so với mục tiêu 2025", weight: 25, pic: "Nguyễn Hải Phong" },
        { title: "Đạt 25% doanh thu tới từ cấp quyền đối tác + Gia công (20% licensing, 5% gia công)", weight: 25, pic: "Nguyễn Hải Phong" },
        { title: "Doanh thu kênh nội bộ tự khai thác trung bình đạt 10k$/tháng", weight: 25, pic: "Lê Mỹ Linh" },
        { title: "Có tối thiểu 10 KH khai thác có doanh thu >1k$/tháng", weight: 25, pic: "Lê Mỹ Linh" }
      ]
    },
    {
      title: "Năng suất sáng tạo có sự tăng trưởng",
      weight: 25,
      keyResults: [
        { title: "Năng suất tăng 200% khi áp dụng AIVA trong sản xuất", weight: 25, pic: "Nguyễn Hải Phong" },
        { title: "Giảm 30% thời gian sản xuất với những nội dung áp dụng AIVA", weight: 25, pic: "Lê Mỹ Linh" },
        { title: "Tăng số lượng kho nhạc tối thiểu 15000 bài đảm bảo tiêu chí kinh doanh", weight: 25, pic: "Nguyễn Hải Phong" },
        { title: "Giảm 30% chi phí sản xuất khi áp dụng AIVA", weight: 25, pic: "Lê Mỹ Linh" }
      ]
    },
    {
      title: "Hệ thống AIVA đảm bảo vận hành, kinh doanh",
      weight: 25,
      keyResults: [
        { title: "AIVA - C: Hoàn thiện mô hình sáng tạo ý tưởng kịch bản âm nhạc, mô hình sáng tạo video, mô hình phân tích bài hát với audio có sẵn, Mô hình sáng tác bài hát và chuyển đổi prompt phù hợp với các AI sáng tác giai điệu như Suno, Udio.", weight: 25, pic: "Nguyễn Hải Phong" },
        { title: "AIVA - O : Hoàn thiện mô hình quản trị dữ liệu kho nhạc, quản trị dữ liệu khách hàng", weight: 25, pic: "Lê Mỹ Linh" },
        { title: "AIVA - P: Hoàn thiện mô hình trợ lý cho toàn bộ nhân sự đơn vị", weight: 25, pic: "Nguyễn Hải Phong" },
        { title: "80% công việc áp dụng AIVA", weight: 25, pic: "Lê Mỹ Linh" }
      ]
    },
    {
      title: "Nổi bật văn hóa AI First tới toàn bộ nhân sự",
      weight: 25,
      keyResults: [
        { title: "100% nhân sự được tham gia training đào tạo về AIVA", weight: 40, pic: "Nguyễn Hải Phong" },
        { title: "Tối thiểu có 4 cải tiến sáng tạo khi sử dụng AI trong năm", weight: 30, pic: "Lê Mỹ Linh" },
        { title: "Tối thiểu 1 giải thưởng AI mỗi quý", weight: 30, pic: "Nguyễn Hải Phong" }
      ]
    }
  ]
};

async function main() {
  console.log("Starting 2026 Sconnect sub-units OKRs seeding...");

  // Generate periods for the year 2026:
  // 12 months (M1_2026 to M12_2026) and 4 quarters (Q1_2026 to Q4_2026)
  const periods = [];
  for (let m = 1; m <= 12; m++) {
    periods.push(`M${m}_2026`);
  }
  for (let q = 1; q <= 4; q++) {
    periods.push(`Q${q}_2026`);
  }

  // To prevent duplicate keys and keep the db clean, delete existing OKRs for these 7 units in 2026 periods
  const unitCodes = Object.keys(okrTemplates);
  
  console.log("Cleaning up existing 2026 OKRs for: ", unitCodes);
  await prisma.objective.deleteMany({
    where: {
      unitCode: { in: unitCodes },
      period: { in: periods }
    }
  });
  console.log("Cleanup finished.");

  // Iterate over periods and units to seed
  for (const period of periods) {
    console.log(`Seeding period: ${period}...`);
    for (const [unitCode, objectives] of Object.entries(okrTemplates)) {
      for (const obj of objectives) {
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
                deadline: new Date("2026-12-31")
              }))
            }
          }
        });
      }
    }
  }

  console.log("2026 OKRs Seeding successfully completed for all 7 sub-units across all periods!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
