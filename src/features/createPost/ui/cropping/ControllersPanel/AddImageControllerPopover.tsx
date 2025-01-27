import * as React from 'react'

import { Image, ImageOutline, PlusCircleOutline } from '@/assets/icons'
import { Popover, PopoverContent, PopoverTrigger, Tooltip, cn } from '@/common'
import {
  ControllerButton,
  MiniaturePhoto,
  useAddImageControllerPopover,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'

export const AddImageControllerPopover = observer(() => {
  const {
    goToSlide,
    images,
    isAddingDisabled,
    isOpen,
    onPhotoChoose,
    setIsOpen,
    t,
  } = useAddImageControllerPopover()

  return (
    <Popover
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <ControllerButton className={'ml-auto'}>
          <Tooltip title={t.createPost.cropping.gallery}>
            {isOpen ? (
              <Image
                className={'w-[28px] h-[28px] self-start text-accent-500'}
              />
            ) : (
              <ImageOutline className={'w-[28px] h-[28px] self-start'} />
            )}
          </Tooltip>
        </ControllerButton>
      </PopoverTrigger>
      <PopoverContent
        align={'end'}
        className={
          'popoverOpacity py-5 px-3 border-0 bg-transparent flex flex-wrap gap-3'
        }
        side={'top'}
        sideOffset={2}
      >
        <div className={'flex gap-3 flex-wrap justify-end max-w-[360px]'}>
          {images.length > 0 &&
            images.map((image, index) => (
              <MiniaturePhoto
                id={image.id}
                key={image.id}
                onClick={() => {
                  goToSlide(index)
                }}
                src={image.url}
              />
            ))}
        </div>
        <Tooltip title={t.createPost.cropping.add}>
          <label className={'justify-self-end'}>
            <PlusCircleOutline
              className={cn(
                'w-7 h-7 hover:text-accent-500',
                isAddingDisabled ? 'opacity-50 hover:text-light-100' : ''
              )}
            />
            <input
              accept={'image/*, .png, .jpg, .jpeg'}
              className={'sr-only'}
              disabled={isAddingDisabled}
              onChange={onPhotoChoose}
              type={'file'}
            />
          </label>
        </Tooltip>
      </PopoverContent>
    </Popover>
  )
})
