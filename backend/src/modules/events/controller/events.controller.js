import { asyncHandler } from "../../../common/utils/asyncHandler.js";
import { sendSuccess } from "../../../common/utils/response.js";
import { AppError } from "../../../common/errors/AppError.js";
import { eventsService } from "../service/events.service.js";

export const createEvent = asyncHandler(async (req, res) => {
  const event = await eventsService.createEvent(req.user.userId, req.body);
  return sendSuccess(res, "Event created successfully", event, 201);
});

export const updateEvent = asyncHandler(async (req, res) => {
  const event = await eventsService.updateEvent(req.params.eventId, req.body);
  return sendSuccess(res, "Event updated successfully", event);
});

export const deleteEvent = asyncHandler(async (req, res) => {
  await eventsService.deleteEvent(req.params.eventId);
  return sendSuccess(res, "Event deleted successfully");
});

export const setEventStatus = asyncHandler(async (req, res) => {
  const event = await eventsService.updateEventStatus(req.params.eventId, req.body.status);
  return sendSuccess(res, "Event status updated successfully", event);
});

export const uploadEventBanner = asyncHandler(async (req, res) => {
  if (!req.file) {
    throw new AppError("Banner image is required", 400);
  }
  const event = await eventsService.uploadEventBanner(req.params.eventId, req.file.buffer);
  return sendSuccess(res, "Event banner uploaded successfully", event);
});

export const getEventDetails = asyncHandler(async (req, res) => {
  const event = await eventsService.getEventById(req.params.eventId);
  return sendSuccess(res, "Event fetched successfully", event);
});

export const listEvents = asyncHandler(async (req, res) => {
  const data = await eventsService.listPublicEvents(req.query);
  return sendSuccess(res, "Events fetched successfully", data);
});

export const listAdminEvents = asyncHandler(async (req, res) => {
  const data = await eventsService.listAdminEvents(req.query);
  return sendSuccess(res, "Admin events fetched successfully", data);
});
