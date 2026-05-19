import { FolderOpen } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({ 
  title = "No data found", 
  description = "Get started by creating a new entry.", 
  actionLabel, 
  onAction,
  icon: Icon = FolderOpen 
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-evora-border bg-evora-surface-primary p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-evora-surface-muted mb-6 text-evora-primary">
        <Icon className="h-8 w-8" />
      </div>
      <h3 className="font-display text-lg font-semibold text-evora-text-primary">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-evora-text-secondary">{description}</p>
      
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
