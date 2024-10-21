import { FileSizes } from '@/common/enums'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

export const chooseFileSchema = (t: LocaleType) => {
  return z.object({
    fileSize: z.number().max(10 * FileSizes.OneMB, {
      message: t.avatarModal.errors.fileSize,
    }),
    fileType: z
      .string()
      .refine(
        (type) => ['image/jpeg', 'image/jpg', 'image/png'].includes(type),
        {
          message: t.avatarModal.errors.fileType,
        }
      ),
  })
}

export type ChooseFileSchemaType = z.infer<ReturnType<typeof chooseFileSchema>>
