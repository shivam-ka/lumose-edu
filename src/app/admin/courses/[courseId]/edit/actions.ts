"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/validation";
import { revalidatePath } from "next/cache";

export async function editCourse(
  data: CourseSchemaType,
  courseId: string,
): Promise<ApiResponse> {
  const sesstion = await requireAdmin();
  const user = sesstion?.user;

  if (!user) {
    return {
      status: "error",
      message: "unauthorized request",
    };
  }

  try {
    const result = courseSchema.safeParse(data);

    if (!result.success) {
      return {
        status: "error",
        message: "Invalid Data",
      };
    }

    await prisma.course.update({
      where: {
        id: courseId,
        userId: user.id,
      },
      data: {
        ...result.data,
      },
    });

    return {
      status: "success",
      message: "Course Updated Successfully",
    };
  } catch (error) {
    console.log("update course error:", error);
    return {
      status: "error",
      message: "Faild to update course",
    };
  }
}

export async function reorderLessons(
  chapterId: string,
  lessons: { id: string; position: number }[],
  courseId: string,
): Promise<ApiResponse> {
  if (!lessons || !lessons.length) {
    return {
      status: "error",
      message: "provide lessons for reordering",
    };
  }

  const sesstion = await requireAdmin();
  const user = sesstion?.user;

  if (!user) {
    return {
      status: "error",
      message: "unauthorized request",
    };
  }

  try {
    const updates = lessons.map((lesson) =>
      prisma.lesson.update({
        where: {
          id: lesson.id,
          chapterId,
        },
        data: {
          position: lesson.position,
        },
      }),
    );

    await prisma.$transaction(updates);

    revalidatePath(`admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Lessons reordered successfully",
    };
  } catch (error) {
    console.error("reorderLessons", error);
    return {
      status: "error",
      message: "Failed to reorder lesson",
    };
  }
}
