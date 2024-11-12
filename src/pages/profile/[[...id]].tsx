import { Button, Paths, useTranslation } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { cn } from '@/common/utils/cn'
import {
  ProfileAvatar,
  ProfileUserName,
  profileStore,
} from '@/features/profile'
import { ProfileAboutMe } from '@/features/profile/ui/ProfileAboutMe'
import { ProfileStatistics } from '@/features/profile/ui/ProfileStatistics'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'

import avatarPlaceholder from '../../assets/images/avatar.jpg'
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'

const placeholderImages = [
  { id: 1, img: image1 },
  { id: 2, img: image2 },
  { id: 3, img: image3 },
  { id: 4, img: image4 },
  { id: 5, img: image1 },
  { id: 6, img: image2 },
  { id: 7, img: image3 },
  { id: 8, img: image4 },
]

//todo: remove avatarPlaceholder and place another placeholder image
const Profile = observer(() => {
  const { t } = useTranslation()
  const { followers, following, publications, settingsButton } = t.profilePage
  const { isProfileLoading, userProfile } = profileStore
  const avatar = userProfile?.avatars[0]?.url

  return (
    <div className={'flex w-full'}>
      <div className={'flex flex-col w-full'}>
        <div className={'mt-9 flex items-start gap-[38px] w-full mb-[53px]'}>
          <ProfileAvatar
            isProfileLoading={isProfileLoading}
            src={avatar || avatarPlaceholder}
          />
          <div className={'flex flex-col flex-wrap w-full'}>
            <div
              className={'flex items-center justify-between w-full mb-[19px]'}
            >
              <ProfileUserName
                isProfileLoading={isProfileLoading}
                userName={userProfile?.userName ?? 'URL Profile'}
              />

              <Button
                disabled={isProfileLoading}
                variant={'secondary'}
              >
                <Link href={Paths.profileSettings}>{settingsButton}</Link>
              </Button>
            </div>
            <div className={'flex gap-[100px] flex-wrap'}>
              <ProfileStatistics
                isProfileLoading={isProfileLoading}
                statisticsCount={2218}
                statisticsTitle={following}
              />
              <ProfileStatistics
                isProfileLoading={isProfileLoading}
                statisticsCount={2218}
                statisticsTitle={followers}
              />
              <ProfileStatistics
                isProfileLoading={isProfileLoading}
                statisticsCount={2218}
                statisticsTitle={publications}
              />
            </div>
            <ProfileAboutMe
              aboutMe={userProfile?.aboutMe}
              isProfileLoading={isProfileLoading}
            />
          </div>
        </div>
        <div className={cn('grid gap-3 w-full lg:grid-cols-4')}>
          {placeholderImages.map((image) => (
            <Image
              alt={'image'}
              height={228}
              key={image.id}
              src={image.img}
              width={342}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

export default withProtection(Profile, true)
