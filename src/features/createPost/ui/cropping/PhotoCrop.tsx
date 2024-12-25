import * as React from 'react'
import Cropper, { Point } from 'react-easy-crop'

import {
  ControllersPanel,
  PhotoStore,
  // PostPhoto,
  usePhotoCrop,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'

type Props = {
  photo: PhotoStore
}

export const PhotoCrop = observer(({ photo }: Props) => {
  const { addCrop, addZoom, onCropComplete } = usePhotoCrop(photo)

  return (
    <>
      <Cropper
        aspect={photo.aspect}
        crop={photo.crop as Point}
        image={photo.url as string}
        onCropChange={addCrop || (() => {})}
        onCropComplete={onCropComplete}
        onZoomChange={addZoom}
        zoom={photo.zoom ?? 1}
      />
      <ControllersPanel id={photo.id} />
    </>
  )
})
