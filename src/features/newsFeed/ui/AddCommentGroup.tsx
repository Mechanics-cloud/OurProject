import React from 'react'

import { AddComment, useTranslation } from '@/common'
import { useAddComment } from '@/common/hooks/useAddComment'
import { observer } from 'mobx-react-lite'

import { useCommentsStore } from '../model/newsFeedContext'

export const AddCommentGroup = observer(({ postId }: { postId: number }) => {
  const { t } = useTranslation()
  const commentsStore = useCommentsStore()

  const { comment, onBlur, onChange, onSubmit } = useAddComment(
    async (comment) => {
      await commentsStore.addComment(postId, comment)
    }
  )

  return (
    <AddComment
      className={
        'bg-transparent focus:outline-none text-[14px] font-400  leading-[24px] w-full'
      }
      comment={comment}
      disabled={!comment}
      onBlur={onBlur}
      onChange={onChange}
      onSubmit={onSubmit}
      placeholder={t.homePage.addComments}
    />
  )
})
