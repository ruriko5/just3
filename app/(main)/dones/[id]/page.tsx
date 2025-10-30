import { verifyUser } from "@/app/auth/data";
import { getDone } from "../data";
import { TaskDetailCard } from "../../components/task/task-detail-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Done",
};

export default async function DonePage({ params }: PageProps<"/dones/[id]">) {
  await verifyUser();

  const doneId = (await params).id;
  const done = await getDone(Number(doneId));

  if (!done) {
    return <p className="my-10 text-center">not found</p>;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 max-w-2xl mx-auto container">
      <h2>Done Page</h2>

      <TaskDetailCard task={done} />
    </main>
  );
}
