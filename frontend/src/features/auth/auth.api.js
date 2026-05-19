import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";

export const authApi = {
  login: async (payload) => {
    const response = await api.post(endpoints.auth.login, payload);
    return response.data?.data;
  },
  register: async (payload) => {
    const response = await api.post(endpoints.auth.register, payload);
    return response.data?.data;
  },
  changeFirstLoginPassword: async (payload) => {
    const response = await api.post(endpoints.auth.firstLoginPassword, payload);
    return response.data;
  }
};

