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
import { Trash } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteWanna } from "../../wannas/actions";
import { deleteTodo } from "../../todos/actions";
import { deleteDone } from "../../dones/actions";

export const TaskDeleteDialog = ({
  props: { id, title, status },
}: {
  props: {
    id: number;
    title: string;
    status: "wanna" | "todo" | "done";
  };
}) => {
  const router = useRouter();
  const pathname = usePathname();

  type DeleteTask = (id: number) => Promise<void>;
  const deleteFunc = (deleteTask: DeleteTask, target: string) => {
    deleteTask(id)
      .then(() => {
        if (pathname.startsWith(`/${status}s/`)) {
          router.push(`/${status}s`);
        } else if (pathname.match(`/${status}s`)) {
          router.refresh();
        }

        toast.success(`${target} has been deleted`, {
          description: `${title}`,
        });
      })
      .catch((e) => {
        toast.error(`${e}`);
      });
  };

  const handleDelete = () => {
    switch (status) {
      case "wanna":
        return deleteFunc(deleteWanna, "Wanna");
      case "todo":
        return deleteFunc(deleteTodo, "Todo");
      case "done":
        return deleteFunc(deleteDone, "Done");
    }
  };

  return (
    <AlertDialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="icon">
              <Trash />
              <span className="sr-only capitalize">Delete {status}</span>
            </Button>
          </AlertDialogTrigger>
        </TooltipTrigger>

        <TooltipContent side="bottom">
          <p className="capitalize">Delete {status}</p>
        </TooltipContent>
      </Tooltip>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="capitalize">
            Delete {status}
          </AlertDialogTitle>
          <AlertDialogDescription className="break-all">
            {title}
          </AlertDialogDescription>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive" onClick={handleDelete}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
