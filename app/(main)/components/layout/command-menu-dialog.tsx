"use client";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Moon, Sun } from "lucide-react";
import { navMainItems } from "../../constants";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";

export const CommandMenuDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (bool: boolean) => void;
}) => {
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigation">
          {navMainItems.map((item) => (
            <CommandItem
              key={item.title}
              onSelect={() => {
                router.push(item.link);
                setOpen(false);
              }}
            >
              <item.icon />
              <span>{item.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem
            onSelect={() => {
              setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
          >
            <Sun className="scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            <span>Toggle theme</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
