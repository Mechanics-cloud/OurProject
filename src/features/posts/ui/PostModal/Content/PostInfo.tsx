import React from 'react'

import {
  AddCommentInView,
  PostContent,
  PostInfoHeader,
  PostSwiper,
  SocialGroup,
} from '@/features/posts'

export const PostInfo = () => {
  return (
    <div className={'flex w-full h-full border border-dark-100 flex-shrink-1'}>
      <PostSwiper />
      <div
        className={
          'flex flex-col w-full h-full bg-dark-300 border border-dark-100 border-r-transparent border-b-transparent border-t-transparent flex-shrink-1'
        }
      >
        <PostInfoHeader />
        <PostContent />
        <SocialGroup />
        <AddCommentInView />
      </div>
    </div>
  )
}
