import { getServerSession } from "@/lib/get-sesstion";
import { redirect } from "next/navigation";

export async function requireUser(redirectTo?: string) {
  const session = await getServerSession();
  console.log(redirectTo);

  if (!session) {
    redirect(redirectTo ? `/sign-in?redirect=${redirectTo}` : "/sign-in");
  }

  return session.user;
}
