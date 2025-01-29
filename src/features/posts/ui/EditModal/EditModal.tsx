import React from 'react'

import { Close } from '@/assets/icons'
import { Overlay, PathService, Paths, useModal } from '@/common'
import { usePostStore } from '@/features/posts'
import { CancelEditModal } from '@/features/posts/ui/PostModal/CancelEditModal/CancelEditModal'
import { EditPost } from '@/features/posts/ui/PostModal/Edit/EditPost'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

type Props = {
  userProfileId: number
}
export const EditModal = observer(({ userProfileId }: Props) => {
  const { postStore } = usePostStore()
  const { stopEditing } = postStore
  const router = useRouter()
  const {
    isModalOpen,
    onModalClose: closeConfirmModal,
    openModal: openConfirmModal,
  } = useModal()

  const onCancelEdit = async () => {
    stopEditing()
    await router.push(
      PathService.generatePath(Paths.userProfile, { userId: userProfileId })
    )
  }

  return (
    <Overlay
      className={'flex justify-center items-center'}
      isVisible
    >
      <div className={'relative container mx-auto w-[972px] h-[564px]'}>
        <EditPost />
        <Close
          className={'absolute w-6 h-6 -top-6 -right-6 cursor-pointer'}
          onClick={openConfirmModal}
        />
      </div>
      <CancelEditModal
        onCancelEdit={onCancelEdit}
        onClose={closeConfirmModal}
        open={isModalOpen}
      />
    </Overlay>
  )
})
