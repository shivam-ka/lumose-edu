import "server-only";

import { getServerSession } from "@/lib/get-sesstion";

export async function requireAdmin() {
  const session = await getServerSession();

  if (!session) {
    return null;
  }

  if (session.user.role !== "admin") {
    return null;
  }

  return session;
}
