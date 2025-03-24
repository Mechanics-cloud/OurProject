import * as React from 'react'
import { PropsWithChildren } from 'react'

import { Button, SimpleModal, Typography, useTranslation } from '@/common'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  onBack: () => void
  onClose: () => void
} & DialogProps &
  PropsWithChildren

export const ClosePostCreatingModal = ({
  onBack,
  onClose,
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
      <Typography className={'pl-6'}>
        {t.createPost.closeModal.description}
      </Typography>
      <span className={'flex justify-between pt-[18px] pb-6 px-6'}>
        <Button
          onClick={onBack}
          variant={'outline'}
        >
          {t.basic.discard}
        </Button>
        <Button onClick={onClose}>{t.createPost.closeModal.save}</Button>
      </span>
    </SimpleModal>
  )
}
