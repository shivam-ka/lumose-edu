import { redirect } from "next/navigation";
import { cancelPayment, getPaymentStatus } from "../actions";
import { CancelPageCard } from "../_components/CancelPageCard";

export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; course?: string }>;
}) {
  const { session_id, course } = await searchParams;

  if (!session_id) {
    redirect("/");
  }

  const paymentStatus = await getPaymentStatus(session_id);

  if (paymentStatus === "INVALID") {
    redirect("/");
  } else if (paymentStatus === "CANCELLED") {
    redirect(course ? `/courses/${course}` : "/");
  }

  await cancelPayment(session_id);

  return (
    <div className="bg-muted/20 flex min-h-screen w-full items-center justify-center p-4">
      <CancelPageCard courseSlug={course} />
    </div>
  );
}
