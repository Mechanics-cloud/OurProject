import * as React from 'react'
import { toast } from 'react-toastify'

import { OutlineBell } from '@/assets/icons'
import { useModal } from '@/common'
import { useNotificationsSocket } from '@/features/notifications/model'
import { Notifications } from '@/features/notifications/ui'

import { notificationsStore } from './model/NotificationsStore'

export const NotificationRing = () => {
  const { clearError, error, notification } = useNotificationsSocket()
  const { isModalOpen, toggleModal } = useModal()

  if (notification) {
    notificationsStore.addNewNotification(notification)
  }

  if (error) {
    toast.error(error)
    clearError()
  }

  return (
    <button
      className={'cursor-pointer mr-12 hidden lg:block relative'}
      onClick={toggleModal}
      type={'button'}
    >
      <OutlineBell
        className={'size-6'}
        fill={isModalOpen ? '#397DF6' : 'currentColor'}
      />
      {isModalOpen && <Notifications />}
    </button>
  )
}
