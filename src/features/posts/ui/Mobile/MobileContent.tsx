import React from 'react'

import {
  AddComment,
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
    <div className={'flex flex-col items-center'}>
      <PostInfoHeader />
      <PostSlider />
      <SocialGroup />
      <PostContent screenSize={screenSize} />
      <AddComment />
    </div>
  ) : (
    <MobileEdit />
  )
})
