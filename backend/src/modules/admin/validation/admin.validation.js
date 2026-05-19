import { z } from "zod";
import { objectIdSchema } from "../../../common/validators/objectId.js";

export const createAdminSchema = {
  body: z
    .object({
      name: z.string().trim().min(2).max(80),
      email: z.string().trim().email(),
      password: z.string().min(8).max(128)
    })
    .strict()
};

export const adminIdParamSchema = {
  params: z
    .object({
      adminId: objectIdSchema
    })
    .strict()
};

export const emptyAdminQuerySchema = {
  query: z.object({}).passthrough()
};

