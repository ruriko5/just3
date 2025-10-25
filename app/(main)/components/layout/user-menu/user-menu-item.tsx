import { signOut } from "@/app/auth/actions";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOutIcon,
  Sparkles,
} from "lucide-react";

export const UserMenuItem = () => {
  return (
    <>
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Sparkles />
          Upgrade to Pro
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <BadgeCheck />
          Account
        </DropdownMenuItem>
        <DropdownMenuItem>
          <CreditCard />
          Billing
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Bell />
          Notifications
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />

      <DropDownLogOut />
    </>
  );
};

const DropDownLogOut = () => {
  return (
    <form action={signOut}>
      <DropdownMenuItem asChild>
        <button className="w-full">
          <LogOutIcon /> <span>Log out</span>
        </button>
      </DropdownMenuItem>
    </form>
  );
};
