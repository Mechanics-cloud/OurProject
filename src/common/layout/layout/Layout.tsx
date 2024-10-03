import React, { ElementRef, ReactElement, forwardRef } from 'react'
import { ToastContainer } from 'react-toastify'

import { generalStore } from '@/app/store'
import { Header, Loader, ScrollArea } from '@/common'
import { cn } from '@/common/utils/cn'
import { observer } from 'mobx-react-lite'
import NextTopLoader from 'nextjs-toploader'

type Props = {
  children: React.ReactNode
  className?: string
}

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className, ...rest }, ref) => {
    const isLoading = generalStore.isLoading

    return (
      <div
        className={
          'w-full max-w-screen-2xl mx-auto h-screen flex flex-col items-center justify-center'
        }
        ref={ref}
        {...rest}
      >
        {isLoading && <Loader />}
        <NextTopLoader
          color={'#397DF6'}
          showSpinner={false}
        />
        <ToastContainer />
        <Header />
        <ScrollArea className={'w-full h-full contents md:block'}>
          <main
            className={cn(
              'px-4 md:px-14 mt-[var(--header-height)] h-headCalc border-t-[1px] border-transparent',
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

Layout.displayName = 'Layout'
const LayoutWithStore = observer(Layout)

export const getBaseLayout = (page: ReactElement) => {
  return <LayoutWithStore>{page}</LayoutWithStore>
}
