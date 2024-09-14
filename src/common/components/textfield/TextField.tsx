import { ElementType, forwardRef, useState } from 'react'
import { PolymorphicRef, TextFieldProps } from '@/common/components/textfield/TextField.types'
import { Typography } from '@/common/components'
import { getInputClasses } from '@/common/components/textfield/helper'
import { EyeOffOutline, EyeOutline, SearchOutline } from '@/common/assets/outline'

const TextFieldTemplate = <T extends ElementType = 'input'>(props: TextFieldProps, ref: PolymorphicRef<T>) => {
  const [open, setOpen] = useState(false)

  const {
    label,
    error,
    disabled,
    className,
    type = 'text',
    required = false,
    as: Component = 'input',
    ...rest
  }
    = props

  const cls = {
    container: 'flex flex-col',
    error: 'text-danger-500',
    star: 'text-danger-500 ml-1',
    inputContainer: 'relative',
    input: getInputClasses(Boolean(error), type, className),
    label: disabled ? 'text-dark-100 mb-1' : 'text-light-900 mb-1 ',
    leftIcon: 'absolute -translate-y-1/2 top-1/2 stroke-width-1 fill-light-100 left-3',
    rightIcon: 'absolute -translate-y-1/2 top-1/2 stroke-width-1 fill-light-100 right-3 cursor-pointer',
  }

  const handleToggle = () => setOpen(prev => !prev)

  return (
    <label className={cls.container}>
      {label &&
        <Typography variant={'reg14'} className={cls.label}>
          {label}
          {required && <span className={cls.star}>*</span>}
        </Typography>
      }
      <div className={cls.inputContainer}>
        {type === 'search' && <SearchOutline className={cls.leftIcon} />}
        <Component
          ref={ref}
          disabled={disabled}
          required={required}
          className={cls.input}
          type={type === 'search' || open ? 'text' : type}
          {...rest}
        />
        {
          type === 'password' && (
            open ?
              <EyeOutline className={cls.rightIcon} onClick={handleToggle} /> :
              <EyeOffOutline className={cls.rightIcon} onClick={handleToggle} />
          )
        }
      </div>
      {error && <Typography variant={'reg14'} className={cls.error}>{error}</Typography>}
    </label>
  )
}

export const TextField = forwardRef(TextFieldTemplate)
