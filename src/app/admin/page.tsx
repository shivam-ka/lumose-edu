import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { adminGetEnrollmentStatus } from "../data/admin/admin-get-enrollment-status";

export default async function Page() {
  const enrollmentData = await adminGetEnrollmentStatus();

  return (
    <>
      <SectionCards />
      <ChartAreaInteractive data={enrollmentData} />
    </>
  );
}
