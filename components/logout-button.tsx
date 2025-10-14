import { LogOutIcon } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "@/app/auth/actions";
import { cn } from "@/lib/utils";

export const LogoutButton = ({ className }: React.ComponentProps<"form">) => {
  return (
    <form action={signOut} className={cn(className)}>
      <Button variant="outline" className="w-full">
        <LogOutIcon />
        <span>Log out</span>
      </Button>
    </form>
  );
};
