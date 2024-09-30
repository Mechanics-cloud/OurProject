import * as React from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  useTranslation,
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
  const { t } = useTranslation()

  return (
    <Dialog
      onOpenChange={onModalClose}
      open={isOpen}
    >
      <DialogContent className={'w-96'}>
        <DialogTitle>{t.signUpForm.confirmSignUpModal.title}</DialogTitle>
        <DialogDescription>
          {t.signUpForm.confirmSignUpModal.getDescription(userEmail)}
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
