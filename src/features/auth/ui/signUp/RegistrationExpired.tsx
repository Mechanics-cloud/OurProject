import { Button, RegistrationResult } from '@/common'
import { ConfirmSignUpModal } from '@/features/auth'
import { useRegistrationExpired } from '@/features/auth/model/signUp/useRegistrationExpired'
import { observer } from 'mobx-react-lite'
import Image from 'next/image'

import expiredImage from '../../../../assets/images/registration/expired.webp'

const RegistrationExpired = observer(() => {
  const { isOpen, onModalClose, onResendHandler, t, userEmail } =
    useRegistrationExpired()

  return (
    <>
      <RegistrationResult
        text={t.registration.expired.text}
        title={t.registration.expired.title}
      >
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
          {t.registration.expired.buttonTitle}
        </Button>
      </RegistrationResult>
      <ConfirmSignUpModal
        isOpen={isOpen}
        onModalClose={onModalClose}
        userEmail={userEmail}
      />
    </>
  )
})

export default RegistrationExpired
