import { useEffect, useState } from 'react'

import { Nullable } from '@/common'
import {
  Notification,
  NotificationsSocketApi,
  SocketEvents,
  WebSocketError,
} from '@/features/notifications/api'

export const useNotificationsSocket = () => {
  // todo store
  const [notification, setNotification] = useState<Notification>()
  const [error, setError] = useState<Nullable<string>>('')

  const connectNotifications = () => {
    NotificationsSocketApi.createConnection()

    NotificationsSocketApi.socket?.on(
      SocketEvents.NOTIFICATIONS,
      (notificationDTO: Notification) => {
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

  useEffect(() => {
    connectNotifications()

    return () => {
      NotificationsSocketApi.disconnect()
    }
  }, [])

  return { error, notification, setError }
}
