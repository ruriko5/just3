import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
} from "@/components/ui/sidebar";
import { ThemeToggleButton } from "./theme-toggle-button";
import { CommandMenu } from "./command-menu";

export const NavTertiary = ({
  ...props
}: React.ComponentPropsWithoutRef<typeof SidebarGroup>) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          <CommandMenu />

          <ThemeToggleButton />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
