import { DATE_REGEX, USER_NAME_REGEXP } from '@/features/auth'
import { z } from 'zod'

export const generalInfoSchema = z.object({
  aboutMe: z.string().max(200, 'Maximum length is 200 symbols').optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  dateOfBirth: z
    .string()
    .optional()
    .refine((value) => !value || DATE_REGEX.test(value), {
      message: 'Date must be in DD.MM.YYYY format',
    }),
  firstName: z
    .string()
    .min(1, { message: 'Minimum length is 1 symbol' })
    .max(50, { message: 'Maximum length is 50 symbols' }),
  lastName: z
    .string()
    .min(1, { message: 'Minimum length is 1 symbol' })
    .max(50, { message: 'Maximum length is 50 symbols' }),
  userName: z
    .string()
    .min(6, { message: 'Minimum number of characters 6' })
    .max(30, { message: 'Maximum number of characters 30' })
    .regex(USER_NAME_REGEXP, {
      message: 'Input must contain only 0-9, A-Z, a-z, _, -',
    }),
})
