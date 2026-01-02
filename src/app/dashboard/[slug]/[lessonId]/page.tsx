import { getLessonContent } from "@/app/data/course/get-lesson-content";
import { CourseContent } from "../../_components/CourseContent";
import { Suspense } from "react";
import { LessonSkeleton } from "./_components/LessonSkeleton";
import { Metadata } from "next";

type Params = Promise<{ lessonId: string }>;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lessonId } = await params;
  const lesson = await getLessonContent(lessonId);

  if (!lesson) {
    return {
      title: "No Lesson Found",
    };
  }

  return {
    title: lesson.title,
    openGraph: {
      title: lesson.title,
      images: [
        {
          url: `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${lesson.thumbnailKey}`,
        },
      ],
    },
  };
}

export default async function LessonContentPage({
  params,
}: {
  params: Params;
}) {
  const { lessonId } = await params;

  return (
    <Suspense fallback={<LessonSkeleton />}>
      <RenderLessonContent lessonId={lessonId} />
    </Suspense>
  );
}

async function RenderLessonContent({ lessonId }: { lessonId: string }) {
  const lesson = await getLessonContent(lessonId);

  return <CourseContent data={lesson} />;
}
