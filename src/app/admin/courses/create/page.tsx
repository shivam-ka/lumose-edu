import { Button } from "@/components/ui/button";
import { IconArrowNarrowLeftDashed } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import CourseForm from "./courseForm";

export const metadata: Metadata = {
  title: "Create New Course",
};

export default function Page() {

  return (
    <>
      <div className="flex items-center gap-4 pb-4">
        <Button asChild variant="outline" size="icon" className="group">
          <Link href="/admin/courses">
            <IconArrowNarrowLeftDashed className="size-5 transition-all group-active:scale-90 md:size-6" />
          </Link>
        </Button>

        <h1 className="text-xl font-semibold tracking-wide md:text-2xl">
          Create Course
        </h1>
      </div>
      <CourseForm />
    </>
  );
}
