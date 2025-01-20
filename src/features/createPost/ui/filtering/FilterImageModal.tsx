import * as React from 'react'

import { DialogContent, DialogDescription, cn, useTranslation } from '@/common'
import {
  Filters,
  ModalHeader,
  SwiperCover,
  createPostStore,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

export const FilterImageModal = observer(() => {
  const { t } = useTranslation()
  const images = createPostStore.images.allItems

  return (
    <DialogContent
      className={cn(
        'md:max-w-[972px] gap-0',
        'max-w-full md:bg-dark-300 bg-dark-700 md:border border-0 w-full',
        'md:top-[50%] md:translate-y-[-50%] top-0 translate-y-0 overflow-y-auto h-full md:h-auto'
      )}
      crossOff
    >
      <ModalHeader
        onRightButtonClick={createPostStore.nextStage}
        rightButtonTitle={t.basic.next}
        title={t.createPost.filtering.title}
      />

      <DialogDescription
        asChild
        className={cn(
          'm-0 p-0 lg:m-0 lg:p-0 flex flex-wrap md:flex-nowrap max-w-[972px]'
        )}
      >
        <div className={'flex relative'}>
          <SwiperCover
            className={cn(
              'w-full max-w-[490px] h-[490px] m-0 shrink-0 bg-dark-500 relative mx-auto'
            )}
          >
            {images.map((image, index) => (
              <SwiperSlide
                className={cn('m-0 shrink-0 bg-dark-500 relative flex')}
                key={index}
              >
                <Image
                  alt={t.createPost.alt}
                  className={cn('object-center object-contain w-full h-auto')}
                  height={0}
                  src={image.imgUrlToShow ?? image.url}
                  style={{ filter: image.filter.filterStyle }}
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
