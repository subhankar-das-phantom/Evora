import { forwardRef } from "react";
import { cn } from "@/utils/cn";

export const Button = forwardRef(({ className, variant = "primary", size = "md", asChild, children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-fast ease-premium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl";
  
  const variants = {
    primary: "bg-evora-primary text-evora-primary-foreground hover:bg-evora-primary-hover shadow-soft",
    secondary: "bg-evora-surface-secondary text-evora-text-primary border border-evora-border hover:bg-evora-surface-hover",
    accent: "bg-evora-accent text-evora-accent-foreground hover:bg-evora-accent-hover shadow-soft",
    ghost: "text-evora-text-secondary hover:bg-evora-surface-hover hover:text-evora-text-primary",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-14 px-8 text-base",
    icon: "h-11 w-11",
  };

  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
