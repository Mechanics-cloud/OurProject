import { PASSWORD_REGEXP } from '@/features/auth'
import { z } from 'zod'

export const recoveryPasswordSchema = z
  .object({
    confirm: z.string().min(6).max(20),
    password: z
      .string()
      .min(6, { message: 'Minimum number of characters 6' })
      .max(20, { message: 'Maximum number of characters 20' })
      .regex(PASSWORD_REGEXP, {
        message:
          'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
      }),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'Passwords must match',
    path: ['confirm'],
  })

export type RecoveryPasswordFields = z.infer<typeof recoveryPasswordSchema>
