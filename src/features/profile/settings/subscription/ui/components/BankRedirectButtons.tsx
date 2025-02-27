import { useEffect, useState } from 'react'

import { PaypalSvgrepoCom4, StripeSvgrepoCom4 } from '@/assets/icons'
import { ConfirmModal, Loader, useTranslation } from '@/common'
import { PaymentBanks } from '@/common/enums'
import {
  PaymentStatusModal,
  subscriptionStore,
  usePayment,
} from '@/features/profile'
import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/router'

export const BankRedirectButtons = observer(() => {
  const { t } = useTranslation()
  const isRedirect = subscriptionStore.isRedirect
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isPaymentStatusModalOpen, setIsPaymentStatusModalOpen] =
    useState(false)
  const [paymentStatus, setPaymentStatus] = useState<
    'error' | 'success' | null
  >(null)

  const router = useRouter()

  const { processPayment, selectedBank, setSelectedBank } = usePayment()

  const onConfirm = () => {
    setIsModalOpen(false)
    if (selectedBank) {
      processPayment(router.locale as string)
    }
  }

  const onCancel = () => {
    setIsModalOpen(false)
    setSelectedBank(null)
  }

  const onSelectedBank = (PaymentBanks: PaymentBanks) => {
    setSelectedBank(PaymentBanks)
    setIsModalOpen(true)
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
        className={`w-[96px] h-[60px] ${isRedirect ? 'opacity-50' : ''}`}
        disabled={isRedirect}
        onClick={() => {
          onSelectedBank(PaymentBanks.Paypal)
        }}
        type={'button'}
      >
        <PaypalSvgrepoCom4 className={'w-full h-full'} />
      </button>
      <span className={'m-2'}>{t.profileManagement.or}</span>
      <button
        className={`w-[96px] h-[60px] ${isRedirect ? 'opacity-50' : ''}`}
        disabled={isRedirect}
        onClick={() => {
          onSelectedBank(PaymentBanks.Stripe)
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
        {t.profileManagement.redirectMessage(String(selectedBank))}
      </ConfirmModal>
      <PaymentStatusModal
        onClose={() => setIsPaymentStatusModalOpen(false)}
        open={isPaymentStatusModalOpen}
        status={paymentStatus}
      />
    </div>
  )
})
