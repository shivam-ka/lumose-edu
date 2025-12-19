import "server-only";
import { getServerSession } from "@/lib/get-sesstion";
import prisma from "@/lib/prisma";

export async function checkIfCourseBougth(courseId: string): Promise<boolean> {
  const session = await getServerSession();

  if (!session?.user) return false;

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.user.id,
        courseId,
      },
    },
    select: {
      status: true,
    },
  });

  return enrollment?.status === "Active";
}
