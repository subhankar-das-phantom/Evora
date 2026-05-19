import useSWR from "swr";
import { endpoints } from "@/api/endpoints";

export const useBookings = (enabled = true) => {
  const { data, error, isLoading, mutate } = useSWR(enabled ? endpoints.bookings.mine : null);
  return {
    bookings: data || [],
    isLoading,
    error,
    mutate
  };
};

