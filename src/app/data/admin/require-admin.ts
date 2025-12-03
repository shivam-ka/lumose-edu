import "server-only";

import { getServerSession } from "@/lib/get-sesstion";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const session = await getServerSession();

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return session;
}
