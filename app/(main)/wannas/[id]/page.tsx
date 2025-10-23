import { verifyUser } from "@/app/auth/data";
import { getWanna } from "../data";
import { TaskDetailCard } from "../../components/task/task-detail-card";

export default async function WannaPage({ params }: PageProps<"/wannas/[id]">) {
  await verifyUser();

  const wannaId = (await params).id;
  const wanna = await getWanna(Number(wannaId));

  if (!wanna) {
    return <p className="my-10 text-center">not found</p>;
  }

  return (
    <main className="flex flex-1 flex-col gap-4 max-w-2xl mx-auto container">
      <h2>Wanna Page</h2>

      <TaskDetailCard task={wanna} />
    </main>
  );
}
