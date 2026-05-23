import { useState, useRef } from "react";
import { User, Camera, Save, Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { profileApi } from "@/features/profile/profile.api";
import { uiStore } from "@/store/uiStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  const { user, refreshProfile } = useAuth();
  const pushToast = uiStore((s) => s.pushToast);
  const theme = uiStore((s) => s.theme);
  const toggleTheme = uiStore((s) => s.toggleTheme);
  const fileInputRef = useRef(null);

  const [name, setName] = useState(user?.name || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (!name.trim() || name.trim().length < 2) {
      pushToast({ type: "error", message: "Name must be at least 2 characters." });
      return;
    }
    setIsSavingProfile(true);
    try {
      await profileApi.updateProfile({ name: name.trim() });
      pushToast({ type: "success", message: "Profile updated successfully." });
      refreshProfile();
    } catch (_err) {
      // handled by interceptor
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      pushToast({ type: "error", message: "Please select an image file." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      pushToast({ type: "error", message: "Image must be smaller than 5MB." });
      return;
    }

    setIsUploadingAvatar(true);
    try {
      await profileApi.uploadAvatar(file);
      pushToast({ type: "success", message: "Avatar updated successfully." });
      refreshProfile();
    } catch (_err) {
      // handled by interceptor
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-evora-text-primary">Settings</h1>
        <p className="mt-1 text-evora-text-secondary">Manage your account and preferences.</p>
      </div>

      {/* Avatar Section */}
      <div className="rounded-2xl border border-evora-border bg-evora-surface-secondary p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-evora-text-primary mb-4">Profile Photo</h2>
        <div className="flex items-center gap-6">
          <div className="relative group">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full object-cover border-2 border-evora-border"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-evora-primary/10 text-2xl font-bold text-evora-primary border-2 border-evora-border">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="h-5 w-5 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>
          <div>
            <p className="text-sm font-medium text-evora-text-primary">{user?.name}</p>
            <p className="text-xs text-evora-text-muted mt-0.5">{user?.email}</p>
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploadingAvatar}
              className="mt-2 text-xs font-medium text-evora-primary hover:text-evora-primary-hover transition-colors"
            >
              {isUploadingAvatar ? "Uploading..." : "Change photo"}
            </button>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="rounded-2xl border border-evora-border bg-evora-surface-secondary p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-evora-text-primary mb-4">
          <span className="flex items-center gap-2">
            <User className="h-5 w-5 text-evora-primary" />
            Profile Information
          </span>
        </h2>
        <form onSubmit={handleProfileSave} className="space-y-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
          <div className="space-y-1">
            <label className="text-sm font-medium text-evora-text-primary">Email Address</label>
            <div className="flex h-12 w-full items-center rounded-xl border border-evora-border bg-evora-surface-muted px-4 text-sm text-evora-text-muted cursor-not-allowed">
              {user?.email}
            </div>
            <p className="text-xs text-evora-text-muted">Email cannot be changed.</p>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSavingProfile} className="gap-2">
              <Save className="h-4 w-4" />
              {isSavingProfile ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>

      {/* Account Info */}
      <div className="rounded-2xl border border-evora-border bg-evora-surface-secondary p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold text-evora-text-primary mb-4">
          <span className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-evora-primary" />
            Account
          </span>
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-evora-text-primary">Role</p>
              <p className="text-xs text-evora-text-muted mt-0.5">Your account type</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-evora-primary/10 px-3 py-1 text-xs font-semibold text-evora-primary">
              {user?.role?.replace("_", " ") || "USER"}
            </span>
          </div>

          <div className="border-t border-evora-border-soft pt-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-evora-text-primary">Appearance</p>
              <p className="text-xs text-evora-text-muted mt-0.5">Switch between light and dark mode</p>
            </div>
            <button
              onClick={toggleTheme}
              className="relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-fast bg-evora-surface-muted border border-evora-border"
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-evora-primary shadow-sm transition-transform duration-fast ${
                  theme === "dark" ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <div className="border-t border-evora-border-soft pt-4">
            <p className="text-sm font-medium text-evora-text-primary">Member since</p>
            <p className="text-xs text-evora-text-muted mt-0.5">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
