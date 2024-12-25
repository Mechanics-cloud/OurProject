import { useCallback, useEffect } from 'react'
import { Area, Point } from 'react-easy-crop'

import { PostPhoto, addPostStore } from '@/features/createPost'
import { toJS } from 'mobx'

export const usePhotoCrop = (photo: PostPhoto) => {
  //const addZoom = addPostStore.addZoom
  // const addCrop = addPostStore.addCrop
  // const addCroppedArea = addPostStore.addCroppedArea
  const addCrop = addPostStore.photos.findImageById(photo.id)?.addCrop
  const addZoom = addPostStore.photos.findImageById(photo.id)?.addZoom
  const addCroppedArea = addPostStore.photos.findImageById(
    photo.id
  )?.addCroppedArea

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    if (addCroppedArea) {
      addCroppedArea(toJS(croppedAreaPixels))
    }
  }

  // const onZoom = (zoom: number) => {
  //   if (addZoom) {
  //     addZoom(zoom)
  //   }
  // }

  // const onCrop = useCallback(
  //   (crop: Point) => {
  //     addCrop(photo.id, crop)
  //   },
  //   [addCrop, photo.id]
  // )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (addCrop) {
        addCrop(photo.cropDataSave ?? { x: 0, y: 0 })
      }
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [addCrop, photo.cropDataSave])

  return {
    addCrop,
    addZoom,
    onCropComplete,
  }
}
