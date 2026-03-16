import { z } from "zod"

export const RegisterRequestSchema = z.object({
    email: z.email(),
    username: z.string(),
    password: z.string().min(8).max(64)
})

// export type LoginInput = z.infer<typeof LoginSchema>