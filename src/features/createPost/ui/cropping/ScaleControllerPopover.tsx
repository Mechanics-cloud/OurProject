import * as React from 'react'

import { Expand } from '@/assets/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/common'
import { PhotoControllerButton } from '@/features/createPost/ui/components/photoControllerButton/PhotoControllerButton'
import { ScaleControllerButtons } from '@/features/createPost/ui/cropping/ScaleControllerButtons'

export const ScaleControllerPopover = () => {
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
          'relative w-48 z-50 border-0 bg-transparent before:top-0 before:left-0 before:right-0 before:bottom-0 before:absolute before:bg-dark-500 before:-z-10 before:opacity-80 p-3 flex gap-3 flex-col'
        }
        side={'top'}
        sideOffset={2}
      >
        <ScaleControllerButtons />
      </PopoverContent>
    </Popover>
  )
}
