import React, { createContext, useContext, useEffect, useState } from 'react'

import { Nullable } from '@/common'
import {
  EventError,
  NotificationEventDTO,
  NotificationsSocketApi,
  SocketEvents,
} from '@/features/notifications/api'

type NotificationsSocketContextType = {
  clearError: () => void
  error: Nullable<string>
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
  const [error, setError] = useState<Nullable<string>>('')

  const clearError = () => {
    setError('')
  }

  const connectNotifications = () => {
    NotificationsSocketApi.createConnection()

    NotificationsSocketApi.socket?.on(
      SocketEvents.NOTIFICATIONS,
      (notificationDTO: NotificationEventDTO) => {
        setNotification(notificationDTO)
      }
    )

    NotificationsSocketApi.socket?.on(SocketEvents.ERROR, (err: EventError) => {
      setError(err.message)
    })
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
