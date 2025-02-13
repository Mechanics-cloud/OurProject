import { useEffect, useState } from 'react'

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/assets/icons'
import { ConfirmModal, Loader, Nullable, useTranslation } from '@/common'
import { PaymentBanks } from '@/common/enums'
import { useRouter } from 'next/router'

import { subscriptionStore } from '../..'
import { PaymentStatusModal } from './PaymentStatusModal'

export const BankRedirectButtons = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoad, setIsLoad] = useState(false)
  const [selectedBank, setSelectedBank] = useState<Nullable<PaymentBanks>>(null)
  const [isPaymentStatusModalOpen, setIsPaymentStatusModalOpen] =
    useState(false)
  const [paymentStatus, setPaymentStatus] = useState<
    'error' | 'success' | null
  >(null)
  const { t } = useTranslation()
  const router = useRouter()

  const redirectMessage = t.profileManagement.redirectMessage.replace(
    '{{bank}}',
    String(selectedBank)
  )

  const onConfirm = () => {
    setIsModalOpen(false)
    if (selectedBank) {
      subscriptionStore.processPayment(selectedBank)
      setIsLoad(true)
    }
  }

  const onCancel = () => {
    setIsModalOpen(false)
    setSelectedBank(null)
  }

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
        className={`w-[96px] h-[60px] ${isLoad ? 'opacity-50' : ''}`}
        disabled={isLoad}
        onClick={() => {
          setSelectedBank(PaymentBanks.Paypal)
          setIsModalOpen(true)
        }}
        type={'button'}
      >
        <PaypalSvgrepoCom4 className={'w-full h-full'} />
      </button>
      <span className={'m-2'}>{t.profileManagement.or}</span>
      <button
        className={`w-[96px] h-[60px] ${isLoad ? 'opacity-50' : ''}`}
        disabled={isLoad}
        onClick={() => {
          setSelectedBank(PaymentBanks.Stripe)
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
        title={t.profileManagement.titleModal}
      >
        {redirectMessage}
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
