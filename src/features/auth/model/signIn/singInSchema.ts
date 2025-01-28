import { PASSWORD_REGEXP } from '@/common/constants'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const signInSchema = (t: LocaleType) => {
  return z.object({
    email: z.string({ required_error: t.validation.email.required }).email({
      message: t.validation.email.composition,
    }),
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
}

export type SignInFields = z.infer<ReturnType<typeof signInSchema>>
