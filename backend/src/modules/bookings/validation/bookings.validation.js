import { z } from "zod";
import { objectIdSchema } from "../../../common/validators/objectId.js";

export const createBookingSchema = {
  body: z
    .object({
      eventId: objectIdSchema
    })
    .strict()
};

export const bookingIdParamSchema = {
  params: z
    .object({
      bookingId: objectIdSchema
    })
    .strict()
};

export const eventIdParamSchema = {
  params: z
    .object({
      eventId: objectIdSchema
    })
    .strict()
};

export const emptyBookingQuerySchema = {
  query: z.object({}).passthrough()
};

