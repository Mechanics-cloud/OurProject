import * as React from 'react'
import Cropper, { Point } from 'react-easy-crop'

import {
  ControllersPanel,
  PostPhoto,
  usePhotoCrop,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'

type Props = {
  photo: PostPhoto
}

export const PhotoCrop = observer(({ photo }: Props) => {
  const { onCrop, onCropComplete, onZoom } = usePhotoCrop(photo)

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
