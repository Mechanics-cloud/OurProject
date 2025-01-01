import { FileSizes, oneMB } from '@/common/enums'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const addImageSchema = (t: LocaleType) => {
  return z.object({
    imageSize: z.number().max(FileSizes.PostPhotoSize, {
      message: t.basic.errors.tooBigFile(FileSizes.PostPhotoSize / oneMB),
    }),
    imageType: z
      .string()
      .refine(
        (type) => ['image/jpeg', 'image/jpg', 'image/png'].includes(type),
        {
          message: t.basic.errors.type('PNG or JPG/JPEG'),
        }
      ),
  })
}

export type AddImageSchema = z.infer<ReturnType<typeof addImageSchema>>
