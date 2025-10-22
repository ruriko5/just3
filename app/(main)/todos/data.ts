import "server-only";

import { currentUser } from "@/app/auth/data";
import { createClient } from "@/supabase/server";
import { cache } from "react";

export const getTodos = cache(async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("todos")
    .select()
    .order("todoCreatedAt", { ascending: false });

  if (error) throw new Error("Get Todos Error");

  return data;
});

export const getTodo = cache(async (id: number) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("todos")
    .select()
    .eq("id", id)
    .single();

  // if (error) throw new Error("Get Todo Error");

  return data;
});

export const isThreeOrMore = cache(async () => {
  const todos = await getTodos();

  if (todos.length >= 3) return true;
  return false;
});
