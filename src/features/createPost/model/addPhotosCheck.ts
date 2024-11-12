import { toast } from 'react-toastify'

import {
  AddPhotoSchema,
  addPhotoSchema,
} from '@/features/createPost/model/addPhotoSchema'
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
  for (let i = 0; i < files.length; i++) {
    if (totalCount === 10) {
      toast('Limit is 10')
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
        toast('Something went wrong')
      }
    }
  }

  if (totalCount === MaxPhotoCount) {
    {
      return
    }
  }
}
