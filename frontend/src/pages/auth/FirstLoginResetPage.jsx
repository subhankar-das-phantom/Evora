import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import { Lock, ArrowRight } from "lucide-react";
import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";
import { authStore } from "@/store/authStore";
import { uiStore } from "@/store/uiStore";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function FirstLoginResetPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const navigate = useNavigate();
  const user = authStore((s) => s.user);
  const hydrateUser = authStore((s) => s.hydrateUser);
  const pushToast = uiStore((s) => s.pushToast);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.post("/auth/change-password-first-login", { 
        newPassword: password 
      });

      // Update the user state locally to reflect the change
      hydrateUser({
        ...user,
        firstLoginRequired: false
      });

      // Invalidate the SWR /users/me cache so RoleRoute doesn't
      // see stale firstLoginRequired: true and redirect back here
      await mutate(endpoints.users.me);

      pushToast({
        type: "success",
        message: "Password updated successfully!"
      });

      // Redirect to dashboard
      navigate("/dashboard/admin", { replace: true });
    } catch (err) {
      // General error handling is done by axios interceptor,
      // but we can catch specific ones if needed.
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-evora-border bg-evora-surface-secondary p-8 shadow-soft">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-evora-primary/10 mb-4">
            <Lock className="h-6 w-6 text-evora-primary" />
          </div>
          <h2 className="font-display text-2xl font-semibold text-evora-text-primary">
            Reset Required
          </h2>
          <p className="mt-2 text-sm text-evora-text-secondary">
            For security reasons, you must change the temporary password provided by the Super Admin before continuing to the dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new secure password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter your new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-sm font-medium text-red-500">{error}</p>
          )}

          <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Password"}
            {!isSubmitting && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
