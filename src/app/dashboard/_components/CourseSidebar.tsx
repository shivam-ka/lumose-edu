"use client";
import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { IconChevronRight, IconPlayerPlayFilled } from "@tabler/icons-react";
import { LessonItem } from "./LessonItem";
import { usePathname } from "next/navigation";
import { useCourseProgress } from "@/hooks/use-course-progress";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronsRightIcon } from "lucide-react";

interface IAppProps {
  course: CourseSidebarDataType;
}

export function CourseSidebar({ course }: IAppProps) {
  const pathName = usePathname();
  const currentLessonId = pathName.split("/").pop();

  const { totalLessons, completedLessons, progressPercentage } =
    useCourseProgress({ courseData: course });

  return (
    <div className="flex h-full flex-col pb-5">
      <div className="border-border border-b pr-4 pb-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="bg-primary/50 flex size-9 items-center justify-center rounded-full p-2">
            <IconPlayerPlayFilled className="!size-5" />
          </div>

          <div>
            <h1 className="line-clamp-1" title={course.title}>
              {course.title}
            </h1>
            <p className="text-muted-foreground line-clamp-1 text-sm">
              {course.category}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Progress</span>
            <span className="text-muted-foreground">
              {completedLessons}/{totalLessons} lessons
            </span>
          </div>
          <Progress value={progressPercentage} className="h-1.5" />
          <p className="text-muted-foreground text-sm">
            {progressPercentage}% Completed
          </p>
        </div>
      </div>

      <div className="space-y-3 py-4 pr-4">
        {course.chapter.map((chapter, index) => (
          <Collapsible key={chapter.id} defaultOpen={index === 0}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="h-auto w-full rounded-sm">
                <div>
                  <IconChevronRight className="size-4" />
                </div>
                <div className="ml-1 min-w-0 flex-1 text-left">
                  <p className="line-clamp-1">
                    {chapter.position}.
                    <span className="ml-2">{chapter.title}</span>
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {chapter.lessons.length} Lessons
                  </p>
                </div>
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="border-foreground/30 mt-3 space-y-3 border-l pl-3">
              {chapter.lessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  slug={course.slug}
                  isActive={lesson.id === currentLessonId}
                  complete={
                    lesson.lessonProgress.find(
                      (item) => item.lessonId === lesson.id,
                    )?.completed || false
                  }
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}

export function RenderSidebar({ course }: { course: CourseSidebarDataType }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-5 left-5 z-50"
          >
            <ChevronsRightIcon className="size-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle></SheetTitle>
          <div className="w-full min-w-[250px] shrink-0 py-5 pl-4">
            <CourseSidebar course={course} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="border-border w-1/4 min-w-[250px] shrink-0 border-r-2">
      <CourseSidebar course={course} />
    </div>
  );
}
