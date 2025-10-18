"use server";

import { currentUser } from "@/app/auth/data";
import { TaskFormData, taskFormSchema } from "@/schemas/task-form-schema";
import { getTodo, isThreeOrMore } from "./data";
import { createClient } from "@/supabase/server";

export const createTodo = async (data: TaskFormData) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const res = taskFormSchema.parse(data);

  if (await isThreeOrMore()) throw new Error("Just3");

  const supabase = await createClient();
  const { error } = await supabase.from("todos").insert({
    ...res,
  });

  if (error) throw new Error("Create Todo Error");
};

export const updateTodo = async (id: number, data: TaskFormData) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const res = taskFormSchema.parse(data);

  const supabase = await createClient();
  const { error } = await supabase
    .from("todos")
    .update({ ...data })
    .eq("id", id);

  if (error) throw new Error("Update Todo Error");
};

export const deleteTodo = async (id: number) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { error } = await supabase.from("todos").delete().eq("id", id);

  if (error) throw new Error("Delete Todo Error");
};

export const migrateToDone = async (id: number) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const data = await getTodo(id);
  if (!data) throw new Error("Not Found");

  const supabase = await createClient();
  const { error } = await supabase.from("dones").insert({
    title: data.title,
    description: data.description,
    wannaCreatedAt: data.wannaCreatedAt,
    todoCreatedAt: data.todoCreatedAt,
  });

  if (error) throw new Error("Migrate to Done Error");

  await deleteTodo(id);
};
