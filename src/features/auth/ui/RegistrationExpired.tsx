import { Button, Typography } from '@/common'
import { ConfirmSignUpModal } from '@/features/auth'
import { useRegistrationExpired } from '@/features/auth/model/useRegistrationExpired'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'

import expiredImage from '../../../assets/images/registration/expired.webp'

const RegistrationExpired = observer(() => {
  const { isOpen, onModalClose, onResendHandler, userEmail } =
    useRegistrationExpired()

  return (
    <>
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
        <Button
          className={'md:mb-[72px] mb-0 self-stretch md:self-auto'}
          onClick={onResendHandler}
        >
          Resend verification link
        </Button>
      </div>
      <ConfirmSignUpModal
        isOpen={isOpen}
        onModalClose={onModalClose}
        userEmail={userEmail}
      />
    </>
  )
})

export default RegistrationExpired
