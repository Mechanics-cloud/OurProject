import { ComponentPropsWithoutRef, ElementType } from 'react'

export type PolymorphicRef<T extends ElementType = 'textarea'> =
  ComponentPropsWithoutRef<T>['ref']

export type TextAreaProps<T extends ElementType = 'textarea'> = {
  error?: string
  label: string
  required?: boolean
} & ComponentPropsWithoutRef<T>
