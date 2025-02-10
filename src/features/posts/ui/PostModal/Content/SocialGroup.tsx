import React from 'react'

import { BookmarkOutline, PaperPlaneOutline } from '@/assets/icons'
import { Like } from '@/common'
import { generalStore } from '@/core/store'
import { usePostStore } from '@/features/posts/model/postStoreProvider'
import { observer } from 'mobx-react-lite'

import { LikesGroup } from './LikesGroup'

export const SocialGroup = observer(() => {
  const { likeStore, postStore } = usePostStore()
  const { getLikes, isLiked, toggleLike } = likeStore
  const { user } = generalStore

  const onToggleLike = async () => {
    if (postStore.post?.id) {
      await toggleLike({ postId: postStore.post.id })
      await getLikes(postStore.post.id)
    }
  }

  return (
    <div
      className={
        'flex flex-col gap-4 pt-3 lg:px-6 px-1 pb-2 lg:border-b border-dark-100 box-border w-full'
      }
    >
      {user && (
        <div className={'flex gap-6 items-center'}>
          <Like
            active={isLiked}
            height={24}
            onClick={onToggleLike}
            width={24}
          />
          <PaperPlaneOutline
            height={24}
            width={24}
          />
          <BookmarkOutline
            className={'ml-auto'}
            height={24}
            width={24}
          />
        </div>
      )}
      <LikesGroup />
    </div>
  )
})
