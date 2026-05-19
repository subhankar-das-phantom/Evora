import { fetcher } from "../api/axios";

export const swrConfig = {
  fetcher,
  revalidateOnFocus: false,
  dedupingInterval: 4000,
  keepPreviousData: true,
  shouldRetryOnError: false
};

