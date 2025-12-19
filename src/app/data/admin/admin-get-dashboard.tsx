import "server-only";
import { requireAdmin } from "./require-admin";
import prisma from "@/lib/prisma";

export async function adminGetDashboardStatus() {
  await requireAdmin();

  const [totalSignUp, totalCustomer, totalCourse, totalLesson] =
    await Promise.all([
      prisma.user.count(),

      prisma.user.count({
        where: {
          enrollment: {
            some: {},
          },
        },
      }),

      prisma.course.count(),

      prisma.lesson.count(),
    ]);

  return {
    totalSignUp,
    totalCustomer,
    totalCourse,
    totalLesson,
  };
}
