import { Skeleton } from "@/components/ui/skeleton";

export function LessonSkeleton() {
  return (
    <div className="flex h-auto flex-col pl-6">
      <Skeleton className="bg-muted text-muted-foreground flex aspect-video flex-col items-center justify-center gap-2 rounded-lg" />
      <div className="py-4">
        <Skeleton className="h-9 w-28" />
      </div>
      <div className="py-6">
        <Skeleton className="h-60 w-full" />
      </div>
    </div>
  );
}
