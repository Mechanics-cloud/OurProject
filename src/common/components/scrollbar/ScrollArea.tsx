import * as React from 'react'

import { ScrollBar } from '@/common/components/scrollbar/Scrollbar'
import { useScreenWidth } from '@/common/hooks/useScreenWidth'
import { cn } from '@/common/utils/cn'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

type Props = {
  orientation?: 'horizontal' | 'vertical'
} & React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>

export const ScrollArea = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  Props
>(({ children, className, orientation, ...props }, ref) => {
  const { isTablet } = useScreenWidth()

  return (
    <ScrollAreaPrimitive.Root
      className={cn(
        'relative overflow-hidden',
        !isTablet && 'pr-scrollbar',
        className
      )}
      ref={ref}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={'h-full w-full rounded-[inherit]'}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar orientation={orientation} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
})

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName
