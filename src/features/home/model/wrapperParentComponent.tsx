import React, { useMemo } from 'react'

import { AddCommentGroup, ViewAllCommentsButton } from '../ui'
import { CommentsStoreContext } from './homeContext'
import { CommentsStore } from './posts/postsStore'

export const WrapperParentComponent = ({ postId }: { postId: number }) => {
  const commentsStore = useMemo(() => new CommentsStore(), [])

  return (
    <CommentsStoreContext.Provider value={commentsStore}>
      <ViewAllCommentsButton postId={postId} />
      <AddCommentGroup postId={postId} />
    </CommentsStoreContext.Provider>
  )
}
