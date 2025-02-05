import React from 'react'

import { ConfirmModal, useTranslation } from '@/common'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  onClose: () => void
  onDelete: () => void
} & DialogProps

export const DeleteModal = ({ onClose, onDelete, ...rest }: Props) => {
  const { t } = useTranslation()

  return (
    <ConfirmModal
      onClick={onDelete}
      onClose={onClose}
      title={t.post.deletePostTitle}
      {...rest}
    >
      {t.post.deletePost}
    </ConfirmModal>
  )
}
