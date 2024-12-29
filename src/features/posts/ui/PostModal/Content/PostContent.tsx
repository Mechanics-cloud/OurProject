'use client'

import React from 'react'

import { Nullable, useTranslation } from '@/common'
import { Post, PostComments } from '@/features/posts'
import { PostStoreProvider } from '@/features/posts/model/postStoreProvider'
import { AddComment } from '@/features/posts/ui/PostModal/Content/AddComment'
import { CommentList } from '@/features/posts/ui/PostModal/Content/CommentList'
import { SocialGroup } from '@/features/posts/ui/PostModal/Content/SocialGroup'
import { PostInfoHeader } from '@/features/posts/ui/PostModal/Header/PostInfoHeader'
import { PostSlider } from '@/features/posts/ui/PostModal/Slider/PostSlider'

type Props = {
  comments?: Nullable<PostComments>
  post?: Nullable<Post>
}

export const PostContent = ({ comments, post }: Props) => {
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
