import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Task } from "@/types/custom";
import Link from "next/link";
import { format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { TaskDeleteDialog } from "./task-delete-dialog";
import { TaskMigrateDialog } from "./task-migrate-dialog";

export const TaskCard = ({ task }: { task: Task }) => {
  const genDateStr = (date: string) => {
    const createdAt = format(date, "yyyy-MM-dd HH:mm");
    const distanceToNow = formatDistanceToNow(date, {
      addSuffix: true,
      locale: ja,
    });

    return `${createdAt} - ${distanceToNow}`;
  };

  const returnDateStrByStatus = () => {
    switch (task.status) {
      case "wanna":
        return genDateStr(task.wannaCreatedAt);
      case "todo":
        return genDateStr(task.todoCreatedAt);
      case "done":
        return genDateStr(task.doneCreatedAt);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="truncate">{task.title}</CardTitle>
        <CardDescription>{returnDateStrByStatus()}</CardDescription>
      </CardHeader>

      <CardContent>
        {task.description ? (
          <p className="truncate text-sm">{task.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground">No description</p>
        )}
      </CardContent>

      <CardFooter>
        <Button asChild variant="ghost">
          <Link
            href={`/${task.status}s/${task.id}`}
            className="text-sm text-blue-500"
          >
            View more...
          </Link>
        </Button>

        <div className="ml-auto">
          <TaskDeleteDialog
            props={{ id: task.id, title: task.title, status: task.status }}
          />
          {task.status === "done" || (
            <TaskMigrateDialog
              props={{ id: task.id, title: task.title, status: task.status }}
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
