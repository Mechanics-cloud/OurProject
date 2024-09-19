import { ComponentProps } from 'react'

import { typographyVariants } from '@/common/components/typography'
import { cn } from '@/common/utils/cn'

type Props = {
  selected?: boolean
} & ComponentProps<'button'>

export const PageButton = ({ children, selected, ...props }: Props) => {
  return (
    <button
      className={cn(
        `px-2 py-1 text-accent-500`,
        typographyVariants({ variant: 'reg14' }),
        !!selected && 'bg-white rounded-sm text-[14px] text-dark-900'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
