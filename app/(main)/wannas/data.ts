import "server-only";

import { currentUser } from "@/app/auth/data";
import { createClient } from "@/supabase/server";
import { cache } from "react";

export const getWannas = cache(async () => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("wannas")
    .select()
    .order("wannaCreatedAt", { ascending: false });

  if (error) throw new Error("Get Wannas Error");

  return data;
});

export const getWanna = cache(async (id: number) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { data } = await supabase.from("wannas").select().eq("id", id).single();

  return data;
});

// searchWanna
