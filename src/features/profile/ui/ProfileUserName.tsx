import { Paid } from '@/assets/icons'
import { Skeleton, Typography } from '@/common'
import { LoadingComponent } from '@/features/profile/ui/LoadingComponent'

type Props = {
  isProfileLoading: boolean
  userName: string
}
export const ProfileUserName = ({ isProfileLoading, userName }: Props) => {
  return (
    <LoadingComponent
      className={'w-[150px] h-[30px]'}
      isProfileLoading={isProfileLoading}
    >
      <Typography
        className={'text-light-100 flex items-center gap-3'}
        variant={'h1'}
      >
        {userName}
        <Paid />
      </Typography>
    </LoadingComponent>
  )
}
