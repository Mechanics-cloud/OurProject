import { z } from 'zod'

export const signUpSchema = z.object({
  agreesToTOS: z.literal(true),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(20)
    .regex(/^[0-9A-Za-z!"#$%&'()*+,\-./:;<=>?@[\]^_`{|}~ ]+$/, {
      message: 'Password must contain only the specified characters',
    }),
  passwordConfirmation: z.string().min(6).max(20),
  username: z
    .string()
    .min(6)
    .max(30)
    .regex(/^[0-9A-Za-z_-]+$/, {
      message: 'Input must contain only 0-9, A-Z, a-z, _, -',
    }),
})

export type SignUpFields = z.infer<typeof signUpSchema>
