import { ChangeEvent } from 'react'

import { useTranslation } from '@/common'
import {
  ChooseFileButtonProps,
  ChooseFileSchemaType,
  chooseFileSchema,
} from '@/features/profile/settings/avatarDialog/model'
import { z } from 'zod'

export function useChooseFile({
  onErrorChange,
  onPhotoChange,
}: ChooseFileButtonProps) {
  const { t } = useTranslation()
  const onPhotoChoose = (inputEvent: ChangeEvent<HTMLInputElement>) => {
    const file = inputEvent.target.files ? inputEvent.target.files[0] : null

    if (!file) {
      onErrorChange(t.avatarModal.errors.chooseFile)

      return
    }

    const dataFile: ChooseFileSchemaType = {
      fileSize: file.size,
      fileType: file.type,
    }

    try {
      chooseFileSchema(t).parse(dataFile)
      onPhotoChange(URL.createObjectURL(file))
      onErrorChange('')
    } catch (error) {
      if (error instanceof z.ZodError) {
        onErrorChange(error.errors[0].message)
      } else {
        onErrorChange(t.avatarModal.errors.unknownError)
      }
    }
  }

  return { onPhotoChoose, t }
}
