import { getAllCourses } from "@/app/data/course/get-all-courses";
import { Metadata } from "next";
import {
  PublicCourseCard,
  PublicCourseCardSkeleton,
} from "../_components/PublicCourseCard";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Browse Courses",
  description:
    "Explore top-quality courses crafted to boost your skills and learning journey.",
};

export default function PublicCoursePage() {
  return (
    <div className="px-12 py-5">
      <h1 className="text-3xl font-bold md:text-4xl">Browse Courses</h1>

      <p className="text-muted-foreground mt-3 max-w-xl md:text-lg">
        Discover curated courses designed to help you learn faster, grow
        smarter, and achieve your goals.
      </p>

      <Suspense fallback={<PublicCourseCardSkeleton />}>
        <RenderCourse />
      </Suspense>
    </div>
  );
}

async function RenderCourse() {
  const courses = await getAllCourses();
  return (
    <div className="grid grid-cols-1 py-5 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}
