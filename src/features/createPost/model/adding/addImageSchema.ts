import { FileSizes } from '@/common/enums'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const addImageSchema = (t: LocaleType) => {
  return z.object({
    imageSize: z.number().max(FileSizes.PostPhotoSize, {
      message: t.createPost.adding.errors.tooBig,
    }),
    imageType: z
      .string()
      .refine(
        (type) => ['image/jpeg', 'image/jpg', 'image/png'].includes(type),
        {
          message: t.createPost.adding.errors.type,
        }
      ),
  })
}

export type AddImageSchema = z.infer<ReturnType<typeof addImageSchema>>
