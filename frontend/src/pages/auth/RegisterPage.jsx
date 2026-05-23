import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { authApi } from "@/features/auth/auth.api";
import { authStore } from "@/store/authStore";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");
  const setSession = authStore((s) => s.setSession);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setGlobalError("");
    try {
      const { confirmPassword, ...payload } = formData;
      const data = await authApi.register(payload);
      setSession({ token: data.token, user: data.user });
      navigate("/dashboard/user");
    } catch (err) {
      setGlobalError(err?.response?.data?.message || "Failed to create account. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-evora-border bg-evora-surface-secondary p-8 shadow-soft">
        <div className="text-center">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-evora-text-primary">
            Create an account
          </h2>
          <p className="mt-2 text-sm text-evora-text-secondary">
            Join Evora to discover and manage premium events
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
              <label className="text-sm font-medium text-evora-text-primary">Full Name</label>
              <Input
                {...register("name")}
                error={errors.name?.message}
                placeholder="John Doe"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

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

            <div className="space-y-1">
              <label className="text-sm font-medium text-evora-text-primary">Confirm Password</label>
              <Input
                type="password"
                {...register("confirmPassword")}
                error={errors.confirmPassword?.message}
                placeholder="••••••••"
              />
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>}
            </div>
          </div>

          <p className="text-xs text-center text-evora-text-muted">
            By creating an account, you agree to our{" "}
            <Link to="/privacy" className="underline hover:text-evora-text-primary transition-colors">Privacy Policy</Link>
            {" "}and{" "}
            <Link to="/terms" className="underline hover:text-evora-text-primary transition-colors">Terms & Conditions</Link>.
          </p>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Sign up"}
          </Button>
        </form>

        <div className="text-center text-sm text-evora-text-secondary">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-evora-primary hover:text-evora-primary-hover transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
