"use client";
import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { useConstructUrl } from "@/hooks/use-construct";
import { CheckCircle, VideoOffIcon } from "lucide-react";
import { useRef, useTransition } from "react";
import { markLessonComplete } from "../[slug]/[lessonId]/actions";
import { toast } from "sonner";
import { LoadingButton } from "@/components/loading-btn";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface IAppProps {
  data: LessonContentType;
}

export function CourseContent({ data }: IAppProps) {
  const [isPending, startTransition] = useTransition();
  const isMobile = useIsMobile();

  function onSubmit() {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        markLessonComplete(data.id, data.chapter.course.slug),
      );

      if (error) {
        toast.error("faild to updated progress");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <div className={cn("flex h-auto flex-col pl-6", isMobile && "pl-0")}>
      {data.videoKey ? (
        <VideoPlayer
          thumbnailKey={data.thumbnailKey || ""}
          videoKey={data.videoKey || ""}
        />
      ) : (
        <div className="bg-muted text-muted-foreground flex aspect-video flex-col items-center justify-center gap-2 rounded-lg border border-dashed">
          <VideoOffIcon className="size-[70px]" />
          <p className="text-base font-medium">Video not available</p>
          <p className="max-w-xs text-center text-sm">
            This lesson does not have a video yet. Please continue with the
            reading content.
          </p>
        </div>
      )}

      <h1 className="mt-3 text-xl font-semibold">{data.title}</h1>

      <div className="border-b-2 py-4">
        {!data.lessonProgress.length ? (
          <LoadingButton
            variant="outline"
            onClick={onSubmit}
            loading={isPending}
            loadingText="Please Wait..."
          >
            <CheckCircle className="size-4 rounded-sm text-green-500" />
            Mark as complete
          </LoadingButton>
        ) : (
          <Button
            variant="secondary"
            className="cursor-default bg-green-100 text-green-500 hover:text-green-500 dark:bg-green-950"
          >
            <CheckCircle className="size-4 rounded-sm text-green-500" />
            Completed
          </Button>
        )}
      </div>

      <div className="py-4">
        {data.description && (
          <div className="bg-card p-4">
            <RenderDescription json={JSON.parse(data.description)} />
          </div>
        )}
      </div>
    </div>
  );
}

function VideoPlayer({
  thumbnailKey,
  videoKey,
}: {
  thumbnailKey: string;
  videoKey: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const thumbnailUrl = useConstructUrl(thumbnailKey);
  const videoUrl = useConstructUrl(videoKey);

  return (
    <div className="group relative aspect-video overflow-hidden rounded-lg bg-black">
      <video
        ref={videoRef}
        poster={thumbnailUrl}
        className="h-full w-full object-cover"
        controlsList="nodownload"
        controls
        autoPlay
        muted
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}
