import { cn } from "@/lib/utils";
import { Task } from "@/types/custom";

export const TaskList = ({
  tasks,
  className,
}: { tasks: Task[] } & React.ComponentProps<"div">) => {
  return (
    <div className={cn(className)}>
      <div className="bg-muted/50 aspect-video rounded-xl" />
      <div className="bg-muted/50 aspect-video rounded-xl" />
      <div className="bg-muted/50 aspect-video rounded-xl" />
    </div>
  );
};
