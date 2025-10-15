import { navMainItems } from "../../constants";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const HeaderNav = ({ className }: React.ComponentProps<"div">) => {
  return (
    <div className={cn(className)}>
      {navMainItems.map((item) => (
        <Button key={item.title} variant="ghost" asChild>
          <Link href={item.link}>
            <item.icon /> {item.title}
          </Link>
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
              <Link href={item.link}>
                <item.icon />
              </Link>
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
