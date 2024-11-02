import React, { useEffect, useMemo, useState } from 'react'

import { observer } from 'mobx-react-lite'

import { CommentsStore } from '../model/posts/postsStore'

type ViewAllComments = {
  postId: number
}

//TODO to change (in progress)
export const ViewAllCommentsButton = observer(({ postId }: ViewAllComments) => {
  const commentsStore = useMemo(() => new CommentsStore(), [])

  useEffect(() => {
    commentsStore.getComments(postId)
  }, [postId, commentsStore])

  const isButtonDisabled =
    commentsStore.isLoading ||
    commentsStore.comments === null ||
    commentsStore.comments.totalCount === 0

  return (
    <div className={'w-full h-6 mb-3'}>
      <button
        disabled={isButtonDisabled}
        type={'button'}
      >
        <span className={'text-[14px] font-bold leading-[24px] text-light-900'}>
          {commentsStore.isLoading
            ? 'Loading...'
            : `View All Comments (${commentsStore.comments?.totalCount || 0})`}
        </span>
      </button>
    </div>
  )
})
