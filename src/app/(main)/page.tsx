import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GraduationCapIcon, LockKeyholeOpenIcon } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import {
  PublicCourseCard,
  PublicCourseCardSkeleton,
} from "./_components/PublicCourseCard";
import { getLatestCourses } from "../data/course/get-all-courses";

export default function Home() {
  return (
    <>
      <section className="from-background to-muted/60 relative flex min-h-[90vh] flex-col items-center justify-center bg-gradient-to-b px-4 text-center md:px-12 lg:px-24">
        <div className="max-w-3xl space-y-6">
          <Badge
            variant="secondary"
            className="border-border gap-2 border-1 px-4 py-1 text-sm"
          >
            <LockKeyholeOpenIcon />
            Unlock Knowledge
          </Badge>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            Unlock Knowledge,{" "}
            <span className="text-primary">
              Elevate Your Learning Experience
            </span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl">
            Advance your skills, explore emerging technologies, and stay ahead
            of the curve with our expertly curated learning resources and tools.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/dashboard">Get Started</Link>
            </Button>

            <Button variant="outline" size="lg" asChild>
              <Link href="/courses">
                <GraduationCapIcon />
                Browse Courses
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <div className="from-background to-muted/60 bg-gradient-to-t px-4 py-4 md:px-12 md:py-5">
        <h2 className="text-3xl font-bold md:text-4xl">Newest Courses</h2>
        <p className="text-muted-foreground mt-2 max-w-xl text-sm md:text-lg">
          Explore our most recent courses, carefully crafted to keep your skills
          up to date.
        </p>

        <Suspense fallback={<PublicCourseCardSkeleton />}>
          <RenderCourse />
        </Suspense>
      </div>
    </>
  );
}

async function RenderCourse() {
  const courses = await getLatestCourses();
  return (
    <div className="grid grid-cols-1 gap-5 py-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {courses.map((course) => (
        <PublicCourseCard key={course.id} data={course} />
      ))}
    </div>
  );
}
