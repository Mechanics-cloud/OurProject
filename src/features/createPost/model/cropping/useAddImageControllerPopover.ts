import { ChangeEvent, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { useTranslation } from '@/common'
import {
  SwiperContext,
  addImageCheck,
  createPostStore,
} from '@/features/createPost'
import { MaxPostImagesCount } from '@/features/createPost/model/constants'

export const useAddImageControllerPopover = () => {
  const { t } = useTranslation()
  const context = useContext(SwiperContext)
  const [isOpen, setIsOpen] = useState(false)
  const images = createPostStore.images.allItems
  const totalCount = createPostStore.images.count
  const isAddingDisabled = totalCount === MaxPostImagesCount

  if (!context) {
    throw new Error('Slide must be used within a Swiper provider')
  }

  const { goToSlide } = context

  const onPhotoChoose = async (inputEvent: ChangeEvent<HTMLInputElement>) => {
    const fileList = inputEvent.target.files

    if (fileList) {
      try {
        const files: File[] = Array.from(fileList)

        await addImageCheck(files, totalCount, t, createPostStore.addImage)
        goToSlide(totalCount + 1)
      } catch (error) {
        toast.error((error as Error).message)
      }
    }
  }

  return {
    goToSlide,
    images,
    isAddingDisabled,
    isOpen,
    onPhotoChoose,
    setIsOpen,
    t,
  }
}
