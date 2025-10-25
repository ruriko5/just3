"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowBigDown } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { migrateToTodo } from "../../wannas/actions";
import { migrateToDone } from "../../todos/actions";

export const TaskMigrateDialog = ({
  props: { id, title, status },
}: {
  props: {
    id: number;
    title: string;
    status: "Wanna" | "Todo";
  };
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const nextStatus = (() => {
    switch (status) {
      case "Wanna":
        return "Todo";
      case "Todo":
        return "Done";
    }
  })();

  type MigrateTask = (id: number) => Promise<void>;
  const migrateFunc = (migrateTask: MigrateTask) => {
    migrateTask(id)
      .then(() => {
        if (pathname.startsWith(`/${status.toLowerCase()}s/`)) {
          router.push(`/${status.toLowerCase()}s`);
        } else if (pathname.match(`/${status.toLowerCase()}s`)) {
          router.refresh();
        }

        toast.success(`Successfully`, {
          description: `${title}`,
          action: {
            label: `Link to ${nextStatus.toLocaleLowerCase()}`,
            onClick: () => {
              router.push(`/${nextStatus.toLocaleLowerCase()}s`);
            },
          },
        });
      })
      .catch((e) => {
        toast.error(`${e}`);
      });
  };

  const handleSubmit = () => {
    switch (status) {
      case "Wanna":
        return migrateFunc(migrateToTodo);
      case "Todo":
        return migrateFunc(migrateToDone);
    }
  };

  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="ghost">
              <ArrowBigDown />
              <span className="sr-only">Migrate to {nextStatus}</span>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          <p>Migrate to {nextStatus}</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Migrate: {`${status} -> ${nextStatus}`}
          </AlertDialogTitle>
          <AlertDialogDescription className="break-all">
            {title}
          </AlertDialogDescription>
          <AlertDialogDescription>
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive" onClick={handleSubmit}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
