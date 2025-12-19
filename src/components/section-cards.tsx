import { adminGetDashboardStatus } from "@/app/data/admin/admin-get-dashboard";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, UserCheck, BookOpen, Layers } from "lucide-react";

export async function SectionCards() {
  const { totalSignUp, totalCustomer, totalCourse, totalLesson } =
    await adminGetDashboardStatus();
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Users className="text-muted-foreground size-4" />
            Total Sign Ups
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalSignUp}
          </CardTitle>
        </CardHeader>

        <CardFooter className="text-muted-foreground text-sm">
          New users registered overall
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <UserCheck className="text-muted-foreground size-4" />
            Total Customers
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCustomer}
          </CardTitle>
        </CardHeader>

        <CardFooter className="text-muted-foreground text-sm">
          Users who completed a purchase
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <BookOpen className="text-muted-foreground size-4" />
            Total Courses
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalCourse}
          </CardTitle>
        </CardHeader>

        <CardFooter className="text-muted-foreground text-sm">
          Published learning programs
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <Layers className="text-muted-foreground size-4" />
            Total Lessons
          </CardDescription>

          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {totalLesson}
          </CardTitle>
        </CardHeader>

        <CardFooter className="text-muted-foreground text-sm">
          Lessons across all courses
        </CardFooter>
      </Card>
    </div>
  );
}
