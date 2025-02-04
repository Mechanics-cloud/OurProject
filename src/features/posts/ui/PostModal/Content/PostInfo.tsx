import React from 'react'

import {
  AddComment,
  PostContent,
  PostInfoHeader,
  PostSlider,
  SocialGroup,
} from '@/features/posts'
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
