import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import { authStore } from "@/store/authStore";
import { useState } from "react";

const schema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const setSession = authStore((s) => s.setSession);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await api.post(endpoints.auth.login, data);
      const payload = res.data?.data || res.data;
      const token = payload?.token;
      const user = payload?.user;
      if (!token) return;
      setSession({ token, user });
      const role = user?.role;
      if (
        (role === "ADMIN" || role === "SUPER_ADMIN") &&
        user?.firstLoginRequired
      ) {
        navigate("/first-login-reset");
      } else if (role === "ADMIN" || role === "SUPER_ADMIN") {
        navigate("/dashboard/admin");
      } else {
        navigate("/dashboard/user");
      }
    } catch {
      // Error handled by axios interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[420px] bg-surface border border-border rounded-2xl p-8 sm:p-10 animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            className="text-2xl font-bold tracking-tighter text-text-primary font-headline"
          >
            Evora
          </Link>
        </div>

        <h1 className="font-headline text-headline-md text-center text-text-primary mb-1">
          Welcome back
        </h1>
        <p className="text-body-sm text-text-muted text-center mb-8">
          Sign in to your account
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="Email"
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />
          <Button
            type="submit"
            size="lg"
            isLoading={loading}
            className="w-full shadow-glow-sm"
          >
            Sign In
          </Button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-label-sm text-text-muted">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <p className="text-center text-body-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-primary hover:text-primary-hover font-medium transition-colors"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
