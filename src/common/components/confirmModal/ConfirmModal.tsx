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
  title: string
} & DialogProps

export const ConfirmModal = ({
  children,
  onClick,
  onClose,
  open,
  title,
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
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className={'text-left my-0'}>
          {children}
        </DialogDescription>
        <DialogFooter
          className={
            'flex flex-col items-center lg:flex-row lg:justify-end gap-6'
          }
        >
          <DialogClose asChild>
            <Button
              className={'lg:w-[96px] w-full'}
              onClick={onClick}
              type={'button'}
              variant={'outline'}
            >
              {t.basic.yes}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className={'lg:w-[96px] w-full'}
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
