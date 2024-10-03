import { useEffect } from 'react'
import { toast } from 'react-toastify'

import congratulationImage from '@/assets/images/registration/congratulation.webp'
import { Button, getBaseLayout, useTranslation } from '@/common'
import { Paths } from '@/common/paths'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { authApi } from '@/features/auth/api'
import { RegistrationResult } from '@/features/auth/ui/RegistrationResult'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Confirmation = () => {
  const { t } = useTranslation()
  const { push, query } = useRouter()

  useEffect(() => {
    if (!query.code || !query.email) {
      push(Paths.signUp)

      return
    }
    const controller = new AbortController()

    try {
      const confirmationCode = query.code as string
      const email = query.email as string

      authApi
        .emailConfirmation({ confirmationCode, email })
        .then((res) => {
          toast(res.status)
        })
        .catch((error) => {
          responseErrorHandler(error)
        })
    } catch (error) {
      responseErrorHandler(error)
    }

    return () => {
      controller.abort()
    }
  }, [query.code, query.email, push])

  return (
    <div className={'md:mt-9 mt-4'}>
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
    </div>
  )
}

Confirmation.getLayout = getBaseLayout

export default Confirmation
