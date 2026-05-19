import { z } from "zod";

const emailSchema = z.string().trim().email();
const passwordSchema = z.string().min(8).max(128);

export const registerSchema = {
  body: z
    .object({
      name: z.string().trim().min(2).max(80),
      email: emailSchema,
      password: passwordSchema
    })
    .strict()
};

export const loginSchema = {
  body: z
    .object({
      email: emailSchema,
      password: z.string().min(1)
    })
    .strict()
};

export const firstLoginPasswordSchema = {
  body: z
    .object({
      newPassword: passwordSchema
    })
    .strict()
};

