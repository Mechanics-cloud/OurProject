import { useState } from 'react'

import { Heart } from '@/assets/icons/filledIcons'
import {
  BookmarkOutline,
  HeartOutline,
  MessageCircleOutline,
  PaperPlaneOutline,
} from '@/assets/icons/outlineIcons'
import { Tooltip } from '@/common'
import Link from 'next/link'

import { postsApi } from './posts/posts.api'

type LinksGroupProps = {
  id: number
  isLiked: boolean
}

export const LinksGroup = ({ id, isLiked }: LinksGroupProps) => {
  const handleLike = async () => {
    try {
      await postsApi.postLike({ postId: id })
    } catch (error) {
      console.error('Error liking the post:', error)
    }
  }

  return (
    <div className={'w-full h-6 flex items-center justify-between mb-4'}>
      <div className={'flex items-center gap-5'}>
        <button
          onClick={handleLike}
          type={'button'}
        >
          <Tooltip title={'Нравиться'}>
            {isLiked ? (
              <Heart className={'size-6'} />
            ) : (
              <HeartOutline className={'size-6'} />
            )}
          </Tooltip>
        </button>
        <Link href={'/'}>
          <Tooltip title={'Сообщения'}>
            <MessageCircleOutline className={'size-6'} />
          </Tooltip>
        </Link>
        <Link href={'/'}>
          <Tooltip title={'Поделиться'}>
            <PaperPlaneOutline className={'size-6'} />
          </Tooltip>
        </Link>
      </div>
      <Link href={'/'}>
        <Tooltip title={'Сохранить'}>
          <BookmarkOutline className={'size-6'} />
        </Tooltip>
      </Link>
    </div>
  )
}
