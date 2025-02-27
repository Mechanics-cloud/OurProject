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
              setVisibleNotificationsIds((prev) => [...prev, notification.id])
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
  }, [notifications])

  useEffect(() => {
    if (visibleNotificationsIds.length > 0) {
      notificationsStore.markAsReadNotifications(visibleNotificationsIds)
    }
  }, [visibleNotificationsIds])

  const deleteNotification = async (id: number) => {
    await notificationsStore.deleteNotification(id)
  }

  return { deleteNotification, elementsRef, notifications, router, t }
}
