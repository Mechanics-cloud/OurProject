import { IP_REGEXP } from '@/common/constants'
import { z } from 'zod'

export const sessionsDataSchema = z.object({
  browserName: z.enum([
    'Chrome',
    'Edge',
    'Firefox',
    'Opera',
    'Safari',
    'Yandex',
  ]),
  browserVersion: z.string(),
  deviceId: z.number(),
  ip: z.string().regex(IP_REGEXP, {
    message: 'Something went wrong',
  }),
  lastActive: z.string().datetime(),
  osName: z.string(),
  osVersion: z.string(),
})
