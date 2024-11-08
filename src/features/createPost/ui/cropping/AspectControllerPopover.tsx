import * as React from 'react'
import { useState } from 'react'

import { Expand } from '@/assets/icons'
import { Popover, PopoverContent, PopoverTrigger, cn } from '@/common'
import { PhotoControllerButton } from '@/features/createPost/ui/components/photoControllerButton/PhotoControllerButton'
import { AspectControllerButtons } from '@/features/createPost/ui/cropping/AspectControllerButtons'

type Props = {
  id: string
}

export const AspectControllerPopover = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Popover
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <PhotoControllerButton>
          <Expand
            className={cn('w-[28px] h-[28px]', isOpen ? 'text-accent-500' : '')}
          />
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
        <AspectControllerButtons id={id} />
      </PopoverContent>
    </Popover>
  )
}
