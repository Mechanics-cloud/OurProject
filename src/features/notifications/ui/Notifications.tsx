import { ScrollArea, Typography, useTranslation } from '@/common'
import { notificationsStore } from '@/features/notifications'
import { NotificationsItem } from '@/features/notifications/ui/NotificationsItem'
import { AnimatePresence } from 'framer-motion'
import { observer } from 'mobx-react-lite'

export const Notifications = observer(() => {
  const { notifications } = notificationsStore
  const { t } = useTranslation()

  return notifications?.length && notifications.length > 0 ? (
    <ScrollArea className={'h-[calc(100%-60px)]'}>
      <AnimatePresence>
        {notifications?.map((item) => (
          <NotificationsItem
            item={item}
            key={item.id}
          />
        ))}
      </AnimatePresence>
    </ScrollArea>
  ) : (
    <Typography
      className={'text-left'}
      variant={'reg14'}
    >
      {t.notification.noNotifications}
    </Typography>
  )
})
