import { getLessonContent } from "@/app/data/course/get-lesson-content";
import { CourseContent } from "../../_components/CourseContent";
import { Suspense } from "react";
import { LessonSkeleton } from "./_components/LessonSkeleton";

type Params = Promise<{ lessonId: string }>;

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
