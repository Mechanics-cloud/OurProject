import * as React from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import { addPostPhotoStore } from '@/features/createPost/model/addPostPhotoStore'
import { PostPhoto } from '@/features/createPost/model/types'
import { ControllersPanel } from '@/features/createPost/ui/cropping/ControllersPanel/ControllersPanel'
import { toJS } from 'mobx'
import { observer } from 'mobx-react-lite'

type Props = {
  photo: PostPhoto
}

export const PhotoCrop = observer(({ photo }: Props) => {
  const addZoom = addPostPhotoStore.addZoom
  const addCrop = addPostPhotoStore.addCrop
  const addCroppedArea = addPostPhotoStore.addCroppedArea

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    addCroppedArea(photo.id, toJS(croppedAreaPixels))
  }

  const onZoom = (zoom: number) => {
    addZoom(photo.id, zoom)
  }

  const onCrop = (crop: Point) => {
    addCrop(photo.id, crop)
  }

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
