import { ReactNode } from "react";
import { CourseSidebar } from "../_components/CourseSidebar";
import { getCourseSidebarData } from "@/app/data/course/get-course-sidebar-data";
import { ScrollArea } from "@/components/ui/scroll-area";

interface IAppProps {
  params: Promise<{ slug: string }>;
  children: ReactNode;
}

export default async function Layout({ children, params }: IAppProps) {
  const { slug } = await params;
  const course = await getCourseSidebarData(slug);

  return (
    <div className="flex flex-1">
      {/* sidebar */}

      <ScrollArea className="border-border max-h-screen w-1/4 min-w-[250px] shrink-0 border-r-2">
        <CourseSidebar course={course} />
      </ScrollArea>

      <div className="min-h-screen">{children}</div>
    </div>
  );
}
