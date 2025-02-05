import React, { useState } from 'react'

import {
  CopyOutline,
  Edit2Outline,
  PersonRemoveOutline,
  TrashOutline,
} from '@/assets/icons'
import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import {
  ConfirmModal,
  Loader,
  PathService,
  PublicPaths,
  Typography,
  useModal,
  useTranslation,
} from '@/common'
import { generalStore } from '@/core/store'
import { PostHeaderPopover } from '@/features/posts'
import { usePostStore } from '@/features/posts/model/postStoreProvider'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

export type MappedData = {
  display: boolean
  icon: React.JSX.Element
  id: string
  onClick: () => void
  text: string
}

export const PostInfoHeader = observer(() => {
  const { t } = useTranslation()
  const { postStore } = usePostStore()
  const { user } = generalStore

  const [open, setOpen] = useState(false)

  const {
    isModalOpen,
    onModalClose: closeConfirmModal,
    openModal: openConfirmModal,
  } = useModal()

  const onEditClick = () => {
    postStore.startEditing()
    setOpen(false)
  }

  const onDeletePost = () => {
    if (postStore?.post && user?.userId) {
      postStore.deletePost(postStore?.post?.id, user?.userId)
    }
  }

  const infoHeaderData: MappedData[] = [
    {
      display: user?.userId === postStore.post?.ownerId,
      icon: <Edit2Outline className={'flex-shrink-0 size-6'} />,
      id: 'edit',
      onClick: onEditClick,
      text: t.post.editPost,
    },
    {
      display: user?.userId === postStore.post?.ownerId,
      icon: <TrashOutline className={'flex-shrink-0 size-6'} />,
      id: 'delete',
      onClick: openConfirmModal,
      text: t.post.deletePost,
    },
    {
      display: user?.userId !== postStore.post?.ownerId,
      icon: <PersonRemoveOutline className={'flex-shrink-0 size-6'} />,
      id: 'remove',
      onClick: () => {
        alert('remove')
      },
      text: t.post.unfollow,
    },
    {
      display: user?.userId !== postStore.post?.ownerId,
      icon: <CopyOutline className={'flex-shrink-0 size-6'} />,
      id: 'copy',
      onClick: () => {
        alert('copy')
      },
      text: t.post.copyLink,
    },
  ]

  return (
    <>
      {postStore.isLoading && <Loader />}
      <div
        className={
          'flex items-center gap-3 py-3 px-6 border-b border-dark-100 box-border'
        }
      >
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
        {user && (
          <PostHeaderPopover
            data={infoHeaderData}
            open={open}
            setOpen={setOpen}
          />
        )}
      </div>

      <ConfirmModal
        onClick={onDeletePost}
        onClose={closeConfirmModal}
        open={isModalOpen}
        title={t.post.modalTitle}
      >
        {t.post.modalText}
      </ConfirmModal>
    </>
  )
})
