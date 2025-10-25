import { ChevronsUpDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { UserMenuContent } from "./user-menu-content";
import { currentUser } from "@/app/auth/data";
import { UserAvatar, UserDescription } from "./user-menu-part";
import { returnUserData } from "@/types/userdata";
import { UserMenuItem } from "./user-menu-item";

export const NavUser = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userdata = returnUserData(user);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserAvatar
                avatarCN="h-8 w-8 rounded-lg"
                avatarFallbackCN="rounded-lg"
                src={userdata.avatarUrl}
                FallbackIcon={User}
              />
              <UserDescription name={userdata.name} email={userdata.email} />
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <UserMenuContent userdata={userdata}>
            <UserMenuItem />
          </UserMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
