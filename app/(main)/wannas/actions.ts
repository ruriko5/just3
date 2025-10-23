"use server";

import { currentUser } from "@/app/auth/data";
import { TaskFormData, taskFormSchema } from "@/schemas/task-form-schema";
import { createClient } from "@/supabase/server";
import { getWanna } from "./data";
import { isThreeOrMore } from "../todos/data";

export const createWanna = async (data: TaskFormData) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const res = taskFormSchema.parse(data);

  const supabase = await createClient();
  const { error } = await supabase.from("wannas").insert({
    ...res,
  });

  if (error) throw new Error("Create Wanna Error");
};

export const updateWanna = async (id: number, data: TaskFormData) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const res = taskFormSchema.parse(data);

  const supabase = await createClient();
  const { error } = await supabase
    .from("wannas")
    .update({ ...res })
    .eq("id", id);

  if (error) throw new Error("Update Wanna Error");
};

export const deleteWanna = async (id: number) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { error } = await supabase.from("wannas").delete().eq("id", id);

  if (error) throw new Error("Delete Wanna Error");
};

export const migrateToTodo = async (id: number) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const data = await getWanna(id);
  if (!data) throw new Error("The Wanna Is Not Found");

  if (await isThreeOrMore()) throw new Error("Just3");

  const supabase = await createClient();
  const { error } = await supabase.from("todos").insert({
    title: data.title,
    description: data.description,
    wannaCreatedAt: data.wannaCreatedAt,
  });

  if (error) throw new Error("Migrate to Todo Error");

  await deleteWanna(id);
};
