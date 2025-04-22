import { Typography, cn } from '@/common'

import { UserStats } from '../settings'

type Props = {
  className?: string
  followers: string
  following: string
  isMobile: boolean
  publications: string
  userMetadata: UserStats
}
export const ProfileStatistics = ({
  className,
  followers,
  following,
  isMobile,
  publications,
  userMetadata,
}: Props) => {
  return (
    <div
      className={cn(
        'flex gap-2 justify-between sm:gap-12 sm:justify-start lg:gap-25',
        className
      )}
    >
      <div className={'flex flex-col text-center'}>
        <Typography variant={isMobile ? 'small' : 'reg14'}>
          {userMetadata.following}
        </Typography>
        <Typography variant={isMobile ? 'small' : 'reg14'}>
          {following}
        </Typography>
      </div>
      <div className={'flex flex-col text-center'}>
        <Typography variant={isMobile ? 'small' : 'reg14'}>
          {userMetadata.followers}
        </Typography>
        <Typography variant={isMobile ? 'small' : 'reg14'}>
          {followers}
        </Typography>
      </div>
      <div className={'flex flex-col text-center'}>
        <Typography variant={isMobile ? 'small' : 'reg14'}>
          {userMetadata.publications}
        </Typography>
        <Typography variant={isMobile ? 'small' : 'reg14'}>
          {publications}
        </Typography>
      </div>
    </div>
  )
}
