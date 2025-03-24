import React, { createContext, useContext, useEffect, useState } from 'react'

import { Nullable } from '@/common'
import { WebSocketApi } from '@/common/api'
import { generalStore } from '@/core/store'
import {
  NotificationEventDTO,
  NotificationSocketEvents,
} from '@/features/notifications/api'

type NotificationsSocketContextType = {
  notification: NotificationEventDTO | undefined
}

const NotificationsSocketContext =
  createContext<Nullable<NotificationsSocketContextType>>(null)

export const NotificationsSocketProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [notification, setNotification] = useState<NotificationEventDTO>()

  useEffect(() => {
    WebSocketApi.on({
      callback: (notificationDTO: NotificationEventDTO) => {
        setNotification(notificationDTO)
      },
      eventName: NotificationSocketEvents.NOTIFICATIONS,
      feature: 'notification',
    })

    return () => {
      WebSocketApi.off({ feature: 'notification' })
    }
  }, [])

  return (
    <NotificationsSocketContext.Provider
      value={{
        notification,
      }}
    >
      {children}
    </NotificationsSocketContext.Provider>
  )
}

export const useNotificationsSocket = () => {
  const context = useContext(NotificationsSocketContext)

  if (!context) {
    throw new Error('You forgot about NotificationsSocketProvider provider')
  }

  return context
}
