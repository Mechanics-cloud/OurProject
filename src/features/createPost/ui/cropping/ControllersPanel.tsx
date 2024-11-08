import * as React from 'react'

import { ImageOutline } from '@/assets/icons'
import { PhotoControllerButton } from '@/features/createPost/ui/components/photoControllerButton/PhotoControllerButton'
import { RatioControllerPopover } from '@/features/createPost/ui/cropping/RatioControllerPopover'
import { ScaleControllerPopover } from '@/features/createPost/ui/cropping/ScaleControllerPopover'

export const ControllersPanel = () => {
  return (
    <span className={'absolute p-2.5 bottom-0 left-0 right-0 flex gap-6'}>
      <RatioControllerPopover />
      <ScaleControllerPopover />

      <PhotoControllerButton
        className={'ml-auto'}
        onClick={() => {
          alert('dsd')
        }}
      >
        <ImageOutline className={'w-[28px] h-[28px] self-start'} />
      </PhotoControllerButton>
    </span>
  )
}
