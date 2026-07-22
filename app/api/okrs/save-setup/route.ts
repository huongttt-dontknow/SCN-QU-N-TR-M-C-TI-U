import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { unitCode, period, objectives } = await request.json();

    if (!unitCode || !period || !Array.isArray(objectives)) {
      return NextResponse.json({ error: "Thiếu thông tin unitCode, period hoặc objectives" }, { status: 400 });
    }

    // Thực hiện trong transaction
    await prisma.$transaction(async (tx) => {
      // 1. Tìm các Objective hiện tại trong DB cho unitCode và period này
      const existingObjs = await tx.objective.findMany({
        where: { unitCode, period },
        select: { id: true }
      });
      const existingObjIds = existingObjs.map(o => o.id);

      // Nhận diện danh sách ID cần giữ lại
      const keepObjIds = objectives
        .map(o => o.id)
        .filter(id => id && !id.startsWith("obj-mock") && !id.startsWith("obj-"));

      // Xóa các Objective không nằm trong danh sách giữ lại (quan hệ Cascade sẽ tự động xóa KRs và Actions con)
      const deleteObjIds = existingObjIds.filter(id => !keepObjIds.includes(id));
      if (deleteObjIds.length > 0) {
        await tx.objective.deleteMany({
          where: { id: { in: deleteObjIds } }
        });
      }

      // 2. Đồng bộ từng Objective
      for (const obj of objectives) {
        const isNewObj = !obj.id || obj.id.startsWith("obj-mock") || obj.id.startsWith("obj-");

        if (isNewObj) {
          // Tạo mới hoàn toàn Objective cùng các KRs và Actions trực thuộc
          await tx.objective.create({
            data: {
              unitCode,
              period,
              title: obj.title,
              weight: parseFloat(obj.weight) || 0,
              progress: parseFloat(obj.progress) || 0,
              aiForecastProgress: parseFloat(obj.aiForecastProgress) || 0,
              aiRiskLevel: obj.aiRiskLevel || "Thấp",
              keyResults: {
                create: (obj.keyResults || []).map((kr: any) => ({
                  title: kr.title,
                  weight: parseFloat(kr.weight) || 0,
                  progress: parseFloat(kr.progress) || 0,
                  priority: kr.priority || "Medium",
                  pic: kr.pic || "",
                  deadline: new Date(kr.deadline || Date.now()),
                  actions: {
                    create: (kr.actions || []).map((act: any) => ({
                      unitCode,
                      title: act.title,
                      pic: act.pic || "",
                      startDate: new Date(act.startDate || Date.now()),
                      endDate: new Date(act.endDate || Date.now()),
                      progress: parseFloat(act.progress) || 0,
                      status: act.status || "Chưa thực hiện",
                      notes: act.notes || "",
                      isUnplanned: act.isUnplanned || false,
                      origin: act.origin || "OKR"
                    }))
                  }
                }))
              }
            }
          });
        } else {
          // Cập nhật Objective đã có
          await tx.objective.update({
            where: { id: obj.id },
            data: {
              title: obj.title,
              weight: parseFloat(obj.weight) || 0,
              progress: parseFloat(obj.progress) || 0,
            }
          });

          // Tìm KRs hiện tại của Objective này
          const existingKrs = await tx.keyResult.findMany({
            where: { objectiveId: obj.id },
            select: { id: true }
          });
          const existingKrIds = existingKrs.map(k => k.id);

          const keepKrIds = (obj.keyResults || [])
            .map((k: any) => k.id)
            .filter((id: string) => id && !id.startsWith("kr-mock") && !id.startsWith("kr-"));

          // Xóa các KR không giữ lại
          const deleteKrIds = existingKrIds.filter(id => !keepKrIds.includes(id));
          if (deleteKrIds.length > 0) {
            await tx.keyResult.deleteMany({
              where: { id: { in: deleteKrIds } }
            });
          }

          // Đồng bộ từng KR
          for (const kr of (obj.keyResults || [])) {
            const isNewKr = !kr.id || kr.id.startsWith("kr-mock") || kr.id.startsWith("kr-");

            if (isNewKr) {
              await tx.keyResult.create({
                data: {
                  objectiveId: obj.id,
                  title: kr.title,
                  weight: parseFloat(kr.weight) || 0,
                  progress: parseFloat(kr.progress) || 0,
                  priority: kr.priority || "Medium",
                  pic: kr.pic || "",
                  deadline: new Date(kr.deadline || Date.now()),
                  actions: {
                    create: (kr.actions || []).map((act: any) => ({
                      unitCode,
                      title: act.title,
                      pic: act.pic || "",
                      startDate: new Date(act.startDate || Date.now()),
                      endDate: new Date(act.endDate || Date.now()),
                      progress: parseFloat(act.progress) || 0,
                      status: act.status || "Chưa thực hiện",
                      notes: act.notes || "",
                      isUnplanned: act.isUnplanned || false,
                      origin: act.origin || "OKR"
                    }))
                  }
                }
              });
            } else {
              // Cập nhật KR
              await tx.keyResult.update({
                where: { id: kr.id },
                data: {
                  title: kr.title,
                  weight: parseFloat(kr.weight) || 0,
                  progress: parseFloat(kr.progress) || 0,
                  priority: kr.priority || "Medium",
                  pic: kr.pic || "",
                  deadline: new Date(kr.deadline || Date.now()),
                }
              });

              // Tìm Actions hiện tại của KR này
              const existingActs = await tx.action.findMany({
                where: { keyResultId: kr.id },
                select: { id: true }
              });
              const existingActIds = existingActs.map(a => a.id);

              const keepActIds = (kr.actions || [])
                .map((a: any) => a.id)
                .filter((id: string) => id && !id.startsWith("act-mock") && !id.startsWith("act-"));

              // Xóa Actions không giữ lại
              const deleteActIds = existingActIds.filter(id => !keepActIds.includes(id));
              if (deleteActIds.length > 0) {
                await tx.action.deleteMany({
                  where: { id: { in: deleteActIds } }
                });
              }

              // Đồng bộ Actions
              for (const act of (kr.actions || [])) {
                const isNewAct = !act.id || act.id.startsWith("act-mock") || act.id.startsWith("act-");

                if (isNewAct) {
                  await tx.action.create({
                    data: {
                      keyResultId: kr.id,
                      unitCode,
                      title: act.title,
                      pic: act.pic || "",
                      startDate: new Date(act.startDate || Date.now()),
                      endDate: new Date(act.endDate || Date.now()),
                      progress: parseFloat(act.progress) || 0,
                      status: act.status || "Chưa thực hiện",
                      notes: act.notes || "",
                      isUnplanned: act.isUnplanned || false,
                      origin: act.origin || "OKR"
                    }
                  });
                } else {
                  await tx.action.update({
                    where: { id: act.id },
                    data: {
                      title: act.title,
                      pic: act.pic || "",
                      startDate: new Date(act.startDate || Date.now()),
                      endDate: new Date(act.endDate || Date.now()),
                      progress: parseFloat(act.progress) || 0,
                      status: act.status || "Chưa thực hiện",
                      notes: act.notes || "",
                    }
                  });
                }
              }
            }
          }
        }
      }
    });

    return NextResponse.json({ message: "Lưu thiết lập OKRs phiên làm việc thành công" });
  } catch (error: any) {
    console.error("Save OKR error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
