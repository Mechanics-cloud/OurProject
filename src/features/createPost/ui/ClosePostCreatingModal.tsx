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
      title={t.createPost.closeModal.title}
      {...rest}
    >
      {t.createPost.closeModal.description}
      <span className={'flex justify-between pt-[18px] pb-6'}>
        <Button
          onClick={onClose}
          variant={'outline'}
        >
          {t.createPost.closeModal.discard}
        </Button>
        <Button onClick={onCloseFull}>{t.createPost.closeModal.save}</Button>
      </span>
    </SimpleModal>
  )
}
