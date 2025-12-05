import { AdminCourseType } from "@/app/data/admin/admin-get-courses";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { useConstructUrl } from "@/hooks/use-construct";
import {
  ArrowRightIcon,
  EyeIcon,
  MoreVerticalIcon,
  PencilIcon,
  SchoolIcon,
  TimerIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface IAppProps {
  data: AdminCourseType;
}

export function AdminCourseCard({ data }: IAppProps) {
  const thumbnailUrl = useConstructUrl(data.fileKey);

  return (
    <Card className="group relative gap-1 p-2">
      <div className="absolute top-3 right-3 z-10">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <MoreVerticalIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 p-2">
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/edit`}>
                <PencilIcon />
                Edit
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href={`/courses/${data.slug}`}>
                <EyeIcon />
                Preview
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/admin/courses/${data.id}/delete`}>
                <Trash2Icon className="text-destructive" />
                Delete Course
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Image
        width={600}
        height={400}
        src={thumbnailUrl}
        alt={data.title || "Course Thumbnail"}
        className="aspect-video w-full rounded-t-lg object-cover"
      />

      <CardContent className="flex flex-1 flex-col justify-between gap-2 p-2">
        <div>
          <Link
            href={`/admin/courses/${data.id}/edit`}
            className="hover:text-primary line-clamp-2 h-14 text-lg font-semibold transition-colors hover:underline"
          >
            {data.title}
          </Link>

          <p className="text-muted-foreground mt-1 line-clamp-2 h-10 text-sm leading-snug">
            {data.smallDescription || "No Description"}
          </p>

          <div className="mt-3 flex gap-4 text-sm text-gray-600 dark:text-gray-300">
            {data.duration && (
              <div className="flex items-center gap-1">
                <TimerIcon className="text-primary/80 bg-primary/10 h-5 w-5 rounded p-1" />
                <span>{data.duration}</span>
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
          <Link
            href={`/admin/courses/${data.id}/edit`}
            className="flex items-center justify-center gap-2"
          >
            Edit Course <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export function AdminCourseCardSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-lg md:text-xl">Your Courses</h1>
      </div>
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="group relative gap-2 p-2">
            <div>
              <Skeleton className="h-52 rounded-sm" />
            </div>
            <CardContent className="flex flex-1 flex-col justify-between gap-2 p-2">
              <Skeleton className="h-6 w-11/12" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-10 mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
