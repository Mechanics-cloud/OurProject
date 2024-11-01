import { PASSWORD_REGEXP } from '@/features/auth'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const recoveryPasswordSchema = (t: LocaleType) => {
  return z
    .object({
      confirm: z
        .string()
        .min(6, { message: t.recoveryPassword.schemaErrors.minCharPassword })
        .max(20, { message: t.recoveryPassword.schemaErrors.maxCharPassword }),
      password: z
        .string()
        .min(6, { message: t.recoveryPassword.schemaErrors.minCharPassword })
        .max(20, { message: t.recoveryPassword.schemaErrors.maxCharPassword })
        .regex(PASSWORD_REGEXP, {
          message:
            t.recoveryPassword.schemaErrors.passwordComposition +
            ' a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
        }),
    })
    .refine((data) => data.password === data.confirm, {
      message: t.recoveryPassword.schemaErrors.matchPassword,
      path: ['confirm'],
    })
}

export type RecoveryPasswordFields = z.infer<
  ReturnType<typeof recoveryPasswordSchema>
>
