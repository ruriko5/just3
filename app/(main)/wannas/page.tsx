import { verifyUser } from "@/app/auth/data";
import { getWannas } from "./data";
import { TaskAddForm } from "../components/task/task-add-form";
import { TaskList } from "../components/task/task-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wannas",
};

export default async function WannasPage() {
  await verifyUser();

  const wannas = await getWannas();
  return (
    <main className="flex flex-1 flex-col gap-4 max-w-2xl mx-auto container">
      <h2>Wannas Page</h2>

      <TaskAddForm status="Wanna" />
      <TaskList tasks={wannas} className="flex flex-col gap-4" />
    </main>
  );
}
