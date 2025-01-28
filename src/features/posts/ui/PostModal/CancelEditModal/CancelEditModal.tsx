import React from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/common'
import { DialogProps } from '@radix-ui/react-dialog'

type CancelProps = {
  onCancelEdit: () => void
  onClose: () => void
  open: boolean
} & DialogProps

export const CancelEditModal = ({
  onCancelEdit,
  onClose,
  open,
  ...rest
}: CancelProps) => {
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
          Do you really want to close the edition of the publication? If you
          close changes won’t be saved
        </DialogDescription>
        <DialogFooter className={'flex justify-end gap-6'}>
          <DialogClose asChild>
            <Button
              className={'w-[96px]'}
              onClick={onCancelEdit}
              type={'button'}
              variant={'outline'}
            >
              Yes
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className={'w-[96px]'}
              type={'button'}
            >
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
