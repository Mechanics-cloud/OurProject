import React from 'react'

import {
  PostContent,
  PostInfoHeader,
  PostSlider,
  SocialGroup,
  usePostStore,
} from '@/features/posts'
import { MobileEdit } from '@/features/posts/ui/mobilePost/MobileEdit'
import { observer } from 'mobx-react-lite'

export const MobileContent = observer(() => {
  const { postStore } = usePostStore()
  const { isEditing } = postStore

  return !isEditing ? (
    <>
      <PostInfoHeader />
      <PostSlider />
      <SocialGroup />
      <PostContent />
    </>
  ) : (
    <MobileEdit />
  )
})
