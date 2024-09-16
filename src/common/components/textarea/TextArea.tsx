import { ElementType, forwardRef } from 'react'

import { Typography } from '@/common/components'
import {
  PolymorphicRef,
  TextAreaProps,
} from '@/common/components/textarea/TextArea.types'
import { getTextAreaClasses } from '@/common/components/textarea/helper'

const TextAreaTemplate = <T extends ElementType = 'textarea'>(
  props: TextAreaProps,
  ref: PolymorphicRef<T>
) => {
  const { className, disabled, error, label, required = false, ...rest } = props

  const cls = {
    container: 'flex flex-col',
    error: 'text-danger-500',
    label: disabled ? 'text-dark-100 mb-1' : 'text-light-900 mb-1',
    star: 'text-danger-500 ml-1',
    textarea: getTextAreaClasses(Boolean(error), className),
  }

  return (
    <label className={cls.container}>
      {label && (
        <Typography
          className={cls.label}
          variant={'reg14'}
        >
          {label}
          {required && <span className={cls.star}>*</span>}
        </Typography>
      )}
      <textarea
        className={cls.textarea}
        disabled={disabled}
        ref={ref}
        required={required}
        {...rest}
      />
      {error && (
        <Typography
          className={cls.error}
          variant={'reg14'}
        >
          {error}
        </Typography>
      )}
    </label>
  )
}

export const TextArea = forwardRef(TextAreaTemplate)
