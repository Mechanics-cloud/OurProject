import { useEffect, useRef, useState } from 'react'

import { Nullable, useDebounce, useTranslation } from '@/common'
import { notificationsStore } from '@/features/notifications/model'
import { useRouter } from 'next/router'

export const useNotifications = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { notifications } = notificationsStore
  const observer = useRef<Nullable<IntersectionObserver>>(null)
  const elementsRef = useRef<Map<number, Nullable<HTMLDivElement>>>(new Map())
  const [visibleNotificationsIds, setVisibleNotificationsIds] = useState<
    number[]
  >([])
  const [cursor, setCursor] = useState(0)

  useEffect(() => {
    if (!notifications || notifications.length === 0) {
      return
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target?.id) {
            const notification = notifications.find(
              (notification) => notification.id === Number(entry.target.id)
            )
            const notificationId = Number(entry.target.id)

            if (notification && !notification.isRead) {
              setVisibleNotificationsIds((prev) => [
                ...new Set([...prev, notificationId]),
              ])
            }

            if (
              notifications.length > 0 &&
              notificationId === notifications[notifications.length - 1].id &&
              notificationId !== cursor
            ) {
              setCursor(notificationId)
            }
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 0.8 }
    )

    elementsRef.current.forEach((el) => {
      if (el) {
        observer.current?.observe(el)
      }
    })

    return () => observer.current?.disconnect()
  }, [cursor, notifications])

  useEffect(() => {
    if (cursor !== 0) {
      notificationsStore.getNotifications({ cursor })
    }
  }, [cursor])

  const debouncedVisibleNotificationsIds = useDebounce(
    visibleNotificationsIds,
    1000
  )

  useEffect(() => {
    if (debouncedVisibleNotificationsIds.length > 0) {
      notificationsStore.changeNotificationStatus({
        idsToDelete: debouncedVisibleNotificationsIds,
        isRead: true,
      })

      notificationsStore.markAsReadNotifications(
        debouncedVisibleNotificationsIds
      )
    }
  }, [debouncedVisibleNotificationsIds])

  const deleteNotification = async (id: number) => {
    await notificationsStore.deleteNotification(id)
  }

  return { deleteNotification, elementsRef, notifications, router, t }
}
