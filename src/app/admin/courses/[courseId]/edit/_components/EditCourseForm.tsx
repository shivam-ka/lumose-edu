"use client";
import { Uploader } from "@/components/file-uploader/Uploader";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { tryCatch } from "@/hooks/try-catch";
import {
  courseCategories,
  courseLevels,
  courseSchema,
  CourseSchemaType,
  courseStatus,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, SparklesIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";
import { toast } from "sonner";
import { editCourse } from "../actions";
import { AdminSingleCourseType } from "@/app/data/admin/admin-get-course";
import LoadingScreen from "@/components/loading-screen";

interface IAppProps {
  data: AdminSingleCourseType;
}

export function EditCourseForm({ data }: IAppProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<CourseSchemaType>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      title: data.title,
      description: data.description,
      fileKey: data.fileKey,
      price: data.price,
      duration: data.duration,
      level: data.level,
      category: data.category as CourseSchemaType["category"],
      smallDescription: data.smallDescription,
      slug: data.slug,
      status: data.status,
    },
  });

  function onSubmit(values: CourseSchemaType) {
    startTransition(async () => {
      const { data: response, error } = await tryCatch(
        editCourse(values, data.id),
      );

      if (error) {
        toast.error("An Unexpected Error");
        return;
      }

      if (response.status === "success") {
        toast.success(response.message);
        form.reset();
        router.push("/admin/courses");
      } else if (response.status === "error") {
        toast.error(response.message);
      }
    });
  }

  return (
    <>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter course title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>URL Slug</FormLabel>

                <div className="flex flex-col items-center gap-3 md:flex-row">
                  <FormControl>
                    <Input placeholder="course-url-slug" {...field} />
                  </FormControl>

                  <Button
                    type="button"
                    className="w-full md:w-fit"
                    onClick={() => {
                      const titleValue = form.getValues("title");
                      if (!titleValue?.length) {
                        return toast.error("Enter a title to generate a slug");
                      }
                      const slug = slugify(titleValue).toLocaleLowerCase();
                      form.setValue("slug", slug, { shouldValidate: true });
                    }}
                  >
                    Generate
                    <SparklesIcon />
                  </Button>
                </div>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="smallDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Brief description (max 200 characters)"
                    className="min-h-20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Description</FormLabel>
                <FormControl>
                  <RichTextEditor field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="fileKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Update Thumbnail</FormLabel>
                <FormControl>
                  <Uploader value={field.value} onChange={field.onChange} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courseCategories.map((cat) => (
                        <SelectItem
                          key={cat}
                          value={cat}
                          className="cursor-pointer"
                        >
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full cursor-pointer">
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courseLevels.map((level) => (
                        <SelectItem
                          key={level}
                          value={level}
                          className="cursor-pointer"
                        >
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration (Hours)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter course duration in hours"
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      max={500}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ( ₹ )</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter course price"
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      min={0}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full cursor-pointer">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {courseStatus.map((status) => (
                      <SelectItem
                        key={status}
                        value={status}
                        className="cursor-pointer"
                      >
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-full rounded-sm md:w-fit"
              size="lg"
              disabled={isPending}
            >
              Update Course
              <ArrowRight className="mt-0.5" />
            </Button>
          </div>
        </form>
      </Form>
      <LoadingScreen loading={isPending} text="Updating Course" />
    </>
  );
}
