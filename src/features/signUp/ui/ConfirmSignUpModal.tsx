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
  children: string
  isValid: boolean
  userEmail: string
}
export const ConfirmSignUpModal = ({ children, isValid, userEmail }: Props) => {
  return (
    <Dialog>
      <DialogTrigger
        className={'w-full mb-[18px]'}
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
