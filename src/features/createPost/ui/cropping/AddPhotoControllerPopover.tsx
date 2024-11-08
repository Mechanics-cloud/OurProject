import * as React from 'react'

import {
  ImageOutline,
  MaximizeOutline,
  PlusCircleOutline,
} from '@/assets/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/common'
import { Slider } from '@/features/createPost/ui/components'
import { PhotoControllerButton } from '@/features/createPost/ui/components/photoControllerButton/PhotoControllerButton'

export const AddPhotoControllerPopover = () => {
  //todo сменить при открытом поповере иконку

  return (
    <Popover>
      <PopoverTrigger asChild>
        <PhotoControllerButton className={'ml-auto'}>
          <ImageOutline className={'w-[28px] h-[28px] self-start'} />
        </PhotoControllerButton>
      </PopoverTrigger>
      <PopoverContent
        align={'end'}
        className={
          'popoverOpacity py-5 px-3 border-0 bg-transparent flex justify-end'
        }
        side={'top'}
        sideOffset={2}
      >
        <PlusCircleOutline className={'w-7 h-7'} />
      </PopoverContent>
    </Popover>
  )
}
