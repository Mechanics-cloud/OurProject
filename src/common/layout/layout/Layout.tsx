import React, { ElementRef, forwardRef } from 'react'

import { GoTopButton, Header, ScrollArea, ToastContainer } from '@/common'
import { cn } from '@/common/utils/cn'
import { observer } from 'mobx-react-lite'

type Props = {
  children: React.ReactNode
  className?: string
}

const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className }, ref) => {
    return (
      <>
        <ToastContainer />
        {/*todo заменить тег на mobile header*/}
        <Header />
        <ScrollArea
          className={'w-full h-full pt-[var(--header-height)] box-border'}
        >
          <main
            className={cn(
              'border-t-[1px] border-transparent w-full max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16',
              className
            )}
            ref={ref}
          >
            {children}
          </main>
        </ScrollArea>
        <GoTopButton />
      </>
    )
  }
)

Layout.displayName = 'Layout'
export const LayoutWithStore = observer(Layout)
