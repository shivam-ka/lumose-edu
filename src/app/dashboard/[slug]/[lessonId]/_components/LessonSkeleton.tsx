"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export function LessonSkeleton() {
  const isMobile = useIsMobile();
  return (
    <div className={cn("flex h-auto flex-col pl-6", isMobile && "pl-0")}>
      <Skeleton className="bg-muted text-muted-foreground flex aspect-video flex-col items-center justify-center gap-2 rounded-lg" />
      <div className="mt-3 space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-5 w-5/12" />
      </div>
      <div className="py-4">
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="py-6">
        <Skeleton className="h-60 w-full" />
      </div>
    </div>
  );
}
