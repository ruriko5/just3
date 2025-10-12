"use server";

import { createClient } from "@/supabase/server";
import { redirect } from "next/navigation";

export const signInAnonymously = async () => {
  const supabase = await createClient();
  await supabase.auth.signInAnonymously();
};

export const signInWithGithub = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${"http://localhost:3000"}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
};

export const signInWithGoogle = async () => {
  const supabase = await createClient();
  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${"http://localhost:3000"}/auth/callback`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }
};

export const signOut = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
};
