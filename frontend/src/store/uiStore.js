import { create } from "zustand";

const TOAST_TIMEOUT = 3200;

function getInitialTheme() {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("evora-theme");
  if (stored === "dark" || stored === "light") return stored;
  return "light";
}

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  localStorage.setItem("evora-theme", theme);
}

// Apply on load immediately
const initialTheme = getInitialTheme();
applyTheme(initialTheme);

export const uiStore = create((set) => ({
  isSidebarOpen: false,
  activeModal: null,
  toasts: [],
  theme: initialTheme,
  toggleTheme: () =>
    set((state) => {
      const next = state.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      return { theme: next };
    }),
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
