import { Typography } from '@/common'
import { LoadingComponent } from '@/features/profile/ui/LoadingComponent'

type Props = {
  aboutMe?: string
  isProfileLoading: boolean
}
export const ProfileAboutMe = ({ aboutMe, isProfileLoading }: Props) => {
  return (
    <LoadingComponent
      className={'min-h-[40px] max-w-[300px] mt-[23px]'}
      isProfileLoading={isProfileLoading}
    >
      {aboutMe && (
        <Typography
          className={'mt-[23px]'}
          variant={'reg16'}
        >
          {aboutMe}
        </Typography>
      )}
    </LoadingComponent>
  )
}
