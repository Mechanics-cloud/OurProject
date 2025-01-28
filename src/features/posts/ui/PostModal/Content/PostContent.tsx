'use client'

import React from 'react'

import { useTranslation } from '@/common'
import { PublicPostInfo } from '@/features/posts'
import { PostStoreProvider } from '@/features/posts/model/postStoreProvider'
import { PostInfo } from '@/features/posts/ui/PostModal/Content/PostInfo'

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
        <PostInfo />
      </div>
    </PostStoreProvider>
  )
}
