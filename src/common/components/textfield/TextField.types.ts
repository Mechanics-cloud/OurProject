import {
  ComponentPropsWithoutRef,
  ElementType,
  HTMLInputTypeAttribute,
} from 'react'

export type TextFieldType = 'search' | HTMLInputTypeAttribute
export type ErrorMode = 'text' | 'tooltip'

export type PolymorphicRef<T extends ElementType = 'input'> =
  ComponentPropsWithoutRef<T>['ref']

export type TextFieldProps<T extends ElementType = 'input'> = {
  as?: T
  error?: string
  errorMode?: ErrorMode
  label: string
  required?: boolean
  type?: TextFieldType
} & ComponentPropsWithoutRef<T>
