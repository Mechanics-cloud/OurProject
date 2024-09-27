import * as React from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from '@/common'

type Props = {
  isOpen: boolean
  onModalClose: () => void
  userEmail: string
}

export const ConfirmSignUpModal = ({
  isOpen,
  onModalClose,
  userEmail,
}: Props) => {
  return (
    <Dialog
      onOpenChange={onModalClose}
      open={isOpen}
    >
      <DialogContent className={'w-96'}>
        <DialogTitle>Email sent</DialogTitle>
        <DialogDescription>
          We have sent a link to confirm your email to {userEmail}.
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              className={'w-full'}
              type={'button'}
            >
              Ok
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
