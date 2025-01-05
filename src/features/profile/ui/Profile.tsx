import { Paid } from '@/assets/icons'
import {
  Button,
  Paths,
  Typography,
  useScreenWidth,
  useTranslation,
} from '@/common'
import { ScreenWidths } from '@/common/enums'
import {
  HydrateProfileStore,
  PhotoProfilePostsGallery,
  ProfileAboutMe,
  ProfileStatistics,
} from '@/features/profile'
import { UserIdProvider } from '@/features/profile/model/UserIdProvider'
import { profileStore } from '@/features/profile/model/profileStore'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import avatarPlaceholder from '../../../assets/images/user-avatar-placeholder.jpg'

type Props = {
  screenSize?: ScreenWidths
  store: HydrateProfileStore
}
export const Profile = observer(({ screenSize, store }: Props) => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const { followers, following, publications, settingsButton } = t.profilePage

  const avatar = store.userProfile?.avatars[0]?.url

  const { isMobile, isTablet } = useScreenWidth(screenSize)

  // TODO: Заменить работу хука useScreenWidth
  return (
    <UserIdProvider ctx={query.id ? +query.id[0] : null}>
      <div className={'flex w-full'}>
        <div className={'flex flex-col w-full'}>
          <div
            className={
              'mt-5 md:mt-9 flex flex-col items-center w-full gap-5 mb-3 lg:gap-9 lg:mb-[53px] xs:flex-row'
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
                  {store.userProfile?.userName ?? 'URL Profile'}
                  <Paid />
                </Typography>
                {profileStore.userProfile?.id === store.userProfile.id && (
                  <Button
                    className={'hidden md:block'}
                    variant={'secondary'}
                  >
                    <Link href={Paths.profileSettings}>{settingsButton}</Link>
                  </Button>
                )}
              </div>
              <ProfileStatistics
                followers={followers}
                following={following}
                isMobile={isMobile}
                publications={publications}
                userMetadata={store.userProfile.userMetadata}
              />
              <ProfileAboutMe
                aboutMe={store.userProfile?.aboutMe}
                className={isTablet ? 'hidden' : 'mt-6'}
                isMobile={isMobile}
              />
            </div>
          </div>
          <Typography
            className={'md:hidden flex text-light-100 items-center gap-3 mb-3'}
            variant={'h1'}
          >
            {store.userProfile?.userName ?? 'URL Profile'}
            <Paid />
          </Typography>
          <ProfileAboutMe
            aboutMe={store.userProfile?.aboutMe}
            className={isTablet ? 'mb-7' : 'hidden'}
            isMobile={isMobile}
          />
          <PhotoProfilePostsGallery store={store} />
        </div>
      </div>
    </UserIdProvider>
  )
})
