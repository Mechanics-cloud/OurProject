'use client'

import React from 'react'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { Typography } from '@/common'
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
  const { isEditing, post } = postStore

  return (
    <>
      <PostSlider />
      <div className={'flex flex-col w-full h-full bg-dark-300'}>
        {isEditing ? (
          <Typography
            className={
              "pt-3 pb-3 pl-6 relative after:absolute after:content-[''] after:block after:w-full after:h-px after:bg-dark-100 after:left-0 after:bottom-0"
            }
            variant={'h1'}
          >
            Edit Post
          </Typography>
        ) : (
          <PostInfoHeader />
        )}
        {isEditing ? (
          <EditPost />
        ) : (
          <>
            {post?.description && (
              <Description
                avatarOwner={postStore.post?.avatarOwner || anonymous}
                description={postStore.post?.description}
              />
            )}
            <CommentList />
            <SocialGroup />
            <AddComment />
          </>
        )}
      </div>
    </>
  )
})
