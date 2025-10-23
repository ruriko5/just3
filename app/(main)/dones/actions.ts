"use server";

import { currentUser } from "@/app/auth/data";
import { createClient } from "@/supabase/server";

export const deleteDone = async (id: number) => {
  const user = await currentUser();
  if (!user) throw new Error("Unauthorized");

  const supabase = await createClient();
  const { error } = await supabase.from("dones").delete().eq("id", id);

  if (error) throw new Error("Delete Done Error");
};
