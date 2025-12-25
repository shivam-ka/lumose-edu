import "server-only";
import { requireUser } from "../user/require-user";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getCourseSidebarData(slug: string) {
  const user = await requireUser();

  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      title: true,
      slug: true,
      fileKey: true,
      level: true,
      duration: true,
      category: true,
      chapter: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              title: true,
              position: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!course) {
    return notFound();
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        courseId: course.id,
        userId: user.id,
      },
    },
    select: {
      id: true,
      status: true,
    },
  });

  if (!enrollment || enrollment.status !== "Active") {
    return notFound();
  }

  return course;
}

export type CourseSidebarDataType = Awaited<
  ReturnType<typeof getCourseSidebarData>
>;
