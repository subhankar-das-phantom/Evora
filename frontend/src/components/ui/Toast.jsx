import { uiStore } from "@/store/uiStore";
import { X, CheckCircle, AlertCircle, Info } from "lucide-react";
import { cn } from "@/utils/cn";

const icons = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
};

const styles = {
  success: "border-success/30 bg-success/10 text-success",
  error: "border-error/30 bg-error/10 text-error",
  info: "border-primary/30 bg-primary/10 text-primary",
};

export function ToastHub() {
  const toasts = uiStore((s) => s.toasts);
  const dismiss = uiStore((s) => s.dismissToast);

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const Icon = icons[toast.type] || icons.info;
        return (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md animate-slide-up",
              styles[toast.type] || styles.info
            )}
          >
            <Icon size={18} className="mt-0.5 shrink-0" />
            <p className="text-body-sm flex-1">{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Dismiss"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
