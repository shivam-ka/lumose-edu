import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { authClient } from "@/lib/auth-client";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { LoadingButton } from "./loading-btn";

interface SignOutConfirmProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutConfirm({ open, onOpenChange }: SignOutConfirmProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  function signOut() {
    startTransition(async () => {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "Something went wrong");
        setIsLoading(false);
      } else {
        window.location.href = "/sign-in";
      }
    });
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to logout?</AlertDialogTitle>
          <AlertDialogDescription>
            You will need to sign in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </AlertDialogCancel>

          <LoadingButton
            loading={isPending}
            variant="destructive"
            className="dark:bg-red-800"
            onClick={signOut}
            loadingText="Loading..."
          >
            Logout
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
