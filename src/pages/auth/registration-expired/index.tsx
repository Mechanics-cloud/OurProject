import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button, Typography, getBaseLayout } from '@/common'
import { Environments } from '@/common/enviroments'
import { responseErrorHandler } from '@/common/utils/responseErrorHandler'
import { signUpApi } from '@/features/auth/api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { z } from 'zod'

import expiredImage from '../../../assets/images/registration/expired.webp'

const Expired = () => {
  const { query } = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const emailCheck = z.string().email()

  const onResendHandler = () => {
    if (!query.email) {
      toast.error('Something went wrong')
    }
    try {
      const email = emailCheck.parse(query.email)
      const baseUrl = Environments.BASE_URL as string

      signUpApi
        .emailResending({ baseUrl, email })
        .then((res) => {
          toast.error('Ok')
        })
        .catch((error) => {
          responseErrorHandler(error)
        })

      console.log('Valid email:', email)
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message)
      } else {
        toast.error((error as Error).message)
      }
    }
  }

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
        <Button
          className={'md:mb-[72px] mb-0 self-stretch md:self-auto'}
          onClick={onResendHandler}
        >
          Resend verification link
        </Button>
      </div>
    </div>
  )
}

Expired.getLayout = getBaseLayout

export default Expired
