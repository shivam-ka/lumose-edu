import prisma from "@/lib/prisma";
import { requireAdmin } from "./require-admin";

export async function adminGetEnrollmentStatus() {
  await requireAdmin();

  const thirtyDayAgo = new Date();

  thirtyDayAgo.setDate(thirtyDayAgo.getDate() - 30);

  const enrollments = await prisma.enrollment.findMany({
    where: {
      createdAt: {
        gte: thirtyDayAgo, // get: greaterThan or equalTo
      },
    },
    select: {
      createdAt: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const last30Days: { date: string; enrollments: number }[] = [];

  for (let i = 29; i >= 0; i--) {
    const date = new Date();

    date.setDate(date.getDate() - i);

    last30Days.push({
      date: date.toISOString().split("T")[0], // yyyy-mm-dd
      enrollments: 0,
    });
  }

  enrollments.forEach((enrollment) => {
    const enrollmentDate = enrollment.createdAt.toISOString().split("T")[0];
    const dayIndex = last30Days.findIndex((day) => day.date === enrollmentDate);

    if (dayIndex !== -1) {
      last30Days[dayIndex].enrollments++;
    }
  });

  return last30Days;
}
