import * as React from 'react'

import { DialogContent, DialogDescription, cn } from '@/common'
import { generalStore } from '@/core/store'
import {
  AddTextPost,
  ModalHeader,
  SwiperCover,
  usePublicationModal,
} from '@/features/createPost'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

type Props = {
  onPostUpload: () => void
}

export const PublicationModal = observer(({ onPostUpload }: Props) => {
  const { images, onPublishPost, t } = usePublicationModal(onPostUpload)

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
        onRightButtonClick={onPublishPost}
        rightButtonTitle={t.createPost.publication.publishButton}
        title={t.createPost.publication.title}
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
              'max-w-[490px] h-[490px] w-full m-0 shrink-0 bg-dark-500 relative mx-auto'
            )}
          >
            {images.map((image, index) => (
              <SwiperSlide
                className={cn('m-0 shrink-0 bg-dark-500 relative flex')}
                key={index}
              >
                <Image
                  alt={'Photo in carousel'}
                  className={cn(
                    'object-center object-contain w-full h-auto',
                    generalStore.isLoading ? 'animate-pulse' : ''
                  )}
                  height={490}
                  src={
                    generalStore.isLoading
                      ? (image.imgUrlToShow ?? image.url)
                      : (image.preparedImgData.photoUrl ?? image.url)
                  }
                  style={{ filter: image.filter.filterStyle }}
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
