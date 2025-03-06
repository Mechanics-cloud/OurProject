import { Close } from '@/assets/icons'
import { Typography, timeAgo } from '@/common'
import { useNotifications } from '@/features/notifications'
import { NotificationDTO } from '@/features/notifications/api'
import { motion } from 'framer-motion'

type Props = {
  item: NotificationDTO
}
export const NotificationsItem = ({ item }: Props) => {
  const { deleteNotification, elementsRef, router, t } = useNotifications()

  return (
    <motion.div
      animate={{ opacity: 1, scale: 1 }}
      className={'py-3 border-t-[1px] border-t-dark-100 text-left'}
      exit={{
        opacity: 0,
        scale: 0.2,
        x: [0, -50, 50],
        y: [0, 20, -20],
      }}
      id={String(item.id)}
      initial={{ opacity: 1, scale: 1 }}
      key={item.id}
      ref={(elem) => {
        elem && elementsRef.current.set(item.id, elem)
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
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
          onClick={() => deleteNotification(item.id)}
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
    </motion.div>
  )
}
