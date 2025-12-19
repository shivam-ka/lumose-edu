import { env } from "@/env";
import prisma from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();

  const headersList = await headers();

  const signature = headersList.get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error) {
    console.error("Stripe Webhook error: ", error);
    return new Response("Webhook Error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const courseId = session.metadata?.courseId;
    const customerId = session.customer as string;

    if (!courseId) {
      throw new Error("course id not found");
    }

    const user = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    await prisma.enrollment.update({
      where: {
        id: session.metadata?.enrollmentId,
      },
      data: {
        userId: user.id,
        courseId,
        amount: session.amount_total as number,
        status: "Active",
      },
    });
  }

  if (event.type === "checkout.session.async_payment_succeeded") {
    console.log("payment cancel");
  }

  return new Response(null, { status: 200 });
}
