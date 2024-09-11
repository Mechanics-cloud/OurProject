import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cn } from '@/common/utils/cn'
import { ScrollBar } from '@/common/components/scrollbar/Scrollbar'

type Props = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  orientation?: 'horizontal' | 'vertical'
}

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>, Props>(({ orientation, className, children, ...props }, ref) => (
  <ScrollAreaPrimitive.Root
    ref={ref}
    className={cn(className, "relative overflow-hidden pr-4")}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar/>
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
))

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName