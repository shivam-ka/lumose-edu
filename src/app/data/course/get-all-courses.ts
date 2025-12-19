import "server-only";
import prisma from "@/lib/prisma";

export async function getAllCourses() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      price: true,
      slug: true,
      fileKey: true,
      level: true,
      duration: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return data;
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];
