import React from 'react'

import { CustomSwiper } from '@/common/components/swiper'
import { usePostStore } from '@/features/posts/model/postStoreProvider'
import { observer } from 'mobx-react-lite'

export const PostSlider = observer(() => {
  const { postStore } = usePostStore()

  return (
    <CustomSwiper
      className={
        'aspect-[4/4] swiper-bullet-auto swiper-nav-auto swiper-btn-bg-auto swiper-pagination-bottom-auto'
      }
      images={postStore.post?.images ?? []}
    />
  )
})
