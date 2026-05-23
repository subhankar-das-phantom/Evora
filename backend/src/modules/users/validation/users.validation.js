import { z } from "zod";
import { objectIdSchema } from "../../../common/validators/objectId.js";

export const updateProfileSchema = {
  body: z
    .object({
      name: z.string().trim().min(2).max(80).optional()
    })
    .strict()
};

export const emptyQuerySchema = {
  query: z.object({}).passthrough()
};

export const eventIdParamSchema = {
  params: z
    .object({
      eventId: objectIdSchema
    })
    .strict()
};

