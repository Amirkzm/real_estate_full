import { z } from "zod";

export const UpdateProfileSchema = z.object({
  username: z
    .string()
    .min(4)
    .optional()
    .transform((val) => val && val.toLowerCase()),
  email: z
    .string()
    .email()
    .optional()
    .transform((val) => val && val.toLowerCase()),
  avatar: z.string().url().optional(),
  password: z.string().min(6).optional(),
});
