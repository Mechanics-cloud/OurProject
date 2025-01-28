import React, { PropsWithChildren } from 'react'

import { cn } from '@/common'

type Props = {
  className?: string
  isVisible?: boolean
  onClose?: () => void
} & PropsWithChildren

export const Overlay = ({ children, className, isVisible, onClose }: Props) => {
  if (!isVisible) {
    return null
  }

  return (
    <div
      className={cn('fixed inset-0 bg-black bg-opacity-50 z-50', className)}
      onClick={onClose}
    >
      {children}
    </div>
  )
}
