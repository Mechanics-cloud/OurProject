import * as React from 'react'
import { useState } from 'react'

import { Image, ImageOutline, PlusCircleOutline } from '@/assets/icons'
import { Popover, PopoverContent, PopoverTrigger } from '@/common'
import { addPostStore } from '@/features/createPost/model/addPostPhotoStore'
import { PhotoControllerButton } from '@/features/createPost/ui/components/photoControllerButton/PhotoControllerButton'

type Props = {
  id: string
}

export const AddPhotoControllerPopover = ({ id }: Props) => {
  const [isOpen, setIsOpen] = useState(false)
  const photos = addPostStore

  return (
    <Popover
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <PhotoControllerButton className={'ml-auto'}>
          {isOpen ? (
            <Image
              className={'w-[28px] h-[28px]  self-start text-accent-500'}
            />
          ) : (
            <ImageOutline className={'w-[28px] h-[28px] self-start'} />
          )}
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
