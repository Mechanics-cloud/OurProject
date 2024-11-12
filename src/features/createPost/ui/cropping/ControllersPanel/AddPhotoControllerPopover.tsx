import * as React from 'react'
import { ChangeEvent, useContext, useState } from 'react'

import { Image, ImageOutline, PlusCircleOutline } from '@/assets/icons'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  cn,
  useTranslation,
} from '@/common'
import { addPhotosCheck } from '@/features/createPost/model/addPhotosCheck'
import { addPostPhotoStore } from '@/features/createPost/model/addPostPhotoStore'
import { MaxPhotoCount } from '@/features/createPost/model/constants'
import { SwiperContext } from '@/features/createPost/ui/components/SwiperCover'
import { PhotoControllerButton } from '@/features/createPost/ui/components/photoControllerButton/PhotoControllerButton'
import { MiniaturePhoto } from '@/features/createPost/ui/cropping/ControllersPanel/MiniaturePhoto'
import { observer } from 'mobx-react-lite'

export const AddPhotoControllerPopover = observer(() => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const addPostPhoto = addPostPhotoStore.addPhoto
  const photos = addPostPhotoStore.photos
  const totalCount = addPostPhotoStore.getCurrentPhotosCount()
  const isAddingDisabled = totalCount === MaxPhotoCount
  const context = useContext(SwiperContext)

  if (!context) {
    throw new Error('Slide must be used within a Swiper provider')
  }

  const { goToSlide } = context

  const onPhotoChoose = async (inputEvent: ChangeEvent<HTMLInputElement>) => {
    const fileList = inputEvent.target.files

    if (fileList) {
      const files: File[] = Array.from(fileList)

      await addPhotosCheck(files, totalCount, t, addPostPhoto)
      goToSlide(totalCount + 1)
    }
  }

  return (
    <Popover
      onOpenChange={setIsOpen}
      open={isOpen}
    >
      <PopoverTrigger asChild>
        <PhotoControllerButton className={'ml-auto'}>
          {isOpen ? (
            <Image className={'w-[28px] h-[28px] self-start text-accent-500'} />
          ) : (
            <ImageOutline className={'w-[28px] h-[28px] self-start'} />
          )}
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
      </PopoverContent>
    </Popover>
  )
})
