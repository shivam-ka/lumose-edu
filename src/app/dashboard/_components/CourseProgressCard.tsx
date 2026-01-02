"use client";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useConstructUrl } from "@/hooks/use-construct";
import { ArrowRightIcon, SchoolIcon, TimerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnrolledCourseType } from "@/app/data/user/get-enrolled-courses";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { Progress } from "@/components/ui/progress";

interface IAppProps {
  data: EnrolledCourseType;
}

export function CourseProgressCard({ data }: IAppProps) {
  const { totalLessons, completedLessons, progressPercentage } =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    useCourseProgress({ courseData: data as any });
  return (
    <Card className="relative gap-1 p-2">
      <Image
        width={600}
        height={400}
        src={useConstructUrl(data.fileKey)}
        alt={data.title || "Course Thumbnail"}
        className="aspect-video w-full rounded-t-lg object-cover"
        draggable={false}
      />

      <CardContent className="flex flex-1 flex-col justify-between gap-2 p-2">
        <div>
          <Link
            href={`/dashboard/${data.slug}`}
            className="hover:text-primary line-clamp-2 h-14 text-lg font-semibold transition-colors hover:underline"
            title={data.title}
          >
            {data.title}
          </Link>

          {data.smallDescription && (
            <p className="text-muted-foreground mt-1 line-clamp-2 h-10 text-sm leading-snug">
              {data.smallDescription}
            </p>
          )}

          <div className="text-muted-foreground mt-3 flex flex-wrap gap-4 text-sm">
            {data.duration && (
              <div className="flex items-center gap-1">
                <TimerIcon className="text-primary/80 bg-primary/10 h-5 w-5 rounded p-1" />
                <span>{data.duration}h</span>
              </div>
            )}
            {data.level && (
              <div className="flex items-center gap-1">
                <SchoolIcon className="text-primary/80 bg-primary/10 h-5 w-5 rounded p-1" />
                <span>{data.level}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-1">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Progress</span>
              {progressPercentage}%
            </div>
            <Progress value={progressPercentage} className="h-1.5" />
            <p className="text-muted-foreground text-sm">
              <span className="text-muted-foreground">
                {completedLessons}/{totalLessons} lessons
              </span>{" "}
              Completed
            </p>
          </div>
        </div>

        <Button asChild className="mt-4 w-full">
          <Link href={`/dashboard/${data.slug}`}>
            Watch Now <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
