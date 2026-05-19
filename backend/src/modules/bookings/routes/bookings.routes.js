import { Router } from "express";
import { protect, authorize, ensureFirstLoginCompleted } from "../../../common/middlewares/auth.js";
import { validateRequest } from "../../../common/middlewares/validateRequest.js";
import { ROLES } from "../../../common/constants/roles.js";
import {
  checkInBooking,
  createBooking,
  getMyBookings,
  listEventBookings,
  getAllBookings
} from "../controller/bookings.controller.js";
import {
  bookingIdParamSchema,
  createBookingSchema,
  emptyBookingQuerySchema,
  eventIdParamSchema
} from "../validation/bookings.validation.js";

const bookingsRouter = Router();

bookingsRouter.post(
  "/",
  protect,
  ensureFirstLoginCompleted,
  authorize(ROLES.USER),
  validateRequest(createBookingSchema),
  createBooking
);

bookingsRouter.get(
  "/me",
  protect,
  authorize(ROLES.USER),
  validateRequest(emptyBookingQuerySchema),
  getMyBookings
);

bookingsRouter.patch(
  "/:bookingId/check-in",
  protect,
  ensureFirstLoginCompleted,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validateRequest(bookingIdParamSchema),
  checkInBooking
);

bookingsRouter.get(
  "/event/:eventId",
  protect,
  ensureFirstLoginCompleted,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validateRequest(eventIdParamSchema),
  listEventBookings
);

bookingsRouter.get(
  "/all",
  protect,
  ensureFirstLoginCompleted,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validateRequest(emptyBookingQuerySchema),
  getAllBookings
);

export default bookingsRouter;
