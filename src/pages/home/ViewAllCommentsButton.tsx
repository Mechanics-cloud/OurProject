import React, { useEffect, useState } from 'react'

import { CommentsStore } from './posts/postsStore'

type ViewAllComments = {
  postId: number
}

const ViewAllCommentsButton = ({ postId }: ViewAllComments) => {
  const commentsStore = new CommentsStore()

  useEffect(() => {
    commentsStore.getComments(postId)
  }, [postId])

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
}

export default ViewAllCommentsButton
