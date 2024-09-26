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
    field: { ...field },
    fieldState: { error },
  } = useController({ control, name })

  const errorToShow = errorMessage ?? error?.message
  let style = ''

  if (errorToShow) {
    const margin = `${Math.ceil(errorToShow.length / 50) * 24}px`

    style = errorToShow.length > 50 ? `mb-[${margin}]` : ''
  }

  return (
    <TextField
      className={style}
      error={errorToShow}
      {...props}
      {...field}
    />
  )
}
