import { useEffect, useRef, useState } from 'react'

import { Close } from '@/assets/icons'
import {
  Nullable,
  ScrollArea,
  Typography,
  timeAgo,
  useTranslation,
} from '@/common'
import { NotificationDTO } from '@/features/notifications/api'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

export const Notifications = observer(
  ({ notifications }: { notifications: Nullable<NotificationDTO[]> }) => {
    const { t } = useTranslation()
    const router = useRouter()
    const observer = useRef<Nullable<IntersectionObserver>>(null)
    const elementsRef = useRef<Map<number, Nullable<HTMLDivElement>>>(new Map())
    const [_, setVisibleNotifications] = useState<number[]>([])

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
                notification.isRead = true
                setVisibleNotifications((prev) => [...prev, notification.id])
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

    return (
      <div
        className={
          'absolute -right-[10px] top-10 z-40 w-[355px] h-[424px] p-3 bg-dark-500 border border-light-900 rounded-lg shadow-lg'
        }
      >
        <div
          className={
            'absolute -top-[9px] right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-light-900'
          }
        ></div>
        <div
          className={
            'absolute -top-[8px] right-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-dark-400'
          }
        ></div>
        <Typography
          className={
            'text-left py-3 sticky top-0 z-50 bg-dark-500 w-full flex flex-col gap-12'
          }
          variant={'bold16'}
        >
          {t.notification.title}
        </Typography>

        {notifications?.length && notifications.length > 0 ? (
          <ScrollArea className={'h-[calc(100%-60px)]'}>
            {notifications?.map((item) => (
              <div
                className={'py-3 border-t-[1px] border-t-dark-100 text-left'}
                id={String(item.id)}
                key={item.id}
                onClick={(e) => e.stopPropagation()}
                ref={(elem) => {
                  elem && elementsRef.current.set(item.id, elem)
                }}
              >
                <div className={'flex justify-between'}>
                  {!item.isRead && (
                    <Typography variant={'bold14'}>
                      {t.notification.item}{' '}
                      <b className={'text-accent-900'}>{t.notification.new}</b>
                    </Typography>
                  )}
                  <Close
                    className={'ml-auto'}
                    onClick={() =>
                      alert('This notification will be deleted ' + item.id)
                    }
                  />
                </div>
                <Typography
                  className={'mt-2'}
                  variant={'reg14'}
                >
                  {item.message}
                </Typography>
                <Typography
                  className={'text-light-900'}
                  variant={'small'}
                >
                  {timeAgo(item.createdAt, router.locale)}
                </Typography>
              </div>
            ))}
          </ScrollArea>
        ) : (
          <Typography
            className={'text-left'}
            variant={'reg14'}
          >
            You have no notifications
          </Typography>
        )}
      </div>
    )
  }
)
