import * as React from 'react'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

import { cn } from '@/common'

type Props = ComponentPropsWithoutRef<'span'>
export const PhotoControllerButton = ({
  children,
  className,
  onClick,
}: Props) => {
  return (
    <span
      className={cn(
        'relative p-1.5 before:bg-dark-500 before:block before:top-0 before:right-0 before:bottom-0 before:left-0 before:absolute before:opacity-80 before:rounded-sm hover:text-accent-500 active:text-accent-500',
        className
      )}
      onClick={onClick}
    >
      <span className={'relative z-10'}>{children}</span>
    </span>
  )
}
