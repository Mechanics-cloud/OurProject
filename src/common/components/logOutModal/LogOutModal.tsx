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
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className={'gap-[30px] max-w-[440px]'}>
        <DialogHeader>
          <DialogTitle>Log Out</DialogTitle>
        </DialogHeader>
        <DialogDescription className={'text-left my-0'}>
          Are you really want to log out of your account &quot;{userEmail}
          &quot;?
        </DialogDescription>
        <DialogFooter className={'flex justify-end gap-6'}>
          <DialogClose>
            <Button
              className={'w-[96px]'}
              onClick={logOutModalHandler}
              type={'button'}
              variant={'outline'}
            >
              Yes
            </Button>
          </DialogClose>
          <DialogClose>
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
