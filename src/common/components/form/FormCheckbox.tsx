import * as React from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { Checkbox } from '@/common/components/checkbox'
import { CheckboxProps } from '@/common/components/checkbox/Checkbox'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
} & CheckboxProps &
  ComponentPropsWithoutRef<typeof Checkbox>

export const FormCheckbox = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<T>) => {
  const {
    field: { onChange, value, ...field },
  } = useController({
    control,
    name,
  })

  return (
    <Checkbox
      checked={value}
      onCheckedChange={onChange}
      {...field}
      {...props}
    />
  )
}
