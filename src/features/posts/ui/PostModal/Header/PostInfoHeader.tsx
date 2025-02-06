import React from 'react'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { PathService, PublicPaths, UserMiniLink } from '@/common'
import {
  DeleteModal,
  PostHeaderPopover,
  usePostInfoHeader,
} from '@/features/posts'

export type MappedData = {
  display: boolean
  icon: React.JSX.Element
  id: string
  onClick: () => void
  text: string
}

export const PostInfoHeader = () => {
  const {
    closeDeleteModal,
    infoHeaderData,
    isModalOpen,
    onDeletePost,
    postStore,
    user,
  } = usePostInfoHeader()

  return (
    <div
      className={
        'flex items-center gap-3 py-3 md:px-6 px-1 border-b border-dark-100 box-border w-full justify-between'
      }
    >
      <UserMiniLink
        className={'flex items-center gap-3'}
        href={PathService.generatePath(PublicPaths.userProfile, {
          userId: postStore.post?.ownerId,
        })}
        name={postStore.post?.userName!}
        src={postStore.post?.avatarOwner || anonymous}
      />
      {user && <PostHeaderPopover data={infoHeaderData} />}
      <DeleteModal
        onClose={closeDeleteModal}
        onDelete={onDeletePost}
        open={isModalOpen}
      />
    </div>
  )
}
