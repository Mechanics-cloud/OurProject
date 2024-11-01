import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const forgotPasswordSchema = (t: LocaleType) => {
  return z.object({
    email: z
      .string({
        required_error: t.forgotPassword.schemaErrors.emailRequiredError,
      })
      .email({ message: t.forgotPassword.schemaErrors.email }),
    recaptcha: z.string().min(1),
  })
}

export type ForgotPasswordFields = z.infer<
  ReturnType<typeof forgotPasswordSchema>
>
