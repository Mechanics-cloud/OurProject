import * as React from 'react'

import { AddPhotoControllerPopover } from '@/features/createPost/ui/cropping/AddPhotoControllerPopover'
import { RatioControllerPopover } from '@/features/createPost/ui/cropping/RatioControllerPopover'
import { ScaleControllerPopover } from '@/features/createPost/ui/cropping/ScaleControllerPopover'

export const ControllersPanel = () => {
  return (
    <span className={'absolute p-2.5 bottom-0 left-0 right-0 flex gap-6'}>
      <RatioControllerPopover />
      <ScaleControllerPopover />
      <AddPhotoControllerPopover />
    </span>
  )
}
