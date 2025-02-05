import React from 'react'

import Slider from '@/common/components/slider/Slider'
import { usePostStore } from '@/features/posts/model/postStoreProvider'
import { observer } from 'mobx-react-lite'

type Props = {
  className?: string
}
export const PostSlider = observer(({ className }: Props) => {
  const { postStore } = usePostStore()

  return (
    <Slider
      className={className}
      images={postStore.post?.images ?? []}
    />
  )
})
