import { z } from "zod"

export const LoginSchema = z.object({
  email: z
    .email("Invalid email format")
    .max(254),

  password: z
    .string()
    .min(8)
    .max(64)
})

export type LoginInput = z.infer<typeof LoginSchema>