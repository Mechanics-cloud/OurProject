import { PASSWORD_REGEXP } from '@/common/constants'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const recoveryPasswordSchema = (t: LocaleType) => {
  return z
    .object({
      confirm: z
        .string()
        .min(6, { message: t.validation.password.minChar })
        .max(20, { message: t.validation.password.maxChar }),
      password: z
        .string()
        .min(6, { message: t.validation.password.minChar })
        .max(20, { message: t.validation.password.maxChar })
        .regex(PASSWORD_REGEXP, {
          message:
            t.validation.password.composition +
            ' a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
        }),
    })
    .refine((data) => data.password === data.confirm, {
      message: t.validation.password.match,
      path: ['confirm'],
    })
}

export type RecoveryPasswordFields = z.infer<
  ReturnType<typeof recoveryPasswordSchema>
>
