import { ComponentProps } from 'react'

import { cn } from '@/common/utils/cn'
import { Slot } from '@radix-ui/react-slot'
import { VariantProps, cva } from 'class-variance-authority'

export const buttonVariants = cva(
  ['rounded-sm px-6 py-1.5 inline-flex justify-center text-white'],
  {
    defaultVariants: {
      variant: 'primary',
    },
    variants: {
      variant: {
        outline: [
          'text-accent-500',
          'border',
          'border-solid',
          'border-accent-500',
          'hover:text-accent-100 hover:border-accent-100',
          'focus-within:border-accent-700',
          'focus-within:outline focus-within:outline-2',
          'focus-within:outline-accent-700',
          'focus-within:text-accent-700',
          'disabled:border-accent-900 disabled:text-accent-900',
        ],
        primary: [
          'bg-accent-500',
          'active:bg-accent-700',
          'hover:bg-accent-100',
          'focus-within:outline focus-within:outline-2 focus-within:outline-accent-700',
          'disabled:bg-accent-900 disabled:text-light-900',
        ],
        secondary: [
          'bg-dark-300',
          'active:bg-dark-400',
          'hover:bg-dark-100',
          'focus-within:outline focus-within:outline-1 focus-within:outline-accent-300',
          'disabled:bg-dark-500 disabled:text-light-900',
        ],
        text: [
          'text-accent-500',
          'active:text-accent-700',
          'hover:text-accent-100',
          'focus-within:outline focus-within:outline-2',
          'focus-within:outline-accent-700',
          'focus-within:text-accent-700',
          'disabled:text-accent-900',
        ],
      },
    },
  }
)

type ButtonProps = { asChild?: boolean } & ComponentProps<'button'> &
  VariantProps<typeof buttonVariants>

function Button({
  asChild,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot : 'button'

  return (
    <Component
      className={cn(buttonVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Button }
