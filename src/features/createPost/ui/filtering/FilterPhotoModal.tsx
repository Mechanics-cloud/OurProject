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
import { Filters, SwiperCover, addPostStore } from '@/features/createPost'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

export const FilterPhotoModal = observer(() => {
  const { t } = useTranslation()
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
            className={'arrowBack'}
            onClick={prevStage}
          />
          <span>{t.createPost.filtering.title}</span>
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
        className={cn('m-0 p-0 lg:m-0 lg:p-0')}
      >
        <div className={'flex h-[490px] relative'}>
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
                  alt={t.createPost.alt}
                  className={cn('object-center object-contain w-full h-auto')}
                  height={0}
                  src={photo.imgUrlToShow ?? photo.url}
                  style={{ filter: photo.filter }}
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
})
