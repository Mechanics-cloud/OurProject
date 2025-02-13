import React from 'react'

import {
  AddCommentInView,
  MobileEdit,
  PostContent,
  PostInfoHeader,
  PostSlider,
  SocialGroup,
  usePostStore,
} from '@/features/posts'
import { observer } from 'mobx-react-lite'

type Props = {
  screenSize?: number
}
export const MobileContent = observer(({ screenSize }: Props) => {
  const { postStore } = usePostStore()
  const { isEditing } = postStore

  return !isEditing ? (
    <div className={'flex flex-col'}>
      <PostInfoHeader />
      <PostSlider />
      <SocialGroup />
      <PostContent screenSize={screenSize} />
      <AddCommentInView />
    </div>
  ) : (
    <MobileEdit />
  )
})
