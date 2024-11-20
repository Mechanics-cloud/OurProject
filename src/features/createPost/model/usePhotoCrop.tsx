import { useCallback, useEffect, useMemo } from 'react'
import { Area, Point } from 'react-easy-crop'

import { PostPhoto, addPostStore } from '@/features/createPost'
import { toJS } from 'mobx'

export const usePhotoCrop = (photo: PostPhoto) => {
  const addZoom = addPostStore.addZoom
  const addCrop = useMemo(() => addPostStore.addCrop, [])
  const addCroppedArea = addPostStore.addCroppedArea

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    addCroppedArea(photo.id, toJS(croppedAreaPixels))
  }

  const onZoom = (zoom: number) => {
    addZoom(photo.id, zoom)
  }

  const onCrop = useCallback(
    (crop: Point) => {
      addCrop(photo.id, crop)
    },
    [addCrop, photo.id]
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onCrop(photo.cropDataSave ?? { x: 0, y: 0 })
    }, 0)

    return () => clearTimeout(timeoutId)
  }, [onCrop, photo.cropDataSave])

  return {
    onCrop,
    onCropComplete,
    onZoom,
  }
}
