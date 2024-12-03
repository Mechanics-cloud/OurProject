import { FileSizes } from '@/common/enums'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const addPhotoSchema = (t: LocaleType) => {
  return z.object({
    photoSize: z.number().max(FileSizes.PostPhotoSize, {
      message: t.createPost.adding.errors.tooBig,
    }),
    photoType: z
      .string()
      .refine(
        (type) => ['image/jpeg', 'image/jpg', 'image/png'].includes(type),
        {
          message: t.createPost.adding.errors.type,
        }
      ),
  })
}

export type AddPhotoSchema = z.infer<ReturnType<typeof addPhotoSchema>>
