import "server-only";
import prisma from "@/lib/prisma";

export async function getAllCourses() {
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
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

export async function getLatestCourses() {
  const data = await prisma.course.findMany({
    where: {
      status: "Published",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      slug: true,
      fileKey: true,
      level: true,
      duration: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });

  return data;
}

export type PublicCourseType = Awaited<ReturnType<typeof getAllCourses>>[0];
