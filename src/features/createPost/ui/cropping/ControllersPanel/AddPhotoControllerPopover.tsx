import * as React from 'react'

import { Image, ImageOutline, PlusCircleOutline } from '@/assets/icons'
import { Popover, PopoverContent, PopoverTrigger, Tooltip, cn } from '@/common'
import {
  MiniaturePhoto,
  PhotoControllerButton,
  useAddPhotoControllerPopover,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'

export const AddPhotoControllerPopover = observer(() => {
  const {
    goToSlide,
    isAddingDisabled,
    isOpen,
    onPhotoChoose,
    photos,
    setIsOpen,
    t,
  } = useAddPhotoControllerPopover()

  return (
    <Popover
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <PhotoControllerButton className={'ml-auto'}>
          <Tooltip title={t.createPost.cropping.gallery}>
            {isOpen ? (
              <Image
                className={'w-[28px] h-[28px] self-start text-accent-500'}
              />
            ) : (
              <ImageOutline className={'w-[28px] h-[28px] self-start'} />
            )}
          </Tooltip>
        </PhotoControllerButton>
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
          {photos.length > 0 &&
            photos.map((photo, index) => (
              <MiniaturePhoto
                id={photo.id}
                key={photo.id}
                onClick={() => {
                  goToSlide(index)
                }}
                src={photo.url}
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
