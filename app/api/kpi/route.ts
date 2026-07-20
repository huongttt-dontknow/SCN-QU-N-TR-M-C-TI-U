import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/kpi - Lấy dữ liệu KPI mục tiêu/thực tế theo Đơn vị và Kỳ
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitCode = searchParams.get("unitCode");
    const periodKey = searchParams.get("periodKey");
    const periodType = searchParams.get("periodType") || "weekly";

    if (!unitCode || !periodKey) {
      return NextResponse.json({ error: "Thiếu unitCode hoặc periodKey" }, { status: 400 });
    }

    // Lấy dữ liệu đã lưu
    let kpiRecords = await prisma.kpiData.findMany({
      where: { unitCode, periodKey, periodType },
    });

    // Nếu kỳ này chưa có dữ liệu, sinh dữ liệu mẫu dựa trên bộ chỉ tiêu mặc định của Sconnect
    if (kpiRecords.length === 0) {
      // Danh sách chỉ tiêu mẫu từ đặc tả nghiệp vụ
      const defaultIndicators = [
        { code: "VM1-I01.01", title: "Tỷ suất lợi nhuận ROI (%)", target: 15, pic: "Lê Đăng Khoa", type: "monthly" },
        { code: "VM1-I05.03", title: "Chi phí mua công cụ AI mới (VNĐ)", target: 50000000, pic: "Lê Quỳnh Nga", type: "monthly" },
        { code: "VM1-I05.04", title: "Chi phí CTV (Cộng tác viên)", target: 120000000, pic: "Vũ Trung Đức", type: "monthly" },
        { code: "VM2-I01.01", title: "Số lượng video hoàn thành sản xuất (Video)", target: 16, pic: "Lê Đăng Khoa", type: "weekly" },
        { code: "VM2-I01.02", title: "Số lượng video biên tập hoàn thành (funny) (Video)", target: 30, pic: "Lò Quế Hằng", type: "weekly" },
        { code: "VM2-I02.01", title: "Số sản phẩm phái sinh & khai thác (Sản phẩm)", target: 5, pic: "Vũ Trung Đức", type: "weekly" },
        { code: "MM2-I01.01", title: "Số lượng sản phẩm âm nhạc hoàn thành (Bài)", target: 8, pic: "Vũ Trung Đức", type: "weekly" },
        { code: "VM2-I01.3", title: "Số lượng ý tưởng mới (Ý tưởng)", target: 25, pic: "Lê Đăng Khoa", type: "weekly" },
        { code: "VM2-I01.4", title: "Số lượng ý tưởng được chọn (Ý tưởng)", target: 15, pic: "Lê Đăng Khoa", type: "weekly" },
        { code: "VM2-I01.5", title: "Tỷ lệ chọn ý tưởng (%)", target: 60, pic: "Lê Đăng Khoa", type: "weekly" },
        { code: "VM2-I01.6", title: "SL Kịch bản mới SX (Kịch bản)", target: 10, pic: "Lê Đăng Khoa", type: "weekly" },
        { code: "TM3-I01.02", title: "Tổng traffic đơn vị (Views)", target: 120000000, pic: "Lê Đăng Khoa", type: "weekly" },
        { code: "TM3-I01.03", title: "Số lượng video upload (nội dung)", target: 45, pic: "Trịnh Quốc Thịnh", type: "weekly" },
        { code: "TM4-I01.01", title: "Độ phủ thương hiệu mới (Sub/Follower)", target: 50000, pic: "Lê Đăng Khoa", type: "monthly" },
        { code: "TM4-I02.01", title: "Số kênh đạt ngưỡng 10k $/tháng (Kênh)", target: 4, pic: "Trần Như Quỳnh", type: "monthly" },
        { code: "VM4-I02.04", title: "Số vi phạm chính sách (Lần)", target: 0, pic: "Đào Thanh Công", type: "monthly" },
        { code: "VM5-I02.01", title: "Thời gian sản xuất TB 1 video (Ngày)", target: 5, pic: "Nguyễn Ánh Tùng", type: "monthly" },
        { code: "VM7-I03.01", title: "Tỷ lệ nhân sự không vi phạm kỷ luật (%)", target: 100, pic: "Trần Thị Diệu Ly", type: "monthly" },
      ];

      // Lọc các chỉ tiêu phù hợp với tần suất periodType
      const filteredDefaults = defaultIndicators.filter(ind => ind.type === periodType);

      const newKpis = filteredDefaults.map(ind => ({
        indicatorCode: ind.code,
        unitCode,
        periodType,
        periodKey,
        targetValue: ind.target,
        actualValue: 0,
        pic: ind.pic,
        status: "Chưa thực hiện",
        explanation: "",
      }));

      await prisma.kpiData.createMany({ data: newKpis });
      kpiRecords = await prisma.kpiData.findMany({
        where: { unitCode, periodKey, periodType },
      });
    }

    return NextResponse.json(kpiRecords);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/kpi - Cập nhật số liệu thực tế và giải trình của KPI
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { unitCode, periodKey, periodType, kpiUpdates } = body; // kpiUpdates: array of { id, actualValue, explanation, status }

    if (!unitCode || !periodKey || !kpiUpdates || !Array.isArray(kpiUpdates)) {
      return NextResponse.json({ error: "Thiếu thông tin hoặc dữ liệu cập nhật không hợp lệ" }, { status: 400 });
    }

    // Cập nhật từng KPI bằng Prisma transaction
    const updatePromises = kpiUpdates.map(u => {
      // Đánh giá trạng thái tự động dựa trên thực tế vs kế hoạch
      return prisma.kpiData.update({
        where: { id: u.id },
        data: {
          actualValue: parseFloat(u.actualValue) || 0,
          explanation: u.explanation || "",
          status: u.status || "Đang thực hiện",
        },
      });
    });

    await prisma.$transaction(updatePromises);

    const updatedRecords = await prisma.kpiData.findMany({
      where: { unitCode, periodKey, periodType },
    });

    return NextResponse.json({ message: "Lưu dữ liệu KPI thành công", data: updatedRecords });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
