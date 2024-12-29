import React from 'react'

import Slider from '@/common/components/slider/Slider'
import { usePostStore } from '@/features/posts/model/postStoreProvider'
import { observer } from 'mobx-react-lite'

export const PostSlider = observer(() => {
  const { postStore } = usePostStore()

  return <Slider images={postStore.post?.images ?? []} />
})
