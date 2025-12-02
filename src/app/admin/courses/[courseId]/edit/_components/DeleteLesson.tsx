"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { tryCatch } from "@/hooks/try-catch";
import { Trash2Icon } from "lucide-react";
import { useState, useTransition } from "react";
import { deleteLesson } from "../actions";
import { toast } from "sonner";

export function DeleteLesson({
  courseId,
  chapterId,
  lessonId,
}: {
  courseId: string;
  chapterId: string;
  lessonId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }

  async function onSubmit() {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        deleteLesson({
          courseId,
          chapterId,
          lessonId,
        }),
      );
      if (error) {
        console.log(error);
        toast.error("failed to delete lesson");
        return;
      }

      if (data.status === "success") {
        toast.success(data.message);
        setIsOpen(false);
      } else if (data.status === "error") {
        toast.error(data.message);
      }
    });
  }

  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" size="icon">
            <Trash2Icon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              lesson.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={onSubmit}
              >
                {isPending ? "Deleting.." : "Delete"}
              </Button>
           
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
