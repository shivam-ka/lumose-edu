import "server-only";
import { requireAdmin } from "./require-admin";
import { toast } from "sonner";
import prisma from "@/lib/prisma";

export async function adminGetCourse(id: string) {
  const sesstion = await requireAdmin();
  if (!sesstion) {
    toast.error("Forbidden: Access denied");
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
    },
  });

  return data;
}

export type AdminSingleCourseType = NonNullable<
  Awaited<ReturnType<typeof adminGetCourse>>
>;
