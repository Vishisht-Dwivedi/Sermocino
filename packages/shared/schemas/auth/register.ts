import { z } from "zod"

export const RegisterSchema = z.object({
  email: z
    .email("Invalid email format")
    .max(254),

  password: z
    .string()
    .min(8)
    .max(64)
    .regex(/[A-Z]/, "Must contain uppercase letter")
    .regex(/[a-z]/, "Must contain lowercase letter")
    .regex(/[0-9]/, "Must contain number")
    .regex(/[^A-Za-z0-9]/, "Must contain special character")
})

export type RegisterInput = z.infer<typeof RegisterSchema>