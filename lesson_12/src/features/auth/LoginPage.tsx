import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Page from "../../components/Page";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

import { useAuthStore } from "./auth.store";

const schema = z.object({
  username: z.string().min(1, "Required"),
  password: z.string().min(6, "Min 6 chars"),
});
type FormValues = z.infer<typeof schema>;

export default function LoginPage() {
  const navigate = useNavigate();
  const login = useAuthStore((s) => s.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    const ok = values.username === "test" && values.password === "password";
    if (!ok) {
      setError("password", { message: "Invalid credentials (hint: test / password)" });
      return;
    }
    login();
    navigate("/concerts", { replace: true });
  };

  return (
    <Page title="Login" description="Use test / password">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Sign in</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <Label>Username</Label>
                <Input autoComplete="username" {...register("username")} />
                {errors.username && (
                  <p className="text-sm text-red-600">{errors.username.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Password</Label>
                <Input type="password" autoComplete="current-password" {...register("password")} />
                {errors.password && (
                  <p className="text-sm text-red-600">{errors.password.message}</p>
                )}
              </div>

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing in…" : "Sign in"}
              </Button>

              <p className="text-xs text-muted-foreground">Hint: test / password</p>
            </form>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}