import { useEffect } from 'react'

import { Paid } from '@/assets/icons'
import {
  Button,
  ProtectedPaths,
  Typography,
  usePaidAccount,
  useScreenWidth,
  useTranslation,
} from '@/common'
import { ScreenWidths } from '@/common/enums'
import { followSystemStore } from '@/features/followSystem'
import {
  ButtonsContainer,
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
  const isAuthenticated = !!profileStore.userProfile
  const isOwnProfile = profileStore.userProfile?.id === store.userProfile?.id

  const { isMobile, isTablet } = useScreenWidth(screenSize)
  const { isPaid } = usePaidAccount()

  useEffect(() => {
    if (isAuthenticated) {
      followSystemStore.getFollowing(profileStore.userProfile!.userName)
    }
  }, [isAuthenticated])

  return (
    <UserIdProvider ctx={query.id ? +query.id[0] : null}>
      <div className={'flex w-full flex-col'}>
        <div
          className={
            'grid grid-cols-[auto_1fr] w-full gap-x-2 gap-y-1 mt-4 mb-3 md:mt-9 sm-500:gap-x-5 lg:mb-[53px]  md:grid-cols-[auto_1fr_auto]'
          }
        >
          <Image
            alt={'avatar'}
            className={
              'rounded-full row-span-2 md:row-start-1 md:col-start-1 md:row-span-3 lg:mr-4'
            }
            height={isMobile ? 100 : 200}
            priority
            src={avatar || avatarPlaceholder}
            width={isMobile ? 100 : 200}
          />
          <div
            className={`gap-3 row-start-3 col-span-2 mt-0.5 sm-500:col-span-1 md:row-start-1 md:col-start-2 md:mb-0 md:content-center ${
              isOwnProfile ? 'mb-0' : 'mb-3.5'
            }`}
          >
            <Typography
              className={
                ' text-light-100 flex gap-2 items-center sm-500:justify-center md:justify-start whitespace-nowrap'
              }
              variant={'h1'}
            >
              {store.userProfile?.userName ?? 'URL Profile'}
              {isPaid && <Paid />}
            </Typography>
          </div>

          <div
            className={
              'flex flex-col justify-center row-start-4 col-span-2 md:col-start-3 md:row-start-1 md:col-span-1'
            }
          >
            {isOwnProfile ? (
              !isTablet && (
                <Button
                  className={'flex'}
                  variant={'secondary'}
                >
                  <Link href={ProtectedPaths.profileSettings}>
                    {settingsButton}
                  </Link>
                </Button>
              )
            ) : (
              <ButtonsContainer userId={store.userProfile?.id} />
            )}
          </div>
          <ProfileStatistics
            className={
              'row-start-1 col-start-2 row-span-2 self-center md:row-start-2 md:col-start-2 md:row-span-1 md:col-span-2 md:mt-2'
            }
            followers={followers}
            following={following}
            isMobile={isMobile}
            publications={publications}
            userMetadata={store.userProfile.userMetadata}
          />
          <ProfileAboutMe
            aboutMe={store.userProfile?.aboutMe}
            className={`row-start-5 col-span-2 md:mt-6 md:col-start-2 md:row-start-3 ${
              isOwnProfile ? 'mb-2 mt-0' : 'mt-3 mb-4'
            }`}
            isMobile={isMobile}
          />
        </div>
        <div className={'flex flex-col w-full  md:mt-6'}>
          <PhotoProfilePostsGallery store={store} />
        </div>
      </div>
    </UserIdProvider>
  )
})
