import { verifyUser } from "@/app/auth/data";
import { getTodos } from "./data";
import { TaskList } from "../components/task/task-list";
import { TaskAddForm } from "../components/task/task-add-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Todos",
};

export default async function TodosPage() {
  await verifyUser();

  const todos = await getTodos();
  return (
    <main className="flex flex-1 flex-col gap-4 max-w-2xl mx-auto container">
      <h2>Todos Page</h2>

      {todos.length >= 3 || <TaskAddForm status="Todo" />}
      <TaskList tasks={todos} className="flex flex-col gap-4" />
    </main>
  );
}
