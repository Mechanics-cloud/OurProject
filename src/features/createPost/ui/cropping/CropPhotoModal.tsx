import * as React from 'react'
import { useState } from 'react'
import Cropper, { Area, Point } from 'react-easy-crop'

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
import { ControllersPanel } from '@/features/createPost/ui/cropping/ControllersPanel'
import { observer } from 'mobx-react-lite'
import {
  EffectFade,
  HashNavigation,
  Navigation,
  Pagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export const CropPhotoModal = observer(() => {
  const photos = addPostStore.photos
  const addZoom = addPostStore.addZoom
  const addCrop = addPostStore.addCrop

  const nextStage = addPostStore.nextStage
  const prevStage = addPostStore.prevStage

  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    //addCrop(photos[0].id, croppedAreaPixels)
  }

  const onZoom = (zoom: number) => {
    addZoom(photos[0].id, zoom)
  }

  const onCrop = (crop: Point) => {
    addCrop(photos[0].id, crop)
  }
  const [swiperInstance, setSwiperInstance] = useState<any>(null)

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
        <div
          className={'relative'}
          // className={'flex flex-col items-center h-[490px] m-0 p-0 relative'}
        >
          <Swiper
            className={cn(
              'max-w-[492px] h-[490px] w-full m-0 shrink-0,',
              'addPost'
            )}
            effect={'fade'}
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
            onSwiper={setSwiperInstance}
            pagination={{
              clickable: true,
            }}
            spaceBetween={30}
            touchStartPreventDefault={false}
            watchSlidesProgress
          >
            <SwiperSlide
              className={'w-full'}
              key={'index'}
            >
              <Cropper
                aspect={photos[0].aspect}
                crop={photos[0].crop as Point}
                image={photos[0].url as string}
                onCropChange={onCrop}
                onCropComplete={onCropComplete}
                onZoomChange={onZoom}
                zoom={photos[0].zoom ?? 1}
              />
            </SwiperSlide>
            <SwiperSlide
              className={'w-full'}
              key={'index'}
            >
              <Cropper
                aspect={photos[0].aspect}
                crop={photos[0].crop as Point}
                image={photos[0].url as string}
                onCropChange={onCrop}
                onCropComplete={onCropComplete}
                onZoomChange={onZoom}
                zoom={photos[0].zoom ?? 1}
              />
            </SwiperSlide>
          </Swiper>
          <ControllersPanel id={photos[0].id} />
        </div>
      </DialogDescription>
    </DialogContent>
  )
})
