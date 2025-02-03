import React from 'react'

import { Edit, Post, usePostStore } from '@/features/posts'
import { observer } from 'mobx-react-lite'

type Props = {
  userProfileId: number
}
export const ModalWrapper = observer(({ userProfileId }: Props) => {
  const { postStore } = usePostStore()
  const { isEditing } = postStore

  return !isEditing ? <Post userId={userProfileId} /> : <Edit />
})
