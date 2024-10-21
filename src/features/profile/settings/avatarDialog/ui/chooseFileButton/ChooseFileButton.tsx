import * as React from 'react'
import { ChangeEvent, useId, useRef } from 'react'

import { Button, useTranslation } from '@/common'
import { ChooseFileButtonProps } from '@/features/profile/settings/avatarDialog/model'
import {
  ChooseFileSchemaType,
  chooseFileSchema,
} from '@/features/profile/settings/avatarDialog/model/chooseFileButton/chooseFileSchema'
import { ZodError } from 'zod'

export const ChooseFileButton = ({
  onErrorChange,
  onPhotoChange,
}: ChooseFileButtonProps) => {
  const { t } = useTranslation()
  const onPhotoChoose = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

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
      if (error instanceof ZodError) {
        debugger
        onErrorChange(error.errors[0].message)
      } else {
        onErrorChange(t.avatarModal.errors.unknownError)
      }
    }
  }

  return (
    <>
      <label htmlFor={'chooseFileInput'}>
        <Button
          asChild
          className={'cursor-pointer'}
        >
          <span>{t.avatarModal.chooseButton}</span>
        </Button>
      </label>
      <input
        accept={'image/*, .png, .jpg, .jpeg'}
        className={'opacity-0 h-0 w-0 leading-none hidden p-0 m-0'}
        id={'chooseFileInput'}
        onChange={onPhotoChoose}
        type={'file'}
      />
    </>
  )
}
