import useSWR from "swr";
import { endpoints } from "@/api/endpoints";

export const useAdminStats = (enabled = true) => {
  const { data, error, isLoading, mutate } = useSWR(enabled ? endpoints.admin.analytics : null);
  return {
    stats: data,
    isLoading,
    error,
    mutate
  };
};

