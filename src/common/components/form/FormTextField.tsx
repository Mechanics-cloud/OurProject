import { ComponentPropsWithoutRef } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextField } from '@/common/components'

type Props<T extends FieldValues> = {
  control: Control<T>
  errorMessage?: string
  name: FieldPath<T>
} & ComponentPropsWithoutRef<typeof TextField>

export const FormTextField = <T extends FieldValues>({
  control,
  errorMessage,
  name,
  ...props
}: Props<T>) => {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name })

  return (
    <TextField
      error={errorMessage ?? error?.message}
      {...props}
      {...field}
    />
  )
}
