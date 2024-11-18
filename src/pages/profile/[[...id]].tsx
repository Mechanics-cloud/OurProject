import { Paid } from '@/assets/icons'
import { Button, Paths, Typography, useTranslation } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { useScreenWidth } from '@/common/hooks/useScreenWidth'
import { cn } from '@/common/utils/cn'
import { profileStore } from '@/features/profile'
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

  const { isTablet } = useScreenWidth()

  return isProfileLoading ? (
    <div>Loading...</div> //временная заглушка
  ) : (
    <div className={'flex w-full'}>
      <div className={'flex flex-col w-full'}>
        <div
          className={cn(
            'mt-9 flex items-start w-full',
            isTablet ? 'gap-5 mb-3' : 'gap-9 mb-13'
          )}
        >
          <Image
            alt={'avatar'}
            className={'rounded-full pr-0'}
            height={200}
            src={avatar || avatarPlaceholder}
            width={200}
          />
          <div className={'flex flex-col flex-wrap w-full'}>
            <div className={'flex items-center justify-between w-full mb-5'}>
              <Typography
                className={'text-light-100 flex items-center gap-3'}
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
            <div className={'flex gap-4 sm:gap-12 lg:gap-25'}>
              <div className={'flex flex-col'}>
                <Typography variant={isTablet ? 'small' : 'reg14'}>
                  2218
                </Typography>
                <Typography variant={isTablet ? 'small' : 'reg14'}>
                  {following}
                </Typography>
              </div>
              <div className={'flex flex-col'}>
                <Typography variant={isTablet ? 'small' : 'reg14'}>
                  2218
                </Typography>
                <Typography variant={isTablet ? 'small' : 'reg14'}>
                  {followers}
                </Typography>
              </div>
              <div className={'flex flex-col'}>
                <Typography variant={isTablet ? 'small' : 'reg14'}>
                  2218
                </Typography>
                <Typography variant={isTablet ? 'small' : 'reg14'}>
                  {publications}
                </Typography>
              </div>
            </div>
            <div className={isTablet ? 'hidden' : 'mt-6'}>
              {userProfile?.aboutMe && (
                <Typography variant={isTablet ? 'small' : 'reg14'}>
                  {userProfile.aboutMe}
                </Typography>
              )}
            </div>
          </div>
        </div>
        <div className={isTablet ? 'mb-7' : 'hidden'}>
          {userProfile?.aboutMe && (
            <Typography variant={isTablet ? 'small' : 'reg14'}>
              {userProfile.aboutMe}
            </Typography>
          )}
        </div>
        <div
          className={cn(
            'grid gap-3 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 w-full'
          )}
        >
          {placeholderImages.map((image) => (
            <Image
              alt={'image'}
              className={'w-full h-auto object-cover'}
              height={228}
              key={image.id}
              layout={'responsive'}
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
