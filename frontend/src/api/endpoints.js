export const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/v1";

export const endpoints = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    firstLoginPassword: "/auth/change-password-first-login"
  },
  users: {
    me: "/users/me"
  },
  events: {
    list: "/events",
    details: (id) => `/events/${id}`
  },
  bookings: {
    create: "/bookings",
    mine: "/bookings/me",
    eventBookings: (eventId) => `/bookings/event/${eventId}`,
    checkIn: (bookingId) => `/bookings/${bookingId}/check-in`
  },
  admin: {
    analytics: "/admin/analytics",
    admins: "/admin/users/admins",
    disableAdmin: (adminId) => `/admin/users/admins/${adminId}/disable`
  }
};

