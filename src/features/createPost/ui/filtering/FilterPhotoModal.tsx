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
import { Filters, SwiperCover, addPostStore } from '@/features/createPost'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

export const FilterPhotoModal = () => {
  const nextStage = addPostStore.nextStage
  const prevStage = addPostStore.prevStage
  const photos = addPostStore.photos

  return (
    <DialogContent
      className={'max-w-[972px] gap-0'}
      crossOff
    >
      <DialogHeader>
        <DialogTitle className={'flex justify-center items-center relative'}>
          <ArrowBackOutline
            className={'absolute top-[18px] left-6'}
            onClick={prevStage}
          />
          <span>Filters</span>
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
        className={cn('m-0 p-0 lg:m-0 lg:p-0')}
      >
        <div className={'flex h-[504px] relative'}>
          <SwiperCover
            className={cn(
              'w-[490px] m-0 shrink-0 bg-dark-500 relative',
              'addPost addFilter'
            )}
          >
            {photos.map((photo, index) => (
              <SwiperSlide
                className={cn(
                  'w-[490px] m-0 shrink-0 bg-dark-500 relative flex',
                  'addPost'
                )}
                key={index}
              >
                <Image
                  alt={'Photo in carousel'}
                  className={'object-center object-contain w-full h-auto'}
                  height={0}
                  src={photo.croppedImgUrl.photoUrl ?? photo.url}
                  width={0}
                />
              </SwiperSlide>
            ))}
          </SwiperCover>
          <Filters />
        </div>
      </DialogDescription>
    </DialogContent>
  )
}
