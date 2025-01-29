import React from 'react'

import { Close } from '@/assets/icons'
import anonymous from '@/assets/images/user-avatar-placeholder.jpg'
import { PathService, Paths, useModal, useTranslation } from '@/common'
import { usePostStore } from '@/features/posts'
import { CancelEditModal } from '@/features/posts/ui/PostModal/CancelEditModal/CancelEditModal'
import { PostInfo } from '@/features/posts/ui/PostModal/Content/PostInfo'
import { EditPost } from '@/features/posts/ui/PostModal/Edit/EditPost'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

type Props = {
  userId: number
}

export const Post = observer(({ userId }: Props) => {
  const { t } = useTranslation()
  const { postStore } = usePostStore()
  const { isEditing, post, stopEditing } = postStore
  const router = useRouter()

  const { isModalOpen, onModalClose, openModal } = useModal()

  if (!post) {
    return (
      <div
        className={'flex justify-center items-center w-full h-full bg-dark-300'}
      >
        {t.post.notFound}
      </div>
    )
  }

  const onClose = () => {
    if (isEditing) {
      openModal()
    } else {
      router.push(
        PathService.generatePath(Paths.userProfile, { userId: userId })
      )
    }
  }

  const onCancelEdit = () => {
    stopEditing()
    router.push(PathService.generatePath(Paths.userProfile, { userId: userId }))
  }

  return (
    <>
      <div className={'relative container mx-auto w-[972px] h-[564px]'}>
        {isEditing ? (
          <EditPost />
        ) : (
          <PostInfo
            avatarOwner={post.avatarOwner || anonymous}
            description={post.description}
          />
        )}
        <Close
          className={'absolute w-6 h-6 -top-6 -right-6 cursor-pointer'}
          onClick={onClose}
        />
      </div>
      <CancelEditModal
        onCancelEdit={onCancelEdit}
        onClose={onModalClose}
        open={isModalOpen}
      />
    </>
  )
})
