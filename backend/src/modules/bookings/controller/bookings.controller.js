import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { sendSuccess } from "../../../common/utils/response.js";
import { bookingsService } from "../service/bookings.service.js";

export const createBooking = asyncHandler(async (req, res) => {
  const booking = await bookingsService.createBooking(req.user.userId, req.body.eventId);
  return sendSuccess(res, "Booking created successfully", booking, 201);
});

export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingsService.getMyBookings(req.user.userId);
  return sendSuccess(res, "Bookings fetched successfully", bookings);
});

export const checkInBooking = asyncHandler(async (req, res) => {
  const booking = await bookingsService.checkInBooking(req.params.bookingId);
  return sendSuccess(res, "Attendee checked in successfully", booking);
});

export const listEventBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingsService.listEventBookings(req.params.eventId);
  return sendSuccess(res, "Event bookings fetched successfully", bookings);
});

export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingsService.listAllBookings();
  return sendSuccess(res, "All bookings fetched successfully", bookings);
});

