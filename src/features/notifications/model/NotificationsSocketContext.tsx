import React, { createContext, useContext, useEffect, useState } from 'react'

import { Nullable } from '@/common'
import { WebSocketApi } from '@/common/api'
import { WebSocketEvents } from '@/common/enums'
import { authStore } from '@/features/auth'
import { messengerStore } from '@/features/messenger/model/store/store'
import { NotificationEventDTO } from '@/features/notifications/api'
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
    const getMessengerData = messengerStore.getMessengerData
    const disconnectMessengerWSEvents =
      messengerStore.disconnectMessengerWSEvents

    useEffect(() => {
      const controller = new AbortController()

      if (isAuthenticated) {
        getMessengerData({ isInitialRequest: true, signal: controller.signal })
        WebSocketApi.connectGlobalWS()
        connectMessengerWSEvents()
        WebSocketApi.on({
          callback: (notificationDTO: NotificationEventDTO) => {
            setNotification(notificationDTO)
          },
          eventName: WebSocketEvents.NOTIFICATIONS,
          feature: 'notification',
        })
      }

      return () => {
        controller.abort()
        WebSocketApi.offByEventName({
          eventName: WebSocketEvents.NOTIFICATIONS,
        })
        disconnectMessengerWSEvents()
        WebSocketApi.disconnectGlobalWS()
      }
    }, [
      connectMessengerWSEvents,
      disconnectMessengerWSEvents,
      getMessengerData,
      isAuthenticated,
    ])

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
