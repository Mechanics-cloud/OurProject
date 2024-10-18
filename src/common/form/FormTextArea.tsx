import { ComponentPropsWithoutRef } from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { TextArea } from '@/common'

type Props<T extends FieldValues> = {
  control: Control<T>
  errorMessage?: string
  name: FieldPath<T>
} & ComponentPropsWithoutRef<typeof TextArea>

export const FormTextArea = <T extends FieldValues>({
  control,
  errorMessage,
  name,
  ...props
}: Props<T>) => {
  const {
    field: { ...field },
    fieldState: { error },
  } = useController({ control, name })

  return (
    <TextArea
      error={errorMessage || error?.message}
      {...props}
      {...field}
    />
  )
}
