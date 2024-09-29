import * as React from 'react'
import { ChangeEvent, ReactNode } from 'react'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/common'

type Props = {
  logOutModalHandler: () => void
  triggerButton: ReactNode
}
export const LogOutModal = ({ logOutModalHandler, triggerButton }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent crossOff>
        <DialogHeader>
          <DialogTitle className={'flex justify-center items-center'}>
            Do you really want to log out?
          </DialogTitle>
        </DialogHeader>
        <DialogFooter className={'flex gap-3'}>
          <DialogClose className={'w-full'}>
            <Button
              className={'w-full'}
              onClick={logOutModalHandler}
              type={'button'}
            >
              Yes
            </Button>
          </DialogClose>
          <DialogClose className={'w-full'}>
            <Button
              className={'w-full'}
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
