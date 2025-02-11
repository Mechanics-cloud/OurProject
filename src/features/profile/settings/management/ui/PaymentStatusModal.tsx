import React from 'react'
import { toast } from 'react-toastify'

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  useTranslation,
} from '@/common'
import { useRouter } from 'next/router'

type PaymentStatusModalProps = {
  onClose: () => void
  open: boolean
  status: 'error' | 'success' | null
}

export const PaymentStatusModal = ({
  onClose,
  open,
  status,
}: PaymentStatusModalProps) => {
  const router = useRouter()
  const { t } = useTranslation()

  const handleClose = () => {
    const { success: _, ...restQuery } = router.query

    router.replace({ pathname: router.pathname, query: restQuery }, undefined, {
      shallow: true,
    })
    onClose()
  }

  return (
    <Dialog
      onOpenChange={handleClose}
      open={open}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {status === 'success'
              ? t.profileManagement.success
              : t.profileManagement.error}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className={'text-center'}>
          {status === 'success'
            ? t.profileManagement.successDescription
            : t.profileManagement.errorDescription}
        </DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className={'w-full'}
              onClick={handleClose}
            >
              {status === 'success'
                ? t.profileManagement.successButton
                : t.profileManagement.errorButton}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
