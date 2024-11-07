import React, { useState } from 'react'

import { CommentsStore } from '../model/posts/postsStore'
import { AddCommentGroup, ViewAllCommentsButton } from '../ui'
import { CommentsStoreContext } from './homeContext'

export const WrapperParentComponent = ({ postId }: { postId: number }) => {
  const [commentsStore] = useState(() => new CommentsStore())

  return (
    <CommentsStoreContext.Provider value={commentsStore}>
      <ViewAllCommentsButton postId={postId} />
      <AddCommentGroup postId={postId} />
    </CommentsStoreContext.Provider>
  )
}
