import { Button } from "@/components/ui/button";
import { IconCircleDashedPlus } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Courses",
};

export default function Page() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl">Your Courses</h1>
        <Button asChild>
          <Link href="/admin/courses/create">
            <IconCircleDashedPlus />
            Create Course
          </Link>
        </Button>
      </div>
      <div></div>
    </>
  );
}
