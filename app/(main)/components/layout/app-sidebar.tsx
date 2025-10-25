"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { navMainItems, navSecondaryItems } from "@/app/(main)/constants";
import { NavSecondary } from "./nav-secondary";
import { NavTertiary } from "./nav-tertiary";

export const AppSidebar = ({
  children,
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
      collapsible="icon"
    >
      <SidebarHeader />
      <SidebarContent>
        <NavMain items={navMainItems} />
        <NavSecondary items={navSecondaryItems} className="mt-auto" />
        <NavTertiary />
      </SidebarContent>

      {/*  children is NavUser */}
      <SidebarFooter>{children}</SidebarFooter>
    </Sidebar>
  );
};
