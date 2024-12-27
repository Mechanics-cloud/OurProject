import { FileSizes, oneMB } from '@/common/enums'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const chooseFileSchema = (t: LocaleType) => {
  return z.object({
    fileSize: z.number().max(FileSizes.UserPhotoSize, {
      message: t.basic.errors.tooBigFile(FileSizes.UserPhotoSize / oneMB),
    }),
    fileType: z
      .string()
      .refine(
        (type) => ['image/jpeg', 'image/jpg', 'image/png'].includes(type),
        {
          message: t.basic.errors.type('PNG or JPG/JPEG'),
        }
      ),
  })
}

export type ChooseFileSchemaType = z.infer<ReturnType<typeof chooseFileSchema>>
