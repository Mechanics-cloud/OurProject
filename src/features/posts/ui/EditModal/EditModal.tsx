import React from 'react'

import { Overlay, useModal } from '@/common'
import { usePostStore } from '@/features/posts'
import { CancelEditModal } from '@/features/posts/ui/PostModal/CancelEditModal/CancelEditModal'
import { EditPost } from '@/features/posts/ui/PostModal/Edit/EditPost'
import { observer } from 'mobx-react-lite'

export const EditModal = observer(() => {
  const { postStore } = usePostStore()
  const { stopEditing } = postStore

  const {
    isModalOpen,
    onModalClose: closeConfirmModal,
    openModal: openConfirmModal,
  } = useModal()

  const onCancelEdit = () => {
    stopEditing()
  }

  return (
    <Overlay
      className={'flex justify-center items-center'}
      isVisible
    >
      <EditPost openConfirmModal={openConfirmModal} />
      <CancelEditModal
        onCancelEdit={onCancelEdit}
        onClose={closeConfirmModal}
        open={isModalOpen}
      />
    </Overlay>
  )
})
