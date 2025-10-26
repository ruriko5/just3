"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = React.ComponentProps<typeof Link> & { activeClassName?: string };

export const ActiveLink = ({
  children,
  className,
  activeClassName,
  ...props
}: Props) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(`${props.href}`);

  return (
    <Link
      {...props}
      href={props.href}
      aria-current={isActive}
      className={cn("group", className, isActive && activeClassName)}
    >
      {children}
    </Link>
  );
};
