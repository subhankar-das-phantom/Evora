import { create } from "zustand";

const TOAST_TIMEOUT = 3200;

// Always dark mode - no toggle needed
if (typeof window !== "undefined") {
  document.documentElement.classList.add("dark");
}

export const uiStore = create((set) => ({
  isSidebarOpen: false,
  activeModal: null,
  toasts: [],
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  closeSidebar: () => set({ isSidebarOpen: false }),
  openModal: (modalName) => set({ activeModal: modalName }),
  closeModal: () => set({ activeModal: null }),
  pushToast: ({ type = "info", message }) =>
    set((state) => {
      const id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
      const toast = { id, type, message };
      setTimeout(() => {
        set((next) => ({ toasts: next.toasts.filter((item) => item.id !== id) }));
      }, TOAST_TIMEOUT);
      return { toasts: [...state.toasts, toast] };
    }),
  dismissToast: (id) => set((state) => ({ toasts: state.toasts.filter((item) => item.id !== id) }))
}));
