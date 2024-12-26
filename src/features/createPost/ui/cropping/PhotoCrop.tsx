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
  const { cropObject, onCropComplete } = usePhotoCrop(photo)

  return (
    <>
      <Cropper
        aspect={photo.crop.aspect}
        crop={photo.crop.cropPointStart as Point}
        image={photo.url as string}
        onCropChange={cropObject.changeCropPointStart}
        onCropComplete={onCropComplete}
        onZoomChange={cropObject.changeZoom}
        zoom={photo.crop.zoom ?? 1}
      />
      <ControllersPanel id={photo.id} />
    </>
  )
})
