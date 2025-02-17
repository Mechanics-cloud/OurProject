import React from 'react'

import { AddComment, useTranslation } from '@/common'
import { useAddComment } from '@/common/hooks/useAddComment'
import { generalStore } from '@/core/store'
import { usePostStore } from '@/features/posts'
import { observer } from 'mobx-react-lite'

export const AddCommentInView = observer(() => {
  const { t } = useTranslation()
  const { commentStore, postStore } = usePostStore()
  const { user } = generalStore

  const onSubmitValue = async (comment: string) => {
    const postId = postStore.post?.id

    if (comment && postId) {
      await commentStore.createComment({ comment, postId })
      commentStore.setShouldScroll(true)
    }
  }

  const { comment, onBlur, onChange, onSubmit } = useAddComment(onSubmitValue)

  return user ? (
    <AddComment
      className={
        'bg-transparent focus:outline-none text-[14px] font-400 leading-[24px] w-full py-4 lg:px-6'
      }
      comment={comment}
      onBlur={onBlur}
      onChange={onChange}
      onSubmit={onSubmit}
      placeholder={t.post.addComment}
    />
  ) : null
})
