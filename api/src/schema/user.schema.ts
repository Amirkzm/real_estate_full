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

export const onlineUserSchema = z.object({
  socketId: z.string(),
  userId: z.string(),
});

export type onlineUser = z.infer<typeof onlineUserSchema>;

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(4),
  email: z.string().email(),
  avatar: z.union([z.string(), z.null()]),
  googleId: z.union([z.string(), z.null()]),
  createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
