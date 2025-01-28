'use client'

import React from 'react'

import { useTranslation } from '@/common'
import { PublicPostInfo } from '@/features/posts'
import { PostStoreProvider } from '@/features/posts/model/postStoreProvider'
import { AddComment } from '@/features/posts/ui/PostModal/Content/AddComment'
import { CommentList } from '@/features/posts/ui/PostModal/Content/CommentList'
import { SocialGroup } from '@/features/posts/ui/PostModal/Content/SocialGroup'
import { PostInfoHeader } from '@/features/posts/ui/PostModal/Header/PostInfoHeader'
import { PostSlider } from '@/features/posts/ui/PostModal/Slider/PostSlider'

export const PostContent = ({ comments, post }: PublicPostInfo) => {
  const { t } = useTranslation()

  if (!post) {
    return (
      <div
        className={'flex justify-center items-center w-full h-full bg-dark-300'}
      >
        {t.post.notFound}
      </div>
    )
  }

  return (
    <PostStoreProvider initialState={{ comments, post }}>
      <div className={'flex w-full h-full border border-dark-100'}>
        <PostSlider />
        <div className={'flex flex-col w-full h-full bg-dark-300'}>
          <PostInfoHeader />
          <CommentList />
          <SocialGroup />
          <AddComment />
        </div>
      </div>
    </PostStoreProvider>
  )
}
