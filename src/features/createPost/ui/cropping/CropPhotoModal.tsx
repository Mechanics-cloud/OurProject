import * as React from 'react'

import { ArrowBackOutline } from '@/assets/icons'
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  cn,
  typographyVariants,
  useTranslation,
} from '@/common'
import { PhotoCrop, SwiperCover, addPostStore } from '@/features/createPost'
import { observer } from 'mobx-react-lite'
import { SwiperSlide } from 'swiper/react'

export const CropPhotoModal = observer(() => {
  const { t } = useTranslation()
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
            className={'arrowBack'}
            onClick={prevStage}
          />
          <span>{t.createPost.cropping.title}</span>
          <Button
            className={cn(
              'absolute text-accent-500 px-3 py-1.5 right-4 top-2 focus-within:outline-0',
              typographyVariants({ variant: 'h3' })
            )}
            onClick={nextStage}
            variant={'text'}
          >
            {t.createPost.next}
          </Button>
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
