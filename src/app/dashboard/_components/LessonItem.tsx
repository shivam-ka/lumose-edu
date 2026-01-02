import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { IconCheck, IconPlayerPlayFilled } from "@tabler/icons-react";
import Link from "next/link";

interface IAppProps {
  lesson: {
    title: string;
    id: string;
    description: string | null;
    position: number;
  };
  slug: string;
  isActive?: boolean;
  complete: boolean;
}

export function LessonItem({ lesson, slug, isActive, complete }: IAppProps) {
  return (
    <Button
      asChild
      variant={complete ? "secondary" : "outline"}
      className={cn(
        "h-auto w-full justify-start rounded-sm transition-colors",
        complete &&
          "border border-green-200 bg-green-100 hover:bg-green-200 dark:border-green-800 dark:bg-green-900/30 dark:hover:bg-green-900/50",
        isActive &&
          !complete &&
          "dark:!bg-primary/30 bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/30 !border-primary/50",
      )}
    >
      <Link href={`/dashboard/${slug}/${lesson.id}`}>
        <div className="flex w-full items-center justify-between gap-2.5">
          <div className="flex-1">
            <p className="text-muted-foreground line-clamp-1">
              {lesson.position}. <span className="ml-1">{lesson.title}</span>
            </p>
            {complete && (
              <span className="text-[10px] text-green-700 dark:text-green-400">
                Completed
              </span>
            )}
            {isActive && !complete && (
              <span className="text-[10px]">Currently Watching</span>
            )}
          </div>

          <div className="shrink-0">
            {complete ? (
              <IconCheck className="text-foreground size-4" />
            ) : (
              <IconPlayerPlayFilled className="text-foreground size-4" />
            )}
          </div>
        </div>
      </Link>
    </Button>
  );
}
