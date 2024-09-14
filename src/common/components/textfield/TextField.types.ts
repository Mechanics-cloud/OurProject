import { ComponentPropsWithoutRef, ElementType } from 'react'

export type TextFieldType = Pick<HTMLInputElement, 'type'> & 'search';

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithoutRef<T>['ref']

export type TextFieldProps<T extends ElementType = 'input'> = {
  label: string;
  as?: T;
  error?: string;
  required?: boolean;
  type?: TextFieldType;
} & ComponentPropsWithoutRef<T>