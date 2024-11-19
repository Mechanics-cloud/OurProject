import * as React from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import {
  ControllersPanel,
  PostPhoto,
  addPostStore,
} from '@/features/createPost'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

type Props = {
  photo: PostPhoto
}

export const PhotoCrop = observer(({ photo }: Props) => {
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
    onCrop(photo.cropDataSave ?? { x: 0, y: 0 })
  }, [onCrop, photo.cropDataSave])

  return (
    <>
      <Cropper
        aspect={photo.aspect}
        crop={photo.crop as Point}
        image={photo.url as string}
        onCropChange={onCrop}
        onCropComplete={onCropComplete}
        onZoomChange={onZoom}
        zoom={photo.zoom ?? 1}
      />
      <ControllersPanel id={photo.id} />
    </>
  )
})
