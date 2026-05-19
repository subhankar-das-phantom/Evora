import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";

export const eventsApi = {
  createEvent: async (payload) => {
    const response = await api.post(endpoints.events.list, payload);
    return response.data?.data;
  },
  updateEvent: async (eventId, payload) => {
    const response = await api.patch(endpoints.events.details(eventId), payload);
    return response.data?.data;
  },
  updateStatus: async (eventId, status) => {
    const response = await api.patch(`${endpoints.events.details(eventId)}/status`, { status });
    return response.data?.data;
  },
  uploadBanner: async (eventId, file) => {
    const formData = new FormData();
    formData.append("banner", file);
    const response = await api.post(`${endpoints.events.details(eventId)}/banner`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data?.data;
  }
};

