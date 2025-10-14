import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

interface SignOutConfirmProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SignOutConfirm({ open, onOpenChange }: SignOutConfirmProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function signOut() {
    setIsLoading(true);
    const { error } = await authClient.signOut();

    if (error) {
      toast.error(error.message || "Something went wrong");
    } else {
      window.location.href = "/sign-in";
    }
    setIsLoading(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to logout?</DialogTitle>
          <DialogDescription>
            {`You'll need to sign in again to access your account.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isLoading}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            className="dark:bg-red-800 w-full sm:w-fit"
            variant="destructive"
            onClick={() => {
              signOut();
            }}
          >
            {isLoading ? (
              <>
                <Loader className="animate-spin" />
                Loading...
              </>
            ) : (
              "Logout"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}