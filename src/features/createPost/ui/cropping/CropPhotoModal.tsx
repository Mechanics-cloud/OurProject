import * as React from 'react'

import { DialogContent, DialogDescription, cn, useTranslation } from '@/common'
import {
  ModalHeader,
  PhotoCrop,
  SwiperCover,
  addPostStore,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'
import { SwiperSlide } from 'swiper/react'

export const CropPhotoModal = observer(() => {
  const { t } = useTranslation()
  const photos = addPostStore.photos
  const nextStage = addPostStore.nextStage

  return (
    <DialogContent
      className={cn(
        'md:max-w-[492px] gap-0',
        'md:bg-dark-300 bg-dark-700 md:border border-0 max-w-full h-full md:h-auto',
        'md:top-[50%] md:translate-y-[-50%] top-0 translate-y-0 overflow-visible'
      )}
      crossOff
    >
      <ModalHeader
        onRightButtonClick={nextStage}
        rightButtonTitle={t.createPost.next}
        title={t.createPost.cropping.title}
      />

      <DialogDescription
        asChild
        className={'md:m-0 lg:m-0 p-0'}
      >
        <div className={'relative max-w-full md:max-w-[492px] h-[490px]'}>
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
