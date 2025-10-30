import { verifyUser } from "@/app/auth/data";
import { getDones } from "./data";
import { TaskList } from "../components/task/task-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dones",
};

export default async function DonesPage() {
  await verifyUser();

  const dones = await getDones();
  return (
    <main className="flex flex-1 flex-col gap-4 max-w-2xl mx-auto container">
      <h2>Dones Page</h2>

      <TaskList tasks={dones} className="flex flex-col gap-4" />
    </main>
  );
}
