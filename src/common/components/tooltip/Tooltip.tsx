import * as React from 'react'

import { TooltipPositions } from '@/common/components/tooltip/types'
import { cn } from '@/common/utils/cn'
import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import { TooltipProps } from '@radix-ui/react-tooltip'

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, side, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    className={cn(
      'rounded bg-dark-500 border-dark-100 px-4 py-2 text-sm text-popover-foreground border z-1 shadow-md animate-in fade-in-0 zoom-in-95 before:bg-dark-500 before:border-dark-100 before:w-3 before:h-3 before:rotate-45 z-10 before:absolute before:z-[2]',
      {
        'before:-bottom-1.5 before:left-0 before:right-0 before:mx-auto before:border-b before:border-r':
          side === 'top',
        'before:-top-1.5 before:left-0  before:right-0 before:mx-auto before:border-t before:border-l':
          side === 'bottom',
        'before:bottom-0 before:top-0 before:my-auto before:-left-1.5 before:mx-auto before:border-b before:border-l':
          side === 'right',
        'before:bottom-0 before:top-0 before:my-auto before:-right-1.5 before:mx-auto before:border-t before:border-r':
          side === 'left',
        'data-[side=bottom]:slide-in-from-top-2': true,
        'data-[side=left]:slide-in-from-right-2': true,
        'data-[side=right]:slide-in-from-left-2': true,
        'data-[side=top]:slide-in-from-bottom-2': true,
        'data-[state=closed]:animate-out': true,
        'data-[state=closed]:fade-out-0': true,
        'data-[state=closed]:zoom-out-95': true,
      },
      className
    )}
    ref={ref}
    side={side}
    sideOffset={sideOffset}
    {...props}
  />
))

TooltipContent.displayName = TooltipPrimitive.Content.displayName

type Props = {
  children: React.ReactNode
  side?: TooltipPositions
  title: string
} & TooltipProps

const Tooltip = ({ children, open, side = 'top', title, ...rest }: Props) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root
        {...rest}
        open={open}
      >
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side}>
          <p>{title}</p>
        </TooltipContent>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}

export { Tooltip }
