'use client'

import React from 'react'

import { usePostStore } from '@/features/posts'
import { AddComment } from '@/features/posts/ui/PostModal/Content/AddComment'
import { CommentList } from '@/features/posts/ui/PostModal/Content/CommentList'
import { Description } from '@/features/posts/ui/PostModal/Content/Description'
import { SocialGroup } from '@/features/posts/ui/PostModal/Content/SocialGroup'
import { EditPost } from '@/features/posts/ui/PostModal/Edit/EditPost'
import { PostInfoHeader } from '@/features/posts/ui/PostModal/Header/PostInfoHeader'
import { PostSlider } from '@/features/posts/ui/PostModal/Slider/PostSlider'
import { observer } from 'mobx-react-lite'

export const PostInfo = observer(() => {
  const { postStore } = usePostStore()
  const { isEditing } = postStore

  return !isEditing ? (
    <>
      <PostSlider />
      <div className={'flex flex-col w-full h-full bg-dark-300'}>
        <PostInfoHeader />
        <Description />
        <CommentList />
        <SocialGroup />
        <AddComment />
      </div>
    </>
  ) : (
    <EditPost />
  )
})
