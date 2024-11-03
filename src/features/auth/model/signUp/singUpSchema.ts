import {
  PASSWORD_REGEXP,
  USER_NAME_REGEXP,
} from '@/features/auth/model/constants'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const signUpSchema = (t: LocaleType) => {
  return z
    .object({
      agreesToTOS: z.literal<boolean>(true),
      confirm: z
        .string()
        .min(6, { message: t.validation.password.minChar })
        .max(20, { message: t.validation.password.maxChar }),
      email: z
        .string({
          required_error: t.validation.email.required,
        })
        .email({
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
      userName: z
        .string()
        .min(6, { message: t.validation.password.minChar })
        .max(30, { message: t.validation.password.maxChar })
        .regex(USER_NAME_REGEXP, {
          message:
            t.signUpForm.schemaErrors.userNameComposition +
            ' 0-9, A-Z, a-z, _, -',
        }),
    })
    .refine((data) => data.password === data.confirm, {
      message: t.validation.password.match,
      path: ['confirm'],
    })
}

export type SignUpFields = z.infer<ReturnType<typeof signUpSchema>>
