import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";

export const savedEventsApi = {
  saveEvent: async (eventId) => {
    const response = await api.post(endpoints.users.saveEvent(eventId));
    return response.data?.data;
  },
  unsaveEvent: async (eventId) => {
    const response = await api.delete(endpoints.users.unsaveEvent(eventId));
    return response.data?.data;
  }
};
