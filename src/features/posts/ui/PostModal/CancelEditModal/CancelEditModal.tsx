import React from 'react'

import { useTranslation } from '@/common'
import { ConfirmModal } from '@/common/components/confirmModal/Modal'
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
      {...rest}
    >
      {t.post.cancelEdit}
    </ConfirmModal>
  )
}
