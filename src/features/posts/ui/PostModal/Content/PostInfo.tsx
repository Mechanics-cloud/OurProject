import React from 'react'

import {
  AddComment,
  PostContent,
  PostInfoHeader,
  PostSlider,
  SocialGroup,
} from '@/features/posts'

export const PostInfo = () => {
  return (
    <div className={'flex w-full h-full border border-dark-100'}>
      <PostSlider />
      <div className={'flex flex-col w-full h-full bg-dark-300'}>
        <PostInfoHeader />
        <PostContent />
        <SocialGroup />
        <AddComment />
      </div>
    </div>
  )
}
