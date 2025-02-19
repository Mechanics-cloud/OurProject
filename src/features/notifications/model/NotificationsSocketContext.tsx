import React, { createContext, useContext, useEffect, useState } from 'react'

import { Nullable, getFromLocalStorage } from '@/common'
import { StorageKeys } from '@/common/enums'
import { generalStore } from '@/core/store'
import { notificationsStore } from '@/features/notifications'
import {
  EventError,
  NotificationEventDTO,
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
  const isUser = generalStore.user?.userId

  const clearError = () => {
    setError('')
  }

  const connectNotifications = () => {
    notificationsStore.connect()

    notificationsStore.socket?.on(
      SocketEvents.NOTIFICATIONS,
      (notificationDTO: NotificationEventDTO) => {
        setNotification(notificationDTO)
      }
    )

    notificationsStore.socket?.on(SocketEvents.ERROR, (err: EventError) => {
      setError(err.message)
    })
  }

  useEffect(() => {
    if (!isUser && !getFromLocalStorage(StorageKeys.AccessToken)) {
      return
    }
    connectNotifications()

    return () => {
      notificationsStore.disconnect()
    }
  }, [isUser])

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
