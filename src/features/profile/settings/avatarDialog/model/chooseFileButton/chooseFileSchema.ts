import { z } from 'zod'

export const chooseFileSchema = z.object({
  fileSize: z.number().max(10 * 1024 * 1024, {
    message: 'Photo size must be less than 10 MB!',
  }),
  fileType: z
    .string()
    .refine((type) => ['image/jpeg', 'image/jpg', 'image/png'].includes(type), {
      message: 'The format of the uploaded photo must be PNG or JPEG',
    }),
})

export type ChooseFileSchemaType = z.infer<typeof chooseFileSchema>
