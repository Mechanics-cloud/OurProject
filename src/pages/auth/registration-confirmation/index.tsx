import { Button, Typography, getBaseLayout } from '@/common'
import { Paths } from '@/common/paths'
import Image from 'next/image'
import Link from 'next/link'

import congratulationImage from '../../../assets/images/registration/congratulation.png'

const Confirmation = () => {
  return (
    <div
      className={
        'md:mt-9 mt-4 box-border border-transparent flex flex-col items-center'
      }
    >
      <Typography
        className={'md:mb-5 mb-3'}
        variant={'h1'}
      >
        Congratulations!
      </Typography>
      <Typography
        className={'md:mb-14 mb-16'}
        variant={'reg16'}
      >
        Your email has been confirmed
      </Typography>
      <div className={'flex flex-col md:flex-col-reverse items-center w-full'}>
        <Image
          alt={'Congratulations!'}
          className={'md:mb-0 mb-11'}
          src={congratulationImage}
        />
        <Button
          asChild
          className={'md:mb-[72px] mb-0 self-stretch md:self-auto'}
        >
          <Link href={Paths.signIn}>Sign In</Link>
        </Button>
      </div>
    </div>
  )
}

Confirmation.getLayout = getBaseLayout

export default Confirmation
