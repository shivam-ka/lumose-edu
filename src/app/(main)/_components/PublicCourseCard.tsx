import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicCourseType } from "@/app/data/course/get-all-courses";
import { useConstructUrl } from "@/hooks/use-construct";
import {
  ArrowRightIcon,
  KanbanIcon,
  SchoolIcon,
  TimerIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface IAppProps {
  data: PublicCourseType;
}

export function PublicCourseCard({ data }: IAppProps) {
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

      <Badge className="absolute top-4 right-4" variant="secondary">
        <KanbanIcon />
        {data.level}
      </Badge>

      <CardContent className="flex flex-1 flex-col justify-between gap-2 p-2">
        <div>
          <Link
            href={`/courses/${data.slug}`}
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
            {data.category && (
              <div className="flex items-center gap-1">
                <SchoolIcon className="text-primary/80 bg-primary/10 h-5 w-5 rounded p-1" />
                <span>{data.category}</span>
              </div>
            )}

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

        <Button asChild className="mt-4 w-full">
          <Link href={`/courses/${data.slug}`}>
            Learn More <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function PublicCourseCardSkeleton() {
  return (
    <div className="grid grid-cols-1 py-5 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <Card key={index} className="group relative gap-2 p-2">
          <Skeleton className="h-48 rounded-sm" />

          <CardContent className="flex flex-1 flex-col justify-between gap-2 p-2">
            <Skeleton className="h-6 w-11/12" />
            <Skeleton className="h-5 w-3/4" />
            <div className="flex gap-5">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="mt-2 h-10" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
