"use client";

import { ArrowRightIcon } from "lucide-react";
import { useTransition } from "react";
import { enrollingCourseAction } from "../actions";
import { toast } from "sonner";
import { LoadingButton } from "@/components/loading-btn";

export function EnrollmentButton({
  courseId,
  redirectTo,
}: {
  courseId: string;
  redirectTo?: string;
}) {
  const [isPending, startTransition] = useTransition();

  async function onSubmit() {
    startTransition(async () => {
      const data = await enrollingCourseAction(courseId, redirectTo);

      if (data.status === "success") {
        toast.success(data.message);
      } else if (data.status === "error") {
        toast.error(data.message);
      }
    });
  }

  return (
    <LoadingButton
      loading={isPending}
      className="w-full rounded-sm"
      onClick={onSubmit}
    >
      Enroll Now
      <ArrowRightIcon />
    </LoadingButton>
  );
}
