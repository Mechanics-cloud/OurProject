import React, { useState } from 'react'

import { CommentsStore } from '../model/posts/postsStore'
import { AddCommentGroup, ViewAllCommentsButton } from '../ui'
import { CommentsStoreContext } from './homeContext'

export const WrapperParentComponent = ({ postId }: { postId: number }) => {
  return (
    <CommentsStoreContext.Provider value={new CommentsStore()}>
      <ViewAllCommentsButton postId={postId} />
      <AddCommentGroup postId={postId} />
    </CommentsStoreContext.Provider>
  )
}
