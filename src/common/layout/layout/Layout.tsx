import React, { ElementRef, ReactElement, forwardRef } from 'react'
import { ToastContainer } from 'react-toastify'

import { GoTopButton, Header, Loader, ScrollArea } from '@/common'
import { cn } from '@/common/utils/cn'
import { generalStore } from '@/core/store'
import { observer } from 'mobx-react-lite'
import NextTopLoader from 'nextjs-toploader'

type Props = {
  children: React.ReactNode
  className?: string
}

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ children, className }) => {
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
        <ScrollArea className={'w-full h-full mt-[var(--header-height)]'}>
          <main
            className={cn(
              'border-t-[1px] border-transparent w-full max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16',
              className
            )}
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
const LayoutWithStore = observer(Layout)

export const getBaseLayout = (page: ReactElement) => {
  return <LayoutWithStore>{page}</LayoutWithStore>
}
