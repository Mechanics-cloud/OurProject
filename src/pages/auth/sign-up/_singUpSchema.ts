import { z } from 'zod'

export const signUpSchema = z.object({
  agreesToTOS: z.literal(true),
  email: z.string().email(),
  password: z.string(),
  passwordConfirmation: z.string(),
  username: z.string(),
})

export type SignUpFields = z.infer<typeof signUpSchema>
