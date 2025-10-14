"use client";

import { SignOutConfirm } from "@/components/sign-out-confirm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "better-auth";

import {
  LogOutIcon,
  Home,
  BookOpen,
  LayoutDashboard,
  LucideProps,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

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
            className="text-muted-foreground gap-1 border px-2 capitalize focus-visible:ring-0"
          >
            <Avatar className="size-7">
              {user.image ? (
                <AvatarImage src={user.image} alt="Profile image" />
              ) : (
                <AvatarFallback className="capitalize">
                  {user.name[0] || user.email[0]}
                </AvatarFallback>
              )}
            </Avatar>
            <p>
              {user.name && user.name.length > 0
                ? user.name.split(" ")[0]
                : user.email.split("@")[0]}
            </p>
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
