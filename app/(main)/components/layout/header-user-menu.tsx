import { signOut } from "@/app/auth/actions";
import { currentUser } from "@/app/auth/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOutIcon, UserRound } from "lucide-react";

export const HeaderUserMenu = async () => {
  const user = await currentUser();

  if (!user) {
    return null;
  }

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
            <UserAvatar src={user.user_metadata.avatar_url} />
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64" align="end" sideOffset={8}>
        <DropdownMenuLabel>
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <UserAvatar src={user.user_metadata.avatar_url} />
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {user.user_metadata.user_name ||
                  user.user_metadata.name ||
                  "Anonymous"}
              </span>
              <span className="truncate text-xs">
                {user.user_metadata.email || "user.email"}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <form action={signOut}>
          <DropdownMenuItem asChild>
            <button className="w-full">
              <LogOutIcon /> <span>Log out</span>
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const UserAvatar = ({ src }: { src: string }) => {
  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={src} alt="provider avatar" />
      <AvatarFallback>
        <UserRound />
      </AvatarFallback>
    </Avatar>
  );
};
