import { OutlineBell } from '@/assets/icons'
import { notificationsApi } from '@/features/notifications/api'
import { notificationsStore } from '@/features/notifications/model/NotificationsStore'

export const NotificationRing = () => {
  const onClickRing = async () => {
    await notificationsStore.markAsReadNotifications([7089])
    await notificationsStore.getNotifications({})
    console.log(notificationsStore.notificationsDTO)
  }

  return (
    <button
      className={'cursor-pointer mr-12 hidden lg:block'}
      // onClick={() => alert('notification' ?? 'empty')}
      onClick={onClickRing}
      type={'button'}
    >
      <OutlineBell className={'size-6'} />
    </button>
  )
}
