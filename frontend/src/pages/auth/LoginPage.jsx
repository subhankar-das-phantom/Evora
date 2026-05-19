import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authApi } from "@/features/auth/auth.api";
import { authStore } from "@/store/authStore";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const setSession = authStore((s) => s.setSession);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setGlobalError("");
    try {
      const data = await authApi.login(formData);
      setSession({ token: data.token, user: data.user });

      // Redirect based on role
      if (data.user?.mustResetPassword) {
        navigate("/first-login-reset");
      } else if (data.user?.role === "ADMIN" || data.user?.role === "SUPER_ADMIN") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    } catch (err) {
      setGlobalError(err?.response?.data?.message || "Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-evora-border bg-evora-surface-secondary p-8 shadow-soft">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-evora-text-primary">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-evora-text-secondary">
            Sign in to your account to manage your events
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {globalError && (
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {globalError}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-evora-text-primary">Email</label>
              <Input
                type="email"
                {...register("email")}
                error={errors.email?.message}
                placeholder="you@example.com"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-evora-text-primary">Password</label>
              <Input
                type="password"
                {...register("password")}
                error={errors.password?.message}
                placeholder="••••••••"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="text-center text-sm text-evora-text-secondary">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-evora-primary hover:text-evora-primary-hover transition-colors">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
