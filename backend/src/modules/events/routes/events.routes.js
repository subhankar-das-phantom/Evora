import { Router } from "express";
import { protect, authorize, ensureFirstLoginCompleted } from "../../../common/middlewares/auth.js";
import { validateRequest } from "../../../common/middlewares/validateRequest.js";
import { imageUpload } from "../../../common/middlewares/upload.js";
import { ROLES } from "../../../common/constants/roles.js";
import {
  createEvent,
  deleteEvent,
  getEventDetails,
  listAdminEvents,
  listEvents,
  setEventStatus,
  updateEvent,
  uploadEventBanner
} from "../controller/events.controller.js";
import {
  createEventSchema,
  eventIdParamSchema,
  eventStatusSchema,
  listEventsSchema,
  updateEventSchema
} from "../validation/events.validation.js";

const eventsRouter = Router();

eventsRouter.get("/", validateRequest(listEventsSchema), listEvents);
eventsRouter.get(
  "/admin/all",
  protect,
  ensureFirstLoginCompleted,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validateRequest(listEventsSchema),
  listAdminEvents
);
eventsRouter.get("/:eventId", validateRequest(eventIdParamSchema), getEventDetails);

eventsRouter.post(
  "/",
  protect,
  ensureFirstLoginCompleted,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validateRequest(createEventSchema),
  createEvent
);

eventsRouter.patch(
  "/:eventId",
  protect,
  ensureFirstLoginCompleted,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validateRequest(updateEventSchema),
  updateEvent
);

eventsRouter.delete(
  "/:eventId",
  protect,
  ensureFirstLoginCompleted,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validateRequest(eventIdParamSchema),
  deleteEvent
);

eventsRouter.patch(
  "/:eventId/status",
  protect,
  ensureFirstLoginCompleted,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validateRequest(eventStatusSchema),
  setEventStatus
);

eventsRouter.post(
  "/:eventId/banner",
  protect,
  ensureFirstLoginCompleted,
  authorize(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  validateRequest(eventIdParamSchema),
  imageUpload.single("banner"),
  uploadEventBanner
);

export default eventsRouter;
