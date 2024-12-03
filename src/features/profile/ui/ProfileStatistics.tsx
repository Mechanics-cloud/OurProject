import { Typography } from '@/common'

import { UserMetadata } from '../settings'

type Props = {
  followers: string
  following: string
  isMobile: boolean
  publications: string
  userMetadata: UserMetadata
}
export const ProfileStatistics = ({
  followers,
  following,
  isMobile,
  publications,
  userMetadata,
}: Props) => {
  return (
    <div
      className={
        'flex gap-4 justify-between sm:gap-12 sm:justify-start lg:gap-25'
      }
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
