import { adminGetcourses } from "@/app/data/admin/admin-get-courses";
import { Button } from "@/components/ui/button";
import { IconCircleDashedPlus } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { AdminCourseCard } from "./_components/AdminCourseCard";

export const metadata: Metadata = {
  title: "Courses",
};

export default async function Page() {
  const data = await adminGetcourses();

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
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {data?.map((course) => (
          <AdminCourseCard key={course.id} data={course} />
        ))}
      </div>
    </>
  );
}
