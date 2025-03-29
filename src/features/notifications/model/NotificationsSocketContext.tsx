import React, { createContext, useContext, useEffect, useState } from 'react'

import { Nullable } from '@/common'
import { WebSocketApi } from '@/common/api'
import { authStore } from '@/features/auth'
import { messengerStore } from '@/features/messenger/model/stores/messengerStore'
import {
  NotificationEventDTO,
  NotificationSocketEvents,
} from '@/features/notifications/api'
import { observer } from 'mobx-react-lite'

type NotificationsSocketContextType = {
  notification: NotificationEventDTO | undefined
}

const NotificationsSocketContext =
  createContext<Nullable<NotificationsSocketContextType>>(null)

export const NotificationsSocketProvider = observer(
  ({ children }: { children: React.ReactNode }) => {
    const [notification, setNotification] = useState<NotificationEventDTO>()
    const isAuthenticated = authStore.isAuthenticated === 'authenticated'
    const connectMessengerWSEvents = messengerStore.connectMessengerWSEvents
    const disconnectMessengerWSEvents =
      messengerStore.disconnectMessengerWSEvents

    useEffect(() => {
      if (isAuthenticated) {
        WebSocketApi.connectGlobalWS()
        connectMessengerWSEvents()
        WebSocketApi.on<NotificationSocketEvents>({
          callback: (notificationDTO: NotificationEventDTO) => {
            setNotification(notificationDTO)
          },
          eventName: NotificationSocketEvents.NOTIFICATIONS,
          feature: 'notification',
        })
      }

      return () => {
        WebSocketApi.offByEventName<NotificationSocketEvents>({
          eventName: NotificationSocketEvents.NOTIFICATIONS,
        })
        disconnectMessengerWSEvents()
        WebSocketApi.disconnectGlobalWS()
      }
    }, [connectMessengerWSEvents, disconnectMessengerWSEvents, isAuthenticated])

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
)

export const useNotificationsSocket = () => {
  const context = useContext(NotificationsSocketContext)

  if (!context) {
    throw new Error('You forgot about NotificationsSocketProvider provider')
  }

  return context
}
