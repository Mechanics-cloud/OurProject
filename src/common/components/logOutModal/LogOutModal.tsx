import * as React from 'react'
import { ReactNode } from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useTranslation,
} from '@/common'

type Props = {
  logOutModalHandler: () => void
  triggerButton: ReactNode
  userEmail: string
}
export const LogOutModal = ({
  logOutModalHandler,
  triggerButton,
  userEmail,
}: Props) => {
  const { t } = useTranslation()

  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
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
              onClick={logOutModalHandler}
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
