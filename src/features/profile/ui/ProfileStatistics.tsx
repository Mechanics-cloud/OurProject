import { Typography } from '@/common'

type Props = {
  followers: string
  following: string
  isMobile: boolean
  publications: string
}
export const ProfileStatistics = ({
  followers,
  following,
  isMobile,
  publications,
}: Props) => {
  return (
    <div
      className={
        'flex gap-4 justify-between sm:gap-12 sm:justify-start lg:gap-25'
      }
    >
      <div className={'flex flex-col text-center'}>
        <Typography variant={isMobile ? 'small' : 'reg14'}>2218</Typography>
        <Typography variant={isMobile ? 'small' : 'reg14'}>
          {following}
        </Typography>
      </div>
      <div className={'flex flex-col text-center'}>
        <Typography variant={isMobile ? 'small' : 'reg14'}>2218</Typography>
        <Typography variant={isMobile ? 'small' : 'reg14'}>
          {followers}
        </Typography>
      </div>
      <div className={'flex flex-col text-center'}>
        <Typography variant={isMobile ? 'small' : 'reg14'}>2218</Typography>
        <Typography variant={isMobile ? 'small' : 'reg14'}>
          {publications}
        </Typography>
      </div>
    </div>
  )
}
