import { Typography, useTranslation } from '@/common'
import { Notifications } from '@/features/notifications'

export const NotificationsWindow = () => {
  const { t } = useTranslation()

  return (
    <div
      className={
        'absolute -right-[10px] top-10 z-40 w-[355px] h-[424px] p-3 bg-dark-500 border border-light-900 rounded-lg shadow-lg'
      }
      onClick={(e) => e.stopPropagation()}
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
      <Notifications />
    </div>
  )
}
