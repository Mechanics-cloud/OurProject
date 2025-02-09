import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/assets/icons'
import { ConfirmModal, Loader, useTranslation } from '@/common'
import { useRouter } from 'next/router'

import { DataSubscription } from '../api/management.types.api'
import { subscriptionsApi } from '../api/profile.management.api'

export const Management = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [selectedBank, setSelectedBank] = useState<'paypal' | 'stripe' | null>(
    null
  )
  const { t } = useTranslation()
  const router = useRouter()

  // data: DataSubscription - передать при вызове оплаты
  // https://docs.stripe.com/testing#cards-responses

  const { success } = router.query

  // STRIPE
  const data: DataSubscription = {
    amount: 10,
    baseUrl: 'http://localhost:3000/profile/settings/management',
    typeSubscription: 'DAY',
  } as const

  const onStripe = async () => {
    const dataSTRIPE = { ...data, paymentType: 'STRIPE' as const }

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
    const dataPAYPAL = { ...data, paymentType: 'PAYPAL' as const }

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

  const onConfirm = () => {
    setIsModalOpen(false)
    if (selectedBank === 'paypal') {
      onPayPal()
      setIsLoad(true)
    } else if (selectedBank === 'stripe') {
      onStripe()
      setIsLoad(true)
    }
  }

  const onCancel = () => {
    setIsModalOpen(false)
    setSelectedBank(null)
  }

  useEffect(() => {
    return setIsLoad(false)
  }, [])

  useEffect(() => {
    if (success === 'true') {
      toast.success('Оплата прошла успешно!')
      const { success: _, ...restQuery } = router.query

      router.replace(
        { pathname: router.pathname, query: restQuery },
        undefined,
        { shallow: true }
      )
    } else if (success === 'false') {
      toast.error('Оплата не прошла!')
      const { success: _, ...restQuery } = router.query

      router.replace(
        { pathname: router.pathname, query: restQuery },
        undefined,
        { shallow: true }
      )
    }
  }, [success, router])

  if (isLoad) {
    return <Loader />
  }

  return (
    <div className={'mt-8 w-full flex justify-end items-center'}>
      <button
        className={'w-[96px] h-[60px]'}
        onClick={() => {
          setSelectedBank('paypal')
          setIsModalOpen(true)
        }}
        type={'button'}
      >
        <PaypalSvgrepoCom4 className={'w-full h-full'} />
      </button>
      <span className={'m-2'}>OR</span>
      <button
        className={'w-[96px] h-[60px]'}
        onClick={() => {
          setSelectedBank('stripe')
          setIsModalOpen(true)
        }}
        type={'button'}
      >
        <StripeSvgrepoCom4 className={'w-full h-full'} />
      </button>
      <ConfirmModal
        onClick={onConfirm}
        onClose={onCancel}
        open={isModalOpen}
        title={'Подтверждение перехода'}
      >
        Вы будете перенаправлены на сайт банка для оплаты. Продолжить?
      </ConfirmModal>
    </div>
  )
}
