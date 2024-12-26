import React, { ElementRef, forwardRef } from 'react'

import { Header, Loader, ScrollArea, ToastContainer } from '@/common'
import { cn } from '@/common/utils/cn'
import { generalStore } from '@/core/store'
import { observer } from 'mobx-react-lite'
import NextTopLoader from 'nextjs-toploader'

type Props = {
  children: React.ReactNode
  className?: string
}

const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className }, ref) => {
    const isLoading = generalStore.isLoading

    return (
      <>
        {isLoading && <Loader />}
        <NextTopLoader
          color={'#397DF6'}
          showSpinner={false}
        />
        <ToastContainer />
        <Header />
        <ScrollArea
          className={'w-full h-full mt-[var(--header-height)] box-border'}
          isGoToTop
          ref={ref}
        >
          <main
            className={cn(
              'border-t-[1px] border-transparent w-full max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16 lg:h-headCalc',
              className
            )}
          >
            {children}
          </main>
        </ScrollArea>
      </>
    )
  }
)

Layout.displayName = 'Layout'
export const LayoutWithStore = observer(Layout)
