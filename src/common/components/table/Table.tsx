import { ComponentPropsWithoutRef } from 'react'

import { cn } from '@/common/utils'

const Root = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'table'>) => {
  return (
    <table
      className={cn(
        'border-spacing-[0] border-collapse w-full text-sm',
        className
      )}
      {...restProps}
    />
  )
}
const Head = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'thead'>) => {
  return (
    <thead
      className={cn('bg-dark-500', className)}
      {...restProps}
    />
  )
}
const Body = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'tbody'>) => {
  return (
    <tbody
      className={cn(className)}
      {...restProps}
    />
  )
}
const Row = ({ className, ...restProps }: ComponentPropsWithoutRef<'tr'>) => {
  return (
    <tr
      className={cn('border border-dark-500', className)}
      {...restProps}
    />
  )
}
const HeaderCell = ({
  className,
  ...restProps
}: ComponentPropsWithoutRef<'th'>) => {
  return (
    <th
      className={cn('text-left py-3 px-6', className)}
      {...restProps}
    />
  )
}
const Cell = ({ className, ...restProps }: ComponentPropsWithoutRef<'td'>) => {
  return (
    <td
      className={cn('py-3 px-6', className)}
      {...restProps}
    />
  )
}

export const Table = { Body, Cell, Head, HeaderCell, Root, Row }
