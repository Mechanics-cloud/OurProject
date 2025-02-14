import React, {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  useEffect,
  useRef,
} from 'react'

import { GoTopButton } from '@/common'
import { ScrollBar } from '@/common/components/scrollbar/Scrollbar'
import { cn } from '@/common/utils/cn'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

type Props = {
  isGoToTop?: boolean
  orientation?: 'horizontal' | 'vertical'
} & ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>

export const ScrollArea = forwardRef<
  ElementRef<typeof ScrollAreaPrimitive.Root>,
  Props
>(({ children, className, isGoToTop = false, orientation, ...props }, ref) => {
  const scrollableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const element = scrollableRef.current?.querySelector('.viewport > div')

      if (element instanceof HTMLElement) {
        element.style.display = 'block'
      }
    }
  }, [])

  return (
    <ScrollAreaPrimitive.Root
      className={cn('relative overflow-hidden lg:pr-scrollbar', className)}
      ref={ref}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        className={'h-full w-full rounded-[inherit] viewport'}
        ref={scrollableRef}
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      {isGoToTop && scrollableRef.current && (
        <GoTopButton scrollInElementRef={scrollableRef} />
      )}
      <ScrollBar orientation={orientation} />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
})

ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName
