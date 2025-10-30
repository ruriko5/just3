import { currentUser } from "@/app/auth/data";
import { LoginForm } from "@/components/login-form";
import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  const user = await currentUser();
  if (user) redirect("/");

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <LoginForm />
      </div>
    </div>
  );
}
