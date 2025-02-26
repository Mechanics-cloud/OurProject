import React from 'react'

import { Stub, useTranslation } from '@/common'
import { CustomSwiper } from '@/common/components/swiper'
import { usePostStore } from '@/features/posts/model/postStoreProvider'
import { observer } from 'mobx-react-lite'

type Props = {
  isMobile?: boolean
}

export const PostSwiper = observer(({ isMobile }: Props) => {
  const { t } = useTranslation()

  const { postStore } = usePostStore()

  return (
    <>
      {postStore.post && postStore.post.images.length > 0 ? (
        <CustomSwiper
          className={
            'aspect-[4/4] swiper-bullet-auto swiper-nav-auto swiper-btn-bg-auto swiper-pagination-bottom-auto'
          }
          images={postStore.post?.images ?? []}
        />
      ) : (
        <Stub
          alt={t.profilePage.noPosts.alt}
          className={`bg-dark-300 h-full ${isMobile && 'bg-transparent mt-5'}`}
          imageClassName={'w-72'}
          textClassName={'text-center'}
          title={t.basic.errors.emptyImages}
        />
      )}
    </>
  )
})
