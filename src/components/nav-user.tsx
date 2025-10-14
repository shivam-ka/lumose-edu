"use client";

import {
  Icon,
  IconBook,
  IconDotsVertical,
  IconHome,
  IconLayoutDashboard,
  IconLogout,
} from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";
import { SignOutConfirm } from "./sign-out-confirm";

export function NavUser() {
  const { isMobile } = useSidebar();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [isOpen, setIsOpen] = useState(false);

  if (isPending || !user) {
    return (
      <div className="flex h-12 gap-2 p-2">
        <Skeleton className="size-8" />
        <Skeleton className="flex-1" />
      </div>
    );
  }

  interface navMenuProps {
    title: string;
    url: string;
    icon?: Icon;
  }

  const navMenu: navMenuProps[] = [
    {
      title: "HomePage",
      url: "/",
      icon: IconHome,
    },
    {
      title: "Dashboard",
      url: "/admin",
      icon: IconLayoutDashboard,
    },
    {
      title: "Courses",
      url: "/admin/courses",
      icon: IconBook,
    },
  ];

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
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
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="line-clamp-1 truncate font-medium">
                    {user.name && user.name.length > 0
                      ? user.name
                      : user.email.split("@")[0]}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
                <IconDotsVertical className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="size-7">
                    {user.image ? (
                      <AvatarImage src={user.image} alt="Profile image" />
                    ) : (
                      <AvatarFallback className="capitalize">
                        {user.name[0] || user.email[0]}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="line-clamp-1 truncate font-medium">
                      {user.name && user.name.length > 0
                        ? user.name
                        : user.email.split("@")[0]}
                    </span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {navMenu.map((item) => (
                  <DropdownMenuItem key={item.title} asChild>
                    <Link href={item.url}>
                      {item.icon && <item.icon />}
                      {item.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setIsOpen(!isOpen)}>
                <IconLogout />
                <span className="text-destructive hover:text-destructive">
                  Log out
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
      <SignOutConfirm open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
