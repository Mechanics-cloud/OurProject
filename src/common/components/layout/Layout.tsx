import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/common/utils/cn'

import { Header } from '../header'
import { ScrollArea } from '../scrollbar'

type Props = ComponentPropsWithRef<'div'>

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        className={'w-screen h-screen'}
        ref={ref}
        {...rest}
      >
        <Header />
        <ScrollArea className={'w-full h-full'}>
          <main
            className={cn(
              'px-14 mt-[var(--header-height)] h-headCalc',
              className
            )}
          >
            {children}
          </main>
        </ScrollArea>
      </div>
    )
  }
)
