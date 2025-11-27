import "server-only";
import prisma from "@/lib/prisma";
import { requireAdmin } from "./require-admin";

export async function adminGetcourses() {
  const sesstion = await requireAdmin();
  if (!sesstion) {
    return;
  }

  const data = await prisma.course.findMany({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      price: true,
      level: true,
      status: true,
      fileKey: true,
      slug: true,
    },
  });

  return data;
}

export type AdminCourseType = NonNullable<
  Awaited<ReturnType<typeof adminGetcourses>>
>[0];
