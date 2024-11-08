import * as React from 'react'

import { MaximizeOutline } from '@/assets/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/common'
import { Slider } from '@/features/createPost/ui/components'
import { PhotoControllerButton } from '@/features/createPost/ui/components/photoControllerButton/PhotoControllerButton'

export const ScaleControllerPopover = () => {
  //todo сменить при открытом поповере иконку

  return (
    <Popover>
      <PopoverTrigger asChild>
        <PhotoControllerButton>
          <MaximizeOutline className={'w-[28px] h-[28px]'} />
        </PhotoControllerButton>
      </PopoverTrigger>
      <PopoverContent
        align={'start'}
        className={'popoverOpacity py-5 px-3 border-0 bg-transparent'}
        side={'top'}
        sideOffset={2}
      >
        <Slider
          defaultValue={[0]}
          max={100}
          min={0}
        />
      </PopoverContent>
    </Popover>
  )
}
