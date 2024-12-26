import { useEffect } from 'react'
import { Area } from 'react-easy-crop'

import { ImageStore } from '@/features/createPost'

export const usePhotoCrop = (photo: ImageStore) => {
  const cropObject = photo.crop

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    cropObject.changeCroppedArea(croppedAreaPixels)
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      cropObject.changeCropPointStart(photo.crop.cropDataSave ?? { x: 0, y: 0 })
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [cropObject, photo.crop.cropDataSave])

  return {
    cropObject,
    onCropComplete,
  }
}
