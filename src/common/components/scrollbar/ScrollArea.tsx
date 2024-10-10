import * as React from 'react'

import { ScrollBar } from '@/common/components/scrollbar/Scrollbar'
import { cn } from '@/common/utils/cn'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

type Props = {
  orientation?: 'horizontal' | 'vertical'
} & React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  Props
>(({ children, className, orientation, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    className={cn(className, 'relative overflow-hidden pr-scrollbar')}
    ref={ref}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className={'h-full w-full rounded-[inherit]'}>
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar orientation={orientation} />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName
