import React from 'react'

import Slider from '@/common/components/slider/Slider'
import { usePostStore } from '@/features/posts/model/postStoreProvider'
import { observer } from 'mobx-react-lite'

export const PostSlider = observer(() => {
  const { postStore } = usePostStore()

  return (
    <Slider
      className={
        'publicPost swiper-nav-top-55 swiper-nav-small swiper-btn-bg-small swiper-pagination-bottom-8 swiper-bullet-small'
      }
      images={postStore.post?.images ?? []}
    />
  )
})
