import { Paid } from '@/assets/icons/filledIcons'
import { Button, Paths, Typography, useTranslation } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import { cn } from '@/common/utils/cn'
import { generalStore } from '@/core/store'
import { PublicProfile, profileAPi } from '@/features/profile'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import avatarPlaceholder from '../../assets/images/avatar.jpg'
import image1 from '../../assets/images/image1.jpg'
import image2 from '../../assets/images/image2.jpg'
import image3 from '../../assets/images/image3.jpg'
import image4 from '../../assets/images/image4.jpg'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params } = context

  if (!params || !params.id) {
    return {
      notFound: true,
    }
  }
  try {
    const userProfile = await profileAPi.getPublicUser(params.id[0])

    return { props: userProfile }
  } catch {
    return {
      notFound: true,
    }
  }
}

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
const Profile = (userProfile: PublicProfile) => {
  const { t } = useTranslation()

  const avatar = userProfile.avatars[0]?.url

  return (
    <div className={'flex w-full'}>
      <div className={'flex flex-col w-full'}>
        <div className={'mt-9 flex items-start gap-[38px] w-full mb-[53px]'}>
          <Image
            alt={'avatar'}
            className={'rounded-full pr-0'}
            height={200}
            src={avatar || avatarPlaceholder}
            width={200}
          />
          <div className={'flex flex-col flex-wrap w-full'}>
            <div
              className={'flex items-center justify-between w-full mb-[19px]'}
            >
              <Typography
                className={'text-light-100 flex items-center gap-3'}
                variant={'h1'}
              >
                {userProfile?.userName ?? 'URL Profile'}
                <Paid />
              </Typography>

              {generalStore.user?.userId && (
                <Button variant={'secondary'}>
                  <Link href={Paths.profileSettings}>
                    {t.profilePage.settingsButton}
                  </Link>
                </Button>
              )}
            </div>
            <div className={'flex gap-[100px] flex-wrap'}>
              <div className={'flex flex-col'}>
                <Typography variant={'reg14'}>
                  {userProfile.userMetadata.following}
                </Typography>
                <Typography variant={'reg14'}>
                  {t.profilePage.following}
                </Typography>
              </div>
              <div className={'flex flex-col'}>
                <Typography variant={'reg14'}>
                  {userProfile.userMetadata.followers}
                </Typography>
                <Typography variant={'reg14'}>
                  {t.profilePage.followers}
                </Typography>
              </div>
              <div className={'flex flex-col'}>
                <Typography variant={'reg14'}>
                  {userProfile.userMetadata.publications}
                </Typography>
                <Typography variant={'reg14'}>
                  {t.profilePage.publications}
                </Typography>
              </div>
            </div>
            <div className={'mt-[23px]'}>
              {userProfile?.aboutMe && (
                <Typography variant={'reg16'}>{userProfile.aboutMe}</Typography>
              )}
            </div>
          </div>
        </div>
        <div className={cn('grid gap-3 grid-cols-gallery w-full')}>
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
}

export default withProtection(Profile, true)
