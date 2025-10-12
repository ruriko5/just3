import "server-only";
import { createClient } from "@/supabase/server";
import { cache } from "react";
import { redirect } from "next/navigation";

export const currentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
});

export const verifyUser = cache(async () => {
  const user = await currentUser();
  if (!user) redirect("/login");

  return user;
});
