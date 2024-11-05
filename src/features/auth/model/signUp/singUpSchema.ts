import { PASSWORD_REGEXP, USER_NAME_REGEXP } from '@/common/constants'
import { z } from 'zod'

export const signUpSchema = z
  .object({
    agreesToTOS: z.literal<boolean>(true),
    confirm: z.string().min(6).max(20),
    email: z.string({ required_error: 'Email is required' }).email({
      message: 'The email must match the format example@example.com',
    }),
    password: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(20, { message: 'Maximum number of characters 20' })
      .regex(PASSWORD_REGEXP, {
        message:
          'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
      }),
    userName: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(30, { message: 'Maximum number of characters 30' })
      .regex(USER_NAME_REGEXP, {
        message: 'Input must contain only 0-9, A-Z, a-z, _, -',
      }),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords must match',
    path: ['confirm'],
  })

export type SignUpFields = z.infer<typeof signUpSchema>
