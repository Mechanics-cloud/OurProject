import { toast } from 'react-toastify'

import { isCanAddToArray } from '@/common'
import { AddImageSchema, addImageSchema } from '@/features/createPost'
import { MaxPostImagesCount } from '@/features/createPost/model/constants'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

/**
 *
 * @param files - array of File[] to process
 * @param totalCount - current amount of added photos
 * @param t - translation object
 * @param addPostImage - add photo function
 */
export const addImageCheck = async (
  files: File[],
  totalCount: number,
  t: LocaleType,
  addPostImage: (file: File) => void
) => {
  const imagesCount = files.length

  if (!isCanAddToArray({ totalCount })) {
    return
  }

  if (imagesCount === 0) {
    throw new Error('Wrong type (todo in 239)')
  }

  for (let i = 0; i < imagesCount; i++) {
    if (i === MaxPostImagesCount) {
      toast.error(
        `${t.createPost.adding.errors.countLimit}${MaxPostImagesCount}`
      )
      break
    }

    const imageData: AddImageSchema = {
      imageSize: files[i].size,
      imageType: files[i].type,
    }

    try {
      addImageSchema(t).parse(imageData)
      addPostImage(files[i])
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0].message)
      } else {
        throw new Error(t.createPost.adding.errors.basic)
      }
    }
  }
}
