import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import { authStore } from "@/store/authStore";
import { uiStore } from "@/store/uiStore";
import { useState } from "react";

const schema = z
  .object({
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function FirstLoginResetPage() {
  const navigate = useNavigate();
  const hydrateUser = authStore((s) => s.hydrateUser);
  const user = authStore((s) => s.user);
  const pushToast = uiStore((s) => s.pushToast);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await api.post(endpoints.auth.firstLoginPassword, {
        newPassword: data.newPassword,
      });
      hydrateUser({ ...user, firstLoginRequired: false });
      pushToast({ type: "success", message: "Password updated successfully!" });
      navigate("/dashboard/admin");
    } catch {
      // handled by interceptor
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-warning/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative w-full max-w-[420px] bg-surface border border-border rounded-2xl p-8 sm:p-10 animate-fade-in">
        <div className="text-center mb-8">
          <span className="text-2xl font-bold tracking-tighter text-text-primary font-headline">
            Evora
          </span>
        </div>

        <h1 className="font-headline text-headline-md text-center text-text-primary mb-1">
          Set your password
        </h1>
        <p className="text-body-sm text-text-muted text-center mb-8">
          You must change your password before accessing the admin dashboard.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <Input
            label="New Password"
            type="password"
            placeholder="••••••••"
            error={errors.newPassword?.message}
            {...register("newPassword")}
          />
          <Input
            label="Confirm Password"
            type="password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />
          <Button
            type="submit"
            size="lg"
            isLoading={loading}
            className="w-full shadow-glow-sm"
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
}
