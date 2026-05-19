import { api } from "@/api/axios";
import { endpoints } from "@/api/endpoints";

export const bookingsApi = {
  createBooking: async (eventId) => {
    const response = await api.post(endpoints.bookings.create, { eventId });
    return response.data?.data;
  },
  checkInBooking: async (bookingId) => {
    const response = await api.patch(endpoints.bookings.checkIn(bookingId));
    return response.data?.data;
  }
};

