import { z } from "zod"

export const SendOTPSchema = z.object({
  email: z
    .email("Invalid email format")
    .max(254),
})

export type SendOTPInput = z.infer<typeof SendOTPSchema>