import React, { ComponentPropsWithoutRef } from 'react'
import { Control, FieldValues, Path, useController } from 'react-hook-form'

import { Select } from '@/common'

type Props<T extends FieldValues> = {
  children: React.ReactNode
  control: Control<T>
  label?: string
  name: Path<T>
  placeholder?: number | string
} & ComponentPropsWithoutRef<typeof Select>

export const FormSelect = <T extends FieldValues>({
  children,
  className,
  control,
  label,
  name,
  placeholder,
  ...props
}: Props<T>) => {
  const {
    field: { onChange, ...field },
  } = useController({ control, name })

  return (
    <Select
      {...props}
      className={className}
      label={label}
      onValueChange={onChange}
      placeholder={placeholder}
      {...field}
    >
      {children}
    </Select>
  )
}
