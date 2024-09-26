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
  buttonVariants,
} from '@/common'
import { cn } from '@/common/utils/cn'

type Props = {
  children: ReactNode
  isValid: boolean
  userEmail: string
}
export const ConfirmSignUpModal = ({ children, isValid, userEmail }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          'w-full mb-[18px]',
          buttonVariants({ variant: 'primary' })
        )}
        disabled={!isValid}
        type={'submit'}
      >
        {children}
      </DialogTrigger>
      <DialogContent className={'w-96'}>
        <DialogHeader>
          <DialogTitle>Email sent</DialogTitle>
        </DialogHeader>
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
