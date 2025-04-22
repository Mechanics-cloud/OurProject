import React, { useEffect } from 'react'

import { generalStore } from '@/core/store'
import { followSystemStore } from '@/features/followSystem'
import {
  AddCommentInView,
  MobileEdit,
  PostContent,
  PostInfoHeader,
  PostSwiper,
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
  const user = generalStore.user

  useEffect(() => {
    if (user) {
      followSystemStore.getFollowing(user?.userName)
    }
  }, [user])

  return !isEditing ? (
    <div className={'flex flex-col'}>
      <PostInfoHeader />
      <PostSwiper isMobile />
      <SocialGroup />
      <PostContent screenSize={screenSize} />
      <AddCommentInView />
    </div>
  ) : (
    <MobileEdit />
  )
})
