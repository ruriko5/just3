import { verifyUser } from "@/app/auth/data";
import { getTodo } from "../data";
import { TaskDetailCard } from "../../components/task/task-detail-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todo",
};

export default async function TodoPage({ params }: PageProps<"/todos/[id]">) {
  await verifyUser();

  const todoId = (await params).id;
  const todo = await getTodo(Number(todoId));

  if (!todo) {
    return <p className="my-10 text-center">not found</p>;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 max-w-2xl mx-auto container">
      <h2>Todo Page</h2>

      <TaskDetailCard task={todo} />
    </main>
  );
}
