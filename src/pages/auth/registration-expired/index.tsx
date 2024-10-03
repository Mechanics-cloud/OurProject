import { Button, Typography, getBaseLayout } from '@/common'
import Image from 'next/image'

import expiredImage from '../../../assets/images/registration/expired.png'

const Expired = () => {
  return (
    <div className={'md:mt-9 mt-4'}>
      <Typography
        className={'md:mb-5 mb-3 text-center'}
        variant={'h1'}
      >
        Email verification link expired
      </Typography>
      <Typography
        className={'md:mb-14 mb-16 text-center'}
        variant={'reg16'}
      >
        Looks like the verification link has expired. Not to worry, we can send
        the link again
      </Typography>
      <div className={'flex flex-col md:flex-col-reverse items-center w-full'}>
        <Image
          alt={'Congratulations!'}
          className={'md:mb-0 mb-11'}
          height={352}
          src={expiredImage}
          width={473}
        />
        <Button className={'md:mb-[72px] mb-0 self-stretch md:self-auto'}>
          Resend verification link
        </Button>
      </div>
    </div>
  )
}

Expired.getLayout = getBaseLayout

export default Expired
