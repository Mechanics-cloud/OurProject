import * as React from 'react'
import { PropsWithChildren } from 'react'

import { Button, SimpleModal, useTranslation } from '@/common'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  onClose: () => void
  onCloseFull: () => void
} & DialogProps &
  PropsWithChildren

export const ClosePostCreatingModal = ({
  onClose,
  onCloseFull,
  open,
  ...rest
}: Props) => {
  const { t } = useTranslation()

  return (
    <SimpleModal
      open={open}
      title={'Close'}
      {...rest}
    >
      Do you really want to close the creation of a publication? If you close
      everything will be deleted
      <span className={'flex justify-between pt-[18px] pb-6'}>
        <Button
          onClick={onClose}
          variant={'outline'}
        >
          Discard
        </Button>
        <Button onClick={onCloseFull}>Save draft</Button>
      </span>
    </SimpleModal>
  )
}
