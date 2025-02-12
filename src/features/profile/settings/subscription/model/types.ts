import { PaymentType } from '@/common/enums'

export type Price = {
  amount: number
  typeDescription: PaymentType
}

export type namesOfBanks = 'PAYPAL' | 'STRIPE'

export type DataSubscriptionApi = {
  amount: number
  baseUrl: string
  paymentType: namesOfBanks
  typeSubscription: PaymentType
}

export type DataSubscription = Omit<DataSubscriptionApi, 'paymentType'>
