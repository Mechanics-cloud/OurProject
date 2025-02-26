import { ComponentProps, useState } from 'react'

import {
  BookmarkOutline,
  MessageCircleOutline,
  PaperPlaneOutline,
} from '@/assets/icons/outlineIcons'
import {
  BasicPost,
  Like,
  Tooltip,
  cn,
  useOptimistic,
  useTranslation,
} from '@/common'
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
  const { changeLikesCount } = newsFeedStore
  const { t } = useTranslation()
  const [loadingRequestFlag, setLoadingRequestFlag] = useState<boolean>(false)

  const [optimisticItem, addOptimisticLikeStatus, rollbackItem] = useOptimistic<
    BasicPost,
    boolean
  >(item, (state, optimisticLikeStatus) => ({
    ...state,
    isLiked: optimisticLikeStatus,
  }))

  const onLiked = async () => {
    if (loadingRequestFlag) {
      return
    }
    try {
      setLoadingRequestFlag(true)

      const newLikeStatus = item.isLiked ? LikeStatus.None : LikeStatus.Like

      addOptimisticLikeStatus(!item.isLiked)

      await postsApi.updateLikeStatus({ newLikeStatus, postId: item.id })

      runInAction(() => {
        changeLikesCount(item.id, !item.isLiked)
        setLoadingRequestFlag(false)
      })
    } catch (error) {
      rollbackItem()
      setLoadingRequestFlag(false)
    }
  }

  return (
    <div
      className={cn('w-full h-6 flex items-center justify-between', className)}
    >
      <div className={'flex items-center gap-5'}>
        <button
          className={
            optimisticItem.isLiked !== item.isLiked ? 'opacity-50' : ''
          }
          disabled={optimisticItem.isLiked !== item.isLiked}
          onClick={onLiked}
          type={'button'}
        >
          <Tooltip title={t.actionIconsGroup.isLiked}>
            <Like
              active={optimisticItem.isLiked}
              className={'size-6'}
            />
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
