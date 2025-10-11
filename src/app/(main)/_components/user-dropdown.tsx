"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { User } from "better-auth";

import {
  LogOutIcon,
  CircleUserIcon,
  Loader,
  Home,
  BookOpen,
  LayoutDashboard,
  LucideProps,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

interface UserDropdownProps {
  user: User;
}

interface MenuItem {
  name: string;
  href: string;
  icon: React.ComponentType<LucideProps>;
}

const userMenu: MenuItem[] = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Courses",
    href: "/courses",
    icon: BookOpen,
  },
  {
    name: "dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
];

export default function UserDropdown({ user }: UserDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="text-foreground gap-1 border px-2 focus-visible:ring-0"
          >
            {user.image ? (
              <Avatar>
                <AvatarImage src={user.image} alt="Profile image" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            ) : (
              <CircleUserIcon />
            )}
            Profile
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="max-w-64">
          <DropdownMenuLabel className="flex min-w-0 flex-col">
            <span className="text-foreground flex items-center gap-1 truncate text-sm font-medium">
              {user.name || "Hello"}
            </span>
            <span className="text-muted-foreground truncate text-sm font-normal">
              {user.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            {userMenu.map((item) => (
              <DropdownMenuItem key={item.name} asChild>
                <Link href={item.href}>
                  <item.icon />
                  <span className="capitalize">{item.name}</span>
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpen(!isOpen)}>
            <LogOutIcon size={16} className="opacity-60" aria-hidden="true" />
            <span className="text-destructive hover:text-destructive">
              Logout
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SignOutConfirm open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}

interface SignOutConfirmProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function SignOutConfirm({ open, onOpenChange }: SignOutConfirmProps) {
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
            className="dark:bg-red-800"
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
