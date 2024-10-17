import { USER_NAME_REGEXP } from '@/features/auth'
import { ABOUT_ME_REGEXP } from '@/features/profile/model/constants'
import { z } from 'zod'

export const generalInfoSchema = z.object({
  aboutMe: z
    .string()
    .max(200, 'Maximum length is 200 symbols')
    .regex(ABOUT_ME_REGEXP, {
      message:
        'Input must contain only 0-9; A-Z; a-z; А-Я; а-я or special symbols',
    })
    .optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  date: z.string().optional(),
  firstName: z
    .string()
    .min(1, { message: 'Minimum length is 1 symbol' })
    .max(50, { message: 'Maximum length is 50 symbols' }),
  lastName: z
    .string()
    .min(1, { message: 'Minimum length is 1 symbol' })
    .max(50, { message: 'Maximum length is 50 symbols' }),
  username: z // Change from userName to username
    .string()
    .min(6, { message: 'Minimum number of characters 6' })
    .max(30, { message: 'Maximum number of characters 30' })
    .regex(USER_NAME_REGEXP, {
      message: 'Input must contain only 0-9, A-Z, a-z, _, -',
    }),
})