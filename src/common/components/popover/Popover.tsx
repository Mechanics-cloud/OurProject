'use client'

import * as React from 'react'

import { cn } from '@/common'
import * as PopoverPrimitive from '@radix-ui/react-popover'

const Popover = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverAnchor = PopoverPrimitive.Anchor

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ align = 'center', className, sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      align={align}
      className={cn(
        'bg-dark-500 border border-dark-300 p-2 rounded-sm',
        className
      )}
      ref={ref}
      sideOffset={sideOffset}
      {...props}
    />
  </PopoverPrimitive.Portal>
))

PopoverContent.displayName = PopoverPrimitive.Content.displayName

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger }
