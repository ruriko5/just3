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
import { migrateToDone } from "../../todos/actions";

export const TaskMigrateDialog = ({
  props: { id, title, status },
}: {
  props: {
    id: number;
    title: string;
    status: "wanna" | "todo";
  };
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const capitalizedStatus = status.charAt(0).toUpperCase() + status.slice(1);
  const migrateTo = (() => {
    switch (status) {
      case "wanna":
        return "Todo";
      case "todo":
        return "Done";
    }
  })();

  type MigrateTask = (id: number) => Promise<void>;
  const migrateFunc = (migrateTask: MigrateTask) => {
    migrateTask(id)
      .then(() => {
        if (pathname.match(`/${status}s`)) {
          router.refresh();
        } else if (pathname.startsWith(`/${status}s/`)) {
          router.push(`/${status}s`);
        }

        toast.success(`Successfully`, {
          description: `${title}`,
          action: {
            label: `Link to ${migrateTo.toLocaleLowerCase()}`,
            onClick: () => {
              router.push(`/${migrateTo.toLocaleLowerCase()}s`);
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
      case "todo":
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
              <span className="sr-only">Migrate to {migrateTo}</span>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          <p>Migrate to {migrateTo}</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Migrate: {`${capitalizedStatus} -> ${migrateTo}`}
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
