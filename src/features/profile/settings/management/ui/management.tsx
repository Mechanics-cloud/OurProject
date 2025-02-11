import { useEffect, useState } from 'react'

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/assets/icons'
import { ConfirmModal, Loader, Nullable, useTranslation } from '@/common'
import { useRouter } from 'next/router'

import { managementStore } from '../model/managementStore'
import { PaymentStatusModal } from './PaymentStatusModal'

//TODO
// data: DataSubscription - передать при вызове оплаты или взять из store
// https://docs.stripe.com/testing#cards-responses
type nameBank = 'PAYPAL' | 'STRIPE'

export const Management = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(true)
  const [selectedBank, setSelectedBank] = useState<Nullable<nameBank>>(null)
  const [isPaymentStatusModalOpen, setIsPaymentStatusModalOpen] =
    useState(false)
  const [paymentStatus, setPaymentStatus] = useState<
    'error' | 'success' | null
  >(null)
  const { t } = useTranslation()
  const router = useRouter()

  const { success } = router.query

  const onConfirm = () => {
    setIsModalOpen(false)
    if (selectedBank) {
      managementStore.processPayment(selectedBank)
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
    const { success } = router.query

    if (success === 'true' || success === 'false') {
      setPaymentStatus(success === 'true' ? 'success' : 'error')
      setIsPaymentStatusModalOpen(true)
    }
  }, [router.query])

  return (
    <div className={'mt-8 w-full flex justify-end items-center'}>
      <button
        className={'w-[96px] h-[60px]'}
        onClick={() => {
          setSelectedBank('PAYPAL')
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
          setSelectedBank('STRIPE')
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
      <PaymentStatusModal
        onClose={() => setIsPaymentStatusModalOpen(false)}
        open={isPaymentStatusModalOpen}
        status={paymentStatus}
      />
      {isLoad && <Loader />}
    </div>
  )
}
