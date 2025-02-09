import { useEffect } from 'react'
import { toast } from 'react-toastify'

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/assets/icons'
import { useTranslation } from '@/common'
import { useRouter } from 'next/router'

import { subscriptionsApi } from '../api/profile.management.api'

export const Management = () => {
  const { t } = useTranslation()
  const router = useRouter()

  // https://docs.stripe.com/testing#cards-responses

  const { success } = router.query

  useEffect(() => {
    if (success === 'true') {
      toast.success('Оплата прошла успешно!')
    } else if (success === 'false') {
      toast.error('Оплата не прошла !')
    }
  }, [success])

  // STRIPE
  const dataSTRIPE = {
    amount: 10,
    baseUrl: 'http://localhost:3000/profile/settings/management',
    paymentType: 'STRIPE',
    typeSubscription: 'DAY',
  } as const

  // PAYPAL
  const dataPAYPAL = {
    amount: 10,
    baseUrl: 'http://localhost:3000/profile/settings/management',
    paymentType: 'PAYPAL',
    typeSubscription: 'DAY',
  } as const

  const onStripe = async () => {
    try {
      const response = await subscriptionsApi.subscriptions(dataSTRIPE)
      const redirectUrl = response.data?.url

      if (redirectUrl) {
        window.location.href = redirectUrl
      } else {
        console.error('URL для перенаправления не найден в ответе')
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
    }
  }
  const onPayPal = async () => {
    try {
      const response = await subscriptionsApi.subscriptions(dataPAYPAL)
      const redirectUrl = response.data?.url

      if (redirectUrl) {
        window.location.href = redirectUrl
      } else {
        console.error('URL для перенаправления не найден в ответе')
      }
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
    }
  }

  return (
    <div className={'mt-8 w-full flex justify-end items-center'}>
      <PaypalSvgrepoCom4
        className={'w-36 h-[68px] m-2 cursor-pointer'}
        onClick={onPayPal}
      />
      <span>OR</span>
      <StripeSvgrepoCom4
        className={'w-36 h-[68px] m-2 cursor-pointer'}
        onClick={onStripe}
      />
    </div>
  )
}
