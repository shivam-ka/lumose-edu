import "server-only";
import { requireAdmin } from "./require-admin";
import prisma from "@/lib/prisma";

export async function adminGetCourse(id: string) {
  const sesstion = await requireAdmin();
  if (!sesstion) {
    return;
  }

  const data = await prisma.course.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      smallDescription: true,
      duration: true,
      category: true,
      price: true,
      level: true,
      status: true,
      fileKey: true,
      slug: true,
      chapter: {
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            select: {
              id: true,
              title: true,
              description: true,
              thumbnailKey: true,
              position: true,
              videoKey: true,
            },
            orderBy: {
              position: "asc",
            },
          },
        },
      },
    },
  });

  return data;
}

export type AdminSingleCourseType = NonNullable<
  Awaited<ReturnType<typeof adminGetCourse>>
>;
