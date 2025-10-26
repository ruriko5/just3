import { navMainItems } from "../../constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ActiveLink } from "./active-link";

export const HeaderNav = ({ className }: React.ComponentProps<"div">) => {
  return (
    <div className={cn(className)}>
      {navMainItems.map((item) => (
        <Button key={item.title} variant="ghost" asChild>
          <ActiveLink
            href={item.link}
            activeClassName="bg-primary/5 dark:bg-primary/20"
          >
            <item.icon /> {item.title}
          </ActiveLink>
        </Button>
      ))}
    </div>
  );
};

export const HeaderMobileNav = ({ className }: React.ComponentProps<"div">) => {
  return (
    <div className={cn(className)}>
      {navMainItems.map((item) => (
        <Tooltip key={item.title}>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" asChild>
              <ActiveLink
                href={item.link}
                activeClassName="bg-primary/5 dark:bg-primary/10"
              >
                <item.icon />
              </ActiveLink>
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>{item.title}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
