"use client";

import * as React from "react";
import {
  IconHelp,
  IconSearch,
  IconSettings,
  IconLayoutDashboard,
  IconBook,
  IconChartBar,
  IconUsers,
  IconFolder,
} from "@tabler/icons-react";

import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { appName } from "@/constant/app";
import Image from "next/image";

const data = {
  navMain: [
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
    {
      title: "Analysts",
      url: "/admin/analysts",
      icon: IconChartBar,
    },
    {
      title: "Teams",
      url: "/admin/teams",
      icon: IconUsers,
    },
    {
      title: "Projects",
      url: "/admin/projects",
      icon: IconFolder,
    },
  ],
 
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Search",
      url: "#",
      icon: IconSearch,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <Image
                  src="/logo.svg"
                  alt="logo"
                  width={20}
                  height={20}
                  className="!size-5"
                />
                <span className="text-base font-semibold">{appName}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
