import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  signInAnonymously,
  signInWithGithub,
  signInWithGoogle,
} from "@/app/auth/actions";
import { FaGithub, FaGoogle } from "react-icons/fa";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Google or GitHub account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" formAction={signInWithGoogle}>
                  <FaGoogle />
                  Login with Google
                </Button>
                <Button variant="outline" formAction={signInWithGithub}>
                  <FaGithub />
                  Login with GitHub
                </Button>
              </div>
              <div className="grid gap-6">
                <Button type="submit" formAction={signInAnonymously}>
                  Login as Anonymous
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
