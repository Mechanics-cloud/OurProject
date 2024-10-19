import * as React from 'react'
import { ChangeEvent, useRef } from 'react'

import { Button } from '@/common'
import { ChooseFileButtonProps } from '@/features/profile/settings/avatarDialog/model'
import {
  ChooseFileSchemaType,
  chooseFileSchema,
} from '@/features/profile/settings/avatarDialog/model/chooseFileButton/chooseFileSchema'
import { ZodError } from 'zod'

export const ChooseFileButton = ({
  setError,
  setPhoto,
}: ChooseFileButtonProps) => {
  const inputFileRef = useRef<HTMLInputElement>(null)
  const handleChoose = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null

    if (!file) {
      setError('Choose file')

      return
    }

    const dataFile: ChooseFileSchemaType = {
      fileSize: file.size,
      fileType: file.type,
    }

    try {
      chooseFileSchema.parse(dataFile)
      setPhoto(URL.createObjectURL(file))
      setError('')
    } catch (error) {
      if (error instanceof ZodError) {
        setError(error.errors[0].message)
      } else {
        setError('Unknown error')
      }
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          inputFileRef.current?.click()
        }}
        type={'button'}
      >
        Select from Computer
      </Button>
      <input
        accept={'image/*, .png, .jpg, .jpeg'}
        className={'opacity-0 h-0 w-0 leading-none hidden p-0 m-0'}
        onChange={handleChoose}
        ref={inputFileRef}
        type={'file'}
      />
    </>
  )
}
