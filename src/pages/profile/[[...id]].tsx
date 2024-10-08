import { Paid } from '@/assets/icons/filledIcons'
import { Button, Typography, getLayoutWithSidebar } from '@/common'
import { withProtection } from '@/common/HOC/withProtection'
import withLayout from '@/common/layout/withLayout'
import { cn } from '@/common/utils/cn'
import Image from 'next/image'

import styles from './Profile.module.css'

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

function Profile() {
  return (
    <div className={'flex '}>
      <div className={'flex flex-col pl-9'}>
        <div className={'mt-9 flex items-start gap-[38px] w-full mb-[53px]'}>
          <Image
            alt={'avatar'}
            className={'rounded-full pr-0'}
            height={200}
            src={avatarPlaceholder}
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
                URL Profile
                <Paid />
              </Typography>

              <Button variant={'secondary'}>Profile Settings</Button>
            </div>
            <div className={'flex gap-[100px] flex-wrap'}>
              <div className={'flex flex-col'}>
                <Typography variant={'reg14'}>2218</Typography>
                <Typography variant={'reg14'}> Following</Typography>
              </div>
              <div className={'flex flex-col'}>
                <Typography variant={'reg14'}>2218</Typography>
                <Typography variant={'reg14'}> Followers</Typography>
              </div>
              <div className={'flex flex-col'}>
                <Typography variant={'reg14'}>2218</Typography>
                <Typography variant={'reg14'}> Publications</Typography>
              </div>
            </div>
            <div className={'mt-[23px]'}>
              <Typography variant={'reg16'}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
              </Typography>
              <Typography
                href={'/'}
                variant={'regularLink'}
              >
                laboris nisi ut aliquip ex ea commodo consequat
              </Typography>
            </div>
          </div>
        </div>
        <div className={cn('grid gap-x-3 gap-y-3', styles.gridAutoFit)}>
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

// Profile.getLayout = withLayout('user')
export default withProtection(Profile, true)
