# Sconnect OKR & KPI Management System (Next.js + PostgreSQL)

Hệ thống Web Application Quản trị Mục tiêu Hành động Trọng tâm Sconnect được chuyển đổi từ bản prototype Google AppScript/Sheets sang framework Next.js Full-stack nhằm đảm bảo khả năng mở rộng dữ liệu và ngăn chặn nghẽn mạng khi có nhiều người truy cập đồng thời.

Dự án được cấu hình sẵn sàng để triển khai trực tiếp lên **Vercel** (Hosting miễn phí) và kết nối với **Neon.tech** (PostgreSQL Serverless miễn phí).

---

## 1. Cấu trúc Thư mục Dự án

```text
sconnect-web/
├── app/
│   ├── api/
│   │   ├── ai/analyze/route.ts   # API Tích hợp Trợ lý AI (Gemini SDK)
│   │   ├── kpi/route.ts          # API Lấy/Lưu số liệu và giải trình KPI
│   │   ├── okrs/route.ts         # API Quản lý Objective-KR-Action và cập nhật tiến độ
│   │   ├── permissions/route.ts  # API Ma trận phân quyền vai trò
│   │   └── users/route.ts        # API CRUD thông tin tài khoản người dùng
│   ├── globals.css               # CSS định hình phong cách Glassmorphism
│   ├── layout.tsx                # Layout bao ngoài của ứng dụng
│   ├── page.tsx                  # Tab 1: Dashboard Tổng hợp (Phân hệ 1)
│   ├── unit-data/page.tsx        # Tab 2: Báo cáo Đơn vị - Tree Grid (Phân hệ 2)
│   ├── product-data/page.tsx     # Tab 3: Báo cáo Sản phẩm - Flat Grid (Phân hệ 3)
│   ├── input-form/page.tsx       # Tab 4: Nhập liệu KPI & Phản tỉnh (Phân hệ 4 & 5.3)
│   ├── okr-strategy/page.tsx     # Tab 5: Cây OKRs Chiến lược (Phân hệ 5.1 & 5.2)
│   └── permissions/page.tsx      # Tab 6: Phân quyền & Mô phỏng (Phân hệ 6)
├── components/
│   ├── FiltersHeader.tsx         # Freeze panel bộ chọn Đơn vị & Kỳ báo cáo
│   ├── ObjectiveRadarChart.tsx   # Biểu đồ Heptagon Radar (Bánh xe mục tiêu)
│   ├── RevenueDonutChart.tsx     # Biểu đồ cơ cấu doanh thu Donut
│   └── SidebarLayout.tsx         # Sidebar menu bên trái ứng dụng
├── context/
│   └── AppContext.tsx            # Quản lý React State toàn cục (User, Bộ lọc kỳ)
├── lib/
│   └── prisma.ts                 # Prisma Client quản lý kết nối PostgreSQL
├── prisma/
│   └── schema.prisma             # Thiết kế các Bảng trong CSDL PostgreSQL
├── package.json                  # Khai báo thư viện phụ thuộc
├── tsconfig.json                 # Cấu hình TypeScript compiler
├── tailwind.config.js            # Cấu hình Tailwind CSS utility classes
├── postcss.config.js             # Cấu hình PostCSS
├── .env.example                  # File cấu hình mẫu biến môi trường
└── .gitignore                    # Các file loại trừ khi đẩy lên Git
```

---

## 2. Hướng dẫn Triển khai Từng bước (Deploy Guide)

Vui lòng thực hiện theo đúng 5 bước sau để đưa hệ thống web vào vận hành thực tế:

### Bước 1: Đẩy mã nguồn lên GitHub của bạn
1. Cài đặt Git trên máy tính cá nhân của bạn (nếu chưa có).
2. Tạo một Repository mới trên GitHub (Ví dụ đặt tên: `sconnect-okr-kpi`).
3. Khởi tạo Git cục bộ trong thư mục `sconnect-web` và đẩy code lên GitHub:
   ```bash
   cd sconnect-web
   git init
   git add .
   git commit -m "Initialize Sconnect OKR & KPI Web System"
   git branch -M main
   git remote add origin https://github.com/tai-khoan-cua-ban/sconnect-okr-kpi.git
   git push -u origin main
   ```

### Bước 2: Tạo Cơ sở Dữ liệu PostgreSQL miễn phí trên Neon.tech
1. Truy cập trang chủ [Neon.tech](https://neon.tech/) và đăng ký một tài khoản miễn phí.
2. Tạo một dự án mới (Ví dụ tên: `sconnect-db`), chọn khu vực máy chủ gần Việt Nam nhất (Singapore hoặc Asia Southeast).
3. Sau khi dự án được khởi tạo, Neon sẽ cung cấp cho bạn một chuỗi kết nối (Connection String) định dạng:
   `postgresql://neondb_owner:xxxxxx@ep-xxxx-xxxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
4. Sao chép lại chuỗi kết nối này để sử dụng ở Bước 4.

### Bước 3: Liên kết Github với Vercel để Hosting
1. Truy cập trang chủ [Vercel.com](https://vercel.com/) và đăng ký bằng tài khoản GitHub của bạn.
2. Tại trang Dashboard của Vercel, nhấn **Add New** -> **Project**.
3. Vercel sẽ hiển thị danh sách các kho mã nguồn của bạn trên GitHub. Tìm Repository `sconnect-okr-kpi` và nhấn **Import**.

### Bước 4: Thiết lập Biến môi trường (Environment Variables) trên Vercel
1. Trước khi bấm **Deploy**, cuộn xuống phần **Environment Variables** trên Vercel.
2. Thêm 2 biến môi trường cốt lõi sau:
   *   `DATABASE_URL`: Gán giá trị là chuỗi kết nối PostgreSQL bạn lấy từ Neon.tech ở Bước 2.
   *   `GEMINI_API_KEY`: Gán giá trị là API Key của Google Gemini để kích hoạt Trợ lý AI (Nếu chưa có, hệ thống sẽ tự động dùng Mock dữ liệu AI mà không báo lỗi).
3. Nhấn **Add** cho từng biến môi trường.

### Bước 5: Bấm Deploy & Trải nghiệm
1. Nhấn nút **Deploy** trên giao diện Vercel.
2. Quá trình Build serverless của Vercel sẽ tự động:
   *   Cài đặt các gói thư viện (`npm install`).
   *   Chạy Prisma sinh cấu trúc bảng lên Neon (`npx prisma generate && npx prisma db push`).
   *   Biên dịch React & Next.js tối ưu hóa hiệu năng.
3. Chỉ sau khoảng 1-2 phút, bạn sẽ nhận được một đường link URL truy cập trực tiếp hệ thống (Ví dụ: `sconnect-okr-kpi.vercel.app`) để chia sẻ cho mọi người cùng sử dụng!
