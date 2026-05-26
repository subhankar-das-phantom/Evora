import { X } from "lucide-react";
import { uiStore } from "@/store/uiStore";

const typeStyles = {
  success: "border-emerald-200 bg-emerald-50 text-emerald-900",
  error: "border-red-200 bg-red-50 text-red-900",
  info: "border-sky-200 bg-sky-50 text-sky-900"
};

export function ToastHub() {
  const toasts = uiStore((s) => s.toasts);
  const dismissToast = uiStore((s) => s.dismissToast);

  if (!toasts.length) return null;

  return (
    <div className="pointer-events-none fixed left-4 right-4 top-4 z-[1000] flex flex-col gap-3 sm:left-auto sm:w-full sm:max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start justify-between gap-3 rounded-xl border px-4 py-3 shadow-soft ${typeStyles[toast.type] || typeStyles.info}`}
          role="status"
          aria-live="polite"
        >
          <p className="text-sm leading-5">{toast.message}</p>
          <button
            type="button"
            onClick={() => dismissToast(toast.id)}
            className="rounded-md p-1 opacity-70 transition-opacity hover:opacity-100"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
