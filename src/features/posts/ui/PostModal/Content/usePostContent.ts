import { useEffect, useRef } from 'react'

import { useElementOnScreen, useTranslation } from '@/common'
import { LikeStatus } from '@/common/enums'
import { generalStore } from '@/core/store'
import { Comment, usePostStore } from '@/features/posts'
import { useRouter } from 'next/router'

export const usePostContent = () => {
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

  return {
    endRef,
    getComments,
    items: comments,
    onChangeCommentLike,
    pageNumber,
    pagesCount,
    postStore,
    router,
    setShouldScroll,
    shouldScroll,
    startRef,
    t,
    updateCommentLike,
    user,
  }
}
