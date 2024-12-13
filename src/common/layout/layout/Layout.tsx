import React, { ElementRef, ReactElement, forwardRef } from 'react'

import { Header, Loader, ScrollArea, ToastContainer } from '@/common'
import { useScreenWidth } from '@/common/hooks/useScreenWidth'
import { cn } from '@/common/utils/cn'
import { generalStore } from '@/core/store'
import { observer } from 'mobx-react-lite'
import NextTopLoader from 'nextjs-toploader'

type Props = {
  children: React.ReactNode
  className?: string
}

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className }, ref) => {
    const { isTablet } = useScreenWidth()
    const isLoading = generalStore.isLoading

    return (
      <>
        {isLoading && <Loader />}
        <NextTopLoader
          color={'#397DF6'}
          showSpinner={false}
        />
        <ToastContainer />
        {/*todo заменить тег на mobile header*/}
        {isTablet ? <Header /> : <Header />}
        <ScrollArea
          className={'w-full h-full pt-[var(--header-height)] box-border'}
          isGoToTop
          ref={ref}
        >
          <main
            className={cn(
              'border-t-[1px] border-transparent w-full max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16 h-headCalc',
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
const LayoutWithStore = observer(Layout)

export const getBaseLayout = (page: ReactElement) => {
  return <LayoutWithStore>{page}</LayoutWithStore>
}
