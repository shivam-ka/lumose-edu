"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { ApiResponse } from "@/lib/types";
import { courseSchema, CourseSchemaType } from "@/lib/validation";

export async function CreateCourse(
  data: CourseSchemaType,
): Promise<ApiResponse> {
  try {
    const sesstion = await requireAdmin();
    const user = sesstion?.user;

    if (!user) {
      return {
        status: "error",
        message: "unauthorized request",
      };
    }

    const validation = courseSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid Form Data",
      };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: user.id,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.log("CreateCourse", error);
    return {
      status: "error",
      message: "Failed to create course",
    };
  }
}
