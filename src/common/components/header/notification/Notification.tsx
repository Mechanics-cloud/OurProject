import { ScrollArea, Typography, timeAgo, useTranslation } from '@/common'
import { useRouter } from 'next/router'

export const Notification = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div
      className={
        'absolute -right-[10px] top-10 z-40 w-[355px] h-[424px] p-3 bg-dark-900 border border-light-900 rounded-lg shadow-lg'
      }
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
      <ScrollArea className={'overflow-y-scroll h-full'}>
        <Typography
          className={'text-left py-3'}
          variant={'bold16'}
        >
          {t.notification.title}
        </Typography>

        <div
          className={'py-3 border-t-[1px] border-t-dark-100 h-[85px] text-left'}
        >
          <Typography variant={'bold14'}>
            {t.notification.item}{' '}
            <b className={'text-accent-900'}>{t.notification.new}</b>
          </Typography>
          <Typography
            className={'mt-2'}
            variant={'reg14'}
          >
            The next payment will be withdrawn in 1 hours
          </Typography>
          <Typography
            className={'text-light-900'}
            variant={'small'}
          >
            {timeAgo(new Date(), router.locale)}
          </Typography>
        </div>

        <div
          className={'py-3 border-t-[1px] border-t-dark-100 h-[85px] text-left'}
        >
          <Typography variant={'bold14'}>
            {t.notification.item}{' '}
            <b className={'text-accent-900'}>{t.notification.new}</b>
          </Typography>
          <Typography
            className={'mt-2'}
            variant={'reg14'}
          >
            The next payment will be withdrawn in 1 hours
          </Typography>
          <Typography
            className={'text-light-900'}
            variant={'small'}
          >
            {timeAgo(new Date(), router.locale)}
          </Typography>
        </div>

        <div
          className={'py-3 border-t-[1px] border-t-dark-100 h-[85px] text-left'}
        >
          <Typography variant={'bold14'}>{t.notification.item}</Typography>
          <Typography
            className={'mt-2'}
            variant={'reg14'}
          >
            The next payment will be withdrawn in 1 hours
          </Typography>
          <Typography
            className={'text-light-900'}
            variant={'small'}
          >
            {timeAgo(new Date(), router.locale)}
          </Typography>
        </div>
        <div
          className={'py-3 border-t-[1px] border-t-dark-100 h-[85px] text-left'}
        >
          <Typography variant={'bold14'}>{t.notification.item}</Typography>
          <Typography
            className={'mt-2'}
            variant={'reg14'}
          >
            The next payment will be withdrawn in 1 hours
          </Typography>
          <Typography
            className={'text-light-900'}
            variant={'small'}
          >
            {timeAgo(new Date(), router.locale)}
          </Typography>
        </div>
        <div
          className={'py-3 border-t-[1px] border-t-dark-100 h-[85px] text-left'}
        >
          <Typography variant={'bold14'}>{t.notification.item}</Typography>
          <Typography
            className={'mt-2'}
            variant={'reg14'}
          >
            The next payment will be withdrawn in 1 hours
          </Typography>
          <Typography
            className={'text-light-900'}
            variant={'small'}
          >
            {timeAgo(new Date(), router.locale)}
          </Typography>
        </div>
        <div
          className={'py-3 border-t-[1px] border-t-dark-100 h-[85px] text-left'}
        >
          <Typography variant={'bold14'}>{t.notification.item}</Typography>
          <Typography
            className={'mt-2'}
            variant={'reg14'}
          >
            The next payment will be withdrawn in 1 hours
          </Typography>
          <Typography
            className={'text-light-900'}
            variant={'small'}
          >
            {timeAgo(new Date(), router.locale)}
          </Typography>
        </div>
      </ScrollArea>
    </div>
  )
}
