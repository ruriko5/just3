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
import { deleteTodo } from "../../todos/actions";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

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
        if (pathname.match(`/${status}s`)) {
          router.refresh();
        } else if (pathname.startsWith(`/${status}s/`)) {
          router.push(`/${status}s`);
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
      case "todo":
        return deleteFunc(deleteTodo, "Todo");
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
