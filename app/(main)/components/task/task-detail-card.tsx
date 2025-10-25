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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { TaskDeleteDialog } from "./task-delete-dialog";
import { TaskEditDialogForm } from "./task-edit-dialog-form";
import { TaskMigrateDialog } from "./task-migrate-dialog";
import { format, formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";

export const TaskDetailCard = ({ task }: { task: Task }) => {
  const genDateStr = (date: string) => {
    const createdAt = format(date, "yyyy-MM-dd HH:mm");
    const distanceToNow = formatDistanceToNow(date, {
      addSuffix: true,
      locale: ja,
    });

    return `${createdAt} - ${distanceToNow}`;
  };

  const returnCreatedArr = () => {
    switch (task.status) {
      case "Wanna":
        return [task.wannaCreatedAt];
      case "Todo":
        return [task.wannaCreatedAt, task.todoCreatedAt];
      case "Done":
        return [task.wannaCreatedAt, task.todoCreatedAt, task.doneCreatedAt];
    }
  };

  const statusArr = ["Wanna", "Todo", "Done"];

  const dateStrArr = returnCreatedArr().map(
    (createdAt, index) =>
      createdAt && `${statusArr[index]}: ${genDateStr(createdAt)}`
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="break-all">{task.title}</CardTitle>

        {dateStrArr.map((createdItem, index) => (
          <CardDescription key={index}>{createdItem}</CardDescription>
        ))}
      </CardHeader>

      <CardContent>
        {task.description ? (
          <p className="break-all text-sm">{task.description}</p>
        ) : (
          <p className="text-sm text-muted-foreground">No description</p>
        )}
      </CardContent>

      <CardFooter>
        <Button asChild variant="ghost">
          <Link
            href={`/${task.status.toLowerCase()}s`}
            className="text-sm text-blue-500"
          >
            <ArrowLeft /> Go back
          </Link>
        </Button>

        <div className="ml-auto">
          <TaskDeleteDialog
            props={{ id: task.id, title: task.title, status: task.status }}
          />
          {task.status === "Done" || (
            <>
              <TaskEditDialogForm
                props={{
                  id: task.id,
                  title: task.title,
                  description: task.description,
                  status: task.status,
                }}
              />
              <TaskMigrateDialog
                props={{ id: task.id, title: task.title, status: task.status }}
              />
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
