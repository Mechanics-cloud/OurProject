import React from 'react'

import { Modal } from '@/common/components/modal/Modal'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  onCancelEdit: () => void
  onClose: () => void
} & DialogProps

//todo: translation for the text
export const CancelEditModal = ({ onCancelEdit, onClose, ...rest }: Props) => {
  return (
    <Modal
      onClick={onCancelEdit}
      onClose={onClose}
      {...rest}
    >
      Do you really want to close the edition of the publication? If you close
      changes won’t be saved
    </Modal>
  )
}
