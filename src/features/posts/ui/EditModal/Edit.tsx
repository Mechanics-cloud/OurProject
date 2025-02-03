import React from 'react'

import { useModal } from '@/common'
import { usePostStore } from '@/features/posts'
import { EditInfo } from '@/features/posts/ui/EditModal/EditInfo/EditInfo'
import { CancelEditModal } from '@/features/posts/ui/PostModal/CancelEditModal/CancelEditModal'
import { observer } from 'mobx-react-lite'

export const Edit = observer(() => {
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
    <>
      <EditInfo openConfirmModal={openConfirmModal} />
      <CancelEditModal
        onCancelEdit={onCancelEdit}
        onClose={closeConfirmModal}
        open={isModalOpen}
      />
    </>
  )
})
