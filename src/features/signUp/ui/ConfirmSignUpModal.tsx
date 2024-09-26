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
  children: ReactNode
}
export const ConfirmSignUpModal = ({ children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'w-96'}>
        <DialogHeader>
          <DialogTitle>Email sent</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          We have sent a link to confirm your email to epam@epam.com.
        </DialogDescription>

        <DialogFooter>
          <DialogClose>
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
