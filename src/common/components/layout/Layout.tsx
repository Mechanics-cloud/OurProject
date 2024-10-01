import {
  ComponentPropsWithRef,
  ElementRef,
  ReactElement,
  forwardRef,
} from 'react'

import { Header, ScrollArea, ToastContainer } from '@/common'
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

export const getBaseLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
