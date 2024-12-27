import * as React from 'react'
import Cropper, { Point } from 'react-easy-crop'

import {
  ControllersPanel,
  ImageStore,
  useImageCrop,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'

type Props = {
  image: ImageStore
}

export const ImageCrop = observer(({ image }: Props) => {
  const { cropImage, onCropComplete } = useImageCrop(image)

  return (
    <>
      <Cropper
        aspect={image.crop.aspect}
        crop={image.crop.cropPointStart as Point}
        image={image.url as string}
        onCropChange={cropImage.changeCropPointStart}
        onCropComplete={onCropComplete}
        onZoomChange={cropImage.changeZoom}
        zoom={image.crop.zoom ?? 1}
      />
      <ControllersPanel id={image.id} />
    </>
  )
})
