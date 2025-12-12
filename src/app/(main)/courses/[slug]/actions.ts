"use server";
import { requireUser } from "@/app/data/user/require-user";
import { env } from "@/env";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { ApiResponse } from "@/lib/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function enrollingCourseAction(
  courseId: string,
  redirectTo?: string,
): Promise<ApiResponse | never> {
  const user = await requireUser(redirectTo);

  let checkoutUrl: string;

  try {
    const course = await prisma.course.findUnique({
      where: {
        id: courseId,
      },
      select: {
        id: true,
        title: true,
        price: true,
        slug: true,
      },
    });

    if (!course) {
      return {
        status: "error",
        message: "course not found",
      };
    }

    let stripeCustomerId: string;
    const userWithStripeCustomerId = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    // creating stripe customer id
    if (userWithStripeCustomerId?.stripeCustomerId) {
      stripeCustomerId = userWithStripeCustomerId.stripeCustomerId;
    } else {
      const customer = await stripe.customers.create({
        email: user.email,
        name: user.name,
        metadata: {
          userId: user.id,
        },
      });

      stripeCustomerId = customer.id;

      await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          stripeCustomerId,
        },
      });
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingEnrollment = await tx.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: course.id,
          },
        },
        select: {
          id: true,
          status: true,
        },
      });

      if (existingEnrollment?.status === "Active") {
        return {
          status: "success",
          message: "You are already enrolled in the course",
        };
      }

      let enrollment;

      if (existingEnrollment) {
        enrollment = await tx.enrollment.update({
          where: {
            id: existingEnrollment.id,
          },
          data: {
            amount: course.price,
            status: "Pending",
          },
        });
      } else {
        enrollment = await tx.enrollment.create({
          data: {
            userId: user.id,
            courseId: course.id,
            amount: course.price,
            status: "Pending",
          },
          select: {
            id: true,
          },
        });
      }

      const checkoutSession = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: [
          {
            price: "",
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/payment/success`,
        cancel_url: `${env.NEXT_PUBLIC_BETTER_AUTH_URL}/payment/cancel`,
        metadata: {
          userId: user.id,
          enrollmentId: enrollment.id,
          courseId: course.id,
        },
      });

      return {
        enrollment: enrollment,
        checkoutUrl: checkoutSession.url,
      };
    });

    checkoutUrl = result.checkoutUrl as string;
  } catch (error) {
    if (error instanceof Stripe.errors.StripeError) {
      console.error(error);
      return {
        status: "error",
        message: "Payment system error. please try again later",
      };
    }

    return {
      status: "error",
      message: "faild to enroll course",
    };
  }

  redirect(checkoutUrl);
}
