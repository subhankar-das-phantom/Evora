import { forwardRef } from "react";
import { cn } from "@/utils/cn";

export const Skeleton = forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("animate-pulse rounded-xl bg-evora-neutral-200/50", className)}
      {...props}
    />
  );
});

Skeleton.displayName = "Skeleton";
