"use server";

import { requireAdmin } from "@/app/data/admin/require-admin";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
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

    const stripeProduct = await stripe.products.create({
      name: validation.data.title,
      description: validation.data.smallDescription,
      default_price_data: {
        currency: "inr",
        unit_amount: validation.data.price * 100,
      },
    });

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: user.id,
        stripePriceId: stripeProduct.default_price as string,
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
