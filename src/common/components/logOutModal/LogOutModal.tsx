import * as React from 'react'

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
import { logOut } from '@/common/utils/logOut'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  logOutModalHandler: () => void
  onClose: () => void
  userEmail: string
} & DialogProps

export const LogOutModal = ({
  logOutModalHandler,
  onClose,
  open,
  userEmail,
  ...rest
}: Props) => {
  const { t } = useTranslation()

  const onLogOut = async () => {
    await logOut()
    logOutModalHandler()
  }

  return (
    <Dialog
      onOpenChange={onClose}
      open={open}
      {...rest}
    >
      <DialogContent className={'gap-[30px] max-w-[440px]'}>
        <DialogHeader>
          <DialogTitle>{t.menu.logOutModal.title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className={'text-left my-0'}>
          {t.menu.logOutModal.getText(userEmail)}
        </DialogDescription>
        <DialogFooter className={'flex justify-end gap-6'}>
          <DialogClose asChild>
            <Button
              className={'w-[96px]'}
              onClick={onLogOut}
              type={'button'}
              variant={'outline'}
            >
              {t.menu.logOutModal.yes}
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              className={'w-[96px]'}
              type={'button'}
            >
              {t.menu.logOutModal.no}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
