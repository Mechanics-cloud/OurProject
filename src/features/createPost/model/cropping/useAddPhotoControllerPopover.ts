import { ChangeEvent, useContext, useState } from 'react'

import { useTranslation } from '@/common'
import {
  SwiperContext,
  addPhotosCheck,
  addPostStore,
} from '@/features/createPost'
import { MaxPhotoCount } from '@/features/createPost/model/constants'

export const useAddPhotoControllerPopover = () => {
  const { t } = useTranslation()
  const context = useContext(SwiperContext)
  const [isOpen, setIsOpen] = useState(false)
  const addPostPhoto = addPostStore.addPhoto
  const photos = addPostStore.photos.toArray
  const totalCount = addPostStore.photos.photoCount
  const isAddingDisabled = totalCount === MaxPhotoCount

  if (!context) {
    throw new Error('Slide must be used within a Swiper provider')
  }

  const { goToSlide } = context

  const onPhotoChoose = async (inputEvent: ChangeEvent<HTMLInputElement>) => {
    const fileList = inputEvent.target.files

    if (fileList) {
      const files: File[] = Array.from(fileList)

      await addPhotosCheck(files, totalCount, t, addPostPhoto)
      goToSlide(totalCount + 1)
    }
  }

  return {
    goToSlide,
    isAddingDisabled,
    isOpen,
    onPhotoChoose,
    photos,
    setIsOpen,
    t,
  }
}
