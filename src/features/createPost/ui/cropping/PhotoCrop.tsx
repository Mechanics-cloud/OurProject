import * as React from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import { addPostStore } from '@/features/createPost/model/addPostPhotoStore'
import { PostPhoto } from '@/features/createPost/model/types'
import { ControllersPanel } from '@/features/createPost/ui/cropping/ControllersPanel/ControllersPanel'
import { observer } from 'mobx-react-lite'

type Props = {
  goToSlide: (index: number) => void
  photo: PostPhoto
}

export const PhotoCrop = observer(({ goToSlide, photo }: Props) => {
  const addZoom = addPostStore.addZoom
  const addCrop = addPostStore.addCrop

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    //addCrop(photos[0].id, croppedAreaPixels)
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
      <ControllersPanel
        goToSlide={goToSlide}
        id={photo.id}
      />
    </>
  )
})
