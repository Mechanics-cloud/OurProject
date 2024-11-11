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
import { addPostStore } from '@/features/createPost/model/addPostPhotoStore'
import { PhotoCrop } from '@/features/createPost/ui/cropping/PhotoCrop'
import { observer } from 'mobx-react-lite'
import {
  EffectFade,
  HashNavigation,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

//todo убрать fade эффект

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
          <Swiper
            allowTouchMove={false}
            className={cn(
              'absolute h-full w-full top-0 left-0 m-0 shrink-0,',
              'addPost'
            )}
            effect={'fade'}
            grabCursor={false}
            hashNavigation={{
              watchState: true,
            }}
            keyboard={{
              enabled: true,
            }}
            modules={[Navigation, Pagination, EffectFade, HashNavigation]}
            navigation
            noSwiping
            noSwipingSelector={'button'}
            pagination={{
              clickable: true,
            }}
            simulateTouch={false}
            spaceBetween={30}
            touchStartPreventDefault={false}
            watchSlidesProgress
          >
            {photos.map((photo, index) => (
              <SwiperSlide
                className={'w-full bg-dark-500 relative'}
                key={'index'}
              >
                <PhotoCrop photo={photo} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </DialogDescription>
    </DialogContent>
  )
})
