import { create } from "zustand";
import { persist } from "zustand/middleware";

export const authStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setSession: ({ token, user }) => set({ token, user }),
      hydrateUser: (user) => set((state) => ({ ...state, user })),
      logout: () => set({ token: null, user: null })
    }),
    {
      name: "evora-auth"
    }
  )
);

