import { ComponentPropsWithRef, ElementRef, forwardRef } from 'react'

import { cn } from '@/common/utils/cn'
import { Slot } from '@radix-ui/react-slot'

import { Header } from '../header'

type Props = { asChild?: boolean } & ComponentPropsWithRef<'div'>

export const Layout = forwardRef<ElementRef<'div'>, Props>(
  ({ asChild, children, className, ...rest }, ref) => {
    const Component = asChild ? Slot : 'div'

    return (
      <div
        ref={ref}
        {...rest}
      >
        <Header />
        <main
          className={cn(
            'mt-[var(--header-height)] px-14 flex justify-center items-center',
            className
          )}
        >
          {children}
        </main>
      </div>
    )
  }
)
