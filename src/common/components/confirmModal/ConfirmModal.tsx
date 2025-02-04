'use strict'
import React, { ReactNode } from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  useTranslation,
} from '@/common'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  children: ReactNode
  onClick: () => void
  onClose: () => void
} & DialogProps

export const ConfirmModal = ({
  children,
  onClick,
  onClose,
  open,
  ...rest
}: Props) => {
  const { t } = useTranslation()

  return (
    <Dialog
      onOpenChange={onClose}
      open={open}
      {...rest}
    >
      <DialogContent className={'gap-[30px] max-w-[440px]'}>
        <DialogHeader>
          <DialogTitle>Close Post</DialogTitle>
        </DialogHeader>
        <DialogDescription className={'text-left my-0'}>
          {children}
        </DialogDescription>
        <DialogFooter className={'flex justify-end gap-6'}>
          <DialogClose asChild>
            <Button
              className={'w-[96px]'}
              onClick={onClick}
              type={'button'}
              variant={'outline'}
            >
              {t.basic.yes}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className={'w-[96px]'}
              type={'button'}
            >
              {t.basic.no}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
