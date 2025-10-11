import { getServerSession } from "@/lib/get-sesstion";
import { redirect } from "next/navigation";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  const user = session?.user;

  if (user) redirect("/");

  return <>{children}</>;
}
