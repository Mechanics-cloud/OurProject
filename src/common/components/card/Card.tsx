import { ComponentProps } from 'react'

import { cn } from '@/common/utils/cn'
import { Slot } from '@radix-ui/react-slot'

type Props = { asChild?: boolean } & ComponentProps<'div'>

export const Card = ({ asChild, children, className, ...props }: Props) => {
  const Component = asChild ? Slot : 'div'

  return (
    <Component
      className={cn(
        `bg-dark-500 rounded-sm border border-dark-300 px-6 py-4 text-light-100`,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
