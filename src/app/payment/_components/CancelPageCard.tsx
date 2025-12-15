"use client";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export function CancelPageCard({ courseSlug }: { courseSlug?: string }) {
  const router = useRouter();
  return (
    <Card className="w-full max-w-sm rounded-2xl p-4 shadow-lg">
      <CardContent className="space-y-3 px-3 text-center">
        <div className="mx-auto mt-5 w-fit rounded-full bg-red-200 p-3 dark:bg-red-950/80">
          <XIcon className="size-14 text-red-500" />
        </div>
        <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
        <CardDescription>
          Your payment was not completed. You can try again anytime.
        </CardDescription>
        <Button
          className="w-full"
          variant="outline"
          onClick={() =>
            router.replace(courseSlug ? `/courses/${courseSlug}` : "/courses")
          }
        >
          Go to Course
          <ArrowRightIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
