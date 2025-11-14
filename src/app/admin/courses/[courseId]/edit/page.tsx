import { adminGetCourse } from "@/app/data/admin/admin-get-course";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { notFound } from "next/navigation";
import { EditCourseForm } from "./_components/EditCourseForm";

type Params = Promise<{ courseId: string }>;

export default async function Page({ params }: { params: Params }) {
  const { courseId } = await params;
  const data = await adminGetCourse(courseId);

  if (!data) {
    return notFound();
  }

  return (
    <div>
      <Tabs defaultValue="basic-info">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic-info" className="cursor-pointer">
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="Course-structure" className="cursor-pointer">
            Course Structure
          </TabsTrigger>
        </TabsList>
        <TabsContent value="basic-info">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
              <CardDescription>Provide Basic Info of Course</CardDescription>
            </CardHeader>
            <CardContent>
              <EditCourseForm data={data} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
