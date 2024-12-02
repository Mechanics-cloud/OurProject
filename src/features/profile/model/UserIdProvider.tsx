import {
  ComponentProps,
  ComponentPropsWithoutRef,
  createContext,
  useContext,
} from 'react'

import { Nullable } from '@/common'

const UserIdContext = createContext<Nullable<number>>(null)

export const useUserId = () => {
  const context = useContext(UserIdContext)

  if (!context) {
    throw new Error('useUserId must be used within a Provider')
  }

  return context
}

type Props = {
  ctx: Nullable<number>
} & ComponentProps<'div'>

export const UserIdProvider = ({ children, ctx }: Props) => {
  return <UserIdContext.Provider value={ctx}>{children}</UserIdContext.Provider>
}
