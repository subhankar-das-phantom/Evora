import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const variants = {
  primary:
    "bg-primary hover:bg-primary-hover text-white shadow-glow-sm hover:shadow-glow-md active:scale-[0.97]",
  secondary:
    "bg-surface hover:bg-surface-elevated border border-border hover:border-border-hover text-text-primary active:scale-[0.97]",
  ghost:
    "bg-transparent hover:bg-surface text-text-muted hover:text-text-primary",
  danger:
    "bg-error/10 hover:bg-error/20 text-error border border-error/20 active:scale-[0.97]",
};

const sizes = {
  sm: "px-3 py-1.5 text-body-sm rounded-lg",
  md: "px-5 py-2.5 text-body-sm rounded-lg",
  lg: "px-8 py-3.5 text-body-md rounded-xl",
};

export const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      className,
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
