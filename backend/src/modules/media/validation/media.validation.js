import { z } from "zod";

export const uploadMediaSchema = {
  query: z
    .object({
      module: z.enum(["avatar", "event-banner", "generic"]).optional()
    })
    .strict()
};

