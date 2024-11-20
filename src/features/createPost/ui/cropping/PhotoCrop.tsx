import * as React from 'react'
import { useCallback, useEffect, useMemo } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

import {
  ControllersPanel,
  PostPhoto,
  addPostStore,
} from '@/features/createPost'
import { usePhotoCrop } from '@/features/createPost/model/usePhotoCrop'
import { toJS } from 'mobx'
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
