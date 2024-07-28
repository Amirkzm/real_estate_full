import { z } from "zod";

export const RegisterSchema = z.object({
  username: z.string().min(4),
  email: z
    .string()
    .email()
    .transform((val) => val.toLowerCase()),
  password: z.string().min(6),
});

export const LoginSchema = z.object({
  username: z.string().transform((val) => val.toLowerCase()),
  password: z.string().min(6),
});

export const JwtPayloadSchema = z.object({
  Id: z.string(),
  iat: z.number(),
  exp: z.number(),
});

export type SignUpData = z.infer<typeof RegisterSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
