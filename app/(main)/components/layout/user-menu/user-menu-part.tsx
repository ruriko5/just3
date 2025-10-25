import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { UserData } from "@/types/userdata";
import { LucideIcon, UserRound } from "lucide-react";

export const UserAvatar = ({
  avatarCN,
  avatarFallbackCN,
  src,
  FallbackIcon,
}: {
  avatarCN: string;
  avatarFallbackCN?: string;
  src: string | undefined;
  FallbackIcon: LucideIcon;
}) => {
  return (
    <Avatar className={cn(avatarCN)}>
      <AvatarImage src={src} alt="user avatar" />
      <AvatarFallback className={cn(avatarFallbackCN)}>
        <FallbackIcon />
      </AvatarFallback>
    </Avatar>
  );
};

export const UserDescription = ({
  name,
  email,
}: {
  name: string | undefined;
  email: string | undefined;
}) => {
  return (
    <div className="grid flex-1 text-left text-sm leading-tight">
      <span className="truncate font-medium">{name || "Anonymous User"}</span>
      <span className="truncate text-xs">{email || "user.email"}</span>
    </div>
  );
};

export const UserDisplay = ({ userdata }: { userdata: UserData }) => {
  return (
    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
      <UserAvatar
        avatarCN="h-8 w-8"
        src={userdata.avatarUrl}
        FallbackIcon={UserRound}
      />
      <UserDescription name={userdata.name} email={userdata.email} />
    </div>
  );
};
