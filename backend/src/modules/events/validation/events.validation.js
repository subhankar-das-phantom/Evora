import { z } from "zod";
import { EVENT_STATUS_VALUES } from "../../../common/constants/eventStatus.js";
import { objectIdSchema } from "../../../common/validators/objectId.js";

const venueSchema = z.string().trim().min(2).max(160);

const normalizeEventPayload = ({ location, venue, ...payload }) => ({
  ...payload,
  ...(venue !== undefined || location !== undefined
    ? { venue: venue ?? location }
    : {})
});

const eventBodyShape = {
  title: z.string().trim().min(3).max(120),
  description: z.string().trim().min(20).max(4000),
  category: z.string().trim().min(2).max(80),
  venue: venueSchema.optional(),
  location: venueSchema.optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  maxSeats: z.coerce.number().int().min(1).max(100000),
  banner: z.string().max(2000).optional()
};

const createEventBodySchema = z
  .object({
    ...eventBodyShape,
    status: z.enum(EVENT_STATUS_VALUES).optional()
  })
  .strict()
  .superRefine((data, ctx) => {
    if (!data.venue && !data.location) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["venue"],
        message: "Venue is required"
      });
    }
  })
  .transform(normalizeEventPayload);

const updateEventBodySchema = z
  .object({
    ...eventBodyShape,
    status: z.enum(EVENT_STATUS_VALUES).optional()
  })
  .partial()
  .strict()
  .refine((data) => Object.keys(data).length > 0, "At least one field is required")
  .transform(normalizeEventPayload);

export const createEventSchema = {
  body: createEventBodySchema
};

export const updateEventSchema = {
  params: z
    .object({
      eventId: objectIdSchema
    })
    .strict(),
  body: updateEventBodySchema
};

export const eventIdParamSchema = {
  params: z
    .object({
      eventId: objectIdSchema
    })
    .strict()
};

export const eventStatusSchema = {
  params: z
    .object({
      eventId: objectIdSchema
    })
    .strict(),
  body: z
    .object({
      status: z.enum(EVENT_STATUS_VALUES)
    })
    .strict()
};

export const listEventsSchema = {
  query: z
    .object({
      page: z.coerce.number().int().positive().optional(),
      limit: z.coerce.number().int().positive().max(100).optional(),
      search: z.string().trim().optional(),
      category: z.string().trim().optional(),
      status: z.enum(EVENT_STATUS_VALUES).optional(),
      sortBy: z.enum(["startDate", "createdAt", "maxSeats", "bookedSeats"]).optional(),
      sortOrder: z.enum(["asc", "desc"]).optional()
    })
    .strict()
};
