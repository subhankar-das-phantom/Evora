import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";

export const profileApi = {
  updateProfile: async (payload) => {
    const response = await api.patch(endpoints.users.me, payload);
    return response.data?.data;
  }
};

