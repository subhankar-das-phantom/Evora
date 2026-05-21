import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";

export function Modal({ isOpen, onClose, title, children, className }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4"
      onClick={(e) => e.target === overlayRef.current && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={cn(
          "relative z-10 w-full max-w-md bg-surface border border-border rounded-2xl shadow-xl animate-fade-in",
          className
        )}
      >
        <div className="flex items-center justify-between p-5 border-b border-border/50">
          <h3 className="font-headline text-headline-sm text-text-primary">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors rounded-lg p-1 hover:bg-surface-elevated"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
