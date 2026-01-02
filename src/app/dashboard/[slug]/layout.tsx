import { ReactNode } from "react";
import { RenderSidebar } from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";

interface IAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function Layout({ children, params }: IAppProps) {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-1">
      <RenderSidebar course={course} />
      <div className="min-h-screen w-full">{children}</div>
    </div>
  );
}
