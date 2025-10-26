import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type LucideIcon } from "lucide-react";
import { ActiveLink } from "./active-link";

export const NavMain = ({
  items,
}: {
  items: {
    title: string;
    link: string;
    icon: LucideIcon;
  }[];
}) => {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild tooltip={item.title} size="lg">
              <ActiveLink
                href={item.link}
                activeClassName="bg-primary/5 dark:bg-primary/10"
              >
                <item.icon />
                <span>{item.title}</span>
              </ActiveLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};
