import { useEffect, useRef, useState } from 'react'

import { Nullable, useTranslation } from '@/common'
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

            if (notification && !notification.isRead) {
              setVisibleNotificationsIds((prev) => [
                ...new Set([...prev, notification.id]),
              ])
            }

            if (
              notifications.length > 0 &&
              Number(entry.target.id) ===
                notifications[notifications.length - 1]?.id &&
              Number(entry.target.id) !== cursor
            ) {
              setCursor(Number(entry.target.id))
            }
          }
        })
      },
      { root: null, rootMargin: '0px', threshold: 1 }
    )

    elementsRef.current.forEach((el) => {
      if (el) {
        observer.current?.observe(el)
      }
    })

    return () => {
      observer.current?.disconnect()
    }
  }, [cursor, notifications, visibleNotificationsIds])

  useEffect(() => {
    notificationsStore.getNotifications({
      cursor,
    })
  }, [cursor])

  useEffect(() => {
    if (visibleNotificationsIds.length > 0) {
      notificationsStore.changeNotificationStatus({
        idsToDelete: visibleNotificationsIds,
        isRead: true,
      })
      notificationsStore.markAsReadNotifications(visibleNotificationsIds)
    }
  }, [visibleNotificationsIds])

  const deleteNotification = async (id: number) => {
    await notificationsStore.deleteNotification(id)
  }

  return { deleteNotification, elementsRef, notifications, router, t }
}
