import { useEffect, useState } from 'react'

import { Nullable } from '@/common'
import {
  NotificationsSocketApi,
  SocketEvents,
  WebSocketError,
} from '@/features/notifications/api'

export const useNotificationsSocket = () => {
  const [notification, setNotification] = useState<Notification>()
  const [error, setError] = useState<Nullable<string>>('')

  const connectNotifications = () => {
    NotificationsSocketApi.createConnection()

    // NotificationsSocketApi.socket?.on(
    //   SocketEvents.NOTIFICATIONS,
    //   (notificationDTO: any) => {
    //     console.log('notificationDTO', notificationDTO)
    //     setNotification(notificationDTO)
    //   }
    // )
    //
    // NotificationsSocketApi.socket?.on('open', () => {
    //   console.log('WebSocket connection opened')
    // })
    //
    NotificationsSocketApi.socket?.on(
      SocketEvents.ERROR,
      (err: WebSocketError) => {
        console.log({ err })
        setError(err.message)
      }
    )
    //
    // NotificationsSocketApi.socket?.onAny((event, ...args) => {
    //   console.log('event', event)
    //   console.log('args', args)
    // })

    // NotificationsSocketApi.socket?.on('connect_error', (err) => {
    //   console.error('Socket connection error:', err);
    // });
  }

  useEffect(() => {
    connectNotifications()

    return () => {
      NotificationsSocketApi.disconnect()
    }
  }, [])

  return { error, notification, setError }
}
