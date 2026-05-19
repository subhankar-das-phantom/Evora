import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export function Modal({ isOpen, onClose, title, children }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-evora-neutral-900/40 backdrop-blur-sm transition-opacity duration-medium ease-premium"
        onClick={onClose}
      />
      
      {/* Modal Panel */}
      <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-evora-surface-tertiary p-6 text-left align-middle shadow-modal transition-all duration-medium ease-premium backdrop-blur-xl border border-white/20">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-xl font-semibold text-evora-text-primary">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-evora-text-secondary transition-colors hover:bg-evora-surface-hover hover:text-evora-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-evora-primary"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="mt-2">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}
