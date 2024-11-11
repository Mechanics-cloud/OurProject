import { FileSizes } from '@/common/enums'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const addPhotoSchema = (t: LocaleType) => {
  return z.object({
    photoSize: z.number().max(FileSizes.PostPhotoSize, {
      //todo перевод
      message: 'Photo is too big',
    }),
    photoType: z
      .string()
      .refine(
        (type) => ['image/jpeg', 'image/jpg', 'image/png'].includes(type),
        {
          message: 'Wrong type',
        }
      ),
  })
}

export type AddPhotoSchema = z.infer<ReturnType<typeof addPhotoSchema>>
