import * as React from 'react'

import { ArrowBackOutline } from '@/assets/icons'
import {
  Button,
  DialogHeader,
  DialogTitle,
  cn,
  typographyVariants,
} from '@/common'
import { addPostStore } from '@/features/createPost'

type Props = {
  onRightButtonClick: () => void
  rightButtonTitle: string
  title: string
}

export const ModalHeader = ({
  onRightButtonClick,
  rightButtonTitle,
  title,
}: Props) => {
  const prevStage = addPostStore.prevStage

  return (
    <DialogHeader>
      <DialogTitle
        className={
          'flex justify-center items-center relative  border-0 md:border-b'
        }
      >
        <ArrowBackOutline
          className={'arrowBack'}
          onClick={prevStage}
        />
        <span>{title}</span>
        <Button
          className={cn(
            'absolute text-accent-500 px-3 py-1.5 right-4 top-2 focus-within:outline-0',
            typographyVariants({ variant: 'h3' })
          )}
          onClick={onRightButtonClick}
          variant={'text'}
        >
          {rightButtonTitle}
        </Button>
      </DialogTitle>
    </DialogHeader>
  )
}
