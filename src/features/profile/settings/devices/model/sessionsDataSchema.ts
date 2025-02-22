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
  ip: z.string(),
  lastActive: z.string().datetime(),
  osName: z.string(),
  osVersion: z.string(),
})
