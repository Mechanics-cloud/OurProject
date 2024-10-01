import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react'

import { Header, ScrollArea, SideBar, ToastContainer } from '@/common'
import { cn } from '@/common/utils/cn'
import NextTopLoader from 'nextjs-toploader'

type Props = ComponentPropsWithRef<'div'>

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div
        className={'w-screen h-screen'}
        ref={ref}
        {...rest}
      >
        <NextTopLoader
          color={'#397DF6'}
          showSpinner={false}
        />
        <ToastContainer />
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
