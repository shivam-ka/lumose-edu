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

interface IAppProps {
  course: CourseSidebarDataType;
}

export function CourseSidebar({ course }: IAppProps) {
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
            <span className="text-muted-foreground">4/10 lessons</span>
          </div>
          <Progress value={55} className="h-1.5" />
          <p className="text-muted-foreground text-sm">55% Complete</p>
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
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
