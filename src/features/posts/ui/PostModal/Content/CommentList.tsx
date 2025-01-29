import React, { useEffect, useRef } from 'react'

import {
  PathService,
  Paths,
  ScrollArea,
  timeAgo,
  useElementOnScreen,
  useTranslation,
} from '@/common'
import { LikeStatus } from '@/common/enums'
import { generalStore } from '@/core/store'
import { Comment } from '@/features/posts'
import { usePostStore } from '@/features/posts/model/postStoreProvider'
import { CommentItem } from '@/features/posts/ui/PostModal/Content/Comment'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

export const CommentList = observer(() => {
  const { t } = useTranslation()
  const router = useRouter()
  const { commentStore, postStore } = usePostStore()
  const {
    getComments,
    items: comments,
    pageNumber,
    pagesCount,
    setShouldScroll,
    shouldScroll,
    updateCommentLike,
  } = commentStore
  const { user } = generalStore

  const startRef = useRef<HTMLDivElement>(null)
  const { ref: endRef, visible } = useElementOnScreen<HTMLDivElement>()

  const onChangeCommentLike = (comment: Comment) => {
    if (postStore.post?.id) {
      updateCommentLike({
        commentId: comment.id,
        likeStatus: comment.isLiked ? LikeStatus.None : LikeStatus.Like,
        postId: postStore.post.id,
      })
    }
  }

  useEffect(() => {
    if (visible && postStore.post?.id && pageNumber < pagesCount) {
      getComments({
        pageNumber: pageNumber + 1,
        postId: postStore.post?.id,
        type: user ? 'private' : 'public',
      })
    }
  }, [visible, postStore.post?.id, pageNumber, pagesCount, user, getComments])

  useEffect(() => {
    if (startRef.current && shouldScroll) {
      startRef.current.scrollTo({ behavior: 'smooth', top: 0 })
      setShouldScroll(false)
    }
  }, [startRef, shouldScroll, setShouldScroll])

  return (
    <ScrollArea className={'border-b border-dark-100 box-border h-full'}>
      <div
        className={'flex-col overflow-y-hidden grow justify-end py-5 px-6 '}
        ref={startRef}
      >
        {comments && comments?.length > 0 ? (
          comments.map((comment: Comment) => (
            <CommentItem
              alt={`${comment.from.username} photo image`}
              className={'mb-4'}
              href={PathService.generatePath(Paths.userProfile, {
                userId: comment.from.id,
              })}
              isLike={user ? comment.isLiked : null}
              key={comment.id}
              likes={comment.likeCount ? `Likes: ${comment.likeCount}` : ''}
              name={comment.from.username}
              onLike={() => onChangeCommentLike(comment)}
              src={comment.from.avatars[0]?.url}
              text={comment.content}
              time={timeAgo(comment.createdAt, router.locale) || t.post.now}
            />
          ))
        ) : (
          <p>{t.post.noComments}</p>
        )}

        <div ref={endRef} />
      </div>
    </ScrollArea>
  )
})
