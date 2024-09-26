import { z } from 'zod'

export const signUpSchema = z
  .object({
    agreesToTOS: z.literal(true),
    confirm: z.string().min(6).max(20),
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z
      .string()
      .min(6)
      .max(20)
      .regex(/^[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~ ]+$/, {
        message: 'Password must contain only the specified characters',
      }),
    username: z
      .string()
      .min(6)
      .max(30)
      .regex(/^[0-9A-Za-z_-]+$/, {
        message: 'Input must contain only 0-9, A-Z, a-z, _, -',
      }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ['confirm'],
  })

export type SignUpFields = z.infer<typeof signUpSchema>
