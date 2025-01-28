import { Button, FullScreenLoader, RegistrationResult } from '@/common'
import { useRegistrationConfirmation } from '@/features/auth/model/signUp/useRegistrationConfirmation'
import Image from 'next/image'
import Link from 'next/link'

import congratulationImage from '../../../../assets/images/registration/congratulation.webp'
import emailConfirmError from '../../../../assets/images/registration/emailConfirmError.webp'

export const RegistrationConfirmation = () => {
  const { buttonText, href, isConfirm, text, title } =
    useRegistrationConfirmation()

  if (isConfirm === 'pending') {
    return <FullScreenLoader />
  }

  return (
    <>
      <RegistrationResult
        text={text}
        title={title}
      >
        <Image
          alt={isConfirm === 'confirm' ? 'Congratulations!' : 'confirm error'}
          className={'md:mb-0 mb-11'}
          height={300}
          sizes={'(max-width: 600px) 480px, 800px'}
          src={
            isConfirm === 'confirm' ? congratulationImage : emailConfirmError
          }
          width={432}
        />
        <Button
          asChild
          className={'md:mb-[72px] mb-0 self-stretch md:self-auto'}
        >
          <Link href={href}>{buttonText}</Link>
        </Button>
      </RegistrationResult>
    </>
  )
}
