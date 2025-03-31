import { ReactNode } from 'react'

import {
  BaseLayoutWithStore,
  Menu,
  SideBar,
  cn,
  useMe,
  useTranslation,
} from '@/common'
import { setTranslation } from '@/common/utils/setTranslation'
import { authStore } from '@/features/auth'
import { observer } from 'mobx-react-lite'

type Props = {
  children: ReactNode
  className?: string
}

export const ProtectedLayout = observer(({ children, className }: Props) => {
  const currentAuthState = authStore.isAuthenticated
  const { t } = useTranslation()

  useMe()
  setTranslation(t)

  return (
    <BaseLayoutWithStore
      className={cn(
        currentAuthState === 'authenticated' ? 'flex' : '',
        className
      )}
    >
      {currentAuthState === 'authenticated' ? (
        <>
          <SideBar />
          <Menu className={'lg:hidden'} />
          <div className={'lg:pl-9 w-full lg:ml-56 pb-20'}>{children}</div>
        </>
      ) : (
        <>{children}</>
      )}
    </BaseLayoutWithStore>
  )
})
