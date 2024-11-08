import * as React from 'react'

import { Expand } from '@/assets/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/common'
import { PhotoControllerButton } from '@/features/createPost/ui/components/photoControllerButton/PhotoControllerButton'
import { RatioControllerButtons } from '@/features/createPost/ui/cropping/RatioControllerButtons'

export const RatioControllerPopover = () => {
  //todo сменить при открытом поповере иконку

  return (
    <Popover>
      <PopoverTrigger asChild>
        <PhotoControllerButton>
          <Expand className={'w-[28px] h-[28px]'} />
        </PhotoControllerButton>
      </PopoverTrigger>
      <PopoverContent
        align={'start'}
        className={
          'p-3 flex gap-3 flex-col border-0 bg-transparent popoverOpacity'
        }
        side={'top'}
        sideOffset={2}
      >
        <RatioControllerButtons />
      </PopoverContent>
    </Popover>
  )
}
