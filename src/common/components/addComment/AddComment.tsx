import React, { ChangeEvent, FormEvent } from 'react'

import { Button, cn, typographyVariants, useTranslation } from '@/common'

type Props = {
  className?: string
  comment: string
  disabled?: boolean
  maxLength?: number
  onBlur: () => void
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>
  placeholder: string
}

export const AddComment = ({
  className,
  comment,
  disabled,
  maxLength = 300,
  onBlur,
  onChange,
  onSubmit,
  placeholder,
}: Props) => {
  const { t } = useTranslation()
  const onSubmitValue = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await onSubmit(e.currentTarget?.value)
  }

  return (
    <form
      className={'w-full flex justify-between items-center'}
      onSubmit={onSubmitValue}
    >
      <input
        className={className}
        maxLength={maxLength}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={'text'}
        value={comment}
      />
      <Button
        className={cn(typographyVariants({ variant: 'h3' }), 'px-3 mx-4')}
        disabled={disabled}
        type={'submit'}
        variant={'text'}
      >
        {t.post.publish}
      </Button>
    </form>
  )
}
