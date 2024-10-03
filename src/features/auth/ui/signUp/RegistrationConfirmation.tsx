import congratulationImage from '@/assets/images/registration/congratulation.png'
import { Button, RegistrationResult, useTranslation } from '@/common'
import { Paths } from '@/common/paths'
import { useRegistrationConfirmation } from '@/features/auth/model/signUp/useRegistrationConfirmation'
import Image from 'next/image'
import Link from 'next/link'

export const RegistrationConfirmation = () => {
  const { t } = useTranslation()

  useRegistrationConfirmation()

  return (
    <>
      <RegistrationResult
        text={t.registration.confirmation.text}
        title={t.registration.confirmation.title}
      >
        <Image
          alt={'Congratulations!'}
          className={'md:mb-0 mb-11'}
          height={300}
          sizes={'(max-width: 600px) 480px, 800px'}
          src={congratulationImage}
          width={432}
        />
        <Button
          asChild
          className={'md:mb-[72px] mb-0 self-stretch md:self-auto'}
        >
          <Link href={Paths.signIn}>
            {t.registration.confirmation.buttonTitle}
          </Link>
        </Button>
      </RegistrationResult>
    </>
  )
}
