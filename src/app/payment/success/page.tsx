import { redirect } from "next/navigation";
import { SuccessPageCard } from "../_components/SuccessPageCard";
import { getPaymentStatus } from "../actions";

export default async function PaymentSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  const paymentStatus = await getPaymentStatus(session_id);

  if (paymentStatus !== "SUCCESS") {
    redirect("/");
  }

  return (
    <div className="bg-muted/20 flex min-h-screen w-full items-center justify-center p-4">
      <SuccessPageCard />
    </div>
  );
}
