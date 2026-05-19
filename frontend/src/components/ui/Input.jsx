import { forwardRef } from "react";
import { cn } from "@/utils/cn";

export const Input = forwardRef(({ className, type = "text", error, label, ...props }, ref) => (
  <div className="relative w-full space-y-1.5">
    {label && (
      <label className="text-sm font-medium text-evora-text-primary">
        {label}
      </label>
    )}
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-12 w-full rounded-xl border border-evora-border bg-evora-surface-secondary px-4 py-2 text-sm text-evora-text-primary shadow-sm transition-all duration-fast ease-premium placeholder:text-evora-text-muted focus:border-evora-primary focus:outline-none focus:ring-2 focus:ring-evora-primary/20 disabled:cursor-not-allowed disabled:opacity-50",
        error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
        className
      )}
      {...props}
    />
  </div>
));

Input.displayName = "Input";
