"use server";
import { ApiResponse } from "@/lib/types";
import { stripe } from "@/lib/stripe";
import { requireUser } from "../data/user/require-user";

export async function getPaymentStatus(
  sessionId: string,
): Promise<"SUCCESS" | "CANCELLED" | "PENDING" | "INVALID"> {
  const user = await requireUser();
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) return "INVALID";

    if (user.id !== session.metadata?.userId) {
      return "INVALID";
    }

    if (session.payment_status === "paid") {
      return "SUCCESS";
    }

    if (session.status === "expired") {
      return "CANCELLED";
    }

    return "PENDING";
  } catch (error) {
    console.error("get Payment Status Error:", error);
    return "INVALID";
  }
}

export async function cancelPayment(sessionId: string): Promise<ApiResponse> {
  if (!sessionId) {
    return {
      status: "error",
      message: "session Id not found",
    };
  }

  try {
    await stripe.checkout.sessions.expire(sessionId);

    return {
      status: "success",
      message: "payment canceled successfully",
    };
  } catch (error) {
    console.error("cancel payment error: ", error);
    return {
      status: "error",
      message: "faild to cancel payment",
    };
  }
}
