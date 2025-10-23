"use client";

import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggleButton = () => {
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        tooltip={"Toggle theme"}
        onClick={() => {
          setTheme(resolvedTheme === "dark" ? "light" : "dark");
        }}
      >
        <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
        <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        <span>Toggle theme</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
