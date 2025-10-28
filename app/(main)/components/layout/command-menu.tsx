"use client";

import { useEffect, useState } from "react";
import { CommandMenuDialog } from "./command-menu-dialog";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { CommandIcon } from "lucide-react";

export const CommandMenu = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <CommandMenuSidebarButton setOpen={setOpen} />

      <CommandMenuDialog open={open} setOpen={setOpen} />
    </>
  );
};

export const CommandMenuSidebarButton = ({
  setOpen,
}: {
  setOpen: (bool: boolean) => void;
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={"Command K"}
        onClick={() => {
          setOpen(true);
        }}
      >
        <CommandIcon />
        <span>Command K</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
