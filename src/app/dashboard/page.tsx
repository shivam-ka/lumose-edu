import { EmptyState } from "@/components/general/empty-state";
import { getAllCourses } from "../data/course/get-all-courses";
import { getEnrolledCourses } from "../data/user/get-enrolled-courses";
import { CircleXIcon, LibraryIcon } from "lucide-react";
import { PublicCourseCard } from "../(main)/_components/PublicCourseCard";
import Link from "next/link";

export default async function UserDashboard() {
  const [courses, enrolledCourses] = await Promise.all([
    getAllCourses(),
    getEnrolledCourses(),
  ]);

  const enrolledCourseIds = enrolledCourses.map((item) => item.course.id);

  const availableCourses = courses.filter(
    (item) => !enrolledCourseIds.includes(item.id),
  );

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-xl font-semibold tracking-tight sm:text-3xl">
          Enrolled Courses
        </h1>
        <p className="text-muted-foreground text-sm">
          View and continue learning from your purchased courses
        </p>
      </div>

      {!enrolledCourses.length ? (
        <EmptyState
          title="No courses purchased yet"
          description="You have not enrolled in any courses. Start learning by exploring our course catalog."
          linkHref="/courses"
          linkText="Browse Courses"
          icon={<CircleXIcon className="size-20" />}
        />
      ) : (
        <>
          <p>Here are the courses you are currently enrolled in.</p>
          <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {enrolledCourses.map(({ course }) => (
              <Link href={`/dashboard/${course.slug}`} key={course.id}>
                {course.title}
              </Link>
            ))}
          </div>
        </>
      )}

      <section>
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight sm:text-3xl">
            Availabes Courses
          </h1>
          <p className="text-muted-foreground text-sm">
            your can also purchase this courses
          </p>
        </div>
        {!availableCourses.length ? (
          <EmptyState
            title="No courses available"
            description="You have not enrolled in any courses yet. Explore our courses and start learning today."
            linkHref="/courses"
            linkText="Browse Courses"
            icon={<LibraryIcon className="size-20" />}
          />
        ) : (
          <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
            {availableCourses.map((course) => (
              <PublicCourseCard key={course.id} data={course} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
