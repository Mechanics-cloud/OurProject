'use client'

import * as React from 'react'
import { ComponentPropsWithoutRef, ReactNode } from 'react'

import ArrowIosDownOutline from '@/assets/icons/outlineIcons/ArrowIosDownOutline'
import { typographyVariants } from '@/common/components/typography'
import { cn } from '@/common/utils/cn'
import * as SelectPrimitive from '@radix-ui/react-select'
import { clsx } from 'clsx'

const SelectBasic = SelectPrimitive.Root

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Value

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Trigger
    className={cn(
      'group flex h-9 w-full items-center justify-between rounded-sm border border-dark-300 bg-background px-3 py-1.5 focus:border-accent-500 focus:border-2 focus:outline-none disabled:border-dark-100 disabled:text-dark-100',
      'data-[state=open]:border-light-100 data-[state=open]:bg-dark-500 [&>span]:flex [&>span]:items-center [&>span]:gap-2',
      'rounded-t-sm',
      typographyVariants({ variant: 'reg16' }),
      className
    )}
    ref={ref}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ArrowIosDownOutline className={'group-data-[state=open]:rotate-180'} />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

SelectTrigger.displayName = SelectPrimitive.Trigger.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ children, className, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      className={cn(
        'relative z-50 max-h-96 overflow-hidden rounded-sm border bg-dark-500',
        className
      )}
      position={position}
      ref={ref}
      style={{ width: 'var(--radix-select-trigger-width)' }}
      {...props}
    >
      <SelectPrimitive.Viewport className={cn('p-0.5')}>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

SelectContent.displayName = SelectPrimitive.Content.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    className={clsx(
      'py-1',
      'text-light-900',
      typographyVariants({ variant: 'reg14' }),
      className
    )}
    ref={ref}
    {...props}
  />
))

SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ children, className, ...props }, ref) => (
  <SelectPrimitive.Item
    className={cn(
      'rounded-sm px-2.5 py-1.5 outline-none hover:bg-dark-300 hover:text-accent-500 focus:bg-accent focus:text-accent-500 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>span]:flex [&>span]:items-center [&>span]:gap-2 cursor-pointer',
      typographyVariants({ variant: 'reg16' }),
      className
    )}
    ref={ref}
    {...props}
  >
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))

SelectItem.displayName = SelectPrimitive.Item.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    ref={ref}
    {...props}
  />
))

SelectSeparator.displayName = SelectPrimitive.Separator.displayName

type Props = {
  children: ReactNode
  className?: string
  label?: string
  placeholder?: number | string
} & ComponentPropsWithoutRef<typeof SelectPrimitive.Root>

const Select = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Root>,
  Props
>(({ children, className, label, placeholder, ...props }, ref) => {
  return (
    <SelectBasic {...props}>
      <SelectGroup
        className={className}
        ref={ref}
      >
        {label && <SelectLabel>{label}</SelectLabel>}
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </SelectGroup>
    </SelectBasic>
  )
})

Select.displayName = 'Select'

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
}
