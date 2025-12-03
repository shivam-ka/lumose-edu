"use client";

import { AdminLessonType } from "@/app/data/admin/admin-get-lesson";
import { BackButton } from "@/components/back-button";
import { Uploader } from "@/components/file-uploader/Uploader";
import { RichTextEditor } from "@/components/rich-text-editor/Editor";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { tryCatch } from "@/hooks/try-catch";
import { lessonSchema, LessonSchemaType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { updateLesson } from "../actions";
import { toast } from "sonner";
import LoadingScreen from "@/components/loading-screen";
import { ArrowRightIcon, SaveIcon } from "lucide-react";

interface IAppProps {
  data: AdminLessonType;
  chapterId: string;
  courseId: string;
}

export function LessonForm({ data, chapterId, courseId }: IAppProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<LessonSchemaType>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      courseId,
      chapterId,
      name: data.title,
      description: data.description || undefined,
      thumbnailKey: data.thumbnailKey || undefined,
      videoKey: data.videoKey || undefined,
    },
  });

  async function onSubmit(values: LessonSchemaType) {
    startTransition(async () => {
      const { data: result, error } = await tryCatch(
        updateLesson(values, data.id),
      );

      if (error) {
        console.log(error);
        toast.error("failed to update lesson");
        return;
      }

      if (result.status === "success") {
        toast.success(result.message);
      } else if (result.status === "error") {
        toast.error(result.message);
      }
    });
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 pb-4">
          <BackButton href={`/admin/courses/${courseId}/edit`} />
          <h2 className="text-xl font-semibold tracking-wide md:text-2xl">
            {data.title}
          </h2>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Lesson Configuration </CardTitle>
            <CardDescription>Lesson details and configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                className="space-y-6"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Lesson title" {...field} />
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
                      <FormLabel>Lesson Description</FormLabel>
                      <FormControl>
                        <RichTextEditor field={field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumbnailKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail image</FormLabel>
                      <FormControl>
                        <Uploader
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="videoKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Video File</FormLabel>
                      <FormControl>
                        <Uploader
                          onChange={field.onChange}
                          value={field.value}
                          fileTypeAccepted="video"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-end">
                  <Button type="submit" size="lg" className="rounded-sm">
                    Save Changes
                    <ArrowRightIcon className="size-4" />
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <LoadingScreen loading={isPending} text="Updating Lesson..." />
    </>
  );
}
