import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";

export const profileApi = {
  updateProfile: async (payload) => {
    const response = await api.patch(endpoints.users.me, payload);
    return response.data?.data;
  },
  uploadAvatar: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await api.patch(endpoints.users.avatar, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data?.data;
  }
};

