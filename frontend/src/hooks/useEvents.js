import useSWR from "swr";
import { endpoints } from "@/api/endpoints";

const toQueryString = (params = {}) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, value);
    }
  });
  const text = query.toString();
  return text ? `?${text}` : "";
};

export const useEvents = (params) => {
  const key = `${endpoints.events.list}${toQueryString(params)}`;
  const { data, error, isLoading, mutate } = useSWR(key);
  return {
    events: data?.items || [],
    meta: data?.meta,
    isLoading,
    error,
    mutate
  };
};

export const useEventDetails = (eventId) => {
  const key = eventId ? endpoints.events.details(eventId) : null;
  const { data, error, isLoading, mutate } = useSWR(key);
  return {
    event: data,
    isLoading,
    error,
    mutate
  };
};

