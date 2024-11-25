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
  Typography,
  useModal,
  useTranslation,
} from '@/common'

import { postStore } from '../model/postStore'

type Props = {
  children: ReactNode
  postId: number
}

export const DeletePost = ({ children: TriggerButton, postId }: Props) => {
  const { t } = useTranslation()
  const { onModalClose, openModal } = useModal(() => {
    postStore.deletePost(postId)
  })

  return (
    <>
      <Dialog>
        <DialogTrigger
          asChild
          onClick={openModal}
        >
          {TriggerButton}
        </DialogTrigger>
        <DialogContent>
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
                onClick={onModalClose}
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
