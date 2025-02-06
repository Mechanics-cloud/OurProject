import React from 'react'

import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { PathService, PublicPaths, Typography } from '@/common'
import { PostHeaderPopover } from '@/features/posts'
import { DeleteModal } from '@/features/posts/ui/PostModal/DeleteModal/DeleteModal'
import { usePostInfoHeader } from '@/features/posts/ui/PostModal/Header/usePostInfoHeader'
import Image from 'next/image'
import Link from 'next/link'

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
      <div className={'flex items-center gap-3'}>
        <Link
          href={PathService.generatePath(PublicPaths.userProfile, {
            userId: postStore.post?.ownerId,
          })}
        >
          <Image
            alt={`Post owner avatar`}
            className={'rounded-full pr-0'}
            height={36}
            priority
            src={postStore.post?.avatarOwner || anonymous}
            width={36}
          />
        </Link>
        <Typography variant={'h3'}>{postStore.post?.userName}</Typography>
      </div>
      {user && <PostHeaderPopover data={infoHeaderData} />}
      <DeleteModal
        onClose={closeDeleteModal}
        onDelete={onDeletePost}
        open={isModalOpen}
      />
    </div>
  )
}
