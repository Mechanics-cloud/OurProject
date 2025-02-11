import { createContext, useContext, useEffect, useState } from 'react'

import { Nullable } from '@/common'
import {
  NotificationSocketDTO,
  NotificationsSocketApi,
  SocketEvents,
  WebSocketError,
} from '@/features/notifications/api'

type NotificationsSocketContextType = {
  clearError: () => void
  connectNotifications: () => void
  disconnectNotifications: () => void
  error: Nullable<string>
  notification: NotificationSocketDTO | undefined
}

const NotificationsSocketContext =
  createContext<Nullable<NotificationsSocketContextType>>(null)

export const NotificationsSocketProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [notification, setNotification] = useState<NotificationSocketDTO>()
  const [error, setError] = useState<Nullable<string>>('')

  const clearError = () => {
    setError('')
  }

  const connectNotifications = () => {
    NotificationsSocketApi.createConnection()

    NotificationsSocketApi.socket?.on(
      SocketEvents.NOTIFICATIONS,
      (notificationDTO: NotificationSocketDTO) => {
        setNotification(notificationDTO)
      }
    )

    NotificationsSocketApi.socket?.on(
      SocketEvents.ERROR,
      (err: WebSocketError) => {
        setError(err.message)
      }
    )
  }

  const disconnectNotifications = () => {
    NotificationsSocketApi.disconnect()
  }

  useEffect(() => {
    connectNotifications()

    return () => {
      disconnectNotifications()
    }
  }, [])

  return (
    <NotificationsSocketContext.Provider
      value={{
        clearError,
        connectNotifications,
        disconnectNotifications,
        error,
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
