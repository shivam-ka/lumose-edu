"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tryCatch } from "@/hooks/try-catch";
import Link from "next/link";
import { useTransition } from "react";
import { deleteCourse } from "./actions";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { LoadingButton } from "@/components/loading-btn";

export default function Page() {
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();

  const [isPending, startTransition] = useTransition();

  function onSubmit() {
    startTransition(async () => {
      const { data, error } = await tryCatch(deleteCourse(courseId));

      if (error) {
        console.error(error);
        toast.error("failed to delete course");
      }

      if (data?.status === "success") {
        toast.success(data.message);
        router.push("/admin/courses");
      } else if (data?.status === "error") {
        toast.error(data.message);
      }
    });
  }

  return (
    <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center">
      <Card className="min-w-md">
        <CardHeader>
          <CardTitle>Are you sure you want to delete this course?</CardTitle>
          <CardDescription>
            This action cannot be undone. All chapters and lessons will be
            permanently deleted.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end gap-2">
          <Button asChild variant="outline" disabled={isPending}>
            <Link href="/admin/courses">Cancel</Link>
          </Button>
          <LoadingButton
            variant="destructive"
            loadingText="Deleting..."
            loading={isPending}
            onClick={onSubmit}
          >
            Delete
          </LoadingButton>
        </CardContent>
      </Card>
    </div>
  );
}
