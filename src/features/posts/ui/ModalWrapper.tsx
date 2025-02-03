import React from 'react'

import { usePostStore } from '@/features/posts'
import { Edit } from '@/features/posts/ui/EditModal/Edit'
import { Post } from '@/features/posts/ui/PostModal/Post'
import { observer } from 'mobx-react-lite'

type Props = {
  userProfileId: number
}
export const ModalWrapper = observer(({ userProfileId }: Props) => {
  const { postStore } = usePostStore()
  const { isEditing } = postStore

  return !isEditing ? <Post userId={userProfileId} /> : <Edit />
})
