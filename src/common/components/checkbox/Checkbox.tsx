'use client'

import * as React from 'react'

import { CheckmarkOutline } from '@/assets/icons/outlineIcons'
import { typographyVariants } from '@/common/components'
import { cn } from '@/common/utils/cn'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

const CheckboxField = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div
    className={
      'flex items-center justify-center h-[36px] w-[36px] rounded-full hover:border hover:border-dark-300 hover:bg-dark-300 active:border active:bg-dark-100 active:border-dark-100 focus:border focus:border-dark-500 focus:bg-dark-500 disabled:pointer-events-none'
    }
  >
    <CheckboxPrimitive.Root
      className={cn(
        'peer h-[18px] w-[18px] shrink-0 rounded-sm border-2 border-light-500 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none data-[state=checked]:bg-light-100 data-[state=checked]:text-dark-900',
        className
      )}
      ref={ref}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <CheckmarkOutline className={'h-4 w-4'} />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  </div>
))

CheckboxField.displayName = CheckboxPrimitive.Root.displayName

type Props = {
  checked?: boolean
  disabled?: boolean
  id?: string
  label?: string
}
const Checkbox = ({ checked, disabled, id, label }: Props) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-0.5',
        disabled && 'pointer-events-none'
      )}
    >
      <CheckboxField
        checked={checked}
        disabled={disabled}
        id={id}
      />
      {label && (
        <label
          className={clsx(
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            typographyVariants({ variant: 'reg14' }),
            disabled ? 'text-light-900' : 'text-light-100'
          )}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export { Checkbox }
