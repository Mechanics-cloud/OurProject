import { FileSizes, oneMB } from '@/common/enums'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const addPhotoSchema = (t: LocaleType) => {
  return z.object({
    photoSize: z.number().max(FileSizes.PostPhotoSize, {
      message: t.basic.errors.tooBigFile(FileSizes.PostPhotoSize / oneMB),
    }),
    photoType: z
      .string()
      .refine(
        (type) => ['image/jpeg', 'image/jpg', 'image/png'].includes(type),
        {
          message: t.basic.errors.type('PNG or JPG/JPEG'),
        }
      ),
  })
}

export type AddPhotoSchema = z.infer<ReturnType<typeof addPhotoSchema>>
