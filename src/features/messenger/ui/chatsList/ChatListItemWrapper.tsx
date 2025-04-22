import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

import { observer } from 'mobx-react-lite'

type WrapperProps = {
  as: ElementType
  children: ReactNode
  className: string
} & ComponentPropsWithoutRef<'a' | 'div'>

export const ChatListItemWrapper = observer(
  ({ as: Component, children, ...rest }: WrapperProps) => {
    return <Component {...rest}>{children}</Component>
  }
)
