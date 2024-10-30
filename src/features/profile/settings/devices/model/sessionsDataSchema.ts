import { IP_REGEXP } from '@/features/auth'
import { z } from 'zod'

export const sessionsDataSchema = z.object({
  browserName: z.string(),
  browserVersion: z.string(),
  deviceId: z.number(),
  ip: z.string().regex(IP_REGEXP, {
    message: 'Something went wrong',
  }),
  lastActive: z.string().datetime(),
  osName: z.string(),
  osVersion: z.string(),
})
