import { z } from "zod";

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

