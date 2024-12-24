import { Paid } from '@/assets/icons'
import { Button, Paths, Typography, useTranslation } from '@/common'
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
  store: HydrateProfileStore
}
export const Profile = observer(({ store }: Props) => {
  const { t } = useTranslation()
  const { query } = useRouter()
  const { followers, following, publications, settingsButton } = t.profilePage

  const avatar = store.userProfile?.avatars[0]?.url

  return (
    <UserIdProvider ctx={query.id ? +query.id[0] : null}>
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
              height={200}
              priority
              src={avatar || avatarPlaceholder}
              width={200}
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
                isMobile={false}
                publications={publications}
                userMetadata={store.userProfile.userMetadata}
              />
              <ProfileAboutMe
                aboutMe={store.userProfile?.aboutMe}
                className={'mt-6'}
                isMobile={false}
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
            className={'hidden'}
            isMobile={false}
          />
          <PhotoProfilePostsGallery store={store} />
        </div>
      </div>
    </UserIdProvider>
  )
})
