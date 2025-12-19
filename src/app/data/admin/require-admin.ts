import "server-only";

import { getServerSession } from "@/lib/get-sesstion";
import { redirect } from "next/navigation";
import { cache } from "react";

export const requireAdmin = cache(async () => {
  const session = await getServerSession();

  if (session?.user.role !== "admin") {
    redirect("/");
  }

  return session;
});
