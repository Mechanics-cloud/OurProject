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
  Typography,
  useModal,
  useTranslation,
} from '@/common'
import { DialogTriggerProps } from '@radix-ui/react-dialog'

type Props = {
  onDeletePost: (postId: number) => void
  postId: number
} & DialogTriggerProps

export const DeletePostModal = ({ onDeletePost, postId, ...rest }: Props) => {
  const { t } = useTranslation()

  return (
    <>
      <Dialog>
        <DialogTrigger {...rest} />
        <DialogContent className={'w-12'}>
          <DialogHeader>
            <DialogTitle>{t.post.modalTitle}</DialogTitle>
          </DialogHeader>
          <DialogDescription
            asChild
            className={'my-[30px]'}
          >
            <Typography variant={'reg16'}>{t.post.modalText}</Typography>
          </DialogDescription>
          <DialogFooter className={'flex justify-end gap-x-6'}>
            <DialogClose
              asChild
              className={'w-[96px]'}
            >
              <Button
                onClick={() => onDeletePost(postId)}
                variant={'outline'}
              >
                {t.post.yes}
              </Button>
            </DialogClose>
            <DialogClose
              asChild
              className={'w-[96px]'}
            >
              <Button>{t.post.no}</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
