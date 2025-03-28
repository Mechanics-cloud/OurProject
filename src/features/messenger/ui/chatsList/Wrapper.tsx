import React from 'react'

type WrapperProps = {
  as: React.ElementType
  children: React.ReactNode
  className: string
} & React.ComponentPropsWithoutRef<any>

export const Wrapper = ({ as: Component, children, ...rest }: WrapperProps) => {
  return <Component {...rest}>{children}</Component>
}
