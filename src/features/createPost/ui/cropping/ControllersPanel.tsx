import * as React from 'react'

import { Expand, ImageOutline, MaximizeOutline } from '@/assets/icons'
import { PhotoControllerButton } from '@/features/createPost/ui/components/photoControllerButton/PhotoControllerButton'

type Props = {}
export const ControllersPanel = ({}: Props) => {
  return (
    <span className={'absolute p-2.5 bottom-0 left-0 right-0 flex gap-6'}>
      <PhotoControllerButton
        onClick={() => {
          alert('dsd')
        }}
      >
        <Expand className={'w-[28px] h-[28px]'} />
      </PhotoControllerButton>

      <PhotoControllerButton
        onClick={() => {
          alert('dsd')
        }}
      >
        <MaximizeOutline className={'w-[28px] h-[28px]'} />
      </PhotoControllerButton>

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
