import { Paid } from '@/assets/icons'
import {
  Button,
  Loader,
  Paths,
  Typography,
  useScreenWidth,
  useTranslation,
} from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import {
  PhotoProfilePostsGallery,
  ProfileAboutMe,
  ProfileStatistics,
} from '@/features/profile'
import { profileStore } from '@/features/profile/model/profileStore'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import avatarPlaceholder from '../../assets/images/avatar.jpg'

//todo: remove avatarPlaceholder
const Profile = observer(() => {
  const { t } = useTranslation()
  const { followers, following, publications, settingsButton } = t.profilePage
  const { isLoading, userProfile } = profileStore

  const avatar = userProfile?.avatars[0]?.url

  const { isMobile, isTablet } = useScreenWidth()

  if (!profileStore.userProfile) {
    return <Loader />
  }

  return (
    <div className={'flex w-full'}>
      <div className={'flex flex-col w-full'}>
        <div
          className={
            'mt-5 md:mt-9 flex items-center w-full gap-5 mb-3 lg:gap-9 lg:mb-[53px]'
          }
        >
          <Image
            alt={'avatar'}
            className={'rounded-full pr-0'}
            height={isMobile ? 100 : 200}
            priority
            src={avatar || avatarPlaceholder}
            width={isMobile ? 100 : 200}
          />
          <div className={'flex flex-col flex-wrap w-full'}>
            <div
              className={
                'hidden md:flex items-center justify-between w-full mb-5'
              }
            >
              <Typography
                className={'flex text-light-100 items-center gap-3'}
                variant={'h1'}
              >
                {userProfile?.userName ?? 'URL Profile'}
                <Paid />
              </Typography>

              <Button
                className={'hidden md:block'}
                variant={'secondary'}
              >
                <Link href={Paths.profileSettings}>{settingsButton}</Link>
              </Button>
            </div>
            <ProfileStatistics
              followers={followers}
              following={following}
              isMobile={isMobile}
              publications={publications}
            />
            <ProfileAboutMe
              aboutMe={userProfile?.aboutMe}
              className={isTablet ? 'hidden' : 'mt-6'}
              isMobile={isMobile}
            />
          </div>
        </div>
        <Typography
          className={'md:hidden flex text-light-100 items-center gap-3 mb-3'}
          variant={'h1'}
        >
          {userProfile?.userName ?? 'URL Profile'}
          <Paid />
        </Typography>
        <ProfileAboutMe
          aboutMe={userProfile?.aboutMe}
          className={isTablet ? 'mb-7' : 'hidden'}
          isMobile={isMobile}
        />
        <PhotoProfilePostsGallery />
      </div>
    </div>
  )
})

export default withProtection(Profile, true)
