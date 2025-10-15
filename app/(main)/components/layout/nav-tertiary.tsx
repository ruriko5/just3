import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { CommandIcon, Moon } from "lucide-react";

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

          {/* Togghe theme */}
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={"Toggle theme"}>
              <Moon />
              <span>Toggle theme</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
