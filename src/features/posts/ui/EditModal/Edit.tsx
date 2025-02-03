import React from 'react'

import { useModal } from '@/common'
import { CancelEditModal, EditInfo, usePostStore } from '@/features/posts'
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
