import { Paid } from '@/assets/icons'
import { Skeleton, Typography } from '@/common'

type Props = {
  isProfileLoading: boolean
  userName: string
}
export const ProfileUserName = ({ isProfileLoading, userName }: Props) => {
  return (
    <Typography
      className={'text-light-100 flex items-center gap-3'}
      variant={'h1'}
    >
      {isProfileLoading ? (
        <Skeleton className={`h-[30px] min-w-20`} />
      ) : (
        userName
      )}
      <Paid />
    </Typography>
  )
}
