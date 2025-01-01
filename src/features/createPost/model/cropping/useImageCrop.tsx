import { useEffect } from 'react'
import { Area } from 'react-easy-crop'

import { ImageStore } from '@/features/createPost'

export const useImageCrop = (photo: ImageStore) => {
  const cropImage = photo.crop

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    cropImage.changeCroppedArea(croppedAreaPixels)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      cropImage.changeCropPointStart(photo.crop.cropDataSave ?? { x: 0, y: 0 })
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [cropImage, photo.crop.cropDataSave])

  return {
    cropImage,
    onCropComplete,
  }
}
