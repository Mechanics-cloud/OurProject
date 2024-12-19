import { ComponentProps, useState } from 'react'

import { Heart } from '@/assets/icons/filledIcons'
import {
  BookmarkOutline,
  HeartOutline,
  MessageCircleOutline,
  PaperPlaneOutline,
} from '@/assets/icons/outlineIcons'
import { BasicPost, Tooltip, cn, useTranslation } from '@/common'
import { LikeStatus } from '@/common/enums'
import { newsFeedStore } from '@/features/newsFeed'
import { postsApi } from '@/features/posts'
import { runInAction } from 'mobx'
import { observer } from 'mobx-react-lite'
import Link from 'next/link'

type Props = {
  item: BasicPost
} & ComponentProps<'div'>
//TODO to change (in progress) вынести логику, добавить логику на кнопки
export const LinksGroup = observer(({ className, item }: Props) => {
  const { t } = useTranslation()
  const [isChangeLike, setIsChangeLike] = useState<boolean>(false)
  const [loadingRequestFlag, setLoadingRequestFlag] = useState<boolean>(false)

  const onLiked = async () => {
    if (loadingRequestFlag) {
      return
    }
    try {
      setIsChangeLike(true)
      setLoadingRequestFlag(true)

      const newLikeStatus = item.isLiked ? LikeStatus.None : LikeStatus.Like

      await postsApi.updateLikeStatus({ newLikeStatus, postId: item.id })

      runInAction(() => {
        newsFeedStore.changeLikesCount(item.id, !item.isLiked)
        setIsChangeLike(false)
        setLoadingRequestFlag(false)
      })
    } catch (error) {
      setIsChangeLike(false)
      setLoadingRequestFlag(false)
    }
  }

  return (
    <div
      className={cn(
        'w-full h-6 flex items-center justify-between mb-4',
        className
      )}
    >
      <div className={'flex items-center gap-5'}>
        <button
          disabled={isChangeLike}
          onClick={onLiked}
          type={'button'}
        >
          <Tooltip title={t.actionIconsGroup.isLiked}>
            {item.isLiked ? (
              <Heart className={'size-6'} />
            ) : (
              <HeartOutline className={'size-6'} />
            )}
          </Tooltip>
        </button>
        <Link href={'/'}>
          <Tooltip title={t.actionIconsGroup.message}>
            <MessageCircleOutline className={'size-6'} />
          </Tooltip>
        </Link>
        <Link href={'/'}>
          <Tooltip title={t.actionIconsGroup.share}>
            <PaperPlaneOutline className={'size-6'} />
          </Tooltip>
        </Link>
      </div>
      <button type={'button'}>
        <Tooltip title={t.actionIconsGroup.addFavorite}>
          <BookmarkOutline className={'size-6'} />
        </Tooltip>
      </button>
    </div>
  )
})
