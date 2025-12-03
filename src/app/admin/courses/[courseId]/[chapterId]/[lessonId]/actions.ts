"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { lessonSchema, LessonSchemaType } from "@/lib/validation";

export async function updateLesson(
  values: LessonSchemaType,
  lessonId: string,
): Promise<ApiResponse> {
  await requireAdmin();

  try {
    const { success, data } = lessonSchema.safeParse(values);

    if (!success) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    await prisma.lesson.update({
      where: {
        id: lessonId,
      },
      data: {
        title: data.name,
        description: data.description,
        thumbnailKey: data.thumbnailKey,
        videoKey: data.videoKey,
      },
    });

    return {
      status: "success",
      message: "Lesson updated successfully",
    };
  } catch (error) {
    console.log("update Lesson", error);
    return {
      status: "error",
      message: "Failed to update lesson",
    };
  }
}
