import { toast } from 'react-toastify'

import { OutlineBell } from '@/assets/icons'
import { useNotificationsSocket } from '@/features/notifications/model'

import { notificationsStore } from './model/NotificationsStore'

export const NotificationRing = () => {
  const { clearError, error, notification } = useNotificationsSocket()

  if (notification) {
    notificationsStore.addNewNotification(notification)
  }

  if (error) {
    toast.error(error)
    clearError()
  }

  return (
    <button
      className={'cursor-pointer mr-12 hidden lg:block'}
      onClick={() => alert(notification?.message ?? 'empty')}
      type={'button'}
    >
      <OutlineBell className={'size-6'} />
    </button>
  )
}
