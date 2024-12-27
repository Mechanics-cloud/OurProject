import * as React from 'react'
import Cropper, { Point } from 'react-easy-crop'

import {
  ControllersPanel,
  ImageStore,
  usePhotoCrop,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'

type Props = {
  photo: ImageStore
}

export const PhotoCrop = observer(({ photo }: Props) => {
  const { cropImage, onCropComplete } = usePhotoCrop(photo)

  return (
    <>
      <Cropper
        aspect={photo.crop.aspect}
        crop={photo.crop.cropPointStart as Point}
        image={photo.url as string}
        onCropChange={cropImage.changeCropPointStart}
        onCropComplete={onCropComplete}
        onZoomChange={cropImage.changeZoom}
        zoom={photo.crop.zoom ?? 1}
      />
      <ControllersPanel id={photo.id} />
    </>
  )
})
