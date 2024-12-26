import { ChangeEvent, useContext, useState } from 'react'

import { useTranslation } from '@/common'
import {
  SwiperContext,
  addImageCheck,
  addPostStore,
} from '@/features/createPost'
import { MaxPostImagesCount } from '@/features/createPost/model/constants'

export const useAddPhotoControllerPopover = () => {
  const { t } = useTranslation()
  const context = useContext(SwiperContext)
  const [isOpen, setIsOpen] = useState(false)
  const photos = addPostStore.images.allItems
  const totalCount = addPostStore.images.count
  const isAddingDisabled = totalCount === MaxPostImagesCount

  if (!context) {
    throw new Error('Slide must be used within a Swiper provider')
  }

  const { goToSlide } = context

  const onPhotoChoose = async (inputEvent: ChangeEvent<HTMLInputElement>) => {
    const fileList = inputEvent.target.files

    if (fileList) {
      const files: File[] = Array.from(fileList)

      await addImageCheck(files, totalCount, t, addPostStore.addImage)
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
