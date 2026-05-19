import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";

export const adminApi = {
  createAdmin: async (payload) => {
    const response = await api.post(endpoints.admin.admins, payload);
    return response.data?.data;
  },
  disableAdmin: async (adminId) => {
    const response = await api.patch(endpoints.admin.disableAdmin(adminId));
    return response.data?.data;
  }
};

