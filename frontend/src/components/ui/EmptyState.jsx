import { SearchX } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/utils/cn";

export function EmptyState({
  icon: Icon = SearchX,
  title = "Nothing found",
  description = "Try adjusting your search or filters.",
  action,
  actionLabel = "Try again",
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <div className="w-16 h-16 rounded-2xl bg-surface-elevated flex items-center justify-center mb-5">
        <Icon size={28} className="text-text-muted" />
      </div>
      <h3 className="font-headline text-headline-sm text-text-primary mb-2">
        {title}
      </h3>
      <p className="text-body-sm text-text-muted max-w-sm mb-6">
        {description}
      </p>
      {action && (
        <Button variant="secondary" size="sm" onClick={action}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
