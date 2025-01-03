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
    const element = document.querySelector('.viewport > div')

    if (element instanceof HTMLElement) {
      element.style.display = 'block'
    }
  }, [])

  useEffect(() => {
    const scrollableElement = scrollableRef.current

    if (!scrollableElement) {
      return
    }

    const resizeObserver = new ResizeObserver(() => {
      if (scrollableElement) {
        scrollableElement.scrollTop = scrollableElement.scrollHeight
      }
    })

    resizeObserver.observe(scrollableElement)

    return () => {
      resizeObserver.disconnect()
    }
  }, [children])

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
