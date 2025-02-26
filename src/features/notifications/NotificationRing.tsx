import * as React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { OutlineBell } from '@/assets/icons'
import { Loader, useModal } from '@/common'
import { useNotificationsSocket } from '@/features/notifications/model'
import { NotificationsWindow } from '@/features/notifications/ui'
import { observer } from 'mobx-react-lite'

import { notificationsStore } from './model/NotificationsStore'

export const NotificationRing = observer(() => {
  const { clearError, error, notification } = useNotificationsSocket()
  const [isLoading, setIsLoading] = useState(true)
  const { isModalOpen, toggleModal } = useModal()
  const { notifications } = notificationsStore

  const unreadNotifications = notifications?.filter(
    (notification) => notification.isRead === false
  )

  if (notification) {
    notificationsStore.addNewNotification(notification)
  }

  if (error) {
    toast.error(error)
    clearError()
  }

  useEffect(() => {
    notificationsStore.getNotifications({}).then(() => setIsLoading(false))
  }, [])

  return (
    <button
      className={'cursor-pointer mr-12 hidden lg:block relative'}
      onClick={toggleModal}
      type={'button'}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <OutlineBell
          className={'size-6 relative'}
          fill={isModalOpen ? '#397DF6' : 'currentColor'}
        >
          {unreadNotifications && unreadNotifications.length > 0 && (
            <>
              <circle
                cx={17.5}
                cy={6.5}
                fill={'#CC1439'}
                r={7.0}
              />
            </>
          )}
        </OutlineBell>
      )}
      <span className={'absolute text-[10px] right-0.5 bottom-2.5'}>
        {unreadNotifications &&
          unreadNotifications.length > 0 &&
          unreadNotifications.length}
      </span>
      {isModalOpen && <NotificationsWindow />}
    </button>
  )
})
