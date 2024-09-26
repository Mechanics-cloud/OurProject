import * as React from 'react'
import { ReactNode } from 'react'

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
  triggerButton: ReactNode
  yesHandler: () => void
}
export const LogOutModal = ({ triggerButton, yesHandler }: Props) => {
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
              onClick={yesHandler}
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
