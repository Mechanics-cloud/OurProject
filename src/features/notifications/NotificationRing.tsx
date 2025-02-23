import * as React from 'react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { OutlineBell } from '@/assets/icons'
import { Loader, useModal } from '@/common'
import { useNotificationsSocket } from '@/features/notifications/model'
import { Notifications } from '@/features/notifications/ui'
import { toJS } from 'mobx'

import { notificationsStore } from './model/NotificationsStore'

export const NotificationRing = () => {
  const { clearError, error, notification } = useNotificationsSocket()
  const [isLoading, setIsLoading] = useState(true)
  const { isModalOpen, toggleModal } = useModal()
  const { notificationsDTO } = notificationsStore
  const notifications = toJS(notificationsDTO)

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
          className={'size-6'}
          fill={isModalOpen ? '#397DF6' : 'currentColor'}
        />
      )}
      {isModalOpen && <Notifications notifications={notifications} />}
    </button>
  )
}
