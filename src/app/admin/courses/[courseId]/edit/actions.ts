"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import {
  chapterSchema,
  ChapterSchemaType,
  courseSchema,
  CourseSchemaType,
  lessonSchema,
  LessonSchemaType,
} from "@/lib/validation";
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
    console.error("reorder Lessons Erros:", error);
    return {
      status: "error",
      message: "Failed to reorder lesson",
    };
  }
}

export async function reorderChapters(
  courseId: string,
  chapters: {
    id: string;
    position: number;
  }[],
): Promise<ApiResponse> {
  if (!chapters || !chapters.length) {
    return {
      status: "error",
      message: "provide chapters for reordering",
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
    const updates = chapters.map((chapter) =>
      prisma.chapter.update({
        where: {
          id: chapter.id,
          courseId: courseId,
        },
        data: {
          position: chapter.position,
        },
      }),
    );

    await prisma.$transaction(updates);

    revalidatePath(`admin/courses/${courseId}/edit`);

    return {
      status: "success",
      message: "Chapter reordered successfully",
    };
  } catch (error) {
    console.error("reorder Chapters Error:", error);
    return {
      status: "error",
      message: "Failed to reorder lesson",
    };
  }
}

export async function createChapter(
  values: ChapterSchemaType,
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
    const result = chapterSchema.safeParse(values);

    if (result.error) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    await prisma.$transaction(async (tx) => {
      const maxPosition = await tx.chapter.findFirst({
        where: {
          courseId: result.data.courseId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });

      await tx.chapter.create({
        data: {
          courseId: result.data.courseId,
          title: result.data.name,
          position: (maxPosition?.position ?? 0) + 1,
        },
      });
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return {
      status: "success",
      message: "Chapter Created Successfully",
    };
  } catch (error) {
    console.error("Create Chapters Error:", error);
    return {
      status: "error",
      message: "Failed to create chapter",
    };
  }
}

export async function createLesson(
  values: LessonSchemaType,
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
    const result = lessonSchema.safeParse(values);

    if (result.error) {
      return {
        status: "error",
        message: "Invalid data",
      };
    }

    await prisma.$transaction(async (tx) => {
      const maxPosition = await tx.lesson.findFirst({
        where: {
          chapterId: result.data.chapterId,
        },
        select: {
          position: true,
        },
        orderBy: {
          position: "desc",
        },
      });

      await tx.lesson.create({
        data: {
          title: result.data.name,
          description: result.data.description,
          thumbnailKey: result.data.thumbnailKey,
          videoKey: result.data.videoKey,
          chapterId: result.data.chapterId,
          position: (maxPosition?.position ?? 0) + 1,
        },
      });
    });

    revalidatePath(`/admin/courses/${result.data.courseId}/edit`);

    return {
      status: "success",
      message: "Lesson Created Successfully",
    };
  } catch (error) {
    console.error("Create Lesson Error:", error);
    return {
      status: "error",
      message: "Failed to Create lesson",
    };
  }
}
