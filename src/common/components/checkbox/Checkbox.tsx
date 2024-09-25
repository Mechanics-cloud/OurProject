'use client'

import * as React from 'react'
import { useId } from 'react'

import { CheckmarkOutline } from '@/assets/icons/outlineIcons'
import { typographyVariants } from '@/common/components'
import { Variant } from '@/common/components/typography/Typography'
import { cn } from '@/common/utils/cn'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

const CheckboxField = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <div
    className={clsx(
      'flex items-center justify-center h-[36px] w-[36px] rounded-full hover:bg-dark-300 active:bg-dark-100 focus-visible:outline-none disabled:pointer-events-none',
      'focus-within:bg-dark-500'
    )}
  >
    <CheckboxPrimitive.Root
      className={cn(
        'peer h-[18px] w-[18px] shrink-0 rounded-sm border-2 enabled:border-light-500 ring-offset-background focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none enabled:data-[state=checked]:bg-light-100 data-[state=checked]:text-dark-900 enabled:data-[state=checked]:border-none',
        'data-[state=checked]:disabled:bg-dark-100 data-[state=checked]:disabled:border-none data-[state=unchecked]:disabled:border-light-900',
        className
      )}
      ref={ref}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <CheckmarkOutline
          className={clsx(
            'size-full',
            props.disabled ? 'text-light-700' : 'text-current'
          )}
        />
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
  typographyVariant?: Variant
}
export const Checkbox = ({
  checked,
  disabled,
  id,
  label,
  typographyVariant = 'reg14',
}: Props) => {
  const generatedId = useId()
  const checkboxId = id || generatedId

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
        id={checkboxId}
      />
      {label && (
        <label
          className={clsx(
            'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
            typographyVariants({ variant: typographyVariant }),
            disabled ? 'text-light-900' : 'text-light-100'
          )}
          htmlFor={checkboxId}
        >
          {label}
        </label>
      )}
    </div>
  )
}
