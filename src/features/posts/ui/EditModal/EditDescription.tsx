import React, { ComponentPropsWithoutRef } from 'react'

import { FormTextArea, Typography } from '@/common'

type Props = {
  description: string
  maxLength: number
  maxLengthMessage: string
} & ComponentPropsWithoutRef<typeof FormTextArea>

export const EditDescription = ({
  control,
  description,
  label,
  maxLength,
  maxLengthMessage,
  name,
}: Props) => {
  return (
    <div className={'w-full'}>
      <FormTextArea
        className={'h-[250px] resize-none'}
        control={control}
        label={label}
        maxLength={maxLength}
        name={name}
      />
      <div className={'flex items-center w-full'}>
        {description?.length === maxLength && (
          <Typography
            className={'text-red-500 text-right'}
            variant={'small'}
          >
            {maxLengthMessage}
          </Typography>
        )}
        <Typography
          className={'text-light-900 text-right ml-auto'}
          variant={'small'}
        >
          {description?.length}/{maxLength}
        </Typography>
      </div>
    </div>
  )
}
