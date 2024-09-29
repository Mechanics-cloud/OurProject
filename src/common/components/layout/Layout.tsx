import {
  ComponentPropsWithRef,
  ElementRef,
  ReactElement,
  forwardRef,
} from 'react'

import { Header, ToastContainer } from '@/common'
import { cn } from '@/common/utils/cn'
import { Slot } from '@radix-ui/react-slot'
import NextTopLoader from 'nextjs-toploader'

type Props = { asChild?: boolean } & ComponentPropsWithRef<'div'>

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ asChild, children, className, ...rest }, ref) => {
    const Component = asChild ? Slot : 'div'

    return (
      <Component
        ref={ref}
        {...rest}
      >
        <NextTopLoader
          color={'#397DF6'}
          showSpinner={false}
        />
        <Header />
        <main
          className={cn(
            'mt-[var(--header-height)] px-14 flex justify-center items-center h-screen',
            className
          )}
        >
          {children}
          <ToastContainer />
        </main>
      </Component>
    )
  }
)
export function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>
}
