import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CommandIcon, Moon } from "lucide-react";
import { ThemeToggleButton } from "./theme-toggle-button";

export const NavTertiary = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {/* Command K */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={"Command K"}>
              <CommandIcon />
              <span>Command K</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <ThemeToggleButton />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
