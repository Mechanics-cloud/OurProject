import React from 'react'

import {
  CopyOutline,
  Edit2Outline,
  PersonRemoveOutline,
  TrashOutline,
} from '@/assets/icons'
import { useModal, useTranslation } from '@/common'
import { generalStore } from '@/core/store'
import { MappedData, usePostStore } from '@/features/posts'
export const usePostInfoHeader = () => {
  const { t } = useTranslation()
  const { postStore } = usePostStore()
  const { user } = generalStore

  const {
    isModalOpen,
    onModalClose: closeDeleteModal,
    openModal: openDeleteModal,
  } = useModal()

  const onEditClick = () => {
    postStore.startEditing()
  }

  const onDeleteClick = () => {
    openDeleteModal()
  }

  const onDeletePost = async () => {
    try {
      if (postStore?.post && user) {
        await postStore.deletePost(postStore?.post?.id, user?.userId)
      }
    } catch (error) {
      console.error(error)
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
      onClick: onDeleteClick,
      text: t.post.deletePostTitle,
    },
    {
      display: user?.userId !== postStore.post?.ownerId,
      icon: <PersonRemoveOutline className={'flex-shrink-0 size-6'} />,
      id: 'remove',
      onClick: () => {
        alert('unfollow')
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

  return {
    closeDeleteModal,
    infoHeaderData,
    isModalOpen,
    onDeletePost,
    postStore,
    user,
  }
}
