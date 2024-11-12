import { Typography } from '@/common'
import { LoadingComponent } from '@/features/profile/ui/LoadingComponent'

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
    <LoadingComponent
      className={'min-h-[42px] min-w-[70px]'}
      isProfileLoading={isProfileLoading}
    >
      <div className={'flex flex-col'}>
        <Typography variant={'reg14'}>{statisticsCount}</Typography>
        <Typography variant={'reg14'}>{statisticsTitle}</Typography>
      </div>
    </LoadingComponent>
  )
}
