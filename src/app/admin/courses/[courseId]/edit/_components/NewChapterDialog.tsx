"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { chapterSchema, ChapterSchemaType } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookPlusIcon } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createChapter } from "../actions";
import { toast } from "sonner";
import { LoadingButton } from "@/components/loading-btn";

export function NewChapterDialog({ courseId }: { courseId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChapterSchemaType>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      name: "",
      courseId,
    },
  });

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }

  async function onSubmit(values: ChapterSchemaType) {
    startTransition(async () => {
      const { data, error } = await tryCatch(createChapter(values));

      if (error) {
        console.log(error);
        toast.error("failed to create chapter");
        return;
      }

      if (data.status === "success") {
        toast.success(data.message);
        form.reset();
        setIsOpen(false);
      } else if (data.status === "error") {
        toast.error(data.message);
      }
    });
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline">
            <BookPlusIcon className="size-4" />
            New Chapter
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Chapter</DialogTitle>
            <DialogDescription>
              Enter the details for your new chapter.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="space-y-8 py-1"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chapter Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Chapter Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
           <LoadingButton
                         loading={isPending}
                         loadingText="Saving..."
                         type="submit"
                         onClick={form.handleSubmit(onSubmit)}
                       >
                         Save Changes
                       </LoadingButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
