import { Skeleton, Typography } from '@/common'

type Props = {
  isProfileLoading: boolean
  statisticsCount: number
  statisticsTitle: string
}
export const ProfileStatistics = ({
  isProfileLoading,
  statisticsCount,
  statisticsTitle,
}: Props) => {
  return (
    <div className={'flex flex-col'}>
      {isProfileLoading ? (
        <Skeleton className={`h-5 w-full`} />
      ) : (
        <Typography variant={'reg14'}>{statisticsCount}</Typography>
      )}

      <Typography variant={'reg14'}>{statisticsTitle}</Typography>
    </div>
  )
}
