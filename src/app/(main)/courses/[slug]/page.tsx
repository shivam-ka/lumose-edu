import { getIndividualCourse } from "@/app/data/course/get-individual-course";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import { env } from "@/env";
import {
  IconCategory,
  IconChevronDown,
  IconPlayerPlay,
} from "@tabler/icons-react";
import {
  ArrowRightIcon,
  BookOpenIcon,
  CheckIcon,
  ClockIcon,
  KanbanIcon,
  LayoutGridIcon,
  TimerIcon,
} from "lucide-react";
import Image from "next/image";
import { checkIfCourseBougth } from "@/app/data/user/user-is-enrolled";
import Link from "next/link";
import { EnrollmentButton } from "./_components/EnrollmentButton";

type Params = Promise<{ slug: string }>;

export default async function SlugPage({ params }: { params: Params }) {
  const { slug } = await params;
  const course = await getIndividualCourse(slug);
  const isEnrolled = await checkIfCourseBougth(course.id);

  return (
    <div className="grid grid-cols-1 gap-8 p-4 md:p-8 lg:grid-cols-3">
      {/* left side */}
      <div className="order-1 lg:col-span-2">
        <div>
          <div className="relative aspect-video w-full overflow-hidden rounded-md">
            <Image
              src={`https://${env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES}.fly.storage.tigris.dev/${course.fileKey}`}
              alt={course.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0" />
          </div>
          <div className="mt-5 space-y-8">
            <div className="space-y-4">
              <h1 className="text-xl font-semibold tracking-tight md:text-3xl">
                {course.title}
              </h1>
              <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                {course.smallDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Badge
                variant="secondary"
                className="border-border flex items-center gap-1.5 border px-3 py-1.5 text-sm"
              >
                <BookOpenIcon className="text-primary !size-4" />
                {course.level}
              </Badge>

              <Badge
                variant="secondary"
                className="border-border flex items-center gap-1.5 border px-3 py-1.5 text-sm"
              >
                <LayoutGridIcon className="text-primary !size-4" />
                {course.category}
              </Badge>

              <Badge
                variant="secondary"
                className="border-border flex items-center gap-1.5 border px-3 py-1.5 text-sm"
              >
                <TimerIcon className="text-primary !size-4" />
                {course.duration}h
              </Badge>
            </div>

            <Separator />

            <div className="bg-card space-y-6 rounded-sm border p-3 sm:p-5">
              <h2 className="text-xl font-semibold tracking-tight">
                Course Description
              </h2>
              <div>
                <RenderDescription json={JSON.parse(course.description)} />
              </div>
            </div>

            <div>
              <div>
                <h2 className="text-xl font-semibold tracking-tight">
                  Course Content
                </h2>
                <div>
                  {course.chapter.length} Chapters |{" "}
                  {course.chapter.reduce(
                    (total, chapter) => total + chapter.lessons.length,
                    0,
                  ) || 0}{" "}
                  Lessons
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {course.chapter.map((chapter, index) => (
                <Collapsible key={chapter.id} defaultOpen={index === 0}>
                  <Card className="gap-0 overflow-hidden rounded-sm p-0">
                    <CollapsibleTrigger className="cursor-pointer">
                      <div>
                        <CardContent className="hover:bg-muted/50 px-3 py-2 transition-colors md:px-4 md:py-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <p className="bg-primary/50 flex size-9 items-center justify-center rounded-full">
                                {index + 1}
                              </p>
                              <div className="text-left">
                                <h3>{chapter.title}</h3>
                                <p className="text-muted-foreground">
                                  {chapter.lessons.length} lesson
                                  {chapter.lessons.length > 1 && "s"}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Badge
                                variant="outline"
                                className="rounded-sm p-1.5"
                              >
                                {chapter.lessons.length} lesson
                                {chapter.lessons.length > 1 && "s"}
                              </Badge>
                              <IconChevronDown className="size-5" />
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="bg-muted/20 border-t">
                        <div className="space-y-3 p-3 pt-3 md:p-4">
                          {chapter.lessons.map((lesson, lessonIndex) => (
                            <div
                              key={lesson.id}
                              className="hover:bg-accent flex items-center gap-4 rounded-sm p-2"
                            >
                              <div className="rounded-full border p-2">
                                <IconPlayerPlay className="text-muted-foreground size-4 md:size-5" />
                              </div>
                              <div className="flex-1">
                                <p>{lesson.title}</p>
                                <p className="text-muted-foreground text-xs md:text-sm">
                                  Lesson {lessonIndex + 1}{" "}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* right side  */}
      <div className="order-2 lg:col-span-1">
        <div className="sticky top-28">
          <Card className="rounded-2xl border p-4 shadow-sm">
            <CardContent className="space-y-6 p-0">
              {/* Price Section */}
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-medium">Price</span>
                <span className="text-primary text-2xl font-bold">
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(course.price)}
                </span>
              </div>

              <div className="bg-background space-y-3 rounded-xl p-4">
                <h4 className="text-base font-semibold">What you will get:</h4>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full shadow-sm">
                    <ClockIcon className="size-5" />
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm">
                      Course Duration
                    </p>
                    <p className="font-medium">{course.duration} Hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full shadow-sm">
                    <KanbanIcon className="size-5 rotate-180" />
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm">
                      Difficulty Level
                    </p>
                    <p className="font-medium">{course.level} </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full shadow-sm">
                    <IconCategory className="size-5" />
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm">
                      Course Category
                    </p>
                    <p className="font-medium">{course.category} </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full shadow-sm">
                    <BookOpenIcon className="size-5" />
                  </div>

                  <div>
                    <p className="text-muted-foreground text-sm">
                      Total Lessons
                    </p>
                    <p className="font-medium">
                      {course.chapter.reduce(
                        (total, chapter) => total + chapter.lessons.length,
                        0,
                      ) || 0}{" "}
                      Lessons
                    </p>
                  </div>
                </div>
              </div>

              <div className="mb-6 space-y-3">
                <h4>This course includes</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <div className="rounded-full bg-green-500/10 p-1 text-green-500">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Full LIfe Time Access</span>
                  </li>

                  <li className="flex items-center gap-2 text-sm">
                    <div className="rounded-full bg-green-500/10 p-1 text-green-500">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Access on Mobile and deskTop</span>
                  </li>

                  <li className="flex items-center gap-2 text-sm">
                    <div className="rounded-full bg-green-500/10 p-1 text-green-500">
                      <CheckIcon className="size-4" />
                    </div>
                    <span>Doubt Solving</span>
                  </li>
                </ul>
              </div>

              {isEnrolled ? (
                <Button asChild className="w-full">
                  <Link href={``}>
                    Watch now <ArrowRightIcon />
                  </Link>
                </Button>
              ) : (
                <EnrollmentButton
                  courseId={course.id}
                  redirectTo={`/courses/${course.slug}`}
                />
              )}
              <p className="text-muted-foreground text-sm">
                30 Day Money back guarantee
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
