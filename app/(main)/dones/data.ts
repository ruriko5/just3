import "server-only";

import { currentUser } from "@/app/auth/data";
import { createClient } from "@/supabase/server";
import { cache } from "react";

export const getDones = cache(async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("dones")
    .select()
    .order("doneCreatedAt", { ascending: false });

  if (error) throw new Error("Get Dones Error");

  return data;
});

export const getDone = cache(async (id: number) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data } = await supabase.from("dones").select().eq("id", id).single();

  return data;
});

// searchDone
