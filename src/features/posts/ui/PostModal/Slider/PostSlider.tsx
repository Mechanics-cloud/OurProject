import React from 'react'

import { CustomSwiper } from '@/common/components/swiper'
import { usePostStore } from '@/features/posts/model/postStoreProvider'
import { observer } from 'mobx-react-lite'

export const PostSlider = observer(() => {
  const { postStore } = usePostStore()

  return (
    <CustomSwiper
      className={
        'swiper-nav-top-55 swiper-nav-small swiper-btn-bg-small swiper-pagination-bottom-8 swiper-bullet-small w-full aspect-[4/3]'
      }
      images={postStore.post?.images ?? []}
    />
  )
})
