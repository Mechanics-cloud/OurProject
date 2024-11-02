import { useState } from 'react'

import { Heart } from '@/assets/icons/filledIcons'
import {
  BookmarkOutline,
  HeartOutline,
  MessageCircleOutline,
  PaperPlaneOutline,
} from '@/assets/icons/outlineIcons'
import { Tooltip } from '@/common'
import { LikeStatus } from '@/common/enums'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

import { Item } from './home.types'
import homePageStore from './homePageStore'
import { postsApi } from './posts/posts.api'

// type LinksGroupProps = {
//   id: number
//   isLiked: boolean
//   ownerId: number
// }
type ItemProps = {
  item: Item
}
//TODO to change (in progress)
export const LinksGroup = observer(({ item }: ItemProps) => {
  const [isChangeLike, setIsChangeLike] = useState<boolean>(false)
  const [loadingRequestFlag, setLoadingRequestFlag] = useState<boolean>(false)

  const onLiked = async () => {
    if (loadingRequestFlag) {
      return
    }
    try {
      setIsChangeLike(true)
      setLoadingRequestFlag(true)

      const likeStatus = item.isLiked ? LikeStatus.None : LikeStatus.Like

      await postsApi.postLike({ likeStatus, postId: item.id })

      runInAction(() => {
        homePageStore.isLiked(item.id, !item.isLiked)
        setIsChangeLike(false)
        setLoadingRequestFlag(false)
      })
    } catch (error) {
      console.error('Error liking the post:', error)
      setIsChangeLike(false)
      setLoadingRequestFlag(false)
    }
  }
  const onFollowing = async () => {
    try {
      await postsApi.toFollowing({ selectedUserId: item.ownerId })
    } catch (error) {
      console.error('Error onFollowing the post:', error)
    }
  }

  return (
    <div className={'w-full h-6 flex items-center justify-between mb-4'}>
      <div className={'flex items-center gap-5'}>
        <button
          disabled={isChangeLike}
          onClick={onLiked}
          type={'button'}
        >
          <Tooltip title={'Нравиться'}>
            {item.isLiked ? (
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
      <button
        onClick={onFollowing}
        type={'button'}
      >
        <Tooltip title={`Подписаться userId ${item.ownerId}`}>
          <BookmarkOutline className={'size-6'} />
        </Tooltip>
      </button>
    </div>
  )
})
