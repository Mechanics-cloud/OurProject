import React from 'react'

import { ConfirmModal } from '@/common/components/confirmModal/Modal'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  onCancelEdit: () => void
  onClose: () => void
} & DialogProps

//todo: translation for the text
export const CancelEditModal = ({ onCancelEdit, onClose, ...rest }: Props) => {
  return (
    <ConfirmModal
      onClick={onCancelEdit}
      onClose={onClose}
      {...rest}
    >
      Do you really want to close the edition of the publication? If you close
      changes won’t be saved
    </ConfirmModal>
  )
}
