"use client";

import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { UserData } from "@/types/userdata";
import { UserDisplay } from "./user-menu-part";

export const UserMenuContent = ({
  userdata,
  children,
}: {
  userdata: UserData;
  children: React.ReactNode;
}) => {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenuContent
      className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
      side={isMobile ? "bottom" : "right"}
      align="end"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <UserDisplay userdata={userdata} />
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      {children}
    </DropdownMenuContent>
  );
};
