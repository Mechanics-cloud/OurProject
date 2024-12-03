import * as React from 'react'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { cn } from '@/common'
import * as PopoverPrimitive from '@radix-ui/react-popover'

type Props = ComponentPropsWithoutRef<'span'>
export const PhotoControllerButton = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Trigger>,
  Props
>(({ children, className, onClick }: Props, ref) => {
  return (
    <span
      className={cn(
        'relative p-1.5 before:bg-dark-500 before:block before:top-0 before:right-0 before:bottom-0 before:left-0 before:absolute before:z-10 before:opacity-80 before:rounded-sm hover:text-accent-500 active:text-accent-500',
        className
      )}
      onClick={onClick}
      ref={ref}
    >
      <span className={'relative z-10'}>{children}</span>
    </span>
  )
})
