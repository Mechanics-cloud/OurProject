import { Close } from '@/assets/icons'
import { ScrollArea, Typography, timeAgo } from '@/common'
import { useNotifications } from '@/features/notifications'
import { observer } from 'mobx-react-lite'

export const Notifications = observer(() => {
  const { elementsRef, notifications, router, t } = useNotifications()

  return notifications?.length && notifications.length > 0 ? (
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
  )
})
