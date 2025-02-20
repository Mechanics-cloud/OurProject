import React from 'react'

import { ConfirmModal, useTranslation } from '@/common'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  onCancelEdit: () => void
  onClose: () => void
} & DialogProps

export const CancelEditModal = ({ onCancelEdit, onClose, ...rest }: Props) => {
  const { t } = useTranslation()

  return (
    <ConfirmModal
      onClick={onCancelEdit}
      onClose={onClose}
      title={t.post.closePost}
      {...rest}
    >
      {t.post.cancelEdit}
    </ConfirmModal>
  )
}
