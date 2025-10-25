import { cn } from "@/lib/utils";
import { Task } from "@/types/custom";
import { TaskCard } from "./task-card";

export const TaskList = ({
  tasks,
  className,
}: { tasks: Task[] } & React.ComponentProps<"div">) => {
  return (
    <div className={cn(className)}>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};
