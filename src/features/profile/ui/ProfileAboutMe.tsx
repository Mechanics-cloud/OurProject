import { Skeleton, Typography } from '@/common'

type Props = {
  aboutMe?: string
  isProfileLoading: boolean
}
export const ProfileAboutMe = ({ aboutMe, isProfileLoading }: Props) => {
  return (
    <Typography
      className={'mt-[23px]'}
      variant={'reg16'}
    >
      {isProfileLoading ? (
        <Skeleton className={`min-h-[40px] max-w-[300px]`} />
      ) : (
        (aboutMe ?? '')
      )}
    </Typography>
  )
}
