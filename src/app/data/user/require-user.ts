import "server-only";
import { getServerSession } from "@/lib/get-sesstion";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireUser = cache(async (redirectTo?: string) => {
  const session = await getServerSession();

  if (!session) {
    redirect(redirectTo ? `/sign-in?redirect=${redirectTo}` : "/sign-in");
  }

  return session.user;
});
