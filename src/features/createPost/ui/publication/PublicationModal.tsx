import * as React from 'react'
import { toast } from 'react-toastify'

import { ArrowBackOutline } from '@/assets/icons'
import {
  Button,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  cn,
  responseErrorHandler,
  typographyVariants,
  useTranslation,
} from '@/common'
import { generalStore } from '@/core/store'
import { AddTextPost, SwiperCover, addPostStore } from '@/features/createPost'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

type Props = {
  onPostUpload: () => void
}

export const PublicationModal = observer(({ onPostUpload }: Props) => {
  const { t } = useTranslation()
  const prevStage = addPostStore.prevStage
  const photos = addPostStore.photos
  const isLoading = generalStore.isLoading

  const onPublishPost = async () => {
    try {
      generalStore.turnOnLoading()
      await addPostStore.uploadPost()
      onPostUpload()
      toast(t.createPost.publication.success)
    } catch (error) {
      responseErrorHandler(error)
    } finally {
      generalStore.turnOffLoading()
    }
  }

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
          <span>{t.createPost.publication.title}</span>
          <Button
            className={cn(
              'absolute text-accent-500 px-3 py-1.5 right-4 top-2 focus-within:outline-0',
              typographyVariants({ variant: 'h3' })
            )}
            disabled={isLoading}
            onClick={onPublishPost}
            variant={'text'}
          >
            {t.createPost.publication.publishButton}
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
                  alt={'Photo in carousel'}
                  className={cn(
                    'object-center object-contain w-full h-auto',
                    isLoading ? 'animate-pulse' : ''
                  )}
                  height={490}
                  src={
                    isLoading
                      ? (photo.imgUrlToShow ?? photo.url)
                      : (photo.preparedImgData.photoUrl ?? photo.url)
                  }
                  style={{ filter: photo.filter }}
                  width={490}
                />
              </SwiperSlide>
            ))}
          </SwiperCover>
          <AddTextPost />
        </div>
      </DialogDescription>
    </DialogContent>
  )
})
