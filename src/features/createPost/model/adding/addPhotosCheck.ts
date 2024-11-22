import { toast } from 'react-toastify'

import {
  AddPhotoSchema,
  addPhotoSchema,
} from '@/features/createPost/model/adding/addPhotoSchema'
import { MaxPhotoCount } from '@/features/createPost/model/constants'
import { LocaleType } from '@locales/ru'
import { z } from 'zod'

/**
 *
 * @param files - array of File[] to process
 * @param totalCount - current amount of added photos
 * @param t - translation object
 * @param addPostPhoto - add photo function
 */
export const addPhotosCheck = async (
  files: File[],
  totalCount: number,
  t: LocaleType,
  addPostPhoto: (file: File) => void
) => {
  const photosCount = files.length

  for (let i = 0; i < photosCount; i++) {
    if (totalCount === MaxPhotoCount || i === MaxPhotoCount) {
      toast(`${t.createPost.adding.errors.countLimit}${MaxPhotoCount}`)
      break
    }

    const photoData: AddPhotoSchema = {
      photoSize: files[i].size,
      photoType: files[i].type,
    }

    try {
      addPhotoSchema(t).parse(photoData)
      addPostPhoto(files[i])
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast(error.errors[0].message)
      } else {
        toast.error(t.createPost.adding.errors.basic)
      }
    }
  }

  if (totalCount === MaxPhotoCount) {
    {
      return
    }
  }
}
