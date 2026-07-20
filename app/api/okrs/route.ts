import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/okrs - Lấy danh sách OKR (Objective -> KeyResult -> Action) theo Đơn vị và Kỳ
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const unitCode = searchParams.get("unitCode");
    const period = searchParams.get("period"); // Q1_2026, M7_2026...

    if (!unitCode || !period) {
      return NextResponse.json({ error: "Thiếu unitCode hoặc period" }, { status: 400 });
    }

    let objectives = await prisma.objective.findMany({
      where: { unitCode, period },
      include: {
        keyResults: {
          include: {
            actions: true,
          },
        },
      },
      orderBy: { createdAt: "asc" },
    });

    // Nếu kỳ này chưa có OKR nào, tự động seeding dữ liệu mặc định từ đặc tả nghiệp vụ
    if (objectives.length === 0 && unitCode === "Wofloo") {
      // Seed Objective 1 cho Wolfoo
      const obj1 = await prisma.objective.create({
        data: {
          unitCode: "Wofloo",
          title: "Tăng tốc hoàn thiện toàn diện và chuẩn hóa mô hình quy trình sản xuất AIVA-AI",
          weight: 40,
          period,
          keyResults: {
            create: [
              {
                title: "Đảm bảo 100% quy trình quản lý sản xuất cho tất cả các dòng sản phẩm",
                weight: 30,
                progress: 40,
                pic: "Lê Đăng Khoa",
                deadline: new Date("2026-09-30"),
                actions: {
                  create: [
                    { unitCode: "Wofloo", title: "Viết tài liệu quy trình AIVA Standard", pic: "Trần Anh Tuấn", startDate: new Date("2026-07-01"), endDate: new Date("2026-07-15"), progress: 100, status: "Hoàn thành" },
                    { unitCode: "Wofloo", title: "Training cho 100% Leads các tổ sản xuất", pic: "Lê Đăng Khoa", startDate: new Date("2026-07-10"), endDate: new Date("2026-08-30"), progress: 30, status: "Đang thực hiện" },
                  ]
                }
              },
              {
                title: "Tăng hiệu suất sản xuất ND 2D trung bình lên 150%",
                weight: 40,
                progress: 60,
                pic: "Lê Đăng Khoa",
                deadline: new Date("2026-09-30"),
                actions: {
                  create: [
                    { unitCode: "Wofloo", title: "Ứng dụng AI tạo phác thảo bối cảnh tự động", pic: "Phạm Thùy Linh", startDate: new Date("2026-07-05"), endDate: new Date("2026-08-15"), progress: 80, status: "Đang thực hiện" }
                  ]
                }
              },
              {
                title: "Giảm thời gian sản xuất trung bình của 1 video về 4.5 ngày",
                weight: 30,
                progress: 20,
                pic: "Lê Đăng Khoa",
                deadline: new Date("2026-09-30"),
                actions: {
                  create: [
                    { unitCode: "Wofloo", title: "Chuẩn hóa thư viện Assets reusable", pic: "Trần Anh Tuấn", startDate: new Date("2026-07-15"), endDate: new Date("2026-09-15"), progress: 20, status: "Đang thực hiện" }
                  ]
                }
              }
            ]
          }
        }
      });

      // Seed Objective 2 cho Wolfoo
      const obj2 = await prisma.objective.create({
        data: {
          unitCode: "Wofloo",
          title: "Tối đa hóa hiệu suất khai thác nội dung để tạo đột phá doanh thu",
          weight: 60,
          period,
          keyResults: {
            create: [
              {
                title: "Mở rộng kênh Tiktok Beta và đạt tỷ trọng doanh thu tối thiểu 2% tổng DT",
                weight: 50,
                progress: 10,
                pic: "Lê Đăng Khoa",
                deadline: new Date("2026-09-30"),
                actions: {
                  create: [
                    { unitCode: "Wofloo", title: "Setup hệ thống 5 kênh Tiktok Beta mới", pic: "Nguyễn Minh Trí", startDate: new Date("2026-07-01"), endDate: new Date("2026-07-30"), progress: 50, status: "Đang thực hiện" }
                  ]
                }
              },
              {
                title: "Tăng trưởng doanh thu từ hệ thống kinh doanh cũ thêm 50%",
                weight: 50,
                progress: 50,
                pic: "Lê Đăng Khoa",
                deadline: new Date("2026-09-30"),
              }
            ]
          }
        }
      });

      // Truy vấn lại để trả về dữ liệu vừa seed
      objectives = await prisma.objective.findMany({
        where: { unitCode, period },
        include: {
          keyResults: {
            include: {
              actions: true,
            },
          },
        },
        orderBy: { createdAt: "asc" },
      });
    }

    return NextResponse.json(objectives);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/okrs - Lưu cập nhật tiến độ (Progress), trạng thái (Status), ghi chú (Notes) của KRs và Actions
