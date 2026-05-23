import useSWR from "swr";
import { endpoints } from "@/api/endpoints";
import { authStore } from "@/store/authStore";

export const useSavedEvents = () => {
  const token = authStore((s) => s.token);
  const user = authStore((s) => s.user);
  const isUser = user?.role === "USER";

  const { data, error, isLoading, mutate } = useSWR(
    token && isUser ? endpoints.users.savedEvents : null
  );

  const savedEventIds = (data || []).map((e) =>
    typeof e === "string" ? e : e?._id
  );

  const isSaved = (eventId) => savedEventIds.includes(eventId);

  return {
    savedEvents: data || [],
    savedEventIds,
    isSaved,
    isLoading,
    error,
    mutate
  };
};
