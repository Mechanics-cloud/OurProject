import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email({
    message: 'The email must match the format example@example.com',
  }),
  password: z
    .string()
    .min(6, { message: 'Minimum number of characters 6' })
    .max(20, { message: 'Maximum number of characters 20' })
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~])[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~]+$/,
      {
        message:
          'Password must contain a-z, A-Z,  ! " # $ % & \' ( ) * + , - . / : ; < = > ? @ [ \\ ] ^ _` { | } ~',
      }
    ),
})

export type SignInFields = z.infer<typeof signInSchema>
