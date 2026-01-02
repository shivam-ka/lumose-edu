import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import { EmptyState } from "@/components/general/empty-state";
import { ChevronsRight, ShellIcon } from "lucide-react";
import { redirect } from "next/navigation";

interface IAppProps {
  params: Promise<{ slug: string }>;
}

export default async function CourseSlugPage({ params }: IAppProps) {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);

  const firstCahpter = course.chapter[0];
  const firstLesson = firstCahpter.lessons[0];

  if (firstLesson) {
    redirect(`/dashboard/${slug}/${firstLesson.id}`);
  }

  return (
    <EmptyState
      title="No course content available"
      description="This course does not have any content yet. Browse other courses and continue your learning journey."
      className="h-screen"
      icon={<ShellIcon className="size-20" />}
      linkText="View all courses"
      linkHref="/courses"
      buttonIcon={<ChevronsRight className="size-4" />}
    />
  );
}
