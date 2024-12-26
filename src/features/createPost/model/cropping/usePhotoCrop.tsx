import { useEffect } from 'react'
import { Area } from 'react-easy-crop'

import { ImageStore } from '@/features/createPost'
import { toJS } from 'mobx'

export const usePhotoCrop = (photo: ImageStore) => {
  const addCrop = photo.crop.changeCropPointStart
  const addZoom = photo.crop.changeZoom
  const addCroppedArea = photo.crop.changeCroppedArea

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    if (addCroppedArea) {
      addCroppedArea(toJS(croppedAreaPixels))
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (addCrop) {
        addCrop(photo.crop.cropDataSave ?? { x: 0, y: 0 })
      }
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [addCrop, photo.crop.cropDataSave])

  return {
    addCrop,
    addZoom,
    onCropComplete,
  }
}