export async function POST(request: Request) {
  try {
    const { actionUpdates, krUpdates } = await request.json();

    // 1. Cập nhật các Actions trước
    if (actionUpdates && Array.isArray(actionUpdates)) {
      const actPromises = actionUpdates.map(u => {
        return prisma.action.update({
          where: { id: u.id },
          data: {
            progress: parseFloat(u.progress) || 0,
            status: u.status,
            notes: u.notes || "",
          },
        });
      });
      await prisma.$transaction(actPromises);
    }

    // 2. Cập nhật các KRs nếu có thay đổi trực tiếp (với KRs không có Actions con)
    if (krUpdates && Array.isArray(krUpdates)) {
      const krPromises = krUpdates.map(u => {
        return prisma.keyResult.update({
          where: { id: u.id },
          data: {
            progress: parseFloat(u.progress) || 0,
          },
        });
      });
      await prisma.$transaction(krPromises);
    }

    // 3. Tự động tính toán lại tiến độ KRs dựa trên trung bình cộng tiến độ Actions con
    const allActions = await prisma.action.findMany({
      where: { keyResultId: { not: null } },
    });

    const krIdsToUpdate = Array.from(new Set(allActions.map(a => a.keyResultId as string)));
    
    for (const krId of krIdsToUpdate) {
      const childActions = allActions.filter(a => a.keyResultId === krId);
      if (childActions.length > 0) {
        const avgProgress = childActions.reduce((sum, a) => sum + a.progress, 0) / childActions.length;
        await prisma.keyResult.update({
          where: { id: krId },
          data: { progress: Math.round(avgProgress) },
        });
      }
    }

    // 4. Tự động tính toán lại tiến độ Objective dựa trên trung bình cộng tiến độ KRs (có nhân trọng số)
    const krs = await prisma.keyResult.findMany({
      include: { objective: true }
    });
    const objectiveIds = Array.from(new Set(krs.map(k => k.objectiveId)));

    for (const objId of objectiveIds) {
      const objKrs = krs.filter(k => k.objectiveId === objId);
      let totalWeightedProgress = 0;
      let sumWeights = 0;

      objKrs.forEach(k => {
        totalWeightedProgress += k.progress * (k.weight / 100);
        sumWeights += k.weight;
      });

      // Nếu tổng trọng số khác 100%, chuẩn hóa lại
      const finalProgress = sumWeights > 0 ? (totalWeightedProgress / (sumWeights / 100)) : 0;

      await prisma.objective.update({
        where: { id: objId },
        data: { progress: Math.round(finalProgress) },
      });
    }

    return NextResponse.json({ message: "Đồng bộ tiến độ OKRs thành công" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PUT /api/okrs - Thêm mới Objective hoặc Key Result hoặc Action
export async function PUT(request: Request) {
  try {
    const { type, data } = await request.json(); // type: "objective" | "kr" | "action"

    if (type === "objective") {
      const newObj = await prisma.objective.create({
        data: {
          unitCode: data.unitCode,
          title: data.title,
          weight: parseFloat(data.weight) || 10,
          period: data.period,
        },
      });
      return NextResponse.json(newObj);
    } 
    
    if (type === "kr") {
      const newKr = await prisma.keyResult.create({
        data: {
          objectiveId: data.objectiveId,
          title: data.title,
          weight: parseFloat(data.weight) || 10,
          pic: data.pic,
          priority: data.priority || "Medium",
          deadline: new Date(data.deadline || Date.now()),
        },
      });
      return NextResponse.json(newKr);
    }

    if (type === "action") {
      const newAct = await prisma.action.create({
        data: {
          keyResultId: data.keyResultId || null,
          unitCode: data.unitCode,
          title: data.title,
          pic: data.pic,
          startDate: new Date(data.startDate || Date.now()),
          endDate: new Date(data.endDate || Date.now()),
          isUnplanned: data.isUnplanned || false,
          origin: data.origin || "OKR",
        },
      });
      return NextResponse.json(newAct);
    }

    return NextResponse.json({ error: "Loại đối tượng không hợp lệ" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
