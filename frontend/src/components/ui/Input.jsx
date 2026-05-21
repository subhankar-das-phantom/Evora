import { forwardRef, useState } from "react";
import { cn } from "@/utils/cn";
import { Eye, EyeOff } from "lucide-react";

export const Input = forwardRef(
  ({ label, error, className, type = "text", id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === "password";
    const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-label-md text-text-secondary"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={isPassword && showPassword ? "text" : type}
            className={cn(
              "w-full px-4 py-3 bg-surface border border-border rounded-xl text-text-primary text-body-md placeholder:text-text-muted/60 transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary",
              "hover:border-border-hover",
              error && "border-error focus:ring-error/40 focus:border-error",
              isPassword && "pr-12",
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          )}
        </div>
        {error && (
          <p className="text-label-sm text-error">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
