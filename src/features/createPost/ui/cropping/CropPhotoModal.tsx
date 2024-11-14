import * as React from 'react'

import { ArrowBackOutline } from '@/assets/icons'
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  cn,
  typographyVariants,
} from '@/common'
import { PhotoCrop, SwiperCover, addPostStore } from '@/features/createPost'
import { observer } from 'mobx-react-lite'
import { SwiperSlide } from 'swiper/react'

export const CropPhotoModal = observer(() => {
  const photos = addPostStore.photos
  const nextStage = addPostStore.nextStage
  const prevStage = addPostStore.prevStage

  return (
    <DialogContent
      className={'max-w-[492px] gap-0'}
      crossOff
    >
      <DialogHeader>
        <DialogTitle className={'flex justify-center items-center relative'}>
          <ArrowBackOutline
            className={'absolute top-[18px] left-6'}
            onClick={prevStage}
          />
          <span>Cropping</span>
          <span
            className={cn(
              'absolute text-accent-500 cursor-pointer px-3 py-1.5 right-6 top-2',
              typographyVariants({ variant: 'h3' })
            )}
            onClick={nextStage}
          >
            Next
          </span>
        </DialogTitle>
      </DialogHeader>
      <DialogDescription
        asChild
        className={'lg:m-0 lg:p-0'}
      >
        <div className={'relative max-w-[492px] h-[490px]'}>
          <SwiperCover>
            {photos.map((photo, index) => (
              <SwiperSlide
                className={'w-full bg-dark-500 relative'}
                key={index}
              >
                <PhotoCrop photo={photo} />
              </SwiperSlide>
            ))}
          </SwiperCover>
        </div>
      </DialogDescription>
    </DialogContent>
  )
})
