import useSWR from "swr";
import { endpoints } from "@/api/endpoints";
import { authStore } from "@/store/authStore";

export const useAuth = () => {
  const token = authStore((state) => state.token);
  const user = authStore((state) => state.user);
  const setSession = authStore((state) => state.setSession);
  const hydrateUser = authStore((state) => state.hydrateUser);
  const logout = authStore((state) => state.logout);

  const { data: profile, isLoading, mutate } = useSWR(token ? endpoints.users.me : null);

  return {
    token,
    user: profile || user,
    isAuthenticated: Boolean(token),
    isLoadingProfile: isLoading,
    setSession,
    hydrateUser,
    logout,
    refreshProfile: mutate
  };
};

