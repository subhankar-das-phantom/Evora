import { cn } from "@/utils/cn";

export function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        "rounded-xl bg-gradient-to-r from-surface via-surface-elevated to-surface bg-[length:200%_100%] animate-shimmer",
        className
      )}
      {...props}
    />
  );
}

export function EventCardSkeleton() {
  return (
    <div className="flex flex-col bg-surface rounded-xl border border-border overflow-hidden">
      <Skeleton className="h-48 w-full rounded-none" />
      <div className="p-5 space-y-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <div className="pt-4 border-t border-border/50 flex justify-between items-center">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </div>
    </div>
  );
}

export function TableRowSkeleton({ cols = 5 }) {
  return (
    <tr className="border-b border-border/30">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="p-4">
          <Skeleton className="h-4 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}
