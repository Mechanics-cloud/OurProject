import { Skeleton, Typography, useTranslation } from '@/common'

export const DevicesSkeleton = () => {
  const { t } = useTranslation()

  return (
    <>
      <Typography variant={'h3'}>{t.profileSessions.currentSession}</Typography>
      <Skeleton className={'w-full h-24 rounded-sm mt-2 mb-6'} />
      <Skeleton className={'w-64 h-10 rounded-sm ml-auto'} />
      <Typography
        className={'my-[18px]'}
        variant={'h3'}
      >
        {t.profileSessions.activeSessions}
      </Typography>
    </>
  )
}
