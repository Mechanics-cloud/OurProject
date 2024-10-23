import React from 'react'
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form'

import { AddPhoto } from '@/features/profile/settings/generalInfo/ui/AddPhoto'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: FieldPath<T>
}

export const FormAddPhoto = <T extends FieldValues>({
  control,
  name,
}: Props<T>) => {
  const {
    field: { onChange, ...field },
  } = useController({ control, name })

  return (
    <AddPhoto
      onModalPhotoSave={(photo) => {
        onChange(photo)
      }}
      {...field}
    />
  )
}
