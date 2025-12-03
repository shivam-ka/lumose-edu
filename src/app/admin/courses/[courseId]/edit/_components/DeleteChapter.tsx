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
import { deleteChapter } from "../actions";
import { toast } from "sonner";
import { LoadingButton } from "@/components/loading-btn";

export function DeleteChapter({
  courseId,
  chapterId,
}: {
  courseId: string;
  chapterId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleOpenChange(open: boolean) {
    setIsOpen(open);
  }

  async function onSubmit() {
    startTransition(async () => {
      const { data, error } = await tryCatch(
        deleteChapter({
          courseId,
          chapterId,
        }),
      );
      if (error) {
        console.log(error);
        toast.error("failed to delete chapter");
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
          <Button variant="destructive" size="icon">
            <Trash2Icon />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              chapter.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <LoadingButton
              loading={isPending}
              variant="destructive"
              onClick={onSubmit}
              loadingText="Deleting..."
            >
              Delete
            </LoadingButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
