import { ElementType, forwardRef, useState } from 'react'

import {
  EyeOffOutline,
  EyeOutline,
  SearchOutline,
} from '@/assets/icons/outlineIcons'
import { Typography } from '@/common/components'
import {
  PolymorphicRef,
  TextFieldProps,
} from '@/common/components/textfield/TextField.types'
import { getInputClasses } from '@/common/components/textfield/helper'
import { cn } from '@/common/utils/cn'

const TextFieldTemplate = <T extends ElementType = 'input'>(
  props: TextFieldProps,
  ref: PolymorphicRef<T>
) => {
  const [open, setOpen] = useState(false)

  const {
    className,
    disabled,
    error,
    label,
    required = false,
    type = 'text',
    ...rest
  } = props

  let marginForError = '24px'

  if (error) {
    const margin = `${Math.ceil(error.length / 50) * 24}px`

    marginForError = error.length > 50 ? margin : marginForError
  }

  const cls = {
    container: cn('flex flex-col relative mb-6', className),
    error: 'text-danger-500 absolute top-[100%] leading-1',
    input: getInputClasses(Boolean(error), type),
    inputContainer: 'relative',
    label: disabled ? 'text-dark-100 mb-1' : 'text-light-900 mb-1',
    leftIcon:
      'absolute -translate-y-1/2 top-1/2 stroke-width-1 fill-light-100 left-3',
    rightIcon:
      'absolute -translate-y-1/2 top-1/2 stroke-width-1 fill-light-100 right-3 cursor-pointer',
    star: 'text-danger-500 ml-1',
  }

  const handleToggle = () => setOpen((prev) => !prev)

  return (
    <label
      className={cls.container}
      style={{ marginBottom: marginForError }}
    >
      {label && (
        <Typography
          className={cls.label}
          variant={'reg14'}
        >
          {label}
          {required && <span className={cls.star}>*</span>}
        </Typography>
      )}
      <div className={cls.inputContainer}>
        {type === 'search' && <SearchOutline className={cls.leftIcon} />}
        <input
          className={cls.input}
          disabled={disabled}
          ref={ref}
          required={required}
          type={type === 'search' || open ? 'text' : type}
          {...rest}
        />
        {type === 'password' &&
          (open ? (
            <EyeOutline
              className={cls.rightIcon}
              height={24}
              onClick={handleToggle}
              width={24}
            />
          ) : (
            <EyeOffOutline
              className={cls.rightIcon}
              height={24}
              onClick={handleToggle}
              width={24}
            />
          ))}
      </div>
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

export const TextField = forwardRef(TextFieldTemplate)
