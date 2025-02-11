import { OutlineBell } from '@/assets/icons'
import { useNotificationsSocket } from '@/features/notifications/model'

export const NotificationRing = () => {
  const { error, notification } = useNotificationsSocket()

  return (
    <button
      className={'cursor-pointer mr-12 hidden lg:block'}
      onClick={() => alert(notification ?? 'empty')}
      type={'button'}
    >
      <OutlineBell className={'size-6'} />
    </button>
  )
}
