import { currentUser } from "@/app/auth/data";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRound } from "lucide-react";
import { UserAvatar, UserDisplay } from "./user-menu-part";
import { returnUserData } from "@/types/userdata";

export const HeaderUserMenu = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  const userdata = returnUserData(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {user.is_anonymous ? (
          <Button variant="outline" size="icon" className="rounded-full">
            <UserRound />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            className="rounded-full hover:cursor-pointer"
          >
            <UserAvatar
              avatarCN="h-8 w-8"
              src={userdata.avatarUrl}
              FallbackIcon={UserRound}
            />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
        <DropdownMenuLabel>
          <UserDisplay userdata={userdata} />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
