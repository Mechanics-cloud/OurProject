import { PropsWithChildren } from 'react'

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/common'
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}
