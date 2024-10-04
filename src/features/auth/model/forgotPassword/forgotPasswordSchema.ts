import { z } from 'zod'

export const forgotPasswordSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  recaptcha: z.string().min(1),
})

export type ForgotPasswordFields = z.infer<typeof forgotPasswordSchema>
