import React from 'react'

import { ProtectedLayout } from '@/common'
import { NotificationsSocketProvider } from '@/features/notifications'

type Props = {
  children: React.ReactNode
}

export const ProvidersLayout = ({ children }: Props) => {
  return (
    <NotificationsSocketProvider>
      <ProtectedLayout>{children}</ProtectedLayout>
    </NotificationsSocketProvider>
  )
}
