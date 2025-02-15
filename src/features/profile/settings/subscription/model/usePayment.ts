import { useState } from 'react'

import { Nullable } from '@/common'
import { PaymentBanks } from '@/common/enums'
import { subscriptionStore } from '@/features/profile'

export const usePayment = () => {
  const [selectedBank, setSelectedBank] = useState<Nullable<PaymentBanks>>(null)
  const [isLoad, setIsLoad] = useState(false)

  const processPayment = (locale: string) => {
    subscriptionStore.processPayment(selectedBank as PaymentBanks, locale)
    setIsLoad(true)
  }

  return {
    isLoad,
    processPayment,
    selectedBank,
    setIsLoad,
    setSelectedBank,
  }
}
