import { ChangeEvent, useContext, useState } from 'react'

import { useTranslation } from '@/common'
import {
  MaxPhotoCount,
  SwiperContext,
  addPhotosCheck,
  addPostStore,
} from '@/features/createPost'

export const useAddPhotoControllerPopover = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const addPostPhoto = addPostStore.addPhoto
  const photos = addPostStore.photos
  const totalCount = addPostStore.getCurrentPhotosCount()
  const isAddingDisabled = totalCount === MaxPhotoCount
  const context = useContext(SwiperContext)

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
