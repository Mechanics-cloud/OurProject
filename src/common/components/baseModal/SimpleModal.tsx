import { PropsWithChildren } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/common'
import { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  className?: string
  title: string
} & DialogProps &
  PropsWithChildren

export const SimpleModal = ({
  children,
  className,
  onOpenChange,
  open,
  title,
  ...rest
}: Props) => {
  return (
    <Dialog
      onOpenChange={onOpenChange}
      open={open}
      {...rest}
    >
      <DialogContent className={'max-w-[378px]'}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription className={className}>{children}</DialogDescription>
      </DialogContent>
    </Dialog>
  )
}
