import React from 'react'

import { AddComment } from '@/features/posts/ui/PostModal/Content/AddComment'
import { PostContent } from '@/features/posts/ui/PostModal/Content/PostContent'
import { SocialGroup } from '@/features/posts/ui/PostModal/Content/SocialGroup'
import { PostInfoHeader } from '@/features/posts/ui/PostModal/Header/PostInfoHeader'
import { PostSlider } from '@/features/posts/ui/PostModal/Slider/PostSlider'
import { observer } from 'mobx-react-lite'

export const PostInfo = observer(() => {
  return (
    <div className={'flex w-full h-full border border-dark-100'}>
      <div className={'flex w-full h-full'}>
        <PostSlider />
        <div className={'flex flex-col w-full h-full bg-dark-300'}>
          <PostInfoHeader />
          <PostContent />
          <SocialGroup />
          <AddComment />
        </div>
      </div>
    </div>
  )
})
